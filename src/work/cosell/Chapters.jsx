/* New CoSell case-study chapters: trade-off cards, the price-card iteration, severity,
   when Co acts vs asks, Ask Co, accessibility, and design to code. */
import { useState } from "react";
import { AlertTriangle, AlertOctagon, Info, Eye, ArrowDown, Check, Undo2, Sparkles, ShieldCheck, Keyboard, Contrast, Type, Volume2, MoveRight, Github, ExternalLink } from "lucide-react";
import { CoMark } from "./CoMark.jsx";

const DEMO = "/work/cosell/demo/index.html#/login";
const REPO = "https://github.com/suhanirajoria895-del/cosell-prototype";

/* ───────── Considered vs chosen ───────── */

const TRADES = [
  {
    q: "Should Co act on its own by default?",
    a: { t: "Full autopilot by default", how: "Co changes prices, stock and ads as soon as it spots something.", pro: "Saves the most time.", con: "One wrong price can cost real money, and she finds out after the fact." },
    b: { t: "Approval by default", how: "Co prepares the change and waits for a yes. She can switch a task to auto later.", pro: "Trust is earned task by task, and nothing surprises her.", con: "A little slower at first." },
    why: "The research kept coming back to fear of a black box touching prices. Trust has to be earned before it's spent.",
  },
  {
    q: "What should the home screen lead with?",
    a: { t: "A KPI dashboard", how: "Sales, orders, returns and charts, the usual seller-panel layout.", pro: "Familiar. Everything is visible.", con: "She still has to work out what needs her. That's the job she already has three times over." },
    b: { t: "Decisions first", how: "A ranked list of what needs her, by money at risk and deadline. KPIs shrink to a strip.", pro: "Answers \"what do I do now?\" in one glance.", con: "Less room for charts, which some sellers like." },
    why: "Sellers don't lack data, they lack time to watch it. The home screen should do the watching.",
  },
];

export function ConsideredChosen() {
  return (
    <div className="cc" data-reveal>
      {TRADES.map((t) => (
        <article key={t.q} className="cc__item">
          <h4 className="cc__q">{t.q}</h4>
          <div className="cc__pair">
            {[["Considered, not chosen", t.a, "no"], ["Chosen", t.b, "yes"]].map(([k, o, c]) => (
              <div key={k} className={`cc__opt ${c}`}>
                <p className="cs-mono">{k}</p>
                <h5>{o.t}</h5>
                <p>{o.how}</p>
                <p className="pro"><b>Pro</b> {o.pro}</p>
                <p className="con"><b>Con</b> {o.con}</p>
              </div>
            ))}
          </div>
          <p className="cc__why"><b>Why</b> {t.why}</p>
        </article>
      ))}
    </div>
  );
}

/* ───────── Severity system ───────── */

export const SEVERITY = [
  { k: "info", name: "Info", Icon: Info, rule: "A small change inside her normal range.", treat: "Muted. Can be grouped into one line." },
  { k: "watch", name: "Watch", Icon: Eye, rule: "A change past one of her thresholds.", treat: "Amber. Stays in place, marked for later." },
  { k: "urgent", name: "Urgent", Icon: AlertTriangle, rule: "Losing money or ranking now, and getting worse.", treat: "Red-orange. Moves to the top of the list." },
  { k: "critical", name: "Critical", Icon: AlertOctagon, rule: "A listing out of stock or suppressed.", treat: "Strongest treatment, plus a push to her phone." },
];

export function SevBadge({ k }) {
  const s = SEVERITY.find((x) => x.k === k);
  return (
    <span className={`sev sev--${k}`}>
      <s.Icon size={14} aria-hidden="true" /> {s.name}
    </span>
  );
}

