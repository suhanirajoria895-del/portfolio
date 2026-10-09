import { heroImage } from "../data/projects.js";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="hero-hi">Oh, hey there. So glad you could stop by.</p>
        <h1>
          I'm Suhani,
          <span>a designer &amp; developer.</span>
        </h1>
        <p className="hero-sub">
          I turn ideas into websites that feel personal, thoughtful and a little
          bit dreamy.
        </p>
        <a href="#contact" className="btn">Work with me</a>
      </div>

      <div className="cloud-wrap">
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="cloud" clipPathUnits="objectBoundingBox">
              <ellipse cx="0.2" cy="0.66" rx="0.2" ry="0.26" />
              <ellipse cx="0.4" cy="0.42" rx="0.22" ry="0.28" />
              <ellipse cx="0.66" cy="0.4" rx="0.2" ry="0.27" />
              <ellipse cx="0.85" cy="0.64" rx="0.16" ry="0.24" />
              <ellipse cx="0.5" cy="0.68" rx="0.4" ry="0.3" />
            </clipPath>
            <clipPath id="flower" clipPathUnits="objectBoundingBox">
              <circle cx="0.3" cy="0.3" r="0.28" />
              <circle cx="0.72" cy="0.28" r="0.28" />
              <circle cx="0.3" cy="0.72" r="0.28" />
              <circle cx="0.72" cy="0.72" r="0.28" />
              <rect x="0.25" y="0.25" width="0.5" height="0.5" />
            </clipPath>
          </defs>
        </svg>
        <div className="cloud-glow">
          <img
            className="cloud"
            src={heroImage}
            alt="Portrait of Suhani"
            width="800"
            height="800"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
