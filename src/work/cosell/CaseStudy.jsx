import { useMemo, useState } from "react";
import { CoMark } from "./CoMark.jsx";
import { Coffee, Package, Scissors, Undo2, Tag, Receipt, UserRound, ShoppingCart, Truck, Sheet, Smile, Meh, Frown, Angry, Handshake, Target, Languages, Check, ArrowRight, Mail } from "lucide-react";
import DesignSystem from "./DesignSystem.jsx";
import { useActiveId, useAmbientMotion, useRevealAll } from "./hooks.js";

import CosellCover from "../../components/covers/CosellCover.jsx";

const A = "/work/cosell/"; // asset base
const DEMO = "/work/cosell/demo/index.html#/login";
const FIGJAM = "https://www.figma.com/board/thUniTYGliBINd10bU6FLS";
const MEERA =
  "https://images.unsplash.com/photo-1723041885055-3e35ae8dd980?w=360&h=360&fit=crop&crop=focalpoint&fp-x=0.53&fp-y=0.42&fp-z=2.2&auto=format&q=70";

const SECTIONS = [
  ["problem", "Problem"],
  ["research", "Research"],
  ["analysis", "Analysis"],
  ["synthesis", "Synthesis"],
  ["design", "Design"],
  ["solution", "Solution"],
]

export default function CaseStudy() {
  useRevealAll();
  useAmbientMotion();
  const ids = useMemo(() => SECTIONS.map(([id]) => id), []);
  const active = useActiveId(ids);

  return (
    <>
    <header className="cv-page" aria-label="CoSell case study cover">
      <CosellCover />
    </header>
    <div className="cs-shell">
      <div className="cs-progress" aria-hidden="true" />
      <Sidebar active={active} />
      <Chips active={active} />
      <main className="cs">
        <Header />
        <Problem />
        <Research />
        <Analysis />
        <Sec
          id="synthesis"
          n="04"
          kicker="Synthesis"
          title="Defining what to build"
        >
          <Define />
          <Flows />
          <Tradeoffs />
        </Sec>
        <Sec
          id="design"
          n="05"
          kicker="Design"
          title="Wireframes and iterations"
        >
          <Wireframes />
          <Iterations />
        </Sec>
        <Solution />
        <Reflection />
        <Footer />
      </main>
    </div>
    </>
  );
}

/* ───────────────────────── shell ───────────────────────── */

