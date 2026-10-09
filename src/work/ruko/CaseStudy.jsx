import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Check, X, UserPlus, IndianRupee, PhoneIncoming, ArrowDownLeft, Flag, Zap, Siren, EyeOff, ShieldCheck, Clock,
} from "lucide-react";
import { useActiveId, useRevealAll } from "../cosell/hooks.js";
import { PauseScreen, PayScreen, CollectScreen, TrustedScreen, RecoverScreen, SettingsScreen } from "./Screens.jsx";

const P = "/work/ruko/";
const IANS_LOSS = "https://ianslive.in/indians-lose-over-rs-52976-crore-to-cyber-frauds-over-six-years-report--20260103154943";
const IANS_UPI = "https://ianslive.in/upi-frauds-worth-rs-805-crore-witnessed-this-fiscal-so-far-minister--20251215175703";
const FOF = "https://frankonfraud.com/wp-content/uploads/2026/01/Digital-Arrest-Scams-Explained.pdf";

const SCENES = [
  ["cover", "Cover"],
  ["tension", "The tension"],
  ["problem", "The problem"],
  ["research", "Research"],
  ["people", "People & insights"],
  ["strategy", "Strategy"],
  ["signals", "Can it see this?"],
  ["solution", "The solution"],
  ["reflect", "Reflection"],
];

