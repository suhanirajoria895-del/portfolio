import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Device, PwMark, SCREENS } from "./screens.jsx";

const IDS = SCREENS.flatMap((g) => g.items.map(([id]) => id));
const readHash = () => {
  const h = window.location.hash.replace("#", "");
  return IDS.includes(h) ? h : "pay";
};

export default function Demo() {
  const [screen, setScreen] = useState(readHash);
  const [nonce, setNonce] = useState(0); // remounts a screen when revisited
  const go = (id) => {
    window.history.replaceState(null, "", `#${id}`);
    setScreen(id);
    setNonce((n) => n + 1);
  };
  useEffect(() => {
    const on = () => go(readHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 48) / 868, (window.innerWidth - 16) / 414));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  let n = 0;
  return (
    <div className="dm">
      <aside className="dm-side">
        <a className="dm-back" href="/work/paywise/"><ArrowLeft size={16} strokeWidth={1.6} /> Paywise case study</a>
        <div className="dm-brand"><PwMark size={28} /> <b>Paywise</b><span>Prototype</span></div>
        <p className="dm-intro">A safety layer inside the UPI apps people already use, plus a small companion app. Paywise flags; the person decides.</p>
        {SCREENS.map((g) => (
          <nav key={g.group} className="dm-group" aria-label={g.group}>
            <h2>{g.group}</h2>
            {g.items.map(([id, label]) => (
              <button key={id} className="dm-tab" aria-current={screen === id ? "true" : undefined} onClick={() => go(id)}>
                <span>{String(++n).padStart(2, "0")}</span>{label}
              </button>
            ))}
          </nav>
        ))}
        <p className="dm-note">The host app is deliberately plain and unbranded. Paywise is the layer on top.</p>
      </aside>
      <main className="dm-stage">
        <Device key={`${screen}-${nonce}`} screen={screen} go={go} style={{ zoom: scale }} />
      </main>
    </div>
  );
}
