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
import { CoMark, LogoMark } from "./CoMark.jsx";

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

const TABS = ["Colour", "Type", "Space", "Components", "Icons", "Co mark"];
const KINDS = [["Primary", "p", "Approve"], ["Secondary", "s", "Review"], ["Light", "l", "Edit price"], ["Ghost", "g", "Undo"], ["Destructive", "d", "Reject"]];
const STATES = [["Default", ""], ["Hover", "hover"], ["Pressed", "press"], ["Disabled", "off"]];
const SIZES = [["S", 32, 14], ["M", 40, 20], ["L", 48, 24]];

/** A property row like a component panel: pick one value. */
function Prop({ label, value, options, onChange }) {
  return (
    <div className="ds-prop">
      <span>{label}</span>
      <div role="group" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

/** The design system as one compact library file: pages on the left, one canvas, a properties panel for components. */
export default function DesignSystem() {
  const [tab, setTab] = useState("Colour");
  const [kind, setKind] = useState("Primary");
  const [state, setState] = useState("Default");
  const [size, setSize] = useState("M");
  const k = KINDS.find(([n]) => n === kind);
  const st = STATES.find(([n]) => n === state)[1];
  const sz = SIZES.find(([n]) => n === size);

  return (
    <div className="cs-part ds">
      <header className="cs-part__head" data-reveal>
        <h3>Design system</h3>
        <p className="cs-body">Tokens first, then components.</p>
      </header>

      <ol className="ds-chain" data-reveal aria-label="How a value becomes a component">
        <li><span className="ds-dot" style={{ background: "#14142B" }} /><code>#14142B</code><small>Value</small></li>
        <li><code>bg/inverse</code><small>Token, named by role</small></li>
        <li><span className="b-real b--p" style={{ height: 32, padding: "0 14px" }}>Approve</span><small>Component</small></li>
      </ol>

      <div className="ds-file" data-reveal>
        <div className="ds-file__bar"><LogoMark size={20} /> <b>CoSell UI kit</b><span>{tab}</span></div>
        <div className="ds-file__body">
          <nav className="ds-pages" aria-label="Design system pages">
            {TABS.map((t) => (
              <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
            ))}
          </nav>

          <div className="ds-canvas" key={tab}>
            {tab === "Colour" && (
              <>
                <div className="ds-cols">
                  {COLOR_GROUPS.filter(([g]) => g !== "Status").map(([group, items]) => (
                    <div key={group}>
                      <p className="dsx-sub">{group}</p>
                      {items.map(([n, hex]) => (
                        <div key={n} className="ds-sw"><span style={{ background: hex }} /><b>{n}</b><code>{hex}</code></div>
                      ))}
                    </div>
                  ))}
                  <div>
                    <p className="dsx-sub">Status · base, tint, ink</p>
                    {COLOR_GROUPS[2][1].map(([n, base, tint, ink]) => (
                      <div key={n} className="ds-sw ds-sw--3"><span style={{ background: base }} /><span style={{ background: tint }} /><span style={{ background: ink }} /><b>{n}</b></div>
                    ))}
                  </div>
                </div>
                <p className="ds-rule">Indigo is for Co and actions. Every other colour means a status.</p>
              </>
            )}

            {tab === "Type" && (
              <>
                <table className="dsx-type ds-type">
                  <tbody>
                    {TYPE.map(([n, sizePx, lh, w, sample]) => (
                      <tr key={n}>
                        <th>{n}</th>
                        <td style={{ fontSize: Math.min(sizePx, 30), lineHeight: 1.25, fontWeight: w }}>{sample}</td>
                        <td className="spec">{sizePx}/{lh} · {w}</td>
                      </tr>
                    ))}
                    <tr>
                      <th>Hindi</th>
                      <td lang="hi" style={{ fontFamily: "Mukta, sans-serif", fontSize: 18, fontWeight: 600 }}>सुप्रभात, मीरा!</td>
                      <td className="spec">Mukta · +1px</td>
                    </tr>
                  </tbody>
                </table>
                <p className="ds-rule">Plus Jakarta Sans, Mukta for Hindi. Numbers use tabular figures.</p>
              </>
            )}

            {tab === "Space" && (
              <div className="ds-space">
                <div>
                  <p className="dsx-sub">Spacing · 4px base</p>
                  <div className="ds-bars">
                    {SPACING.map((v) => <div key={v}><i style={{ width: v }} /><code>{v}</code></div>)}
                  </div>
                </div>
                <div>
                  <p className="dsx-sub">Radius</p>
                  <div className="ds-radii">
                    {RADII.map(([n, r, use]) => (
                      <div key={n}><i style={{ borderRadius: Math.min(r, 28) }} /><b>{n}</b><small>{use}</small></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "Components" && (
              <div className="ds-comp">
                <div className="ds-stage">
                  <span className={`b-real b--${k[1]} ${st}`} style={{ height: sz[1], padding: `0 ${sz[2]}px` }}>{k[2]}</span>
                  <code>Button / {kind} / {state} / {size}</code>
                </div>
                <div className="ds-props">
                  <p className="dsx-sub">Properties</p>
                  <Prop label="Type" value={kind} options={KINDS.map(([n]) => n)} onChange={setKind} />
                  <Prop label="State" value={state} options={STATES.map(([n]) => n)} onChange={setState} />
                  <Prop label="Size" value={size} options={SIZES.map(([n]) => n)} onChange={setSize} />
                  <p className="dsx-sub" style={{ marginTop: 18 }}>Pills</p>
                  <div className="dsx-wrap">
                    {[["neutral", "Marketplace A"], ["primary", "3 of 3 passed"], ["success", "● High"], ["warning", "● Medium"], ["danger", "● Low"]].map(([t, l]) => (
                      <span key={t} className={`pill pill--${t}`}>{l}</span>
                    ))}
                  </div>
                </div>
                <p className="ds-rule">One primary button per card. Marketplaces are always grey; only status gets colour.</p>
              </div>
            )}

            {tab === "Icons" && (
              <>
                <div className="ds-icons">
                  {ICONS.map(([Ic, n]) => <div key={n}><Ic size={22} strokeWidth={1.75} aria-hidden="true" /><code>{n}</code></div>)}
                </div>
                <p className="ds-rule">One icon set, one stroke weight.</p>
              </>
            )}

            {tab === "Co mark" && (
              <>
                <div className="dsx-marks ds-marks">
                  {MARKS.map(([s, l]) => <div key={s}><CoMark state={s} size={56} /><span>{l}</span></div>)}
                </div>
                <p className="ds-rule">The logo doubles as Co. A badge carries the state, so it reads small and with motion off.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
