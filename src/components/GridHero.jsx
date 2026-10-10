import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import CosellCover from "./covers/CosellCover.jsx";
import PaywiseCover from "./covers/PaywiseCover.jsx";
import SteadyTrackCover from "./covers/SteadyTrackCover.jsx";
import "../grid-hero.css";

const MENU = [
  ["Work", "#projects"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Resume", "/resume.pdf"],
  ["Contact", "#contact"],
];

const SLIDES = [
  { name: "CoSell", line: "AI Copilot for Online Sellers", image: "/work/cosell/home.webp", href: "/work/cosell/", cover: "cosell" },
  { name: "Paywise", line: "A scam shield for UPI payments", image: "/work/paywise/cover.webp", href: "/work/paywise/", cover: "paywise" },
  { name: "SteadyTrack", line: "Therapy glove for Parkinson's", image: "/work/steadytrack/hero-glove-app.webp", href: "/work/steadytrack/", cover: "steadytrack" },
];

// Tiny blurred copy of the hero photo, shown until the full image decodes.
const BLUR =
  "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAQBACdASoYAA4APu1kq04ppaQiMAgBMB2JYgCdMoAKRqubJ4MBFKGoAAD+/drA0co57z4vulkBpwNGrDUsiLtU6MEcgoGJkVprAuUzUoROPbQ0Q8j/9Wf+/3WJ/N5CWRn8QnUGkAA=";

// Grid nodes as [x, y] in the card's grid coordinates (see CSS custom props).
const NODES = [
  ["0%", "var(--head)"], ["var(--c1)", "var(--head)"], ["var(--c2)", "var(--head)"], ["100%", "var(--head)"],
  ["0%", "var(--rowY)"], ["33.333%", "var(--rowY)"], ["66.666%", "var(--rowY)"], ["100%", "var(--rowY)"],
];

const FALLBACK = "/assets/hero-suhani.webp";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d) => setI((n) => (n + d + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused || reduced()) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, i]);

  const s = SLIDES[i];
  return (
    <div
      className={`gh-car${s.cover === "cosell" ? " is-cover" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      {SLIDES.map((sl, n) => (
        <a key={sl.name} href={sl.href} className={`gh-slide${n === i ? " is-on" : ""}`} tabIndex={n === i ? 0 : -1} aria-hidden={n !== i}>
          {sl.cover === "cosell" ? <CosellCover /> : sl.cover === "paywise" ? <PaywiseCover /> : sl.cover === "steadytrack" ? <SteadyTrackCover /> : sl.image ? <img src={sl.image} alt="" loading="lazy" decoding="async" /> : <span className="gh-slide-blank">{sl.name}</span>}
        </a>
      ))}
      <div className="gh-car-meta" aria-live="polite">
        <strong>{s.name}</strong>
        <span>{s.line}</span>
        <span className="gh-count">
          {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>
      <div className="gh-car-ctrl">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project"><ArrowLeft size={16} /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next project"><ArrowRight size={16} /></button>
      </div>
    </div>
  );
}

export default function GridHero() {
  const ref = useRef(null);
  const [menu, setMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState("/assets/hero-portrait.webp");

  useEffect(() => {
    const id = requestAnimationFrame(() => ref.current?.classList.add("is-in"));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reduced() || !window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    let raf = 0;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <section id="home" className="gh-page">
      <div className="gh" ref={ref}>
        <div className="gh-photo">
          <img
            src={photo}
            onError={() => photo !== FALLBACK && setPhoto(FALLBACK)}
            alt="Portrait of Suhani with glowing interface sketches projected across her face"
            width="1672"
            height="940"
            fetchPriority="high"
            className={loaded ? "is-loaded" : ""}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="gh-grid" aria-hidden="true">
          <span className="gh-h gh-h1" />
          <span className="gh-h gh-h2" />
          <span className="gh-v gh-v-head1" />
          <span className="gh-v gh-v-head2" />
          <span className="gh-v gh-v-row1" />
          <span className="gh-v gh-v-row2" />
          {NODES.map(([x, y], n) => (
            <i key={n} className="gh-node" style={{ left: x, top: y, "--n": n }} />
          ))}
        </div>

        <header className="gh-head">
          <a href="#home" className="gh-logo">Suhani Rajoria</a>
          <button type="button" className="gh-burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
            <span /><span /><span />
          </button>
        </header>

        <div className="gh-mid">
          <h1 className="gh-name">
            <span className="gh-hi">Hi, I am</span>
            <span className="gh-suhani">Suhani</span>
          </h1>
          <p className="gh-note">
            <ArrowUpRight size={16} aria-hidden="true" />
            Design that makes complex things feel simple.
          </p>
        </div>

        <div className="gh-row">
          <div className="gh-panel" style={{ "--k": 0 }}>
            <span className="gh-num">01</span>
            <p className="gh-role">UI/UX &amp;<br />Product<br />Designer</p>
            <a href="/resume.pdf" className="gh-resume" download>
              Download Resume <DownloadSimple size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="gh-panel" style={{ "--k": 1 }}>
            <span className="gh-num">02</span>
            <p className="gh-copy">
              UX designer crafting calm, human experiences for complex products, from AI copilots to festival apps and inclusive health tools.
            </p>
            <a href="#contact" className="gh-pill">
              Get In Touch
              <span className="gh-pill-dot"><ArrowUpRight size={16} aria-hidden="true" /></span>
            </a>
          </div>
          <div className="gh-panel gh-panel-car" style={{ "--k": 2 }}>
            <span className="gh-num">03</span>
            <Carousel />
          </div>
        </div>
      </div>

      <div className={`gh-menu${menu ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!menu}>
        <button type="button" className="gh-close" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
          Close
        </button>
        <nav>
          {MENU.map(([label, href], n) => (
            <a key={label} href={href} style={{ "--n": n }} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