export default function CaseStudy() {
  useRevealAll();
  useProgress();
  const ids = useMemo(() => SCENES.map(([id]) => id), []);
  const active = useActiveId(ids, "-45% 0px -50% 0px");
  const idx = SCENES.findIndex(([id]) => id === active);
  return (
    <div className="st-shell">
      <div className="st-progress" aria-hidden="true" />
      <aside className="st-side">
        <a href="/#projects" className="st-side__back"><span aria-hidden="true">←</span> All work</a>
        <p className="st-side__proj rk-proj"><Mark size={18} /> Ruko</p>
        <nav aria-label="Case study sections">
          <ol>
            {SCENES.map(([id, label], i) => (
              <li key={id} className={i < idx ? "done" : ""}>
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined}><span className="n">{String(i + 1).padStart(2, "0")}</span>{label}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="rk-legend">
          <p className="k">Evidence key</p>
          <Tag kind="desk" /><Tag kind="archetype" /><Tag kind="assumption" /><Tag kind="untested" />
        </div>
      </aside>
      <nav className="st-chips" aria-label="Jump to section">
        {SCENES.map(([id, label], i) => <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}><span>{String(i + 1).padStart(2, "0")}</span> {label}</a>)}
      </nav>
      <main className="st">
        <Cover />
        <Scene id="tension" n="02" label="The tension"><Tension /></Scene>
        <Scene id="problem" n="03" label="The problem"><Problem /></Scene>
        <Scene id="research" n="04" label="Research"><Anatomy /><Gap /></Scene>
        <Scene id="people" n="05" label="People & insights"><People /><Journey /><Moves /></Scene>
        <Scene id="strategy" n="06" label="Strategy"><Hmw /><Principles /><Trade /></Scene>
        <Scene id="signals" n="07" label="Can it see this?"><Simulator /><Feasibility /></Scene>
        <Scene id="solution" n="08" label="The solution"><Flow /><Identity /></Scene>
        <Scene id="reflect" n="09" label="Reflection"><Reflect /></Scene>
      </main>
    </div>
  );
}

function useProgress() {
  useEffect(() => {
    const bar = document.querySelector(".st-progress");
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar?.style.setProperty("--p", String(h > 0 ? scrollY / h : 0));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
}

function Mark({ size = 40 }) {
  return <span className="mark" style={{ "--s": `${size}px` }} aria-hidden="true"><i /><i /></span>;
}

const TAGS = { desk: "Desk research", archetype: "Archetype", assumption: "Assumption", untested: "Target, not tested" };
function Tag({ kind }) {
  return <span className={`tag tag--${kind}`}>{TAGS[kind]}</span>;
}

function Scene({ id, n, label, children }) {
  return (
    <section id={id} className="sc">
      <header className="sc__top"><span>{n}</span><span>{label}</span></header>
      {children}
    </section>
  );
}

function Block({ className = "", children }) {
  return <div className={`blk ${className}`} data-reveal><div className="blk__in">{children}</div></div>;
}

function Lead({ k, tag, title, children }) {
  return (
    <div className="lead">
      <p className="k">{k}{tag && <Tag kind={tag} />}</p>
      <h2 className="sc__h">{title}</h2>
      {children && <p className="sc__p">{children}</p>}
    </div>
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
    <section id="cover" className="sc sc--cover">
      <header className="sc__top"><span>Ruko</span><span>Fintech · Trust & safety · UPI</span></header>
      <div className="cover">
        <div className="cover__copy">
          <p className="k">Case study 02 · Product design · Self-initiated</p>
          <h1>The right pause, <em>before</em> the money leaves</h1>
          <p>How much friction stops a scam without making everyday payments a chore? Ruko is a scam shield for UPI that pauses only when something looks wrong. "Ruko" is Hindi for "wait".</p>
        </div>
        <div className="cover__art rk-cover">
          <div className="beat" aria-hidden="true"><i /><i /><i /></div>
          <div className="rk-cover__back"><PayScreen /></div>
          <div className="rk-cover__front"><PauseScreen /></div>
          <span className="cover__chip"><i />Normal payment: nothing changes</span>
          <span className="cover__chip two"><i />Risky payment: a 10-second pause</span>
        </div>
      </div>
      <dl className="facts" data-reveal>
        {FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  );
}

/* ───────────────────────── tension: the friction dial ───────────────────────── */

const DIAL = [
  ["No friction", "Today's UPI", 0, 5, "Every payment is instant. So is every scam."],
  ["Warn every time", "\"Are you sure?\" on each payment", 100, 35, "People learn to tap through. By the scam, the warning is wallpaper."],
  ["Ruko", "Pause only when signals stack up", 6, 80, "Everyday payments stay instant. Risky ones get 10 seconds and a trusted person."],
  ["Block new payees", "Hard stop for anyone new", 30, 90, "Stops scams, but also the new plumber and the vegetable seller. People switch apps."],
];

function Tension() {
  const [d, setD] = useState(2);
  const [name, sub, annoy, catchRate, verdict] = DIAL[d];
  return (
    <Block className="dark">
      <Lead k="The core trade-off" title={<>Enough friction to stop a scam. <span>Not enough to annoy anyone.</span></>}>
        Every design choice in Ruko is a position on this dial. Try the four options.
      </Lead>
      <div className="dial">
        <div className="dial__track" role="radiogroup" aria-label="Friction level">
          {DIAL.map(([n], i) => (
            <button key={n} type="button" role="radio" aria-checked={d === i} className={d === i ? "on" : ""} onClick={() => setD(i)}>
              <i />{n}
            </button>
          ))}
          <span className="dial__thumb" style={{ "--x": d }} />
        </div>
        <div className="dial__out" key={d}>
          <div className="dial__name"><b>{name}</b><span>{sub}</span></div>
          <Meter label="Everyday payments interrupted" v={annoy} bad />
          <Meter label="Scam moments caught" v={catchRate} />
          <p className="dial__verdict">{verdict}</p>
        </div>
      </div>
      <p className="note">Illustrative positions from my reasoning, not measured data.</p>
    </Block>
  );
}

function Meter({ label, v, bad }) {
  const word = v === 0 ? "none" : v >= 100 ? "all" : v < 10 ? "rare" : v > 70 ? "most" : "some";
  return (
    <div className={`meter ${bad ? "bad" : ""}`}>
      <p><span>{label}</span><b>{word}</b></p>
      <i><i style={{ width: `${Math.max(v, 2)}%` }} /></i>
    </div>
  );
}

/* ───────────────────────── problem ───────────────────────── */

function Problem() {
  return (
    <>
      <Block>
        <Lead k="Why now" tag="desk" title={<>Payments got fast. <span>Scams got faster.</span></>}>
          UPI made paying anyone instant. Scammers use that speed: fake police calls, "refund" links, and "receive money" requests that actually take money.
        </Lead>
        <div className="rk-scene">
          <img src={`${P}call.webp`} alt="A young man frowning at his phone, hand on his forehead" />
          <div className="rk-scene__bubbles" aria-hidden="true">
            <p>"This is Mumbai Police. Your Aadhaar is linked to a crime."</p>
            <p>"Don't tell anyone. Stay on this call."</p>
            <p className="pay">"Transfer ₹49,000 now to clear your name."</p>
          </div>
        </div>
        <div className="rk-stats">
          <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="dark"><b>≈ ₹19,813 cr</b><span>lost to cyber fraud in India in calendar year 2025, across about 21.8 lakh complaints</span><em>I4C data via IANS, Jan 2026 ↗</em></a>
          <a href={IANS_UPI} target="_blank" rel="noreferrer"><b>10.64 lakh</b><span>UPI fraud incidents worth ₹805 crore in FY26, April to November 2025</span><em>MoS Finance, Lok Sabha, 15 Dec 2025 ↗</em></a>
          <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="accent"><b>8%</b><span>of 2025 cyber fraud losses came from "digital arrest" scams</span><em>I4C data via IANS ↗</em></a>
        </div>
      </Block>
      <Block>
        <div className="trio">
          {[[Zap, "What's fast", "One tap, money gone", "Payments finish in seconds, with no natural moment to stop."],
            [Siren, "What scammers use", "Panic and authority", "Fake police, bank or courier calls that demand action now."],
            [EyeOff, "What it costs", "Savings, and shame", "Many victims tell no one, which delays reporting."]].map(([I, k, t, d], i) => (
            <article key={t} className={i === 2 ? "dark" : ""} style={{ "--i": i }}>
              <span className="glyph"><I size={36} strokeWidth={1.6} /></span><p className="k">{k}</p><h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </Block>
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

function Anatomy() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x + 1) % ANATOMY.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <Block className="dark">
      <Lead k="How scams unfold" tag="desk" title={<>Anatomy of a <span>digital arrest</span> scam</>}>
        Sources: government data shared in Parliament, news reports, cybercrime advisories and victim stories on forums. I haven't interviewed anyone yet, and I say so wherever it matters.
      </Lead>
      <ol className="rk-anat">
        {ANATOMY.map(([t, d], i) => (
          <li key={t} className={s === i ? "on" : ""} onMouseEnter={() => setS(i)}>
            <span className="n">{i + 1}</span><b>{t}</b><p>{d}</p><i className="bar"><i /></i>
          </li>
        ))}
      </ol>
      <p className="rk-quote">One Mumbai senior sent <b>₹58 crore over 40 days</b>, in 27 transfers. <a href={FOF} target="_blank" rel="noreferrer">Frank on Fraud ↗</a></p>
    </Block>
  );
}

function Gap() {
  return (
    <Block>
      <Lead k="What already exists" tag="desk" title={<>Protection happens <span>before</span> or <span>after</span>. Never during.</>} />
      <div className="rk-gap">
        <div className="col"><p className="k">Inside the bank · invisible</p><ul>{["Device binding", "UPI PIN", "Daily limits", "NPCI's AI/ML fraud monitoring"].map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div className="col mid"><p className="k">At the moment of pressure</p><b>Nothing.</b><p>No one helps the person while a scammer is on the line.</p><span className="rk-pin"><Mark size={16} /> Where Ruko lives</span></div>
        <div className="col"><p className="k">After the loss · report and hope</p><ul>{["1930 helpline", "cybercrime.gov.in", "Chakshu for suspicious calls"].map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
    </Block>
  );
}

/* ───────────────────────── people ───────────────────────── */

function People() {
  return (
    <Block>
      <Lead k="Who it's for" tag="archetype" title={<>Two people, <span>one scam</span></>}>Composite archetypes drawn from victim stories and family accounts in news and forums, not interviews.</Lead>
      <div className="rk-people">
        <article>
          <img src={`${P}sunita.webp`} alt="An older Indian woman in a floral sari, smiling" />
          <div><h3>Sunita, 66</h3><p className="k">Retired teacher · Pune</p><p>Uses UPI for groceries and her pension. Trusts anyone who sounds official. Would rather not "trouble" her son.</p></div>
        </article>
        <span className="rk-link-line" aria-hidden="true"><em>trusted person</em></span>
        <article className="dark">
          <img src={`${P}rohan2.webp`} alt="A young man looking at his phone" />
          <div><h3>Rohan, 31</h3><p className="k">Her son · Bengaluru</p><p>Set up her phone. Worries about scam calls, but can't be there when one comes.</p></div>
        </article>
      </div>
    </Block>
  );
}

const CURVE = [["Unknown call", 0], ["Fear", -2], ["Isolation", -2.5], ["Urgency", -3], ["Payment", -1], ["Doubt", -2], ["Shame", -3.2], ["Late report", -2.4]];

function Journey() {
  const W = 1000, H = 220;
  const x = (i) => 40 + i * ((W - 80) / (CURVE.length - 1));
  const y = (v) => 24 + (-v / 3.4) * (H - 60);
  const d = CURVE.map(([, v], i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <Block className="tint">
      <Lead k="Emotion journey" tag="assumption" title={<>Every step pushes her <span>further from help</span></>}>Reconstructed from published victim accounts; the shape is my reading, not measured.</Lead>
      <div className="rk-curve">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path d={d} className="line" pathLength="1" />
          {CURVE.map(([, v], i) => <circle key={i} cx={x(i)} cy={y(v)} r="7" className={i === 4 ? "pay" : ""} />)}
        </svg>
        <ol>{CURVE.map(([t], i) => <li key={t} className={i === 4 ? "pay" : ""}>{t}</li>)}</ol>
        <div className="rk-curve__tags"><span style={{ left: "20%" }}>Ruko pauses here</span><span style={{ left: "78%" }}>Recovery starts here</span></div>
      </div>
    </Block>
  );
}

const INSIGHTS = [
  ["Scams win by rushing", "Create a pause, only at risky moments"],
  ["Isolation is the weapon", "Make it easy to involve one trusted person"],
  ["Constant warnings get ignored", "Interrupt rarely, and explain why in plain words"],
  ["Shame delays reporting", "A calm, blame-free \"I think I've been scammed\" flow"],
  ["The first hour matters most", "Step by step: call 1930, block, report"],
];

function Moves() {
  return (
    <Block>
      <Lead k="Insights" tag="desk" title={<>Five insights, <span>five design moves</span></>} />
      <ol className="decisions">
        {INSIGHTS.map(([a, b], i) => (
          <li key={a} style={{ "--i": i }}>
            <p className="heard"><span className="k">Insight {i + 1}</span>{a}</p>
            <i aria-hidden="true"><ArrowRight size={18} /></i>
            <p className="did"><span className="k">Design move</span>{b}</p>
            <span />
          </li>
        ))}
      </ol>
    </Block>
  );
}

/* ───────────────────────── strategy ───────────────────────── */

function Hmw() {
  return (
    <Block className="navy rk-hmwb">
      <p className="k">How might we</p>
      <p className="rk-hmw">help people <mark>stop and think</mark> at the exact moment a scam pushes them to pay, without slowing down the thousands of normal payments they make?</p>
    </Block>
  );
}

const PRINCIPLES = [
  ["Invisible until it matters", "Most payments see nothing new."],
  ["Explain, never accuse", "Say what looks unusual, not \"you're being scammed\"."],
  ["The person decides", "Ruko flags. It never blocks on its own."],
  ["Never alone", "One tap to involve someone you trust."],
  ["No shame", "Recovery language is calm and blame-free."],
];

function Principles() {
  return (
    <Block>
      <Lead k="Design principles" title={<>Five rules <span>every screen</span> had to pass</>} />
      <div className="principles five">
        {PRINCIPLES.map(([t, d], i) => <article key={t} style={{ "--i": i }}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></article>)}
      </div>
    </Block>
  );
}

const TRADE = [
  ["When to interrupt", "Only on risky payments", "A warning on every payment", "Constant warnings get ignored."],
  ["How to interrupt", "A 10-second pause with reasons", "An \"Are you sure?\" pop-up", "People tap through generic pop-ups."],
  ["Who decides", "The person, with a trusted contact", "Auto-block by AI", "False blocks break trust and leave people stuck."],
  ["Tone", "Calm, specific, plain", "Red alarm screens", "Fear is what scammers already use."],
  ["After a scam", "A guided first-hour checklist", "A link to a reporting site", "In panic, people need the next step, not a form."],
];

function Trade() {
  const [o, setO] = useState(0);
  return (
    <Block className="tint">
      <Lead k="Trade-offs" title={<>What I picked, and <span>what I gave up</span></>} />
      <div className="rk-trade">
        {TRADE.map(([q, yes, no, why], i) => (
          <button key={q} type="button" className={o === i ? "on" : ""} onClick={() => setO(i)} onMouseEnter={() => setO(i)}>
            <span className="q">{q}</span>
            <span className="yes"><Check size={15} strokeWidth={2.6} />{yes}</span>
            <span className="no"><X size={15} strokeWidth={2.6} />{no}</span>
            <span className="why">{why}</span>
          </button>
        ))}
      </div>
      <p className="rk-rej"><b>Also rejected:</b> an AI chatbot that talks to the scammer (unpredictable) · call recording (privacy) · blocking all new payees (breaks normal life)</p>
    </Block>
  );
}

/* ───────────────────────── signals: simulator + feasibility ───────────────────────── */

const SIGNALS = [
  ["payee", UserPlus, "A payee she's never paid", "Payment history in the UPI app", "today"],
  ["amount", IndianRupee, "Far above her usual amount", "Payment history in the UPI app", "today"],
  ["collect", ArrowDownLeft, "A \"collect\" request", "The request type is known to the app", "today"],
  ["reported", Flag, "A payee others have reported", "A shared fraud registry, via NPCI or banks", "partner"],
  ["call", PhoneIncoming, "She's on a call being told to pay", "One-tap self-report on the pay screen", "redesigned"],
];

const FEAS = {
  today: ["Feasible today", "ok"],
  partner: ["Needs a bank / NPCI partnership", "mid"],
  redesigned: ["Redesigned: apps can't read calls", "warn"],
};

function Simulator() {
  const [on, setOn] = useState({ payee: true, call: true });
  const active = SIGNALS.filter(([k]) => on[k]);
  const pause = active.length >= 2;
  return (
    <Block className="dark">
      <Lead k="Where AI fits" tag="assumption" title={<>AI notices. <span>People decide.</span></>}>
        Toggle the signals. One alone rarely means a scam; two or more trigger the pause. The threshold of two is my assumption, to be tuned with real data.
      </Lead>
      <div className="sim">
        <ul className="sim__list">
          {SIGNALS.map(([k, I, t]) => (
            <li key={k}>
              <button type="button" className={on[k] ? "on" : ""} aria-pressed={!!on[k]} onClick={() => setOn((s) => ({ ...s, [k]: !s[k] }))}>
                <I size={18} /><span>{t}</span><i className="sw" />
              </button>
            </li>
          ))}
        </ul>
        <div className={`sim__out ${pause ? "pause" : "ok"}`} key={pause ? "p" : "o"}>
          {pause ? <Clock size={28} /> : <ShieldCheck size={28} />}
          <b>{pause ? "Ruko pauses for 10 seconds" : "Payment goes through as normal"}</b>
          <p>{pause ? `Because: ${active.map(([, , t]) => t.toLowerCase()).join(" + ")}.` : active.length ? `One signal (${active[0][2].toLowerCase()}) isn't enough on its own.` : "Nothing unusual. Ruko stays invisible."}</p>
          <span>{active.length} / 5 signals</span>
        </div>
      </div>
    </Block>
  );
}

function Feasibility() {
  return (
    <Block>
      <Lead k="Feasibility" title={<>Could Ruko actually <span>see these signals?</span></>}>
        Not all of them. iOS gives apps no access to call history, and Android limits call-log access to the default phone app under Play policy. So "a recent unknown call" couldn't be detected silently. I redesigned it as a question she answers herself.
      </Lead>
      <div className="feas">
        {SIGNALS.map(([k, I, t, src, f]) => (
          <div key={k} className="feas__row">
            <span className="feas__sig"><I size={16} />{t}</span>
            <span className="feas__src">{src}</span>
            <span className={`feas__pill ${FEAS[f][1]}`}>{FEAS[f][0]}</span>
          </div>
        ))}
      </div>
      <p className="note">This also means Ruko works best built into a UPI app or a bank's app, not as a separate app watching others.</p>
    </Block>
  );
}

/* ───────────────────────── solution ───────────────────────── */

const FLOW = [
  [PayScreen, "Normal payment", "Looks exactly like today. Nothing added for everyday payments."],
  [PauseScreen, "Risk pause", "Three plain reasons, a short countdown, and the safest choice first."],
  [CollectScreen, "Collect decoder", "Says what a \"request\" really does: money leaves, none arrives."],
  [TrustedScreen, "Trusted person", "Rohan gets a call-back nudge. Nothing shared without her tap."],
  [RecoverScreen, "First hour", "\"I think I've been scammed\": one calm step at a time, 1930 first."],
  [SettingsScreen, "Setup", "Pick a trusted person, set the threshold, choose English or Hindi."],
];

function Flow() {
  const [s, setS] = useState(1);
  const Cur = FLOW[s][0];
  return (
    <Block className="tint">
      <Lead k="Screens" title={<>Six screens, <span>one calm flow</span></>}>Tap through. The pause counts down for real.</Lead>
      <div className="rk-flow">
        <ol className="rk-flow__list">
          {FLOW.map(([, t, d], i) => (
            <li key={t}><button type="button" className={s === i ? "on" : ""} onClick={() => setS(i)}><span className="n">{String(i + 1).padStart(2, "0")}</span><div><b>{t}</b><span>{d}</span></div></button></li>
          ))}
        </ol>
        <div className="rk-flow__stage" key={s}><Cur /></div>
      </div>
    </Block>
  );
}

function Identity() {
  return (
    <Block className="navy rk-id">
      <div className="rk-id__logo"><Mark size={92} /><span>ruko</span></div>
      <div className="rk-id__side">
        <p className="k">Identity</p>
        <p className="rk-id__why">A pause inside a soft square. Calm blues and mint, never alarm red, because fear is the scammer's tool.</p>
        <div className="rk-id__sw">
          {[["#0F1D33", "Night"], ["#3F6EA8", "Steel"], ["#B9ECD8", "Mint"], ["#EAF0F8", "Mist"]].map(([c, n]) => <span key={c} style={{ background: c }}><b>{n}</b>{c}</span>)}
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── reflection ───────────────────────── */

function Reflect() {
  return (
    <>
      <Block>
        <Lead k="How I'd know it works" tag="untested" title={<>Targets, <span>not results</span></>}>Nothing here has been measured. These are the bars I'd set for a first pilot.</Lead>
        <div className="rk-targets">
          {[["Fewer", "risky payments completed after a pause"], ["< 1 hr", "from scam to report"], ["< 1 in 20", "normal payments interrupted"]].map(([n, d]) => <div key={d}><b>{n}</b><p>{d}</p></div>)}
        </div>
      </Block>
      <Block className="dark">
        <h2 className="sc__h">If I did it <span>again.</span></h2>
        <div className="trio">
          {[["01", "Talk to survivors first", "Desk research told me how scams work, not how they feel. I'd speak to survivors and their families."],
            ["02", "Test the words", "The pause lives or dies on its wording. I'd test it with older users before anything else."],
            ["03", "Ground the signals", "Work with a bank on which signals are realistic, and how often they misfire."]].map(([n, t, d], i) => (
            <article key={t} style={{ "--i": i }}><span className="glyph">{n}</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
        <div className="next">
          <p><b>Now:</b> test the pause wording with 5 parents · <b>Then:</b> pilot the trusted-person check · <b>Later:</b> UPI app and bank integration</p>
          <a href="/work/steadytrack/" className="st-btn">Next: SteadyTrack <ArrowRight size={18} /></a>
        </div>
        <p className="team">Sources: <a href={IANS_LOSS} target="_blank" rel="noreferrer">IANS, citing I4C (Jan 2026)</a> · <a href={IANS_UPI} target="_blank" rel="noreferrer">IANS, Lok Sabha reply (Dec 2025)</a> · <a href={FOF} target="_blank" rel="noreferrer">Frank on Fraud</a></p>
      </Block>
    </>
  );
}
