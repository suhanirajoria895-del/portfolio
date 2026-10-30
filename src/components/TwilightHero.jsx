import { useEffect, useState } from "react";
import { siClaude, siFigma, siFramer, siGithub, siMiro, siNotion, siReact, siTailwindcss, siTypescript } from "simple-icons";
import "@fontsource/patrick-hand/400.css";
import "../twilight-hero.css";

const NAV = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Play", "#play"],
  ["Resume", "/resume.pdf"],
];

// Simple Icons has no Adobe marks, so those are drawn as their app tiles: [label, letters, tile, text]
const TOOLS = [
  ["Figma", siFigma],
  ["Framer", siFramer],
  ["Adobe Photoshop", ["Ps", "#001e36", "#31a8ff"]],
  ["Adobe Illustrator", ["Ai", "#330000", "#ff9a00"]],
  ["Miro", siMiro],
  ["Notion", siNotion],
  ["React", siReact],
  ["TypeScript", siTypescript],
  ["Tailwind CSS", siTailwindcss],
  ["GitHub", siGithub],
  ["Claude", siClaude],
];

// Sparkles scattered around the card: [image, left %, top %, size px, delay s, keep on phones]
const SPARKLES = [
  [1, 7, 22, 74, 0],
  [3, 15, 70, 40, 1.4],
  [2, 88, 14, 46, 0.7, true],
  [6, 92, 62, 56, 2.1],
  [5, 50, 9, 30, 1.1, true],
  [4, 4, 48, 34, 2.6],
];

// Jump to the footer and start the drive (RoadFooter listens for this).
const play = (e) => {
  e.preventDefault();
  window.dispatchEvent(new Event("rf:play"));
};

/* Landing hero: a paper card with a hello, floating in the twilight sky */
export default function TwilightHero() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <section id="home" className="th">
      <header className="th-head">
        <a href="#home" className="th-logo">Suhani Rajoria<i aria-hidden="true" /></a>
        <nav className="th-nav" aria-label="Main">
          {NAV.map(([label, href], n) =>
            href === "#play" ? (
              <a key={label} href={href} onClick={play}>
                {label}<span className="sr-only">: race through Hyderabad in the footer</span>
              </a>
            ) : (
              <a key={label} href={href} aria-current={n === 0 ? "page" : undefined} {...(href.endsWith(".pdf") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}</a>
            )
          )}
        </nav>
        <button type="button" className="th-burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <span /><span />
        </button>
      </header>

      <div className="th-stage">
        {SPARKLES.map(([img, x, y, size, delay, phone]) => (
          <img
            key={`${x}-${y}`}
            className={`th-spark${phone ? " is-phone" : ""}`}
            src={`/hero/sparkle-${img}.webp`}
            alt=""
            style={{ left: `${x}%`, top: `${y}%`, width: size, animationDelay: `${delay}s` }}
          />
        ))}

        <article className="th-card">
          <div className="th-copy">
            <h1 className="th-title">I design the moment before you click.</h1>
            <p className="th-role">
              <b>AI that knows when to ask,</b> payments that pause before money leaves, and therapy that keeps time.
            </p>
            <p className="th-lede">From messy research to the final pixel, and the code behind it. Looking for my next team in Hyderabad.</p>
            <ul className="th-tools" aria-label="Tools I use">
              {TOOLS.map(([name, icon]) => (
                <li key={name} title={name}>
                  {Array.isArray(icon) ? (
                    <svg viewBox="0 0 24 24" role="img" aria-label={name}>
                      <rect x="1" y="1" width="22" height="22" rx="5" fill={icon[1]} />
                      <text x="12" y="16.2" textAnchor="middle" fontSize="11" fontWeight="700" fill={icon[2]}>{icon[0]}</text>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" role="img" aria-label={name}>
                      <path d={icon.path} fill={`#${icon.hex}`} />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <figure className="th-photo">
            <p className="th-hi" aria-hidden="true">
              Hi, I'm Suhani
              <svg className="th-arrow" viewBox="0 0 60 70" fill="none">
                <path d="M8 4c22 6 38 22 34 54" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M31 48l11 12 9-14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
            <img className="th-tape t1" src="/hero/tape-1.webp" alt="" />
            <img className="th-tape t2" src="/hero/tape-2.webp" alt="" />
            <img className="th-pic" src="/hero/suhani.webp" alt="Suhani Rajoria, smiling" width="720" height="900" fetchPriority="high" />
          </figure>
        </article>

        {/* The card sits in an open airmail envelope: flap behind it, pocket in front */}
        <div className="th-env" aria-hidden="true">
          <img className="th-env-flap" src="/hero/envelope-flap.webp" alt="" width="1300" height="468" />
          <img className="th-env-pocket" src="/hero/envelope.webp" alt="" width="1300" height="646" />
        </div>
      </div>

      <div className={`th-menu${menu ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!menu}>
        <button type="button" className="th-close" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>Close</button>
        <nav>
          {NAV.map(([label, href]) => (
            <a key={label} href={href} onClick={(e) => { setMenu(false); if (href === "#play") play(e); }} tabIndex={menu ? 0 : -1}>{label}</a>
          ))}
        </nav>
      </div>
    </section>
  );
}
