const line = "A home for the artsy, alternative soul.";

export default function Marquee() {
  const items = Array.from({ length: 8 }, (_, i) => <span key={i}>{line}</span>);
  return (
    <div className="marquee" role="note" aria-label={line}>
      <div className="marquee-track" aria-hidden="true">
        {items}
        {items}
      </div>
    </div>
  );
}
