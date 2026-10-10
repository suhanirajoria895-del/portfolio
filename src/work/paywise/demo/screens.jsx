import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ShieldCheck, UserRound, PhoneIncoming, PhoneCall, Phone, Check, Copy, Plus, Bell, Landmark, Globe,
  MessageSquareText, ChevronRight, ArrowUpRight, ArrowDownLeft, Info, Home, ListChecks, Users, Settings,
  TriangleAlert, Languages, SlidersHorizontal, PauseCircle, ScanSearch,
} from "lucide-react";

const S = 1.6; // Lucide stroke width
const IMG = "/work/paywise/";

export const SCREENS = [
  { group: "Inside your UPI app", items: [
    ["pay", "Normal payment"],
    ["risk", "Risk pause"],
    ["collect", "Collect request"],
  ] },
  { group: "Paywise companion", items: [
    ["welcome", "Welcome"],
    ["home", "Home"],
    ["alert", "Rohan's alert"],
    ["recover", "First-hour recovery"],
  ] },
];

/** A 390×844 phone with one live screen. `go` switches screens; omit it for a static showcase. */
export function Device({ screen, go = () => {}, className = "", style }) {
  const Screen = MAP[screen];
  return (
    <div className={`rk-app phone ${className}`} style={style}>
      <div className="phone__screen">
        <Screen go={go} />
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */

export function PwMark({ size = 20, light }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill={light ? "#fff" : "#1B3F8F"} />
      <path d="M16 7.5l7 2.6v5.4c0 4.6-3 8-7 9.5-4-1.5-7-4.9-7-9.5v-5.4l7-2.6z" fill="none" stroke={light ? "#1B3F8F" : "#fff"} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12.8 16.3l2.3 2.2 4.2-4.6" fill="none" stroke={light ? "#1B3F8F" : "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusBar({ light }) {
  return (
    <div className={`sb${light ? " sb--light" : ""}`}>
      <span>9:41</span>
      <span className="sb__island" />
      <span className="sb__r"><i /><i /><i /><b>80</b></span>
    </div>
  );
}

function ProtectedTag() {
  return <span className="ptag"><ShieldCheck size={14} strokeWidth={S} /> Protected by Paywise</span>;
}

function Toast({ children }) {
  return <div className="toast" role="status"><Check size={16} strokeWidth={2} /> {children}</div>;
}

function Avatar({ src, letter, size = 52 }) {
  return src
    ? <img className="av" src={src} alt="" width={size} height={size} style={{ width: size, height: size }} />
    : <span className="av av--l" style={{ width: size, height: size }}>{letter}</span>;
}

function useLater(ms) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), ms); return () => clearTimeout(t); }, [ms]);
  return [on, setOn];
}

/* ---------- host UPI app (deliberately plain) ---------- */

function HostHeader({ title, onBack }) {
  return (
    <div className="h-head">
      <button className="h-icon" aria-label="Back" onClick={onBack}><ArrowLeft size={20} strokeWidth={2} /></button>
      <span>{title}</span>
      <span className="h-logo">UPI app</span>
    </div>
  );
}

function HostPayee({ initials, name, upi, badge }) {
  return (
    <div className="h-payee">
      <span className="h-av">{initials}</span>
      <b>{name}</b>
      <small>{upi}</small>
      {badge}
    </div>
  );
}

function HostSuccess({ amount, name, onDone }) {
  return (
    <div className="host h-success">
      <StatusBar />
      <div className="h-success__body">
        <span className="h-tick"><Check size={34} strokeWidth={2.5} /></span>
        <p>Paid to {name}</p>
        <b>₹{amount}</b>
        <small>UPI ref 4127 9083 2210 · Just now</small>
      </div>
      <button className="h-btn" onClick={onDone}>Done</button>
    </div>
  );
}

