import { useMemo, useState } from "react";
import { CoMark, Logo } from "./CoMark.jsx";
import { useActiveId, useDragScroll, useRevealAll } from "./hooks.js";

const A = "/work/cosell/"; // asset base
const DEMO = "/work/cosell/demo/index.html#/";

const CHAPTERS = [
  ["problem", "Problem"],
  ["research", "Research"],
  ["challenge", "Challenge"],
  ["decisions", "Decisions"],
  ["solution", "Solution"],
  ["system", "Design system"],
  ["evolution", "Iterations"],
  ["outcome", "Outcome"],
];

export default function CaseStudy() {
  useRevealAll();
  const ids = useMemo(() => CHAPTERS.map(([id]) => id), []);
  const active = useActiveId(ids);

  return (
    <>
      <TopBar />
      <ChapterNav active={active} />
      <main className="cs">
        <Hero />
        <TLDR />
        <Problem />
        <Research />
        <Challenge />
        <Decisions />
        <Solution />
        <EdgeCases />
        <DesignSystem />
        <Evolution />
        <Outcome />
        <Closing />
      </main>
    </>
  );
}

/* ───────────────────────── chrome ───────────────────────── */

function TopBar() {
  return (
    <header className="cs-top">
      <a href="/#projects" className="cs-back">
        <span aria-hidden="true">←</span> Suhani Rajoria
      </a>
      <Logo height={18} />
      <a href={DEMO} target="_blank" rel="noreferrer" className="cs-pill cs-pill--dark">
        Try the prototype <span aria-hidden="true">↗</span>
      </a>
      <span className="cs-progress" aria-hidden="true" />
    </header>
  );
}

function ChapterNav({ active }) {
  return (
    <>
      {/* Tablets and phones: a sticky chip bar instead of the side index */}
      <nav className="cs-chips" aria-label="Jump to section">
        {CHAPTERS.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
            {label}
          </a>
        ))}
      </nav>
      <SideIndex active={active} />
    </>
  );
}

