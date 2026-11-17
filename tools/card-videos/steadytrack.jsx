// SteadyTrack card video, 1280 × 800. One phone steps through the real app screens beside the glove render.
import { useEffect, useRef, useState } from "react";
import { HomeScreen, SessionScreen, ShareScreen } from "../../src/work/steadytrack/AppScreens.jsx";
import "../../src/work/steadytrack/st.css";
import "../../src/work/steadytrack/apps.css";
import { Cursor, Lockup, Sc, Words, assetsReady, useAt, useTimeline } from "./lib.jsx";

const CUES = [300, 1700, 3000, 4700, 8100, 9800, 11400];
const END = 12000;

export default function SteadyTrack() {
  const s = useTimeline(CUES, END);
  const phone = useRef(null);
  const [cur, setCur] = useState({ x: 760, y: 860, show: false, click: false });

  useEffect(() => { window.__ready = assetsReady().then(() => new Promise((r) => setTimeout(r, 300))); }, []);

  // 3: the pointer finds "Start session" and clicks it just before the session begins.
  useAt(s, 3, 500, () => {
    const r = phone.current.querySelector(".ap-cta").getBoundingClientRect();
    setCur({ x: 760, y: 860, show: true, click: false });
    setTimeout(() => setCur({ x: r.left + r.width / 2, y: r.top + r.height / 2, show: true, click: false }), 60);
  });
  useAt(s, 3, 1380, () => setCur((c) => ({ ...c, click: true })));
  useAt(s, 4, 250, () => setCur((c) => ({ ...c, show: false })));

  const Screen = s <= 3 ? HomeScreen : s === 4 ? SessionScreen : ShareScreen;
  return (
    <main className="stage stage--st" data-s={s} style={{ width: 1280, height: 800 }}>
      <div className={`cam st-cam${s === 4 ? " is-zoom" : ""}`}>
        <div className={`st-bg${s >= 1 && s <= 5 ? " run" : ""}`}>
          <img src="/work/steadytrack/renders/hero-hand.jpg" alt="" />
          <span className={`st-pulse${s === 4 ? " on" : ""}`} aria-hidden="true"><i /><i /></span>
        </div>
        <Sc s={s} from={3} to={5} className="st-phone">
          <div ref={phone} key={Screen.name} className="st-screen">{s >= 3 && s <= 6 && <Screen />}</div>
        </Sc>
      </div>

      <Sc s={s} from={1} to={1} className="kt kt--left"><p><Words>Therapy as a rhythm,</Words></p></Sc>
      <Sc s={s} from={2} to={2} className="kt kt--left"><p><Words>not a *chore.*</Words></p></Sc>
      <Sc s={s} from={4} to={4} className="st-cap"><p><Words>The app plans. The glove *coaches.*</Words></p></Sc>

      <Cursor {...cur} />
      <Lockup s={s} from={6} coverTo={6} name="SteadyTrack" tag="Wearable + app" live={false} />
    </main>
  );
}