function PayFlow() {
  const [tip, setTip] = useState(false);
  const [paid, setPaid] = useState(false);
  if (paid) return <HostSuccess amount="2,500" name="Meera Joshi" onDone={() => setPaid(false)} />;
  return (
    <div className="host">
      <StatusBar />
      <HostHeader title="Send money" onBack={() => {}} />
      <HostPayee
        initials="MJ" name="Meera Joshi" upi="meera.joshi@okbank"
        badge={
          <button className="checked" onClick={() => setTip((t) => !t)} aria-expanded={tip}>
            <i /> {tip ? "Checked by Paywise: paid 14 times before" : "Checked by Paywise"}
          </button>
        }
      />
      <div className="h-amount">₹2,500</div>
      <p className="h-note">Vegetables and milk, March</p>
      <div className="h-from"><Landmark size={18} strokeWidth={2} /><span>State Bank ••4021</span><small>Change</small></div>
      <button className="h-btn" onClick={() => setPaid(true)}>Pay ₹2,500</button>
      <p className="h-foot">Known payee, normal amount. Paywise stays out of the way.</p>
    </div>
  );
}

function RiskFlow({ go }) {
  const [sheet, setSheet] = useLater(900);
  const [state, setState] = useState("idle");
  if (state === "paid") return <HostSuccess amount="48,000" name="Vikram Rao" onDone={() => setState("idle")} />;
  return (
    <div className="host-wrap">
      <div className={`host${sheet ? " is-dim" : ""}`}>
        <StatusBar />
        <div className="h-call"><PhoneIncoming size={14} strokeWidth={2} /> On call · +91 87 4410 2290 · 06:12</div>
        <HostHeader title="Send money" onBack={() => {}} />
        <HostPayee initials="VR" name="Vikram Rao" upi="vikram.verify77@ybl" badge={<span className="h-new">New payee</span>} />
        <div className="h-amount">₹48,000</div>
        <p className="h-note">Case verification deposit</p>
        <div className="h-from"><Landmark size={18} strokeWidth={2} /><span>State Bank ••4021</span><small>Change</small></div>
        <button className="h-btn" onClick={() => setSheet(true)}>Pay ₹48,000</button>
        {state === "cancelled" && <Toast>Payment cancelled. Nothing left your account.</Toast>}
      </div>
      {sheet && (
        <PauseSheet
          onCall={() => go("alert")}
          onCancel={() => { setSheet(false); setState("cancelled"); }}
          onPay={() => { setSheet(false); setState("paid"); }}
        />
      )}
    </div>
  );
}

function PauseSheet({ onCall, onCancel, onPay }) {
  const [left, setLeft] = useState(10);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const C = 2 * Math.PI * 30;
  return (
    <div className="sheet sheet--tall" role="dialog" aria-modal="true" aria-label="Paywise pause">
      <div className="sheet__grab" />
      <div className="sheet__top">
        <ProtectedTag />
        <div className="ring" data-done={left <= 0 || undefined}>
          <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
            <circle cx="36" cy="36" r="30" className="ring__track" />
            <circle cx="36" cy="36" r="30" className="ring__bar" strokeDasharray={C} strokeDashoffset={C * (left / 10)} />
          </svg>
          <b>{left > 0 ? left : <Check size={24} strokeWidth={2.2} />}</b>
        </div>
      </div>
      <h1 className="sheet__h">Let's take 10 seconds.</h1>
      <p className="sheet__sub">A few things about this payment look unusual.</p>
      <ul className="rows">
        <li><span className="tile tile--amber"><UserRound size={20} strokeWidth={S} /></span><div><b>You've never paid this person</b><small>vikram.verify77@ybl</small></div></li>
        <li><span className="tile tile--amber"><PhoneIncoming size={20} strokeWidth={S} /></span><div><b>Unknown caller, 3 minutes ago</b><small>You're still on that call</small></div></li>
        <li><span className="tile tile--teal"><Info size={20} strokeWidth={S} /></span><div><b>Police and banks never ask you to pay over a call</b></div></li>
      </ul>
      <div className="sheet__actions">
        <button className="r-btn" onClick={onCall}><PhoneCall size={18} strokeWidth={S} /> Call Rohan first</button>
        <button className="r-btn r-btn--tint" onClick={onCancel}>Cancel payment</button>
        <button className="r-link" disabled={left > 0} onClick={onPay}>
          {left > 0 ? `I know them, pay anyway (${left}s)` : "I know them, pay anyway"}
        </button>
      </div>
    </div>
  );
}

