import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Zap, Siren, EyeOff, Check, X, UserPlus, IndianRupee, PhoneIncoming, ArrowDownLeft, Flag } from "lucide-react";
import { useActiveId, useRevealAll } from "../cosell/hooks.js";
import { PauseScreen, PayScreen, CollectScreen, TrustedScreen, RecoverScreen, SettingsScreen } from "./Screens.jsx";

const IANS_LOSS = "https://ianslive.in/indians-lose-over-rs-52976-crore-to-cyber-frauds-over-six-years-report--20260103154943";
const IANS_UPI = "https://ianslive.in/upi-frauds-worth-rs-805-crore-witnessed-this-fiscal-so-far-minister--20251215175703";
const FOF = "https://frankonfraud.com/wp-content/uploads/2026/01/Digital-Arrest-Scams-Explained.pdf";

const SCENES = [
  ["cover", "Cover"],
  ["problem", "The problem"],
  ["research", "Research"],
  ["insights", "Insights"],
  ["define", "Define"],
  ["decisions", "Design decisions"],
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
        <p className="st-side__proj">UX case study</p>
        <nav aria-label="Case study sections">
          <ol>
            {SCENES.map(([id, label], i) => (
              <li key={id} className={i < idx ? "done" : ""}>
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>{label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <nav className="st-chips" aria-label="Jump to section">
        {SCENES.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
            <span>{String(i + 1).padStart(2, "0")}</span> {label}
          </a>
        ))}
      </nav>
      <main className="st">
        <Cover />
        <Scene id="problem" n="02" label="The problem"><Problem /></Scene>
        <Scene id="research" n="03" label="Research"><Anatomy /><Gap /></Scene>
        <Scene id="insights" n="04" label="Insights"><People /><Journey /><InsightList /></Scene>
        <Scene id="define" n="05" label="Define"><Hmw /><Principles /><Ai /></Scene>
        <Scene id="decisions" n="06" label="Design decisions"><Picked /><Rejected /></Scene>
        <Scene id="solution" n="07" label="The solution"><Flow /></Scene>
        <Scene id="reflect" n="08" label="Reflection"><Reflect /></Scene>
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

function Lead({ k, title, children }) {
  return (
    <div className="lead">
      {k && <p className="k">{k}</p>}
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
  ["Platform", "Mobile, inside the payment flow"],
  ["Focus", "Fraud prevention · Older users"],
  ["Tools", "Figma, Claude Code"],
];

function Cover() {
  return (
    <section id="cover" className="sc sc--cover">
      <header className="sc__top"><span>Ruko</span><span>Fintech · Trust & safety · UPI</span></header>
      <div className="cover">
        <p className="cover__word" aria-hidden="true">RUKO</p>
        <div className="cover__copy">
          <p className="k">Case study 02 · Product design · Self-initiated</p>
          <h1>The right pause, <em>before</em> the money leaves</h1>
          <p>Ruko (Hindi for "wait") is a scam shield for UPI. It slows people down only when something looks wrong, and guides them through the first hour if a scam has already happened.</p>
        </div>
        <div className="cover__art rk-cover">
          <div className="beat" aria-hidden="true"><i /><i /><i /></div>
          <div className="rk-cover__back"><PayScreen /></div>
          <div className="rk-cover__front"><PauseScreen /></div>
          <span className="cover__chip"><i />Paused · new payee + unknown call</span>
        </div>
      </div>
      <dl className="facts" data-reveal>
        {FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  );
}

/* ───────────────────────── problem ───────────────────────── */

function Problem() {
  return (
    <>
      <Block>
        <Lead title={<>Payments got fast. <span>Scams got faster.</span></>}>
          UPI made paying anyone instant. Scammers use that speed: fake police calls, "refund" links, and "receive money" requests that actually take money. Every one works the same way: create panic, then get the money moved before the person can think.
        </Lead>
        <div className="rk-stats">
          <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="dark">
            <b>₹19,813 cr</b><span>lost to cyber fraud in India in 2025, across about 21.8 lakh complaints</span><em>I4C via IANS ↗</em>
          </a>
          <a href={IANS_UPI} target="_blank" rel="noreferrer">
            <b>10.64 lakh</b><span>UPI fraud incidents worth ₹805 crore, April to November 2025</span><em>Lok Sabha via IANS ↗</em>
          </a>
          <a href={IANS_LOSS} target="_blank" rel="noreferrer" className="warm">
            <b>8%</b><span>of 2025 losses came from "digital arrest" scams alone</span><em>I4C via IANS ↗</em>
          </a>
        </div>
      </Block>
      <Block>
        <div className="trio">
          {[
            [Zap, "What's fast", "One tap, money gone", "Payments finish in seconds, with no natural moment to stop."],
            [Siren, "What scammers use", "Panic and authority", "Fake police, bank or courier calls that demand action now."],
            [EyeOff, "What it costs", "Savings, and shame", "Many victims tell no one, which delays reporting."],
          ].map(([I, k, t, d], i) => (
            <article key={t} className={i === 2 ? "dark" : ""} style={{ "--i": i }}>
              <span className="glyph"><I size={40} strokeWidth={1.6} /></span>
              <p className="k">{k}</p><h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </Block>
    </>
  );
}

/* ───────────────────────── research ───────────────────────── */

const ANATOMY = [
  ["The call", "A call or video call from someone posing as police, a court or an embassy."],
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
      <Lead k="Desk research" title={<>Anatomy of a <span>digital arrest</span> scam</>}>
        I studied government data shared in Parliament, news reports, cybercrime advisories and victim stories on forums. No interviews yet; that's the first thing I'd change.
      </Lead>
      <ol className="rk-anat">
        {ANATOMY.map(([t, d], i) => (
          <li key={t} className={s === i ? "on" : ""} onMouseEnter={() => setS(i)}>
            <span className="n">{i + 1}</span><b>{t}</b><p>{d}</p>
            <i className="bar"><i /></i>
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
      <Lead k="What already exists" title={<>Protection happens <span>before</span> or <span>after</span>. Never during.</>} />
      <div className="rk-gap">
        <div className="col">
          <p className="k">Inside the bank · invisible</p>
          <ul>{["Device binding", "UPI PIN", "Daily limits", "NPCI's AI fraud monitoring"].map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="col mid">
          <p className="k">At the moment of pressure</p>
          <b>Nothing.</b>
          <p>No one helps the person while a scammer is on the line.</p>
          <span className="rk-pin">Where Ruko lives</span>
        </div>
        <div className="col">
          <p className="k">After the loss · report and hope</p>
          <ul>{["1930 helpline", "cybercrime.gov.in", "Chakshu for suspicious calls"].map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── insights ───────────────────────── */

function People() {
  return (
    <Block>
      <Lead k="Who it's for" title={<>Two people, <span>one scam</span></>}>Archetypes built from victim stories and family accounts.</Lead>
      <div className="rk-people">
        <article>
          <span className="rk-av lg">S</span>
          <div>
            <h3>Sunita, 58</h3><p className="k">Retired teacher · Pune</p>
            <p>Uses UPI for groceries and her pension. Trusts anyone who sounds official. Would rather not "trouble" her son.</p>
          </div>
        </article>
        <span className="rk-link-line" aria-hidden="true" />
        <article className="dark">
          <span className="rk-av lg alt">R</span>
          <div>
            <h3>Rohan, 31</h3><p className="k">Her son · Bengaluru</p>
            <p>Set up her phone. Worries about scam calls, but can't be there when one comes.</p>
          </div>
        </article>
      </div>
    </Block>
  );
}

const CURVE = [
  ["Unknown call", 0], ["Fear", -2], ["Isolation", -2.5], ["Urgency", -3], ["Payment", -1], ["Doubt", -2], ["Shame", -3.2], ["Late report", -2.4],
];

function Journey() {
  const W = 1000, H = 240;
  const x = (i) => 40 + i * ((W - 80) / (CURVE.length - 1));
  const y = (v) => 30 + (-v / 3.4) * (H - 70);
  const d = CURVE.map(([, v], i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <Block className="tint">
      <Lead k="Emotion journey" title={<>Every step pushes her <span>further from help</span></>}>
        The scam needs her alone and rushed. After it, shame keeps her quiet, which is why most reports come late.
      </Lead>
      <div className="rk-curve">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path d={d} className="line" pathLength="1" />
          {CURVE.map(([, v], i) => <circle key={i} cx={x(i)} cy={y(v)} r="7" className={i === 4 ? "pay" : ""} />)}
        </svg>
        <ol>{CURVE.map(([t], i) => <li key={t} className={i === 4 ? "pay" : ""}>{t}</li>)}</ol>
        <div className="rk-curve__tags">
          <span style={{ left: "20%" }}>Ruko's pause goes here</span>
          <span style={{ left: "78%" }}>Recovery goes here</span>
        </div>
      </div>
    </Block>
  );
}

const INSIGHTS = [
  ["Scams win by rushing", "Create a pause, only at risky moments"],
  ["Isolation is the weapon", "Make it easy to involve one trusted person"],
  ["Warnings are ignored when everything is a warning", "Interrupt rarely, and explain why in plain words"],
  ["Shame delays reporting", "A calm, blame-free \"I think I've been scammed\" flow"],
  ["The first hour matters most", "Step-by-step recovery: call 1930, block, report"],
];

function InsightList() {
  return (
    <Block>
      <Lead k="Insights" title={<>Five insights, <span>five design moves</span></>} />
      <ol className="decisions">
        {INSIGHTS.map(([a, b], i) => (
          <li key={a} style={{ "--i": i }}>
            <p className="heard"><span className="k">Insight {i + 1}</span>{a}</p>
            <i aria-hidden="true"><ArrowRight size={18} /></i>
            <p className="did"><span className="k">Opportunity</span>{b}</p>
            <span />
          </li>
        ))}
      </ol>
    </Block>
  );
}

/* ───────────────────────── define ───────────────────────── */

function Hmw() {
  return (
    <Block className="dark">
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

const SIGNALS = [
  [UserPlus, "A new payee"], [IndianRupee, "A large amount"], [PhoneIncoming, "Soon after an unknown call"],
  [ArrowDownLeft, "A \"collect\" request"], [Flag, "A payee others reported"],
];

function Ai() {
  return (
    <Block className="tint">
      <div className="split">
        <Lead k="Where AI fits" title={<>AI notices. <span>People decide.</span></>}>
          AI only watches for signals and explains them in plain words. It never blocks, never talks to the scammer, never makes the call. One signal alone rarely triggers a pause; together they do.
        </Lead>
        <ul className="rk-signals">
          {SIGNALS.map(([I, t], i) => <li key={t} style={{ "--i": i }}><I size={18} />{t}</li>)}
          <li className="sum">2+ signals → a 10-second pause</li>
        </ul>
      </div>
    </Block>
  );
}

/* ───────────────────────── decisions ───────────────────────── */

const PICKED = [
  ["When to interrupt", "Only on risky payments", "A warning on every payment", "Constant warnings get ignored."],
  ["How to interrupt", "A 10-second pause with reasons", "An \"Are you sure?\" pop-up", "People tap through generic pop-ups."],
  ["Who decides", "The person, with a trusted contact", "Auto-block by AI", "False blocks break trust and leave people stuck."],
  ["Tone", "Calm, specific, plain", "Red alarm screens", "Fear is what scammers already use."],
  ["After a scam", "A guided first-hour checklist", "A link to a reporting site", "In panic, people need the next step, not a form."],
];

function Picked() {
  const [o, setO] = useState(0);
  return (
    <Block>
      <Lead k="Trade-offs" title={<>What I picked, and <span>what I gave up</span></>} />
      <div className="rk-trade">
        {PICKED.map(([q, yes, no, why], i) => (
          <button key={q} type="button" className={o === i ? "on" : ""} onClick={() => setO(i)} onMouseEnter={() => setO(i)}>
            <span className="q">{q}</span>
            <span className="yes"><Check size={15} strokeWidth={2.6} />{yes}</span>
            <span className="no"><X size={15} strokeWidth={2.6} />{no}</span>
            <span className="why">{why}</span>
          </button>
        ))}
      </div>
    </Block>
  );
}

function Rejected() {
  return (
    <Block className="dark">
      <Lead k="Ideas I rejected" title={<>Clever, but <span>wrong for her</span></>} />
      <div className="trio">
        {[
          ["An AI chatbot that talks to the scammer", "Risky and unpredictable, on the most stressful call of her life."],
          ["Call recording and analysis", "Too invasive. Privacy matters most to the people we're protecting."],
          ["Fully blocking new payees", "Breaks normal life: the new plumber, the new vegetable seller."],
        ].map(([t, d], i) => (
          <article key={t} style={{ "--i": i }}><span className="glyph"><X size={32} /></span><h3>{t}</h3><p>{d}</p></article>
        ))}
      </div>
    </Block>
  );
}

/* ───────────────────────── solution ───────────────────────── */

const FLOW = [
  [PayScreen, "Normal payment", "Looks exactly like today. Nothing added for the thousands of everyday payments."],
  [PauseScreen, "Risk pause", "Three reasons in plain words, a short countdown, and the safest choice first."],
  [CollectScreen, "Collect decoder", "Says what a \"request\" really does: money leaves, none arrives."],
  [TrustedScreen, "Trusted person", "Rohan gets a simple call-back nudge. Nothing shared without her tap."],
  [RecoverScreen, "First hour", "\"I think I've been scammed\": one calm step at a time, 1930 first."],
  [SettingsScreen, "Setup", "Pick a trusted person, set the threshold, choose English or Hindi."],
];

function Flow() {
  const [s, setS] = useState(1);
  const Cur = FLOW[s][0];
  return (
    <Block className="tint">
      <Lead k="Screens" title={<>Six screens, <span>one calm flow</span></>}>Tap through. The pause screen counts down for real.</Lead>
      <div className="rk-flow">
        <ol className="rk-flow__list">
          {FLOW.map(([, t, d], i) => (
            <li key={t}>
              <button type="button" className={s === i ? "on" : ""} onClick={() => setS(i)}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div><b>{t}</b><span>{d}</span></div>
              </button>
            </li>
          ))}
        </ol>
        <div className="rk-flow__stage" key={s}><Cur /></div>
      </div>
    </Block>
  );
}

/* ───────────────────────── reflection ───────────────────────── */

function Reflect() {
  return (
    <>
      <Block>
        <Lead k="How I'd know it works" title={<>Targets, <span>not results</span></>} />
        <div className="rk-targets">
          {[["Fewer", "risky payments completed after a pause"], ["< 1 hr", "from scam to report"], ["< 1 in 20", "normal payments interrupted"]].map(([n, d]) => (
            <div key={d}><b>{n}</b><p>{d}</p></div>
          ))}
        </div>
      </Block>
      <Block className="dark">
        <h2 className="sc__h">If I did it <span>again.</span></h2>
        <div className="trio">
          {[
            ["01", "Talk to survivors first", "Desk research told me how scams work, not how they feel. I'd speak to survivors and their families."],
            ["02", "Test the words", "The pause lives or dies on its wording. I'd test it with older users."],
            ["03", "Ground the signals", "Work with a bank on which signals are realistic to detect."],
          ].map(([n, t, d], i) => <article key={t} style={{ "--i": i }}><span className="glyph">{n}</span><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="next">
          <p><b>Now:</b> test the pause wording with 5 parents · <b>Then:</b> pilot the trusted-person check · <b>Later:</b> UPI app and bank integration</p>
          <a href="/work/steadytrack/" className="st-btn">Next: SteadyTrack <ArrowRight size={18} /></a>
        </div>
        <p className="team">
          Sources: <a href={IANS_LOSS} target="_blank" rel="noreferrer">IANS, citing I4C</a> · <a href={IANS_UPI} target="_blank" rel="noreferrer">IANS, Lok Sabha reply</a> · <a href={FOF} target="_blank" rel="noreferrer">Frank on Fraud</a>
        </p>
      </Block>
    </>
  );
}
