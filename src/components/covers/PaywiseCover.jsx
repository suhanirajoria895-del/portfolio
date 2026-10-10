import { Device } from "../../work/paywise/demo/screens.jsx";
import "@fontsource-variable/plus-jakarta-sans/index.css";
import "../../work/paywise/demo/app.css";
import { quadMatrix, useStageFit } from "./stage.js";
import "./paywise-cover.css";

const PHOTO = "/work/paywise/cover-photo.webp";
const IW = 1672; // photo size
const IH = 941;
const SW = 390; // Paywise screen size
const SH = 844;
// Corners of the phone glass in the photo: top-left, top-right, bottom-right, bottom-left.
const QUAD = [[332, 222], [600, 183], [748, 798], [462, 842]];
// Thumb outline in the photo, redrawn over the screen so it still sits in front.
const THUMB = [[642, 503], [660, 489], [702, 486], [748, 468], [820, 478], [820, 640], [758, 612], [718, 562], [688, 538], [656, 526]];

const M = quadMatrix(SW, SH, QUAD);
const CLIP = `polygon(${THUMB.map(([x, y]) => `${x}px ${y}px`).join(",")})`;

/* Paywise cover: the art-directed photo with the real pause screen mapped onto the phone.
   The 1672×941 stage is scaled to cover whatever box it sits in. */
export default function PaywiseCover() {
  const [ref, stageStyle] = useStageFit(IW, IH);

  return (
    <div className="pc" ref={ref} aria-hidden="true">
      <div className="pc-stage" style={stageStyle}>
        <img className="pc-photo" src={PHOTO} alt="" width={IW} height={IH} />
        <div className="pc-screen" style={{ transform: M }}>
          <Device screen="risk" />
          <span className="pc-glare" />
        </div>
        <img className="pc-photo pc-thumb" src={PHOTO} alt="" width={IW} height={IH} style={{ clipPath: CLIP }} />
      </div>
    </div>
  );
}
