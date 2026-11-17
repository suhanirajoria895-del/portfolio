// Research artefacts shared by the case studies: a method overview and an information architecture map.
// Each page sets --rs-accent / --rs-ink / --rs-surface / --rs-line on a wrapper to match its own palette.
import { useState } from "react";
import "./research.css";

/** How the project was studied. `steps` are methods actually used; `next` are the ones not done yet. */
export function Methods({ title, lede, steps, next }) {
  return (
    <section className="rs" data-reveal>
      <header className="rs__head">
        <p className="rs-mono">Research methods</p>
        <h3>{title}</h3>
        {lede && <p className="rs__lede">{lede}</p>}
      </header>
      <ol className="rs-steps">
        {steps.map(([name, made, href], i) => (
          <li key={name} style={{ "--i": i }}>
            <span className="rs-steps__n">{String(i + 1).padStart(2, "0")}</span>
            <h4>{name}</h4>
            <p>{href ? <a href={href}>{made}</a> : made}</p>
          </li>
        ))}
      </ol>
      {next && (
        <aside className="rs-next">
          <p className="rs-mono">Not done yet</p>
          <ul>{next.map((m) => <li key={m}>{m}</li>)}</ul>
        </aside>
      )}
    </section>
  );
}

/**
 * Information architecture map. `entry` is the path in, `nodes` are the top-level areas with optional children.
 * Each node is [name, why, children?]. Picking a node shows why it sits where it does.
 */
export function InfoArch({ title, lede, root, entry = [], nodes, side }) {
  const [on, setOn] = useState(0);
  const pick = (i) => ({ onMouseEnter: () => setOn(i), onFocus: () => setOn(i), onClick: () => setOn(i) });
  return (
    <figure className="ia" data-reveal>
      <figcaption className="rs__head">
        <p className="rs-mono">Information architecture</p>
        <h3>{title}</h3>
        {lede && <p className="rs__lede">{lede}</p>}
      </figcaption>
      <div className="ia__map">
        {entry.length > 0 && (
          <ol className="ia__entry" aria-label="Path into the product">
            {entry.map((e) => <li key={e}>{e}</li>)}
          </ol>
        )}
        <div className="ia__root">{root}</div>
        <ul className="ia__row">
          {nodes.map(([name, , kids], i) => (
            <li key={name} style={{ "--i": i }}>
              <button type="button" className="ia__node" aria-pressed={on === i} {...pick(i)}>{name}</button>
              {kids && (
                <ul className="ia__kids">
                  {kids.map((k) => <li key={k}>{k}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {side && (
          <div className="ia__side">
            <p className="rs-mono">{side.label}</p>
            <ul>{side.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        )}
      </div>
      <p className="ia__why" aria-live="polite">
        <b>{nodes[on][0]}</b>{nodes[on][1]}
      </p>
    </figure>
  );
}

/** The case in four lines, for a reader with one minute. Each card jumps to its section. */
export function Skim({ items }) {
  return (
    <nav className="skim" aria-label="The case in one minute" data-reveal>
      <p className="rs-mono">The case in one minute</p>
      <ol>
        {items.map(([label, text, href], i) => (
          <li key={label} style={{ "--i": i }}>
            <a href={href}>
              <span className="skim__k">{label}</span>
              <span className="skim__t">{text}</span>
              <span className="skim__go" aria-hidden="true">↓</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Supporting detail, closed by default so the main story stays short. */
export function Deep({ title, hint, children }) {
  return (
    <details className="deep">
      <summary>
        <span className="deep__t">{title}</span>
        {hint && <span className="deep__h">{hint}</span>}
        <span className="deep__ic" aria-hidden="true" />
      </summary>
      <div className="deep__body">{children}</div>
    </details>
  );
}
