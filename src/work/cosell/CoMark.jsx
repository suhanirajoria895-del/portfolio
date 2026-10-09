

export function CoMark({ state = "idle", size = 48 }) {
  const badge = Math.max(6, size * 0.32);
  return (
    <span className="co-mark" data-state={state} aria-hidden="true" style={{ position: "relative", display: "inline-block", width: size, height: size, flex: "none" }}>
      <img src="/work/cosell/cosell-mark.png" alt="" width={size} height={size} draggable="false" style={{ display: "block", filter: state === "paused" ? "grayscale(1) opacity(0.55)" : undefined }} />
      {state === "needsYou" && (
        <span style={{ position: "absolute", right: -badge * 0.15, top: -badge * 0.15, width: badge, height: badge, borderRadius: "50%", background: "#F07A5A", boxShadow: "0 0 0 2px #fff" }} />
      )}
      {state === "done" && (
        <span style={{ position: "absolute", right: -badge * 0.3, bottom: -badge * 0.3, width: badge * 1.3, height: badge * 1.3, borderRadius: "50%", background: "#2FB67C", boxShadow: "0 0 0 2px #fff", display: "grid", placeItems: "center" }}>
          <svg viewBox="0 0 12 12" width={badge * 0.8} height={badge * 0.8}>
            <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ size = 32 }) {
  return <img src="/work/cosell/cosell-mark.png" width={size} height={size} alt="" aria-hidden="true" draggable="false" />;
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
