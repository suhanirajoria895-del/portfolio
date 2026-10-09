import { useMemo, useState } from "react";
import { CoMark } from "./CoMark.jsx";
import { useActiveId, useRevealAll } from "./hooks.js";

const A = "/work/cosell/"; // asset base
const DEMO = "/work/cosell/demo/index.html#/";
const FIGJAM = "https://www.figma.com/board/thUniTYGliBINd10bU6FLS";
const MEERA =
  "https://images.unsplash.com/photo-1723041885055-3e35ae8dd980?w=360&h=360&fit=crop&crop=focalpoint&fp-x=0.53&fp-y=0.42&fp-z=2.2&auto=format&q=70";

const SECTIONS = [
  ["problem", "Problem"],
  ["research", "Research"],
  ["analysis", "Analysis"],
  ["synthesis", "Synthesis"],
  ["solution", "Solution"],
  ["design", "Design"],
]

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
        <Sec
          id="synthesis"
          n="04"
          kicker="Synthesis"
          title="From what I found to what I'd build."
          lede="The brief, the rules Co plays by, the loop every feature runs through, and the trade-offs I made along the way."
        >
          <Define />
          <Flows />
          <Tradeoffs />
        </Sec>
        <Solution />
        <Sec
          id="design"
          n="06"
          kicker="Design"
          title="How it got from grey boxes to the final screens."
          lede="Wireframes first, then the system that holds every screen together, then three rounds of making it feel like something."
        >
          <Wireframes />
          <DesignSystem />
          <Iterations />
        </Sec>
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
        Open the prototype <span aria-hidden="true">↗</span>
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

function Part({ kicker, title, children, lede }) {
  return (
    <div className="cs-part">
      <header className="cs-part__head" data-reveal>
        <p className="cs-mono">{kicker}</p>
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
        <h1>
          Meera sells kurtis on three marketplaces. Her <mark>real job</mark> is watching three dashboards.
        </h1>
        <p className="cs-lede">
          CoSell is my attempt to give that job away. It's a copilot called Co that keeps an eye on Amazon, Flipkart and
          Meesho at once, catches the mistakes that cost money, and hands Meera a short list of things only she can decide.
        </p>
        <ul className="cs-tags">
          {["AI agent UX", "Seller tools", "Desktop + mobile", "English + Hindi"].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <dl className="cs-meta">
          <div>
            <dt>My role</dt>
            <dd>Everything, solo: research, flows, UI, the design system</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>Personal project, not a client brief</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>Web app for the desk, phone for the in-between moments</dd>
          </div>
        </dl>
      </div>

      <dl className="cs-tldr">
        <div>
          <dt>Problem</dt>
          <dd>Sellers on three marketplaces lose hours to tab switching, and 1 to 3% of sales to errors nobody catches.</dd>
        </div>
        <div>
          <dt>What I made</dt>
          <dd>Co, a copilot that watches all three shops, fixes what it's allowed to, and asks about the rest.</dd>
        </div>
        <div>
          <dt>The hard part</dt>
          <dd>Getting a seller to trust software with her prices. Every decision on this page comes back to that.</dd>
        </div>
      </dl>

      <div className="cs-head__board" aria-hidden="true">
        <Sticky c="y" r={-4}>
          <p className="hand">"Which of these 3 tabs is lying to me today?"</p>
          <span className="hand small">the question I kept coming back to</span>
        </Sticky>
        <Sticky c="p" r={3}>
          <p className="hand big">₹1,890</p>
          <span className="hand small">lost on a single payout statement (see 01)</span>
        </Sticky>
        <Sticky c="b" r={-2}>
          <p className="hand">3 dashboards
            <br />3 rule books
            <br />1 tired person</p>
        </Sticky>
      </div>
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
      title="Selling on three marketplaces is really running three small businesses."
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
      <Statement />
    </Sec>
  );
}

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
  ["7:30", "Check 3 dashboards", 1, "35 min of tab switching"],
  ["9:00", "Update stock ×3", -1, "Oversells a dupatta"],
  ["11:00", "Pack orders", 1, ""],
  ["15:00", "Answer returns", -2, "Misses a 2-day reply window"],
  ["18:00", "Match prices", -1, "Guessing, again"],
  ["22:00", "Reconcile payouts", -3, "Can't tell which fee is wrong"],
];

