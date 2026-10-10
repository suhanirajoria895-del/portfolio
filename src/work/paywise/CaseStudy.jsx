import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, X, Zap, Siren, EyeOff, PhoneIncoming, ShieldCheck, Landmark, Clock, UserPlus,
  IndianRupee, ArrowDownLeft, Flag, Users, Smartphone, Layers, MousePointerClick, PhoneCall, TriangleAlert, ListOrdered,
  Search, FileText, Newspaper, MessagesSquare, Video,
} from "lucide-react";
import { useActiveId, useRevealAll } from "../cosell/hooks.js";
import { Device, PwMark } from "./demo/screens.jsx";

const P = "/work/paywise/";
const DEMO = "/work/paywise/demo/";
const IANS_LOSS = "https://ianslive.in/indians-lose-over-rs-52976-crore-to-cyber-frauds-over-six-years-report--20260103154943";
const IANS_UPI = "https://ianslive.in/upi-frauds-worth-rs-805-crore-witnessed-this-fiscal-so-far-minister--20251215175703";
const FOF = "https://frankonfraud.com/wp-content/uploads/2026/01/Digital-Arrest-Scams-Explained.pdf";

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
      <a className="rk-side__cta" href={DEMO} target="_blank" rel="noreferrer">Try the prototype <ArrowUpRight size={15} /></a>
    </aside>
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
        <h1>The right pause, <em>before</em> the money leaves</h1>
        <p className="rk-lede">
          Paywise is a safety layer that sits inside the UPI apps people already use. It slows people down only when something
          looks wrong, and guides them through the first hour if a scam has already happened.
        </p>
        <dl className="rk-facts">
          {[
            ["Role", "UX & UI design"],
            ["Type", "Personal project"],
            ["Platform", "A layer inside existing UPI apps, plus a small companion app"],
            ["Tools", "Figma"],
          ].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          <div className="wide"><dt>The hard part</dt><dd>Adding friction without making every payment feel scary</dd></div>
        </dl>
        <a className="rk-btn" href={DEMO} target="_blank" rel="noreferrer">Try the prototype <ArrowRight size={16} /></a>
      </div>

      <div className="rk-hero" aria-hidden="true">
        <div className="rk-hero__glow" />
        <LivePhone screen="home" scale={0.58} className="rk-hero__a" />
        <LivePhone screen="risk" scale={0.58} className="rk-hero__b" />
        <div className="rk-chip rk-chip--a"><span className="i i--amber"><Clock size={16} /></span><span><b>10 seconds</b>only when it looks wrong</span></div>
        <div className="rk-chip rk-chip--b"><span className="i"><ShieldCheck size={16} /></span><span><b>Protected by Paywise</b>inside the app you already use</span></div>
      </div>

      <ul className="rk-glance" data-reveal>
        <li><b><CountUp to={19813} prefix="₹" /> cr</b><span>lost to cyber fraud in India in 2025</span></li>
        <li className="mid"><PwMark size={40} /><span>Most payments see nothing new. Risky ones get a calm pause and a trusted person.</span></li>
        <li><b>1 hour</b><span>the window where acting fast can still get money held</span></li>
      </ul>
    </header>
  );
}

/* ───────────────────────── 01 problem ───────────────────────── */

function Problem() {
  return (
    <Sec id="problem" n="01" kicker="Problem" title="Payments got fast. Scams got faster."
      lede={'UPI made paying anyone instant. Scammers use that speed: fake police calls, "refund" links and "receive money" requests that actually take money. Every scam works the same way: create panic, then get the money moved before the person can think.'}>
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
          [Zap, "What's fast", "One tap, money gone", "Payments finish in seconds, with no natural moment to stop."],
          [Siren, "What scammers use", "Panic and authority", "Fake police, bank or courier calls that demand action now."],
          [EyeOff, "What it costs", "Savings, and shame", "Many victims don't tell anyone, which delays reporting."],
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
      <figcaption><b>Where the decision actually happens.</b> The scam takes many minutes to build. The payment takes two seconds, and nothing in it is built to stop.</figcaption>
      <div className="rk-race__lane">
        <span className="rk-race__lbl"><PhoneIncoming size={16} /> Scam call</span>
        <div className="rk-race__track">
          {["Call", "Accusation", "Isolation", "Urgency"].map((s, i) => <i key={s} style={{ "--i": i }}>{s}</i>)}
        </div>
        <span className="rk-race__t">~40 min</span>
      </div>
      <div className="rk-race__lane rk-race__lane--pay">
        <span className="rk-race__lbl"><IndianRupee size={16} /> UPI payment</span>
        <div className="rk-race__track"><b className="rk-race__tap">Tap, PIN, gone</b><em className="rk-race__gap">Paywise's 10 seconds go here</em></div>
        <span className="rk-race__t">2 sec</span>
      </div>
    </figure>
  );
}

