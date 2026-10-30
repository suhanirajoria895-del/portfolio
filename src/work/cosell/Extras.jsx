/* Visual chapters for the CoSell case study: what Co is and isn't, its states, what I said no to,
   edge cases as designed screens, the iPhone frame and the ending. */
import { useState } from "react";
import {
  Bot, Radar, Megaphone, Lightbulb, MessagesSquare, Check, X, AlertTriangle, AlertOctagon, Timer, RefreshCw,
  CloudOff, Scale, Hourglass, ArrowLeftRight, Sprout, PackageX, Undo2, ArrowRight, ArrowLeft,
} from "lucide-react";
import { CoMark } from "./CoMark.jsx";

const A = "/work/cosell/";

/* ───────── iPhone frame ───────── */

/** Screens are captured from the prototype with their own iOS status bar and Dynamic Island. */
export function IPhone({ src, alt, className = "", style }) {
  return (
    <div className={`ip ${className}`} style={style}>
      <div className="ip__screen">
        <img src={src} alt={alt} loading="lazy" decoding="async" width="776" height="1664" />
      </div>
    </div>
  );
}

/* ───────── What kind of AI Co is ───────── */

const KINDS = [
  [Bot, "Agentic", "Acts on her behalf, inside her limits.", "Syncs stock across all three marketplaces overnight."],
  [Radar, "Context-aware", "Knows her rules, sales and deadlines.", "Knows the floor price of every product."],
  [Megaphone, "Proactive", "Speaks first, only when it matters.", "One alert when the copper bottle loses the top spot."],
  [Lightbulb, "Explainable", "Shows its working before asking.", "Lists what changed and which of her rules passed."],
  [MessagesSquare, "Conversational", "Answers in her words, in Hindi or English.", "“Am I owed any money?”, asked by voice."],
];

export function AiKinds() {
  const [on, setOn] = useState(0);
  const [Icon, name, what, eg] = KINDS[on];
  return (
    <figure className="ak" data-reveal>
      <figcaption>
        <p className="cs-mono">What Co can do</p>
        <h3 className="cs-h3">Five things Co does that a dashboard can't</h3>
      </figcaption>
      <div className="ak__body">
        <div className="ak__tabs" role="group" aria-label="Choose an ability">
          {KINDS.map(([I, n], i) => (
            <button key={n} type="button" aria-pressed={on === i} onClick={() => setOn(i)}>
              <I size={18} aria-hidden="true" /> {n}
            </button>
          ))}
        </div>
        <div className="ak__card" aria-live="polite">
          <span className="ak__icon"><Icon size={28} aria-hidden="true" /></span>
          <p className="ak__name">{name}</p>
          <p className="ak__what">{what}</p>
          <p className="ak__eg"><CoMark size={18} /> <span><b>In CoSell:</b> {eg}</span></p>
        </div>
      </div>
    </figure>
  );
}

/* ───────── Can / won't ───────── */

const CAN = ["Sync stock counts", "Draft return replies", "Prepare a price change", "Flag wrong fees and draft the claim", "Explain every recommendation"];
const WONT = ["Go below her floor price", "Change a price by more than 10% at once", "Send a reply in her name without a yes", "File a claim without her", "Act on data that hasn't synced"];

