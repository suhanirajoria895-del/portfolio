import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, X, Zap, Siren, EyeOff, PhoneIncoming, ShieldCheck, Landmark, Clock, UserPlus,
  IndianRupee, ArrowDownLeft, Flag, Users, Smartphone, Layers, MousePointerClick, PhoneCall, TriangleAlert, ListOrdered,
  Search, FileText, Newspaper, MessagesSquare, Video,
} from "lucide-react";
import { useActiveId, useRevealAll } from "../cosell/hooks.js";
import { Device, PwMark, SignalPhone } from "./demo/screens.jsx";
import { CanWont, EdgePlayer, SaidNo, TheBet } from "./Extras.jsx";

const P = "/work/paywise/";
const DEMO = "/work/paywise/demo/";
const IANS_LOSS = "https://ianslive.in/indians-lose-over-rs-52976-crore-to-cyber-frauds-over-six-years-report--20260103154943";
const IANS_UPI = "https://ianslive.in/upi-frauds-worth-rs-805-crore-witnessed-this-fiscal-so-far-minister--20251215175703";
const FOF = "https://frankonfraud.com/wp-content/uploads/2026/01/Digital-Arrest-Scams-Explained.pdf";
const GOLDEN = "https://cscoe.itewb.gov.in/upload/advisory-n/Advisory%20_Golden%20Hour_V1.pdf";

const SECTIONS = [
  ["problem", "Problem"],
  ["research", "Research"],
  ["analysis", "Analysis"],
  ["synthesis", "Synthesis"],
  ["design", "Design"],
  ["solution", "Solution"],
  ["reflection", "Reflection"],
];

export default function CaseStudy() {
  useRevealAll();
  useProgress();
  const ids = useMemo(() => SECTIONS.map(([id]) => id), []);
  const active = useActiveId(ids);
  return (
    <div className="rk-shell">
      <div className="rk-progress" aria-hidden="true" />
      <Sidebar active={active} />
      <Chips active={active} />
      <main className="rk">
        <Header />
        <Problem />
        <Research />
        <Analysis />
        <Synthesis />
        <Design />
        <Solution />
        <Reflection />
      </main>
    </div>
  );
}

/* ───────────────────────── helpers ───────────────────────── */