function Sidebar({ active }) {
  const idx = SECTIONS.findIndex(([id]) => id === active);
  return (
    <aside className="cs-side">
      <a href="/#projects" className="cs-side__back">
        <span aria-hidden="true">←</span> All work
      </a>
      <p className="cs-side__proj">CoSell</p>
      <nav aria-label="Case study sections">
        <ol>
          {SECTIONS.map(([id, label], i) => (
            <li key={id} className={i < idx ? "done" : ""}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

function Chips({ active }) {
  return (
    <nav className="cs-chips" aria-label="Jump to section">
      {SECTIONS.map(([id, label], i) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
          <span>{String(i + 1).padStart(2, "0")}</span> {label}
        </a>
      ))}
    </nav>
  );
}

function Sec({ id, n, kicker, title, children, lede }) {
  return (
    <section id={id} className="cs-sec">
      <header className="cs-sec__head" data-reveal>
        <p className="cs-kicker">
          <span>{n}</span> {kicker}
        </p>
        <h2>{title}</h2>
        {lede && <p className="cs-lede">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

function Part({ kicker, title, children, lede }) {
  return (
    <div className="cs-part">
      <header className="cs-part__head" data-reveal>
        <h3>{title}</h3>
        {lede && <p className="cs-body">{lede}</p>}
      </header>
      {children}
    </div>
  );
}

/** A sticky note. `c` picks the paper colour, `r` a small tilt in degrees. */
function Sticky({ c = "y", r = 0, children, className = "" }) {
  return (
    <div className={`sticky sticky--${c} ${className}`} style={{ "--r": `${r}deg` }}>
      {children}
    </div>
  );
}

/* ───────────────────────── header ───────────────────────── */

function Header() {
  return (
    <header className="cs-head" data-reveal>
      <div className="cs-head__copy">
        <p className="cs-mono">Case study 01 · Product design · Self-initiated</p>
        <h1>One AI copilot for every marketplace you sell on</h1>
        <p className="cs-lede">
          CoSell watches all of a seller's marketplaces at once, catches errors that cost money, and leaves her a short
          list of decisions.
        </p>
        <dl className="cs-facts">
          {[
            ["Role", "UX research, UI design"],
            ["Team", "Solo"],
            ["Type", "Personal project"],
            ["Platform", "Web + mobile"],
            ["Tools", "Figma, Claude Code"],
            ["Achievement", "A working, clickable prototype of the web and phone app"],
          ].map(([k, v]) => (
            <div key={k} className={k === "Achievement" ? "wide" : ""}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>

      <div className="cs-hero" aria-hidden="true">
        <div className="cs-hero__web">
          <div className="bar">
            <i />
            <i />
            <i />
          </div>
          <img src={`${A}home.webp`} alt="" width="2880" height="1800" />
        </div>
        <img className="cs-hero__phone" src={`${A}m-morning.webp`} alt="" width="556" height="1174" />
        <div className="cs-hero__chip">
          <CoMark state="needsYou" size={22} />
          <span>
            <b>3 things need you</b>
            12 handled overnight
          </span>
        </div>
      </div>

      <ul className="cs-glance">
        <li>
          <b>1–3%</b>
          <span>of sales lost to fee and return errors nobody catches</span>
        </li>
        <li className="mid">
          <CoMark state="needsYou" size={40} />
          <span>Co watches every shop and brings back only what needs a yes</span>
        </li>
        <li>
          <b>Trust</b>
          <span>the real design problem: letting software touch her prices</span>
        </li>
      </ul>
    </header>
  );
}

/* ───────────────────────── 01 problem ───────────────────────── */

function Problem() {
  return (
    <Sec
      id="problem"
      n="01"
      kicker="Problem"
      title="Sellers on multiple marketplaces manage everything by hand"
      lede="Each one has its own dashboard, its own label format, its own returns rules and its own way of charging fees. So the day goes to switching tabs. And the mistakes are small enough that nobody spots them, but they keep happening."
    >
      <ol className="cs-chain" data-reveal>
        {[
          ["What's fixed", "Three different rule books", "Labels, return windows and fee slabs all change from one marketplace to the next."],
          ["What's missing", "No one looks at all three together", "The seller opens each panel by hand, maybe once a day if she's lucky."],
          ["What it costs", "Money slips out quietly", "A wrong fee here, a missed claim there. By the time she notices, the window's closed."],
        ].map(([k, t, d], i) => (
          <li key={k} className={i === 2 ? "bad" : ""}>
            <p className="cs-mono">{k}</p>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
      <div className="cs-work" data-reveal>
        <h3 className="cs-h3">The same five jobs, repeated on every marketplace</h3>
        <p className="cs-body">
          Take a seller on three marketplaces. Each panel has its own stock count, fee rules and returns process, so
          every routine job is done three times, by hand.
        </p>
        <div className="cs-scroll">
          <table className="cs-worktable">
            <thead>
              <tr>
                <th>The job</th>
                <th>Why it repeats</th>
                <th>What goes wrong</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {WORK.map(([job, why, wrong, kind, src]) => (
                <tr key={job}>
                  <th scope="row">{job}</th>
                  <td>{why}</td>
                  <td>{wrong}</td>
                  <td>
                    {src ? (
                      <a className={`ev ${kind}`} href={src[1]} target="_blank" rel="noreferrer">
                        {kind === "res" ? "Researched" : "Partly researched"} · {src[0]} ↗
                      </a>
                    ) : (
                      <span className="ev asm">Assumption</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cs-known" data-reveal>
        <div>
          <p className="cs-mono">What the research supports</p>
          <ul>
            <li>Without synced stock, multi-channel sellers oversell.</li>
            <li>Fashion returns run at 25–40% of orders.</li>
            <li>1–3% of GMV can leak through fee and return errors.</li>
            <li>Wrong charges have to be claimed within about 30 days.</li>
          </ul>
        </div>
        <div>
          <p className="cs-mono">What I assumed, and haven't tested</p>
          <ul>
            <li>How long the daily dashboard routine takes (the times on the journey map are estimates).</li>
            <li>That sellers would trust an AI that asks first more than one that acts alone.</li>
            <li>That Hindi and voice matter enough to build in from the start.</li>
            <li>Meera herself: an archetype, not a person I spoke to.</li>
          </ul>
        </div>
      </div>

      <Statement />
    </Sec>
  );
}

const WORK = [
  ["Update stock", "Each marketplace keeps its own count", "Counts drift, and an item sells after it's gone", "res", ["Base", "https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/"]],
  ["Set and match prices", "Commission and fees differ, so the same price earns a different margin", "A price change breaks a margin or a marketplace's price rules", "res", ["Base", "https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/"]],
  ["Answer returns", "Each has its own process and reply deadline", "Late replies and high return volumes eat into profit", "part", ["Shipmozo", "https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics"]],
  ["Check payouts", "Every settlement lists fees differently", "Wrong commissions and RTO charges go unclaimed", "res", ["Mynd", "https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/"]],
  ["Check every dashboard", "There's no single view of the business", "Problems are found late, or not at all", "asm", null],
];

const LINES = [
  { label: "12 × Cotton kurti set", amt: 14800 },
  { label: "Commission (15%)", amt: -2220, flag: "Kurtis sit in the 5% slab. That's ₹1,480 too much." },
  { label: "Shipping fee", amt: -540 },
  { label: "RTO charge, order MS-88217", amt: -410, flag: "This order was delivered, not returned. ₹410 back." },
  { label: "TCS and TDS", amt: -296 },
];
const inr = (n) => `${n < 0 ? "−" : ""}₹${Math.abs(n).toLocaleString("en-IN")}`;

function Statement() {
  const [scan, setScan] = useState(false);
  const total = LINES.reduce((s, l) => s + l.amt, 0);
  return (
    <div className="cs-leak" data-reveal>
      <div className="cs-paper">
        <span className="tape" aria-hidden="true" />
        <div className={`cs-settle ${scan ? "is-scanned" : ""}`}>
          <div className="cs-settle__head">
            <p>Marketplace settlement</p>
            <p className="muted">3 Oct, payout cycle 40</p>
          </div>
          <ul>
            {LINES.map((l, i) => (
              <li key={l.label} className={l.flag ? "flag" : ""} style={{ "--d": `${i * 120}ms` }}>
                <span>{l.label}</span>
                <span className="amt">{inr(l.amt)}</span>
                {l.flag && <p className="note">{l.flag}</p>}
              </li>
            ))}
          </ul>
          <div className="cs-settle__foot">
            <span>Payout</span>
            <span className="amt">{inr(total)}</span>
          </div>
        </div>
        <p className="hand margin-note" aria-hidden="true">
          looks fine, right? ↑
        </p>
      </div>
      <div>
        <p className="cs-big">1 to 3%</p>
        <p className="cs-body">
          of gross sales can disappear this way, through wrong commission rates, RTO charges on orders that were actually
          delivered, and returns that never get put back in stock. Most claims have to be raised within about 30 days.{" "}
          <a href="https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/" target="_blank" rel="noreferrer">
            Mynd Solution
          </a>
        </p>
        <button type="button" className="cs-btn" onClick={() => setScan((s) => !s)} aria-pressed={scan}>
          {scan ? "Hide it again" : "Show me what's wrong"}
        </button>
        <p className={`cs-found ${scan ? "on" : ""}`} aria-live="polite">
          {scan
            ? "₹1,890 on one statement. That's 16.7% of this payout, gone."
            : "This is a made-up statement, but every line on it is a real kind of error."}
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── 02 research ───────────────────────── */

const JOURNEY = [
  ["7:30", "Morning check", "Logs in to 3 dashboards", 1, "35 min of tab switching", Coffee],
  ["9:00", "Stock update", "Types counts in 3 places", -1, "Oversells a dupatta", Package],
  ["11:00", "Packing", "37 orders out the door", 2, "The part she enjoys", Scissors],
  ["15:00", "Returns", "Replies panel by panel", -2, "Misses a 2-day window", Undo2],
  ["18:00", "Pricing", "Guesses at rival prices", -1, "No history to go on", Tag],
  ["22:00", "Payouts", "Reconciles in Excel", -3, "Can't tell which fee is wrong", Receipt],
];

const AFFINITY = [
  ["Time goes to watching", "y", ["Same stock typed into 3 portals", "Diwali week: \"humanly impossible\"", "3 logins every morning"], "Sellers have dashboards. They lack time to watch them."],
  ["Mistakes are silent", "p", ["Wrong commission slab", "RTO on a delivered order", "Returns never restocked"], "A tiny daily leak is big over a year."],
  ["Late is expensive", "b", ["Claims close in ~30 days", "Return replies have deadlines", "25–40% fashion returns"], "Knowing in time beats knowing what to do."],
  ["Control is scary", "g", ["Thin margins", "Different price rules", "Repricers feel like a black box"], "No one lets software touch prices without a why and an undo."],
];

function Research() {
  return (
    <Sec
      id="research"
      n="02"
      kicker="Research"
      title="Where sellers lose time and money"
      lede="This was desk research, not interviews (more on that at the end). I read seller guides, reconciliation write-ups, logistics reports and a lot of forum threads, and put every observation on a sticky note in FigJam."
    >
      <ol className="cs-process" data-reveal>
        {[
          ["Read", "Guides, fee docs, forum threads"],
          ["Map", "One seller's day, hour by hour"],
          ["Cluster", "Sticky notes into themes"],
          ["Decide", "A brief and four rules"],
          ["Make", "Flows, wireframes, UI, prototype"],
        ].map(([t, d], i) => (
          <li key={t}>
            <span className="cs-mono">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>

      <section className="aw" data-reveal>
        <header>
          <p className="cs-mono">Affinity mapping</p>
          <h3>40 observations, four patterns</h3>
        </header>
        <div className="aw__cols">
          {AFFINITY.map(([title, c, notes, insight], ci) => (
            <div key={title} className={`aw__col aw-${c}`}>
              <p className="aw__title">
                <span>{String(ci + 1).padStart(2, "0")}</span>
                {title}
              </p>
              <div className="aw__notes">
                {notes.map((n, i) => (
                  <p key={n} style={{ "--r": `${[-2.5, 1.8, -1.2, 2.2][(ci + i) % 4]}deg` }}>
                    {n}
                  </p>
                ))}
              </div>
              <p className="aw__insight">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      <Journey />

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Swimlane</span> Who does what across a day, and where the hand-offs break
        </figcaption>
        <Swimlane />
        <div className="cs-breaks">
          {BREAKS.map(([t, items]) => (
            <div key={t}>
              <h4>{t}</h4>
              <ul>
                {items.map(([n, d]) => (
                  <li key={n}>
                    <b>{n}</b>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </figure>

      <details className="cs-more" data-reveal>
        <summary>Where the numbers come from</summary>
        <table>
          <tbody>
            <tr>
              <td>Overselling</td>
              <td>
                Without synced stock, sellers are "guaranteed to oversell".{" "}
                <a href="https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/" target="_blank" rel="noreferrer">Base</a>
              </td>
            </tr>
            <tr>
              <td>Returns and RTO</td>
              <td>
                Fashion returns run at 25 to 40% of orders, and COD return-to-origin at 20 to 40%.{" "}
                <a href="https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics" target="_blank" rel="noreferrer">Shipmozo</a>
              </td>
            </tr>
            <tr>
              <td>Revenue leakage</td>
              <td>
                Wrong commissions and missing returned stock cost 1 to 3% of GMV.{" "}
                <a href="https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/" target="_blank" rel="noreferrer">Mynd</a>
              </td>
            </tr>
          </tbody>
        </table>
      </details>
    </Sec>
  );
}

const LANES = ["Seller", "Marketplace panels", "Buyers and couriers", "Spreadsheet"];
const STAGES = ["Morning", "Stock", "Returns", "Pricing", "Payouts"];
// [lane, stage, label, breakpoint number]
const STEPS_SW = [
  [1, 0, "New orders on 3 panels"],
  [0, 0, "Logs in to each panel", 1],
  [0, 1, "Types stock into each", 2],
  [1, 1, "Counts drift apart"],
  [2, 2, "Buyer raises a return"],
  [1, 2, "Return case opens"],
  [0, 2, "Replies, panel by panel", 3],
  [1, 3, "Rival drops price"],
  [0, 3, "Notices hours later", 4],
  [1, 4, "Settlement statement"],
  [3, 4, "Copied into Excel"],
  [0, 4, "Checks fees by hand", 5],
];
const LINKS = [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [7, 8], [9, 10], [10, 11]];
const BREAKS = [
  ["Stock and orders", [["1", "Three logins and no shared view, every morning."], ["2", "Stock typed in three places drifts, and items oversell."]]],
  ["Buyers", [["3", "Each panel has its own return deadline. Miss one and the case is decided for her."]]],
  ["Money", [["4", "A rival's price drop is seen hours late, after the Buy Box is lost."], ["5", "Fee errors hide in settlement files and go unclaimed."]]],
];

const LANE_STYLE = [
  ["#6B5CFF", UserRound],
  ["#F5A524", ShoppingCart],
  ["#2FB67C", Truck],
  ["#8A8FA8", Sheet],
];

function Swimlane() {
  const LW = 172;
  const CW = 154;
  const LH = 92;
  const TOP = 44;
  const BW = 134;
  const BH = 44;
  const pos = (lane, stage) => [LW + 16 + stage * CW, TOP + lane * LH + (LH - BH) / 2];
  const W = LW + 16 + STAGES.length * CW;
  return (
    <div className="cs-scroll">
      <svg viewBox={`0 0 ${W} ${TOP + LANES.length * LH + 8}`} className="cs-swim" role="img" aria-label="Swimlane of a seller's day across marketplaces, buyers and a spreadsheet, with five breakpoints">
        <defs>
          <marker id="sw-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill="#a39fc4" />
          </marker>
          <filter id="sw-sh" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2b1f6b" floodOpacity="0.12" />
          </filter>
        </defs>
        {STAGES.map((st, i) => (
          <g key={st}>
            <rect x={LW + 16 + i * CW - 8} y="6" width={CW - 14} height="26" rx="13" className="stagepill" />
            <text x={LW + 16 + i * CW - 8 + (CW - 14) / 2} y="23" textAnchor="middle" className="stage">{st}</text>
          </g>
        ))}
        {LANES.map((l, i) => (
          <g key={l}>
            <rect x="0" y={TOP + i * LH} width={W} height={LH - 6} rx="18" className="lane" />
            <rect x="0" y={TOP + i * LH} width="6" height={LH - 6} rx="3" fill={LANE_STYLE[i][0]} />
            {(() => { const L = LANE_STYLE[i][1]; return <L x="18" y={TOP + i * LH + (LH - 6) / 2 - 10} size={20} strokeWidth={1.75} color={LANE_STYLE[i][0]} />; })()}
            <text x="50" y={TOP + i * LH + LH / 2 + 1} className="lname">{l}</text>
          </g>
        ))}
        {LINKS.map(([a, b]) => {
          const [x1, y1] = pos(STEPS_SW[a][0], STEPS_SW[a][1]);
          const [x2, y2] = pos(STEPS_SW[b][0], STEPS_SW[b][1]);
          let d;
          if (x1 === x2) {
            const down = y2 > y1;
            d = `M${x1 + BW / 2},${y1 + (down ? BH : 0)} L${x2 + BW / 2},${y2 + (down ? -2 : BH + 2)}`;
          } else {
            const sx = x1 + BW, sy = y1 + BH / 2, ex = x2 - 2, ey = y2 + BH / 2, mx = (sx + ex) / 2;
            d = `M${sx},${sy} C${mx},${sy} ${mx},${ey} ${ex},${ey}`;
          }
          return <path key={`${a}-${b}`} d={d} className="ln" markerEnd="url(#sw-ar)" />;
        })}
        {STEPS_SW.map(([lane, stage, label, bp]) => {
          const [x, y] = pos(lane, stage);
          return (
            <g key={label} className="node" style={{ "--d": `${(stage * 4 + lane) * 60}ms` }}>
              <rect x={x} y={y} width={BW} height={BH} rx="12" className={lane === 0 ? "box me" : "box"} filter="url(#sw-sh)" />
              <text x={x + BW / 2} y={y + BH / 2 + 4} textAnchor="middle" className="t">{label}</text>
              {bp && (
                <g className="flag">
                  <circle cx={x + BW - 4} cy={y + 2} r="11" className="bp" />
                  <text x={x + BW - 4} y={y + 6} textAnchor="middle" className="bpt">{bp}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Journey() {
  const face = (v) => (v >= 1 ? Smile : v >= -1 ? Meh : v >= -2 ? Frown : Angry);
  const W = 1000;
  const x = (i) => 80 + i * ((W - 160) / (JOURNEY.length - 1));
  const y = (v) => 120 - v * 26;
  const pts = JOURNEY.map(([, , , v], i) => [x(i), y(v)]);
  const d = pts.reduce((acc, [px, py], i) => {
    if (!i) return `M${px},${py}`;
    const [qx, qy] = pts[i - 1];
    const mx = (qx + px) / 2;
    return `${acc} C${mx},${qy} ${mx},${py} ${px},${py}`;
  }, "");
  return (
    <section className="jm" data-reveal>
      <header>
        <p className="cs-mono">Journey map · a day today</p>
        <h3>The day starts fine, and ends in a spreadsheet</h3>
      </header>
      <div className="cs-scroll">
        <div className="jm__body">
          <svg viewBox={`0 0 ${W} 230`} className="jm__curve" aria-hidden="true">
            <defs>
              <linearGradient id="jm-g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2FB67C" />
                <stop offset="0.45" stopColor="#F5A524" />
                <stop offset="1" stopColor="#EF5B6B" />
              </linearGradient>
              <linearGradient id="jm-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#6B5CFF" stopOpacity="0.16" />
                <stop offset="1" stopColor="#6B5CFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="40" x2={W - 40} y1={y(0)} y2={y(0)} className="jm__base" />
            <path d={`${d} L${x(5)},230 L${x(0)},230 Z`} fill="url(#jm-fill)" />
            <path d={d} className="jm__line" stroke="url(#jm-g)" />
            {pts.map(([px, py], i) => (
              <g key={i}>
                <circle cx={px} cy={py} r="20" className="jm__halo" />
                {(() => { const F = face(JOURNEY[i][3]); return <F x={px - 11} y={py - 11} size={22} strokeWidth={1.75} className="jm__face" color={JOURNEY[i][3] < 0 ? "#d6455d" : "#2fb67c"} />; })()}
              </g>
            ))}
          </svg>
          <ol className="jm__steps">
            {JOURNEY.map(([t, stage, doing, v, pain, Icon]) => (
              <li key={t} className={v < 0 ? "bad" : "ok"}>
                <span className="jm__icon"><Icon size={18} strokeWidth={1.75} /></span>
                <p className="jm__time">{t}</p>
                <h4>{stage}</h4>
                <p className="jm__doing">{doing}</p>
                <p className="jm__pain">{pain}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="jm__foot">
        <b>Biggest drop:</b> payouts at 10 PM, the one job that decides whether she made money.
      </p>
    </section>
  );
}

/* ───────────────────────── 03 who it's for ───────────────────────── */

const RIVALS = [
  {
    name: "Amazon Seller Assistant",
    domain: "amazon.in",
    took: "Asks permission before acting",
    gap: "Only sees Amazon",
    src: ["aboutamazon.in", "https://www.aboutamazon.in/news/small-business/amazon-seller-assistant-ai-tool-india"],
  },
  {
    name: "Flipkart Saarthi",
    domain: "flipkart.com",
    took: "Flags the problem, then suggests a fix",
    gap: "Ads only, Flipkart only",
    src: ["The Wire", "https://m.thewire.in/article/ptiprnews/flipkart-ads-launches-saarthi-to-help-sellers-grow-with-ai-powered-tools-and-expert-advertising-support"],
  },
  {
    name: "Meesho voice agents",
    domain: "meesho.com",
    took: "Local-language voice",
    gap: "Support calls, not decisions",
    src: ["Inc42", "https://inc42.com/features/amazon-flipkart-meeshos-ai-focus-shifts-to-seller-side-stacks/"],
  },
  {
    name: "Shopify Sidekick",
    domain: "shopify.com",
    took: "Shows the automation before it runs",
    gap: "One store only",
    src: ["Retail Brew", "https://www.retailbrew.com/stories/2025/12/11/shopify-plugs-in-more-ai-power-to-merchant-assistant"],
  },
  {
    name: "Unicommerce",
    domain: "unicommerce.com",
    took: "Payout checks as a feature",
    gap: "Built for brands with ops teams",
    src: ["The Week", "https://www.theweek.in/wire-updates/business/2025/06/19/dcm36-unicommerce.html"],
  },
];

/* x: 0 = one marketplace, 100 = all of them. y: 0 = shows information, 100 = takes action. */
const MAP = [
  ["Amazon Seller Assistant", "amazon.in", 22, 78],
  ["Flipkart Saarthi", "flipkart.com", 26, 52],
  ["Meesho voice agents", "meesho.com", 20, 26],
  ["Shopify Sidekick", "shopify.com", 38, 64],
  ["Unicommerce", "unicommerce.com", 78, 34],
  ["Spreadsheets", "", 62, 12],
];

function Positioning() {
  return (
    <div className="pm" role="img" aria-label="Positioning map: marketplace AI tools act but see one marketplace; multichannel tools see all marketplaces but only show information; CoSell sees all and acts with permission.">
      <div className="pm__plot">
        <span className="pm__q tl">Acts, one shop</span>
        <span className="pm__q tr">Acts, every shop</span>
        <span className="pm__q bl">Informs, one shop</span>
        <span className="pm__q br">Informs, every shop</span>
        <span className="pm__glow" />
        {MAP.map(([n, dom, x, y]) => (
          <span key={n} className="pm__chip" style={{ left: `${x}%`, bottom: `${y}%` }}>
            {dom ? <img src={`https://www.google.com/s2/favicons?domain=${dom}&sz=64`} alt="" /> : <i>▦</i>}
            {n}
          </span>
        ))}
        <span className="pm__chip us" style={{ left: "82%", bottom: "78%" }}>
          <CoMark state="idle" size={24} />
          CoSell
        </span>
      </div>
      <span className="pm__ax y">Takes action →</span>
      <span className="pm__ax x">Sees every marketplace →</span>
    </div>
  );
}

const TOOLS = ["Marketplace AI", "Shopify Sidekick", "Multichannel tools", "CoSell"];
const CAPS = [
  ["Sees every marketplace at once", [0, 0, 1, 1]],
  ["Checks the fees a marketplace charged", [0, 0, 1, 1]],
  ["Acts for you, with permission", [1, 1, 0.5, 1]],
  ["Explains why, in plain words", [0.5, 0.5, 0, 1]],
  ["Hindi, and voice", [0.5, 0.5, 0, 1]],
  ["Made for a one-person shop", [1, 1, 0, 1]],
];

function Analysis() {
  return (
    <Sec
      id="analysis"
      n="03"
      kicker="Analysis"
      title="Who I designed for, and what already exists"
      lede="One seller, built from the research, and the AI tools she already has."
    >
      <article className="pc" data-reveal>
        <div className="pc__id">
          <img src={MEERA} alt="" width="120" height="120" loading="lazy" />
          <div>
            <p className="cs-mono">Primary persona · an archetype</p>
            <h3>Meera, 34</h3>
            <p className="pc__sub">Runs Meera Handloom from Jaipur, with one helper</p>
            <div className="pc__shops">
              {["amazon.in", "flipkart.com", "meesho.com"].map((d) => (
                <img key={d} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width="22" height="22" />
              ))}
              <span>3 marketplaces · 356 listings</span>
            </div>
          </div>
          <blockquote>"I don't need more data. I need someone to tell me what to fix today."</blockquote>
        </div>
        <div className="pc__nums">
          {[
            ["3", "dashboards every morning"],
            ["35 min", "just checking them"],
            ["10 PM", "when payouts get reconciled"],
            ["0", "time to check every fee"],
          ].map(([n, l]) => (
            <div key={l}>
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div className="pc__grid">
          <div className="g">
            <p>Wants</p>
            <ul>
              <li>Grow without hiring</li>
              <li>Stop working at 10 PM</li>
              <li>One place to look</li>
            </ul>
          </div>
          <div className="b">
            <p>Frustrations</p>
            <ul>
              <li>Learns of stockouts from cancellations</li>
              <li>Fees she can't check</li>
              <li>Three logins, three rule books</li>
            </ul>
          </div>
          <div className="t">
            <p>Tech comfort</p>
            <div className="pc__bar"><i style={{ width: "60%" }} /></div>
            <span>Uses seller apps daily. Prefers Hindi when tired. Wary of anything that changes prices on its own.</span>
          </div>
        </div>
      </article>

      <div className="cs-comp" data-reveal>
        <p className="cs-mono">Competitive landscape</p>
        <h3 className="cs-h3">Every marketplace now has its own AI. Each one only sees its own shop.</h3>
        <div className="cmp">
          <Positioning />
          <ul className="cmp__list">
            {RIVALS.map((r) => (
              <li key={r.name}>
                <img src={`https://www.google.com/s2/favicons?domain=${r.domain}&sz=64`} alt="" width="32" height="32" loading="lazy" />
                <div>
                  <p className="nm">{r.name}</p>
                  <p className="ok">+ {r.took}</p>
                  <p className="miss">− {r.gap}</p>
                </div>
                <a href={r.src[1]} target="_blank" rel="noreferrer" aria-label={`Source for ${r.name}`}>↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sec>
  );
}

function Ecosystem() {
  const nodes = [
    [120, 60, "Marketplace 1", "Seller panel"],
    [120, 170, "Marketplace 2", "Seller panel"],
    [120, 280, "Marketplace 3", "Seller panel"],
    [720, 60, "Couriers", "Pickups, RTO"],
    [720, 170, "Buyers", "Returns, reviews"],
    [720, 280, "Excel", "Payout checks"],
  ];
  return (
    <div className="cs-scroll">
      <svg viewBox="0 0 840 340" className="cs-eco" role="img" aria-label="Meera in the centre, connected to three marketplaces, couriers, buyers and an Excel sheet">
        {nodes.map(([x, y]) => (
          <line key={`${x}${y}`} x1={x < 400 ? x + 90 : x - 90} y1={y} x2={x < 400 ? 330 : 510} y2="170" className="edge" />
        ))}
        {nodes.map(([x, y, t, s]) => (
          <g key={t}>
            <rect x={x - 90} y={y - 30} width="180" height="60" rx="12" className="node" />
            <text x={x} y={y - 3} textAnchor="middle" className="t">{t}</text>
            <text x={x} y={y + 16} textAnchor="middle" className="s">{s}</text>
          </g>
        ))}
        <rect x="330" y="120" width="180" height="100" rx="16" className="node me" />
        <text x="420" y="164" textAnchor="middle" className="t me">Meera</text>
        <text x="420" y="186" textAnchor="middle" className="s me">+ one helper</text>
        <text x="420" y="300" textAnchor="middle" className="scrawl">6 systems, 0 of them talk to each other</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── 04 the brief ───────────────────────── */

function Define() {
  return (
    <Part title="Problem statement and principles">
      <blockquote className="cs-hmw" data-reveal>
        <span className="cs-mono">How might we</span>
        let a solo seller hand the repetitive marketplace work to an AI, <em>and still feel like it's her shop?</em>
      </blockquote>
      <div className="cs-rules" data-reveal>
        <p className="hand cs-rules__title">Design principles</p>
        <div className="cs-rules__grid">
          {[
            ["y", -2, "Nothing changes without a yes.", "Unless Meera has written a rule that says Co can go ahead."],
            ["p", 1.5, "Always show the working.", "What Co wants, why, what happens next, and how sure it is."],
            ["b", -1, "Undo is always there.", "One tap to take it back, and a log of everything Co did."],
            ["g", 2, "Quiet unless it matters.", "One screen to look at, sorted by what needs her right now."],
          ].map(([c, r, t, d], i) => (
            <Sticky key={t} c={c} r={r}>
              <span className="pin" aria-hidden="true" />
              <p className="cs-mono">Rule {i + 1}</p>
              <h3 className="hand">{t}</h3>
              <p>{d}</p>
            </Sticky>
          ))}
        </div>
      </div>
    </Part>
  );
}

/* ───────────────────────── 05 flows ───────────────────────── */

function Flows() {
  return (
    <Part title="Who does what">
      <div className="cs-roles" data-reveal>
        <div>
          <p className="who">
            <CoMark state="thinking" size={22} /> Co's job
          </p>
          <ul>
            <li>Keeps an eye on listings, orders and payouts, overnight too</li>
            <li>Sees a stockout coming before the sale spike</li>
            <li>Drafts price changes and return replies, with the evidence attached</li>
            <li>Spots wrong fees while there's still time to claim</li>
          </ul>
        </div>
        <div>
          <p className="who">Meera's job</p>
          <ul>
            <li>Says yes, tweaks it, or says no</li>
            <li>Sets the limits Co can never go past</li>
            <li>Decides how much freedom each kind of task gets</li>
            <li>Can undo anything, whenever she likes</li>
          </ul>
        </div>
      </div>

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Core loop</span> What happens between Co noticing something and anything actually changing
        </figcaption>
        <Loop />
      </figure>

    </Part>
  );
}

function Loop() {
  return (
    <div className="cs-scroll">
      <svg viewBox="0 0 900 310" className="cs-flow" role="img" aria-label="Flowchart: Co notices something and checks it against Meera's limits. If she allowed Co to act alone, it acts and can be undone. Otherwise Meera reviews it; a no teaches Co.">
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="head" />
          </marker>
        </defs>
        {[
          [20, 120, "Co notices", "price drop, low stock"],
          [190, 120, "Checks limits", "floor, margin, % cap"],
        ].map(([x, y, t, s]) => (
          <g key={t}>
            <rect x={x} y={y} width="140" height="60" rx="10" className="box" />
            <text x={x + 70} y={y + 27} textAnchor="middle" className="t">{t}</text>
            <text x={x + 70} y={y + 45} textAnchor="middle" className="s">{s}</text>
          </g>
        ))}
        <path d="M160,150 H185" className="ln" markerEnd="url(#ar)" />
        <path d="M330,150 H375" className="ln" markerEnd="url(#ar)" />
        <polygon points="445,105 515,150 445,195 375,150" className="box dia" />
        <text x="445" y="146" textAnchor="middle" className="t">Allowed to</text>
        <text x="445" y="162" textAnchor="middle" className="s">act alone?</text>
        <path d="M445,105 V50 H560" className="ln" markerEnd="url(#ar)" />
        <text x="455" y="80" className="s">yes</text>
        <path d="M445,195 V250 H560" className="ln" markerEnd="url(#ar)" />
        <text x="455" y="230" className="s">no</text>
        <rect x="565" y="20" width="160" height="60" rx="10" className="box ok" />
        <text x="645" y="47" textAnchor="middle" className="t">Does it, logs it</text>
        <text x="645" y="65" textAnchor="middle" className="s">undo for 24h</text>
        <rect x="565" y="220" width="160" height="60" rx="10" className="box me" />
        <text x="645" y="247" textAnchor="middle" className="t">Meera looks</text>
        <text x="645" y="265" textAnchor="middle" className="s">yes · tweak · no</text>
        <path d="M725,250 H790 V80" className="ln" markerEnd="url(#ar)" />
        <text x="800" y="170" className="s">yes / tweak</text>
        <path d="M645,280 V300 H90 V185" className="ln dash" markerEnd="url(#ar)" />
        <text x="300" y="295" className="s">no, and why, so Co learns</text>
        <rect x="740" y="20" width="140" height="60" rx="10" className="box ok" />
        <path d="M725,50 H735" className="ln" />
        <text x="810" y="47" textAnchor="middle" className="t">Marketplace</text>
        <text x="810" y="65" textAnchor="middle" className="s">updated</text>
        <text x="200" y="40" className="scrawl">every feature runs through this</text>
        <path d="M300,48 C330,70 350,90 380,118" className="scrawl-ln" markerEnd="url(#ar)" />
      </svg>
    </div>
  );
}

/* ───────────────────────── 06 wireframes ───────────────────────── */

function Wire({ lines = 3 }) {
  return Array.from({ length: lines }, (_, i) => <i key={i} className="wl" style={{ width: `${90 - i * 18}%` }} />);
}

/* Grey blocks laid out in % so they sit exactly over the real screenshot. [x0, y0, x1, y1, kind] on a 2000×1250 grid. */
const WIRES = {
  home: [
    [33, 33, 155, 1215, "side"],
    [62, 72, 128, 138, "logo"],
    [80, 212, 110, 242, "icon"],
    [80, 296, 110, 326, "icon"],
    [80, 380, 110, 410, "icon"],
    [80, 462, 110, 492, "icon"],
    [80, 546, 110, 576, "icon"],
    [80, 1130, 110, 1160, "icon"],
    [975, 75, 1445, 135, "pill"],
    [1000, 95, 1030, 115, "circle"],
    [1045, 98, 1220, 113, "line"],
    [1470, 78, 1590, 132, "pill"],
    [1478, 83, 1528, 127, "circle dark"],
    [1612, 78, 1670, 132, "circle"],
    [1695, 80, 1745, 130, "circle img"],
    [1758, 86, 1820, 102, "line dark"],
    [1758, 112, 1905, 127, "line"],
    [200, 96, 600, 116, "line"],
    [200, 190, 670, 235, "head"],
    [208, 260, 222, 274, "circle dark"],
    [245, 258, 670, 276, "line"],
    [202, 315, 555, 555, "card"],
    [235, 350, 277, 392, "icon tint"],
    [292, 362, 415, 380, "line"],
    [235, 420, 370, 455, "head"],
    [235, 476, 425, 492, "line"],
    [592, 315, 945, 555, "card"],
    [625, 350, 667, 392, "icon tint"],
    [682, 362, 805, 380, "line"],
    [625, 420, 760, 455, "head"],
    [625, 476, 815, 492, "line"],
    [982, 315, 1335, 555, "card"],
    [1015, 350, 1057, 392, "icon tint"],
    [1072, 362, 1195, 380, "line"],
    [1015, 420, 1150, 455, "head"],
    [1015, 476, 1205, 492, "line"],
    [410, 415, 530, 455, "spark"],
    [1370, 178, 1922, 555, "card dark"],
    [1405, 215, 1535, 232, "line light"],
    [1405, 255, 1712, 290, "head light"],
    [1405, 300, 1600, 333, "head light"],
    [1405, 352, 1720, 368, "line light"],
    [1405, 468, 1643, 520, "pill light"],
    [1805, 210, 1890, 295, "ring"],
    [1690, 370, 1905, 535, "img light"],
    [202, 590, 1336, 1096, "card"],
    [235, 628, 480, 656, "head"],
    [497, 628, 530, 656, "chip tint"],
    [235, 668, 730, 688, "line"],
    [235, 735, 297, 795, "img"],
    [318, 755, 830, 775, "line dark"],
    [928, 747, 1022, 783, "chip"],
    [1045, 747, 1178, 783, "chip tint"],
    [1200, 743, 1302, 787, "chip tint"],
    [235, 835, 297, 895, "img"],
    [318, 855, 830, 875, "line dark"],
    [928, 847, 1022, 883, "chip"],
    [1045, 847, 1178, 883, "chip tint"],
    [1200, 843, 1302, 887, "chip tint"],
    [235, 935, 297, 995, "img"],
    [318, 955, 830, 975, "line dark"],
    [928, 947, 1022, 983, "chip"],
    [1045, 947, 1178, 983, "chip tint"],
    [1200, 943, 1302, 987, "chip tint"],
    [235, 1040, 430, 1058, "line accent"],
    [1372, 590, 1920, 1096, "card"],
    [1405, 628, 1555, 656, "head"],
    [1758, 630, 1887, 652, "chip tint"],
    [1405, 668, 1683, 688, "line"],
    [1405, 717, 1427, 739, "circle"],
    [1447, 717, 1770, 735, "line dark"],
    [1447, 747, 1590, 763, "line"],
    [1405, 800, 1427, 822, "circle"],
    [1447, 800, 1770, 818, "line dark"],
    [1447, 830, 1590, 846, "line"],
    [1405, 884, 1427, 906, "circle"],
    [1447, 884, 1770, 902, "line dark"],
    [1447, 914, 1590, 930, "line"],
    [1405, 995, 1427, 1017, "circle"],
    [1447, 995, 1770, 1013, "line dark"],
    [1447, 1025, 1590, 1041, "line"],
  ],
  approval: [
    [33, 33, 155, 1215, "side"],
    [62, 72, 128, 138, "logo"],
    [80, 212, 110, 242, "icon"],
    [80, 296, 110, 326, "icon"],
    [80, 380, 110, 410, "icon"],
    [80, 462, 110, 492, "icon"],
    [80, 546, 110, 576, "icon"],
    [80, 1130, 110, 1160, "icon"],
    [975, 75, 1445, 135, "pill"],
    [1000, 95, 1030, 115, "circle"],
    [1045, 98, 1220, 113, "line"],
    [1470, 78, 1590, 132, "pill"],
    [1478, 83, 1528, 127, "circle dark"],
    [1612, 78, 1670, 132, "circle"],
    [1695, 80, 1745, 130, "circle img"],
    [1758, 86, 1820, 102, "line dark"],
    [1758, 112, 1905, 127, "line"],
    [200, 75, 260, 135, "circle"],
    [278, 96, 560, 116, "line"],
    [200, 185, 1155, 232, "head"],
    [1178, 190, 1270, 222, "chip"],
    [1282, 190, 1468, 222, "chip tint"],
    [1642, 205, 1922, 221, "line"],
    [202, 268, 1336, 698, "card"],
    [246, 316, 506, 333, "line"],
    [983, 316, 1290, 333, "line dark"],
    [246, 365, 368, 487, "img"],
    [400, 418, 497, 438, "line strike"],
    [527, 400, 580, 452, "circle tint"],
    [612, 395, 793, 460, "head big"],
    [823, 410, 953, 442, "chip tint"],
    [246, 553, 757, 653, "sub"],
    [274, 575, 375, 592, "line"],
    [274, 605, 415, 628, "head"],
    [781, 553, 1290, 653, "sub"],
    [808, 575, 950, 592, "line"],
    [808, 605, 1125, 628, "head"],
    [1372, 268, 1922, 698, "card"],
    [1405, 305, 1636, 335, "head"],
    [1745, 302, 1887, 334, "chip tint"],
    [1405, 346, 1553, 364, "line"],
    [1405, 409, 1445, 449, "circle tint"],
    [1461, 409, 1667, 429, "line dark"],
    [1461, 436, 1600, 452, "line"],
    [1405, 487, 1445, 527, "circle tint"],
    [1461, 487, 1667, 507, "line dark"],
    [1461, 514, 1600, 530, "line"],
    [1405, 565, 1445, 605, "circle tint"],
    [1461, 565, 1667, 585, "line dark"],
    [1461, 592, 1600, 608, "line"],
    [1405, 645, 1563, 663, "line accent"],
    [202, 735, 1336, 1072, "card"],
    [248, 787, 541, 812, "head"],
    [246, 845, 296, 893, "icon tint"],
    [313, 860, 645, 878, "line dark"],
    [246, 911, 296, 959, "icon tint"],
    [313, 926, 645, 944, "line dark"],
    [246, 978, 296, 1026, "icon tint"],
    [313, 993, 645, 1011, "line dark"],
    [874, 783, 1185, 800, "line"],
    [874, 840, 1290, 970, "chart"],
    [874, 980, 950, 995, "line"],
    [1236, 980, 1280, 995, "line"],
    [1372, 735, 1922, 1072, "card"],
    [1405, 773, 1643, 800, "head"],
    [1405, 815, 1865, 833, "line"],
    [1405, 843, 1517, 861, "line"],
    [1405, 893, 1553, 960, "btn dark"],
    [1571, 893, 1725, 960, "btn"],
    [1815, 918, 1876, 936, "line bad"],
    [1405, 990, 1750, 1008, "line dark"],
    [1405, 1017, 1647, 1033, "line"],
    [1826, 995, 1887, 1028, "pill"],
  ],
};

/** A static low-fi screen drawn from the same blocks as the wireframe-to-final slider. */
function WireScreen({ which }) {
  const blocks = which === "dash" ? WIRES_DASH : WIRES[which];
  return (
    <div className="lofi-screen" aria-hidden="true">
      {blocks.map(([x0, y0, x1, y1, k], i) => (
        <i key={i} className={k} style={{ left: `${x0 / 20}%`, top: `${y0 / 12.5}%`, width: `${(x1 - x0) / 20}%`, height: `${(y1 - y0) / 12.5}%` }} />
      ))}
    </div>
  );
}

const WIRES_DASH = [
  [33, 33, 155, 1215, "side"],
  [200, 90, 600, 122, "line"],
  [975, 75, 1445, 135, "pill"],
  [202, 180, 640, 330, "card"],
  [672, 180, 1110, 330, "card"],
  [1142, 180, 1580, 330, "card"],
  [1612, 180, 1922, 330, "card"],
  [202, 360, 1922, 820, "chart"],
  [202, 850, 1922, 1100, "card"],
  [235, 900, 1300, 920, "line"],
  [235, 960, 1100, 980, "line"],
  [235, 1020, 900, 1040, "line"],
];

function PhoneWire() {
  return (
    <div className="lofi-phone" aria-hidden="true">
      <i className="pw-bar" />
      <i className="pw-title" />
      <i className="pw-sub" />
      <div className="pw-stack">
        <span />
        <span />
        <div className="pw-card">
          <i className="pw-img" />
          <i className="pw-l1" />
          <i className="pw-l2" />
          <div className="pw-btns">
            <b />
            <b className="dark" />
          </div>
        </div>
      </div>
      <i className="pw-tabs" />
    </div>
  );
}

function WireToFinal() {
  const [which, setWhich] = useState("home");
  const [split, setSplit] = useState(55);
  return (
    <figure className="cs-w2f" data-reveal>
      <figcaption>
        <span className="cs-mono">Wireframe to final</span>
        <span>Drag to compare the wireframe with the final screen.</span>
        <span className="seg cs-w2f__tabs" role="radiogroup" aria-label="Which screen">
          {[
            ["home", "Home"],
            ["approval", "Suggestion"],
          ].map(([k, l]) => (
            <button key={k} type="button" role="radio" aria-checked={which === k} onClick={() => setWhich(k)}>
              {l}
            </button>
          ))}
        </span>
      </figcaption>
      <div className="cs-w2f__stage" style={{ "--split": `${split}%` }}>
        <img src={`${A}${which}.webp`} alt={`Final ${which} screen`} width="2880" height="1800" />
        <div className="cs-w2f__wire" aria-hidden="true">
          {WIRES[which].map(([x0, y0, x1, y1, k], i) => (
            <i
              key={i}
              className={k}
              style={{ left: `${x0 / 20}%`, top: `${y0 / 12.5}%`, width: `${(x1 - x0) / 20}%`, height: `${(y1 - y0) / 12.5}%` }}
            />
          ))}
        </div>
        <span className="wipe" aria-hidden="true" />
        <input type="range" min="0" max="100" value={split} onChange={(e) => setSplit(Number(e.target.value))} aria-label="Wipe between wireframe and final screen" />
        <span className="tag l">Wireframe</span>
        <span className="tag r">Final</span>
      </div>
    </figure>
  );
}

function Wireframes() {
  return (
    <Part title="From wireframe to screen">
      <WireToFinal />

      <div className="lofi" data-reveal>
        <figure className="lofi__wide">
          <div className="lofi-win">
            <span className="dots"><i /><i /><i /></span>
            <WireScreen which="home" />
            <span className="lofi-note" style={{ left: "16%", top: "62%" }}>1</span>
            <span className="lofi-note" style={{ left: "84%", top: "36%" }}>2</span>
          </div>
          <figcaption>
            <b>Home</b>
            <span>① Approval queue leads ② Co's overnight log on the side</span>
          </figcaption>
        </figure>
        <figure className="lofi__wide">
          <div className="lofi-win">
            <span className="dots"><i /><i /><i /></span>
            <WireScreen which="approval" />
            <span className="lofi-note" style={{ left: "26%", top: "36%" }}>1</span>
            <span className="lofi-note" style={{ left: "88%", top: "70%" }}>2</span>
          </div>
          <figcaption>
            <b>Suggestion</b>
            <span>① The change in big numbers ② One clear decision</span>
          </figcaption>
        </figure>
        <figure className="lofi__phone">
          <PhoneWire />
          <figcaption>
            <b>Phone</b>
            <span>One card, swipe to decide</span>
          </figcaption>
        </figure>
      </div>

      <div className="lofi-options" data-reveal>
        <figure>
          <WireScreen which="dash" />
          <figcaption>
            <span className="tag no">Option A</span> Charts first. Decisions sat below the fold.
          </figcaption>
        </figure>
        <figure className="picked">
          <WireScreen which="home" />
          <figcaption>
            <span className="tag yes">Option B, picked</span> The queue first. Decisions are the job.
          </figcaption>
        </figure>
      </div>
    </Part>
  );
}

/* ───────────────────────── 07 trade-offs ───────────────────────── */

const TRADEOFFS = [
  ["Home screen", "The approval list is the home", "A rich analytics dashboard", "Deciding is the actual work. The charts can live one click away."],
  ["How sure Co is", "High, Medium or Low, with reasons", "A precise score like 87%", "A number looks more exact than it is. Reasons let her judge for herself."],
  ["Freedom", "Three levels, set per task", "One on/off switch for the AI", "People trust a restock alert long before they trust automatic pricing."],
  ["Safety net", "An undo toast and a full log", "\"Are you sure?\" on every approval", "If saying yes is cheap, she'll say it more. Pop-ups just slow her down."],
  ["Language", "Full Hindi, and voice", "English only, which ships faster", "At 10 PM, after a long day, a lot of sellers would rather think in Hindi."],
];

function Tradeoffs() {
  return (
    <Part title="What I picked, and what I gave up for it">
      <div className="cs-trade" data-reveal>
        <div className="cs-trade__row head" aria-hidden="true">
          <span>Decision</span>
          <span>Went with</span>
          <span>Gave up</span>
          <span>Because</span>
        </div>
        {TRADEOFFS.map(([k, chose, gave, why]) => (
          <div key={k} className="cs-trade__row">
            <span className="k">{k}</span>
            <span className="chose">{chose}</span>
            <span className="gave">{gave}</span>
            <span className="why">{why}</span>
          </div>
        ))}
      </div>

      <div className="cs-killed" data-reveal>
        <p className="hand cs-killed__title">Ideas I rejected</p>
        <div className="cs-killed__row">
          {[
            ["Let Co run fully on autopilot", "Exactly the fear the research kept surfacing. Nobody would switch it on."],
            ["Make the whole app a chat", "Fine for questions, terrible for working through 12 approvals in a row."],
            ["A daily email instead of an app", "By the time she reads it, the claim window or the sale has passed."],
          ].map(([t, d], i) => (
            <Sticky key={t} c="w" r={[-3, 2, -1][i]} className="crossed">
              <h3 className="hand">{t}</h3>
              <p>{d}</p>
            </Sticky>
          ))}
        </div>
      </div>

    </Part>
  );
}


/* ───────────────────────── 08 solution ───────────────────────── */

const SCREENS = [
  {
    img: "home",
    dec: { problem: "Sellers open the app to find out what needs them, and a dashboard makes them hunt for it.", alts: ["Charts-first analytics dashboard", "Notifications in a bell menu"], why: "A queue sorted by urgency answers \"what do I do now?\" in one glance. The numbers stay, but shrink to three." },
    short: "Home",
    t: "Home, a to-do list rather than a dashboard",
    d: "The first thing Meera sees is what needs her, not a wall of charts.",
    pins: [
      [12, 30, "Three numbers, no more. Sales, orders to ship, returns."],
      [70, 18, "One line on how the shop is doing, so she doesn't have to work it out."],
      [12, 52, "Things waiting for a yes, most urgent first. Each row: what, where, how sure, one button."],
      [71, 52, "What Co did overnight, each with its own undo."],
    ],
  },
  {
    img: "approval",
    dec: { problem: "A seller won't approve a price change she can't check.", alts: ["A one-line card with Approve / Reject", "A confidence score like 87%"], why: "Showing the change, her margin after it, her own limits and the reason lets her judge it in seconds. High / Medium / Low with reasons is easier to trust than a number." },
    short: "Suggestion",
    t: "A suggestion, with all its working shown",
    d: "Everything she needs to say yes or no, on one screen.",
    pins: [
      [12, 30, "The change, in big numbers, with her margin and expected orders after it."],
      [70, 26, "Her own limits, checked before she even asks."],
      [12, 64, "Why Co thinks this, in plain words, plus what competitors did this week."],
      [70, 63, "Yes, tweak or no. She can let Co do this kind of thing alone next time."],
    ],
  },
  {
    img: "inventory",
    dec: { problem: "Stock counts drift between marketplaces and cause overselling.", alts: ["Auto-correct every mismatch silently", "Only flag them in a report"], why: "Flag each mismatch with a one-click fix. Fixing silently would hide errors from her; a report alone would be read too late." },
    short: "Inventory",
    t: "One stock count across every shop",
    d: "When a marketplace shows the wrong number, it's caught before it oversells.",
    pins: [
      [12, 24, "One banner, one action: Co can fix both mismatches."],
      [46.5, 50, "One marketplace says 124. She actually has 118."],
      [70, 38, "Restock ideas based on the last 14 days of sales."],
    ],
  },
  {
    img: "returns",
    dec: { problem: "Each marketplace has its own reply deadline, and missing it means losing the case.", alts: ["Let Co send replies automatically", "A plain list of open returns"], why: "Sort by deadline and draft the reply, but let her send it. A reply speaks for her shop, so it stays her call by default." },
    short: "Returns",
    t: "Returns, with the replies already drafted",
    d: "Sorted by deadline, so nothing gets decided for her by default.",
    pins: [
      [12, 25, "How returns are going, at a glance."],
      [73, 52, "The closest deadline is flagged in red. Co's reply is one click away."],
    ],
  },
  {
    img: "settings",
    dec: { problem: "Sellers trust some automation (restock alerts) long before others (pricing).", alts: ["One global AI on/off switch", "Fixed rules set during onboarding"], why: "A freedom level per task, plus hard limits Co can never cross. Trust can grow one task at a time." },
    short: "Co settings",
    t: "How much Co is allowed to do",
    d: "Freedom is set task by task, and some lines are never crossed.",
    pins: [
      [12, 37, "Pricing, restocking, returns and ads each get their own level."],
      [65, 37, "Hard limits: minimum margin, max price change, daily ad budget."],
      [65, 75, "Products Co must never discount, whatever happens."],
    ],
  },
];

const CONTROLS = [
  ["Approve, edit or reject", "Every suggestion ends in three choices. Edit opens the price so she can set her own.", "decide2"],
  ["Limits Co can't cross", "Minimum margin, max price change a day, daily ad budget. Even on auto.", "limits"],
  ["Never-discount list", "Products Co may never lower the price of, whatever the data says.", "never"],
  ["Undo, and action history", "Everything Co did overnight is listed with a time and an undo.", "activity"],
  ["Checks before it asks", "Each suggestion shows which of her rules it was checked against.", "guardrails"],
];


function ScreenViewer() {
  const [i, setI] = useState(0);
  const s = SCREENS[i];
  return (
    <div className="cs-viewer" data-reveal>
      <div className="cs-viewer__top">
          <div className="cs-viewer__tabs" role="tablist" aria-label="Screens">
          {SCREENS.map((sc, k) => (
            <button key={sc.img} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}>
              <span>{String(k + 1).padStart(2, "0")}</span>
              {sc.short}
            </button>
          ))}
        </div>
        <a className="cs-protolink" href={DEMO} target="_blank" rel="noreferrer">
          <span className="dot" /> View prototype <span aria-hidden="true">↗</span>
        </a>
      </div>
      <Screen key={s.img} s={s} />
      <div className="cs-viewer__nav">
        <button type="button" onClick={() => setI((i + SCREENS.length - 1) % SCREENS.length)} aria-label="Previous screen">←</button>
        <span>
          {i + 1} / {SCREENS.length}
        </span>
        <button type="button" onClick={() => setI((i + 1) % SCREENS.length)} aria-label="Next screen">→</button>
      </div>
    </div>
  );
}

function Screen({ s }) {
  const [on, setOn] = useState(null);
  return (
    <article className="cs-screen">
      <header>
        <h3>{s.t}</h3>
        <p>{s.d}</p>
      </header>
      <div className="cs-screen__frame">
        <img src={`${A}${s.img}.webp`} alt={s.t} width="2880" height="1800" loading="lazy" />
        {s.pins.map(([x, y], i) => (
          <button
            key={i}
            type="button"
            className={`cs-pin ${on === i ? "on" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setOn(i)}
            onMouseLeave={() => setOn(null)}
            onFocus={() => setOn(i)}
            onBlur={() => setOn(null)}
            aria-label={`Note ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ol className="cs-screen__notes">
        {s.pins.map(([, , note], i) => (
          <li key={i} className={on === i ? "on" : ""} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)}>
            <span>{i + 1}</span>
            {note}
          </li>
        ))}
      </ol>
      {s.dec && (
        <div className="cs-dec">
          <div>
            <p className="cs-mono">Problem</p>
            <p>{s.dec.problem}</p>
          </div>
          <div>
            <p className="cs-mono">Also considered</p>
            <ul>
              {s.dec.alts.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cs-mono">Why this</p>
            <p>{s.dec.why}</p>
          </div>
        </div>
      )}
    </article>
  );
}

function Solution() {
  return (
    <Sec id="solution" n="06" kicker="Solution" title="Final designs">
      <ScreenViewer />

      <div className="cs-control" data-reveal>
        <h3 className="cs-h3">The seller stays in control</h3>
        <p className="cs-body">Five controls hold up CoSell's promise. Every one is in the real interface, not just the story.</p>
        <div className="cs-control__grid">
          {CONTROLS.map(([t, d, img]) => (
            <figure key={t}>
              <div className="shot">
                <img src={`${A}pop/${img}.webp`} alt={`${t} in the CoSell interface`} loading="lazy" />
              </div>
              <figcaption>
                <b>{t}</b>
                {d}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <article className="cs-wrong" data-reveal>
        <div className="cs-feat__copy">
          <p className="cs-mono">Error recovery</p>
          <h3>When Co gets it wrong</h3>
          <p>
            It will, sometimes. So I designed this before the happy path. One tap puts things back exactly as they were,
            and then Co asks why, with the answers it most needs as buttons, not a text box nobody fills in.
          </p>
          <p className="cs-note">The next suggestion like this one shows "Last time you said: price was fine" right on the card.</p>
        </div>
        <div className="cs-wrong__ui" aria-label="Mock-up of the undo and feedback flow">
          <div className="w-card">
            <p className="w-k">Done by Co · 7:40 AM</p>
            <p className="w-t">Matched Block-print dupatta to ₹649 on Amazon</p>
            <div className="w-undo">
              <span>₹649 → ₹699, back to before</span>
              <b>Undone</b>
            </div>
          </div>
          <div className="w-card">
            <p className="w-t">What went wrong? It helps Co next time.</p>
            <div className="w-chips">
              <span className="on">My price was fine</span>
              <span>Wrong competitor</span>
              <span>Never discount this one</span>
              <span>Just not today</span>
            </div>
            <p className="w-learn">
              <CoMark state="done" size={18} /> Got it. Co won't match prices on this dupatta again without asking.
            </p>
          </div>
        </div>
      </article>

      <div className="cs-edges" data-reveal>
                <h3>Edge cases</h3>
        <div className="cs-edges__grid">
          {[
            ["A marketplace stops syncing", "Numbers from that shop are marked stale with the time of the last sync. Never hidden, never guessed."],
            ["Two suggestions clash", "A price cut and an ad pause on the same product become one decision, so she isn't asked twice."],
            ["Co isn't sure", "Below a confidence floor, Co asks a question instead of proposing an action."],
            ["She's away for a week", "Nothing waits forever. Anything past its deadline falls back to her safest setting and shows up in the recap."],
          ].map(([t, d]) => (
            <div key={t}>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-phones" data-reveal>
        <div className="cs-phones__copy">
          <p className="cs-mono">Mobile</p>
          <h3>Mobile app</h3>
          <p>She can approve straight from the lock screen, ask Co something in Hindi out loud, and get a short recap of the day at night.</p>
          <a className="cs-phones__try" href="/work/cosell/demo/index.html#/app" target="_blank" rel="noreferrer">
            Try the phone app ↗
          </a>
        </div>
        <div className="cs-phones__stage">
          {[
            ["m-lock", "Approving from the lock screen"],
            ["m-morning", "Morning swipe stack"],
            ["m-voice", "Asking Co in Hindi"],
          ].map(([img, alt], i) => (
            <img key={img} src={`${A}${img}.webp`} alt={alt} width="556" height="1174" loading="lazy" style={{ "--i": i }} />
          ))}
        </div>
      </div>



      <DesignSystem />
    </Sec>
  );
}

/* ───────────────────────── 10 iterations ───────────────────────── */

function Evo({ n, title, steps }) {
  return (
    <article className="evo" data-reveal>
      <header>
        <span className="evo__n">{n}</span>
        <h3>{title}</h3>
      </header>
      <ol className="evo__track">
        {steps.map((st, i) => (
          <li key={st.v} className={`evo__step ${i === steps.length - 1 ? "final" : ""}`} style={{ "--i": i }}>
            <div className="evo__card">
              <span className="evo__tag">{st.v}</span>
              <div className="evo__art">{st.art}</div>
              <p className="evo__cap">{st.cap}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="evo__why">
                <span>{st.why}</span>
                <i aria-hidden="true">→</i>
              </div>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}

function MiniCard({ money, photo }) {
  return (
    <div className="mc">
      {photo && <img src={`${A}pop/bottle.webp`} alt="" />}
      <div>
        {money ? <p className="mc__big">+₹7,641 a week</p> : <p className="mc__k">Pricing · Flipkart</p>}
        <p className="mc__t">{money ? "Drop Copper bottle to ₹849" : "Lower price of Copper water bottle"}</p>
        <span className={`mc__btn ${money ? "dark" : ""}`}>{money ? "Approve" : "Review"}</span>
      </div>
    </div>
  );
}

function Iterations() {
  return (
    <Part title="Three things I changed after the first version">
      <Evo
        n="01"
        title="Mobile: from a mini dashboard to one decision at a time"
        steps={[
          { v: "V1", cap: "A list of cards, labels and a Review button", art: <img className="evo__phone" src={`${A}iter-v1-phone.webp`} alt="First mobile version: a list of cards" />, why: "Too many taps between packing orders" },
          { v: "V2", cap: "A daily brief with numbers first", art: <img className="evo__phone" src={`${A}iter-v1-brief.webp`} alt="Second mobile version: a daily brief" />, why: "Still reading, not deciding" },
          { v: "Final", cap: "A swipe stack: yes or no, one at a time", art: <img className="evo__phone" src={`${A}m-morning.webp`} alt="Final mobile version: a swipe stack of decisions" /> },
        ]}
      />
      <Evo
        n="02"
        title="Suggestion cards: lead with the money"
        steps={[
          { v: "V1", cap: "Describes the action", art: <MiniCard />, why: "She decides on money, not actions" },
          { v: "V2", cap: "The gain leads", art: <MiniCard money />, why: "Needed to know which product at a glance" },
          { v: "Final", cap: "Photo + gain + one button", art: <MiniCard money photo /> },
        ]}
      />
      <Evo
        n="03"
        title="Co's icon: from decoration to status"
        steps={[
          { v: "V1", cap: "A glowing orb: just says \"AI\"", art: <span className="orb" />, why: "Looked like every AI product" },
          { v: "V2", cap: "Two circles that change shape", art: <span className="circles"><i /><i /></span>, why: "Hard to read at 16px, no brand tie-in" },
          {
            v: "Final",
            cap: "The logo, with a badge for state",
            art: (
              <span className="evo__marks">
                <CoMark state="idle" size={34} />
                <CoMark state="needsYou" size={34} />
                <CoMark state="done" size={34} />
                <CoMark state="paused" size={34} />
              </span>
            ),
          },
        ]}
      />
    </Part>
  );
}

/* ───────────────────────── 11 reflection ───────────────────────── */

function Reflection() {
  return (
    <Sec id="reflection" n="07" kicker="Reflection" title="Reflection and next steps">
      <div className="cs-valid" data-reveal>
        <span className="tag">Not tested yet</span>
        <h3>I haven't tested CoSell with sellers.</h3>
        <p>
          Everything on this page comes from desk research and my own critique. Here's how I'd test it first.
        </p>
        <dl>
          <div>
            <dt>Method</dt>
            <dd>Moderated, remote sessions with the clickable prototype, about 45 minutes each.</dd>
          </div>
          <div>
            <dt>Who</dt>
            <dd>5 small sellers who sell on at least two marketplaces, and run the shop mostly on their own.</dd>
          </div>
          <div>
            <dt>Tasks</dt>
            <dd>Approve a price change, undo it, set a minimum margin, and find a wrong fee on a settlement.</dd>
          </div>
          <div>
            <dt>What I'm checking</dt>
            <dd>Whether the reasons on a suggestion are enough to decide, and whether undo makes approving feel safe.</dd>
          </div>
        </dl>
      </div>

      <div className="cs-goals" data-reveal>
        <p className="cs-mono">How I'd know it works · targets, not results</p>
        <div className="cs-goals__row">
          {[
            ["15 min", "a day across all dashboards"],
            ["7 / 10", "high-confidence suggestions approved without edits"],
            ["< 1 / 20", "actions undone. Zero would worry me too: it may mean she's stopped checking"],
            ["0", "fee errors found after the claim window has closed"],
          ].map(([n, d]) => (
            <div key={n}>
              <p className="n">{n}</p>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rf" data-reveal>
        <p className="cs-mono">What I learned</p>
        <div className="rf__cards">
          {[
            [Handshake, "Trust is the product", "The AI was the easy part. Every screen had to earn a seller's yes."],
            [Undo2, "Design the failure first", "Planning for \"Co got it wrong\" shaped the whole approval flow."],
            [Target, "Less, but sharper", "Cutting the dashboard to one queue made the product feel calm, not empty."],
            [Languages, "Language is access", "Hindi and voice turned a power-user tool into one any seller can use."],
          ].map(([Icon, t, d], i) => (
            <div key={t} style={{ "--r": `${[-2, 1.5, -1, 2][i]}deg` }}>
              <span className="ic"><Icon size={22} strokeWidth={1.75} /></span>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="road" data-reveal>
        {[
          ["Now", "Put the prototype in front of sellers who run 2+ shops", "users"],
          ["Next", "Measure if one small win, a restock alert, unlocks more trust", "trust"],
          ["Later", "Recover real money: fee checks on live settlement files", "money"],
        ].map(([k, d], i) => (
          <div key={k} className="road__stop">
            <span className="road__dot">{i + 1}</span>
            <p className="cs-mono">{k}</p>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

function Footer() {
  const [state, setState] = useState("pending"); // pending | yes | no
  return (
    <footer className={`end ${state}`}>
      <div className="end__panel">
        <p className="end__k">
          <CoMark state={state === "yes" ? "done" : "needsYou"} size={22} />
          {state === "yes" ? "Approved" : state === "no" ? "Not now" : "Needs your call"}
        </p>
        <h2>
          {state === "yes" ? "Great. Let's talk." : state === "no" ? "Fair. There's more work to see." : <>Hire Suhani as your next product designer?</>}
        </h2>
        <div className="end__btns">
          {state === "pending" && (
            <>
              <button type="button" className="yes" onClick={() => setState("yes")}><Check size={18} strokeWidth={2.5} /> Approve</button>
              <button type="button" className="no" onClick={() => setState("no")}>Not now</button>
            </>
          )}
          {state === "yes" && (
            <>
              <a href="/#contact" className="yes"><Mail size={18} strokeWidth={2} /> Get in touch</a>
              <a href="/#projects" className="no">More work <ArrowRight size={16} /></a>
            </>
          )}
          {state === "no" && (
            <>
              <a href="/#projects" className="yes">More work <ArrowRight size={16} /></a>
              <button type="button" className="no" onClick={() => setState("pending")}><Undo2 size={16} /> Undo</button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
