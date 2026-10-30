import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import "../desk-hero.css";

const NAV = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Play", "#play"],
  ["Resume", "/resume.pdf"],
];

// Jump to the footer and start the drive (RoadFooter listens for this).
const play = (e) => {
  e.preventDefault();
  window.dispatchEvent(new Event("rf:play"));
};

// Swap for the clean desk photo (no text or cards baked in) once it's ready.
const PHOTO = "/assets/hero-desk-mock.webp";

export default function DeskHero() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <section id="home" className="dh">
      <img
        className="dh-photo"
        src={PHOTO}
        alt=""
        width="1536"
        height="1024"
        fetchPriority="high"
      />

      <header className="dh-head">
        <a href="#home" className="dh-logo">Suhani Rajoria<i aria-hidden="true" /></a>
        <nav className="dh-nav" aria-label="Main">
          {NAV.map(([label, href], n) => (
            href === "#play" ? (
              <a key={label} href={href} className="dh-nav-play" onClick={play}>
                {label}
                <span className="sr-only">: race through Hyderabad in the footer</span>
              </a>
            ) : (
              <a key={label} href={href} aria-current={n === 0 ? "page" : undefined} {...(href.endsWith(".pdf") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}</a>
            )
          ))}
        </nav>
        <button type="button" className="dh-burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
          <span /><span />
        </button>
      </header>

      <div className="dh-copy">
        <p className="dh-eyebrow">Designing at the intersection of people, products and possibilities.</p>
        <h1 className="dh-title">
          Ideas,<br />interfaces<br /><span className="dh-and">and</span> <em>a little<br />curiosity</em><i>.</i>
        </h1>
        <a href="#projects" className="dh-explore">
          <span className="dh-ring"><ArrowRight size={18} aria-hidden="true" /></span>
          Explore<br />my work
        </a>
      </div>

      <a href="/work/cosell/" className="dh-feat">
        <img src="/work/cosell/ios/m-today.webp" alt="" loading="lazy" />
        <span className="dh-feat-txt">
          <small>Featured project</small>
          <b>CoSell</b>
          An AI copilot that watches every shop and brings sellers only the decisions that need them.
        </span>
        <ArrowUpRight className="dh-feat-go" size={20} aria-hidden="true" />
      </a>

      <a href="#about" className="dh-peek">
        <img src="/assets/about-suhani.webp" alt="" loading="lazy" />
        A peek into<br />my world
        <ArrowRight size={14} aria-hidden="true" />
      </a>

      <div className={`dh-menu${menu ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!menu}>
        <button type="button" className="dh-close" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>Close</button>
        <nav>
          {NAV.map(([label, href]) => (
            <a key={label} href={href} onClick={(e) => { setMenu(false); if (href === "#play") play(e); }} tabIndex={menu ? 0 : -1}>{label}</a>
          ))}
        </nav>
      </div>
    </section>
  );
}
