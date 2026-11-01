/* Visual chapters for the Paywise case study: what it can and won't do, the options I ruled out,
   and edge cases as designed screens. */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Ban, Check, CloudOff, Hourglass, PhoneCall, PhoneIncoming, RotateCcw,
  ShieldCheck, TriangleAlert, UserRound, Wallet, X,
} from "lucide-react";
import { ProtectedTag, StatusBar } from "./demo/screens.jsx";

/* ───────── Can / won't ───────── */

const CAN = [
  "Notice unusual signals in a payment",
  "Explain each reason in plain words",
  "Pause a risky payment for 10 seconds",
  "Offer a one-click call to someone she trusts",
  "Say what a collect request really does",
];
const WONT = [
  "Block a payment on its own",
  "Listen to or record a call. It only knows a call happened",
  "Tell her she is being scammed",
  "Share anything with Rohan without her consent",
];

export function CanWont() {
  return (
    <div className="pw-cw" data-reveal>
      <div className="pw-cw__col can">
        <p className="pw-cw__h"><span><Check size={16} aria-hidden="true" /></span> What Paywise can do</p>
        <ul>{CAN.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="pw-cw__col wont">
        <p className="pw-cw__h"><span><X size={16} aria-hidden="true" /></span> What Paywise will never do</p>
        <ul>{WONT.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </div>
  );
}

/* ───────── The decision: try both sides ───────── */

const BET = {
  "block-scam": ["bad", "The payment stops, for now.", "She is still on the call. The caller can send her to another app or a bank branch, and she doesn't know why the payment was stopped."],
  "block-real": ["bad", "A real payment fails.", "She can't complete it through Paywise. After a false block, she is more likely to turn the feature off."],
  "pause-scam": ["warn", "She may still pay.", "This is the known cost of the decision. The pause gives her ten seconds, specific reasons and a one-click call to Rohan. It doesn't guarantee she stops."],
  "pause-real": ["ok", "Ten seconds lost.", "The payment completes. She chooses whether this payee triggers a pause again."],
};

function Seg({ label, value, options, onChange }) {
  return (
    <div>
      <p className="rk-mono">{label}</p>
      <div className="pb__seg" role="group" aria-label={label}>
        {options.map(([v, t]) => <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>{t}</button>)}
      </div>
    </div>
  );
}

export function TheBet() {
  const [who, setWho] = useState("scam");
  const [does, setDoes] = useState("pause");
  const k = `${does}-${who}`;
  const [tone, head, body] = BET[k];
  return (
    <div className="pb" data-reveal>
      <div className="pb__ctl">
        <Seg label="This payment is" value={who} onChange={setWho} options={[["scam", "A scam"], ["real", "Real"]]} />
        <Seg label="Paywise" value={does} onChange={setDoes} options={[["pause", "Pauses it"], ["block", "Blocks it"]]} />
      </div>
      <div className="pb__out" data-tone={tone} key={k} aria-live="polite">
        <p className="rk-mono">What happens</p>
        <b>{head}</b>
        <p>{body}</p>
      </div>
      <div className="pb__mind">
        <p className="rk-mono">What would change this decision</p>
        <p>If testing shows people on a scam call pay straight through the pause, ten seconds isn't enough. The next options are a longer wait on large first-time payments, or confirmation from a trusted person.</p>
      </div>
    </div>
  );
}

/* ───────── What I said no to ───────── */

function NoPair({ no, noUi, yes, yesUi, why }) {
  return (
    <article className="pw-no" data-reveal>
      <div className="pw-no__sides">
        <div className="pw-no__side bad">
          <p className="pw-no__tag"><X size={14} aria-hidden="true" /> Avoided</p>
          <div className="pw-no__ui">{noUi}</div>
          <h4>{no}</h4>
        </div>
        <ArrowRight className="pw-no__arrow" size={20} aria-hidden="true" />
        <div className="pw-no__side good">
          <p className="pw-no__tag"><Check size={14} aria-hidden="true" /> Chose</p>
          <div className="pw-no__ui">{yesUi}</div>
          <h4>{yes}</h4>
        </div>
      </div>
      <p className="pw-no__why">{why}</p>
    </article>
  );
}

export function SaidNo() {
  return (
    <div className="pw-said">
      <div className="pw-said__grid">
        <NoPair
          no="A new UPI app"
          noUi={<div className="m-store"><span className="m-store__icon"><Wallet size={18} aria-hidden="true" /></span><b>Paywise Pay</b><i>Install</i></div>}
          yes="A layer inside the app they use"
          yesUi={<div className="m-layer"><i /><i /><span><ShieldCheck size={13} aria-hidden="true" /> Protected by Paywise</span></div>}
          why="Nobody switches payment apps for safety. Protection has to sit where people already pay."
        />
        <NoPair
          no="A warning on every payment"
          noUi={<div className="m-warns">{["₹40 · Milk", "₹2,500 · Vegetables", "₹48,000 · New payee"].map((t) => <span key={t}><TriangleAlert size={12} aria-hidden="true" /> {t}</span>)}</div>}
          yes="Only on risky payments"
          yesUi={<div className="m-warns calm"><span><Check size={12} aria-hidden="true" /> ₹40 · Milk</span><span><Check size={12} aria-hidden="true" /> ₹2,500 · Vegetables</span><span className="hit"><Hourglass size={12} aria-hidden="true" /> ₹48,000 · New payee</span></div>}
          why="Constant warnings get ignored."
        />
        <NoPair
          no={"An “Are you sure?” pop-up"}
          noUi={<div className="m-dialog"><b>Are you sure?</b><em><i>Cancel</i><i>OK</i></em></div>}
          yes="A 10-second pause with reasons"
          yesUi={<div className="m-pause"><b>7</b><span>Never paid this person</span><span>Unknown call, 3 min ago</span></div>}
          why="People click through generic pop-ups."
        />
        <NoPair
          no="AI blocks the payment"
          noUi={<div className="m-block"><Ban size={20} aria-hidden="true" /><b>Payment blocked</b><span>Contact support</span></div>}
          yes="The person decides"
          yesUi={<div className="m-choice"><i className="y">Call Rohan first</i><i>Cancel payment</i><u>I know them, pay anyway</u></div>}
          why="False blocks break trust and leave people stuck."
        />
      </div>
      <div className="pw-also" data-reveal>
        <p className="rk-mono">Also ruled out</p>
        <ul>
          {[
            ["Screen overlay", "doesn't work on iPhone, feels invasive"],
            ["AI that talks to the scammer", "risky and unpredictable"],
            ["Call recording", "a privacy risk, and the signals don't need it"],
          ].map(([t, d]) => <li key={t}><s>{t}</s><span>{d}</span></li>)}
        </ul>
      </div>
    </div>
  );
}

/* ───────── Try to break it: edge cases as scenes that play in a phone ───────── */

const Pause = ({ n, children }) => (
  <>
    <div className="ep-top"><ProtectedTag /><span className="ep-ring">{n}</span></div>
    <p className="ep-h">Let's take 10 seconds.</p>
    {children}
  </>
);
const Reason = ({ children }) => (
  <ul className="rows rows--tight"><li><span className="tile tile--amber"><UserRound size={20} strokeWidth={1.6} /></span><div><b>{children}</b></div></li></ul>
);
const Actions = () => (
  <div className="ep-low"><span className="r-btn"><PhoneCall size={18} strokeWidth={1.6} /> Call Rohan first</span><span className="r-btn r-btn--tint">Cancel payment</span></div>
);
const Paid = ({ list }) => list.map((t) => <p key={t} className="ep-pay"><span>{t}</span><Check size={18} aria-hidden="true" /></p>);
const TRANSFERS = ["₹30,000 · 10:02", "₹30,000 · 10:19", "₹30,000 · 10:47"];

const EDGES = [
  {
    t: "A real payment triggers a pause",
    move: "She pays after the countdown, then chooses whether this payee pauses again.",
    why: "A false alarm should cost ten seconds and nothing more.",
    beats: [
      <Pause n="3"><Reason>You've never paid this person</Reason><div className="ep-low"><span className="r-link">I know them, pay anyway (3s)</span></div></Pause>,
      <Pause n="✓"><Reason>You've never paid this person</Reason><div className="ep-low"><span className="r-btn">I know them, pay anyway</span></div></Pause>,
      <><div className="ep-center"><span className="ep-tick"><Check size={40} aria-hidden="true" /></span><p className="ep-h">₹48,000 paid</p><p className="ep-p">Pause for this payee next time?</p></div><div className="ep-chips"><span>Yes</span><span className="on">No</span></div></>,
    ],
  },
  {
    t: "Rohan doesn't pick up",
    move: "Nothing has been sent. She gets the next person, or her bank.",
    why: "Scammers isolate people, so one unanswered call can't leave her without a next step.",
    beats: [
      <div className="ep-center"><span className="ep-rings">R</span><p className="ep-h">Calling Rohan…</p></div>,
      <div className="ep-center"><span className="ep-rings off">R</span><p className="ep-h">No answer</p></div>,
      <><p className="ep-h">Rohan didn't answer.</p><p className="ep-p">Your payment hasn't been sent.</p><div className="ep-low"><span className="r-btn"><PhoneCall size={18} strokeWidth={1.6} /> Call Priya</span><span className="r-btn r-btn--tint">Call your bank</span></div></>,
    ],
  },
  {
    t: "The caller says ignore the warning",
    move: "The screen asks about it directly and gives her a way out.",
    why: "The scammer is often still on the call, so the screen has to account for them.",
    beats: [
      <><p className="ep-call"><PhoneIncoming size={14} aria-hidden="true" /> On call · 06:12</p><Pause n="8"><Reason>Unknown caller, 3 minutes ago</Reason></Pause><Actions /></>,
      <><p className="ep-call"><PhoneIncoming size={14} aria-hidden="true" /> On call · 06:20</p><p className="ep-said"><small>The caller</small>Madam, that is a system error. Ignore it and press pay.</p></>,
      <><p className="ep-call"><PhoneIncoming size={14} aria-hidden="true" /> On call · 06:24</p><p className="ep-h">Did someone tell you to ignore this screen?</p><p className="ep-p">Police and banks never ask you to pay over a call.</p><div className="ep-low"><span className="r-btn">Yes, they did</span><span className="r-btn r-btn--tint">Cancel payment</span></div></>,
    ],
  },
  {
    t: "She pays anyway",
    move: "No warning after the payment. The scam report stays one click away.",
    why: "Blame can delay a report, and early reporting matters most.",
    beats: [
      <Pause n="✓"><Reason>You've never paid this person</Reason><div className="ep-low"><span className="r-btn">I know them, pay anyway</span></div></Pause>,
      <div className="ep-center"><span className="ep-tick"><Check size={40} aria-hidden="true" /></span><p className="ep-h">₹48,000 paid</p></div>,
      <><p className="ep-h">Did something feel wrong?</p><p className="ep-p">You can report it at any time.</p><div className="ep-low"><span className="r-btn">I think I've been scammed</span></div></>,
    ],
  },
  {
    t: "The money leaves in small pieces",
    move: "The pause counts the total to that payee, not just this payment.",
    why: "One Mumbai senior's ₹58 crore went in 27 transfers. A check on one payment would miss that pattern.",
    beats: [
      <><p className="ep-p">Today, to Vikram Rao</p><Paid list={TRANSFERS.slice(0, 1)} /></>,
      <><p className="ep-p">Today, to Vikram Rao</p><Paid list={TRANSFERS.slice(0, 2)} /></>,
      <><p className="ep-p">Today, to Vikram Rao</p><Paid list={TRANSFERS} /></>,
      <Pause n="9"><p className="ep-p">This is your 4th payment to this person today.</p><p className="ep-total"><span>Today so far</span><b>₹1,20,000</b></p><Actions /></Pause>,
    ],
  },
  {
    t: "Paywise can't run its checks",
    move: "The payment still works, and the screen says what didn't happen.",
    why: "Showing nothing would suggest the payment is safe, so the failure has to be visible.",
    beats: [
      <div className="ep-center"><span className="ep-spin" /><p className="ep-p">Checking this payee…</p></div>,
      <><p className="ep-warn"><CloudOff size={18} aria-hidden="true" /> Couldn't check this payee</p><p className="ep-p">Your payment still works. Check the name before you pay.</p><div className="ep-low"><span className="r-btn">Pay ₹48,000</span></div></>,
    ],
  },
  {
    t: "She never added anyone to call",
    move: "The pause still works alone. It offers her bank, and asks again afterwards.",
    why: "The pause can't depend on setup being finished.",
    beats: [
      <Pause n="6"><Reason>You've never paid this person</Reason><p className="ep-empty"><PhoneCall size={18} aria-hidden="true" /> No one to call yet</p><div className="ep-low"><span className="r-btn r-btn--tint">Cancel payment</span></div></Pause>,
      <Pause n="4"><Reason>You've never paid this person</Reason><div className="ep-low"><span className="r-btn"><PhoneCall size={18} strokeWidth={1.6} /> Call your bank</span><span className="r-link">Add someone you trust later</span></div></Pause>,
    ],
  },
  {
    t: "She reports it three days later",
    move: "Missing the first hour doesn't close the flow. The steps stay the same.",
    why: "People often report late, and a late report can still be filed.",
    beats: [
      <div className="ep-center"><p className="ep-later">3 days later</p></div>,
      <><p className="ep-h">You can still report this.</p><p className="ep-p">Here's what to do now.</p><div className="ep-steps"><p className="on"><b>1</b> Call 1930</p><p><b>2</b> Report on cybercrime.gov.in</p><p><b>3</b> Tell your bank</p></div></>,
    ],
  },
];

const BEAT_MS = 1900;

export function EdgePlayer() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [i, setI] = useState(0);
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));
  const { t, move, why, beats } = EDGES[i];

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return setInView(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const last = EDGES[i].beats.length - 1;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setBeat(last);
    setBeat(0);
    if (!inView) return;
    const timers = Array.from({ length: last }, (_, n) => setTimeout(() => setBeat(n + 1), BEAT_MS * (n + 1)));
    return () => timers.forEach(clearTimeout);
  }, [i, run, inView]);

  const pick = (n) => {
    setI(n);
    setRun((r) => r + 1);
    setSeen((s) => new Set(s).add(n));
  };

  return (
    <div className="ep" ref={ref} data-reveal>
      <header className="ep__head">
        <p className="rk-mono">Edge cases</p>
        <h3>What happens when things go wrong</h3>
        <p className="rk-body">Select a case to see how Paywise responds. These are scripted scenes, not yet part of the clickable prototype.</p>
      </header>
      <div className="ep__body">
        <div>
          <div className="ep__count">
            <span>{seen.size} of {EDGES.length} viewed</span>
            <button type="button" onClick={() => setRun((r) => r + 1)}><RotateCcw size={14} aria-hidden="true" /> Replay</button>
          </div>
          <ul className="ep__list">
            {EDGES.map((e, n) => (
              <li key={e.t}>
                <button type="button" aria-pressed={n === i} className={seen.has(n) ? "seen" : ""} onClick={() => pick(n)}>
                  <span className="tick" aria-hidden="true">{seen.has(n) && <Check size={13} />}</span>
                  {e.t}
                </button>
              </li>
            ))}
          </ul>
          <div className="ep__note" aria-live="polite">
            <div key={t}>
              <p className="rk-mono">What Paywise does</p>
              <p className="move">{move}</p>
              <p className="why">{why}</p>
            </div>
          </div>
        </div>
        <div className="ep__stage">
          <div className="ep__pips" aria-hidden="true">{beats.map((_, n) => <i key={n} className={n <= beat ? "on" : ""} />)}</div>
          <div className="rk-app phone" style={{ zoom: 0.72 }} aria-hidden="true">
            <div className="phone__screen">
              <StatusBar />
              <div className="ep-beat" key={`${i}-${run}-${beat}`}>{beats[beat]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
