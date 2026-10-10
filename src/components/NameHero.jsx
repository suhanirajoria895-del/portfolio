import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../name-hero.css";

const NAV = [
  ["Home", "#home"],
  ["Work", "#work"],
  ["Play", "#projects"],
  ["Contact", "#contact"],
];

// One strip image, eight evenly spaced characters; each slot crops its own eighth.
const CHARACTERS = [
  ["Did anyone actually ask the user?", "Suhani with sticky notes and a pen, thinking"],
  ["It's 2px off. I can feel it.", "Suhani squinting through a magnifying glass"],
  ["One more iteration. Okay, ten.", "Suhani in a hoodie, eyes closed, holding a mug"],
  ["What if we flip it?", "Suhani with a lightbulb above her head, finger raised"],
  ["Let me prototype that real quick.", "Suhani pointing at a phone showing a prototype"],
  ["Cool, but why?", "Suhani with arms crossed and a pencil behind her ear, sceptical"],
  ["And that's why it works.", "Suhani in a lilac blazer presenting with a clicker"],
  ["Designing in my head again.", "Suhani in headphones daydreaming, shapes floating above"],
];
const MOBILE_SET = new Set([0, 1, 3, 4, 7]);

const FIRST = "SUHANI";
const LAST = "RAJORIA";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function NameHero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openChar, setOpenChar] = useState(null);
  const [pinned, setPinned] = useState(false);

  // Fit the name to the available width (one line on desktop, two on mobile).
  useLayoutEffect(() => {
    const h1 = nameRef.current;
    if (!h1) return;
    const fit = () => {
      const words = h1.querySelectorAll(".nh-word");
      h1.style.fontSize = "100px";
      const avail = h1.clientWidth;
      const stacked = window.matchMedia("(max-width: 640px)").matches;
      const widths = [...words].map((w) => w.getBoundingClientRect().width);
      const need = stacked ? Math.max(...widths) : widths[0] + widths[1];
      h1.style.fontSize = `${Math.floor((avail / need) * 100 * 0.995 * 10) / 10}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(h1);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  // Kick off the load sequence.
  useEffect(() => {
    const id = requestAnimationFrame(() => heroRef.current?.classList.add("is-in"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Mouse parallax + proximity lift on the name.
  useEffect(() => {
    if (reduced() || !window.matchMedia("(hover: hover)").matches) return;
    const hero = heroRef.current;
    const letters = [...hero.querySelectorAll(".nh-g")];
    let raf = 0;
    let ev = null;
    const tick = () => {
      raf = 0;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((ev.clientX - r.left) / r.width - 0.5) * 2);
      hero.style.setProperty("--my", ((ev.clientY - r.top) / r.height - 0.5) * 2);
      const nr = nameRef.current.getBoundingClientRect();
      const over = ev.clientY > nr.top - 40 && ev.clientY < nr.bottom + 40;
      for (const l of letters) {
        const lr = l.getBoundingClientRect();
        const d = Math.hypot(ev.clientX - (lr.left + lr.width / 2), ev.clientY - (lr.top + lr.height / 2));
        const k = over ? Math.max(0, 1 - d / (nr.height * 1.1)) : 0;
        l.style.setProperty("--lift", k.toFixed(3));
      }
    };
    const move = (e) => {
      ev = e;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    hero.addEventListener("pointermove", move);
    return () => {
      hero.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll: name shrinks away, characters sink, wordmark pins in the top bar.
  useEffect(() => {
    const hero = heroRef.current;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.55)));
        hero.style.setProperty("--sp", p.toFixed(3));
        setPinned(p > 0.85);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close an open speech bubble when tapping elsewhere.
  useEffect(() => {
    if (openChar === null) return;
    const close = (e) => !e.target.closest(".nh-char") && setOpenChar(null);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [openChar]);

  const navLinks = (cls) =>
    NAV.map(([label, href], i) => (
      <a key={label} href={href} className={cls} aria-current={i === 0 ? "page" : undefined}>
        {label}
      </a>
    ));

  let n = 0;
  const word = (text, cls) => (
    <span className={`nh-word ${cls}`}>
      {[...text].map((ch) => {
        const i = n++;
        return (
          <span key={i} className="nh-l" style={{ "--i": i }}>
            <span className={`nh-g${i < 4 ? " is-rgb" : ""}`} data-l={ch}>
              {ch}
            </span>
          </span>
        );
      })}
    </span>
  );

  return (
    <>
      <div className={`nh-bar${pinned ? " is-pinned" : ""}`} aria-hidden={!pinned}>
        <a href="#home" className="nh-mark" tabIndex={pinned ? 0 : -1}>
          SUHANI<span>RAJORIA</span>
        </a>
        <nav className="nh-bar-nav" aria-label="Sticky">
          {NAV.map(([label, href]) => (
            <a key={label} href={href} tabIndex={pinned ? 0 : -1}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <section id="home" className="nh" ref={heroRef}>
        <div className="nh-bg" aria-hidden="true">
          <span className="nh-blob b1" />
          <span className="nh-blob b2" />
          <span className="nh-blob b3" />
          <span className="nh-dots" />
        </div>

        <p className="nh-statement nh-fade">
          I turn deep user research into clear, trustworthy products, from first insight to final pixel.
        </p>

        <nav className="nh-nav" aria-label="Primary">
          <div className="nh-nav-links">{navLinks("nh-link")}</div>
          <button
            type="button"
            className="nh-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="nh-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <div id="nh-menu" className={`nh-menu${menuOpen ? " is-open" : ""}`} onClick={() => setMenuOpen(false)}>
            {navLinks("nh-menu-link")}
          </div>
        </nav>

        <div className="nh-center">
          <div className="nh-labels nh-fade">
            <span>UI/UX &amp; Product Designer</span>
            <span>MIT-ID · Pune / Hyderabad</span>
          </div>
          <h1 className="nh-name" ref={nameRef} aria-label="Suhani Rajoria">
            <span aria-hidden="true">
              {word(FIRST, "is-first")}
              {word(LAST, "is-last")}
            </span>
          </h1>
        </div>

        <p className="nh-audience nh-fade">
          For teams building in complex spaces, where getting it right matters more than getting it fast.
        </p>

        <ul className="nh-chars" aria-label="Suhani in different design moods">
          {CHARACTERS.map(([line, alt], i) => (
            <li
              key={i}
              className={`nh-char${MOBILE_SET.has(i) ? "" : " is-desk"}${openChar === i ? " is-open" : ""}`}
              style={{ "--i": i }}
            >
              <button
                type="button"
                className="nh-char-btn"
                aria-label={`${alt}: “${line}”`}
                aria-expanded={openChar === i}
                onClick={() => setOpenChar((o) => (o === i ? null : i))}
              >
                <span className="nh-char-crop">
                  <img
                    src="/assets/hero-characters.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="2000"
                    height="667"
                    style={{ "--x": i }}
                  />
                </span>
              </button>
              <span className="nh-bubble" role="tooltip">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
