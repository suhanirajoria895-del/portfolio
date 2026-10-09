import { useMemo, useState } from "react";
import { CoMark } from "./CoMark.jsx";
import { useActiveId, useRevealAll } from "./hooks.js";

const A = "/work/cosell/"; // asset base
const DEMO = "/work/cosell/demo/index.html#/";

const SECTIONS = [
  ["problem", "Problem"],
  ["research", "Research"],
  ["analysis", "Analysis"],
  ["define", "Define"],
  ["flows", "Flows"],
  ["wireframes", "Wireframes"],
  ["tradeoffs", "Trade-offs"],
  ["solution", "Solution"],
  ["system", "Design system"],
  ["iterations", "Iterations"],
  ["reflection", "Reflection"],
];

export default function CaseStudy() {
  useRevealAll();
  const ids = useMemo(() => SECTIONS.map(([id]) => id), []);
  const active = useActiveId(ids);

  return (
    <div className="cs-shell">
      <Sidebar active={active} />
      <Chips active={active} />
      <main className="cs">
        <Header />
        <Problem />
        <Research />
        <Analysis />
        <Define />
        <Flows />
        <Wireframes />
        <Tradeoffs />
        <Solution />
        <DesignSystem />
        <Iterations />
        <Reflection />
        <Footer />
      </main>
    </div>
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
      <a href={DEMO} target="_blank" rel="noreferrer" className="cs-side__cta">
        Open prototype <span aria-hidden="true">↗</span>
      </a>
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

/* ───────────────────────── header ───────────────────────── */

function Header() {
  return (
    <header className="cs-head" data-reveal>
      <p className="cs-mono">Case study 01 · Product design · Concept</p>
      <h1>
        CoSell: an AI copilot for small sellers that <em>asks before it acts</em>
      </h1>
      <p className="cs-lede">
        Indian sellers who list on Amazon, Flipkart and Meesho run three dashboards by hand. I designed an agent that
        watches all three and brings the seller only the decisions that need them.
      </p>
      <ul className="cs-tags">
        {["AI agent UX", "B2B SaaS", "Desktop + mobile", "English + Hindi"].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <dl className="cs-meta">
        <div>
          <dt>Role</dt>
          <dd>Solo designer: research, strategy, UX, UI, design system</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>Self-initiated concept</dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>Desktop web app and mobile companion</dd>
        </div>
        <div>
          <dt>Output</dt>
          <dd>11 screens, a design system, a clickable prototype</dd>
        </div>
      </dl>
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
      title="Three marketplaces means running three businesses."
      lede="Every channel has its own dashboard, label format, return process and fee structure. A solo seller spends the day switching portals, and small errors leak money nobody notices."
    >
      <ol className="cs-chain" data-reveal>
        {[
          ["Constraint", "Three rule books", "Different labels, return windows and fee slabs on every marketplace."],
          ["Gap", "Nobody watches all three", "The seller checks each panel by hand, usually once a day."],
          ["Consequence", "Money leaks quietly", "Wrong fees and missed claims surface after the window closes."],
        ].map(([k, t, d], i) => (
          <li key={k} className={i === 2 ? "bad" : ""}>
            <p className="cs-mono">{k}</p>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
      <Statement />
    </Sec>
  );
}

const LINES = [
  { label: "12 × Cotton kurti set", amt: 14800 },
  { label: "Commission (15%)", amt: -2220, flag: "Kurtis are in the 5% slab. Overcharged ₹1,480." },
  { label: "Shipping fee", amt: -540 },
  { label: "RTO charge, order MS-88217", amt: -410, flag: "This order was delivered, not returned. ₹410." },
  { label: "TCS and TDS", amt: -296 },
];
const inr = (n) => `${n < 0 ? "−" : ""}₹${Math.abs(n).toLocaleString("en-IN")}`;

function Statement() {
  const [scan, setScan] = useState(false);
  const total = LINES.reduce((s, l) => s + l.amt, 0);
  return (
    <div className="cs-leak" data-reveal>
      <div className={`cs-settle ${scan ? "is-scanned" : ""}`}>
        <div className="cs-settle__head">
          <p>Flipkart settlement</p>
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
      <div>
        <p className="cs-big">1 to 3%</p>
        <p className="cs-body">
          of gross sales can leak through wrong commissions, wrong RTO charges and returns that never get restocked.
          Claims usually close in about 30 days.{" "}
          <a href="https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/" target="_blank" rel="noreferrer">
            Mynd Solution
          </a>
        </p>
        <button type="button" className="cs-btn" onClick={() => setScan((s) => !s)} aria-pressed={scan}>
          {scan ? "Hide the check" : "Check this statement"}
        </button>
        <p className={`cs-found ${scan ? "on" : ""}`} aria-live="polite">
          {scan ? "₹1,890 found on one statement, 16.7% of this payout." : "Most sellers never open this screen."}
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── 02 research ───────────────────────── */

const JOURNEY = [
  ["7:30", "Check 3 dashboards", 1, "35 min of tab switching"],
  ["9:00", "Update stock ×3", -1, "Oversold a dupatta last week"],
  ["11:00", "Pack orders", 1, ""],
  ["15:00", "Answer returns", -2, "Missed a 2-day reply window"],
  ["18:00", "Match prices", -1, "Guessing prices"],
  ["22:00", "Reconcile payouts", -3, "Can't tell which fee is wrong"],
];

function Research() {
  return (
    <Sec
      id="research"
      n="02"
      kicker="Research"
      title="Sellers don't need more data. They need to know what to fix today."
      lede="I studied seller guides, reconciliation write-ups, logistics reports and marketplace forums to map where time and money go."
    >
      <ol className="cs-process" data-reveal>
        {[
          ["Understand", "Desk research, forum threads, fee docs"],
          ["Map", "A day in the life, pain points, ecosystem"],
          ["Define", "Insights, HMW, principles"],
          ["Shape", "Flows, wireframes, system, prototype"],
          ["Refine", "Three rounds of critique"],
        ].map(([t, d], i) => (
          <li key={t}>
            <span className="cs-mono">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Journey map</span> A seller's day today, with how each task feels
        </figcaption>
        <Journey />
      </figure>

      <div className="cs-insights" data-reveal>
        {[
          ["The cost is attention, not tools.", "Sellers already have dashboards. What they lack is time to watch all of them."],
          ["Small errors compound silently.", "A 1 to 3% leak is invisible each day and large over a year."],
          ["Timing is everything.", "Claim windows and sale spikes punish anyone who checks late."],
          ["Trust blocks automation.", "Handing pricing to software feels risky when margins are thin."],
        ].map(([t, d], i) => (
          <article key={t}>
            <span className="cs-mono">Insight 0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>

      <details className="cs-more" data-reveal>
        <summary>Sources behind the insights</summary>
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

function Journey() {
  const W = 840;
  const H = 230;
  const x = (i) => 70 + i * ((W - 140) / (JOURNEY.length - 1));
  const y = (v) => 110 - v * 24;
  const path = JOURNEY.map(([, , v], i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <div className="cs-scroll">
      <svg viewBox={`0 0 ${W} ${H + 70}`} className="cs-journey" role="img" aria-label="Journey map: the day gets worse from morning to night, lowest at reconciling payouts">
        <line x1="40" x2={W - 40} y1={y(0)} y2={y(0)} className="axis" />
        <text x="40" y={y(0) - 8} className="lab">neutral</text>
        <path d={path} className="curve" />
        {JOURNEY.map(([t, task, v, pain], i) => (
          <g key={t}>
            <circle cx={x(i)} cy={y(v)} r="6" className={v < 0 ? "pt bad" : "pt"} />
            {pain && (
              <text x={x(i)} y={y(v) + (v < 0 ? 24 : -14)} textAnchor={i === JOURNEY.length - 1 ? "end" : i === 0 ? "start" : "middle"} className="pain">
                {pain}
              </text>
            )}
            <text x={x(i)} y={H + 22} textAnchor="middle" className="time">{t}</text>
            <text x={x(i)} y={H + 44} textAnchor="middle" className="task">{task}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ───────────────────────── 03 analysis ───────────────────────── */

const TOOLS = ["Inventory sync", "Seller apps", "Spreadsheets", "CoSell"];
const CAPS = [
  ["One stock count", [1, 0, 0.5, 1]],
  ["Spots fee and return errors", [0, 0, 0.5, 1]],
  ["Explains why", [0, 0, 0, 1]],
  ["Acts, with permission", [0, 0, 0, 1]],
  ["Hindi and voice", [0, 0.5, 0, 1]],
];

function Analysis() {
  return (
    <Sec id="analysis" n="03" kicker="Analysis" title="One person sits in the middle of six systems.">
      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Ecosystem map</span> Everything the seller reconciles by hand
        </figcaption>
        <Ecosystem />
      </figure>

      <article className="cs-persona" data-reveal>
        <div className="cs-persona__id">
          <img
            src="https://images.unsplash.com/photo-1723041885055-3e35ae8dd980?w=240&h=240&fit=crop&crop=focalpoint&fp-x=0.53&fp-y=0.42&fp-z=2.2&auto=format&q=70"
            alt=""
            width="88"
            height="88"
            loading="lazy"
          />
          <div>
            <h3>Meera, 34</h3>
            <p>Meera Handloom, Jaipur</p>
            <p className="cs-mono">Archetype, built from research</p>
          </div>
        </div>
        <dl>
          <div>
            <dt>About</dt>
            <dd>Sells cotton kurti sets and home goods on three marketplaces with one helper.</dd>
          </div>
          <div>
            <dt>Goals</dt>
            <dd>Grow sales without hiring. Get home before nine.</dd>
          </div>
          <div>
            <dt>Frustrations</dt>
            <dd>Stockouts she hears about from cancellations. Fees she can't check.</dd>
          </div>
          <div>
            <dt>Needs</dt>
            <dd>One place to look, a short list of what to fix, in Hindi when tired.</dd>
          </div>
        </dl>
        <blockquote>"I don't need more data. I need someone to tell me what to fix today."</blockquote>
      </article>

      <div className="cs-matrix-wrap" data-reveal>
        <h3 className="cs-h3">Existing tools sync stock. None of them decide.</h3>
        <div className="cs-scroll">
          <table className="cs-matrix">
            <thead>
              <tr>
                <th />
                {TOOLS.map((t) => (
                  <th key={t} className={t === "CoSell" ? "us" : ""}>{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAPS.map(([cap, vals]) => (
                <tr key={cap}>
                  <th scope="row">{cap}</th>
                  {vals.map((v, i) => (
                    <td key={i} className={TOOLS[i] === "CoSell" ? "us" : ""}>
                      <span className={v === 1 ? "yes" : v ? "part" : "no"}>{v === 1 ? "✓" : v ? "Partly" : "✕"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cs-note">Compared by tool category, not specific vendors. "Partly" means it needs manual work.</p>
      </div>
    </Sec>
  );
}

function Ecosystem() {
  const nodes = [
    [120, 60, "Amazon", "Seller Central"],
    [120, 170, "Flipkart", "Seller Hub"],
    [120, 280, "Meesho", "Supplier panel"],
    [720, 60, "Couriers", "Pickups, RTO"],
    [720, 170, "Buyers", "Returns, reviews"],
    [720, 280, "Excel", "Payout checks"],
  ];
  return (
    <div className="cs-scroll">
      <svg viewBox="0 0 840 340" className="cs-eco" role="img" aria-label="Meera in the centre, connected to Amazon, Flipkart, Meesho, couriers, buyers and an Excel sheet">
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
        <text x="420" y="300" textAnchor="middle" className="s">6 systems · 0 shared views</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── 04 define ───────────────────────── */

function Define() {
  return (
    <Sec id="define" n="04" kicker="Define" title="Turning the research into a brief.">
      <blockquote className="cs-hmw" data-reveal>
        <span className="cs-mono">How might we</span>
        let a solo seller hand repetitive marketplace work to an AI agent, <em>without losing control of their margins or their brand?</em>
      </blockquote>
      <ol className="cs-principles" data-reveal>
        {[
          ["Ask before acting.", "Nothing changes without approval, unless the seller has set a rule that allows it."],
          ["Show the why.", "Every proposal carries its evidence, expected impact and how sure Co is."],
          ["Everything is reversible.", "Undo is one tap away, and every action is logged."],
          ["Calm by default.", "One place to look, sorted by what needs the seller now."],
        ].map(([t, d], i) => (
          <li key={t}>
            <span className="cs-mono">P{i + 1}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Sec>
  );
}

/* ───────────────────────── 05 flows ───────────────────────── */

function Flows() {
  return (
    <Sec
      id="flows"
      n="05"
      kicker="Flows"
      title="Co surfaces. Meera decides."
      lede="Before any screen, I split the work between the agent and the person, then drew the one loop every feature runs through."
    >
      <div className="cs-roles" data-reveal>
        <div>
          <p className="who">
            <CoMark state="thinking" size={22} /> Co surfaces
          </p>
          <ul>
            <li>Watches listings, orders and payouts, all night</li>
            <li>Predicts stockouts before a sale spike</li>
            <li>Drafts price changes and return replies, with evidence</li>
            <li>Flags wrong fees before the claim window closes</li>
          </ul>
        </div>
        <div>
          <p className="who">Meera decides</p>
          <ul>
            <li>Approves, edits or rejects every proposal</li>
            <li>Sets limits Co can never cross</li>
            <li>Chooses how much freedom each task gets</li>
            <li>Can undo anything, any time</li>
          </ul>
        </div>
      </div>

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Core loop</span> How every proposal moves from signal to action
        </figcaption>
        <Loop />
      </figure>

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Information architecture</span> Organised around Meera's day, not the marketplaces' menus
        </figcaption>
        <div className="cs-ia">
          <div className="cs-ia__root">CoSell</div>
          <div className="cs-ia__cols">
            {[
              ["Home", ["Today's numbers", "Approval queue", "Co's overnight log"]],
              ["Approvals", ["Proposal detail", "Why + evidence", "Guardrails"]],
              ["Inventory", ["One stock count", "Mismatch fixes", "Restock"]],
              ["Returns & payouts", ["Drafted replies", "Fee checks"]],
              ["Co settings", ["Autonomy per task", "Limits", "Never-discount list"]],
              ["Mobile", ["Morning stack", "Lock-screen approve", "Voice, Hindi", "Evening brief"]],
            ].map(([t, items]) => (
              <div key={t}>
                <p>{t}</p>
                <ul>
                  {items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </figure>
    </Sec>
  );
}

function Loop() {
  return (
    <div className="cs-scroll">
      <svg viewBox="0 0 900 300" className="cs-flow" role="img" aria-label="Flowchart: Co detects a signal, checks guardrails. If within auto limits it acts and shows undo. Otherwise it queues a proposal; Meera approves, edits or rejects; rejections feed back to Co.">
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="head" />
          </marker>
        </defs>
        {[
          [20, 120, "Signal", "price drop, low stock"],
          [190, 120, "Guardrails", "floor, margin, % cap"],
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
        <text x="445" y="146" textAnchor="middle" className="t">Auto</text>
        <text x="445" y="162" textAnchor="middle" className="s">allowed?</text>
        <path d="M445,105 V50 H560" className="ln" markerEnd="url(#ar)" />
        <text x="455" y="80" className="s">yes</text>
        <path d="M445,195 V250 H560" className="ln" markerEnd="url(#ar)" />
        <text x="455" y="230" className="s">no</text>
        <rect x="565" y="20" width="160" height="60" rx="10" className="box ok" />
        <text x="645" y="47" textAnchor="middle" className="t">Act + log</text>
        <text x="645" y="65" textAnchor="middle" className="s">undo for 24h</text>
        <rect x="565" y="220" width="160" height="60" rx="10" className="box me" />
        <text x="645" y="247" textAnchor="middle" className="t">Meera reviews</text>
        <text x="645" y="265" textAnchor="middle" className="s">approve · edit · reject</text>
        <path d="M725,250 H790 V80" className="ln" markerEnd="url(#ar)" />
        <text x="800" y="170" className="s">approve / edit</text>
        <path d="M645,280 V295 H90 V185" className="ln dash" markerEnd="url(#ar)" />
        <text x="300" y="290" className="s">reject: reason teaches Co</text>
        <rect x="740" y="20" width="140" height="60" rx="10" className="box ok" />
        <path d="M725,50 H735" className="ln" />
        <text x="810" y="47" textAnchor="middle" className="t">Marketplace</text>
        <text x="810" y="65" textAnchor="middle" className="s">updated</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── 06 wireframes ───────────────────────── */

function Wire({ lines = 3 }) {
  return Array.from({ length: lines }, (_, i) => <i key={i} className="wl" style={{ width: `${90 - i * 18}%` }} />);
}

function Wireframes() {
  return (
    <Sec
      id="wireframes"
      n="06"
      kicker="Wireframes"
      title="Low fidelity first, to argue about structure, not colour."
      lede="I sketched two home layouts and tested them against one question: what does Meera do in her first ten seconds?"
    >
      <div className="cs-wires" data-reveal>
        <figure className="cs-wire">
          <div className="wf">
            <div className="wf-side" />
            <div className="wf-main">
              <div className="wf-row">
                <b className="wf-box" />
                <b className="wf-box" />
                <b className="wf-box" />
                <b className="wf-box" />
              </div>
              <div className="wf-chart" />
              <div className="wf-list">
                <Wire lines={4} />
              </div>
            </div>
          </div>
          <figcaption>
            <span className="tag no">Option A</span> Analytics dashboard: charts first, alerts in a bell. Familiar, but
            decisions hide below the fold.
          </figcaption>
        </figure>
        <figure className="cs-wire picked">
          <div className="wf">
            <div className="wf-side" />
            <div className="wf-main">
              <i className="wl h" />
              <div className="wf-row">
                <b className="wf-box" />
                <b className="wf-box" />
                <b className="wf-box" />
              </div>
              <div className="wf-queue">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <span className="sq" />
                    <Wire lines={1} />
                    <span className="btn" />
                  </div>
                ))}
              </div>
            </div>
            <div className="wf-rail">
              <Wire lines={5} />
            </div>
          </div>
          <figcaption>
            <span className="tag yes">Option B, chosen</span> Queue first: three numbers, then what needs approval, with
            Co's log on the side.
          </figcaption>
        </figure>
      </div>

      <div className="cs-wires three" data-reveal>
        <figure className="cs-wire">
          <div className="wf tall">
            <div className="wf-main">
              <i className="wl h" />
              <div className="wf-split">
                <div className="wf-card">
                  <span className="sq" /> <i className="wl big" />
                </div>
                <div className="wf-card">
                  <Wire lines={3} />
                </div>
              </div>
              <div className="wf-split">
                <div className="wf-card">
                  <Wire lines={3} />
                </div>
                <div className="wf-card">
                  <span className="btn dark" /> <span className="btn" />
                </div>
              </div>
            </div>
          </div>
          <figcaption>Approval detail: change, guardrails, why, decide.</figcaption>
        </figure>
        <figure className="cs-wire">
          <div className="wf phone">
            <i className="wl h" />
            <div className="wf-stack">
              <div />
              <div />
              <div className="top">
                <span className="sq big" />
                <Wire lines={2} />
              </div>
            </div>
            <div className="wf-swipe">
              <span>← Reject</span>
              <span>Approve →</span>
            </div>
          </div>
          <figcaption>Mobile morning: a swipe stack of decisions.</figcaption>
        </figure>
        <figure className="cs-wire">
          <div className="wf tall">
            <div className="wf-main">
              <i className="wl h" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="wf-seg">
                  <Wire lines={1} />
                  <span className="seg">
                    <b className={i === 1 ? "on" : ""} />
                    <b className={i === 0 ? "on" : ""} />
                    <b className={i > 1 ? "on" : ""} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <figcaption>Settings: freedom per task, not one switch.</figcaption>
        </figure>
      </div>
    </Sec>
  );
}

/* ───────────────────────── 07 trade-offs ───────────────────────── */

const TRADEOFFS = [
  ["Home screen", "Approval queue as home", "A rich analytics dashboard", "Decisions are the job. Charts can wait a click."],
  ["Confidence", "High / Medium / Low, with reasons", "A precise score like 87%", "A number invites false precision. Evidence lets her judge."],
  ["Autonomy", "Three levels, set per task", "One global AI on/off switch", "Sellers trust restock alerts long before automatic repricing."],
  ["Safety", "Undo toast + activity log", "\"Are you sure?\" before every approval", "Cheap yeses build trust. Dialogs only add friction."],
  ["Language", "Full Hindi toggle + voice", "English only, faster to ship", "Tired at 10 PM, many sellers think in Hindi."],
];

function Tradeoffs() {
  return (
    <Sec id="tradeoffs" n="07" kicker="Trade-offs" title="Every choice cost something. Here's what I gave up.">
      <div className="cs-trade" data-reveal>
        <div className="cs-trade__row head" aria-hidden="true">
          <span>Decision</span>
          <span>Chose</span>
          <span>Gave up</span>
          <span>Why</span>
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
      <UndoDemo />
    </Sec>
  );
}

function UndoDemo() {
  const [state, setState] = useState("idle");
  return (
    <div className="cs-undo" data-reveal>
      <p className="cs-mono">Try the trade-off</p>
      <div className="cs-undo__card">
        <span>Lower Copper bottle to ₹849 on Flipkart</span>
        <button type="button" className="cs-btn" disabled={state === "approved"} onClick={() => setState("approved")}>
          {state === "approved" ? "Approved" : "Approve"}
        </button>
      </div>
      <div className={`cs-toast ${state === "approved" ? "on" : ""}`} role="status">
        <CoMark state="done" size={20} /> Approved. Co is on it.
        <button type="button" onClick={() => setState("undone")}>
          Undo
        </button>
      </div>
      {state === "undone" && (
        <p className="cs-note">
          Undone. Nothing changed on Flipkart.{" "}
          <button type="button" className="cs-link" onClick={() => setState("idle")}>
            Replay
          </button>
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── 08 solution ───────────────────────── */

const FEATURES = [
  {
    n: "F1",
    t: "A home that's a to-do list",
    d: "Today's numbers, then only what needs a yes, sorted by urgency. Co's overnight work sits quietly on the side.",
    shot: "home",
    pop: "queue",
    side: "r",
  },
  {
    n: "F2",
    t: "Every proposal shows its homework",
    d: "The change, the margin after it, three guardrails checked and the competitor trend. Approve, edit or reject in one place.",
    shot: "approval",
    pop: "guardrails",
    side: "l",
  },
  {
    n: "F3",
    t: "Freedom is set per task",
    d: "Suggest only, ask me first, or act within limits, for repricing, restock, returns and ads separately.",
    shot: "settings",
    pop: "autonomy",
    side: "r",
  },
  {
    n: "F4",
    t: "One stock count across three shops",
    d: "Mismatches glow red with a one-click fix, before a marketplace oversells.",
    shot: "inventory",
    pop: "stock",
    side: "l",
  },
];

function Solution() {
  return (
    <Sec
      id="solution"
      n="08"
      kicker="Solution"
      title="Co watches everything, and brings Meera only what needs her."
    >
      <div className="cs-features">
        {FEATURES.map((f) => (
          <article key={f.n} className={`cs-feat ${f.side}`} data-reveal>
            <div className="cs-feat__copy">
              <span className="cs-mono">{f.n}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
            <div className="cs-feat__art">
              <img className="base" src={`${A}${f.shot}.webp`} alt="" loading="lazy" width="2880" height="1800" />
              <img className="pop" src={`${A}pop/${f.pop}.webp`} alt={f.t} loading="lazy" />
            </div>
          </article>
        ))}
      </div>

      <div className="cs-phones" data-reveal>
        <div className="cs-phones__copy">
          <span className="cs-mono">F5</span>
          <h3>A phone companion for decisions between packing orders</h3>
          <p>Approve from the lock screen, ask Co in Hindi by voice, and end the day with a brief of what went right.</p>
        </div>
        <div className="cs-phones__stage">
          {[
            ["m-lock", "Lock screen approval"],
            ["m-morning", "Morning swipe stack"],
            ["m-voice", "Ask Co in Hindi"],
          ].map(([img, alt], i) => (
            <img key={img} src={`${A}${img}.webp`} alt={alt} width="556" height="1174" loading="lazy" style={{ "--i": i }} />
          ))}
        </div>
      </div>

      <a className="cs-proto" href={DEMO} target="_blank" rel="noreferrer" data-reveal>
        <span>
          <strong>Click through the prototype.</strong> Approve a price, fix a stock mismatch, switch to Hindi.
        </span>
        <span aria-hidden="true">↗</span>
      </a>
    </Sec>
  );
}

/* ───────────────────────── 09 design system ───────────────────────── */

const RAMPS = [
  ["Periwinkle", "Brand, primary", ["#F4F3FF", "#EEECFF", "#C9C2FF", "#9B8FFF", "#6B5CFF", "#5543E8", "#3A2DB0"]],
  ["Navy", "Text, buttons", ["#F2F3F8", "#E2E4EE", "#A9ADBF", "#676C88", "#3B3F5C", "#23253F", "#14142B"]],
  ["Pink", "Co's second circle", ["#FFF2F6", "#FFDCE7", "#FFB8CE", "#FF8FB1", "#F2668F", "#C94570", "#8F2A4C"]],
];
const STEPS = ["50", "100", "200", "400", "500", "600", "800"];
const STATUS = [
  ["Success", "#2FB67C", "High confidence"],
  ["Warning", "#F5A524", "Medium, low stock"],
  ["Danger", "#EF5B6B", "Low, mismatch"],
  ["Needs you", "#F07A5A", "Co's alert dot"],
];
const MARKS = [
  ["idle", "Idle"],
  ["thinking", "Thinking"],
  ["needsYou", "Needs you"],
  ["done", "Done"],
  ["paused", "Paused"],
];

function DesignSystem() {
  const [mode, setMode] = useState("ask");
  return (
    <Sec
      id="system"
      n="09"
      kicker="Design system"
      title="A calm system, so money and decisions stand out."
      lede="Flat colour, generous space, one primary action per card. Colour only ever means status. Every token lives in one file."
    >
      <div className="ds-block" data-reveal>
        <h3 className="ds-h">Typefaces</h3>
        <div className="ds-type">
          <article>
            <p className="aa" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Aa</p>
            <h4>Plus Jakarta Sans</h4>
            <dl>
              <div><dt>Role</dt><dd>UI, headings, numbers</dd></div>
              <div><dt>Weights</dt><dd>400, 500, 700</dd></div>
              <div><dt>Scale</dt><dd>32 / 24 / 18 / 14 / 13</dd></div>
              <div><dt>Numbers</dt><dd>Tabular for all money</dd></div>
            </dl>
          </article>
          <article>
            <p className="aa" lang="hi" style={{ fontFamily: "Mukta, sans-serif" }}>अआ</p>
            <h4>Mukta</h4>
            <dl>
              <div><dt>Role</dt><dd>Devanagari fallback</dd></div>
              <div><dt>Weights</dt><dd>400, 600</dd></div>
              <div><dt>Scale</dt><dd>Matches Jakarta, +1px</dd></div>
              <div><dt>Why</dt><dd>Same x-height feel</dd></div>
            </dl>
          </article>
          <ul className="ds-scale" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <li style={{ fontSize: 30, fontWeight: 700 }}>Good morning, Meera<span>Display 32</span></li>
            <li style={{ fontSize: 22, fontWeight: 700 }}>₹48,250 today<span>Title 24</span></li>
            <li style={{ fontSize: 17, fontWeight: 700 }}>Needs your approval<span>Heading 18</span></li>
            <li style={{ fontSize: 14 }}>Nothing changes until you say yes.<span>Body 14</span></li>
            <li style={{ fontSize: 13, color: "#676C88" }}>Oldest one is 2 days old<span>Label 13</span></li>
          </ul>
        </div>
      </div>

      <div className="ds-block" data-reveal>
        <h3 className="ds-h">Colour</h3>
        {RAMPS.map(([name, role, hexes]) => (
          <div key={name} className="ds-ramp">
            <p>
              <strong>{name}</strong> {role}
            </p>
            <div>
              {hexes.map((h, i) => (
                <span key={h} style={{ background: h, color: i > 3 ? "#fff" : "#14142B" }}>
                  <b>{STEPS[i]}</b>
                  {h}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="ds-status">
          {STATUS.map(([n, h, u]) => (
            <div key={n}>
              <i style={{ background: h }} />
              <p>
                <strong>{n}</strong> {h}
                <br />
                <span>{u}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-block" data-reveal>
        <h3 className="ds-h">Co, the mark</h3>
        <div className="ds-marks">
          {MARKS.map(([s, l]) => (
            <div key={s}>
              <CoMark state={s} size={56} />
              <p>{l}</p>
            </div>
          ))}
        </div>
        <p className="cs-note">Two flat circles: the seller and Co. Shape carries the state, so it reads at 16px and without motion.</p>
      </div>

      <div className="ds-block" data-reveal>
        <h3 className="ds-h">Buttons</h3>
        <div className="cs-scroll">
          <table className="ds-matrix">
            <thead>
              <tr>
                <th />
                {["Default", "Hover", "Pressed", "Disabled"].map((s) => (
                  <th key={s}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Primary", "p"],
                ["Secondary", "s"],
                ["Destructive", "d"],
              ].map(([n, k]) => (
                <tr key={k}>
                  <th scope="row">{n}</th>
                  {["", "hover", "press", "off"].map((st) => (
                    <td key={st}>
                      <span className={`b b--${k} ${st}`}>{k === "p" ? "Approve" : k === "s" ? "Edit price" : "Reject"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ds-grid" data-reveal>
        <div className="ds-block">
          <h3 className="ds-h">Chips</h3>
          <div className="ds-row">
            <span className="chip">Amazon</span>
            <span className="chip">Flipkart</span>
            <span className="chip">Meesho</span>
          </div>
          <div className="ds-row">
            <span className="conf h">● High</span>
            <span className="conf m">● Medium</span>
            <span className="conf l">● Low</span>
          </div>
          <p className="cs-note">Marketplaces are plain grey labels. Only status gets colour.</p>
        </div>
        <div className="ds-block">
          <h3 className="ds-h">Autonomy control</h3>
          <div className="seg" role="radiogroup" aria-label="Autonomy example">
            {[
              ["suggest", "Suggest only"],
              ["ask", "Ask me first"],
              ["auto", "Auto within limits"],
            ].map(([v, l]) => (
              <button key={v} type="button" role="radio" aria-checked={mode === v} onClick={() => setMode(v)}>
                {l}
              </button>
            ))}
          </div>
          <p className="cs-note">The most-used control in the product. Try it.</p>
        </div>
        <div className="ds-block">
          <h3 className="ds-h">Navigation</h3>
          <div className="ds-nav">
            {["Default", "Hover", "Active", "Badge"].map((s) => (
              <div key={s}>
                <span className={`ni ${s.toLowerCase()}`}>
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                  {s === "Badge" && <b>3</b>}
                </span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-block">
          <h3 className="ds-h">Shape and space</h3>
          <ul className="ds-tokens">
            <li><span>Radius</span> pill · 24 cards · 32 frame</li>
            <li><span>Gaps</span> 24 to 32px</li>
            <li><span>Rows</span> 56px tables</li>
            <li><span>Targets</span> 48px minimum</li>
            <li><span>Contrast</span> WCAG AA on all text</li>
          </ul>
        </div>
      </div>
    </Sec>
  );
}

/* ───────────────────────── 10 iterations ───────────────────────── */

function Iterations() {
  const [split, setSplit] = useState(50);
  return (
    <Sec id="iterations" n="10" kicker="Iterations" title="The first version worked. It just didn't feel like anything.">
      <div className="cs-evo" data-reveal>
        <div className="cs-compare" style={{ "--split": `${split}%` }}>
          <img src={`${A}cmp-round1.webp`} alt="Round 1: plain white cards on a flat background" className="before" />
          <img src={`${A}cmp-final.webp`} alt="Final: glass morning and a ticket-stack evening" className="after" />
          <span className="line" aria-hidden="true" />
          <input type="range" min="0" max="100" value={split} onChange={(e) => setSplit(Number(e.target.value))} aria-label="Compare round 1 and final" />
          <span className="tag l">Round 1</span>
          <span className="tag r">Final</span>
        </div>
        <ol className="cs-rounds">
          <li>
            <span className="cs-mono">R1</span>
            <h3>Correct, but generic.</h3>
            <p>Every element was a white card. Nothing showed money.</p>
          </li>
          <li>
            <span className="cs-mono">R2</span>
            <h3>Money first.</h3>
            <p>Product photos lead each card. The headline became "+₹7,641 extra sales a week".</p>
          </li>
          <li>
            <span className="cs-mono">R3</span>
            <h3>One day, five screens.</h3>
            <p>A glass morning, a lock-screen decision, Hindi voice and an evening brief. A glowing AI orb became two flat circles.</p>
          </li>
        </ol>
      </div>
    </Sec>
  );
}

/* ───────────────────────── 11 reflection ───────────────────────── */

function Reflection() {
  return (
    <Sec id="reflection" n="11" kicker="Reflection" title="The real test is whether sellers say yes to Co.">
      <div className="cs-reflect" data-reveal>
        <div>
          <h3>What I'd measure</h3>
          <ul>
            <li>Time spent across dashboards, before and after</li>
            <li>Approval rate of proposals, by confidence level</li>
            <li>Undo rate: high means Co is wrong, zero may mean nobody checks</li>
          </ul>
        </div>
        <div>
          <h3>What I'd do differently</h3>
          <ul>
            <li>Start with seller interviews, not only desk research</li>
            <li>Have a native speaker review every Hindi string</li>
            <li>Design the "Co was wrong" flow before the happy path</li>
          </ul>
        </div>
        <div>
          <h3>Next</h3>
          <ul>
            <li>Test the approval card with 3 to 5 real sellers</li>
            <li>Check whether a low-risk first win really earns trust</li>
          </ul>
        </div>
      </div>
    </Sec>
  );
}

function Footer() {
  return (
    <footer className="cs-foot">
      <p>Want the full walkthrough? I'm happy to talk through the decisions and what I'd test first.</p>
      <div>
        <a href="/#contact" className="cs-btn">Get in touch</a>
        <a href="/#projects" className="cs-link">Back to all work</a>
      </div>
    </footer>
  );
}
