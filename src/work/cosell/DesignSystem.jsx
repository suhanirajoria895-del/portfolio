import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  House,
  ListChecks,
  Package,
  Pencil,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import { CoMark, Logo } from "./CoMark.jsx";

const A = "/work/cosell/";

/* Every value below is copied from the product's token file (theme.css + tailwind.config). */
const COLOR_GROUPS = [
  [
    "Background",
    [
      ["bg/canvas", "#EEF0F7"],
      ["bg/surface", "#FFFFFF"],
      ["bg/subtle", "#F7F8FC"],
      ["bg/brand", "#6B5CFF"],
      ["bg/brand-hover", "#5E4EF5"],
      ["bg/brand-tint", "#EEECFF"],
      ["bg/inverse", "#14142B"],
    ],
  ],
  [
    "Text",
    [
      ["text/primary", "#14142B"],
      ["text/secondary", "#676C88"],
      ["text/muted", "#8A8FA8"],
      ["text/brand", "#5543E8"],
      ["text/on-brand", "#FFFFFF"],
    ],
  ],
  [
    "Status",
    [
      ["success", "#2FB67C", "#E6F7EF", "#17734D"],
      ["warning", "#F5A524", "#FFF4E0", "#9A5B00"],
      ["danger", "#EF5B6B", "#FDECEE", "#B42335"],
      ["neutral", "#8A8FA8", "#F2F3F8", "#4B5070"],
    ],
  ],
  [
    "Line",
    [
      ["border/default", "#EEF0F6"],
      ["border/track", "#D7D9E6"],
      ["border/brand-tint", "#E2DEFF"],
    ],
  ],
];

const TYPE = [
  ["Hero number", 56, 60, 800, "₹849"],
  ["H1", 32, 40, 700, "Good morning, Meera!"],
  ["H2", 24, 32, 700, "Needs your approval"],
  ["H3", 18, 26, 700, "Guardrails checked"],
  ["Body", 14, 20, 400, "Co prepared these. Nothing changes until you say yes."],
  ["Body strong", 14, 20, 600, "Lower price of Copper water bottle"],
  ["Label", 13, 18, 500, "Recommended by Co at 7:52 AM"],
  ["Money", 14, 20, 700, "₹48,250  +12%"],
];

const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 48];
const RADII = [
  ["8", 8, "Tooltips, small tags"],
  ["12", 12, "Product thumbs"],
  ["16", 16, "Inputs, list rows"],
  ["24", 24, "Cards"],
  ["32", 32, "App frame, drawers"],
  ["full", 999, "Buttons, pills, chips"],
];
const ICONS = [
  [House, "house"],
  [ListChecks, "list-checks"],
  [Package, "package"],
  [Tag, "tag"],
  [Wallet, "wallet"],
  [Sparkles, "sparkles"],
  [Bell, "bell"],
  [Search, "search"],
  [Check, "check"],
  [X, "x"],
  [Pencil, "pencil"],
  [RotateCcw, "rotate-ccw"],
  [ArrowRight, "arrow-right"],
  [ChevronRight, "chevron-right"],
  [AlertTriangle, "alert-triangle"],
  [ShieldCheck, "shield-check"],
];
const MARKS = [
  ["idle", "Watching"],
  ["thinking", "Thinking"],
  ["needsYou", "Needs you"],
  ["done", "Done"],
  ["paused", "Paused"],
];

