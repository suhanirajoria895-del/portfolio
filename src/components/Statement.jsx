const text =
  "This space is for the dreamers, the makers, the curious ones, the";

export default function Statement() {
  return (
    <div className="statement" role="img" aria-label="This space is for the dreamers, the makers and the curious ones.">
      <svg viewBox="0 0 1440 240" aria-hidden="true">
        <defs>
          <path id="wave" d="M-20,60 C240,10 420,190 720,120 S1180,10 1460,80" />
        </defs>
        <text>
          <textPath href="#wave" textLength="1480" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
