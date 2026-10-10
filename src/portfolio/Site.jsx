import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, HandWaving } from "@phosphor-icons/react";
import { hero, work, about, aboutPhoto, experience, skills, contact } from "./content.js";
import { Sticker, Scribble, LoopArrow, Butterfly, Flower, Sparkle } from "./Doodles.jsx";
import "./site.css";

const NAV = [
  ["Projects", "#projects"],
  ["Skillset", "#skills"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

function useReveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function TopBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="rb-top">
      <a href="#top" className="rb-brand">
        <strong>SR.</strong>
        <span>UI/ UX Designer</span>
      </a>
      <button type="button" className={`rb-burger${open ? " is-open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span />
      </button>
      <nav className={`rb-menu${open ? " is-open" : ""}`} aria-label="Primary" onClick={() => setOpen(false)}>
        {NAV.map(([l, h]) => <a key={l} href={h} tabIndex={open ? 0 : -1}>{l}</a>)}
      </nav>
    </header>
  );
}

function JumpPill() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const target = document.getElementById("projects");
    const io = new IntersectionObserver(([e]) => setShow(e.boundingClientRect.top > window.innerHeight * 0.6));
    io.observe(target);
    const onScroll = () => setShow(target.getBoundingClientRect().top > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => (io.disconnect(), window.removeEventListener("scroll", onScroll));
  }, []);
  return (
    <a href="#projects" className={`rb-jump${show ? "" : " is-hidden"}`} tabIndex={show ? 0 : -1}>
      Jump to projects <ArrowDown size={14} weight="bold" aria-hidden="true" />
    </a>
  );
}

function Hero() {
  return (
    <section id="top" className="rb-hero">
      <span className="rb-dots" aria-hidden="true" />
      <p className="rb-kicker">portfolio’ 26</p>
      <h1 className="rb-title">
        <span className="rb-line">
          made to
          <Butterfly className="rb-bfly" />
        </span>
        <span className="rb-line">
          make sense
          <Sticker i={4} size={64} className="rb-title-sticker" />
        </span>
      </h1>
      <p className="rb-sub">
        Final year{" "}
        <span className="rb-underline">
          UXD student
          <Scribble />
        </span>{" "}
        at MIT ADT University
      </p>

      <div className="rb-portrait">
        <img src={hero.fallback} alt="Illustration of Suhani at her desk, chin on hand, smiling at sketches on the wall" fetchPriority="high" />
        <p className="rb-nametag">
          Suhani Rajoria <HandWaving size={26} weight="fill" aria-hidden="true" />
        </p>
        <LoopArrow className="rb-loop" />
        <Butterfly className="rb-bfly-2" color="#7da4f2" />
        <Butterfly className="rb-bfly-3" color="#2747d9" />
        <p className="rb-hi" aria-hidden="true">Hiiii!</p>
        <Sticker i={7} size={58} className="rb-hi-sticker" />
      </div>

      <div className="rb-intro" data-reveal>
        <Sticker i={3} size={56} className="rb-intro-sticker" />
        <p>
          Hi, I'm Suhani, a UX designer who starts with people and ends with pixels. I love research that changes
          the brief, interfaces that feel obvious, and design systems that keep it all honest. Off-screen, it's
          sketchbooks, playlists and too much chai.
        </p>
        <p className="rb-intro-em">Welcome to my little corner of the internet, where research leads and pixels follow… mostly.</p>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="rb-section">
      <div className="rb-head" data-reveal>
        <p>What I’ve been up to over the years</p>
        <h2>
          Projects <Sticker i={1} size={60} className="rb-head-sticker" />
        </h2>
      </div>
      <div className="rb-cards">
        {work.map((p) => (
          <a key={p.name} href={p.href} className="rb-card" data-reveal>
            <p className="rb-card-label">{p.label} ({p.year})</p>
            <h3>{p.name}</h3>
            <p className="rb-card-q">{p.question}</p>
            <div className="rb-card-img">
              <img src={p.image} alt={`${p.name} project preview`} loading="lazy" />
            </div>
            <span className="rb-card-cta">
              View case study <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="rb-section rb-skills">
      <div className="rb-head" data-reveal>
        <p>What I bring to the table</p>
        <h2>
          Skillset <Sticker i={2} size={60} className="rb-head-sticker" />
        </h2>
      </div>
      <p className="rb-skill-list" data-reveal>
        {skills.map((s, i) => (
          <span key={s}>
            {s}
            {i < skills.length - 1 && <i aria-hidden="true"> | </i>}
          </span>
        ))}
      </p>
    </section>
  );
}

function About() {
  const [src, setSrc] = useState(aboutPhoto);
  return (
    <section id="about" className="rb-section rb-about">
      <div className="rb-head" data-reveal>
        <p>The person behind the pixels</p>
        <h2>
          About me <Sticker i={6} size={60} className="rb-head-sticker" />
        </h2>
      </div>
      <div className="rb-about-grid">
        <figure className="rb-photo" data-reveal>
          <img src={src} onError={() => src !== hero.fallback && setSrc(hero.fallback)} alt="Suhani Rajoria" loading="lazy" />
          <Flower className="rb-photo-flower" />
          <Sparkle className="rb-photo-spark" />
        </figure>
        <div className="rb-about-copy" data-reveal>
          {about.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
          <ol className="rb-xp">
            {experience.map((x) => (
              <li key={x.role}>
                <span className="rb-xp-date">{x.from} – {x.to}</span>
                <strong>{x.role}</strong>
                <span>{x.org} · {x.place}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="rb-contact">
      <div className="rb-contact-inner">
        <Flower className="rb-mini-flower" petal="#9db7f5" center="#2747d9" />
        <p className="rb-contact-kicker">Drop me a line, pixels love company</p>
        <h2>Get In Touch</h2>
        <p className="rb-contact-body">
          I’d love to hear from you! Whether it’s a quick hello, a research chat, or planning something big, my inbox
          is always open. Let’s see what we can make.
        </p>
        <a className="rb-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
        <div className="rb-contact-row">
          <div className="rb-links">
            {contact.links.map(([l, h], i) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" className={i === 0 ? "rb-link-outline" : "rb-link-solid"}>
                {l} <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="rb-explore" aria-hidden="true">explore more work ↴</p>
        </div>
        <div className="rb-bouquet" aria-hidden="true">
          <Flower petal="#f2c14e" />
          <Flower petal="#9db7f5" center="#2747d9" />
          <Flower petal="#c9b6f2" center="#5b3fa8" />
        </div>
        <div className="rb-credits">
          <span>created by Suhani Rajoria</span>
          <span>built with Figma, a keyboard and a lot of chai</span>
        </div>
      </div>
    </footer>
  );
}

export default function Site({ withHero = true }) {
  useReveals();
  return (
    <div className="rb">
      {withHero && <TopBar />}
      <main>
        {withHero && (
          <>
            <Hero />
            <hr className="rb-dash" />
          </>
        )}
        <Projects />
        <hr className="rb-dash" />
        <Skills />
        <hr className="rb-dash" />
        <About />
      </main>
      <Contact />
      {withHero && <JumpPill />}
    </div>
  );
}
