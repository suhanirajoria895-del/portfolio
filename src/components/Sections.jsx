import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Copy, Check } from "@phosphor-icons/react";
import { work, experience, contact, aboutPhoto, hero } from "../portfolio/content.js";
import "../sections.css";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useReveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-rv]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Head({ n, label, title, dark }) {
  return (
    <header className={`sx-head${dark ? " is-dark" : ""}`} data-rv>
      <div className="sx-rule">
        <span>({String(n).padStart(2, "0")})</span>
        <span>{label}</span>
        <i aria-hidden="true" /><i aria-hidden="true" />
      </div>
      <h2 className="sx-title">{title}</h2>
    </header>
  );
}

function Count({ value, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) return setN(value);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1300);
        setN(Math.round(value * (1 - (1 - k) ** 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{String(n).padStart(2, "0")}{suffix}</span>;
}

function Marquee({ items, tone = "peri", reverse }) {
  const row = [...items, ...items];
  return (
    <div className={`sx-marquee is-${tone}${reverse ? " is-rev" : ""}`} aria-hidden="true">
      <div className="sx-marquee-track">
        {row.map((t, i) => (
          <span key={i}>{t}<b>✦</b></span>
        ))}
      </div>
    </div>
  );
}

/* (01) — what I do: a Sangria panel where interface clutter clears away on scroll */
const PRINCIPLES = [
  ["Clarity over cleverness", "If it needs explaining, it needs redesigning."],
  ["Evidence over opinion", "Research settles debates that taste can't."],
  ["Systems over screens", "Design the rules, and the screens follow."],
];
const NOISE = [
  "pop-up", "cookie banner", "jargon", "extra step", "dark pattern", "5 CTAs",
  "fine print", "modal", "dropdown maze", "auto-play", "badge spam", "tooltip",
  "hidden fees", "carousel", "loading…", "captcha", "21 fields", "confirm?",
  "settings soup", "notification", "upsell", "terms & conditions", "maybe later", "are you sure?",
];

function Intro() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (reduced()) return el.style.setProperty("--p", 1);
    const tick = () => {
      const r = el.getBoundingClientRect();
      const p = (innerHeight * 0.75 - r.top) / (r.height * 0.9);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    tick();
    addEventListener("scroll", tick, { passive: true });
    return () => removeEventListener("scroll", tick);
  }, []);
  return (
    <section className="sx-impact-wrap" id="intro">
      <div className="sx-impact" ref={ref}>
        <ul className="sx-noise" aria-hidden="true">
          {NOISE.map((n, i) => <li key={n} style={{ "--k": (Math.floor(i / 6) * 6 + ((i * 7) % 6)) / NOISE.length }}>{n}</li>)}
        </ul>
        <div className="sx-impact-top">
          <span>(01)</span><span>What I do</span>
        </div>
        <h2 className="sx-impact-title">
          Good design removes everything that <span>doesn't help.</span>
        </h2>
        <p className="sx-impact-note">My job, mostly, is deciding what to leave out.</p>
        <ol className="sx-impact-principles">
          {PRINCIPLES.map(([t, d], i) => (
            <li key={t}>
              <span>0{i + 1}</span>
              <b>{t}</b>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* (02) — work: stacking cards, each with its own layout (split, poster, banner) */
const TONES = ["dark", "butter", "pine"]; // cornflower, latte, sangria
const LAYOUTS = ["split", "poster", "banner"];

function Work() {
  return (
    <section className="sx" id="projects">
      <header className="sx-work-head" data-rv>
        <div className="sx-rule">
          <span>(02)</span><span>Selected work</span><i aria-hidden="true" /><i aria-hidden="true" />
        </div>
        <div className="sx-work-title">
          <h2 className="sx-title">Case <em>studies.</em></h2>
          <p>Three projects, start to finish: the research, the decisions and the design.</p>
        </div>
      </header>
      <div className="sx-stack">
        {work.map((p, i) => (
          <a key={p.name} href={p.href} className={`sx-card is-${TONES[i % 3]} is-l-${LAYOUTS[i % 3]}`} style={{ "--i": i }}>
            <div className="sx-card-text">
              <div className="sx-card-meta">
                <span>{String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}</span>
                <span>{p.label} · {p.year}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="sx-card-q">{p.question}</p>
              <ul className="sx-tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <span className="sx-pill">
                Read the case study <span className="sx-pill-dot"><ArrowUpRight size={16} weight="bold" aria-hidden="true" /></span>
              </span>
            </div>
            <div className="sx-card-img">
              <img src={p.image} alt={`${p.name} preview`} loading="lazy" />
              <span className="sx-card-sticker">“{p.pull}”</span>
            </div>
            <span className="sx-card-ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* (03) — experience rows */
function Experience() {
  return (
    <section className="sx" id="experience">
      <Head n={3} label="Experience" title={<>Where I've been <em>learning</em> out loud.</>} />
      <ol className="sx-xp">
        {experience.map((x, i) => (
          <li key={x.role} className="sx-xp-row" data-rv style={{ "--d": `${i * 90}ms` }}>
            <span className="sx-xp-date">{x.from}<br />– {x.to}</span>
            <div className="sx-xp-main">
              <h3>{x.role}</h3>
              <p>{x.org}</p>
              <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
            <span className="sx-xp-place"><MapPin size={14} weight="fill" aria-hidden="true" /> {x.place}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* (04) — skills as a periodic table; hover or tap a tile to read where it was used */
const GROUPS = {
  research: { name: "Research", tone: "pine" },
  structure: { name: "Structure", tone: "dark" },
  craft: { name: "Craft", tone: "butter" },
  build: { name: "Build", tone: "ink" },
};
const ELEMENTS = [
  { sym: "Ui", name: "User interviews", g: "research", used: "Ran interviews at ABDA Studio and turned the insights into a clear design direction." },
  { sym: "Ca", name: "Competitor analysis", g: "research", used: "Audited leading hotel websites for strengths and usability gaps at ABDA Studio." },
  { sym: "Jm", name: "Journey mapping", g: "research", used: "Mapped a solo seller's day across three marketplaces to find where CoSell should step in." },
  { sym: "Bd", name: "Brand discovery", g: "research", used: "Led brand discovery for a boutique business hotel website." },
  { sym: "Ia", name: "Information architecture", g: "structure", used: "Restructured UGAO's admin and field apps so field teams find things fast." },
  { sym: "Uf", name: "User flows", g: "structure", used: "Designed CoSell's approval flows and adjustable automation levels." },
  { sym: "Wf", name: "Wireframing", g: "structure", used: "Wireframes and early visual explorations for the ABDA hotel website." },
  { sym: "Pt", name: "Prototyping", g: "structure", used: "Clickable prototypes for every case study, tested before polishing." },
  { sym: "Ds", name: "Design systems", g: "craft", used: "Built UGAO's shared design system and Rove's system, with developers in the loop." },
  { sym: "Ax", name: "Accessibility", g: "craft", used: "Bilingual UI, clear hierarchy and guided forms for UGAO users with varied digital literacy." },
  { sym: "Vd", name: "Visual design", g: "craft", used: "70+ high-fidelity screens for UGAO, plus every case study on this site." },
  { sym: "Br", name: "Branding", g: "craft", used: "Created Rove's brand identity, a music festival companion app." },
  { sym: "Ty", name: "Typography", g: "craft", used: "Minor in Graphic Design; type is where most of my screens start." },
  { sym: "Fg", name: "Figma", g: "build", used: "Home base: components, variables, auto layout and prototyping." },
  { sym: "Re", name: "React", g: "build", used: "Built this portfolio in React, so I know what my handoffs ask of developers." },
  { sym: "Vc", name: "Vibe coding", g: "build", used: "Turning prototypes into working demos, like CoSell's interactive build." },
];

function Skills() {
  const [active, setActive] = useState(0);
  const el = ELEMENTS[active];
  return (
    <section className="sx" id="skills">
      <Head n={4} label="Skillset" title={<>The elements I <em>design with.</em></>} />
      <div className="sx-table">
        <div className="sx-tiles">
          {ELEMENTS.map((e, i) => (
            <button
              key={e.sym}
              type="button"
              className={`sx-tile is-${GROUPS[e.g].tone}${i === active ? " is-on" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={e.name}
            >
              <span className="sx-tile-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="sx-tile-sym">{e.sym}</span>
              <span className="sx-tile-name">{e.name}</span>
            </button>
          ))}
        </div>
        <aside className={`sx-readout is-${GROUPS[el.g].tone}`} aria-live="polite">
          <div className="sx-readout-top">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span>{GROUPS[el.g].name}</span>
          </div>
          <p className="sx-readout-sym" key={el.sym}>{el.sym}</p>
          <h3>{el.name}</h3>
          <p className="sx-readout-used"><span>Where I used it</span>{el.used}</p>
          <ul className="sx-legend">
            {Object.entries(GROUPS).map(([k, g]) => (
              <li key={k}><i className={`is-${g.tone}`} />{g.name}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* (05) — about: a bento of photo, story, currently, off-screen */
function About() {
  const [src, setSrc] = useState(aboutPhoto);
  return (
    <section className="sx" id="about">
      <Head n={5} label="About me" title={<>Hi again. Here's the <em>longer</em> version.</>} />
      <div className="sx-about">
        <figure className="sx-photo" data-rv>
          <img src={src} onError={() => src !== hero.fallback && setSrc(hero.fallback)} alt="Suhani Rajoria" loading="lazy" />
          <figcaption>Suhani, Pune</figcaption>
        </figure>

        <div className="sx-story is-butter" data-rv>
          <p className="sx-story-lead">I'm Suhani Rajoria, a UX designer with a graphic designer's eye.</p>
          <p>
            I'm completing my B.Des in User Experience Design at MIT ADT University, with a minor in Graphic Design.
            My work sits where research meets visual craft: I start with how people actually think and behave, then
            shape interfaces and systems that feel considered, accessible and quietly confident.
          </p>
          <p>
            I'm most drawn to complex products and emerging AI interactions, where clarity and trust carry the most weight.
          </p>
          <p className="sx-sign">Suhani.</p>
        </div>

        <div className="sx-now is-dark" data-rv>
          <span className="sx-badge"><i /> Currently</span>
          <p>Finishing my B.Des and looking for <strong>product design roles from 2027.</strong></p>
        </div>

        <div className="sx-off is-pine" data-rv>
          <span className="sx-badge">Off-screen</span>
          <ul>
            <li>Sketchbooks</li>
            <li>New playlists</li>
            <li>One more chai</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* (06) — contact: marquee band + big dark card */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };
  return (
    <footer id="contact" className="sx-contact-wrap">
      <Marquee items={["Let's talk", "Say hello", "Open to work from 2027", "Got a messy problem?"]} />
      <div className="sx-contact">
        <div className="sx-rule is-dark">
          <span>(06)</span><span>Get in touch</span><i aria-hidden="true" /><i aria-hidden="true" />
        </div>
        <div className="sx-contact-grid">
          <div>
            <h2 className="sx-contact-title">Got a problem that needs to <em>make sense?</em></h2>
            <p className="sx-contact-body">
              Internships, full-time roles, a research chat or just a hello.
            </p>
          </div>
          <div className="sx-contact-card">
            <span className="sx-badge is-live"><i /> Available from 2027</span>
            <a className="sx-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className="sx-contact-actions">
              <a className="sx-pill" href={`mailto:${contact.email}`}>
                Write to me <span className="sx-pill-dot"><ArrowUpRight size={16} weight="bold" aria-hidden="true" /></span>
              </a>
              <button type="button" className="sx-copy" onClick={copy}>
                {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />} {copied ? "Copied" : "Copy email"}
              </button>
            </div>
            <div className="sx-links">
              {contact.links.map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer">{l} <ArrowUpRight size={14} aria-hidden="true" /></a>
              ))}
            </div>
          </div>
        </div>
        <p className="sx-bigname" aria-hidden="true">Suhani Rajoria</p>
        <div className="sx-credits">
          <span>© {new Date().getFullYear()} Suhani Rajoria</span>
          <span>Designed in Figma, built with React, fuelled by chai.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function Sections() {
  useReveals();
  return (
    <div className="sx-page">
      <main>
        <Intro />
        <Work />
        <Experience />
        <Skills />
        <About />
      </main>
      <Contact />
    </div>
  );
}
