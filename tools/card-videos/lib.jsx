import { useEffect, useState } from "react";

/**
 * A scene counter. Scene 0 is the resting frame; scene n starts at cues[n - 1] ms after window.__start().
 * record.cjs calls __start() under a virtual clock; add ?play to the URL to watch it in real time.
 */
export function useTimeline(cues, end) {
  const [s, setS] = useState(0);
  useEffect(() => {
    window.__duration = end;
    window.__start = () => cues.forEach((ms, i) => setTimeout(() => setS(i + 1), ms));
    if (new URLSearchParams(location.search).has("play")) {
      const run = () => { setS(0); window.__start(); };
      const t = setTimeout(run, 600);
      const loop = setInterval(run, end + 600);
      return () => { clearTimeout(t); clearInterval(loop); };
    }
  }, []);
  return s;
}

/** Run fn `ms` after scene `n` starts. */
export function useAt(s, n, ms, fn) {
  useEffect(() => {
    if (s !== n) return;
    const t = setTimeout(fn, ms);
    return () => clearTimeout(t);
  }, [s]);
}

/** An element that lives from scene `from` to scene `to`. CSS styles .is-before, .is-on and .is-after. */
export function Sc({ s, from, to = Infinity, className = "", children, ...rest }) {
  const st = s < from ? "is-before" : s > to ? "is-after" : "is-on";
  return <div className={`scn ${st} ${className}`} {...rest}>{children}</div>;
}

/** Text split into words that rise in one after another. Wrap a word in *stars* to accent it. */
export function Words({ children }) {
  return String(children).split(" ").flatMap((w, i) => {
    const hi = /^\*.*\*$/.test(w);
    return [
      i > 0 && " ",
      <span key={i} className={`w${hi ? " hi" : ""}`} style={{ "--i": i }}><span>{hi ? w.slice(1, -1) : w}</span></span>,
    ];
  });
}

/** A pointer that glides to (x, y) and can ripple on a click. */
export function Cursor({ x, y, show, click }) {
  return (
    <div className={`cur${show ? " on" : ""}${click ? " hit" : ""}`} style={{ left: x, top: y }} aria-hidden="true">
      <i />
      <svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 3l14 7.5-6.2 1.6L10.5 19 5 3z" fill="#16171d" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    </div>
  );
}

/** The closing card: a full-frame cover in the stage colour, then mark, name and a small tag for one scene. */
export function Lockup({ s, from, coverTo, mark, name, tag, live = true }) {
  return (
    <Sc s={s} from={from} to={coverTo} className="lock">
      <Sc s={s} from={from} to={from} className="lock__in">
        <div className="lock__row">{mark}<b>{name}</b></div>
        {tag && <span className="lock__tag">{live && <i />}{tag}</span>}
      </Sc>
    </Sc>
  );
}

/** Camera transform that puts the centre of `rect` (in stage px) at (px, py), zoomed by k. */
export const focus = (rect, k, px, py) => {
  const cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
  return `translate(${px - k * cx}px, ${py - k * cy}px) scale(${k})`;
};

/** Bounding box around several DOMRects. */
export const union = (rects) => {
  const x = Math.min(...rects.map((r) => r.left)), y = Math.min(...rects.map((r) => r.top));
  return { x, y, w: Math.max(...rects.map((r) => r.right)) - x, h: Math.max(...rects.map((r) => r.bottom)) - y };
};

/** Resolves when fonts and every image in the page have loaded. */
export const assetsReady = () =>
  Promise.all([document.fonts.ready, ...[...document.images].map((im) => (im.complete ? null : new Promise((r) => { im.onload = im.onerror = r; })))]);