function SideIndex({ active }) {
  return (
    <nav className="cs-chapters" aria-label="Case study sections">
      <ol>
        {CHAPTERS.map(([id, label], i) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="l">{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ───────────────────────── hero ───────────────────────── */

function Hero() {
  return (
    <section className="cs-hero">
      <div className="cs-hero__circles" aria-hidden="true">
        <span className="c c--peri" />
        <span className="c c--pink" />
      </div>

      <div className="cs-wrap cs-hero__copy">
        <h1>
          Your business, <em>watched over.</em>
        </h1>
        <p className="cs-lede">
          CoSell is an AI copilot that runs the busywork across Amazon, Flipkart and Meesho for small Indian sellers,
          and asks before it acts.
        </p>
        <dl className="cs-meta">
          <div>
            <dt>Type</dt>
            <dd>Self-initiated concept, solo</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>Research, product strategy, UX, UI, design system</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>Desktop web app + mobile companion</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>React, Tailwind, Claude Code</dd>
          </div>
        </dl>
      </div>

      <div className="cs-wrap">
        <figure className="cs-hero__shot">
          <BrowserFrame src={`${A}home.webp`} alt="CoSell home: greeting, today's sales, approvals queue and Co's overnight activity" eager />
        </figure>
      </div>
    </section>
  );
}

function BrowserFrame({ src, alt, eager }) {
  return (
    <div className="cs-browser">
      <div className="cs-browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>cosell.app</span>
      </div>
      <img src={src} alt={alt} width="2880" height="1800" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function TLDR() {
  const rows = [
    ["Problem", "Sellers on three marketplaces run three dashboards by hand, and small errors leak money unnoticed."],
    ["Solution", "Co, an agent that watches every listing and brings the seller only what needs a decision."],
    ["My role", "Everything: research, strategy, UX, UI, the design system and a working prototype."],
    ["Outcome", "A clickable desktop and mobile prototype, in English and Hindi, ready to test with sellers."],
  ];
  return (
    <section className="cs-wrap cs-tldr" data-reveal>
      {rows.map(([k, v]) => (
        <div key={k}>
          <h2>{k}</h2>
          <p>{v}</p>
        </div>
      ))}
    </section>
  );
}

/* ───────────────────────── 01 problem ───────────────────────── */

const PORTALS = [
  { name: "Amazon", rows: ["Label format A", "Returns: 30 days", "Fee: 15% + fixed"] },
  { name: "Flipkart", rows: ["Label format B", "Returns: 7 days", "Fee: slab based"] },
  { name: "Meesho", rows: ["Label format C", "Returns: RTO heavy", "Fee: 0% + logistics"] },
];

function Problem() {
  const [merged, setMerged] = useState(false);
  return (
    <section id="problem" className="cs-section cs-wrap">
      <div className="cs-split">
        <div data-reveal>
          <h2 className="cs-h2">Three marketplaces means running three businesses.</h2>
          <p className="cs-body">
            Every channel has its own dashboard, label format, return process and fee structure, so a seller's day is
            spent switching between portals. Mistakes are expensive and easy to miss.
          </p>
          <button type="button" className="cs-pill cs-pill--dark" onClick={() => setMerged((m) => !m)} aria-pressed={merged}>
            {merged ? "Back to three portals" : "Now hand it to Co"}
          </button>
        </div>

        <div className={`cs-juggle ${merged ? "is-merged" : ""}`} data-reveal aria-live="polite">
          {PORTALS.map((p, i) => (
            <div key={p.name} className="cs-portal" style={{ "--i": i }}>
              <p className="cs-portal__name">{p.name} Seller Panel</p>
              {p.rows.map((r) => (
                <p key={r} className="cs-portal__row">
                  {r}
                </p>
              ))}
            </div>
          ))}
          <div className="cs-portal cs-portal--co">
            <CoMark state="needsYou" size={40} />
            <p className="cs-portal__big">3 things need you</p>
            <p className="cs-portal__row">12 handled overnight across all three</p>
          </div>
        </div>
      </div>

      <ul className="cs-frame3">
        {[
          ["Constraint", "Three rule books", "Every marketplace has its own labels, return windows and fee slabs."],
          ["Gap", "Nobody watches all three", "A solo seller checks each panel by hand, usually once a day."],
          ["Consequence", "Money leaks quietly", "Wrong fees and missed claims go unnoticed until the window closes."],
        ].map(([k, t, d], i) => (
          <li key={k} data-reveal style={{ "--d": `${i * 90}ms` }}>
            <p className="k">{k}</p>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ul>

      <Statement />
    </section>
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

/** A real artifact makes the leak tangible: a settlement where Co spots what a tired seller misses. */
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
              {l.flag && (
                <p className="note">
                  <CoMark state="needsYou" size={16} /> {l.flag}
                </p>
              )}
            </li>
          ))}
        </ul>
        <div className="cs-settle__foot">
          <span>Payout</span>
          <span className="amt">{inr(total)}</span>
        </div>
        <button type="button" className="cs-pill cs-pill--dark" onClick={() => setScan((s) => !s)} aria-pressed={scan}>
          {scan ? "Hide Co's check" : "Let Co check it"}
        </button>
      </div>

      <div className="cs-stat">
        <p className="cs-stat__n">1 to 3%</p>
        <p className="cs-stat__t">
          of gross sales can quietly leak through wrong commission rates, wrong RTO charges and returns that never get
          restocked. Claims usually have to be raised within about 30 days.{" "}
          <a href="https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/" target="_blank" rel="noreferrer">
            Mynd Solution
          </a>
        </p>
        <p className={`cs-stat__found ${scan ? "on" : ""}`} aria-live="polite">
          {scan ? "₹1,890 found on one statement. That's 16.7% of this payout." : "Most sellers never open this screen."}
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── 02 research ───────────────────────── */

const INSIGHTS = [
  ["The cost is attention, not tools.", "Sellers already have dashboards. What they lack is time to watch all of them."],
  ["Small errors compound silently.", "A 1 to 3% leak is invisible day to day, and large over a year."],
  ["Timing matters.", "Claim windows and sale spikes punish anyone who checks late."],
  ["Trust is the barrier to automation.", "Handing pricing to software feels risky when margins are thin."],
];

function Research() {
  return (
    <section id="research" className="cs-section cs-wrap">
      <h2 className="cs-h2" data-reveal>
        Sellers don't need more data. They need to know what to fix today.
      </h2>
      <p className="cs-body" data-reveal>
        I analysed seller guides, reconciliation write-ups and logistics reports to find where time and money leak.
      </p>

      <div className="cs-process" data-reveal>
        {[
          ["Understand", ["Secondary research", "Pain-point mapping", "Persona"]],
          ["Define", ["Insights", "How might we", "Principles", "Tool landscape"]],
          ["Shape", ["Meera's day as the IA", "Design system", "Coded prototype", "Three rounds of iteration"]],
        ].map(([phase, steps], i) => (
          <div key={phase}>
            <p className="phase">
              <span>{i + 1}</span> {phase}
            </p>
            <ul>
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="cs-research">
        <article className="cs-persona" data-reveal>
          <img
            src="https://images.unsplash.com/photo-1723041885055-3e35ae8dd980?w=240&h=240&fit=crop&crop=focalpoint&fp-x=0.53&fp-y=0.42&fp-z=2.2&auto=format&q=70"
            alt=""
            width="96"
            height="96"
            loading="lazy"
          />
          <div>
            <h3>Meera, 34, Jaipur</h3>
            <p>
              Sells cotton kurti sets on Amazon, Flipkart and Meesho with one helper. Checks three dashboards every
              morning, reconciles payouts in Excel at night, and finds out about a stockout only when an order is
              cancelled.
            </p>
            <blockquote>"I don't need more data. I need someone to tell me what to fix today."</blockquote>
            <p className="cs-note">An archetype built from the research, not a real interviewee. Quote is illustrative.</p>
          </div>
        </article>

        <ul className="cs-insights">
          {INSIGHTS.map(([t, d], i) => (
            <li key={t} data-reveal style={{ "--d": `${i * 70}ms` }}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>

      <Landscape />

      <details className="cs-more" data-reveal>
        <summary>Read the research table</summary>
        <table>
          <thead>
            <tr>
              <th>Pain point</th>
              <th>What the research says</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Overselling and stockouts</td>
              <td>
                Without synced stock, sellers are "guaranteed to oversell", and per-channel buffers tie up cash.{" "}
                <a href="https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/" target="_blank" rel="noreferrer">Base</a>
              </td>
            </tr>
            <tr>
              <td>Manual work at peak</td>
              <td>
                Updating counts across four or more portals during sales like Diwali is described as humanly impossible.{" "}
                <a href="https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/" target="_blank" rel="noreferrer">Base</a>
              </td>
            </tr>
            <tr>
              <td>Returns and RTO</td>
              <td>
                Industry estimates put fashion returns at 25 to 40% of orders and COD return-to-origin at 20 to 40% in
                high-return categories.{" "}
                <a href="https://www.shipmozo.com/blog/ecommerce-returns-and-reverse-logistics" target="_blank" rel="noreferrer">Shipmozo</a>
              </td>
            </tr>
            <tr>
              <td>Hidden revenue leakage</td>
              <td>
                Wrong commissions, wrong RTO charges and missing returned stock can cost 1 to 3% of GMV.{" "}
                <a href="https://www.myndsolution.com/best-practices/handling-marketplace-reconciliation-for-online-sellers-in-india/" target="_blank" rel="noreferrer">Mynd</a>
              </td>
            </tr>
            <tr>
              <td>Pricing mistakes</td>
              <td>
                Manual pricing errors can break marketplace price policies or erode margin at once.{" "}
                <a href="https://base.com/en-EN/blog/how-can-multi-channel-sellers-manage-orders-across-amazon-flipkart-myntra-and-more/" target="_blank" rel="noreferrer">Base</a>
              </td>
            </tr>
          </tbody>
        </table>
      </details>
    </section>
  );
}

/* Tool categories, not named products: I didn't audit specific vendors. */
const TOOLS = ["Inventory sync tools", "Marketplace seller apps", "Spreadsheets", "CoSell"];
const CAPS = [
  ["One stock count", [1, 0, 0.5, 1]],
  ["Spots fee and return errors", [0, 0, 0.5, 1]],
  ["Explains why", [0, 0, 0, 1]],
  ["Acts, with permission", [0, 0, 0, 1]],
  ["Works in Hindi, by voice", [0, 0.5, 0, 1]],
];

function Landscape() {
  return (
    <div className="cs-landscape" data-reveal>
      <h3 className="cs-h3">Existing tools sync stock. None of them decide.</h3>
      <div className="cs-matrix" role="table" aria-label="What existing tools do, compared with CoSell">
        <div className="row head" role="row">
          <span role="columnheader" />
          {TOOLS.map((t) => (
            <span key={t} role="columnheader" className={t === "CoSell" ? "us" : ""}>
              {t}
            </span>
          ))}
        </div>
        {CAPS.map(([cap, vals]) => (
          <div className="row" role="row" key={cap}>
            <span role="rowheader">{cap}</span>
            {vals.map((v, i) => (
              <span key={i} role="cell" className={`dot ${TOOLS[i] === "CoSell" ? "us" : ""}`} aria-label={v === 1 ? "Yes" : v ? "Partly" : "No"}>
                <i className={v === 1 ? "full" : v ? "half" : "none"} />
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="cs-note">Compared by category, from the research. Partial means it needs manual work or add-ons.</p>
    </div>
  );
}

/* ───────────────────────── 03 challenge + principles ───────────────────────── */

const PRINCIPLES = [
  ["Ask before acting.", "Nothing changes without approval, unless the seller has set a rule that allows it.", "dial-safety-net"],
  ["Show the why.", "Every proposal carries its evidence, expected impact and how sure Co is.", "coins-magnifier"],
  ["Everything is reversible.", "Undo is always one tap away, and every action is logged.", "all-clear"],
  ["Calm by default.", "One place to look, sorted by what needs the seller now.", "shop-counter"],
];

function Challenge() {
  return (
    <section id="challenge" className="cs-section">
      <div className="cs-hmw">
        <span className="c c--peri" aria-hidden="true" />
        <span className="c c--pink" aria-hidden="true" />
        <p className="cs-wrap">
          How might we let a solo seller hand repetitive marketplace work to an AI agent,{" "}
          <em>without losing control of their margins or their brand?</em>
        </p>
      </div>

      <div className="cs-wrap cs-principles">
        {PRINCIPLES.map(([t, d, art], i) => (
          <article key={t} data-reveal style={{ "--d": `${i * 80}ms` }}>
            <img src={`${A}art/${art}.webp`} alt="" loading="lazy" width="900" height="620" />
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 04 decisions ───────────────────────── */

const DECISIONS = [
  {
    title: "The approval queue is the home screen.",
    img: "home.webp",
    pos: "8% 92%",
    did: "Put Co's proposals front and centre, sorted by urgency, with one Review button each.",
    didnt: "A notification inbox that decisions get buried in.",
    why: "Decisions are the job. The home screen should be the to-do list.",
  },
  {
    title: "Confidence in words, with the evidence.",
    img: "approval.webp",
    pos: "30% 40%",
    did: "High, Medium or Low beside every proposal, plus the reasons and a guardrail check.",
    didnt: "A raw score like 87%.",
    why: "A number invites false precision. Evidence lets the seller judge for herself.",
  },
  {
    title: "Autonomy is set per action, not one AI switch.",
    img: "settings.webp",
    pos: "20% 40%",
    did: "Suggest only, Ask me first, or Auto within limits, separately for repricing, restock, returns and ads.",
    didnt: "A single global on/off switch for the AI.",
    why: "Sellers trust a restock alert long before they trust automatic repricing.",
  },
];

function Decisions() {
  return (
    <section id="decisions" className="cs-section cs-wrap">
      <h2 className="cs-h2" data-reveal>
        Every choice was about earning trust one decision at a time.
      </h2>
      <div className="cs-decisions">
        {DECISIONS.map((d) => (
          <article key={d.title} className="cs-decision" data-reveal>
            <div className="cs-decision__shot">
              <img src={`${A}${d.img}`} alt="" loading="lazy" style={{ objectPosition: d.pos }} />
            </div>
            <div className="cs-decision__copy">
              <h3>{d.title}</h3>
              <dl>
                <div>
                  <dt>Decided</dt>
                  <dd>{d.did}</dd>
                </div>
                <div className="no">
                  <dt>Didn't do</dt>
                  <dd>{d.didnt}</dd>
                </div>
                <div>
                  <dt>Why</dt>
                  <dd>{d.why}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}

        <UndoDecision />
      </div>
    </section>
  );
}

/** The fourth decision, shown as the interaction itself. */
function UndoDecision() {
  const [state, setState] = useState("idle"); // idle | approved | undone
  return (
    <article className="cs-decision cs-decision--live" data-reveal>
      <div className="cs-undo-demo">
        <div className="cs-undo-card">
          <p className="cs-undo-card__t">Lower Copper bottle to ₹849 on Flipkart</p>
          <button type="button" className="cs-pill cs-pill--dark" disabled={state === "approved"} onClick={() => setState("approved")}>
            {state === "approved" ? "Approved" : "Approve"}
          </button>
        </div>
        <div className={`cs-toast ${state === "approved" ? "is-on" : ""}`} role="status">
          <CoMark state="done" size={22} />
          Approved. Co is on it.
          <button type="button" onClick={() => setState("undone")}>
            Undo
          </button>
        </div>
        {state === "undone" && <p className="cs-undo-note">Undone. Nothing changed on Flipkart.</p>}
        {state !== "idle" && (
          <button type="button" className="cs-reset" onClick={() => setState("idle")}>
            Replay
          </button>
        )}
      </div>
      <div className="cs-decision__copy">
        <h3>Saying yes is cheap, because undo is always there.</h3>
        <dl>
          <div>
            <dt>Decided</dt>
            <dd>An undo toast after every action, plus a full activity log. Try it.</dd>
          </div>
          <div className="no">
            <dt>Didn't do</dt>
            <dd>An "Are you sure?" dialog before every approval.</dd>
          </div>
          <div>
            <dt>Why</dt>
            <dd>Lowering the cost of a yes builds trust over time. Dialogs just add friction.</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/* ───────────────────────── 05 solution ───────────────────────── */

const STEPS = [
  ["home", "Command centre", "Today's sales, the approval queue and a live feed of what Co did overnight."],
  ["approval", "Approval detail", "What Co wants, why, the evidence, the guardrails it checked, and approve, edit or reject."],
  ["inventory", "One stock count", "Stock across all three marketplaces, with mismatches flagged and one-click fixes."],
  ["returns", "Returns and payouts", "Co drafts return replies and flags wrong fees before the claim window closes."],
  ["settings", "Autonomy and limits", "Per action: suggest, ask, or act within a minimum margin and daily budget."],
  ["onboarding", "A first win in minute one", "Connect the shops, set limits, and Co offers a low-risk restock alert."],
];

const PHONES = [
  ["m-morning", "Morning", "Swipe right to approve, left to reject."],
  ["m-why", "Why?", "Reasons, guardrails and a price stepper in a sheet."],
  ["m-lock", "Lock screen", "Approve straight from the notification."],
  ["m-voice", "Ask Co", "By voice, in Hindi or English."],
  ["m-evening", "Evening", "How today went, as a stack of wins."],
];

function Solution() {
  const stepIds = useMemo(() => STEPS.map(([id]) => `step-${id}`), []);
  const active = useActiveId(stepIds, "-40% 0px -55% 0px");
  const reel = useDragScroll();

  return (
    <section id="solution" className="cs-section">
      <div className="cs-wrap">
        <h2 className="cs-h2" data-reveal>
          Co watches everything, and brings Meera only what needs her.
        </h2>
      </div>

      <div className="cs-wrap cs-roles" data-reveal>
        <div>
          <p className="who">
            <CoMark state="thinking" size={26} /> Co does
          </p>
          <ul>
            <li>Watches every listing, order and payout, all night</li>
            <li>Predicts stock-outs before a sale spike</li>
            <li>Drafts price changes and return replies, with evidence</li>
            <li>Flags wrong fees before the claim window closes</li>
          </ul>
        </div>
        <div>
          <p className="who">
            <img src="https://images.unsplash.com/photo-1723041885055-3e35ae8dd980?w=80&h=80&fit=crop&crop=focalpoint&fp-x=0.53&fp-y=0.42&fp-z=2.2&auto=format&q=70" alt="" width="26" height="26" /> Meera decides
          </p>
          <ul>
            <li>Approves, edits or rejects every proposal</li>
            <li>Sets the limits Co can never cross</li>
            <li>Chooses how much freedom each kind of work gets</li>
            <li>Can undo anything, any time</li>
          </ul>
        </div>
      </div>

      <div className="cs-wrap cs-day" data-reveal>
        <h3 className="cs-h3">The product follows Meera's day, not the marketplaces' menus.</h3>
        <ol>
          {[
            ["7:40 AM", "Two quick decisions on her phone, before chai"],
            ["11:00 AM", "37 orders packed for pickup, stock already in sync"],
            ["3:00 PM", "Return replies drafted, she approves on desktop"],
            ["9:12 PM", "Evening brief: what sold, and what Co did"],
          ].map(([t, d]) => (
            <li key={t}>
              <span className="t">{t}</span>
              <span className="d">{d}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="cs-wrap cs-story">
        <ol className="cs-story__steps">
          {STEPS.map(([id, t, d]) => (
            <li key={id} id={`step-${id}`} className={active === `step-${id}` ? "is-active" : ""}>
              <h3>{t}</h3>
              <p>{d}</p>
              <img className="cs-story__inline" src={`${A}${id}.webp`} alt="" loading="lazy" />
            </li>
          ))}
        </ol>
        <div className="cs-story__stage" aria-hidden="true">
          <div className="cs-browser">
            <div className="cs-browser__bar">
              <i />
              <i />
              <i />
              <span>cosell.app</span>
            </div>
            <div className="cs-story__frames">
              {STEPS.map(([id]) => (
                <img key={id} src={`${A}${id}.webp`} alt="" loading="lazy" className={active === `step-${id}` ? "is-on" : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cs-wrap">
        <h3 className="cs-h3" data-reveal>
          And a mobile companion for decisions between packing orders.
        </h3>
      </div>
      <div className="cs-reel" ref={reel} tabIndex={0} aria-label="Mobile screens, scroll sideways">
        {PHONES.map(([img, t, d]) => (
          <figure key={img} data-reveal>
            <img src={`${A}${img}.webp`} alt={`${t}: ${d}`} width="556" height="1174" loading="lazy" draggable="false" />
            <figcaption>
              <strong>{t}</strong> {d}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="cs-wrap cs-try" data-reveal>
        <div>
          <h3 className="cs-h3">Don't take my word for it. Click around.</h3>
          <p className="cs-body">
            The full prototype, running live. Approve a price, fix the stock mismatch, switch to Hindi, or ask Co a
            question from the search bar.
          </p>
          <a href={DEMO} target="_blank" rel="noreferrer" className="cs-pill cs-pill--dark">
            Open full screen <span aria-hidden="true">↗</span>
          </a>
        </div>
        <LiveDemo />
      </div>
    </section>
  );
}

/** The prototype only loads when asked, so it never slows the page down. */
function LiveDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="cs-live">
      <div className="cs-browser">
        <div className="cs-browser__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>cosell.app</span>
        </div>
        <div className="cs-live__viewport">
          {on ? (
            <iframe src={DEMO} title="CoSell interactive prototype" loading="lazy" />
          ) : (
            <button type="button" className="cs-live__start" onClick={() => setOn(true)}>
              <img src={`${A}home.webp`} alt="" loading="lazy" />
              <span className="cs-pill cs-pill--dark">
                <CoMark state="thinking" size={20} /> Load the live prototype
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EdgeCases() {
  const cases = [
    ["Co is wrong.", "The seller undoes it and tells Co why, so the next proposal is better."],
    ["A marketplace connection fails.", "Affected numbers are marked stale, never hidden."],
    ["Two proposals clash.", "A price cut and an ad pause on one product merge into one decision."],
    ["Co isn't sure.", "It asks a question instead of proposing an action."],
  ];
  return (
    <section className="cs-wrap cs-edges" data-reveal>
      <h3 className="cs-h3">I designed for the days it goes wrong, too.</h3>
      <ul>
        {cases.map(([t, d]) => (
          <li key={t}>
            <strong>{t}</strong> {d}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────────────────── 06 design system ───────────────────────── */

const COLORS = [
  { group: "Brand", items: [["Periwinkle", "#6B5CFF", "Primary, sidebar"], ["Soft pink", "#FF8FB1", "Co's second circle"], ["Navy", "#14142B", "Text, primary buttons"], ["Canvas", "#EEF0F7", "App background"]] },
  { group: "Periwinkle scale", items: [["Tint", "#EEECFF", "Secondary buttons"], ["Ink", "#5543E8", "Text on tint, 5.4:1"], ["Lavender", "#C9C2FF", "Illustration fill"], ["Muted text", "#676C88", "Small copy, 5.1:1"]] },
  { group: "Status", items: [["Success", "#2FB67C", "High confidence"], ["Warning", "#F5A524", "Medium, low stock"], ["Danger", "#EF5B6B", "Low, mismatch"], ["Needs you", "#F07A5A", "Co's alert dot"]] },
];

const MARK_STATES = [
  ["idle", "Idle", "Slightly overlapping. Co is watching."],
  ["thinking", "Thinking", "The pair orbits in a two-second loop."],
  ["needsYou", "Needs you", "Fully overlapped, with a coral dot."],
  ["done", "Done", "Side by side, a tick in the overlap."],
  ["paused", "Paused", "Both grey. Co is switched off."],
];

function DesignSystem() {
  const [mark, setMark] = useState("thinking");
  const [copied, setCopied] = useState(null);
  const [mode, setMode] = useState("ask");
  const [toggle, setToggle] = useState(true);

  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      /* clipboard blocked: still show the value */
    }
    setCopied(hex);
    window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
  };

  const markInfo = MARK_STATES.find(([s]) => s === mark);

  return (
    <section id="system" className="cs-section cs-system">
      <div className="cs-wrap">
        <h2 className="cs-h2" data-reveal>
          A calm system, so the money and the decisions stand out.
        </h2>
        <p className="cs-body" data-reveal>
          Flat colour, generous space, one primary action per card. Colour only ever means status; marketplaces are
          plain text labels. Every token lives in one file, so the palette can change without touching a screen.
        </p>

        <div className="ds-board">
          {/* Identity */}
          <div className="ds-tile ds-identity" data-reveal>
            <h3>Identity</h3>
            <Logo height={44} />
            <p>
              Two circles: the seller and Co. Where they overlap, the work gets done. The static lockup is the brand;
              the mark becomes Co's face in the product.
            </p>
          </div>

          {/* Co mark */}
          <div className="ds-tile ds-mark" data-reveal>
            <h3>Co, as a character</h3>
            <div className="ds-mark__stage">
              <CoMark state={mark} size={132} />
            </div>
            <p className="ds-mark__desc" aria-live="polite">
              <strong>{markInfo[1]}.</strong> {markInfo[2]}
            </p>
            <div className="ds-seg" role="radiogroup" aria-label="Co mark state">
              {MARK_STATES.map(([s, label]) => (
                <button key={s} type="button" role="radio" aria-checked={mark === s} onClick={() => setMark(s)}>
                  {label}
                </button>
              ))}
            </div>
            <p className="ds-small">No gradients, gloss or glow. With reduced motion the orbit stops and shape alone carries the state.</p>
          </div>

          {/* Colour */}
          <div className="ds-tile ds-colour" data-reveal>
            <h3>Colour</h3>
            {COLORS.map(({ group, items }) => (
              <div key={group} className="ds-colour__group">
                <p className="ds-small">{group}</p>
                <div className="ds-swatches">
                  {items.map(([name, hex, use]) => (
                    <button key={hex} type="button" className="ds-swatch" onClick={() => copy(hex)} aria-label={`Copy ${name} ${hex}`}>
                      <span className="chip" style={{ background: hex }} />
                      <span className="nm">{name}</span>
                      <span className="hx">{copied === hex ? "Copied" : hex}</span>
                      <span className="us">{use}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Type */}
          <div className="ds-tile ds-type" data-reveal>
            <h3>Type</h3>
            <p className="ds-small">Plus Jakarta Sans, tabular numbers for all money</p>
            <ul>
              <li style={{ fontSize: 32, fontWeight: 700 }}>
                Good morning, Meera <span>32 / Bold</span>
              </li>
              <li style={{ fontSize: 24, fontWeight: 700 }}>
                ₹48,250 today <span>24 / Bold</span>
              </li>
              <li style={{ fontSize: 18, fontWeight: 700 }}>
                Needs your approval <span>18 / Bold</span>
              </li>
              <li style={{ fontSize: 14 }}>
                Co prepared these. Nothing changes until you say yes. <span>14 / Body</span>
              </li>
              <li style={{ fontSize: 13, color: "#676C88" }}>
                Oldest one is 2 days old <span>13 / Label</span>
              </li>
            </ul>
            <p className="ds-hindi" lang="hi">
              सुप्रभात, Meera! <span>Mukta for Devanagari, picked up glyph by glyph</span>
            </p>
          </div>

          {/* Components */}
          <div className="ds-tile ds-components" data-reveal>
            <h3>Components</h3>
            <div className="ds-row">
              <span className="b b--primary">Approve</span>
              <span className="b b--secondary">Review</span>
              <span className="b b--ghost">Skip</span>
            </div>
            <div className="ds-row">
              <span className="tag">Amazon</span>
              <span className="tag">Flipkart</span>
              <span className="tag">Meesho</span>
              <span className="conf conf--h">High</span>
              <span className="conf conf--m">Medium</span>
              <span className="conf conf--l">Low</span>
            </div>
            <div className="ds-row">
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
              <button
                type="button"
                role="switch"
                aria-checked={toggle}
                aria-label="Auto-approve price matches"
                className={`sw ${toggle ? "on" : ""}`}
                onClick={() => setToggle((t) => !t)}
              >
                <i />
              </button>
            </div>
            <div className="ds-row">
              <div className="stat">
                <p>Today's sales</p>
                <p className="v">₹48,250</p>
                <p className="up">+12% vs yesterday</p>
              </div>
              <div className="toast">
                <CoMark state="done" size={18} /> Approved. Co is on it. <b>Undo</b>
              </div>
            </div>
          </div>

          {/* Shape & spacing */}
          <div className="ds-tile ds-shape" data-reveal>
            <h3>Shape and space</h3>
            <div className="ds-radii">
              <span style={{ borderRadius: 999 }}>Pill · buttons</span>
              <span style={{ borderRadius: 24 }}>24 · cards</span>
              <span style={{ borderRadius: 32 }}>32 · frame</span>
            </div>
            <ul className="ds-rules">
              <li>Max six cards a screen</li>
              <li>24 to 32px gaps</li>
              <li>56px table rows</li>
              <li>48px touch targets</li>
              <li>200ms hover, undo on everything</li>
              <li>WCAG AA on every text colour</li>
            </ul>
          </div>

          {/* Illustration */}
          <div className="ds-tile ds-art" data-reveal>
            <h3>Illustration</h3>
            <p className="ds-small">Flat line art: navy strokes, periwinkle and pink fills, a little Indian craft</p>
            <div className="ds-art__grid">
              {["shop-counter", "all-clear", "box-alert", "coins-magnifier", "dial-safety-net", "connect-shops"].map((n) => (
                <img key={n} src={`${A}art/${n}.webp`} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 07 iterations ───────────────────────── */

function Evolution() {
  const [split, setSplit] = useState(50);
  return (
    <section id="evolution" className="cs-section cs-wrap">
      <h2 className="cs-h2" data-reveal>
        The first version worked. It just didn't feel like anything.
      </h2>

      <div className="cs-evo" data-reveal>
        <div className="cs-compare" style={{ "--split": `${split}%` }}>
          <img src={`${A}cmp-round1.webp`} alt="Round 1: plain white cards on a flat background" className="before" />
          <img src={`${A}cmp-final.webp`} alt="Final: atmospheric glass morning and a pastel ticket-stack evening" className="after" />
          <span className="cs-compare__line" aria-hidden="true" />
          <input
            type="range"
            min="0"
            max="100"
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Compare the first and final mobile versions"
          />
          <span className="cs-compare__tag l">Round 1</span>
          <span className="cs-compare__tag r">Final</span>
        </div>

        <ol className="cs-evo__notes">
          <li>
            <h3>Round 1: correct, but generic.</h3>
            <p>Every element was a white card and the hierarchy was all small labels. Nothing showed money.</p>
          </li>
          <li>
            <h3>Round 2: money first.</h3>
            <p>Product photos lead each card and the headline became "+₹7,641 extra sales a week".</p>
          </li>
          <li>
            <h3>Round 3: one day, five screens.</h3>
            <p>An atmospheric glass morning, a lock-screen decision, Hindi voice, and an evening ticket stack.</p>
          </li>
        </ol>
      </div>

      <div className="cs-evo2" data-reveal>
        <div className="cs-orbs">
          <div>
            <span className="old-orb" aria-hidden="true" />
            <p>
              <strong>Before:</strong> a glowing gradient orb. Pretty, but it looked like every AI product.
            </p>
          </div>
          <span className="arrow" aria-hidden="true">→</span>
          <div>
            <CoMark state="idle" size={72} />
            <p>
              <strong>After:</strong> two flat circles. It reads at 16px, and it carries five states.
            </p>
          </div>
        </div>
        <p className="cs-body">
          I also tested an indigo and marigold palette to move away from "AI purple". It was distinctive, but the
          periwinkle and pink felt warmer for a solo seller, so I kept them and dropped the theme switch.
        </p>
        <img src={`${A}m-morning.webp`} alt="Final morning screen" className="cs-evo2__final" loading="lazy" />
      </div>
    </section>
  );
}

/* ───────────────────────── 08 outcome ───────────────────────── */

function Outcome() {
  return (
    <section id="outcome" className="cs-section cs-wrap">
      <h2 className="cs-h2" data-reveal>
        The real test is whether sellers say yes to Co.
      </h2>
      <div className="cs-outcome">
        <div data-reveal>
          <h3>What I'd measure</h3>
          <ul>
            <li>
              <strong>Time across dashboards</strong> per day, before and after.
            </li>
            <li>
              <strong>Approval rate</strong> of Co's proposals, by confidence level.
            </li>
            <li>
              <strong>Undo rate.</strong> High means Co is wrong; near zero may mean nobody checks.
            </li>
          </ul>
        </div>
        <div data-reveal>
          <h3>What I'd change</h3>
          <ul>
            <li>Start from interviews, not only secondary research.</li>
            <li>Have a native speaker review every Hindi string.</li>
            <li>Design the "Co was wrong" flow before the happy path.</li>
          </ul>
        </div>
        <div data-reveal>
          <h3>Next</h3>
          <ul>
            <li>Test the approval card with 3 to 5 real sellers.</li>
            <li>Measure whether a low-risk first win, like a restock alert, really earns trust.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="cs-closing">
      <CoMark state="done" size={64} />
      <h2>Want the full walkthrough?</h2>
      <p>I'm happy to talk through the decisions, the trade-offs and what I'd test first.</p>
      <div className="cs-closing__ctas">
        <a href="/#contact" className="cs-pill cs-pill--light">
          Let's talk
        </a>
        <a href="/#projects" className="cs-link">
          Back to all work
        </a>
      </div>
    </section>
  );
}
