import {
  ArrowRight,
  ArrowUpRight,
  AirplaneTilt,
  Asterisk,
  CheckSquare,
  Flower,
  FlagCheckered,
  Square,
} from "@phosphor-icons/react";
import { photos } from "../data/collage.js";

const nav = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Playground", "#projects"],
  ["Contact", "#contact"],
];

const menu = [
  ["02", "About me", "#about"],
  ["03", "Selected work", "#work"],
  ["04", "Playground", "#projects"],
  ["05", "Contact", "#contact"],
];

const checklist = [
  ["good coffee", true],
  ["f1 weekends", true],
  ["new cities", true],
  ["design things", true],
  ["bigger dreams", false],
];

// Position is expressed against the 1536 x 1024 reference board, as percentages.
function Piece({ x, y, w, h, r = 0, z = 1, className = "", children, delay = 0 }) {
  const style = {
    "--x": `${(x / 1536) * 100}%`,
    "--y": `${(y / 1024) * 100}%`,
    "--w": `${(w / 1536) * 100}%`,
    "--h": h ? `${(h / 1024) * 100}%` : "auto",
    "--r": `${r}deg`,
    "--z": z,
    "--d": `${delay}ms`,
  };
  return (
    <div className={`piece ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function Collage() {
  return (
    <section id="home" className="board-wrap">
      {/* Clip path reused by the sticker in the Work section. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="defs">
        <defs>
          <clipPath id="flower" clipPathUnits="objectBoundingBox">
            <circle cx="0.3" cy="0.3" r="0.28" />
            <circle cx="0.72" cy="0.28" r="0.28" />
            <circle cx="0.3" cy="0.72" r="0.28" />
            <circle cx="0.72" cy="0.72" r="0.28" />
            <rect x="0.25" y="0.25" width="0.5" height="0.5" />
          </clipPath>
        </defs>
      </svg>

      <header className="topbar">
        <a href="#home" className="wordmark">Suhani Rajoria</a>
        <nav aria-label="Primary">
          {nav.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <a href="#contact" className="connect">
          Let&rsquo;s Connect <ArrowUpRight size={16} weight="light" />
        </a>
      </header>

      <div className="board">
        <Piece x={48} y={58} w={490} h={375} r={-1.2} className="photo torn" delay={0}>
          <img src={photos.track} alt="Watching a race from the grandstand at sunset" width="800" height="612" fetchPriority="high" />
        </Piece>
        <Piece x={90} y={50} w={110} r={-3} z={4} className="tape" delay={200} />
        <Piece x={372} y={92} w={188} h={95} r={0} z={4} className="note hand" delay={300}>
          <p>same girl...<br />new places...<br />new perspectives...</p>
        </Piece>
        <Piece x={470} y={322} w={108} h={160} r={-4} z={5} className="tag" delay={350}>
          <FlagCheckered size={30} weight="light" aria-hidden="true" />
          <p>People<br />Places<br />Experiences<br />Design</p>
          <ArrowRight size={16} weight="light" className="tag-arrow" aria-hidden="true" />
        </Piece>

        <Piece x={538} y={146} w={495} h={368} z={3} className="hero-card" delay={100}>
          <span className="idx">01</span>
          <h1>
            Designing<br />for a more<br /><em>human</em> tomorrow.
          </h1>
          <p className="role">UX Designer /<br />Based in Pune, India</p>
          <a href="#work" className="hero-link" aria-label="See selected work">
            <ArrowRight size={44} weight="thin" />
          </a>
          <Flower size={42} weight="thin" className="doodle" aria-hidden="true" />
          <p className="hand aside">ideas<br />people<br />cultures<br />little things...</p>
        </Piece>

        <Piece x={994} y={84} w={495} h={432} r={0} className="photo arch" delay={150}>
          <img src={photos.arch} alt="Charminar framed by an archway, Hyderabad" width="800" height="700" />
        </Piece>
        <Piece x={1380} y={248} w={108} h={245} r={2} z={5} className="polaroid" delay={400}>
          <img src={photos.street} alt="Black and white street with an auto rickshaw" width="300" height="300" />
          <p className="hand">Hyderabad<br />always...</p>
        </Piece>

        <Piece x={44} y={438} w={290} h={278} r={-0.6} className="paper menu" delay={250}>
          <ul>
            {menu.map(([n, label, href]) => (
              <li key={n}>
                <a href={href}>
                  <span>{n}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ArrowRight size={22} weight="thin" className="menu-arrow" aria-hidden="true" />
        </Piece>

        <Piece x={346} y={483} w={433} h={293} r={0.4} className="photo" delay={200}>
          <img src={photos.desk} alt="Laptop with stickers on a bed" width="800" height="540" />
        </Piece>

        <Piece x={805} y={568} w={130} h={350} r={3} z={4} className="photo stem" delay={350}>
          <img src={photos.flower} alt="Pink bougainvillea" width="300" height="800" />
        </Piece>

        <Piece x={918} y={530} w={305} h={355} r={1} z={2} className="photo torn" delay={300}>
          <img src={photos.mirror} alt="Sunset reflected in a car side mirror" width="640" height="740" />
        </Piece>
        <Piece x={1036} y={522} w={100} r={-2} z={5} className="tape" delay={450} />
        <Piece x={1130} y={806} w={124} h={78} r={-1} z={5} className="note hand small" delay={450}>
          <p>different<br />cities<br />same curiosity.</p>
        </Piece>

        <Piece x={1244} y={540} w={245} h={300} r={0.5} className="paper pink" delay={350}>
          <ul>
            {checklist.map(([text, done]) => (
              <li key={text}>
                {done ? <CheckSquare size={18} weight="light" aria-hidden="true" /> : <Square size={18} weight="light" aria-hidden="true" />}
                <span className="hand">{text}</span>
              </li>
            ))}
          </ul>
        </Piece>

        <Piece x={46} y={722} w={296} h={196} r={-1.5} className="film" delay={400}>
          <span className="film-label">Portra 400</span>
          <img src={photos.palms} alt="Palm trees along a track at dusk" width="600" height="360" />
        </Piece>
        <Piece x={88} y={896} w={230} h={80} r={-6} className="hand caption" delay={500}>
          <p>a lifelong fascination with fast cars, good design and new cities...</p>
        </Piece>
        <Piece x={312} y={930} w={36} className="asterisk" delay={500}>
          <Asterisk size={34} weight="bold" aria-hidden="true" />
        </Piece>

        <Piece x={390} y={785} w={412} h={207} r={0} className="paper ticket" delay={450}>
          <AirplaneTilt size={30} weight="fill" className="plane" aria-hidden="true" />
          <p className="spaced">Exploring<br />ideas across<br />people, places<br />and interfaces.</p>
          <div className="boarding">
            <strong>HYD</strong>
            <i aria-hidden="true" />
          </div>
        </Piece>

        <Piece x={1060} y={848} w={440} h={148} r={0} z={2} className="dark" delay={500}>
          <p className="spaced">Currently<br />exploring opportunities<br />in UX design</p>
          <a href="#contact" aria-label="Get in touch"><ArrowRight size={34} weight="thin" /></a>
          <img src={photos.arch} alt="" width="120" height="150" aria-hidden="true" />
        </Piece>
      </div>
    </section>
  );
}
