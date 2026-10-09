import { List } from "@phosphor-icons/react";

const NAV = ["Work", "Resume", "Playground", "About"];

/* ── Character strip data ─────────────────────────────────────
   Replace char.img with paths to your actual illustrations.
   Speech bubbles and layout are fully wired up already.
   ──────────────────────────────────────────────────────────── */
const CHARACTERS = [
  {
    quote: "Why though?",
    img: null,
    bg: "#e8ddd0",
    alt: "Watercolor collage character",
    accentHead: "#9c7c5a",
    accentBody: "#c4a882",
  },
  {
    quote: "Pixels, but make it kind",
    img: null,
    bg: "#d8e2d5",
    alt: "Watercolor painter character",
    accentHead: "#7a9e7a",
    accentBody: "#a8c9a2",
  },
  {
    quote: "Sketch first",
    img: null,
    bg: "#dde3ea",
    alt: "Chibi character with magnifying glass",
    accentHead: "#7292b0",
    accentBody: "#a0bcd4",
  },
  {
    quote: "I read the research",
    img: null,
    bg: "#1c1c1c",
    alt: "Pixel art character",
    accentHead: "#555",
    accentBody: "#444",
    light: true,
  },
  {
    quote: "Make it make sense",
    img: null,
    bg: "#dccfc2",
    alt: "3D clay character with headphones",
    accentHead: "#b09878",
    accentBody: "#c8b098",
  },
  {
    quote: "Tiny details matter",
    img: null,
    bg: "#eae5df",
    alt: "Sketch character with coffee",
    accentHead: "#8c7a68",
    accentBody: "#b0a08c",
  },
  {
    quote: "Let's play",
    img: null,
    bg: "#e8d5d8",
    alt: "Collage character with circles",
    accentHead: "#c07880",
    accentBody: "#d4a0a8",
  },
];

function CharFigure({ c }) {
  if (c.img) {
    return (
      <img
        src={c.img}
        alt={c.alt}
        className="landing-char-img"
        width="200"
        height="280"
      />
    );
  }

  /* Placeholder silhouette — swap c.img when you have the real illustrations */
  return (
    <svg
      viewBox="0 0 100 140"
      className="landing-char-svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* hair blob */}
      <ellipse cx="50" cy="24" rx="23" ry="20" fill={c.accentHead} opacity="0.6" />
      {/* head */}
      <ellipse cx="50" cy="38" rx="18" ry="20" fill={c.accentHead} />
      {/* neck */}
      <rect x="44" y="56" width="12" height="8" rx="3" fill={c.accentHead} opacity="0.85" />
      {/* body */}
      <path d="M22 64 Q50 58 78 64 L84 140 L16 140 Z" fill={c.accentBody} />
      {/* arms */}
      <path d="M22 70 Q8 82 10 100" stroke={c.accentBody} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M78 70 Q92 82 90 100" stroke={c.accentBody} strokeWidth="10" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function LandingHero() {
  return (
    <section id="home" className="landing">
      {/* ── Nav ───────────────────────────────────────────── */}
      <header className="landing-nav">
        <div className="landing-nav-left">
          <a href="#home" className="landing-index">Index</a>
          <button className="landing-menu-btn" aria-label="Open menu">
            <List size={18} weight="regular" />
          </button>
        </div>
        <div className="landing-nav-rule" aria-hidden="true" />
        <nav aria-label="Primary" className="landing-nav-links">
          {NAV.map(label => (
            <a key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Giant name ───────────────────────────────────── */}
      <div className="landing-hero">
        <div className="landing-meta-left" aria-label="UI/UX Designer">
          <span>UI/UX</span>
          <span>Designer</span>
        </div>

        <h1 className="landing-name">Suhani Rajoria</h1>

        <div className="landing-meta-right" aria-label="Portfolio 2026">
          <span>Portfolio</span>
          <span>2026</span>
        </div>

        {/* sparkle / asterisk near top-right of name block */}
        <span className="landing-sparkle" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
          </svg>
        </span>
      </div>

      {/* ── Character strip ──────────────────────────────── */}
      <div className="landing-strip" aria-label="Design personas">
        <div className="landing-strip-track">
          {/* duplicated for seamless scroll loop */}
          {[...CHARACTERS, ...CHARACTERS].map((c, i) => (
            <div
              key={i}
              className={`landing-char${c.light ? " landing-char--light" : ""}`}
              style={{ "--char-bg": c.bg }}
              aria-hidden={i >= CHARACTERS.length}
            >
              <div className="landing-bubble" role={i < CHARACTERS.length ? "text" : undefined}>
                {c.quote}
              </div>
              <div
                className="landing-char-figure"
                title={c.img ? undefined : "Replace with your illustration"}
              >
                <CharFigure c={c} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