/* ───────────────────────── 02 research ───────────────────────── */

function Research() {
  return (
    <Sec id="research" n="02" kicker="Research" title="How scams actually unfold"
      lede="Desk research: government data in Parliament, news reports, cybercrime advisories and victim stories on forums. I haven't done interviews yet, so everything here is labelled by where it came from.">
      <Evidence />

      <Part title="Anatomy of a digital arrest scam" tag="desk" lede="Pieced together from a Frank on Fraud explainer and news reports. The script barely changes from victim to victim.">
        <Transcript />
      </Part>

      <Part title="What already exists, and where it sits" lede="UPI already has real protections. They just all sit either inside the bank, where the person can't see them, or after the money has gone.">
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

function Transcript() {
  const [ref, seen] = useInView(0.15);
  return (
    <div ref={ref} className={`rk-call${seen ? " go" : ""}`}>
      <div className="rk-call__phone">
        <div className="rk-call__bar"><Video size={16} /> Video call · <b>Unknown number</b><span className="rk-call__t">38:14</span></div>
        <ul>
          {CALL.map(([who, line], i) => <li key={i} className={who} style={{ "--i": i }}>{line}</li>)}
        </ul>
      </div>
      <ol className="rk-call__notes">
        {CALL.filter((c) => c[2]).map(([, , stage, note], i) => (
          <li key={stage} style={{ "--i": i }}><b>{stage}</b><span>{note}</span></li>
        ))}
        <li className="rk-call__real" style={{ "--i": 4 }}>
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
            {i === 1 && <p className="rk-gap__hole"><b>Nothing here.</b> Nothing helps the person while they're being pushed to pay, or tells them what to do in the first hour.</p>}
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
    <Sec id="analysis" n="03" kicker="Analysis" title="Two people, one moment of pressure">
      <Part title="Who this is for" tag="archetype" lede="Archetypes built from the research, not interviewed people. The photos are stand-ins.">
        <People />
      </Part>
      <Part title="How a scam feels, minute by minute">
        <Curve />
      </Part>
      <Part title="Five insights, five design moves">
        <Insights />
      </Part>
    </Sec>
  );
}

function People() {
  return (
    <div className="rk-people" data-reveal>
      <article className="rk-person">
        <div className="rk-polaroid" style={{ "--r": "-3deg" }}>
          <img src={`${P}sunita.webp`} alt="" width="220" height="220" loading="lazy" />
          <p className="hand">Sunita, 58</p>
        </div>
        <div>
          <p className="rk-mono">Retired teacher · Pune</p>
          <ul className="rk-person__facts">
            <li>Uses UPI for groceries and her pension</li>
            <li>Trusts anyone who sounds official</li>
            <li>Would rather not "trouble" her son</li>
          </ul>
          <p className="rk-quote">"If the police are calling, I must have done something wrong."</p>
        </div>
      </article>
      <svg className="rk-people__link" viewBox="0 0 120 40" aria-hidden="true"><path d="M4 30 C 40 0, 80 0, 116 30" /></svg>
      <article className="rk-person">
        <div className="rk-polaroid" style={{ "--r": "3deg" }}>
          <img src={`${P}rohan.webp`} alt="" width="220" height="220" loading="lazy" />
          <p className="hand">Rohan, 31</p>
        </div>
        <div>
          <p className="rk-mono">Sunita's son · works in Bengaluru</p>
          <ul className="rk-person__facts">
            <li>Set up her phone and her UPI</li>
            <li>Worries about scam calls</li>
            <li>Lives 800 km away</li>
          </ul>
          <p className="rk-quote">"I'd rather get a hundred calls than find out after."</p>
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
      <figcaption>Two moments matter most: the peak of urgency right before the payment, and the silence after it. Paywise is built around exactly those two.</figcaption>
    </figure>
  );
}

const INSIGHTS = [
  ["Scams win by rushing", "Create a pause only at risky moments"],
  ["Isolation is the weapon", "Make it easy to involve one trusted person"],
  ["Warnings get ignored when everything is a warning", "Interrupt rarely, and explain why in plain words"],
  ["Shame delays reporting", 'A calm, blame-free "I think I\'ve been scammed" flow'],
  ["The first hour matters most", "Step-by-step recovery: call 1930, block, report"],
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
    <Sec id="synthesis" n="04" kicker="Synthesis" title="Friction, but only where it counts">
      <blockquote className="rk-hmw" data-reveal>
        <span className="rk-mono">How might we</span>
        help people stop and think at the exact moment a scam pushes them to pay, <em>without slowing down</em> the
        thousands of normal payments they make?
      </blockquote>

      <Part title="Five rules I designed against">
        <ol className="rk-rules2">
          {[
            ["Invisible until it matters", "Most payments see nothing new."],
            ["Explain, never accuse", 'Say what looks unusual, not "you\'re being scammed".'],
            ["The person decides", "Paywise flags. It never blocks on its own."],
            ["Never alone", "One tap to involve someone you trust."],
            ["No shame", "Recovery language is calm and blame-free."],
          ].map(([t, d], i) => (
            <li key={t} data-reveal style={{ "--i": i }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{t}</b>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </Part>

      <Part title="Where AI fits" lede="AI only notices signals, and explains its reasons in plain words. The person always decides. Toggle the signals to see when Paywise would step in.">
        <SignalMeter />
      </Part>

      <Part title="What I picked, and what I gave up">
        <Trade />
      </Part>

      <Part title="Ideas I killed">
        <ul className="rk-killed2" data-reveal>
          {[
            ["A new UPI app", "nobody switches payment apps for safety"],
            ["Screen overlay", "doesn't work on iPhone, feels invasive"],
            ["AI that talks to the scammer", "risky and unpredictable"],
            ["Call recording", "a privacy line I wouldn't cross"],
            ["Block all new payees", "breaks normal life"],
          ].map(([t, d]) => (
            <li key={t}><X size={14} /><s>{t}</s><span>{d}</span></li>
          ))}
        </ul>
      </Part>
    </Sec>
  );
}

const SIGNALS = [
  ["payee", UserPlus, "A payee you've never paid", 2],
  ["amount", IndianRupee, "A large amount for you", 1],
  ["call", PhoneIncoming, "Paying soon after an unknown call", 2],
  ["collect", ArrowDownLeft, 'A "collect" request', 2],
  ["reported", Flag, "A payee others have reported", 3],
];

function SignalMeter() {
  const [on, setOn] = useState(["payee", "call"]);
  const score = SIGNALS.filter(([id]) => on.includes(id)).reduce((s, [, , , w]) => s + w, 0);
  const pause = score >= 3;
  const pct = Math.min(100, (score / 6) * 100);
  return (
    <div className="rk-meter" data-reveal>
      <div className="rk-meter__list">
        {SIGNALS.map(([id, Ic, label, w]) => {
          const active = on.includes(id);
          return (
            <button key={id} aria-pressed={active} onClick={() => setOn((o) => (active ? o.filter((x) => x !== id) : [...o, id]))}>
              <span className="i"><Ic size={18} strokeWidth={1.6} /></span>
              <span className="l">{label}</span>
              <span className="w">{"●".repeat(w)}</span>
              <span className="sw" aria-hidden="true"><i /></span>
            </button>
          );
        })}
      </div>
      <div className={`rk-meter__out${pause ? " is-pause" : ""}`}>
        <p className="rk-mono">Risk signal</p>
        <div className="rk-meter__gauge"><i style={{ width: `${pct}%` }} /><span className="th" title="Pause threshold" /></div>
        <div className="rk-meter__res" key={String(pause)}>
          {pause ? <Clock size={28} strokeWidth={1.6} /> : <Check size={28} strokeWidth={1.8} />}
          <b>{pause ? "Paywise pauses for 10 seconds" : "Payment goes through as normal"}</b>
          <p>{pause ? "With plain reasons and a one-tap call to Rohan. Sunita still decides." : "No banner, no pop-up. Paywise stays invisible."}</p>
        </div>
      </div>
    </div>
  );
}

const TRADE = [
  ["Where it lives", "A layer inside the UPI apps people already use", "A new standalone UPI payments app", "Nobody switches payment apps for safety. Protection has to sit where people already pay."],
  ["When to interrupt", "Only on risky payments", "A warning on every payment", "Constant warnings get ignored."],
  ["How to interrupt", "A 10-second pause with reasons", 'A pop-up with "Are you sure?"', "People tap through generic pop-ups."],
  ["Who decides", "The person, with a trusted contact", "Auto-block by AI", "False blocks break trust and leave people stuck."],
  ["Tone", "Calm, specific, plain language", "Red alarm screens", "Fear is what scammers already use."],
  ["After a scam", "A guided first-hour checklist", "A link to a reporting website", "In panic, people need the next step, not a form."],
];

function Trade() {
  return (
    <div className="rk-trade">
      {TRADE.map(([k, pick, drop, why], i) => (
        <div key={k} className="rk-trade__row" data-reveal style={{ "--i": i }}>
          <p className="rk-mono">{k}</p>
          <div className="pick"><Check size={16} /> {pick}</div>
          <div className="drop"><X size={16} /> <s>{drop}</s></div>
          <p className="why">{why}</p>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── 05 design ───────────────────────── */

function Design() {
  return (
    <Sec id="design" n="05" kicker="Design" title="Three things I got wrong first"
      lede="Each first version made sense on paper and fell apart the moment I pictured Sunita using it mid-call.">
      <div className="rk-iters">
        <Iter n="01" title="The pause" why="Felt like an accusation, and looked like every alert people already ignore."
          fix="A calm full-screen pause with three plain reasons and a short countdown."
          before={<MockBanner />} after={<MockPause />} />
        <Iter n="02" title="The trusted person" why="Nobody sets up safety features in a calm moment."
          fix="Asked once during setup, then offered right on the pause screen."
          before={<MockSettings />} after={<MockCall />} />
        <Iter n="03" title="Recovery" why="Too much to read in panic."
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
  ["collect", "Inside your UPI app", "Collect request decoder", '"This will take ₹4,999 from your account. You will not receive money." The scam depends on that sentence never being said.'],
  ["alert", "Paywise companion", "Rohan's alert", "Rohan gets a simple notification with the reasons and one big button to call. Nothing is shared without Sunita's consent."],
  ["home", "Paywise companion", "Home", "Protection status, the trusted circle, a protection level, and the scam button kept one tap away."],
  ["recover", "Paywise companion", '"I think I\'ve been scammed"', "A calm first-hour flow: call 1930, block UPI, report on cybercrime.gov.in, and a message to copy for the bank."],
];

function Solution() {
  return (
    <Sec id="solution" n="06" kicker="Solution" title="A layer, not another app"
      lede={'Paywise ships as a shared safety standard every UPI app includes, the kind NPCI could ask all UPI apps to adopt. In the prototype, the first three screens sit inside a generic, unbranded UPI app with Paywise sliding up over it. The rest live in the small Paywise companion app.'}>
      <Stack />
      <Showcase />
      <Filmstrip />
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
        <p className="rk-note">The phone is the real prototype. Tap around in it.</p>
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
    <Sec id="reflection" n="07" kicker="Reflection" title={<>What I'd measure, and what I'd do <em>differently</em></>}>
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
        <h2>Ten seconds of doubt is cheaper than a lifetime of savings.</h2>
        <div className="rk-end__row">
          <a className="rk-btn" href={DEMO} target="_blank" rel="noreferrer">Try the prototype <ArrowUpRight size={16} /></a>
          <a className="rk-btn rk-btn--ghost" href="/work/steadytrack/">Next: SteadyTrack <ArrowRight size={16} /></a>
        </div>
      </footer>
    </Sec>
  );
}

void ListOrdered;
