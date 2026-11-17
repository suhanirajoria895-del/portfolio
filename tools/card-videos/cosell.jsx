// CoSell card video, 1600 × 800. The screen is the live prototype in an iframe, so the UI in the film is always the real one.
import { useEffect, useRef, useState } from "react";
import { Cursor, Lockup, Sc, Words, assetsReady, union, useAt, useTimeline } from "./lib.jsx";

const W = 1440, H = 900, S0 = 0.72, L = 250, T = 76; // iframe size, its scale on the stage, and where it sits
const CUES = [300, 1700, 3100, 4900, 7000, 9900, 11800, 13400];
const END = 14000;

/** Smallest elements in `doc` whose own text contains `text`. */
const find = (doc, text) =>
  [...doc.querySelectorAll("h1,h2,h3,h4,p,span,button,a,div")].filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.includes(text)));

/** A box in iframe px → the same box in stage px (before the camera moves). */
const toStage = (r, pad = 0) => ({ x: L + S0 * (r.x - pad), y: T + S0 * (r.y - pad), w: S0 * (r.w + pad * 2), h: S0 * (r.h + pad * 2) });

export default function Cosell() {
  const s = useTimeline(CUES, END);
  const frame = useRef(null);
  const [cam, setCam] = useState({ tx: 0, ty: 0, k: 1 });
  const [cur, setCur] = useState({ x: 1500, y: 860, show: false, click: false });
  const [cut, setCut] = useState(0);

  useEffect(() => {
    window.__ready = new Promise((res) => {
      frame.current.addEventListener("load", () => assetsReady().then(() => setTimeout(res, 800)), { once: true });
    });
  }, []);

  const doc = () => frame.current.contentDocument;
  const aim = (box, k, px, py) => {
    const c = { k, tx: px - k * (box.x + box.w / 2), ty: py - k * (box.y + box.h / 2) };
    setCam(c);
    return c;
  };

  // 0: rest. Put the prototype back on Home for the next take.
  useEffect(() => { if (s === 3) setCam({ tx: 0, ty: 0, k: 1 }); }, [s]);

  // 4: push in on the urgent card on Home.
  useAt(s, 4, 0, () => {
    const box = toStage(union([...find(doc(), "Losing about"), ...find(doc(), "See Co"), ...find(doc(), "Urgent").slice(0, 1)].map((el) => el.getBoundingClientRect())), 36);
    aim(box, Math.min(2, 1180 / box.w), 800, 470);
  });

  // 5: cut to the approval, frame the guardrails and the Approve button, then click it.
  const approve = useRef(null);
  useAt(s, 5, 0, () => {
    frame.current.contentWindow.location.hash = "#/approvals/apr-101";
    setCut((n) => n + 1);
  });
  useAt(s, 5, 160, () => {
    const btn = find(doc(), "Approve").find((el) => el.closest("button"))?.closest("button");
    approve.current = btn;
    const box = toStage(union([...find(doc(), "Guardrails checked"), btn].map((el) => el.getBoundingClientRect())), 28);
    const k = 500 / box.h;
    const c = aim(box, k, 1180, 400);
    const b = toStage(union([btn.getBoundingClientRect()]));
    setCur({ x: 1500, y: 880, show: true, click: false });
    setTimeout(() => setCur({ x: c.tx + k * (b.x + b.w / 2) - 4, y: c.ty + k * (b.y + b.h / 2) - 2, show: true, click: false }), 900);
  });
  useAt(s, 5, 2250, () => { setCur((c) => ({ ...c, click: true })); approve.current?.click(); });

  // 6: pull back, the web app moves left and the iOS app joins it.
  useAt(s, 6, 0, () => { setCam({ k: 0.82, tx: 64 - 0.82 * L, ty: 150 - 0.82 * T }); setCur((c) => ({ ...c, show: false })); });

  // 8: behind the closing card, send the prototype home again.
  useAt(s, 8, 0, () => { frame.current.contentWindow.location.hash = "#/"; });

  return (
    <main className="stage stage--cosell" data-s={s} style={{ width: 1600, height: 800 }}>
      <Sc s={s} from={1} to={1} className="kt"><p><Words>Every marketplace.</Words></p></Sc>
      <Sc s={s} from={2} to={2} className="kt"><p><Words>One calm *inbox.*</Words></p></Sc>

      <div className="cam" style={{ transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.k})` }}>
        <Sc s={s} from={3} to={7} className="cs-screen" style={{ left: L, top: T, width: W * S0, height: H * S0 }}>
          <iframe ref={frame} title="CoSell prototype" src="/work/cosell/demo/index.html#/" width={W} height={H} style={{ transform: `scale(${S0})` }} tabIndex={-1} />
          {cut > 0 && <i key={cut} className="cut" />}
        </Sc>
      </div>

      <Sc s={s} from={4} to={4} className="cs-cap cs-cap--top"><p><Words>Co watches overnight.</Words></p></Sc>
      <Sc s={s} from={5} to={5} className="cs-cap cs-cap--left"><p><Words>Nothing changes without your *yes.*</Words></p></Sc>

      <Sc s={s} from={6} to={7} className="cs-phone"><img src="/work/cosell/ios/m-today.webp" alt="" /></Sc>
      <Sc s={s} from={6} to={6} className="cs-pill">Web app + iOS app</Sc>

      <Cursor {...cur} />
      <Lockup s={s} from={7} mark={<img src="/work/cosell/cosell-mark.png" alt="" />} name="CoSell" tag="Live prototype" />
    </main>
  );
}
