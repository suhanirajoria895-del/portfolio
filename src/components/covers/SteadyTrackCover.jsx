import { SessionScreen } from "../../work/steadytrack/AppScreens.jsx";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "../../work/steadytrack/apps.css";
import { quadMatrix, useStageFit } from "./stage.js";
import "./steadytrack-cover.css";

const W = 1672; // stage size
const H = 941;
const PHOTO = "/work/steadytrack/renders/flatlay.jpg"; // 1122×1402, glove + blank phone, top-down
// Where the flat-lay sits on the stage, and its scale
const PX = 760;
const PY = -60;
const PS = 0.8;
// Phone glass corners in the flat-lay photo: top-left, top-right, bottom-right, bottom-left
const GLASS = [[797, 320], [1050, 332], [1020, 884], [736, 862]];
const SW = 300; // SessionScreen phone size
const SH = 625;
const M = quadMatrix(SW, SH, GLASS.map(([x, y]) => [PX + x * PS, PY + y * PS]));

/* SteadyTrack cover: sage editorial panel, the real glove render on a round table,
   and the real session screen mapped onto the phone beside it. */
export default function SteadyTrackCover() {
  const [ref, stageStyle] = useStageFit(W, H);
  return (
    <div className="stc" ref={ref} aria-hidden="true">
      <div className="stc-stage" style={stageStyle}>
        <span className="stc-leaf l1" /><span className="stc-leaf l2" />
        <span className="stc-ring r1" /><span className="stc-ring r2" /><span className="stc-ring r3" />

        <div className="stc-table">
          <img src={PHOTO} alt="" width="1122" height="1402" style={{ left: PX, top: PY, width: 1122 * PS }} />
          <div className="stc-screen" style={{ transform: M }}>
            <SessionScreen />
          </div>
        </div>

        <p className="stc-kicker">Case study 03 · Healthcare · Wearables</p>
        <span className="stc-rule top" />
        <p className="stc-title">SteadyTrack</p>
        <p className="stc-tag">Therapy that keeps time with you</p>
        <span className="stc-rule bottom" />
        <p className="stc-meta">MIT Institute of Design · Group project · 2025</p>
      </div>
    </div>
  );
}