function CollectFlow({ go }) {
  const [sheet, setSheet] = useLater(900);
  const [state, setState] = useState("idle");
  if (state === "pin") return <HostPin onBack={() => setState("idle")} />;
  return (
    <div className="host-wrap">
      <div className={`host${sheet ? " is-dim" : ""}`}>
        <StatusBar />
        <HostHeader title="Requests" onBack={() => {}} />
        {state === "declined" ? (
          <div className="h-empty"><Check size={22} strokeWidth={2} /> No pending requests</div>
        ) : (
          <div className="h-req">
            <div className="h-req__top"><span className="h-av h-av--sm">RD</span><div><b>Refund Desk</b><small>refund.desk.help@axl</small></div></div>
            <p>Requested <b>₹4,999</b></p>
            <small className="h-req__msg">"Refund for cancelled order #88213. Approve to receive."</small>
            <div className="h-req__row">
              <button className="h-btn h-btn--ghost" onClick={() => setState("declined")}>Decline</button>
              <button className="h-btn" onClick={() => setSheet(true)}>Pay &amp; enter PIN</button>
            </div>
          </div>
        )}
        {state === "declined" && <Toast>Request declined. Nothing left your account.</Toast>}
      </div>
      {sheet && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Paywise collect request decoder">
          <div className="sheet__grab" />
          <ProtectedTag />
          <p className="sheet__eyebrow">This is a collect request</p>
          <h1 className="sheet__amt"><ArrowUpRight size={30} strokeWidth={2} /> ₹4,999</h1>
          <p className="sheet__lead">will <b>leave</b> your account. You will not receive money.</p>
          <div className="decode">
            <div><small>UPI app says</small><p>"Approve to receive refund"</p></div>
            <div className="decode__ruko"><small>What really happens</small><p>₹4,999 goes to a stranger</p></div>
          </div>
          <ul className="rows rows--tight">
            <li><span className="tile tile--grey">RD</span><div><b>Refund Desk</b><small>refund.desk.help@axl</small></div><span className="chip-amber">Not in contacts</span></li>
          </ul>
          <p className="sheet__why">Real refunds never ask for your PIN. A PIN always sends money out.</p>
          <div className="sheet__actions">
            <button className="r-btn" onClick={() => { setSheet(false); setState("declined"); }}>Decline request</button>
            <button className="r-btn r-btn--tint" onClick={() => go("alert")}><PhoneCall size={18} strokeWidth={S} /> Ask Rohan</button>
            <button className="r-link" onClick={() => { setSheet(false); setState("pin"); }}>Continue to PIN</button>
          </div>
        </div>
      )}
    </div>
  );
}

