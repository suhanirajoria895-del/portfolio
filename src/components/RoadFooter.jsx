import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp, ArrowDown, SteeringWheel, Sparkle } from "@phosphor-icons/react";
import { contact } from "../portfolio/content.js";
import "../road-footer.css";

// Speeds are in "road heights" (R) per second so the drive feels the same at every screen size.
const LANES = [0.43, 0.86]; // where the car's wheels sit, as a share of road height
const CAR_X = 0.1; // car's left edge, share of stage width
const IDLE_SPEED = 0.22;
const TOP_SPEED = 3.4;
const ACCEL = 1.6;
const PARALLAX = { sky: 0.015, skyline: 0.07, trees: 0.45, road: 1 };
const LAMP_SPEED = 0.8;
const LAMPS = [0.3, 0.92]; // starting spots, share of the loop width
const OBSTACLES = 4; // pooled and recycled ahead of the car
const GAP = [2.8, 4.6]; // min/max distance between obstacles, in R

// What I mutter to myself when I clip a cone: Hyderabadi, team radio and design-speak.
const OOPS = [
  "Baigan! Didn't see that one.",
  "Nakko, not the cone!",
  "Hau, that one's on me.",
  "Kya re, Suhani?",
  "Box, box. I need new tyres.",
  "Track limits. I know, I know.",
  "That's a five-second penalty.",
  "Is that cone even in the regulations?",
  "Edge case found.",
  "Noted for the next iteration.",
  "Not a bug. A learning.",
  "That's a usability issue.",
  "Ctrl+Z, please.",
  "Adding this to the research.",
  "Fixed in v2. Probably.",
  "Needs more user testing.",
  "Who approved this cone placement?",
  "Error state unlocked.",
  "This road needs more whitespace.",
  "Let's call it an unexpected user flow.",
  "That's going in the case study.",
  "Cone 1, me 0. Back to wireframes.",
  "That cone is a dark pattern.",
  "Affordance unclear. It looked drivable.",
];

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function RoadFooter() {
  const stage = useRef(null);
  const layers = useRef({});
  const car = useRef(null);
  const lamps = useRef([]);
  const obs = useRef([]);
  const wheel = useRef(null);
  const sim = useRef({ x: 0, speed: IDLE_SPEED, lane: 1, driving: false, frame: 0, visible: false, R: 200, obs: [] });

  const [driving, setDriving] = useState(false);
  const [lane, setLane] = useState(1);
  const [say, setSay] = useState("");
  const [bubble, setBubble] = useState(null);
  const bubbleTimer = useRef(0);
  const lastLine = useRef(-1);

  const oops = () => {
    let i;
    do { i = Math.floor(Math.random() * OOPS.length); } while (i === lastLine.current);
    lastLine.current = i;
    setBubble({ text: OOPS[i], key: Date.now() });
    setSay(OOPS[i]);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 1900);
  };

  const steer = useCallback((l) => {
    sim.current.lane = l;
    setLane(l);
  }, []);

  // F1-style start: five reds light up one by one, hold, then all go out and we launch.
  const [lit, setLit] = useState(-1); // -1 idle, 0..5 lights on, 6 = lights out
  const countTimers = useRef([]);
  const counting = lit >= 0 && lit < 6;

  const lightsOut = () => {
    if (sim.current.driving || counting) return;
    countTimers.current.forEach(clearTimeout);
    setSay("Five red lights...");
    setLit(0);
    car.current?.classList.add("is-rev");
    const step = 520;
    const hold = 400 + Math.random() * 700; // like the real thing, you never know exactly when
    countTimers.current = [
      ...[1, 2, 3, 4, 5].map((n) => setTimeout(() => setLit(n), n * step)),
      setTimeout(() => {
        setLit(6);
        car.current?.classList.remove("is-rev");
        start();
        setSay("Lights out and away we go!");
      }, 5 * step + hold),
      setTimeout(() => setLit(-1), 5 * step + hold + 1300),
    ];
  };
  useEffect(() => () => countTimers.current.forEach(clearTimeout), []);

  const start = () => {
    const s = sim.current;
    const W = stage.current.clientWidth;
    // Line the obstacles up just off the right edge, alternating lanes at random.
    let x = s.x + (W * (1 - CAR_X)) / s.R + 0.5;
    s.obs = Array.from({ length: OBSTACLES }, () => {
      const o = { x, lane: Math.round(Math.random()), hit: false };
      x += GAP[0] + Math.random() * (GAP[1] - GAP[0]);
      return o;
    });
    s.obs.forEach((o, i) => paint(i, o));
    s.driving = true;
    setDriving(true);
    setSay("Driving. Move the mouse or use the up and down arrow keys to switch lanes and dodge the cones. Escape to stop.");
  };

  const stop = useCallback(() => {
    sim.current.driving = false;
    sim.current.obs = [];
    setBubble(null);
    obs.current.forEach((el) => el && (el.hidden = true));
    setDriving(false);
    setSay("Stopped.");
  }, []);

  const paint = (i, o) => {
    const el = obs.current[i];
    if (!el) return;
    el.hidden = false;
    el.className = "rf-obs rf-cone";
    el.style.setProperty("--lane", LANES[o.lane]);
  };

  // Main loop: everything that moves is written straight to the DOM.
  useEffect(() => {
    const s = sim.current;
    let raf = 0;
    let last = performance.now();
    const still = reduced();

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!s.visible) return;

      const R = s.R;
      const W = stage.current.clientWidth;
      const target = s.driving ? TOP_SPEED : still ? 0 : IDLE_SPEED;
      s.speed += Math.sign(target - s.speed) * Math.min(Math.abs(target - s.speed), ACCEL * dt * (s.driving ? 1 : 2));
      s.x += s.speed * dt;

      const px = s.x * R;
      for (const [k, f] of Object.entries(PARALLAX)) {
        const el = layers.current[k];
        if (el) el.style.backgroundPositionX = `${-px * f}px`;
      }

      // Two lamp posts that loop round, so only one or two are ever in view.
      const loop = W * 1.25;
      LAMPS.forEach((start, i) => {
        const el = lamps.current[i];
        if (!el) return;
        const lx = ((((start * loop - px * LAMP_SPEED) % loop) + loop) % loop) - el.offsetWidth;
        el.style.transform = `translate3d(${lx}px,0,0)`;
      });

      // Wheels: swap frames faster as the car speeds up.
      s.frame += s.speed * dt * 9;
      car.current?.classList.toggle("is-f2", Math.floor(s.frame) % 2 === 1);

      if (!s.driving) return;
      const carW = car.current.offsetWidth;
      const carL = CAR_X * W + carW * 0.12;
      const carR = CAR_X * W + carW * 0.92;
      s.obs.forEach((o, i) => {
        const el = obs.current[i];
        const ex = CAR_X * W + o.x * R - px;
        const ew = el ? el.offsetWidth : R * 0.25;
        if (el) el.style.transform = `translate3d(${ex}px,0,0)`;

        if (!o.hit && o.lane === s.lane && ex < carR && ex + ew > carL) {
          o.hit = true;
          s.speed *= 0.3;
          el?.classList.add("is-hit");
          const c = car.current;
          c.classList.remove("is-bump");
          void c.offsetWidth; // restart the bump animation
          c.classList.add("is-bump");
          oops();
        } else if (ex + ew < -60) {
          // Passed it: send it round again further down the road.
          const far = Math.max(...s.obs.map((q) => q.x));
          Object.assign(o, {
            x: far + GAP[0] + Math.random() * (GAP[1] - GAP[0]),
            lane: Math.round(Math.random()),
            hit: false,
          });
          paint(i, o);
        }
      });
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pause when off screen; track road height for scaling.
  useEffect(() => {
    const el = stage.current;
    const io = new IntersectionObserver(([e]) => { sim.current.visible = e.isIntersecting; }, { threshold: 0 });
    const ro = new ResizeObserver(() => {
      const road = layers.current.road;
      if (road) sim.current.R = road.offsetHeight;
    });
    io.observe(el);
    ro.observe(el);
    return () => { io.disconnect(); ro.disconnect(); };
  }, []);

  // Keyboard steering only while driving, so arrows still scroll the page otherwise.
  useEffect(() => {
    if (!driving) return;
    const key = (e) => {
      if (["ArrowUp", "w", "W"].includes(e.key)) { e.preventDefault(); steer(0); }
      else if (["ArrowDown", "s", "S"].includes(e.key)) { e.preventDefault(); steer(1); }
      else if (e.key === "Escape") stop();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [driving, steer, stop]);

  const laneAt = (y) => {
    const road = layers.current.road.getBoundingClientRect();
    return y < road.top + road.height * 0.5 ? 0 : 1;
  };

  // Click or tap the road: starts the drive, then steers.
  const tapSteer = (e) => {
    if (e.target.closest("button")) return;
    if (!sim.current.driving) lightsOut();
    else steer(laneAt(e.clientY));
  };

  // Mouse users get a steering-wheel cursor; while driving, moving it up or down changes lane.
  const moveWheel = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = wheel.current;
    const box = stage.current.getBoundingClientRect();
    const road = layers.current.road.getBoundingClientRect();
    const overButton = !!e.target.closest("button");
    let tilt = 0;
    if (sim.current.driving) {
      const mid = road.top + road.height * 0.5;
      tilt = Math.max(-35, Math.min(35, (e.clientY - mid) / 3));
      const l = laneAt(e.clientY);
      if (l !== sim.current.lane) steer(l);
    }
    el.style.opacity = overButton ? "0" : "1";
    el.style.transform = `translate3d(${e.clientX - box.left}px,${e.clientY - box.top}px,0) translate(-50%,-50%) rotate(${tilt}deg)`;
  };
  const hideWheel = () => { if (wheel.current) wheel.current.style.opacity = "0"; };

  const LINKS = [
    [contact.email, `mailto:${contact.email}`, false],
    ...contact.links.map(([l, h]) => [l, h, true]),
  ];

  return (
    <footer id="contact" className="rf">
      <div className="rf-sky" ref={(n) => (layers.current.sky = n)} aria-hidden="true" />

      <div className="rf-panel">
        <h2 className="rf-wall">Let's build the next one <em>together.</em></h2>
        <p className="rf-sub">Got a brief, a question or a wild idea? Send it my way.</p>

        <ul className="rf-links">
          {LINKS.map(([label, href, ext]) => (
            <li key={label}>
              <a href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}>
                {label}
                {ext && <span className="sr"> (opens in a new tab)</span>}
                <span className="rf-ring" aria-hidden="true"><ArrowUpRight size={16} /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`rf-stage${driving ? " is-play" : ""}`}
        ref={stage}
        onPointerDown={tapSteer}
        onPointerMove={moveWheel}
        onPointerLeave={hideWheel}
        role="group"
        aria-label="Take the car for a drive through Hyderabad"
      >
        <div className="rf-layer rf-skyline" ref={(n) => (layers.current.skyline = n)} aria-hidden="true" />
        <div className="rf-layer rf-lamps" aria-hidden="true">
          {LAMPS.map((_, i) => <img key={i} ref={(n) => (lamps.current[i] = n)} src="/footer/lamp.webp" alt="" />)}
        </div>
        <div className="rf-layer rf-trees" ref={(n) => (layers.current.trees = n)} aria-hidden="true" />
        <div className="rf-layer rf-road" ref={(n) => (layers.current.road = n)} aria-hidden="true">
          {Array.from({ length: OBSTACLES }, (_, i) => (
            <span key={i} ref={(n) => (obs.current[i] = n)} className="rf-obs" hidden><i /></span>
          ))}
          <div className="rf-car" ref={car} style={{ "--lane": LANES[lane], left: `${CAR_X * 100}%` }}>
            <img src="/footer/car-1.webp" alt="" className="f1" />
            <img src="/footer/car-2.webp" alt="" className="f2" />
            {bubble && <span key={bubble.key} className="rf-bubble">{bubble.text}</span>}
          </div>
        </div>

        <span className="rf-wheel" ref={wheel} aria-hidden="true"><SteeringWheel size={40} weight="duotone" /></span>
        {!driving && !counting && (
          <p className="rf-hint" aria-hidden="true">
            <span className="rf-hint-mouse">Grab the wheel. Click the road to start the race</span>
            <span className="rf-hint-touch">Tap the road to start the race</span>
          </p>
        )}

        <div className="rf-hud">
          {driving ? (
            <>
              <div className="rf-pad">
                <button type="button" onClick={() => steer(0)} aria-label="Move to top lane" aria-pressed={lane === 0}><ArrowUp size={18} /></button>
                <button type="button" onClick={() => steer(1)} aria-label="Move to bottom lane" aria-pressed={lane === 1}><ArrowDown size={18} /></button>
              </div>
              <button type="button" className="rf-quit" onClick={stop}>Stop</button>
            </>
          ) : (
            <button type="button" className={`rf-gantry${counting ? " is-counting" : ""}`} onClick={lightsOut} aria-label="Start the race">
              <span className="rf-lights" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => <i key={n} className={lit >= n && lit < 6 ? "is-on" : ""} />)}
              </span>
              <span className="rf-gantry-label">{counting ? "Wait for it…" : "Start the race"}</span>
            </button>
          )}
        </div>
        {lit === 6 && <p className="rf-go" aria-hidden="true">Lights out!</p>}
        <p className="sr" aria-live="polite">{say}</p>
      </div>

      <div className="rf-base">
        <span>© {new Date().getFullYear()} Suhani Rajoria</span>
        <span>Driver: me. Pit crew: Claude. Pit stops: too many to count. <Sparkle size={16} weight="fill" aria-hidden="true" /></span>
      </div>
    </footer>
  );
}
