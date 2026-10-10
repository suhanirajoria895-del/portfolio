import { Check, Sparkle, ArrowCounterClockwise } from "@phosphor-icons/react";
import "./cosell-cover.css";

const A = "/work/cosell/";

/* CoSell cover art: blueprint grid, editorial title, the real web + phone screens in device frames.
   Drawn at 16:9 and scaled with container units, so it fits any box it is placed in. */
export default function CosellCover() {
  return (
    <div className="cv-frame" aria-hidden="true">
    <div className="cv">
      <div className="cv-grid" aria-hidden="true">
        <i className="h h1" /><i className="h h2" />
        <i className="v v1" /><i className="v v2" /><i className="v v3" />
        {[["5%", "9%"], ["50%", "9%"], ["95%", "9%"], ["5%", "86%"], ["50%", "86%"], ["95%", "86%"]].map(([x, y]) => (
          <b key={x + y} style={{ left: x, top: y }} />
        ))}
      </div>

      <div className="cv-copy">
        <p className="cv-kicker">Case study 01 · Agentic AI · E-commerce</p>
        <p className="cv-title">CoSell</p>
        <p className="cv-tag">One AI copilot for every marketplace you sell on</p>
        <span className="cv-rule" aria-hidden="true" />
      </div>

      <div className="cv-stage">
        <span className="cv-orbit o1" />
        <span className="cv-orbit o2" />
        <span className="cv-glow" />

        <div className="cv-laptop">
          <div className="cv-lid">
            <span className="cv-notch" />
            <img src={`${A}approval.webp`} alt="" width="2880" height="1800" />
          </div>
          <div className="cv-base" />
        </div>

        <img className="cv-phone" src={`${A}m-morning.webp`} alt="" width="556" height="1174" />

        <div className="cv-chip c-approve"><span className="ok"><Check size={14} weight="bold" /></span>Approve</div>
        <div className="cv-chip c-conf"><Sparkle size={18} weight="fill" />High confidence</div>
        <div className="cv-chip c-undo"><ArrowCounterClockwise size={18} weight="bold" />Undo</div>
      </div>

      <p className="cv-meta">
        <b>Role</b> UX research, UI design <span>·</span> <b>Tools</b> Figma, Claude Code <span>·</span> 2025
      </p>
    </div>
    </div>
  );
}
