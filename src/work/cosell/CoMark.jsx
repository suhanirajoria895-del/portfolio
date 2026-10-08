import { useId } from "react";

// Same geometry as the product's <CoMark>: two flat circles, navy where they overlap.
const SPREAD = { idle: 7, thinking: 7, needsYou: 0, done: 6.5, paused: 7 };
const R = 12;

export function CoMark({ state = "idle", size = 48 }) {
  const id = useId();
  const d = SPREAD[state];
  const grey = state === "paused";
  const move = { transition: "transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1)" };
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="co-mark" data-state={state} aria-hidden="true">
      <defs>
        <clipPath id={`${id}a`}>
          <circle cx="24" cy="24" r={R} style={{ ...move, transform: `translateX(${-d}px)` }} />
        </clipPath>
      </defs>
      <g className="co-mark__pair">
        <circle cx="24" cy="24" r={R} fill={grey ? "#C9CCD8" : "#6B5CFF"} style={{ ...move, transform: `translateX(${-d}px)` }} />
        <circle cx="24" cy="24" r={R} fill={grey ? "#C9CCD8" : "#FF8FB1"} style={{ ...move, transform: `translateX(${d}px)` }} />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill={grey ? "#A9ADBF" : "#14142B"}
          clipPath={`url(#${id}a)`}
          style={{ ...move, transform: `translateX(${d}px)` }}
        />
      </g>
      {state === "done" && (
        <path d="M21.2 24.2l2 2.1 3.6-4.3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {state === "needsYou" && <circle cx="37" cy="11" r="5" fill="#F07A5A" stroke="#fff" strokeWidth="2" />}
    </svg>
  );
}

/** The static brand lockup (mark + wordmark). */
export function Logo({ height = 28, className = "" }) {
  const id = useId();
  return (
    <span className={`cs-logo ${className}`} style={{ gap: height * 0.2 }} role="img" aria-label="CoSell">
      <svg width={(height * 65) / 40} height={height} viewBox="0 0 65 40" aria-hidden="true">
        <defs>
          <clipPath id={`${id}l`}>
            <circle cx="20" cy="20" r="20" />
          </clipPath>
        </defs>
        <circle cx="20" cy="20" r="20" fill="#6B5CFF" />
        <circle cx="45" cy="20" r="20" fill="#FF8FB1" />
        <circle cx="45" cy="20" r="20" fill="#14142B" clipPath={`url(#${id}l)`} />
      </svg>
      <span aria-hidden="true" style={{ fontSize: height * 1.24 }}>
        CoSell
      </span>
    </span>
  );
}
