import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, Activity, Hand, Vibrate, Lightbulb, Power, Gauge, Smartphone, Check, X, Users, HeartHandshake,
  Stethoscope, BookOpen, Map, Layers, Target,
} from "lucide-react";
import { useActiveId, useRevealAll } from "../cosell/hooks.js";
import AppScreens, { SessionScreen } from "./AppScreens.jsx";

const A = "/work/steadytrack/";
const RENDER = `${A}renders/`;

const SCENES = [
  ["cover", "Cover"],
  ["problem", "The problem"],
  ["research", "Research"],
  ["insights", "Insights"],
  ["define", "Define"],
  ["design", "Design decisions"],
  ["experience", "The experience"],
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
        <nav aria-label="Case study scenes">
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
      <nav className="st-chips" aria-label="Jump to scene">
        {SCENES.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
            <span>{String(i + 1).padStart(2, "0")}</span> {label}
          </a>
        ))}
      </nav>
      <main className="st">
        <Cover />
        <Scene id="problem" n="02" label="The problem"><Problem /><Condition /></Scene>
        <Scene id="research" n="03" label="Research"><Research /><Desk /><Stakeholders /><Models /></Scene>
        <Scene id="insights" n="04" label="Insights"><Heard /><Synth /><Person /></Scene>
        <Scene id="define" n="05" label="Define"><Areas /><Root /><Principles /></Scene>
        <Scene id="design" n="06" label="Design decisions"><Ideas /><Decisions /><Glove /></Scene>
        <Scene id="experience" n="07" label="The experience"><Wear /><Session /><AppBlock /><Challenges /></Scene>
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

/** A generated concept render, falling back to a real asset until the file exists. */
function Render({ name, fallback, alt, className = "" }) {
  const [src, setSrc] = useState(`${RENDER}${name}`);
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => fallback && src !== fallback && setSrc(fallback)} />;
}

function Scene({ id, n, label, children }) {
  return (
    <section id={id} className="sc">
      <header className="sc__top"><span>{n}</span><span>{label}</span></header>
      {children}
    </section>
  );
}

/** One beat inside a scene; tinted, navy or dark blocks render as panels. */
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

/* ───────────────────────── 01 cover ───────────────────────── */

const FACTS = [
  ["Role", "UX research, product design"],
  ["Team", "Group project"],
  ["Type", "Academic project"],
  ["Organisation", "MIT Institute of Design"],
  ["Timeline", "2 weeks · April 2025"],
  ["Tools", "Figma, FigJam"],
];

