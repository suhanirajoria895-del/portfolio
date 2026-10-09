import { useEffect, useState } from "react";
import { ChevronLeft, ShieldCheck, Phone as PhoneIcon, X, Check, UserRound, ArrowDownLeft, ArrowUpRight, Ban, FileText, Landmark, Bell, Info } from "lucide-react";

export function Phone({ children, className = "" }) {
  return (
    <div className={`ph ${className}`}>
      <div className="ph__notch" />
      <div className="ph__bar"><b>9:41</b><span /></div>
      <div className="ph__screen">{children}</div>
    </div>
  );
}

export function PayScreen() {
  return (
    <Phone>
      <header className="rk-top"><span className="rk-ic"><ChevronLeft size={18} /></span><b>Pay</b><span /></header>
      <div className="rk-payee">
        <span className="rk-av">KS</span>
        <b>Kirana Store</b>
        <p>kiranastore@upi · paid 14 times</p>
      </div>
      <p className="rk-amt">₹ 640</p>
      <p className="rk-note">Groceries</p>
      <div className="rk-safe"><ShieldCheck size={15} /> Nothing unusual. Ruko stays out of the way.</div>
      <button className="rk-btn dark">Pay ₹640</button>
    </Phone>
  );
}

export function PauseScreen({ live = true }) {
  const [t, setT] = useState(10);
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setT((x) => (x <= 0 ? 10 : x - 1)), 1000);
    return () => clearInterval(id);
  }, [live]);
  return (
    <Phone className="pause">
      <div className="rk-ring" style={{ "--p": t / 10 }}>
        <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" /><circle className="fg" cx="50" cy="50" r="44" /></svg>
        <b>{t}</b><span>seconds</span>
      </div>
      <h3 className="rk-h">Let's take 10 seconds.</h3>
      <p className="rk-sub">You're about to send <b>₹49,000</b> to <b>verify-cbi@ybl</b></p>
      <ul className="rk-reasons">
        <li><UserRound size={15} />You've never paid this person</li>
        <li><PhoneIcon size={15} />You said someone on a call asked you to pay</li>
        <li><Landmark size={15} />Police and banks never ask you to pay over a call</li>
      </ul>
      <button className="rk-btn teal"><PhoneIcon size={16} /> Call Rohan first</button>
      <button className="rk-btn ghost">Cancel payment</button>
      <button className="rk-link">I know them, pay anyway</button>
    </Phone>
  );
}

export function CollectScreen() {
  return (
    <Phone>
      <header className="rk-top"><span className="rk-ic"><X size={16} /></span><b>Payment request</b><span /></header>
      <div className="rk-decode">
        <span className="rk-badge"><Info size={13} /> Read this first</span>
        <p className="big">This will <u>take</u> ₹4,999 from your account.</p>
        <p className="no">You will not receive money.</p>
        <div className="rk-flow">
          <div><span className="rk-av sm">S</span><p>You</p></div>
          <ArrowUpRight size={20} />
          <div><span className="rk-av sm warn">?</span><p>refund-desk@upi</p></div>
        </div>
      </div>
      <p className="rk-mini">"Collect" requests ask you to pay. Refunds never need your PIN.</p>
      <button className="rk-btn dark">Decline request</button>
      <button className="rk-link">I asked for this, continue</button>
    </Phone>
  );
}

export function TrustedScreen() {
  return (
    <Phone className="lock">
      <p className="rk-time">9:42</p>
      <p className="rk-date">Friday, 10 October</p>
      <div className="rk-notif">
        <div className="rk-notif__head"><span className="rk-app"><ShieldCheck size={13} /></span><b>Ruko</b><span>now</span></div>
        <b>Mum paused a ₹49,000 payment</b>
        <p>To someone she's never paid, while a caller was asking her to pay. She asked you to call.</p>
        <div className="rk-notif__btns"><button><PhoneIcon size={14} /> Call Mum</button><button>Later</button></div>
      </div>
      <p className="rk-priv">Only the amount and the reason are shared, and only because Sunita tapped "Call Rohan first".</p>
    </Phone>
  );
}

const STEPS = [
  [PhoneIcon, "Call 1930 now", "The national cybercrime helpline. The sooner, the better the chance to freeze it.", true],
  [Ban, "Block the payee", "We've filled in the UPI ID for you.", true],
  [FileText, "Report on cybercrime.gov.in", "Takes about 10 minutes. We'll prefill what we can.", false],
  [Landmark, "Tell your bank", "Here's exactly what to say.", false],
];

export function RecoverScreen() {
  return (
    <Phone>
      <header className="rk-top"><span className="rk-ic"><ChevronLeft size={18} /></span><b>Let's fix this</b><span /></header>
      <p className="rk-calm">This happens to careful people. Here's the next step, one at a time.</p>
      <div className="rk-prog"><i style={{ width: "50%" }} /></div>
      <ol className="rk-steps">
        {STEPS.map(([I, t, d, done], i) => (
          <li key={t} className={done ? "done" : i === 2 ? "now" : ""}>
            <span>{done ? <Check size={14} strokeWidth={3} /> : <I size={14} />}</span>
            <div><b>{t}</b><p>{d}</p></div>
          </li>
        ))}
      </ol>
      <button className="rk-btn teal">Open cybercrime.gov.in</button>
    </Phone>
  );
}

export function SettingsScreen() {
  return (
    <Phone>
      <header className="rk-top"><span className="rk-ic"><ChevronLeft size={18} /></span><b>Ruko</b><span className="rk-ic"><Bell size={15} /></span></header>
      <div className="rk-card">
        <p className="rk-k">Your trusted person</p>
        <div className="rk-person"><span className="rk-av">R</span><div><b>Rohan</b><p>Son · +91 98•• ••• 210</p></div></div>
      </div>
      <div className="rk-card">
        <p className="rk-k">Pause me when a payment is over</p>
        <div className="rk-seg">{["₹5k", "₹10k", "₹25k"].map((x, i) => <button key={x} className={i === 1 ? "on" : ""}>{x}</button>)}</div>
        <p className="rk-mini">…and whenever I say a caller is asking me to pay.</p>
      </div>
      <div className="rk-card">
        <p className="rk-k">Language</p>
        <div className="rk-seg">{["English", "हिंदी"].map((x, i) => <button key={x} className={i === 0 ? "on" : ""}>{x}</button>)}</div>
      </div>
      <div className="rk-in"><ArrowDownLeft size={14} /> 2 risky payments paused this month</div>
    </Phone>
  );
}