function HostPin({ onBack }) {
  const [pin, setPin] = useState("");
  return (
    <div className="host h-pin">
      <StatusBar />
      <HostHeader title="Enter UPI PIN" onBack={onBack} />
      <p className="h-pin__to">Paying Refund Desk · ₹4,999</p>
      <div className="h-pin__dots">{[0, 1, 2, 3].map((i) => <i key={i} className={i < pin.length ? "on" : ""} />)}</div>
      <div className="h-pad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k, i) => (
          <button key={i} disabled={!k} onClick={() => setPin((p) => (k === "⌫" ? p.slice(0, -1) : p.length < 4 ? p + k : p))}>{k}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Paywise companion ---------- */

function TabBar({ active = "home" }) {
  const tabs = [["home", "Home", Home], ["checks", "Checks", ListChecks], ["circle", "Circle", Users], ["settings", "Settings", Settings]];
  return (
    <nav className="tabbar" aria-label="Paywise">
      {tabs.map(([id, label, Ic]) => (
        <span key={id} className={id === active ? "on" : ""}><Ic size={22} strokeWidth={S} />{label}</span>
      ))}
    </nav>
  );
}

/** The bold brand block that runs under the status bar, like the reference. */
function Top({ children, tall }) {
  return (
    <div className={`top${tall ? " top--tall" : ""}`}>
      <svg className="top__lines" viewBox="0 0 390 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 210 C 90 150, 180 260, 410 120" /><path d="M-20 240 C 110 180, 200 290, 410 150" /><path d="M-20 270 C 130 210, 220 320, 410 180" />
      </svg>
      <StatusBar light />
      {children}
    </div>
  );
}

function Welcome({ go }) {
  const [step, setStep] = useState(0);
  const slides = [
    ["A pause before money leaves", "Paywise lives inside the UPI apps you already use. Most payments see nothing new."],
    ["Never decide alone", "When a payment looks unusual, call someone you trust in one click."],
    ["Calm help if it happens", "A first-hour guide that tells you exactly what to do next."],
  ];
  return (
    <div className="comp welcome">
      <StatusBar />
      <div className="welcome__art">
        <div className="mini">
          <div className="mini__top"><span>Protection on</span><b>All UPI apps protected</b></div>
          <div className="mini__row"><i /><span /><em /></div>
          <div className="mini__row"><i /><span /><em /></div>
        </div>
        <div className="float float--a"><span className="tile tile--amber"><PauseCircle size={18} strokeWidth={S} /></span><div><b>Paused ₹48,000</b><small>New payee, during a call</small></div></div>
        <div className="float float--b"><span className="tile tile--teal"><Phone size={18} strokeWidth={S} /></span><div><b>Rohan called back</b><small>Payment cancelled</small></div></div>
      </div>
      <div className="welcome__copy" key={step}>
        <h1>{slides[step][0]}</h1>
        <p>{slides[step][1]}</p>
      </div>
      <div className="dots">{slides.map((_, i) => <i key={i} className={i === step ? "on" : ""} />)}</div>
      <button className="r-btn r-btn--wide" onClick={() => (step < 2 ? setStep(step + 1) : go("home"))}>{step < 2 ? "Next" : "Get started"}</button>
    </div>
  );
}

function CompanionHome({ go }) {
  const [level, setLevel] = useState("Balanced");
  return (
    <div className="comp">
      <div className="comp__scroll">
        <Top tall>
          <div className="top__hd">
            <Avatar src={`${IMG}sunita.webp`} />
            <div className="top__hi"><small>Good evening</small><b>Sunita Deshpande</b></div>
            <button className="glass-ic" aria-label="Notifications"><Bell size={20} strokeWidth={S} /><i /></button>
          </div>
          <p className="top__k">Protection status <ShieldCheck size={15} strokeWidth={S} /></p>
          <p className="top__big top__big--xl">Protected</p>
          <p className="top__meta">146 payments checked this month</p>
          <div className="top__btns">
            <button className="glass-btn"><Plus size={20} strokeWidth={S} /> Add person</button>
            <button className="glass-btn"><ScanSearch size={20} strokeWidth={S} /> Check payee</button>
          </div>
        </Top>

        <div className="pad">
          <button className="alertrow" onClick={() => go("recover")}>
            <TriangleAlert size={30} strokeWidth={1.8} className="alertrow__ic" />
            <div><b>I think I've been scammed</b><small>Get calm, step-by-step help for the first hour</small></div>
            <ChevronRight size={20} strokeWidth={S} />
          </button>

          <h3 className="sec">Quick actions</h3>
          <div className="tiles">
            <span><Users size={24} strokeWidth={S} />Circle</span>
            <span><SlidersHorizontal size={24} strokeWidth={S} />Level</span>
            <span><Languages size={24} strokeWidth={S} />Hindi</span>
            <span><ListChecks size={24} strokeWidth={S} />Checks</span>
          </div>

          <h3 className="sec">Protection level</h3>
          <div className="seg" role="radiogroup" aria-label="Protection level">
            {["Light", "Balanced", "Extra care"].map((l) => (
              <button key={l} role="radio" aria-checked={level === l} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
          <p className="seg__hint">
            {level === "Light" && "Pause only when several strong signals stack up."}
            {level === "Balanced" && "Pause new payees above ₹10,000, or any payment during an unknown call."}
            {level === "Extra care" && "Pause every new payee, and tell Rohan each time."}
          </p>

          <div className="card list">
            <div className="list__hd"><b>Recent checks</b><span className="glass-ic glass-ic--sm"><SlidersHorizontal size={16} strokeWidth={S} /></span></div>
            <Row ic={<ArrowUpRight size={20} strokeWidth={1.8} />} t="Vikram Rao" s="Today, 6:18 PM" a="₹48,000" tone="amber" n="Paused" />
            <Row ic={<ScanSearch size={20} strokeWidth={1.8} />} t="Refund Desk" s="Mon 03, 12:07 PM" a="₹4,999" tone="teal" n="Decoded" />
            <Row ic={<ArrowDownLeft size={20} strokeWidth={1.8} />} t="Meera Joshi" s="Sun 02, 9:40 AM" a="₹2,500" tone="ok" n="Paid normally" />
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
}

function Row({ ic, t, s, a, tone, n }) {
  return (
    <div className="row">
      <span className="row__ic">{ic}</span>
      <div><b>{t}</b><small>{s}</small></div>
      <div className="row__r"><b className={`t-${tone}`}>{a}</b><small>{n}</small></div>
    </div>
  );
}

function RohanAlert() {
  const [open, setOpen] = useLater(700);
  const [reply, setReply] = useState(null);
  return (
    <div className="comp">
      <div className="comp__scroll">
        <Top>
          <div className="top__hd">
            <Avatar src={`${IMG}rohan.webp`} />
            <div className="top__hi"><small>Paywise · trusted circle</small><b>Rohan</b></div>
            <button className="glass-ic" aria-label="Notifications"><Bell size={20} strokeWidth={S} /><i /></button>
          </div>
          {!open && (
            <button className="push" onClick={() => setOpen(true)}>
              <PwMark size={34} light />
              <div><b>Paywise · now</b><p>Mom paused a ₹48,000 payment to a new payee</p></div>
            </button>
          )}
          {open && <p className="top__k top__k--gap">Mom paused a payment just now</p>}
          {open && <p className="top__big top__big--xl">₹48,000</p>}
          {open && <p className="top__meta">to vikram.verify77@ybl · new payee</p>}
        </Top>
        {open && (
          <div className="pad pad--lift">
            <div className="card alert">
              <h3 className="sec sec--in">Why Paywise paused it</h3>
              <ul className="rows rows--plain">
                <li><span className="tile tile--amber"><UserRound size={18} strokeWidth={S} /></span><div><b>She has never paid this person</b></div></li>
                <li><span className="tile tile--amber"><PhoneIncoming size={18} strokeWidth={S} /></span><div><b>Unknown caller, 3 minutes before</b></div></li>
                <li><span className="tile tile--amber"><MessageSquareText size={18} strokeWidth={S} /></span><div><b>Note: "Case verification deposit"</b></div></li>
              </ul>
              {reply === "calling" ? (
                <div className="calling"><span className="calling__dot" /> Calling Mom…</div>
              ) : reply === "fine" ? (
                <div className="calling calling--ok"><Check size={16} strokeWidth={2} /> Marked as fine. Mom can go ahead.</div>
              ) : (
                <div className="alert__actions">
                  <button className="r-btn" onClick={() => setReply("calling")}><Phone size={18} strokeWidth={S} /> Call her now</button>
                  <button className="r-btn r-btn--tint" onClick={() => setReply("fine")}>Looks fine</button>
                </div>
              )}
              <p className="alert__priv"><ShieldCheck size={14} strokeWidth={S} /> Paywise shared only this payment, with Mom's consent.</p>
            </div>
            <div className="card list">
              <div className="list__hd"><b>Past checks</b></div>
              <Row ic={<ArrowUpRight size={20} strokeWidth={1.8} />} t="Gas Agency" s="12 Mar · paid after the check" a="₹1,200" tone="ok" n="Fine" />
              <Row ic={<ScanSearch size={20} strokeWidth={1.8} />} t="Collect request" s="2 Mar · Mom declined" a="₹9,999" tone="teal" n="Stopped" />
              <Row ic={<ArrowUpRight size={20} strokeWidth={1.8} />} t="Dr. Kulkarni" s="21 Feb · you said fine" a="₹3,500" tone="ok" n="Fine" />
            </div>
          </div>
        )}
      </div>
      <TabBar active="circle" />
    </div>
  );
}

const STEPS = [
  { t: "Call 1930 now", d: "The national cyber fraud helpline can ask banks to hold the money.", ic: Phone, cta: "Call 1930" },
  { t: "Block UPI with your bank", d: "Stops any more money leaving while this is sorted.", ic: Landmark, cta: "Open bank app" },
  { t: "Report on cybercrime.gov.in", d: "Keep the acknowledgement number. Your bank will ask for it.", ic: Globe, cta: "Open the site" },
  { t: "What to tell your bank", d: null, ic: MessageSquareText, cta: "Copy message" },
];
const SCRIPT = "I was scammed on UPI today. I paid ₹48,000 to vikram.verify77@ybl. I have called 1930 and filed a cybercrime report. Please block my UPI and raise a dispute.";

function Recovery() {
  const [done, setDone] = useState([]);
  const [copied, setCopied] = useState(false);
  const start = useRef(Date.now() - 4 * 60 * 1000 - 12 * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const secs = Math.floor((now - start.current) / 1000);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const tick = (i) => setDone((d) => (d.includes(i) ? d : [...d, i]));

  return (
    <div className="comp">
      <div className="comp__scroll">
        <Top>
          <div className="top__hd">
            <span className="glass-ic"><ArrowLeft size={20} strokeWidth={S} /></span>
            <div className="top__hi top__hi--c"><small>First hour</small><b>Let's act together</b></div>
            <span className="glass-ic"><Phone size={18} strokeWidth={S} /></span>
          </div>
          <p className="top__k top__k--gap">Act within the first hour, it matters</p>
          <p className="top__big top__big--xl tnum">{mm}:{ss}</p>
          <div className="bar"><i style={{ width: `${(done.length / 4) * 100}%` }} /></div>
          <p className="top__meta">{done.length} of 4 steps done</p>
        </Top>
        <div className="pad pad--lift">
          <p className="calm">This happens to careful people too. You're doing the right thing.</p>
          <ol className="steps">
            {STEPS.map((s, i) => {
              const isDone = done.includes(i);
              const Ic = s.ic;
              return (
                <li key={s.t} className={`card${isDone ? " is-done" : ""}`}>
                  <span className="steps__n">{isDone ? <Check size={18} strokeWidth={2.2} /> : i + 1}</span>
                  <div className="steps__body">
                    <b>{s.t}</b>
                    {s.d ? <p>{s.d}</p> : <p className="script">"{SCRIPT}"</p>}
                    {!isDone && (
                      <button
                        className={`r-btn r-btn--sm${i === 0 ? "" : " r-btn--tint"}`}
                        onClick={() => {
                          if (i === 3) { navigator.clipboard?.writeText(SCRIPT).catch(() => {}); setCopied(true); }
                          tick(i);
                        }}
                      >
                        {i === 3 ? <Copy size={16} strokeWidth={S} /> : <Ic size={16} strokeWidth={S} />} {s.cta}
                      </button>
                    )}
                    {isDone && <small className="steps__ok">{i === 3 && copied ? "Copied. Paste it into your bank's chat." : "Done"}</small>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

const MAP = { pay: PayFlow, risk: RiskFlow, collect: CollectFlow, welcome: Welcome, home: CompanionHome, alert: RohanAlert, recover: Recovery };

