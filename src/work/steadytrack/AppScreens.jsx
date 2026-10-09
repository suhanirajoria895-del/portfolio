import { useEffect, useState } from "react";
import { Bell, Home, BarChart3, User, Pause, Check, ArrowUpRight, Share2, Flame, Battery, Bluetooth, ChevronLeft } from "lucide-react";

const R = "/work/steadytrack/renders/";

function Phone({ children, className = "" }) {
  return (
    <div className={`ph ${className}`}>
      <div className="ph__notch" />
      <div className="ph__bar"><b>9:41</b><span /></div>
      <div className="ph__screen">{children}</div>
    </div>
  );
}

function Nav({ on }) {
  return (
    <nav className="ap-nav" aria-hidden="true">
      {[Home, BarChart3, User].map((I, i) => <span key={i} className={on === i ? "on" : ""}><I size={20} /></span>)}
    </nav>
  );
}

function HomeScreen() {
  return (
    <Phone>
      <header className="ap-head">
        <span className="ap-av">S</span>
        <div><p>Good morning</p><b>Shanta Aaji</b></div>
        <span className="ap-ic"><Bell size={18} /></span>
      </header>
      <div className="ap-glove">
        <img src={`${R}float.jpg`} alt="" />
        <span className="ap-chip"><Bluetooth size={13} /> Connected</span>
        <span className="ap-chip r"><Battery size={13} /> 82%</span>
      </div>
      <div className="ap-card ap-today">
        <p className="ap-k">Today's session</p>
        <b>Open & close · Finger taps</b>
        <p className="ap-sub">12 min · Level 2</p>
        <button className="ap-cta">Start session</button>
      </div>
      <div className="ap-row">
        <div className="ap-card"><Flame size={18} className="amb" /><b>6 days</b><p className="ap-sub">streak</p></div>
        <div className="ap-card"><p className="ap-k">Steadiness</p><b>+12%</b><p className="ap-sub">this week</p></div>
      </div>
    </Phone>
  );
}

export function SessionScreen() {
  const [rep, setRep] = useState(8);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setLit((l) => (l + 1) % 5);
      setRep((r) => (r >= 15 ? 8 : r + 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <Phone className="dark">
      <header className="ap-top">
        <span className="ap-ic"><ChevronLeft size={18} /></span>
        <b>Open & close</b>
        <span className="ap-ic"><Pause size={16} /></span>
      </header>
      <div className="ap-beat">
        <i /><i /><i />
        <div className="ap-beat__core"><b>{rep}</b><span>of 15</span></div>
      </div>
      <p className="ap-say">Open your hand wide<br /><span>on the next beat</span></p>
      <div className="ap-fingers" aria-hidden="true">
        {["Thumb", "Index", "Middle", "Ring", "Little"].map((f, i) => (
          <div key={f} className={lit === i ? "on" : ""}><i /><span>{f[0]}</span></div>
        ))}
      </div>
      <div className="ap-wave" aria-hidden="true">
        {Array.from({ length: 26 }, (_, i) => <i key={i} style={{ "--h": `${20 + Math.abs(Math.sin(i * 1.3)) * 70}%`, "--d": `${i * 60}ms` }} />)}
      </div>
      <div className="ap-feedback"><Check size={16} /> On the beat. Nice and steady.</div>
    </Phone>
  );
}

const WEEK = [38, 42, 40, 47, 51, 49, 55];

function ProgressScreen() {
  const [tab, setTab] = useState(1);
  const pts = WEEK.map((v, i) => `${(i / 6) * 100},${100 - v}`).join(" ");
  return (
    <Phone>
      <header className="ap-top">
        <span className="ap-ic"><ChevronLeft size={18} /></span>
        <b>Progress</b>
        <span className="ap-ic"><Share2 size={16} /></span>
      </header>
      <div className="ap-tabs">
        {["Day", "Week", "Month"].map((t, i) => <button key={t} className={tab === i ? "on" : ""} onClick={() => setTab(i)}>{t}</button>)}
      </div>
      <div className="ap-card">
        <div className="ap-cardhead"><p className="ap-k">Grip strength</p><span className="ap-ic sm"><ArrowUpRight size={14} /></span></div>
        <b className="ap-big">14.2 <small>kg</small></b>
        <svg viewBox="0 -5 100 75" className="ap-chart" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={pts} fill="none" stroke="#ffb547" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <circle cx="100" cy={100 - WEEK[6]} r="3.2" fill="#ffb547" />
        </svg>
        <div className="ap-days">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}</div>
      </div>
      <div className="ap-card">
        <p className="ap-k">Steadiness by session</p>
        <div className="ap-heat" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--o": 0.25 + ((i * 7) % 10) / 13 }} />)}
        </div>
      </div>
      <Nav on={1} />
    </Phone>
  );
}

function ShareScreen() {
  return (
    <Phone>
      <div className="ap-done">
        <span className="ap-done__tick"><Check size={30} strokeWidth={3} /></span>
        <b>Session done</b>
        <p className="ap-sub">15 of 15 movements · 12 min</p>
      </div>
      <div className="ap-row">
        <div className="ap-card"><p className="ap-k">On the beat</p><b>87%</b></div>
        <div className="ap-card"><p className="ap-k">Range</p><b>+6°</b></div>
      </div>
      <div className="ap-card ap-physio">
        <span className="ap-av">M</span>
        <div><b>Dr. Mehta, physio</b><p className="ap-sub">Sees this automatically</p></div>
        <Check size={18} className="amb" />
      </div>
      <p className="ap-q">How did your hand feel?</p>
      <div className="ap-feel">
        {["Easy", "Okay", "Hard"].map((f, i) => <button key={f} className={i === 1 ? "on" : ""}>{f}</button>)}
      </div>
      <button className="ap-cta">Done</button>
    </Phone>
  );
}

const NOTES = [
  ["Home", "One big Start button. Glove status in words, not icons alone."],
  ["Session", "The beat pulses, the finger to move lights up, and feedback is one plain sentence."],
  ["Progress", "Trends, not raw numbers like 4.7 Hz. The physio gets the detail."],
  ["After", "Three big answers instead of a text box, and the physio sees it without her sending anything."],
];

export default function AppScreens() {
  return (
    <div className="apps">
      <div className="apps__row">
        <HomeScreen />
        <SessionScreen />
        <ProgressScreen />
        <ShareScreen />
      </div>
      <ol className="apps__notes">
        {NOTES.map(([t, d], i) => <li key={t} style={{ "--i": i }}><b>{t}</b><span>{d}</span></li>)}
      </ol>
    </div>
  );
}