function Cover() {
  return (
    <section id="cover" className="sc sc--cover">
      <header className="sc__top"><span>SteadyTrack</span><span>Wearables · Accessibility · Healthcare</span></header>
      <div className="cover">
        <p className="cover__word" aria-hidden="true">STEADY</p>
        <div className="cover__art">
          <div className="beat" aria-hidden="true"><i /><i /><i /></div>
          <Render name="hero-hand.jpg" fallback={`${A}glove-photo.webp`} alt="The SteadyTrack smart glove on an older hand" className="cover__glove" />
          <div className="cover__phone"><SessionScreen /></div>
          <span className="cover__chip"><i />On the beat · 12 of 15</span>
        </div>
        <div className="cover__copy">
          <h1>Therapy that <em>keeps time</em> with you</h1>
          <p>A smart glove and app that turn daily hand exercises for Parkinson's into guided, rhythmic practice at home.</p>
        </div>
      </div>
      <dl className="facts" data-reveal>
        {FACTS.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </section>
  );
}

/* ───────────────────────── 02 problem ───────────────────────── */

function Problem() {
  return (
    <Block className="">
      <h2 className="sc__h">Therapy works. <span>Only if people keep doing it.</span></h2>
      <div className="trio">
        {[
          ["What's hard", "Hands that don't cooperate", "Tremor, stiffness and slowness turn eating, dressing and writing into work.", "~"],
          ["What's missing", "No one there at home", "Physios see patients rarely. Families aren't trained.", "∅"],
          ["What it costs", "Practice quietly stops", "Without structure or feedback, motivation fades.", "↓"],
        ].map(([k, t, d, g], i) => (
          <article key={t} className={i === 2 ? "dark" : ""} style={{ "--i": i }}>
            <span className="glyph">{g}</span>
            <p className="k">{k}</p>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <p className="banner">The tension: <b>therapy is repetitive</b> · <b>and nobody is watching</b></p>
    </Block>
  );
}

/* ───────────────────────── 03 condition ───────────────────────── */

const STAGES = [
  ["Tremor on one side. Often mistaken for ageing.", "Daily life unaffected"],
  ["Both sides affected. Mask-like face.", "Daily tasks get harder"],
  ["Balance goes. Falls become common.", "Activities restricted"],
  ["Needs a cane or walker.", "Can't live alone"],
  ["Can't stand or walk unaided.", "Round-the-clock care"],
];

function Condition() {
  const [s, setS] = useState(1);
  return (
    <Block className="tint">
      <div className="split">
        <div>
          <h2 className="sc__h">Incurable doesn't mean <span>hopeless.</span></h2>
          <p className="sc__p">Parkinson's cuts dopamine, so the brain's instructions struggle to reach the body. Hover a hand to see each stage.</p>
          <div className="stage-read" key={s}>
            <p className="k">Stage {s + 1} of 5</p>
            <p className="big">{STAGES[s][0]}</p>
            <p className="tag">{STAGES[s][1]}</p>
          </div>
        </div>
        <div className="hands">
          {STAGES.map((_, i) => (
            <button key={i} type="button" className={s === i ? "on" : ""} style={{ "--amp": `${(i + 1) * 0.7}px`, "--spd": `${240 - i * 25}ms` }} onMouseEnter={() => setS(i)} onClick={() => setS(i)} aria-pressed={s === i}>
              <img src={`${A}hand-${i + 1}.webp`} alt="" />
              <span>{i + 1}</span>
            </button>
          ))}
          <p className="focus">We focused on stages 2–3: still at home, still independent.</p>
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── 04 research ───────────────────────── */

const GROUPS = [
  [5, "Patients", Users, "p"],
  [4, "Caregivers", HeartHandshake, "c"],
  [3, "Doctors", Stethoscope, "d"],
  [3, "Physios", Activity, "t"],
];

function Research() {
  const dots = GROUPS.flatMap(([n, , , c]) => Array.from({ length: n }, () => c));
  return (
    <Block className="">
      <div className="bento">
        <article className="b-big dark">
          <p className="pill">Primary research</p>
          <p className="num"><Count to={15} /><span>interviews</span></p>
          <div className="dots" aria-hidden="true">{dots.map((c, i) => <i key={i} className={c} style={{ "--i": i }} />)}</div>
          <ul className="legend">{GROUPS.map(([n, t, I, c]) => <li key={t} className={c}><I size={15} />{n} {t}</li>)}</ul>
        </article>
        <article className="b-mid">
          <h2 className="sc__h small">We talked to everyone <span>around</span> the condition.</h2>
          <ol className="method">
            {[[BookOpen, "Desk study"], [Map, "Stakeholder map"], [Layers, "Flow, cultural & sequence models"], [Target, "Affinity, empathy maps, 5 Whys"]].map(([I, t], i) => (
              <li key={t} style={{ "--i": i }}><I size={16} />{t}</li>
            ))}
          </ol>
        </article>
        <article className="b-img">
          <img src={`${A}model-cultural.webp`} alt="Our cultural model" loading="lazy" />
          <p>Cultural model</p>
        </article>
        <article className="b-stat amber">
          <p className="num">6</p>
          <p>desk-study themes, from late diagnosis to the pull of dance and community</p>
        </article>
      </div>
    </Block>
  );
}

function Count({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1200);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <b ref={ref}>{n}</b>;
}

/* ───────────────────────── 05 heard ───────────────────────── */

const HEARD = [
  ["Assistive devices carry stigma.", "Most used nothing beyond a pill organiser."],
  ["Care isn't tailored.", "Support isn't fitted to each person or stage."],
  ["Movement and familiarity motivate.", "Physios see more effort when therapy feels familiar."],
  ["Doctors hear a filtered story.", "Rare visits mean caregivers report, patients under-report."],
];

function Heard() {
  const [k, setK] = useState(2);
  return (
    <Block className="dark">
      <div className="heard">
        <p className="heard__word" aria-hidden="true">HEARD</p>
        <ol>
          {HEARD.map(([t, d], i) => (
            <li key={t} className={k === i ? "on" : ""} onMouseEnter={() => setK(i)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="t">{t}</p>
                <p className="d">{d}</p>
              </div>
              {i === 2 && <span className="pin">Our design driver</span>}
            </li>
          ))}
        </ol>
      </div>
    </Block>
  );
}

/* ───────────────────────── 06 person ───────────────────────── */

function Person() {
  return (
    <Block className="">
      <div className="person">
        <div className="person__img">
          <img src={`${A}meena.webp`} alt="An older Indian woman in glasses and a sari, smiling" loading="lazy" />
        </div>
        <div className="person__copy">
          <p className="k">Shanta Aaji · 73 · retired schoolteacher</p>
          <h2 className="sc__h">"I just want my hands to <span>listen to me</span> again."</h2>
          <div className="person__cards">
            <div><p className="k">Her day</p><p>Medication on a strict clock. Exercises when she remembers.</p></div>
            <div><p className="k">Frustrates her</p><p>Shaky hands at meals, and exercises that feel pointless.</p></div>
            <div className="amber"><p className="k">Wants</p><p>To stay active, independent, close to her grandchildren.</p></div>
          </div>
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── 07 root ───────────────────────── */

const WHYS = [
  "Why do therapy tools miss creative activities?",
  "Why do sessions feel like chores?",
  "Why isn't rhythm or music part of plans?",
  "Why is the whole person ignored?",
];

function Root() {
  return (
    <Block className="tint">
      <div className="split">
        <ol className="whys">
          {WHYS.map((q, i) => <li key={q} style={{ "--i": i }}><span>Why {i + 1}</span>{q}</li>)}
          <li className="root" style={{ "--i": 4 }}><span>Why 5 · the root</span>Therapy is designed around the disease, not the person.</li>
        </ol>
        <div className="statement">
          <p className="k">Problem statement</p>
          <p className="big">Therapy tools overlook <mark>creative, dual-task</mark> activities, so motivation drops and progress stalls.</p>
          <p className="hmw"><b>How might we</b> make daily hand therapy something people <i>want</i> to do, and can do well alone?</p>
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── 08 ideas ───────────────────────── */

const CONCEPTS = [
  ["StoryMotion", "Too much talking, too little hand"],
  ["Dance-based", "No fine-motor focus, no feedback"],
  ["Board game", "Fun, but not daily or solo"],
  ["Therapy kit", "Creative, but no path to improve"],
];

function Ideas() {
  return (
    <Block className="">
      <div className="funnel" aria-hidden="true">
        <div><b>40</b>ideas</div><div><b>5</b>concepts</div><div><b>1</b>glove</div>
      </div>
      <div className="ideas">
        {CONCEPTS.map(([t, d], i) => (
          <article key={t} style={{ "--i": i, "--r": `${[-7, 5, -4, 6][i]}deg` }}>
            <p className="tag"><X size={13} strokeWidth={2.5} /> Dropped</p>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
        <article className="win">
          <p className="tag"><Check size={13} strokeWidth={2.5} /> Picked</p>
          <h3>Smart glove + app</h3>
          <p>Fine-motor focus, instant feedback, daily and solo.</p>
        </article>
      </div>
      <p className="banner">Hardest call: <b>dropping the therapy kit</b> we'd built furthest. Creative, but nobody could see themselves improving.</p>
    </Block>
  );
}

/* ───────────────────────── 09 glove ───────────────────────── */

const PARTS = [
  [Activity, "Motion sensors", "Range and speed of each movement", 43, 11],
  [Hand, "Pressure pads", "Grip strength", 33, 41],
  [Lightbulb, "LED band", "Lights the next movement", 49, 21],
  [Vibrate, "Haptic beat", "A rhythm to move with", 46, 55],
  [Power, "One big button", "Found without looking", 56, 38],
  [Gauge, "Magnetic cuff", "Closes one-handed", 57, 77],
];

function Glove() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setP((x) => (x + 1) % PARTS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <Block className="navy">
      <div className="glove">
        <div className="glove__copy">
          <h2 className="sc__h">Sportswear outside. <span>A physio inside.</span></h2>
          <p className="sc__p">Stigma was the first thing we heard, so it had to pass as gym gear.</p>
          <ol>
            {PARTS.map(([I, t, d], i) => (
              <li key={t} className={p === i ? "on" : ""} onMouseEnter={() => setP(i)}>
                <I size={18} /><b>{t}</b><span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="glove__art">
          <div className="beat" aria-hidden="true"><i /><i /><i /></div>
          <Render name="float.jpg" fallback={`${A}glove-photo.webp`} alt="The SteadyTrack glove" />
          {PARTS.map(([, t, , x, y], i) => (
            <button key={t} type="button" className={`hot ${p === i ? "on" : ""}`} style={{ left: `${x}%`, top: `${y}%` }} onMouseEnter={() => setP(i)} onClick={() => setP(i)} aria-label={t}>{i + 1}</button>
          ))}
        </div>
      </div>
      <div className="glove__more">
        <figure className="exploded">
          <Render name="exploded.jpg" alt="Exploded view: knit shell, pressure pads, LED band, vibration motor, electronics pod with battery, magnetic wrist cuff and pull loop" />
          <figcaption><b>Inside the glove</b>Knit shell · pressure pads · LED band · vibration motor · pod and battery · magnetic cuff</figcaption>
        </figure>
        <figure className="macro">
          <Render name="button.jpg" alt="A finger pressing the single raised button on the glove's pod" />
          <figcaption><b>One raised button</b>Big enough to find with a shaky finger, without looking.</figcaption>
        </figure>
      </div>
      <Compare />
      <p className="note">Product shots are concept renders of our final design. The slider shows the prototype we actually built.</p>
    </Block>
  );
}

function Compare() {
  const [v, setV] = useState(55);
  return (
    <div className="compare" style={{ "--v": `${v}%` }}>
      <img className="photo" src={`${A}glove-photo.webp`} alt="Our working prototype on a hand" loading="lazy" />
      <div className="sketch"><img src={`${A}glove-sketch.webp`} alt="Our first sketch of the glove" loading="lazy" /></div>
      <span className="lab l">First sketch</span><span className="lab r">Working prototype</span>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label="Drag to compare our sketch with the prototype" />
      <span className="handle" aria-hidden="true">⟷</span>
    </div>
  );
}

/* ───────────────────────── 10 wear ───────────────────────── */

const WEAR = [
  ["wear-1.jpg", "Slide in", "Wide opening, free fingertips."],
  ["wear-2.jpg", "Pull the loop", "A loose grip, not a pinch."],
  ["wear-3.jpg", "Clasp and go", "The magnet finds its own place."],
];

function Wear() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setW((x) => (x + 1) % WEAR.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <Block className="">
      <div className="wear">
        <div className="wear__stage">
          {WEAR.map(([img, t], i) => (
            <Render key={img} name={img} fallback={`${A}glove-photo.webp`} alt={t} className={w === i ? "on" : ""} />
          ))}
          <span className="wear__count">{w + 1} / 3</span>
        </div>
        <div className="wear__copy">
          <h2 className="sc__h">On with <span>one hand.</span></h2>
          <p className="sc__p">Fiddly fastenings are the first reason people quit a wearable. So putting it on got designed too.</p>
          <ol>
            {WEAR.map(([, t, d], i) => (
              <li key={t} className={w === i ? "on" : ""}>
                <button type="button" onClick={() => setW(i)}><b>{i + 1}. {t}</b><span>{d}</span></button>
                <i className="track"><i /></i>
              </li>
            ))}
          </ol>
          <Render name="sizes.jpg" fallback={`${A}glove-sketch.webp`} alt="The glove in sizes S, M and L" className="wear__sizes" />
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── 11 session ───────────────────────── */

const SESSION = [
  [Hand, "Put it on"],
  [Smartphone, "Start today's plan"],
  [Vibrate, "Move with the beat"],
  [Check, "See it worked"],
];

function Session() {
  return (
    <Block className="">
      <div className="session">
        <div className="session__photo">
          <Render name="at-home.jpg" fallback={`${A}hero-glove-app.webp`} alt="An older man at his dining table following a session with the glove" />
          <ol>
            {SESSION.map(([I, t], i) => <li key={t} style={{ "--i": i }}><I size={16} />{t}</li>)}
          </ol>
        </div>
      </div>
    </Block>
  );
}

/* ───────────────────────── 12 reflect ───────────────────────── */

function Reflect() {
  return (
    <Block className="dark">
      <h2 className="sc__h">If I did it <span>again.</span></h2>
      <div className="trio">
        {[
          ["01", "Careful with claims", "We said it \"reduces tremors\". It cues and tracks; we never tested a medical effect."],
          ["02", "Physios in week one", "Our sharpest experts only saw the final idea."],
          ["03", "Tremor-first app", "56px targets, 18px+ text, taps not swipes."],
        ].map(([n, t, d], i) => (
          <article key={t} style={{ "--i": i }}><span className="glyph">{n}</span><h3>{t}</h3><p>{d}</p></article>
        ))}
      </div>
      <div className="next">
        <p><b>Next:</b> a 2-week home trial with 3 to 5 patients and their physio.</p>
        <a href="/work/cosell/" className="st-btn">Next case study: CoSell <ArrowRight size={18} /></a>
      </div>
      <p className="team">Team: Anoushka D., Anoushka R., Harshita, Padmashree, Riya, Rucha, Siddhikka, Suhani R., Tanushree · Mentor: Shrikant Ekbote</p>
    </Block>
  );
}

/* ───────────────────────── added depth ───────────────────────── */

const DESK = [
  ["Early signs hide in plain sight", "Tremor and slowness are mistaken for ageing, so diagnosis comes late."],
  ["Care is far away", "Specialists sit in cities. Outside them, low awareness delays treatment."],
  ["Treatment drains people", "Medication and therapy help, but bring side effects and emotional fatigue."],
  ["Independence erodes", "Daily tasks get harder, and slow progress makes motivation hard to hold."],
  ["Caregivers carry it", "Family takes on the physical and emotional load, untrained."],
  ["Movement and culture help", "Dance and community therapies lift wellbeing, dignity and connection."],
];

function Desk() {
  return (
    <Block>
      <Lead k="Before the interviews" title={<>Desk study: <span>six things</span> we needed to know first</>}>
        We read about symptoms, stages and care in India so our questions wouldn't waste anyone's time.
      </Lead>
      <div className="desk">
        {DESK.map(([t, d], i) => (
          <article key={t} style={{ "--i": i }}><span>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></article>
        ))}
      </div>
    </Block>
  );
}

function Stakeholders() {
  return (
    <Block className="tint">
      <div className="split">
        <Lead k="Stakeholder map" title={<>Who holds the power, and <span>who cares most</span></>}>
          This decided who we interviewed. Patients, family and physios have the most at stake and shape daily care; neurologists decide treatment but see patients rarely. So we spoke to all four groups.
        </Lead>
        <div className="quad">
          <span className="ax y">Influence</span><span className="ax x">Interest</span>
          <div><p className="k">High · low</p><b>Neurologists</b><p>Guide treatment, rarely there.</p></div>
          <div className="key"><p className="k">High · high</p><b>Patients, caregivers, physios</b><p>Need daily, tailored support.</p></div>
          <div><p className="k">Low · low</p><b>Tech developers, NGOs</b><p>Often miss patient needs.</p></div>
          <div><p className="k">Low · high</p><b>Support groups, designers</b><p>Want to help, lack access.</p></div>
        </div>
      </div>
    </Block>
  );
}

const MODELS = [
  ["model-flow", "Flow model", "Who talks to whom about care, and where messages break down between doctor, family and patient."],
  ["model-cultural", "Cultural model", "The stigma and emotional barriers that decide whether an aid ever leaves the drawer."],
  ["model-sequence", "Sequence model", "A day mapped task by task, and the moments tremor turns them into a struggle."],
  ["model-competitor", "Competitor analysis", "The gaps between existing therapies and support: nothing was both engaging and measurable."],
];

function Models() {
  const [m, setM] = useState(0);
  return (
    <Block>
      <Lead k="Contextual inquiry" title={<>Four models to see the <span>system</span>, not just the person</>} />
      <div className="models">
        <div className="models__tabs">
          {MODELS.map(([, t, d], i) => (
            <button key={t} type="button" className={m === i ? "on" : ""} onClick={() => setM(i)} onMouseEnter={() => setM(i)}>
              <b>{t}</b><span>{d}</span>
            </button>
          ))}
        </div>
        <a className="models__img" href={`${A}${MODELS[m][0]}.webp`} target="_blank" rel="noreferrer">
          <img key={m} src={`${A}${MODELS[m][0]}.webp`} alt={`${MODELS[m][1]} from our research`} />
        </a>
      </div>
    </Block>
  );
}

const SYNTH = [
  ["Stigma and mental health are overlooked", "Emotional health and stigma go unaddressed, reducing quality of life."],
  ["Daily problems need flexible, patient-led tools", "Medication timing, motor swings and fall risk change hour by hour."],
  ["Caregiver burden is central, yet unsupported", "No training or backup, leading to burnout and poorer care."],
  ["Access gaps break continuity", "Poor coordination and rural gaps delay specialised treatment."],
  ["Current solutions miss real-world usability", "Tremors, cost and literacy gaps rule most digital tools out."],
];

function Synth() {
  return (
    <Block>
      <div className="split top">
        <Lead k="Synthesis" title={<>Affinity mapping turned notes into <span>five themes</span></>}>
          We clustered every interview note, then pushed the clusters through empathy maps, SCAMPER and Six Thinking Hats.
        </Lead>
        <ol className="synth">
          {SYNTH.map(([t, d], i) => (
            <li key={t} style={{ "--i": i }}><span>{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>
          ))}
        </ol>
      </div>
      <a className="boards" href={`${A}brainstorm-boards.webp`} target="_blank" rel="noreferrer">
        <img src={`${A}brainstorm-boards.webp`} alt="Our synthesis boards: SCAMPER, empathy map, affinity map, Six Thinking Hats and 5 Whys" loading="lazy" />
      </a>
    </Block>
  );
}

const AREAS = [
  ["Independence in daily life", "Low self-reliance in eating, dressing, bathing."],
  ["Creative, dual-task therapy", "Therapy rarely mixes movement with thinking or creativity."],
  ["Community engagement", "Speech, mobility and stigma isolate people."],
  ["Creative and emotional stimulation", "Few low-tech tools cover motor, mind and mood together."],
];

function Areas() {
  return (
    <Block>
      <Lead k="Problem areas" title={<>Four ways in. We chose <span>the one nobody was solving.</span></>}>
        The others mattered too, but creative, dual-task therapy had the biggest gap between what motivates people and what therapy offers.
      </Lead>
      <ol className="areas">
        {AREAS.map(([t, d], i) => (
          <li key={t} className={i === 1 ? "on" : ""} style={{ "--i": i }}>
            <span>{String(i + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p>{i === 1 && <em>Our focus</em>}
          </li>
        ))}
      </ol>
    </Block>
  );
}

const PRINCIPLES = [
  ["Rhythm over repetition", "Movement follows a gentle beat, the way music and dance helped people we met."],
  ["Dignified, not medical", "It should look like a sports glove, never an aid."],
  ["Feedback in the moment", "She should know right away whether a movement was right."],
  ["Alone, but not isolated", "Practise independently while a physio and family see progress."],
];

function Principles() {
  return (
    <Block className="dark">
      <Lead k="Design principles" title={<>Four rules every idea <span>had to pass</span></>} />
      <div className="principles">
        {PRINCIPLES.map(([t, d], i) => (
          <article key={t} style={{ "--i": i }}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></article>
        ))}
      </div>
    </Block>
  );
}

const DECISIONS = [
  ["Assistive devices carry stigma", "A fingerless knit glove that reads as gym wear. All the tech sits under the fabric.", "Dignified, not medical"],
  ["Movement and familiarity motivate", "Haptic cues pulse in rhythm, synced to calming beats like a heartbeat or music.", "Rhythm over repetition"],
  ["Care isn't tailored", "Difficulty levels on the glove, and an app that adjusts tasks to each person's ability.", "Feedback in the moment"],
  ["Doctors hear a filtered story", "Sessions sync to the app, so the physio sees real grip and motion trends, not memory.", "Alone, not isolated"],
  ["Digital tools fail shaking hands", "Right or wrong shows on the glove itself, by light and vibration. One big button.", "Feedback in the moment"],
];

function Decisions() {
  return (
    <Block>
      <Lead k="From research to product" title={<>Every feature traces back to <span>something we heard</span></>}>
        We didn't add sensors because we could. Each one answers an insight.
      </Lead>
      <ol className="decisions">
        {DECISIONS.map(([heard, did, rule], i) => (
          <li key={heard} style={{ "--i": i }}>
            <p className="heard"><span className="k">We heard</span>{heard}</p>
            <i aria-hidden="true"><ArrowRight size={18} /></i>
            <p className="did"><span className="k">So we designed</span>{did}</p>
            <span className="rule">{rule}</span>
          </li>
        ))}
      </ol>
    </Block>
  );
}

const CHALLENGES = [
  ["Sensor accuracy", "Motion and grip readings had to be good enough for a physio to act on."],
  ["Comfort vs hardware", "Sensors, battery and motor had to fit a glove people would wear daily."],
  ["Usable for older hands", "Simple and readable for people with low vision and tremor."],
  ["Safe health data", "Bluetooth transfer and records handled with care."],
  ["Every stage is different", "Therapy had to adapt as Parkinson's progresses."],
];

function Challenges() {
  return (
    <Block className="tint">
      <Lead k="What made it hard" title={<>The constraints we <span>designed around</span></>} />
      <div className="challenges">
        {CHALLENGES.map(([t, d], i) => (
          <article key={t} style={{ "--i": i }}><b>{t}</b><p>{d}</p></article>
        ))}
      </div>
    </Block>
  );
}

function AppBlock() {
  return (
    <Block className="tint">
      <Lead k="SteadyTrack app" title={<>The app plans. <span>The glove coaches.</span></>}>
        Redesigned with what we learned: big targets, plain words, and the beat on screen and on the hand at the same time.
      </Lead>
      <AppScreens />
    </Block>
  );
}