function Level({ n, name, desc }) {
  return (
    <div className="dsx-level" data-reveal>
      <span className="dsx-level__n">{n}</span>
      <div>
        <h4>{name}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function Panel({ title, note, children, className = "" }) {
  return (
    <div className={`dsx-panel ${className}`} data-reveal>
      <h5>{title}</h5>
      {note && <p className="dsx-note">{note}</p>}
      {children}
    </div>
  );
}

export default function DesignSystem() {
  const [mode, setMode] = useState("ask");
  const [on, setOn] = useState(true);

  return (
    <div className="cs-part dsx">
      <header className="cs-part__head" data-reveal>
        <h3>Design system</h3>
        <p className="cs-body">
          Built with Atomic Design, from tokens up to whole screens. Every value here is the real one from the product's
          token file, and colour is only ever used to mean a status.
        </p>
      </header>

      {/* ───────── Tokens ───────── */}
      <Level n="01" name="Tokens" desc="The raw decisions: colour, type, space, shape. Components never use a raw value, only a token." />

      <Panel title="Colour" note="Semantic names, so the palette can change without touching a screen.">
        {COLOR_GROUPS.map(([group, items]) => (
          <div key={group} className="dsx-colgroup">
            <p className="dsx-sub">{group}</p>
            <div className={`dsx-swatches ${group === "Status" ? "status" : ""}`}>
              {group === "Status"
                ? items.map(([n, base, tint, ink]) => (
                    <div key={n} className="dsx-status">
                      <span style={{ background: base }} />
                      <span style={{ background: tint }} />
                      <span style={{ background: ink }} />
                      <p>
                        <b>{n}</b>
                        {base} · tint · ink
                      </p>
                    </div>
                  ))
                : items.map(([n, hex]) => (
                    <div key={n} className="dsx-swatch">
                      <span style={{ background: hex }} />
                      <b>{n}</b>
                      <code>{hex}</code>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </Panel>

      <div className="dsx-row">
        <Panel title="Typography" note="Plus Jakarta Sans, with Mukta for Hindi. Every number uses tabular figures." className="grow">
          <table className="dsx-type">
            <tbody>
              {TYPE.map(([n, size, lh, w, sample]) => (
                <tr key={n}>
                  <th>{n}</th>
                  <td style={{ fontSize: Math.min(size, 40), lineHeight: `${Math.min(lh, 44)}px`, fontWeight: w }}>{sample}</td>
                  <td className="spec">
                    {size}/{lh} · {w}
                  </td>
                </tr>
              ))}
              <tr>
                <th>Hindi</th>
                <td lang="hi" style={{ fontFamily: "Mukta, sans-serif", fontSize: 18, fontWeight: 600 }}>
                  सुप्रभात, मीरा!
                </td>
                <td className="spec">Mukta · +1px</td>
              </tr>
            </tbody>
          </table>
        </Panel>
        <div className="dsx-col">
          <Panel title="Spacing" note="A 4px base. Cards sit 24px apart, page padding is 32px.">
            <div className="dsx-space">
              {SPACING.map((s) => (
                <div key={s}>
                  <i style={{ height: s * 1.4 }} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Corner radius">
            <div className="dsx-radii">
              {RADII.map(([n, r, use]) => (
                <div key={n}>
                  <i style={{ borderRadius: Math.min(r, 40) }} />
                  <b>{n}</b>
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="dsx-row">
        <Panel title="Icons" note="Lucide, 24px grid, 1.75px stroke. Icons always sit next to a label or have an accessible name." className="grow">
          <div className="dsx-icons">
            {ICONS.map(([I, n]) => (
              <div key={n}>
                <I size={22} strokeWidth={1.75} />
                <span>{n}</span>
              </div>
            ))}
          </div>
        </Panel>
        <div className="dsx-col">
          <Panel title="Logo">
            <div className="dsx-logo">
              <Logo height={30} />
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="Layout grid" note="Desktop 1440 × 900. The app sits in a white frame on a lavender canvas.">
        <div className="dsx-grid">
          <div className="frame">
            <span className="side">88</span>
            <div className="cols">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
          <ul>
            <li>
              <b>24</b> canvas margin
            </li>
            <li>
              <b>88</b> sidebar
            </li>
            <li>
              <b>32</b> content padding
            </li>
            <li>
              <b>12</b> columns, 24 gutter
            </li>
          </ul>
        </div>
      </Panel>

      {/* ───────── Atoms ───────── */}
      <Level n="02" name="Atoms" desc="The smallest pieces you can actually click or read." />

      <Panel title="Buttons" note="Pill shaped. One primary button per card, so the next step is always obvious.">
        <div className="dsx-anatomy">
          {[
            ["Small", 32, 14],
            ["Medium", 40, 20],
            ["Large", 48, 24],
          ].map(([n, h, px]) => (
            <div key={n}>
              <span className="b-real b--p" style={{ height: h, padding: `0 ${px}px` }}>
                Approve
              </span>
              <p>
                {n} · {h}px high · {px}px sides
              </p>
            </div>
          ))}
        </div>
        <div className="cs-scroll">
          <table className="dsx-states">
            <thead>
              <tr>
                <th />
                {["Default", "Hover", "Pressed", "Disabled"].map((s) => (
                  <th key={s}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Primary", "p", "Approve"],
                ["Secondary", "s", "Review"],
                ["Light", "l", "Edit price"],
                ["Ghost", "g", "Undo"],
                ["Destructive", "d", "Reject"],
              ].map(([n, k, label]) => (
                <tr key={k}>
                  <th>{n}</th>
                  {["", "hover", "press", "off"].map((st) => (
                    <td key={st}>
                      <span className={`b-real b--${k} ${st}`}>{label}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="dsx-row">
        <Panel title="Pills and badges" className="grow">
          <div className="dsx-wrap">
            {[
              ["neutral", "Amazon"],
              ["primary", "3 of 3 passed"],
              ["success", "● High"],
              ["warning", "● Medium"],
              ["danger", "● Low"],
              ["navy", "3"],
            ].map(([t, l]) => (
              <span key={t} className={`pill pill--${t}`}>
                {l}
              </span>
            ))}
          </div>
          <p className="dsx-note">Marketplaces are always grey. Only status gets colour.</p>
        </Panel>
        <Panel title="Controls" className="grow">
          <div className="dsx-wrap">
            <button type="button" role="switch" aria-checked={on} aria-label="Auto-approve example" className={`sw ${on ? "on" : ""}`} onClick={() => setOn((v) => !v)}>
              <i />
            </button>
            <div className="seg" role="radiogroup" aria-label="Freedom level example">
              {[
                ["suggest", "Recommend only"],
                ["ask", "Ask me first"],
                ["auto", "Auto within limits"],
              ].map(([v, l]) => (
                <button key={v} type="button" role="radio" aria-checked={mode === v} onClick={() => setMode(v)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <p className="dsx-note">Both work. Try them.</p>
        </Panel>
      </div>

      <Panel title="Co, the mark" note="The logo doubles as Co. A badge carries the state, so it reads at small sizes and with motion off.">
        <div className="dsx-marks">
          {MARKS.map(([s, l]) => (
            <div key={s}>
              <CoMark state={s} size={48} />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ───────── Molecules ───────── */}
      <Level n="03" name="Molecules" desc="Atoms combined into something with one job." />

      <div className="dsx-row">
        <Panel title="Inputs" className="grow">
          <div className="dsx-inputs">
            <div className="in search">
              <Search size={16} />
              <span>Search or ask Co…</span>
              <i className="co">
                <CoMark size={16} />
              </i>
            </div>
            <div className="in">
              <b>+91</b>
              <span className="val">98290 12345</span>
            </div>
            <div className="otp">
              {["4", "8", "1", "", "", ""].map((d, i) => (
                <span key={i} className={d ? "on" : i === 3 ? "focus" : ""}>
                  {d}
                </span>
              ))}
            </div>
            <div className="field">
              <span>Minimum margin</span>
              <b>20 %</b>
              <i>
                <em style={{ width: "34%" }} />
              </i>
            </div>
            <div className="in error">
              <span className="val">₹740</span>
            </div>
            <p className="err">Below your floor of ₹799. Co won't save this.</p>
          </div>
        </Panel>
        <Panel title="Feedback" className="grow">
          <div className="dsx-toast">
            <CoMark state="done" size={20} />
            Approved. Co is on it.
            <b>Undo</b>
          </div>
          <div className="dsx-stat">
            <p>Today's sales</p>
            <b>₹48,250</b>
            <span>↗ +12% vs yesterday</span>
          </div>
          <div className="dsx-banner">
            <AlertTriangle size={16} /> Meesho sync is 20 minutes behind.
          </div>
        </Panel>
      </div>

      {/* ───────── Organisms ───────── */}
      <Level n="04" name="Organisms" desc="Whole sections of a screen, taken straight from the product." />

      <div className="dsx-orgs" data-reveal>
        {[
          ["Approval queue", "queue"],
          ["Decision card", "decide2"],
          ["Guardrails check", "guardrails"],
          ["Co's activity log", "activity"],
          ["Stock table", "stock"],
          ["Autonomy settings", "autonomy"],
        ].map(([t, img]) => (
          <figure key={img}>
            <div>
              <img src={`${A}pop/${img}.webp`} alt={t} loading="lazy" />
            </div>
            <figcaption>{t}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