export function SeverityLegend() {
  return (
    <div className="sevl" data-reveal>
      <div className="cs-part__head">
        <p className="cs-mono">Severity system</p>
        <h3>Urgency that looks the same on every card</h3>
        <p className="cs-body">Price, stock, returns and ads cards all use these four levels. Each level always pairs a colour with an icon, a word and a position, so severity is never colour alone.</p>
      </div>
      <div className="cs-scroll" tabIndex={0} role="region" aria-label="Severity levels table">
        <table className="sevl__t">
          <thead>
            <tr><th scope="col">Level</th><th scope="col">When it's used</th><th scope="col">How it looks</th></tr>
          </thead>
          <tbody>
            {SEVERITY.map((s) => (
              <tr key={s.k}>
                <th scope="row"><SevBadge k={s.k} /></th>
                <td>{s.rule}</td>
                <td>{s.treat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="cs-note">Severity colours are reserved for meaning. They are never used for decoration.</p>
    </div>
  );
}

/* ───────── Iteration: the price card ───────── */

function Spark() {
  // Lowest rival price over the last 7 days; dashed line is her floor price.
  const pts = [899, 899, 889, 889, 879, 869, 859];
  const x = (i) => 6 + i * 31;
  const y = (v) => 8 + (905 - v) * 0.9;
  return (
    <svg viewBox="0 0 200 60" className="pcard__spark" role="img" aria-label="Lowest rival price fell from 899 to 859 rupees over 7 days. Your floor price is 799.">
      <line x1="0" x2="200" y1={y(860)} y2={y(860)} className="thr" />
      <polyline points={pts.map((v, i) => `${x(i)},${y(v)}`).join(" ")} className="ln" />
      <circle cx={x(6)} cy={y(859)} r="3.5" className="pt" />
    </svg>
  );
}

function BeforeCard() {
  return (
    <div className="pcard pcard--before" aria-label="Version 1 of the price card">
      <p className="pcard__k">Pricing · Copper water bottle 1L</p>
      <div className="pcard__big">₹899 <span aria-hidden="true">→</span> ₹849</div>
      <span className="pcard__chip">−₹50 · 5.6%</span>
      <p className="pcard__s">Suggested by Co at 7:52 AM</p>
      <div className="pcard__actions"><span className="b p">Approve</span><span className="b">Edit</span><span className="b">Reject</span></div>
    </div>
  );
}

function AfterCard() {
  const [done, setDone] = useState(false);
  return (
    <div className="pcard pcard--after" aria-label="Final version of the price card">
      <div className="pcard__top"><SevBadge k="urgent" /><span className="pcard__k">Copper water bottle 1L · Marketplace B</span></div>
      <p className="pcard__delta"><ArrowDown size={22} aria-hidden="true" /><span>Lowest rival price dropped <b>4.4%</b> overnight</span></p>
      <p className="pcard__why">You're now ₹40 above the lowest offer, and lost the top listing spot at 2:10 AM.</p>
      <div className="pcard__ctx">
        <Spark />
        <dl>
          <div><dt>You</dt><dd>₹899</dd></div>
          <div><dt>Lowest rival</dt><dd>₹859</dd></div>
        </dl>
      </div>
      <div className="pcard__rec">
        <CoMark state="needsYou" size={18} />
        <p><b>Match at ₹849.</b> Keeps your margin at 31%, above your 25% floor. <span className="conf">Confidence: High</span></p>
      </div>
      <div className="pcard__actions">
        <button type="button" className="b p" onClick={() => setDone(true)} disabled={done}>{done ? <><Check size={14} aria-hidden="true" /> Approved</> : "Approve"}</button>
        <button type="button" className="b" disabled={done}>Edit</button>
        <button type="button" className="b" disabled={done}>Dismiss</button>
      </div>
      <p className="pcard__toast" role="status" aria-live="polite">
        {done && <>Price updated to ₹849. <button type="button" className="undo" onClick={() => setDone(false)}><Undo2 size={13} aria-hidden="true" /> Undo</button></>}
      </p>
    </div>
  );
}

export function PriceIteration() {
  const [after, setAfter] = useState(true);
  return (
    <article className="iter" data-reveal>
      <div className="iter__copy">
        <p className="cs-mono">Feedback that changed the design</p>
        <h3>The price was big. The problem wasn't.</h3>
        <blockquote className="iter__fb">
          <p>The price is the biggest thing on the card, but the drop doesn't feel urgent. Size isn't telling me what it means.</p>
          <footer>Feedback from an industry designer, paraphrased</footer>
        </blockquote>
        <p className="cs-body">They were right. A big number doesn't say anything. The signal was the change and what it costs, and both were hiding in a small chip.</p>
        <ol className="iter__list">
          <li><b>Severity label first,</b> with an icon.</li>
          <li><b>The change is the headline.</b></li>
          <li><b>One line on what it means for her.</b></li>
          <li><b>Then Co's recommendation</b> and the actions, with undo.</li>
        </ol>
      </div>
      <div className="iter__stage">
        <div className="qr__toggle" role="group" aria-label="Which version to show">
          <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>Before</button>
          <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>After</button>
        </div>
        {after ? <AfterCard /> : <BeforeCard />}
        <p className="cs-note">Sample data. The final card is a live, clickable component.</p>
      </div>
    </article>
  );
}

/* ───────── When Co acts, asks, or stops ───────── */

export function ActsOrAsks() {
  const steps = [
    ["Would it cross one of her limits?", "Minimum margin, max price change a day, never-discount list.", "Stop. Tell her why it can't act.", "stop"],
    ["Is Co sure enough?", "Below a confidence floor, Co asks a question instead of proposing.", "Ask a question, not an action.", "ask"],
    ["Is this task set to Auto?", "She picks the level per task: Recommend only, Ask me first, or Auto within limits.", "Recommend, and wait for a yes.", "ask"],
  ];
  return (
    <figure className="aoa" data-reveal>
      <figcaption>
        <p className="cs-mono">The decision rule</p>
        <h3 className="cs-h3">When Co acts, when it asks, and when it stops</h3>
      </figcaption>
      <ol className="aoa__steps">
        {steps.map(([q, d, no, tone], i) => (
          <li key={q}>
            <div className="aoa__q"><span className="n">{i + 1}</span><div><b>{q}</b><p>{d}</p></div></div>
            <div className={`aoa__out ${tone}`}><span className="cs-mono">{i === 0 ? "Yes" : "No"}</span><MoveRight size={14} aria-hidden="true" />{no}</div>
          </li>
        ))}
        <li className="aoa__act">
          <div className="aoa__q"><span className="n"><Check size={14} aria-hidden="true" /></span><div><b>Act</b><p>Then log it with a time and a reason, and keep an undo open for 24 hours.</p></div></div>
        </li>
      </ol>
    </figure>
  );
}

/* ───────── Ask Co: the conversational moment ───────── */

export function AskCo() {
  return (
    <article className="askco" data-reveal>
      <div className="askco__copy">
        <p className="cs-mono">Conversational interface</p>
        <h3>Ask Co, in her own words</h3>
        <p className="cs-body">Not everything fits a button. The search bar doubles as a chat with Co, with starter questions so she never faces an empty box. Answers point back to the same recommendation cards, so chat and the queue never disagree.</p>
        <p className="cs-note">I kept chat for questions, not for working through approvals. Twelve approvals in a row are faster as cards.</p>
      </div>
      <div className="askco__ui" aria-label="Example conversation with Co">
        <p className="msg me">Why lower the bottle price?</p>
        <div className="msg co">
          <CoMark state="idle" size={18} />
          <p>You lost the top listing spot on the Copper water bottle at 2:10 AM. Two sellers dropped to ₹859. I recommend ₹849. It still keeps a 31% margin.</p>
        </div>
        <div className="askco__chips" aria-label="Starter questions">
          {["How are sales today?", "What is running low?", "Am I owed any money?"].map((q) => <span key={q}>{q}</span>)}
        </div>
      </div>
    </article>
  );
}

/* ───────── Accessibility ───────── */

const FIXES = [
  ["1.4.3 Contrast (Minimum)", "Grey labels and table headers, about 60 places", "3.9 – 4.3 : 1", "5.4 : 1 or more"],
  ["1.4.3 Contrast (Minimum)", "Green \"good\" labels and results", "3.7 – 4.3 : 1", "5.2 : 1 or more"],
  ["1.4.3 Contrast (Minimum)", "Labels on the sticky-note principles", "3.4 – 4.0 : 1", "5.4 : 1 or more"],
  ["1.4.3 Contrast (Minimum)", "Segmented-control labels and search placeholder", "3.0 – 4.4 : 1", "5.3 : 1 or more"],
  ["2.1.1 Keyboard", "Wide diagrams and tables that scroll sideways", "Not reachable by keyboard", "Focusable regions with labels"],
  ["1.3.1 Info and Relationships", "Empty table header, and a list in the wrong structure", "Not announced correctly", "Labelled and restructured"],
];

export function Accessibility() {
  const rules = [
    [Contrast, "Contrast", "Body text at 4.5 : 1 or more, large text and icons at 3 : 1 or more, in default and hover states."],
    [AlertTriangle, "Never colour alone", "Severity always pairs colour with an icon, a word and its position in the list."],
    [Keyboard, "Keyboard first", "Every recommendation can be reached, approved and undone with the keyboard, with a visible focus ring."],
    [Volume2, "Screen readers", "Icon buttons have labels. New alerts announce politely; critical ones interrupt."],
    [Sparkles, "Calm motion", "Animation is subtle and turns off with the reduced-motion setting."],
    [Type, "Readable size", "Nothing that carries meaning is smaller than 13px, and Hindi uses its own typeface."],
  ];
  return (
    <section id="accessibility" className="cs-sec">
      <header className="cs-sec__head" data-reveal>
        <p className="cs-kicker"><span>07</span> Accessibility</p>
        <h2>Built to WCAG 2.2 AA, and checked</h2>
        <p className="cs-lede">A seller tired at 10 PM, on a small phone, in bright sunlight, is still a seller. These rules apply to the product and to this page.</p>
      </header>
      <ul className="a11y" data-reveal>
        {rules.map(([Icon, t, d]) => (
          <li key={t}><Icon size={20} aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ul>
      <div className="fixes" data-reveal>
        <div className="cs-part__head">
          <p className="cs-mono">Audit · axe-core, WCAG 2.2 AA</p>
          <h3>What the audit found on this page, and what I fixed</h3>
        </div>
        <div className="cs-scroll" tabIndex={0} role="region" aria-label="Accessibility fixes table">
          <table className="fixes__t">
            <thead><tr><th scope="col">WCAG criterion</th><th scope="col">Where</th><th scope="col">Before</th><th scope="col">After</th></tr></thead>
            <tbody>
              {FIXES.map(([c, w, b, a]) => (
                <tr key={w}><th scope="row">{c}</th><td>{w}</td><td className="bad">{b}</td><td className="good">{a}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cs-note">Result after the fixes: 0 violations on this page. [TODO: run the same audit on the prototype itself and add its results here.]</p>
      </div>
    </section>
  );
}

/* ───────── Design to code ───────── */

export function DesignToCode() {
  return (
    <section id="code" className="cs-sec">
      <header className="cs-sec__head" data-reveal>
        <p className="cs-kicker"><span>07</span> Figma to code</p>
        <h2>From Figma to a working prototype</h2>
        <p className="cs-lede">I designed CoSell in Figma, then built the prototype myself, so every decision could be clicked, not just looked at.</p>
      </header>
      <div className="d2c" data-reveal>
        <div className="d2c__tokens">
          <p className="cs-mono">Tokens, shared by Figma and code</p>
          <ul>
            {[["--brand", "#4338CA", "Co's colour, used for actions"], ["--ink", "#14142B", "Text"], ["--sev-urgent", "#C2410C", "Urgent, never decoration"], ["--sev-watch", "#B45309", "Watch"], ["--radius-card", "24px", "Cards"], ["--space", "8pt grid", "All spacing"]].map(([t, v, d]) => (
              <li key={t}><code>{t}</code><span className="sw" style={{ background: v.startsWith("#") ? v : "transparent" }} aria-hidden="true" /><span>{v}</span><span className="d">{d}</span></li>
            ))}
          </ul>
        </div>
        <pre className="d2c__code" tabIndex={0} aria-label="Code example: the recommendation card component"><code>{`<RecommendationCard
  severity="urgent"
  change="Lowest rival price dropped 4.4% overnight"
  consequence="You're ₹40 above the lowest offer"
  recommendation={{ price: 849, confidence: "high" }}
  onApprove={approve}   // shows a toast with Undo
  onEdit={openEditor}
  onDismiss={askWhy}    // "What went wrong?" chips
/>`}</code></pre>
      </div>
      <div className="d2c__links" data-reveal>
        <a href={DEMO} target="_blank" rel="noreferrer"><ExternalLink size={16} aria-hidden="true" /> Live prototype<span className="sr"> (opens in a new tab)</span></a>
        {REPO ? (
          <a href={REPO} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> Code on GitHub<span className="sr"> (opens in a new tab)</span></a>
        ) : (
          <span className="todo"><Github size={16} aria-hidden="true" /> [TODO: GitHub repo link]</span>
        )}
      </div>
    </section>
  );
}
