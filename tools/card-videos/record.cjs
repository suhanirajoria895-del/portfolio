#!/usr/bin/env node
// Films the card video stages frame by frame and writes an .mp4 and a poster for each homepage card.
//
//   npm run dev                      (in another terminal)
//   node tools/card-videos/record.cjs            all three
//   node tools/card-videos/record.cjs paywise    one
//
// Needs Playwright (with Chromium) and ffmpeg on the PATH. The stage runs on a clock this script owns
// (see `clock` below), so every frame is exact however slow the machine is.
const { chromium } = require("playwright");
const { spawn, execFileSync } = require("node:child_process");
const path = require("node:path");

const BASE = process.env.STAGE_URL || "http://127.0.0.1:5173";
const OUT = process.env.OUT_DIR || path.resolve(__dirname, "../../public/work");
const FPS = 30;
const DPR = Number(process.env.DPR || 1.5); // shoot larger than the output, then scale down for clean edges
const STAGES = {
  cosell: { w: 1600, h: 800, out: [1920, 960], poster: 10.9 },
  paywise: { w: 1280, h: 800, out: [1280, 800], poster: 9.2 },
  steadytrack: { w: 1280, h: 800, out: [1280, 800], poster: 6.4 },
};

/**
 * Runs in the stage page before its own code. Until __freeze() it does nothing. After that, timers and
 * requestAnimationFrame only move when __advance(ms) is called, and every CSS animation and transition
 * (in the page and in same-origin iframes) is paused and stepped by the same amount.
 */
function clock() {
  if (window.top !== window) return;
  const real = {
    st: window.setTimeout.bind(window), ct: window.clearTimeout.bind(window), si: window.setInterval.bind(window),
    raf: window.requestAnimationFrame.bind(window), caf: window.cancelAnimationFrame.bind(window),
    pnow: performance.now.bind(performance), dnow: Date.now.bind(Date),
  };
  let frozen = false, now = 0, base = 0, dbase = 0, id = 1e7, rafs = [];
  const timers = new Map();
  window.setTimeout = (fn, ms = 0, ...a) => (frozen ? (timers.set(++id, { at: now + Math.max(0, ms), fn, a }), id) : real.st(fn, ms, ...a));
  window.setInterval = (fn, ms = 0, ...a) => (frozen ? (timers.set(++id, { at: now + Math.max(1, ms), every: Math.max(1, ms), fn, a }), id) : real.si(fn, ms, ...a));
  window.clearTimeout = window.clearInterval = (i) => { if (!timers.delete(i)) real.ct(i); };
  window.requestAnimationFrame = (fn) => (frozen ? (rafs.push({ id: ++id, fn }), id) : real.raf(fn));
  window.cancelAnimationFrame = (i) => { rafs = rafs.filter((r) => r.id !== i); real.caf(i); };
  performance.now = () => (frozen ? base + now : real.pnow());
  Date.now = () => (frozen ? dbase + now : real.dnow());

  const seen = new WeakMap();
  const docs = () => [document, ...[...document.querySelectorAll("iframe")].map((f) => { try { return f.contentDocument; } catch { return null; } }).filter(Boolean)];
  const seek = (dt) => {
    for (const d of docs()) for (const an of d.getAnimations()) {
      if (!seen.has(an)) { an.pause(); an.currentTime = 0; seen.set(an, 0); continue; }
      const t = seen.get(an) + dt;
      seen.set(an, t);
      const end = an.effect && an.effect.getComputedTiming().endTime;
      if (Number.isFinite(end) && t >= end) { try { an.finish(); } catch { an.currentTime = end; } } else an.currentTime = t;
    }
  };
  const settle = () => new Promise((r) => real.st(r, 0)); // lets React commit what the timers just changed

  window.__freeze = () => { base = real.pnow(); dbase = real.dnow(); frozen = true; seek(0); };
  window.__advance = async (dt) => {
    now += dt;
    for (;;) {
      let next = null, nid = 0;
      for (const [i, t] of timers) if (t.at <= now && (!next || t.at < next.at)) { next = t; nid = i; }
      if (!next) break;
      if (next.every) next.at += next.every; else timers.delete(nid);
      try { next.fn(...next.a); } catch (e) { console.error(e); }
    }
    const run = rafs; rafs = [];
    for (const r of run) try { r.fn(base + now); } catch (e) { console.error(e); }
    for (let i = 0; i < 4; i++) await settle();
    seek(dt);
  };
}

async function film(name, browser) {
  const st = STAGES[name];
  const page = await browser.newPage({ viewport: { width: st.w, height: st.h }, deviceScaleFactor: DPR });
  await page.addInitScript(clock);
  await page.goto(`${BASE}/tools/card-videos/stage.html?v=${name}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__ready);
  await page.evaluate(() => window.__ready);
  const ms = await page.evaluate(() => window.__duration);

  const mp4 = path.join(OUT, name, "card.mp4");
  const ff = spawn("ffmpeg", [
    "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-vf", `scale=${st.out[0]}:${st.out[1]}:flags=lanczos`, "-c:v", "libx264", "-preset", "slow", "-crf", process.env.CRF || "25",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const closed = new Promise((res, rej) => ff.on("close", (code) => (code ? rej(new Error(`ffmpeg exited ${code}`)) : res())));

  await page.evaluate(() => { window.__freeze(); window.__start(); });
  const frames = Math.round((ms / 1000) * FPS);
  for (let i = 0; i < frames; i++) {
    await page.evaluate((dt) => window.__advance(dt), 1000 / FPS);
    const jpg = await page.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(jpg)) await new Promise((r) => ff.stdin.once("drain", r));
    if (i % 60 === 0) process.stdout.write(`\r${name}  ${i}/${frames}`);
  }
  ff.stdin.end();
  await closed;
  await page.close();

  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", String(st.poster), "-i", mp4, "-frames:v", "1", "-quality", "82", path.join(OUT, name, "card-poster.webp")]);
  process.stdout.write(`\r${name}  done: ${mp4}\n`);
}

(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(STAGES);
  const browser = await chromium.launch();
  for (const n of names) await film(n, browser);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