export function CanWont() {
  return (
    <div className="cw" data-reveal>
      <div className="cw__col can">
        <p className="cw__h"><span><Check size={16} aria-hidden="true" /></span> What Co can do</p>
        <ul>{CAN.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="cw__mid" aria-hidden="true"><CoMark state="idle" size={56} /></div>
      <div className="cw__col wont">
        <p className="cw__h"><span><X size={16} aria-hidden="true" /></span> What Co will never do</p>
        <ul>{WONT.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </div>
  );
}

/* ───────── Co's states ───────── */

export function CoStates() {
  const states = [
    ["idle", "Watching", "Quietly checking every shop"],
    ["needsYou", "Needs you", "A decision is waiting"],
    ["done", "Done", "Acted, and undo is open"],
    ["paused", "Paused", "She switched Co off for a task"],
  ];
  return (
    <div className="cst" data-reveal>
      <p className="cs-mono">Co's states</p>
      <ul>
        {states.map(([s, t, d]) => (
          <li key={s}>
            <span className={`cst__mark ${s}`}><CoMark state={s} size={40} /></span>
            <b>{t}</b>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── What I said no to ───────── */

function NoPair({ n, no, noUi, yes, yesUi, why }) {
  return (
    <article className="sn__pair" data-reveal>
      <div className="sn__side bad">
        <p className="sn__tag"><X size={14} aria-hidden="true" /> Avoided · {n}</p>
        <div className="sn__ui">{noUi}</div>
        <h4>{no}</h4>
      </div>
      <ArrowRight className="sn__arrow" size={22} aria-hidden="true" />
      <div className="sn__side good">
        <p className="sn__tag"><Check size={14} aria-hidden="true" /> Chose · {n}</p>
        <div className="sn__ui">{yesUi}</div>
        <h4>{yes}</h4>
      </div>
      <p className="sn__why">{why}</p>
    </article>
  );
}

export function SaidNo() {
  return (
    <div className="sn">
      <header className="sn__head" data-reveal>
        <p className="cs-mono">Trade-offs: design decisions and reasoning</p>
        <h3 className="cs-h3">What I said no to</h3>
      </header>
      <NoPair
        n="01"
        no="Change prices silently"
        noUi={<div className="m-toast"><Check size={14} aria-hidden="true" /> Price changed to ₹849 <i>(you were never asked)</i></div>}
        yes="Ask, with the cost of waiting"
        yesUi={<div className="m-ask"><b>Match at ₹849?</b><span>Losing ₹1,090 a day</span><em><i className="y">Approve</i><i>Not now</i></em></div>}
        why="Margins are thin. One wrong price costs real money, so a yes has to come from her."
      />
      <NoPair
        n="02"
        no="A notification for every change"
        noUi={<div className="m-stack">{["Price changed on B", "3 new orders", "Stock synced", "Return opened"].map((t) => <span key={t}>{t}</span>)}</div>}
        yes="One alert, only for Urgent and Critical"
        yesUi={<div className="m-push"><CoMark size={18} /><span><b>Copper bottle lost the top spot</b>Losing ₹1,090 a day. Approve ₹849?</span></div>}
        why="Alerts that fire for everything get ignored. Everything else waits for the morning list."
      />
      <NoPair
        n="03"
        no="A percentage score"
        noUi={<div className="m-score"><b>87%</b><span>confident</span></div>}
        yes="Reasons, her rules and a plain word"
        yesUi={<ul className="m-rules">{["2 sellers dropped to ₹859", "Margin stays 31%, above 25%", "Under 10% change"].map((t) => <li key={t}><Check size={13} aria-hidden="true" />{t}</li>)}</ul>}
        why="87% looks more exact than it is. Reasons let her check the work herself, and High, Medium or Low is enough."
      />
    </div>
  );
}

/* ───────── Edge cases, as designed screens ───────── */

function Sev({ k }) {
  const map = { urgent: [AlertTriangle, "Urgent"], critical: [AlertOctagon, "Critical"], watch: [Timer, "Watch"] };
  const [I, t] = map[k];
  return <span className={`m-sev ${k}`}><I size={12} aria-hidden="true" />{t}</span>;
}

const EDGES = [
  {
    icon: CloudOff, t: "A marketplace stops syncing", d: "Numbers are marked stale. Co pauses actions there until data is fresh.",
    ui: (
      <div className="es-ui">
        <div className="es-banner warn"><CloudOff size={14} aria-hidden="true" /> Marketplace C · last synced 3 h ago</div>
        <p className="es-line">Co paused 2 actions on this marketplace.</p>
        <span className="es-btn"><RefreshCw size={13} aria-hidden="true" /> Retry sync</span>
      </div>
    ),
  },
  {
    icon: AlertTriangle, t: "A rival's price is a glitch", d: "Co ignores prices far outside the usual range. Her floor price always wins.",
    ui: (
      <div className="es-ui">
        <p className="es-k">Copper water bottle 1L</p>
        <p className="es-strike">Rival at <s>₹99</s></p>
        <p className="es-line">Ignored: 89% below the usual range. Your floor of ₹799 stays.</p>
      </div>
    ),
  },
  {
    icon: Scale, t: "Two of her rules disagree", d: "Co stops and asks which rule wins. It never picks for her.",
    ui: (
      <div className="es-ui">
        <p className="es-q">Two of your rules disagree</p>
        <label className="es-radio on"><i /> Match the lowest price</label>
        <label className="es-radio"><i /> Keep margin above 25%</label>
        <span className="es-btn dark">Use this rule</span>
      </div>
    ),
  },
  {
    icon: Hourglass, t: "She doesn't reply in time", d: "Pricing is never auto-approved. The item expires with nothing changed.",
    ui: (
      <div className="es-ui">
        <Sev k="watch" />
        <p className="es-q">Expired at 6:00 PM</p>
        <p className="es-line">Nothing changed. Co will ask again if the loss grows.</p>
      </div>
    ),
  },
  {
    icon: ArrowLeftRight, t: "Opposite moves on two marketplaces", d: "Both changes sit on one card, each with its own margin.",
    ui: (
      <div className="es-ui">
        <p className="es-k">Block-print dupatta</p>
        <p className="es-row"><span>Marketplace A</span><b className="up">₹649 → ₹699</b></p>
        <p className="es-row"><span>Marketplace B</span><b className="dn">₹679 → ₹649</b></p>
        <span className="es-btn dark">Decide both</span>
      </div>
    ),
  },
  {
    icon: PackageX, t: "Stock runs out", d: "Critical. Co pauses the listing everywhere stock is shared.",
    ui: (
      <div className="es-ui">
        <Sev k="critical" />
        <p className="es-q">Jute tote bag: 0 left</p>
        <p className="es-line">Listing paused on B and C. Restock 40?</p>
        <span className="es-btn dark">Restock</span>
      </div>
    ),
  },
  {
    icon: Sprout, t: "A new seller, no history", d: "Co starts cautious and asks more often until it knows the shop.",
    ui: (
      <div className="es-ui">
        <p className="es-q">Learning your shop</p>
        <span className="es-bar"><i style={{ width: "22%" }} /></span>
        <p className="es-line">Day 3 of 14. Co will ask before most actions for now.</p>
      </div>
    ),
  },
  {
    icon: Undo2, t: "Co gets it wrong", d: "One click puts it back. Her reason teaches Co for next time.",
    ui: (
      <div className="es-ui">
        <p className="es-line"><b>Undone.</b> ₹649 → ₹699, back to before.</p>
        <div className="es-chips"><span className="on">My price was fine</span><span>Wrong rival</span><span>Not today</span></div>
      </div>
    ),
  },
];

export function EdgeScreens() {
  return (
    <div className="es" data-reveal>
      <header>
        <p className="cs-mono">Edge cases</p>
        <h3 className="cs-h3">When data, rules or timing go wrong</h3>
      </header>
      <ul className="es__grid">
        {EDGES.map(({ icon: Icon, t, d, ui }) => (
          <li key={t} className="es__card">
            {ui}
            <div className="es__cap">
              <span className="es__icon"><Icon size={16} aria-hidden="true" /></span>
              <div><h4>{t}</h4><p>{d}</p></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── Phones ───────── */

export function Phones() {
  return (
    <div className="cs-phones" data-reveal>
      <div className="cs-phones__copy">
        <p className="cs-mono">Mobile</p>
        <h3>The iOS app</h3>
        <p>Approve from the lock screen, ask Co in Hindi out loud, and get a short recap of the day at night.</p>
        <a className="cs-phones__try" href="/work/cosell/demo/index.html#/app" target="_blank" rel="noreferrer">
          Try the phone app ↗
        </a>
      </div>
      <div className="ip-row">
        {[
          ["m-lock", "Approving from the lock screen"],
          ["m-today", "One decision at a time"],
          ["m-voice", "Asking Co in Hindi"],
        ].map(([img, alt], i) => (
          <IPhone key={img} src={`${A}ios/${img}.webp`} alt={alt} style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
}

/* ───────── Ending ───────── */

export function NextProject() {
  return (
    <footer className="nx">
      <a href="/#projects" className="nx__back"><ArrowLeft size={18} aria-hidden="true" /> All work</a>
      <a href="/work/paywise/" className="nx__card">
        <span className="cs-mono">Next case study</span>
        <b>Paywise</b>
        <span className="nx__line">A pause before UPI money leaves</span>
        <ArrowRight className="nx__go" size={28} aria-hidden="true" />
      </a>
    </footer>
  );
}
