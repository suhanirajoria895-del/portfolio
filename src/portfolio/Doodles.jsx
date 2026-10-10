// Hand-drawn style doodles and character stickers used around the page.

const STRIP = "/assets/hero-characters.webp";

// One of the eight characters from the illustration strip, cropped as a sticker.
export function Sticker({ i, size = 72, className = "", label }) {
  return (
    <span
      className={`rb-sticker ${className}`}
      style={{ "--x": i, width: size, height: size * 1.3 }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <img src={STRIP} alt="" loading="lazy" />
    </span>
  );
}

export function Scribble({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 240 14" aria-hidden="true" preserveAspectRatio="none">
      <path d="M2 9 C 40 3, 70 12, 110 7 S 190 3, 238 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function LoopArrow({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 90 70" aria-hidden="true">
      <path d="M6 20 C 30 0, 48 30, 30 40 C 14 48, 18 20, 44 26 C 64 31, 70 48, 80 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M68 58 L 81 62 L 80 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Butterfly({ className = "", color = "#5b8def" }) {
  return (
    <svg className={className} viewBox="0 0 60 50" aria-hidden="true">
      <path d="M30 25 C 16 2, 2 6, 6 20 C 9 30, 22 28, 30 25 Z" fill={color} />
      <path d="M30 25 C 44 2, 58 6, 54 20 C 51 30, 38 28, 30 25 Z" fill={color} />
      <path d="M30 26 C 20 32, 10 44, 20 46 C 27 47, 29 36, 30 26 Z" fill={color} opacity=".75" />
      <path d="M30 26 C 40 32, 50 44, 40 46 C 33 47, 31 36, 30 26 Z" fill={color} opacity=".75" />
      <path d="M30 14 V 42" stroke="#1b1b1f" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 14 C 28 8, 24 6, 22 5 M30 14 C 32 8, 36 6, 38 5" stroke="#1b1b1f" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Flower({ className = "", petal = "#f2c14e", center = "#7a4b2a" }) {
  const petals = Array.from({ length: 8 }, (_, k) => k * 45);
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden="true">
      {petals.map((r) => (
        <ellipse key={r} cx="30" cy="15" rx="7" ry="13" fill={petal} transform={`rotate(${r} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="8" fill={center} />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#2747d9" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2 C 22 14, 26 18, 38 20 C 26 22, 22 26, 20 38 C 18 26, 14 22, 2 20 C 14 18, 18 14, 20 2 Z" fill={color} />
    </svg>
  );
}
