import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, X, UserPlus, IndianRupee, PhoneIncoming, ArrowDownLeft, Flag, Search, Users, Lightbulb, PenTool, Smartphone } from "lucide-react";
import { useActiveId, useRevealAll } from "../cosell/hooks.js";
import { PauseScreen, PayScreen, CollectScreen, TrustedScreen, RecoverScreen, SettingsScreen } from "./Screens.jsx";

const P = "/work/ruko/";
const IANS_LOSS = "https://ianslive.in/indians-lose-over-rs-52976-crore-to-cyber-frauds-over-six-years-report--20260103154943";
const IANS_UPI = "https://ianslive.in/upi-frauds-worth-rs-805-crore-witnessed-this-fiscal-so-far-minister--20251215175703";
const FOF = "https://frankonfraud.com/wp-content/uploads/2026/01/Digital-Arrest-Scams-Explained.pdf";

const SECTIONS = [
  ["cover", "Cover"],
  ["problem", "The problem"],
  ["research", "Research"],
  ["people", "People & insights"],
  ["strategy", "Strategy"],
  ["identity", "Identity"],
  ["flow", "User flow"],
  ["screens", "Screens"],
  ["reflect", "Reflection"],
];

export default function CaseStudy() {
  useRevealAll();
  const ids = useMemo(() => SECTIONS.map(([id]) => id), []);
  const active = useActiveId(ids, "-45% 0px -50% 0px");
  const idx = SECTIONS.findIndex(([id]) => id === active);
  return (
    <div className="rk">
      <aside className="rk-side">
        <a href="/#projects" className="rk-side__back">← All work</a>
        <p className="rk-side__proj"><Mark size={18} /> Ruko</p>
        <nav aria-label="Case study sections">
          <ol>
            {SECTIONS.map(([id, label], i) => (
              <li key={id} className={i < idx ? "done" : ""}>
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <nav className="rk-chips" aria-label="Jump to section">
        {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>{label}</a>)}
      </nav>
      <main className="rk-main">
        <Cover />
        <Problem />
        <Research />
        <People />
        <Strategy />
        <Identity />
        <Flow />
        <Screens />
        <Reflect />
      </main>
    </div>
  );
}

/** Ruko's mark: a rounded square holding a pause. */
function Mark({ size = 40, light = false }) {
  return (
    <span className={`mark ${light ? "light" : ""}`} style={{ "--s": `${size}px` }} aria-hidden="true"><i /><i /></span>
  );
}

/** A presentation board with corner labels, like a Behance plate. */
function Board({ id, tl, tr, n, tone = "light", className = "", children }) {
  return (
    <section id={id} className={`bd bd--${tone} ${className}`} data-reveal>
      <header className="bd__corners">
        <span>{tl}</span>
        <span>{tr}</span>
      </header>
      {n && <span className="bd__n" aria-hidden="true">{n}</span>}
      {children}
    </section>
  );
}

/* ───────────────────────── cover ───────────────────────── */

const FACTS = [
  ["Role", "UX research, interaction design, UI"],
  ["Team", "Solo"],
  ["Type", "Personal project"],
  ["Platform", "Mobile, inside the UPI payment flow"],
  ["Focus", "Fraud prevention, older users"],
  ["Tools", "Figma, Claude Code"],
];

function Cover() {
  return (
    <>
      <Board id="cover" tl={<>Case study<br />02</>} tr={<>Fintech · Trust<br />& safety</>} tone="wine" className="hero">
        <p className="hero__word" aria-hidden="true">RUKO</p>
        <img className="hero__photo" src={`${P}call.webp`} alt="A young man frowning at his phone, hand on his forehead" />
        <div className="hero__phone"><PauseScreen /></div>
        <div className="hero__copy">
          <p className="hero__brand"><Mark size={34} light /> Ruko</p>
          <h1>The right pause, before the money leaves.</h1>
          <p>A scam shield for UPI payments. "Ruko" is Hindi for "wait".</p>
        </div>
      </Board>
      <dl className="rk-facts" data-reveal>
        {FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </>
  );
}

/* ───────────────────────── problem ───────────────────────── */

function Problem() {
  return (
    <>
      <Board id="problem" tl={<>The<br />problem</>} tr="01" tone="rose" className="statement">
        <p className="two-tone">
          Payments got fast. Scams got faster. <span>UPI made paying anyone instant, and scammers use that speed: fake police calls, "refund" links and "receive money" requests that actually take money.</span> Every scam works the same way: <span>create panic, then get the money moved before the person can think.</span>
        </p>
      </Board>
      <div className="rk-stats" data-reveal>
        <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="dark"><b>₹19,813 cr</b><span>lost to cyber fraud in India in 2025, across about 21.8 lakh complaints</span><em>I4C via IANS ↗</em></a>
        <a href={IANS_UPI} target="_blank" rel="noreferrer"><b>10.64 lakh</b><span>UPI fraud incidents worth ₹805 crore, April to November 2025</span><em>Lok Sabha via IANS ↗</em></a>
        <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="accent"><b>8%</b><span>of 2025 losses came from "digital arrest" scams alone</span><em>I4C via IANS ↗</em></a>
      </div>
      <div className="rk-cards" data-reveal>
        {[
          ["What's fast", "One tap, money gone", "Payments finish in seconds, with no natural moment to stop."],
          ["What scammers use", "Panic and authority", "Fake police, bank or courier calls that demand action now."],
          ["What it costs", "Savings, and shame", "Many victims tell no one, which delays reporting."],
        ].map(([k, t, d]) => <article key={t}><p className="lbl">{k}</p><b>{t}</b><p>{d}</p></article>)}
      </div>
    </>
  );
}

/* ───────────────────────── research ───────────────────────── */

const ANATOMY = [
  ["The call", "Someone posing as police, a court or an embassy calls or video-calls."],
  ["The accusation", "Your number or parcel is \"linked to a crime\"."],
  ["The isolation", "A \"virtual arrest\": stay on video, tell no one, for hours or days."],
  ["The transfer", "Money moved \"for verification\", often over many transfers."],
];

function Research() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x + 1) % ANATOMY.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <Board id="research" tl={<>Desk<br />research</>} tr="02" tone="wine" className="anatomy">
        <h2 className="bd__h">Anatomy of a digital arrest scam</h2>
        <p className="bd__sub">From government data shared in Parliament, news reports, cybercrime advisories and victim stories on forums.</p>
        <ol className="steps">
          {ANATOMY.map(([t, d], i) => (
            <li key={t} className={s === i ? "on" : ""} onMouseEnter={() => setS(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p><i className="bar"><i /></i>
            </li>
          ))}
        </ol>
        <p className="quote">One Mumbai senior sent <b>₹58 crore over 40 days</b>, in 27 transfers. <a href={FOF} target="_blank" rel="noreferrer">Frank on Fraud ↗</a></p>
      </Board>

      <Board tl={<>What already<br />exists</>} tr="03" tone="light" className="gap">
        <p className="two-tone sm">Protection happens inside the bank, or after the loss. <span>Nothing helps the person at the moment of pressure.</span></p>
        <div className="gap__row">
          <div><p className="lbl">Before · invisible</p><ul>{["Device binding", "UPI PIN", "Daily limits", "NPCI's AI fraud monitoring"].map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className="mid"><p className="lbl">During · the pressure moment</p><b>Nothing.</b><span className="pill"><Mark size={18} light /> Where Ruko lives</span></div>
          <div><p className="lbl">After · report and hope</p><ul>{["1930 helpline", "cybercrime.gov.in", "Chakshu reporting"].map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </Board>
    </>
  );
}

/* ───────────────────────── people & insights ───────────────────────── */

const CURVE = [["Unknown call", 0], ["Fear", -2], ["Isolation", -2.5], ["Urgency", -3], ["Payment", -1], ["Doubt", -2], ["Shame", -3.2], ["Late report", -2.4]];

const INSIGHTS = [
  ["Scams win by rushing", "Create a pause, only at risky moments"],
  ["Isolation is the weapon", "Make it easy to involve one trusted person"],
  ["Constant warnings get ignored", "Interrupt rarely, and explain why in plain words"],
  ["Shame delays reporting", "A calm, blame-free \"I think I've been scammed\" flow"],
  ["The first hour matters most", "Step by step: call 1930, block, report"],
];

function People() {
  const W = 1000, H = 220;
  const x = (i) => 40 + i * ((W - 80) / (CURVE.length - 1));
  const y = (v) => 24 + (-v / 3.4) * (H - 60);
  const d = CURVE.map(([, v], i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <>
      <Board id="people" tl={<>Who it's<br />for</>} tr="04" tone="rose" className="people">
        <figure className="person">
          <img src={`${P}sunita.webp`} alt="An older Indian woman in a floral sari, smiling" />
          <figcaption><b>Sunita, 66</b><span>Retired teacher · Pune</span><p>Uses UPI for groceries and her pension. Trusts anyone who sounds official. Would rather not "trouble" her son.</p></figcaption>
        </figure>
        <div className="people__link" aria-hidden="true"><span>trusted person</span></div>
        <figure className="person">
          <img src={`${P}rohan2.webp`} alt="A young man looking at his phone" />
          <figcaption><b>Rohan, 31</b><span>Her son · Bengaluru</span><p>Set up her phone. Worries about scam calls, but can't be there when one comes.</p></figcaption>
        </figure>
      </Board>

      <Board tl={<>Emotion<br />journey</>} tr="05" tone="light" className="journey">
        <p className="two-tone sm">The scam needs her alone and rushed. <span>Afterwards, shame keeps her quiet, which is why reports come late.</span></p>
        <div className="curve">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <path d={d} className="line" pathLength="1" />
            {CURVE.map(([, v], i) => <circle key={i} cx={x(i)} cy={y(v)} r="7" className={i === 4 ? "pay" : ""} />)}
          </svg>
          <ol>{CURVE.map(([t], i) => <li key={t} className={i === 4 ? "pay" : ""}>{t}</li>)}</ol>
          <div className="curve__tags"><span style={{ left: "20%" }}>Ruko pauses here</span><span style={{ left: "78%" }}>Recovery starts here</span></div>
        </div>
      </Board>

      <Board tl={<>Insights<br />→ moves</>} tr="06" tone="wine" className="moves">
        <ol>
          {INSIGHTS.map(([a, b], i) => (
            <li key={a} style={{ "--i": i }}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <p className="a">{a}</p>
              <ArrowRight size={18} />
              <p className="b">{b}</p>
            </li>
          ))}
        </ol>
      </Board>
    </>
  );
}

/* ───────────────────────── strategy ───────────────────────── */

const PRINCIPLES = [
  ["Invisible until it matters", "Most payments see nothing new."],
  ["Explain, never accuse", "Say what looks unusual, not \"you're being scammed\"."],
  ["The person decides", "Ruko flags. It never blocks on its own."],
  ["Never alone", "One tap to involve someone you trust."],
  ["No shame", "Recovery language is calm and blame-free."],
];

const SIGNALS = [[UserPlus, "A new payee"], [IndianRupee, "A large amount"], [PhoneIncoming, "Soon after an unknown call"], [ArrowDownLeft, "A \"collect\" request"], [Flag, "A payee others reported"]];

const TRADE = [
  ["When to interrupt", "Only on risky payments", "A warning on every payment", "Constant warnings get ignored."],
  ["How to interrupt", "A 10-second pause with reasons", "An \"Are you sure?\" pop-up", "People tap through generic pop-ups."],
  ["Who decides", "The person, with a trusted contact", "Auto-block by AI", "False blocks break trust and leave people stuck."],
  ["Tone", "Calm, specific, plain", "Red alarm screens", "Fear is what scammers already use."],
  ["After a scam", "A guided first-hour checklist", "A link to a reporting site", "In panic, people need the next step, not a form."],
];

function Strategy() {
  const [o, setO] = useState(0);
  return (
    <>
      <Board id="strategy" tl={<>How might<br />we</>} tr="07" tone="accent" className="hmw">
        <p className="two-tone inv">How might we help people stop and think at the exact moment a scam pushes them to pay, <span>without slowing down the thousands of normal payments they make?</span></p>
      </Board>

      <Board tl={<>Design<br />principles</>} tr="08" tone="light" className="principles">
        <ol>
          {PRINCIPLES.map(([t, d], i) => <li key={t} style={{ "--i": i }}><span>{i + 1}</span><b>{t}</b><p>{d}</p></li>)}
        </ol>
        <div className="ai">
          <div>
            <p className="lbl">Where AI fits</p>
            <p className="two-tone sm">AI notices. <span>People decide. It only watches for signals and explains them in plain words; two or more trigger a pause.</span></p>
          </div>
          <ul>{SIGNALS.map(([I, t]) => <li key={t}><I size={16} />{t}</li>)}</ul>
        </div>
      </Board>

      <Board tl={<>Trade-<br />offs</>} tr="09" tone="rose" className="trade">
        {TRADE.map(([q, yes, no, why], i) => (
          <button key={q} type="button" className={o === i ? "on" : ""} onClick={() => setO(i)} onMouseEnter={() => setO(i)}>
            <span className="q">{q}</span>
            <span className="yes"><Check size={15} strokeWidth={2.6} />{yes}</span>
            <span className="no"><X size={15} strokeWidth={2.6} />{no}</span>
            <span className="why">{why}</span>
          </button>
        ))}
        <p className="rejected"><b>Also rejected:</b> an AI chatbot that talks to the scammer (unpredictable) · call recording (privacy) · blocking all new payees (breaks normal life)</p>
      </Board>
    </>
  );
}

/* ───────────────────────── identity ───────────────────────── */

function Identity() {
  return (
    <>
      <Board id="identity" tl={<>Visual<br />identity</>} tr="10" tone="wine" className="logo">
        <div className="logo__lock"><Mark size={120} light /><span>ruko</span></div>
        <p className="logo__why">A pause inside a soft square. Calm, not alarming, because fear is the scammer's tool.</p>
      </Board>
      <div className="id-row" data-reveal>
        <div className="swatches">
          {[["#3B0D1A", "Wine", "light"], ["#E4364A", "Signal", "light"], ["#F7D9D6", "Blush", ""], ["#FBF6F4", "Paper", ""]].map(([c, n, l]) => (
            <div key={c} style={{ background: c }} className={l}><b>{n}</b><span>{c}</span></div>
          ))}
        </div>
        <div className="homescreen">
          <div className="apps">
            {["#2c2c2e", "#34c759", "#0a84ff", "#ff9f0a", "#5e5ce6", "#ff375f", "#64d2ff"].map((c, i) => <i key={i} style={{ background: c }} />)}
            <span className="ruko-icon"><Mark size={30} light /></span>
          </div>
          <p>Ruko sits beside her UPI app. It never needs to be opened to work.</p>
        </div>
        <div className="type">
          <p className="lbl">Typeface</p>
          <b>Aa</b>
          <p>Outfit · large, rounded, readable at a glance for older eyes</p>
        </div>
      </div>
    </>
  );
}

/* ───────────────────────── flow ───────────────────────── */

function Flow() {
  return (
    <Board id="flow" tl={<>User<br />flow</>} tr="11" tone="light" className="uflow">
      <svg viewBox="0 0 1000 420" preserveAspectRatio="none" className="uflow__svg" aria-hidden="true">
        <path d="M110 185 H250 M380 185 C425 185 425 71 470 71 M380 185 C425 185 425 307 470 307 M610 307 C635 307 635 210 660 210 M610 307 H660 M610 307 C635 307 635 391 660 391 M560 71 H860 M740 307 H860" />
      </svg>
      <div className="node" style={{ left: "3%", top: "44%" }}>Pay someone</div>
      <div className="node mid" style={{ left: "25%", top: "44%" }}>Ruko checks signals</div>
      <div className="node" style={{ left: "47%", top: "17%" }}>0–1 signal</div>
      <div className="node dark" style={{ left: "47%", top: "73%" }}>2+ signals: pause</div>
      <div className="node sm" style={{ left: "66%", top: "50%" }}>Call Rohan first</div>
      <div className="node sm" style={{ left: "66%", top: "73%" }}>Cancel</div>
      <div className="node sm ghost" style={{ left: "66%", top: "93%" }}>Pay anyway</div>
      <div className="node ok" style={{ left: "86%", top: "17%" }}>Paid as normal</div>
      <div className="node ok" style={{ left: "86%", top: "73%" }}>Money stays</div>
      <p className="uflow__note"><b>Separate entry:</b> "I think I've been scammed" → call 1930 → block → report → tell the bank</p>
    </Board>
  );
}

/* ───────────────────────── screens ───────────────────────── */

const SCREENS = [
  [PayScreen, "Normal payment", "Nothing added for everyday payments."],
  [PauseScreen, "Risk pause", "Three plain reasons, safest choice first."],
  [CollectScreen, "Collect decoder", "Money leaves. None arrives."],
  [TrustedScreen, "Trusted person", "A call-back nudge, nothing more."],
  [RecoverScreen, "First hour", "One calm step at a time."],
  [SettingsScreen, "Setup", "Trusted person, threshold, language."],
];

function Screens() {
  return (
    <Board id="screens" tl={<>Primary<br />screens</>} tr="12" tone="light" className="grid">
      <div className="tiles">
        {SCREENS.map(([S, t, d], i) => (
          <figure key={t} className={`tile ${i === 1 ? "dark" : ""}`} style={{ "--i": i }}>
            <figcaption><span>{i + 1}</span><b>{t}</b><em>{d}</em></figcaption>
            <div className="tile__ph"><S /></div>
          </figure>
        ))}
      </div>
    </Board>
  );
}

/* ───────────────────────── reflection ───────────────────────── */

function Reflect() {
  return (
    <>
      <Board id="reflect" tl={<>Design<br />process</>} tr="13" tone="rose" className="process">
        <ol>
          {[[Search, "Desk research"], [Users, "Personas & journey"], [Lightbulb, "Principles & trade-offs"], [PenTool, "Flow & wireframes"], [Smartphone, "UI & prototype"]].map(([I, t], i) => (
            <li key={t} style={{ "--i": i }}><span><I size={16} /></span>{t}</li>
          ))}
        </ol>
        <div className="targets">
          {[["Fewer", "risky payments completed after a pause"], ["< 1 hr", "from scam to report"], ["< 1 in 20", "normal payments interrupted"]].map(([n, d]) => <div key={d}><b>{n}</b><p>{d}</p></div>)}
        </div>
        <p className="lbl center">Targets, not results. Not tested yet.</p>
      </Board>

      <Board tl={<>If I did it<br />again</>} tr="14" tone="wine" className="again">
        <p className="two-tone inv">Talk to survivors first. <span>Desk research told me how scams work, not how they feel.</span> Test the pause wording with older users. <span>Work with a bank on which signals are realistic.</span></p>
        <div className="again__foot">
          <p><b>Now</b> test the wording with 5 parents · <b>Then</b> pilot the trusted-person check · <b>Later</b> UPI app and bank integration</p>
          <a href="/work/steadytrack/" className="rk-btn">Next: SteadyTrack <ArrowRight size={18} /></a>
        </div>
        <p className="src">Sources: <a href={IANS_LOSS} target="_blank" rel="noreferrer">IANS, citing I4C</a> · <a href={IANS_UPI} target="_blank" rel="noreferrer">IANS, Lok Sabha reply</a> · <a href={FOF} target="_blank" rel="noreferrer">Frank on Fraud</a></p>
      </Board>
    </>
  );
}