function useProgress() {
  useEffect(() => {
    const bar = document.querySelector(".rk-progress");
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar?.style.setProperty("--p", String(h > 0 ? scrollY / h : 0));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
}

/** True once the element has scrolled into view. */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (new URLSearchParams(location.search).get("reveal") === "all" || !("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function CountUp({ to, decimals = 0, prefix = "", suffix = "", ms = 1400 }) {
  const [ref, seen] = useInView(0.6);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, ms]);
  const txt = v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{prefix}{txt}{suffix}</span>;
}

/** A live prototype phone that mounts when it scrolls into view, so its motion plays for the reader. */
function LivePhone({ screen, scale = 0.6, className = "" }) {
  const [ref, seen] = useInView(0.35);
  return (
    <div ref={ref} className={`rk-live ${className}`} style={{ width: 390 * scale, height: 844 * scale }}>
      {seen ? <Device screen={screen} style={{ zoom: scale }} /> : <div className="rk-live__ph" />}
    </div>
  );
}

function Sec({ id, n, kicker, title, lede, children }) {
  return (
    <section id={id} className="rk-sec">
      <header className="rk-sec__head" data-reveal>
        <p className="rk-kicker"><span>{n}</span> {kicker}</p>
        <h2>{title}</h2>
        {lede && <p className="rk-lede">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

function Part({ title, lede, tag, children }) {
  return (
    <div className="rk-part">
      <header className="rk-part__head" data-reveal>
        <h3>{title}{tag && <Tag kind={tag} />}</h3>
        {lede && <p className="rk-body">{lede}</p>}
      </header>
      {children}
    </div>
  );
}

const TAGS = { desk: "Desk research", archetype: "Archetype", target: "Target, not tested", confirm: "To confirm" };
function Tag({ kind }) {
  return <span className={`rk-tag rk-tag--${kind}`}>{TAGS[kind]}</span>;
}

function Sticky({ c = "y", r = 0, children, className = "" }) {
  return <div className={`sticky sticky--${c} ${className}`} style={{ "--r": `${r}deg` }}>{children}</div>;
}

/* ───────────────────────── shell ───────────────────────── */

function Sidebar({ active }) {
  const idx = SECTIONS.findIndex(([id]) => id === active);
  return (
    <aside className="rk-side">
      <a href="/#projects" className="rk-side__back"><span aria-hidden="true">←</span> All work</a>
      <p className="rk-side__proj"><PwMark size={18} /> Paywise</p>
      <nav aria-label="Case study sections">
        <ol>
          {SECTIONS.map(([id, label], i) => (
            <li key={id} className={i < idx ? "done" : ""}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}><span className="n">{String(i + 1).padStart(2, "0")}</span>{label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <Countdown />
      <a className="rk-side__cta" href={DEMO} target="_blank" rel="noreferrer">Try the prototype <ArrowUpRight size={15} /></a>
    </aside>
  );
}

/** Reading progress, drawn as the pause: ten seconds run down as you scroll. */
function Countdown() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setP(h > 0 ? Math.min(1, scrollY / h) : 0);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const left = Math.ceil(10 * (1 - p));
  const C = 2 * Math.PI * 20;
  return (
    <div className="rk-count" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" className="t" />
        <circle cx="24" cy="24" r="20" className="b" strokeDasharray={C} strokeDashoffset={C * p} />
      </svg>
      <b>{left > 0 ? left : <Check size={18} />}</b>
      <span>Reading progress</span>
    </div>
  );
}

function Chips({ active }) {
  return (
    <nav className="rk-chips" aria-label="Jump to section">
      {SECTIONS.map(([id, label], i) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}><span>{String(i + 1).padStart(2, "0")}</span> {label}</a>
      ))}
    </nav>
  );
}

/* ───────────────────────── header ───────────────────────── */

function Header() {
  return (
    <header className="rk-head">
      <div className="rk-head__copy" data-reveal>
        <p className="rk-mono">Case study 02 · Product design · Self-initiated</p>
        <h1>Paywise: a <em>10-second pause</em> inside UPI apps, for payments that look like scams</h1>
        <p className="rk-lede">
          Paywise is a safety layer for existing UPI apps. Normal payments don't change. When signals point to a scam, it pauses
          the payment for 10 seconds, explains why, and offers a call to a trusted person. If the money has already gone, it
          guides the person through reporting.
        </p>
        <a className="rk-btn" href={DEMO} target="_blank" rel="noreferrer">Try the prototype <ArrowRight size={16} /></a>
      </div>

      <div className="rk-hero" aria-hidden="true" inert>
        <div className="rk-hero__glow" />
        <LivePhone screen="home" scale={0.58} className="rk-hero__a" />
        <LivePhone screen="risk" scale={0.58} className="rk-hero__b" />
        <div className="rk-chip rk-chip--a"><span className="i i--amber"><Clock size={16} /></span><span><b>10 seconds</b>only when it looks wrong</span></div>
        <div className="rk-chip rk-chip--b"><span className="i"><ShieldCheck size={16} /></span><span><b>Protected by Paywise</b>inside the app you already use</span></div>
      </div>

      <dl className="rk-facts" data-reveal>
        {[
          ["Role", "Product designer"],
          ["Type", "Personal project"],
          ["Platform", "A layer inside existing UPI apps, plus a small companion app"],
          ["Tools", "Figma (design), React (prototype)"],
        ].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>

      <ul className="rk-glance" data-reveal>
        <li><b><CountUp to={19813} prefix="₹" /> cr</b><span>lost to cyber fraud in India in 2025</span></li>
        <li className="mid"><PwMark size={40} /><span>Most payments see no change. Risky ones get a 10-second pause and a trusted contact.</span></li>
        <li><b>1 hour</b><span>the “golden hour”, when reporting fast helps police act<a href={GOLDEN} target="_blank" rel="noreferrer">Advisory ↗</a></span></li>
      </ul>
    </header>
  );
}

/* ───────────────────────── 01 problem ───────────────────────── */

function Problem() {
  return (
    <Sec id="problem" n="01" kicker="Problem" title="Scams take hours. The payment takes seconds."
      lede="Digital arrest scams keep people on calls for hours or days. The payment at the end looks like any other UPI payment and finishes in seconds. I found no safeguard that acts at that point, so that is where this project focuses.">
      <div className="rk-stats" data-reveal>
        <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="rk-stat rk-stat--dark">
          <b><CountUp to={19813} prefix="₹" /><small> cr</small></b>
          <span>lost to cyber fraud in India in 2025, across about 21.8 lakh complaints</span>
          <em>I4C data via IANS ↗</em>
        </a>
        <a href={IANS_UPI} target="_blank" rel="noreferrer" className="rk-stat">
          <b><CountUp to={10.64} decimals={2} /><small> lakh</small></b>
          <span>UPI fraud incidents worth ₹805 crore, April to November 2025 alone</span>
          <em>Finance Ministry, Lok Sabha ↗</em>
        </a>
        <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="rk-stat">
          <b><CountUp to={8} /><small>%</small></b>
          <span>of 2025 losses came from "digital arrest" scams</span>
          <em>I4C data via IANS ↗</em>
          <div className="rk-stat__bar"><i /></div>
        </a>
      </div>

      <Race />

      <div className="rk-chain" data-reveal>
        {[
          [Zap, "The payment", "Done in seconds", "A UPI payment has no built-in step that asks the person to stop and check."],
          [Siren, "The method", "Authority and urgency", "Callers pose as police, banks or couriers and demand action immediately."],
          [EyeOff, "The result", "Late reporting", "Many victims don't tell anyone at first. Delay makes the money harder to trace."],
        ].map(([Ic, k, t, d], i) => (
          <div key={k} className="rk-chain__card" style={{ "--i": i }}>
            <span className="rk-chain__ic"><Ic size={22} strokeWidth={1.6} /></span>
            <p className="rk-mono">{k}</p>
            <h4>{t}</h4>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/** Two timelines side by side: the scammer's long build-up, and the 2 seconds the payment takes. */
function Race() {
  const [ref, seen] = useInView(0.15);
  return (
    <figure ref={ref} className={`rk-race${seen ? " go" : ""}`}>
      <figcaption><b>Where Paywise acts.</b> A 10-second delay fits inside the payment step. Normal payments lose nothing, because it appears only when signals point to risk.</figcaption>
      <div className="rk-race__lane">
        <span className="rk-race__lbl"><PhoneIncoming size={16} /> Scam call</span>
        <div className="rk-race__track">
          {["Call", "Accusation", "Isolation", "Urgency"].map((s, i) => <i key={s} style={{ "--i": i }}>{s}</i>)}
        </div>
        <span className="rk-race__t">Hours</span>
      </div>
      <div className="rk-race__lane rk-race__lane--pay">
        <span className="rk-race__lbl"><IndianRupee size={16} /> UPI payment</span>
        <div className="rk-race__track"><b className="rk-race__tap">Click, PIN, gone</b><em className="rk-race__gap">Paywise's 10 seconds go here</em></div>
        <span className="rk-race__t">Seconds</span>
      </div>
    </figure>
  );
}

/* ───────────────────────── 02 research ───────────────────────── */

function Research() {
  return (
    <Sec id="research" n="02" kicker="Research" title="Digital arrest scams follow a repeatable script"
      lede="This is desk research: government data given to Parliament, news reports, cybercrime advisories and victim accounts on forums. I haven't interviewed survivors, and that is the biggest gap in this project.">
      <Evidence />

      <Part title="How a digital arrest unfolds" tag="desk" lede="Based on a Frank on Fraud explainer and news reports. The lines are my reconstruction, not a recording. Scroll to step through the stages.">
        <Transcript />
      </Part>

      <Part title="Existing protections miss the moment of payment" lede="UPI has real protections. They either run inside the bank, where the person can't see them, or start after the money has gone.">
        <GapMap />
      </Part>
    </Sec>
  );
}

const ARTICLES = [
  { img: "art-ians-loss.webp", host: "ianslive.in", href: IANS_LOSS, fact: "₹52,976 crore lost to frauds over six years. ₹19,813 crore in 2025 alone.", w: 610, h: 560 },
  { img: "art-ians-upi.webp", host: "ianslive.in", href: IANS_UPI, fact: "10.64 lakh UPI fraud incidents, reported to Parliament.", w: 610, h: 610 },
  { img: "art-cybercrime.webp", host: "cybercrime.gov.in", href: "https://cybercrime.gov.in/", fact: "Reporting exists, but only after the money is gone.", w: 800, h: 200 },
];

/** Real articles the research is built on: a small pile of clippings, one fact list. Picking a fact brings its clipping forward. */
function Evidence() {
  const [on, setOn] = useState(0);
  return (
    <div className="rk-ev" data-reveal>
      <div className="rk-ev__pile">
        {ARTICLES.map((a, i) => (
          <a key={a.img} href={a.href} target="_blank" rel="noreferrer" className={`rk-ev__clip rk-ev__clip--${i}${on === i ? " on" : ""}`}
            onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} aria-label={`Open the ${a.host} source`}>
            <span className="rk-ev__bar"><i /><i /><i /><em>{a.host}</em></span>
            <img src={`${P}${a.img}`} alt="" width={a.w} height={a.h} loading="lazy" />
          </a>
        ))}
      </div>
      <ol className="rk-ev__facts">
        {ARTICLES.map((a, i) => (
          <li key={a.img}>
            <button className={on === i ? "on" : ""} onMouseEnter={() => setOn(i)} onClick={() => setOn(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{a.fact}</b>
              <small>{a.host}</small>
            </button>
          </li>
        ))}
        <li className="rk-ev__also">Also: Lok Sabha replies, I4C advisories, victim stories on forums.</li>
      </ol>
    </div>
  );
}

const CALL = [
  ["them", "This is Inspector Sharma, Mumbai Cyber Cell. A parcel in your name had drugs and 14 fake passports.", "1 · The call", "Police, a court or an embassy, often on video"],
  ["them", "Your Aadhaar is linked to a money-laundering case. A warrant is being issued.", "2 · The accusation", "Your number or parcel is linked to a crime"],
  ["them", "You are under digital arrest. Stay on video. Don't tell your family, it will affect the case.", "3 · Isolation", "Stay on call, tell no one, for hours or days"],
  ["them", "Transfer your savings for RBI verification. It will be returned once you are cleared.", "4 · The money", "Many transfers, often over weeks"],
  ["me", "Okay, sir. I'll send it now.", null, null],
];

const CALL_TIMES = ["00:04", "12:40", "1:26:08", "3:41:22", "3:41:30"];

/** The call plays as you scroll: each stage on the right brings its line into the call on the left. */
function Transcript() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (new URLSearchParams(location.search).get("reveal") === "all" || !("IntersectionObserver" in window)) return setStep(CALL.length - 1);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setStep(Number(e.target.dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ref.current.querySelectorAll("[data-i]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="rk-call rk-call--scroll">
      <div className="rk-call__phone">
        <div className="rk-call__bar"><Video size={16} /> Video call · <b>Unknown number</b><span className="rk-call__t">{CALL_TIMES[step]}</span></div>
        <ul>
          {CALL.map(([who, line], i) => <li key={i} className={`${who}${i <= step ? " on" : ""}`}>{line}</li>)}
        </ul>
      </div>
      <ol className="rk-call__notes">
        {CALL.filter((c) => c[2]).map(([, , stage, note], i) => (
          <li key={stage} data-i={i} className={i === step ? "on" : ""}><b>{stage}</b><span>{note}</span></li>
        ))}
        <li data-i={4} className={`rk-call__real${step === 4 ? " on" : ""}`}>
          <span>One Mumbai senior sent <b>₹58 crore over 40 days</b>, in 27 transfers.</span>
          <a href={FOF} target="_blank" rel="noreferrer">Frank on Fraud ↗</a>
        </li>
      </ol>
    </div>
  );
}

function GapMap() {
  const cols = [
    ["Before paying", ["Device binding", "UPI PIN", "Daily limits"]],
    ["The moment of pressure", []],
    ["After the loss", ["1930 helpline", "cybercrime.gov.in", "Chakshu reporting"]],
  ];
  return (
    <figure className="rk-gap" data-reveal>
      <div className="rk-gap__bank"><Landmark size={16} /> Inside the bank, invisible to the person: NPCI's AI fraud monitoring</div>
      <div className="rk-gap__cols">
        {cols.map(([t, items], i) => (
          <div key={t} className={`rk-gap__col${i === 1 ? " hole" : ""}`}>
            <p className="rk-mono">{t}</p>
            {items.map((x) => <span key={x} className="rk-gap__pill"><Check size={14} /> {x}</span>)}
            {i === 1 && <p className="rk-gap__hole"><b>The gap.</b> No protection here supports the person while they are being pressured to pay.</p>}
          </div>
        ))}
      </div>
      <p className="rk-note">Source: <a href={IANS_UPI} target="_blank" rel="noreferrer">Finance Ministry reply in the Lok Sabha, via IANS</a></p>
    </figure>
  );
}

/* ───────────────────────── 03 analysis ───────────────────────── */

function Analysis() {
  return (
    <Sec id="analysis" n="03" kicker="Analysis" title="Isolation is part of the scam, so the design has two users"
      lede="Scammers tell victims not to contact family. So Paywise serves two people, the person paying and someone they trust, and does two jobs: slow the risky payment, and make that contact easy.">
      <Part title="Who this is for" tag="archetype" lede="Archetypes built from the research, not interviewed people.">
        <People />
      </Part>
      <Part title="Stress across a scam" lede="My reading of the research, not measured data.">
        <Curve />
      </Part>
      <Part title="From findings to design decisions">
        <Insights />
      </Part>
    </Sec>
  );
}

function People() {
  return (
    <div className="rk-people" data-reveal>
      <article className="rk-person">
        <span className="rk-avatar" aria-hidden="true">S</span>
        <div>
          <h4>Sunita, 58</h4>
          <p className="rk-mono">Retired teacher · Pune</p>
          <ul className="rk-person__facts">
            <li>Uses UPI for groceries and her pension</li>
            <li>Trusts anyone who sounds official</li>
            <li>Would rather not "trouble" her son</li>
          </ul>
          <p className="rk-need"><span>Needs</span>A clear reason to stop, without blame</p>
        </div>
      </article>
      <svg className="rk-people__link" viewBox="0 0 120 40" aria-hidden="true"><path d="M4 30 C 40 0, 80 0, 116 30" /></svg>
      <article className="rk-person">
        <span className="rk-avatar alt" aria-hidden="true">R</span>
        <div>
          <h4>Rohan, 31</h4>
          <p className="rk-mono">Sunita's son · works in Bengaluru</p>
          <ul className="rk-person__facts">
            <li>Set up her phone and her UPI</li>
            <li>Worries about scam calls</li>
            <li>Lives 800 km away</li>
          </ul>
          <p className="rk-need"><span>Needs</span>To be reachable before the payment completes</p>
        </div>
      </article>
    </div>
  );
}

const CURVE = [
  ["Unknown call", 0.2], ["Fear", -1.5], ["Isolation", -2.2], ["Urgency", -3], ["Payment", -1.1], ["Doubt", -2], ["Shame", -3.2], ["Late report", -2.5],
];

function Curve() {
  const [ref, seen] = useInView(0.15);
  const W = 960, H = 360, x0 = 96, x1 = 920, top = 64, bot = 270;
  const y = (v) => top + ((0.6 - v) / 4) * (bot - top);
  const pts = CURVE.map(([, v], i) => [x0 + (i * (x1 - x0)) / (CURVE.length - 1), y(v)]);
  const d = pts.reduce((acc, [x, yy], i) => {
    if (i === 0) return `M${x} ${yy}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${yy}, ${x} ${yy}`;
  }, "");
  const step = (x1 - x0) / (CURVE.length - 1);
  const band = (i0, i1) => [pts[i0][0] - step / 2, pts[i1][0] + step / 2];
  const [p0, p1] = band(3, 3);
  const [g0, g1] = band(5, 6);
  return (
    <figure ref={ref} className={`rk-curve${seen ? " go" : ""}`}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Emotion drops from a normal call through fear, isolation and urgency, lifts briefly at payment, then falls to shame before a late report.">
        <defs>
          <linearGradient id="rkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1B3F8F" stopOpacity="0.02" />
            <stop offset="1" stopColor="#1B3F8F" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <rect x={p0} y={top - 40} width={p1 - p0} height={bot - top + 52} rx="14" className="band band--pause" />
        <rect x={g0} y={top - 40} width={g1 - g0} height={bot - top + 52} rx="14" className="band band--guide" />
        <text x={(p0 + p1) / 2} y={top - 18} textAnchor="middle" className="band__t band__t--pause">Paywise pauses</text>
        <text x={(g0 + g1) / 2} y={top - 18} textAnchor="middle" className="band__t band__t--guide">Paywise guides</text>
        {[0, 1, 2, 3].map((k) => <line key={k} x1={x0 - 24} x2={x1 + 20} y1={top + (k * (bot - top)) / 3} y2={top + (k * (bot - top)) / 3} className="grid" />)}
        <text x="20" y={top + 4} className="axis">Calm</text>
        <text x="20" y={bot + 4} className="axis">Panic</text>
        <path d={`${d} L ${pts[pts.length - 1][0]} ${top} L ${pts[0][0]} ${top} Z`} className="area" />
        <path d={d} className="line" pathLength="1" />
        {pts.map(([x, yy], i) => (
          <g key={i} className={`pt${i === 3 || i === 6 ? " pt--key" : ""}`} style={{ "--i": i }}>
            <circle cx={x} cy={yy} r={i === 3 || i === 6 ? 9 : 6} />
            <text x={x} y={bot + 50} textAnchor="middle" className="xl">{CURVE[i][0]}</text>
          </g>
        ))}
      </svg>
      <figcaption>Paywise acts at two points: just before the payment, when urgency peaks, and after it, when people delay reporting.</figcaption>
    </figure>
  );
}

const INSIGHTS = [
  ["Scams rely on urgency", "Add a pause, only on risky payments"],
  ["Scammers isolate victims", "Make it easy to involve one trusted person"],
  ["Frequent warnings get ignored", "Interrupt rarely, and give specific reasons"],
  ["Shame delays reporting", 'A blame-free "I think I\'ve been scammed" flow'],
  ["Early reporting matters most", "Step-by-step recovery: call 1930, block, report"],
];

function Insights() {
  return (
    <ol className="rk-ins">
      {INSIGHTS.map(([a, b], i) => (
        <li key={a} data-reveal style={{ "--i": i }}>
          <div className="rk-ins__q"><span className="rk-ins__n">{String(i + 1).padStart(2, "0")}</span><p>{a}</p></div>
          <span className="rk-ins__arrow" aria-hidden="true"><ArrowRight size={20} /></span>
          <div className="rk-ins__move"><p className="rk-mono">Design move</p><p>{b}</p></div>
        </li>
      ))}
    </ol>
  );
}

/* ───────────────────────── 04 synthesis ───────────────────────── */

function Synthesis() {
  return (
    <Sec id="synthesis" n="04" kicker="Synthesis" title="Add friction only to risky payments">
      <blockquote className="rk-hmw" data-reveal>
        <span className="rk-mono">How might we</span>
        help people stop and think at the exact moment a scam pushes them to pay, <em>without slowing down</em> the
        thousands of normal payments they make?
      </blockquote>

      <Part title="Where AI fits" lede="AI does two things here: it detects signals and explains them. Turn signals on and off to see how the pause screen changes. One weak signal doesn't trigger a pause.">
        <SignalMeter />
        <CanWont />
      </Part>

      <Part title="Key decision: pause, don't block" lede="Paywise never blocks a payment. This is the most debatable decision in the project. Compare both options below. The outcomes are my reasoning, not test results.">
        <TheBet />
      </Part>

      <Part title="Trade-offs: design decisions and reasoning" lede="The options I considered, and why I chose differently.">
        <SaidNo />
      </Part>
    </Sec>
  );
}

const SIGNALS = [
  ["payee", UserPlus, "A payee you've never paid", 2, "You've never paid this person", "vikram.verify77@ybl"],
  ["amount", IndianRupee, "A large amount for you", 1, "Much more than you usually send", "Usually under ₹5,000"],
  ["call", PhoneIncoming, "Paying soon after an unknown call", 2, "Unknown caller, 3 minutes ago", "You're still on that call"],
  ["collect", ArrowDownLeft, 'A "collect" request', 2, "This request takes your money", "You will not receive anything"],
  ["reported", Flag, "A payee others have reported", 3, "Other people reported this payee", "Reported to Paywise this month"],
];

function SignalMeter() {
  const [on, setOn] = useState(["payee", "call"]);
  const active = SIGNALS.filter(([id]) => on.includes(id));
  const score = active.reduce((s, x) => s + x[3], 0);
  const pause = score >= 3;
  const pct = Math.min(100, (score / 6) * 100);
  const reasons = active.map(([, Icon, , , title, sub]) => ({ Icon, title, sub }));
  return (
    <div className="rk-meter rk-meter--live" data-reveal>
      <div className="rk-meter__left">
        <div className="rk-meter__list">
          {SIGNALS.map(([id, Ic, label, w]) => {
            const isOn = on.includes(id);
            return (
              <button key={id} aria-pressed={isOn} onClick={() => setOn((o) => (isOn ? o.filter((x) => x !== id) : [...o, id]))}>
                <span className="i"><Ic size={18} strokeWidth={1.6} /></span>
                <span className="l">{label}</span>
                <span className="w">{"●".repeat(w)}</span>
                <span className="sw" aria-hidden="true"><i /></span>
              </button>
            );
          })}
        </div>
        <div className={`rk-meter__read${pause ? " is-pause" : ""}`} aria-live="polite">
          <div className="rk-meter__gauge"><i style={{ width: `${pct}%` }} /><span className="th" /></div>
          <b>{pause ? `Paywise pauses, with ${reasons.length === 1 ? "one reason" : `${reasons.length} reasons`} in plain words` : "The payment goes through as normal"}</b>
          <p>{pause ? "Sunita still decides." : "No banner, no pop-up. Paywise stays invisible."}</p>
        </div>
      </div>
      <div className="rk-meter__phone">
        <SignalPhone reasons={reasons} pause={pause} style={{ zoom: 0.68 }} />
      </div>
    </div>
  );
}

/* ───────────────────────── 05 design ───────────────────────── */

function Design() {
  return (
    <Sec id="design" n="05" kicker="Design" title="Three first versions I changed"
      lede="Each first version failed when I checked it against the main scenario: a person paying while still on a scam call.">
      <div className="rk-iters">
        <Iter n="01" title="The pause" why="Read as an accusation, and looked like alerts people already ignore."
          fix="A full-screen pause with three plain reasons and a short countdown."
          before={<MockBanner />} after={<MockPause />} />
        <Iter n="02" title="The trusted person" why="Buried in settings, it wouldn't be there when she needed it."
          fix="Asked once during setup, then offered right on the pause screen."
          before={<MockSettings />} after={<MockCall />} />
        <Iter n="03" title="Recovery" why="Too much text for someone under stress."
          fix="One step at a time, most urgent first: call 1930."
          before={<MockList />} after={<MockSteps />} />
      </div>
    </Sec>
  );
}

function Iter({ n, title, why, fix, before, after }) {
  return (
    <article className="rk-iter" data-reveal>
      <header><span className="cs-num hand">{n}</span><h3>{title}</h3></header>
      <div className="rk-iter__pair">
        <div className="rk-iter__side bad">
          <p className="rk-mono"><X size={14} /> First version</p>
          <div className="rk-iter__art">{before}</div>
          <p>{why}</p>
        </div>
        <span className="rk-iter__arrow" aria-hidden="true"><ArrowRight size={22} /></span>
        <div className="rk-iter__side good">
          <p className="rk-mono"><Check size={14} /> What changed</p>
          <div className="rk-iter__art">{after}</div>
          <p>{fix}</p>
        </div>
      </div>
    </article>
  );
}

/* tiny UI sketches for the iteration cards */
const MockBanner = () => (
  <div className="mk"><div className="mk__alarm"><TriangleAlert size={14} /> WARNING: POSSIBLE FRAUD</div><div className="mk__ln w70" /><div className="mk__ln w50" /><div className="mk__amt">₹48,000</div><div className="mk__btn grey">Pay</div></div>
);
const MockPause = () => (
  <div className="mk mk--sheet"><div className="mk__ring">7</div><b className="mk__h">Let's take 10 seconds.</b><div className="mk__row"><i /> Never paid this person</div><div className="mk__row"><i /> Unknown call, 3 min ago</div><div className="mk__btn">Call Rohan first</div></div>
);
const MockSettings = () => (
  <div className="mk"><b className="mk__h sm">Settings</b>{["Notifications", "Language", "Privacy", "Security", "Share with a contact"].map((x, i) => <div key={x} className={`mk__set${i === 4 ? " dim" : ""}`}>{x}<span>›</span></div>)}</div>
);
const MockCall = () => (
  <div className="mk mk--sheet"><b className="mk__h">Let's take 10 seconds.</b><div className="mk__row"><i /> Never paid this person</div><div className="mk__btn"><PhoneCall size={12} /> Call Rohan first</div><div className="mk__btn tint">Cancel payment</div></div>
);
const MockList = () => (
  <div className="mk"><b className="mk__h sm">Helplines</b>{["1930 · Cyber fraud", "cybercrime.gov.in", "Your bank's number", "Chakshu portal", "Local police station", "RBI ombudsman"].map((x) => <div key={x} className="mk__set">{x}</div>)}</div>
);
const MockSteps = () => (
  <div className="mk mk--sheet"><div className="mk__timer">04:12</div><div className="mk__step on"><b>1</b> Call 1930 now</div><div className="mk__step"><b>2</b> Block UPI</div><div className="mk__step"><b>3</b> Report online</div></div>
);

/* ───────────────────────── 06 solution ───────────────────────── */

const SHOW = [
  ["pay", "Inside your UPI app", "Normal payment", "Looks exactly like today. A tiny mint dot says the payee was checked. Safe payments stay as fast as they are now."],
  ["risk", "Inside your UPI app", "Risk pause", '"Let\'s take 10 seconds." Three plain reasons, then "Call Rohan first", "Cancel", and a smaller "pay anyway" that unlocks after the countdown.'],
  ["collect", "Inside your UPI app", "Collect request decoder", '"This will take ₹4,999 from your account. You will not receive money." Collect scams work because people expect to receive money.'],
  ["alert", "Paywise companion", "Rohan's alert", "Rohan gets a simple notification with the reasons and one big button to call. Nothing is shared without Sunita's consent."],
  ["home", "Paywise companion", "Home", "Protection status, the trusted circle, a protection level, and the scam button kept one click away."],
  ["recover", "Paywise companion", '"I think I\'ve been scammed"', "A first-hour flow: call 1930, block UPI, report on cybercrime.gov.in, and a message to copy for the bank."],
];

function Solution() {
  return (
    <Sec id="solution" n="06" kicker="Solution" title="A layer, not another app"
      lede="A new app would ask people to change how they pay, so Paywise sits inside the UPI apps they already use. I designed it as a shared standard that NPCI could ask apps to adopt. On a normal day, it isn't visible.">
      <Stack />
      <Showcase />
      <Filmstrip />
      <EdgePlayer />
      <div className="rk-try" data-reveal>
        <div><h3>Click through it yourself</h3><p>Seven screens, all interactive. Start a risky payment, cancel it, call Rohan, or walk the first hour.</p></div>
        <a className="rk-btn rk-btn--light" href={DEMO} target="_blank" rel="noreferrer"><MousePointerClick size={16} /> Open the prototype</a>
      </div>
    </Sec>
  );
}

/** Exploded view: the person's UPI app, Paywise's layer above it, and the shared standard underneath. */
function Stack() {
  const [ref, seen] = useInView(0.15);
  return (
    <figure ref={ref} className={`rk-stack${seen ? " go" : ""}`}>
      <div className="rk-stack__scene" aria-hidden="true">
        <div className="pl pl--ruko"><span><ShieldCheck size={16} /> Paywise layer</span><i className="sheetbar" /></div>
        <div className="pl pl--host"><span><Smartphone size={16} /> Any UPI app</span><i /><i /><i /></div>
        <div className="pl pl--std"><span><Layers size={16} /> Shared safety standard (NPCI)</span></div>
      </div>
      <ol className="rk-stack__legend">
        <li><b>Paywise layer</b><span>Slides up only when signals stack up. Branded "Protected by Paywise" so people learn to trust it.</span></li>
        <li><b>The UPI app they already use</b><span>Unchanged for normal payments. Kept deliberately plain in the prototype.</span></li>
        <li><b>A shared standard</b><span>One behaviour across every UPI app, so the pause means the same thing everywhere.</span></li>
      </ol>
    </figure>
  );
}

function Showcase() {
  const [i, setI] = useState(1);
  const [k, setK] = useState(0);
  const [id, group, title, desc] = SHOW[i];
  const pick = (n) => { setI(n); setK((x) => x + 1); };
  return (
    <div className="rk-show" data-reveal>
      <div className="rk-show__stage">
        <LivePhone key={`${id}-${k}`} screen={id} scale={0.72} />
      </div>
      <div className="rk-show__side">
        <p className="rk-mono">{group}</p>
        <h3 key={`h${i}`}>{title}</h3>
        <p key={`p${i}`} className="rk-body">{desc}</p>
        <div className="rk-show__tabs" role="tablist" aria-label="Screens">
          {SHOW.map(([sid, g, t], n) => (
            <button key={sid} role="tab" aria-selected={n === i} onClick={() => pick(n)}>
              <span>{String(n + 1).padStart(2, "0")}</span>{t}
              {(n === 0 || n === 3) && <em>{g}</em>}
            </button>
          ))}
        </div>
        <p className="rk-note">The phone is the real prototype. Click around in it.</p>
      </div>
    </div>
  );
}

function Filmstrip() {
  return (
    <div className="rk-film" data-reveal>
      {["welcome", "home", "risk", "collect", "alert", "recover"].map((s, i) => (
        <LivePhone key={s} screen={s} scale={0.42} className={`f${i}`} />
      ))}
    </div>
  );
}

/* ───────────────────────── reflection ───────────────────────── */

function Reflection() {
  return (
    <Sec id="reflection" n="07" kicker="Reflection" title={<>What I'd measure, and what I'd do <em>differently</em></>}
      lede="Paywise is an untested concept, so these are targets, not results. The next step is testing them.">
      <Part title="Targets, not results" tag="target">
        <div className="rk-targets" data-reveal>
          <div><b>Fewer</b><span>risky payments completed after a pause</span></div>
          <div><b>&lt; 1 hr</b><span>from scam to report</span></div>
          <div><b>&lt; 1 in 20</b><span>normal payments interrupted</span></div>
        </div>
      </Part>
      <Part title="If I did it again">
        <ol className="rk-again2" data-reveal>
          <li><span>01</span><b>Talk to survivors first</b><p>Speak to scam survivors and their families before designing anything.</p></li>
          <li><span>02</span><b>Test the words, not the pixels</b><p>Try the pause screen's wording with older users, out loud.</p></li>
          <li><span>03</span><b>Check what a bank can see</b><p>Work with a bank on which signals are realistic to detect.</p></li>
        </ol>
      </Part>
      <Part title="What's next">
        <ol className="rk-next" data-reveal>
          <li><span className="rk-mono">Now</span><b>Test the pause wording with 5 parents</b></li>
          <li><span className="rk-mono">Then</span><b>Pilot the trusted-person check with families</b></li>
          <li><span className="rk-mono">Later</span><b>Propose the layer as a shared standard to UPI apps and NPCI</b></li>
        </ol>
      </Part>

      <footer className="rk-end" data-reveal>
        <PwMark size={56} />
        <h2>Try the pause flow.</h2>
        <div className="rk-end__row">
          <a className="rk-btn" href={DEMO} target="_blank" rel="noreferrer">Try the prototype <ArrowUpRight size={16} /></a>
          <a className="rk-btn rk-btn--ghost" href="/work/steadytrack/">Next: SteadyTrack <ArrowRight size={16} /></a>
        </div>
      </footer>
    </Sec>
  );
}

void ListOrdered;
