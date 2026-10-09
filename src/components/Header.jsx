const links = [
  ["Work", "#work"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export default function Header() {
  return (
    <header className="nav">
      <a href="#home" className="badge" aria-label="Suhani Rajoria, home">
        <svg viewBox="0 0 100 100" className="badge-ring" aria-hidden="true">
          <defs>
            <path id="ring" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text>
            <textPath href="#ring">suhani rajoria portfolio *</textPath>
          </text>
        </svg>
        <span className="badge-mark">S</span>
      </a>
      <nav aria-label="Primary">
        {links.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
