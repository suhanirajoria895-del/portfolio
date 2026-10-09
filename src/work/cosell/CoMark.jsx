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

export function LogoMark({ size = 32 }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 3 60 60" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8B7BFF" /><stop offset="1" stopColor="#5B4BF5" /></linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF9EC2" /><stop offset="1" stopColor="#C9A8FF" /></linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2A2370" /><stop offset="1" stopColor="#14123A" /></linearGradient>
        <path id={`${id}s`} d="M12 22 L29 11 L29 35 L12 46 Z" />
        <mask id={`${id}k`} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <use href={`#${id}s`} fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
        </mask>
      </defs>
      <g strokeWidth="10" strokeLinejoin="round">
        <use href={`#${id}s`} fill={`url(#${id}a)`} stroke={`url(#${id}a)`} />
        <use href={`#${id}s`} transform="translate(14 9)" fill={`url(#${id}b)`} stroke={`url(#${id}b)`} opacity="0.92" />
        <g mask={`url(#${id}k)`}>
          <use href={`#${id}s`} transform="translate(14 9)" fill={`url(#${id}c)`} stroke={`url(#${id}c)`} />
        </g>
      </g>
    </svg>
  );
}

/** The static brand lockup (mark + wordmark). */
export function Logo({ height = 28, className = "" }) {
  return (
    <span className={`cs-logo ${className}`} style={{ gap: height * 0.28 }} role="img" aria-label="CoSell">
      <LogoMark size={height} />
      <span aria-hidden="true" style={{ fontSize: height * 1.1 }}>
        CoSell
      </span>
    </span>
  );
}
