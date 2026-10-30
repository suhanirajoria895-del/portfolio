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
      ["bg/brand", "#4F46E5"],
      ["bg/brand-hover", "#5E4EF5"],
      ["bg/brand-tint", "#EEF0FF"],
      ["bg/inverse", "#14142B"],
    ],
  ],
  [
    "Text",
    [
      ["text/primary", "#14142B"],
      ["text/secondary", "#676C88"],
      ["text/muted", "#8A8FA8"],
      ["text/brand", "#4338CA"],
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
        <p className="cs-body">Tokens first, then components.</p>
      </header>

      <Panel title="Colour" note="Indigo for Co and actions. Every other colour means a status, never decoration.">
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
        <Panel title="Pills and badges" className="grow">
          <div className="dsx-wrap">
            {[
              ["neutral", "Marketplace A"],
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
      </div>

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
        <div className="cs-scroll" tabIndex={0} role="region" aria-label="Button states table">
          <table className="dsx-states">
            <thead>
              <tr>
                <th scope="col"><span className="sr">Component</span></th>
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
    </div>
  );
}