function Research() {
  return (
    <Sec
      id="research"
      n="02"
      kicker="Research"
      title="I went looking for the moments where time and money slip away."
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

      <figure className="cs-fig cs-fig--board" data-reveal>
        <figcaption>
          <span className="cs-mono">Affinity wall, from my FigJam board</span> Every observation went on a sticky, then into
          four piles. The white note under each pile is what that pile told me.
          <a href={FIGJAM} target="_blank" rel="noreferrer" className="cs-figlink">
            Open the board ↗
          </a>
        </figcaption>
        <a href={FIGJAM} target="_blank" rel="noreferrer" className="cs-board-img">
          <img src={`${A}figjam-wall.webp`} alt="FigJam affinity wall: four clusters of sticky notes about time, silent mistakes, lateness and trust, each ending in an insight" width="2320" height="1230" loading="lazy" />
        </a>
      </figure>

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Journey map</span> One seller's day as it is now, and how each part of it feels
        </figcaption>
        <Journey />
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

function Journey() {
  const W = 840;
  const H = 230;
  const x = (i) => 70 + i * ((W - 140) / (JOURNEY.length - 1));
  const y = (v) => 110 - v * 24;
  const path = JOURNEY.map(([, , v], i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <div className="cs-scroll">
      <svg viewBox={`0 0 ${W} ${H + 70}`} className="cs-journey" role="img" aria-label="Journey map: the day gets worse from morning to night, lowest when reconciling payouts">
        <line x1="40" x2={W - 40} y1={y(0)} y2={y(0)} className="axis" />
        <text x="40" y={y(0) - 8} className="lab">okay</text>
        <path d={path} className="curve" />
        {JOURNEY.map(([t, task, v, pain], i) => (
          <g key={t}>
            <circle cx={x(i)} cy={y(v)} r="6" className={v < 0 ? "pt bad" : "pt"} />
            {pain && (
              <text
                x={x(i)}
                y={y(v) + (v < 0 ? 24 : -14)}
                textAnchor={i === JOURNEY.length - 1 ? "end" : i === 0 ? "start" : "middle"}
                className="pain"
              >
                {pain}
              </text>
            )}
            <text x={x(i)} y={H + 22} textAnchor="middle" className="time">{t}</text>
            <text x={x(i)} y={H + 44} textAnchor="middle" className="task">{task}</text>
          </g>
        ))}
        <text x={x(5) - 20} y={y(-3) + 48} textAnchor="end" className="scrawl">worst part of the day, every day</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── 03 who it's for ───────────────────────── */

const TOOLS = ["Inventory sync", "Seller apps", "Spreadsheets", "CoSell"];
const CAPS = [
  ["One stock count", [1, 0, 0.5, 1]],
  ["Catches fee and return errors", [0, 0, 0.5, 1]],
  ["Explains itself", [0, 0, 0, 1]],
  ["Can act, if you let it", [0, 0, 0, 1]],
  ["Hindi and voice", [0, 0.5, 0, 1]],
];

function Analysis() {
  return (
    <Sec
      id="analysis"
      n="03"
      kicker="Analysis"
      title="One person, stuck in the middle of six systems."
      lede="To keep myself honest I designed for one specific seller. She isn't real, but everything about her comes from the research."
    >
      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Ecosystem map</span> Everything Meera reconciles by hand, with nothing connecting them but her
        </figcaption>
        <Ecosystem />
      </figure>

      <article className="cs-persona" data-reveal>
        <div className="cs-polaroid">
          <span className="tape" aria-hidden="true" />
          <img src={MEERA} alt="" width="180" height="180" loading="lazy" />
          <p className="hand">Meera, 34 · Jaipur</p>
        </div>
        <div className="cs-persona__body">
          <p className="cs-mono">Meera Handloom · an archetype, not an interviewee</p>
          <dl>
            <div>
              <dt>Her day</dt>
              <dd>Sells cotton kurti sets and home goods on three marketplaces, with one helper for packing.</dd>
            </div>
            <div>
              <dt>What she wants</dt>
              <dd>To grow without hiring anyone else, and to stop working at 10 PM.</dd>
            </div>
            <div>
              <dt>What drives her mad</dt>
              <dd>Finding out she's out of stock from a cancelled order. Fees she has no way to check.</dd>
            </div>
            <div>
              <dt>What would help</dt>
              <dd>One place to look, a short list of what to fix, and Hindi when she's tired.</dd>
            </div>
          </dl>
          <Sticky c="y" r={2} className="cs-persona__quote">
            <p className="hand">"I don't need more data. I need someone to tell me what to fix today."</p>
          </Sticky>
        </div>
      </article>

      <div className="cs-matrix-wrap" data-reveal>
        <h3 className="cs-h3">The tools out there sync stock. None of them help her decide anything.</h3>
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
        <p className="cs-note">I compared kinds of tools rather than named products, because I didn't audit specific vendors. "Partly" means it takes manual work.</p>
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
        <text x="420" y="300" textAnchor="middle" className="scrawl">6 systems, 0 of them talk to each other</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── 04 the brief ───────────────────────── */

function Define() {
  return (
    <Part kicker="The brief" title="Squeezing all of that into one question.">
      <blockquote className="cs-hmw" data-reveal>
        <span className="cs-mono">How might we</span>
        let a solo seller hand the repetitive marketplace work to an AI, <em>and still feel like it's her shop?</em>
      </blockquote>
      <div className="cs-rules" data-reveal>
        <p className="hand cs-rules__title">Four rules I pinned above my desk</p>
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
    <Part kicker="Flows" title="Co does the watching. Meera does the deciding." lede="Before drawing a single screen, I wrote down who does what. Then I drew the one loop that every feature goes through.">
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

      <figure className="cs-fig" data-reveal>
        <figcaption>
          <span className="cs-mono">Site map</span> Built around Meera's day, not around the marketplaces' menus
        </figcaption>
        <div className="cs-ia">
          <div className="cs-ia__root">CoSell</div>
          <div className="cs-ia__cols">
            {[
              ["Home", ["Today's numbers", "Things to approve", "What Co did overnight"]],
              ["Approvals", ["The proposal", "Why Co suggests it", "Checks against her limits"]],
              ["Inventory", ["One stock count", "Fix mismatches", "Restock"]],
              ["Returns & payouts", ["Drafted replies", "Fee checks"]],
              ["Co settings", ["Freedom per task", "Limits", "Never-discount list"]],
              ["Phone", ["Morning stack", "Approve from lock screen", "Ask in Hindi", "Evening recap"]],
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

function Wireframes() {
  return (
    <Part kicker="Wireframes" title="Grey boxes first, so the argument stayed about structure." lede="I drew two versions of the home screen and judged them on one thing: what does Meera do in her first ten seconds?">
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
          <p className="hand wf-note n1">charts she'd look at and then… what?</p>
          <p className="hand wf-note n2">the stuff that needs her is down here ↓</p>
          <figcaption>
            <span className="tag no">Option A</span> The classic analytics dashboard. It felt familiar, but every decision
            sat below the fold.
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
          <p className="hand wf-note n3">this IS the job ✓</p>
          <figcaption>
            <span className="tag yes">Option B, picked</span> Three numbers, then the things waiting for a yes, with
            Co's overnight log off to the side.
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
          <figcaption>Approval detail: the change, the checks, the why, then decide.</figcaption>
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
              <span>← No</span>
              <span>Yes →</span>
            </div>
          </div>
          <figcaption>Phone, morning: a stack of decisions to swipe through before chai.</figcaption>
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
          <figcaption>Settings: a freedom level per task, instead of one big switch.</figcaption>
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
    <Part kicker="Trade-offs" title="Every decision cost me something. This is what I gave up.">
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
        <p className="hand cs-killed__title">Ideas I threw out</p>
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

      <UndoDemo />
    </Part>
  );
}

function UndoDemo() {
  const [state, setState] = useState("idle");
  return (
    <div className="cs-undo" data-reveal>
      <p className="cs-mono">Try it: is a quick yes plus undo better than a pop-up?</p>
      <div className="cs-undo__card">
        <span>Drop the Copper bottle to ₹849 on Flipkart</span>
        <button type="button" className="cs-btn" disabled={state === "approved"} onClick={() => setState("approved")}>
          {state === "approved" ? "Done" : "Approve"}
        </button>
      </div>
      <div className={`cs-toast ${state === "approved" ? "on" : ""}`} role="status">
        <CoMark state="done" size={20} /> Done. Co's updating Flipkart.
        <button type="button" onClick={() => setState("undone")}>
          Undo
        </button>
      </div>
      {state === "undone" && (
        <p className="cs-note">
          Undone. Nothing changed on Flipkart.{" "}
          <button type="button" className="cs-link" onClick={() => setState("idle")}>
            Try again
          </button>
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── 08 solution ───────────────────────── */

const SCREENS = [
  {
    img: "home",
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
    t: "One stock count for three shops",
    d: "When a marketplace shows the wrong number, it's caught before it oversells.",
    pins: [
      [12, 24, "One banner, one action: Co can fix both mismatches."],
      [46.5, 50, "Flipkart says 124. She actually has 118."],
      [70, 38, "Restock ideas based on the last 14 days of sales."],
    ],
  },
  {
    img: "returns",
    t: "Returns, with the replies already drafted",
    d: "Sorted by deadline, so nothing gets decided for her by default.",
    pins: [
      [12, 25, "How returns are going, at a glance."],
      [73, 52, "The closest deadline is flagged in red. Co's reply is one click away."],
    ],
  },
  {
    img: "settings",
    t: "How much Co is allowed to do",
    d: "Freedom is set task by task, and some lines are never crossed.",
    pins: [
      [12, 37, "Pricing, restocking, returns and ads each get their own level."],
      [65, 37, "Hard limits: minimum margin, max price change, daily ad budget."],
      [65, 75, "Products Co must never discount, whatever happens."],
    ],
  },
];

function Screen({ s }) {
  const [on, setOn] = useState(null);
  return (
    <article className="cs-screen" data-reveal>
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
    </article>
  );
}

function Solution() {
  return (
    <Sec id="solution" n="05" kicker="Solution" title="Co keeps watch, and only taps Meera on the shoulder when it matters.">
      <div className="cs-screens">
        {SCREENS.map((sc) => (
          <Screen key={sc.img} s={sc} />
        ))}
      </div>

      <article className="cs-wrong" data-reveal>
        <div className="cs-feat__copy">
          <p className="cs-mono">And when it goes wrong</p>
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

      <div className="cs-phones" data-reveal>
        <div className="cs-phones__copy">
          <p className="cs-mono">On the phone</p>
          <h3>A phone app for the gaps between packing orders</h3>
          <p>She can approve straight from the lock screen, ask Co something in Hindi out loud, and get a short recap of the day at night.</p>
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

      <a className="cs-proto" href={DEMO} target="_blank" rel="noreferrer" data-reveal>
        <span>
          <strong>Have a click around the prototype.</strong> Approve a price, fix a stock mismatch, switch it to Hindi.
        </span>
        <span aria-hidden="true">↗</span>
      </a>
    </Sec>
  );
}

/* ───────────────────────── 09 design system ───────────────────────── */

const RAMPS = [
  ["Periwinkle", "brand and primary", ["#F4F3FF", "#EEECFF", "#C9C2FF", "#9B8FFF", "#6B5CFF", "#5543E8", "#3A2DB0"]],
  ["Navy", "text and buttons", ["#F2F3F8", "#E2E4EE", "#A9ADBF", "#676C88", "#3B3F5C", "#23253F", "#14142B"]],
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
  ["idle", "Watching"],
  ["thinking", "Thinking"],
  ["needsYou", "Needs you"],
  ["done", "Done"],
  ["paused", "Paused"],
];

function DesignSystem() {
  const [mode, setMode] = useState("ask");
  return (
    <Part kicker="Design system" title="A quiet system, so the money and the decisions are what you notice." lede="Flat colour, lots of room, one main button per card. Colour only ever means a status, never decoration. Every value lives in one file, so I could change the palette without touching a screen.">
      <div className="ds-block" data-reveal>
        <h3 className="ds-h">Typefaces</h3>
        <div className="ds-type">
          <article>
            <p className="aa" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Aa</p>
            <h4>Plus Jakarta Sans</h4>
            <dl>
              <div><dt>Used for</dt><dd>UI, headings, numbers</dd></div>
              <div><dt>Weights</dt><dd>400, 500, 700</dd></div>
              <div><dt>Sizes</dt><dd>32 / 24 / 18 / 14 / 13</dd></div>
              <div><dt>Numbers</dt><dd>Tabular for all money</dd></div>
            </dl>
          </article>
          <article>
            <p className="aa" lang="hi" style={{ fontFamily: "Mukta, sans-serif" }}>अआ</p>
            <h4>Mukta</h4>
            <dl>
              <div><dt>Used for</dt><dd>Hindi (Devanagari)</dd></div>
              <div><dt>Weights</dt><dd>400, 600</dd></div>
              <div><dt>Sizes</dt><dd>Same as Jakarta, +1px</dd></div>
              <div><dt>Why</dt><dd>Sits at the same height</dd></div>
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
        <p className="cs-note">Two flat circles: Meera and Co, with the work happening where they overlap. The shape alone tells you the state, so it still reads at 16px and with motion turned off.</p>
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
          <p className="cs-note">Marketplaces get plain grey labels. Only status gets colour.</p>
        </div>
        <div className="ds-block">
          <h3 className="ds-h">The freedom control</h3>
          <div className="seg" role="radiogroup" aria-label="Freedom level example">
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
          <p className="cs-note">The control she'll touch most. Go on, click it.</p>
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
            <li><span>Corners</span> pill buttons · 24 cards · 32 frame</li>
            <li><span>Gaps</span> 24 to 32px</li>
            <li><span>Rows</span> 56px in tables</li>
            <li><span>Targets</span> 48px at least</li>
            <li><span>Contrast</span> WCAG AA on all text</li>
          </ul>
        </div>
      </div>
    </Part>
  );
}

/* ───────────────────────── 10 iterations ───────────────────────── */

function Iterations() {
  const [split, setSplit] = useState(50);
  return (
    <Part kicker="Iterations" title="My first version worked fine. It just didn't make anyone feel anything.">
      <div className="cs-evo" data-reveal>
        <div className="cs-compare" style={{ "--split": `${split}%` }}>
          <img src={`${A}cmp-round1.webp`} alt="Round 1: plain white cards on a flat background" className="before" />
          <img src={`${A}cmp-final.webp`} alt="Final: glass morning screen and an evening recap" className="after" />
          <span className="line" aria-hidden="true" />
          <input type="range" min="0" max="100" value={split} onChange={(e) => setSplit(Number(e.target.value))} aria-label="Compare round 1 and the final version" />
          <span className="tag l">Round 1</span>
          <span className="tag r">Final</span>
          <p className="hand drag-hint" aria-hidden="true">← drag →</p>
        </div>
        <ol className="cs-rounds">
          <li>
            <span className="cs-mono">Round 1</span>
            <h3>Correct, and completely forgettable.</h3>
            <p>Everything was a white card with small grey labels. Nothing on the screen talked about money.</p>
          </li>
          <li>
            <span className="cs-mono">Round 2</span>
            <h3>Lead with the money.</h3>
            <p>Product photos went to the front of each card, and the headline became "+₹7,641 extra sales a week".</p>
          </li>
          <li>
            <span className="cs-mono">Round 3</span>
            <h3>Think in a day, not in screens.</h3>
            <p>A calm morning, a decision on the lock screen, a Hindi voice question, an evening recap. And the glowing AI blob I started with became two flat circles.</p>
          </li>
        </ol>
      </div>

      <div className="cs-wrongme" data-reveal>
        <p className="cs-mono">Where I was wrong</p>
        <h3>I added a theme switch because I couldn't choose. That was my problem, not Meera's.</h3>
        <div className="cs-wrongme__grid">
          <div>
            <p className="lab">What I did</p>
            <p>
              I worried periwinkle looked like every other AI product, so I built an indigo and marigold theme too and
              put a switch in the header to flip between them.
            </p>
          </div>
          <div>
            <p className="lab">What happened</p>
            <p>
              The first person I showed it to asked what the switch was even for. Fair question.
              A seller opening this at 7 AM doesn't want to pick a colour scheme. It just added a question.
            </p>
          </div>
          <div>
            <p className="lab">What I changed</p>
            <p>
              I picked one palette, the warmer periwinkle and pink, and removed the switch. The lesson: when I can't
              decide something, I shouldn't hand that decision to the user.
            </p>
          </div>
        </div>
      </div>
    </Part>
  );
}

/* ───────────────────────── 11 reflection ───────────────────────── */

function Reflection() {
  return (
    <Sec id="reflection" n="✦" kicker="Reflection" title="The real test is simple: would sellers actually say yes to Co?">
      <div className="cs-reflect" data-reveal>
        <Sticky c="y" r={-1.5}>
          <h3 className="hand">What I'd measure</h3>
          <ul>
            <li>Time spent across dashboards, before and after</li>
            <li>How often she approves, split by how sure Co was</li>
            <li>How often she hits undo. High means Co is wrong. Zero might mean she's stopped checking.</li>
          </ul>
        </Sticky>
        <Sticky c="p" r={1}>
          <h3 className="hand">What I'd do differently</h3>
          <ul>
            <li>Talk to real sellers first. Desk research only gets you so far.</li>
            <li>Get a native speaker to check every Hindi line.</li>
            <li>Design the "Co got it wrong" moment before the happy path.</li>
          </ul>
        </Sticky>
        <Sticky c="g" r={1}>
          <h3 className="hand">First 5 questions for real sellers</h3>
          <ul>
            <li>Walk me through yesterday morning, tab by tab.</li>
            <li>When did a fee last surprise you? What did you do?</li>
            <li>What would you never let software change?</li>
            <li>Who else touches your seller accounts?</li>
            <li>Show me where you track payouts today.</li>
          </ul>
        </Sticky>
        <Sticky c="b" r={-0.5}>
          <h3 className="hand">What's next</h3>
          <ul>
            <li>Put the approval screen in front of 3 to 5 sellers.</li>
            <li>See whether one small early win, like a restock alert, really builds trust.</li>
          </ul>
        </Sticky>
      </div>
    </Sec>
  );
}

function Footer() {
  return (
    <footer className="cs-foot">
      <p>Thanks for reading this far. If you'd like the long version, with all the messy bits, I'd love to walk you through it.</p>
      <div>
        <a href="/#contact" className="cs-btn">Say hello</a>
        <a href="/#projects" className="cs-link">Back to all work</a>
      </div>
    </footer>
  );
}
