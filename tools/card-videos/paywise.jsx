// Paywise card video, 1280 × 800. The phones are the live prototype screens.
import { useEffect, useRef, useState } from "react";
import { Device, PwMark } from "../../src/work/paywise/demo/screens.jsx";
import "../../src/work/paywise/demo/app.css";
import { Lockup, Sc, Words, assetsReady, focus, union, useAt, useTimeline } from "./lib.jsx";

const CUES = [300, 1800, 3300, 5000, 7400, 10000, 11600];
const END = 12200;

export default function Paywise() {
  const s = useTimeline(CUES, END);
  const a = useRef(null);
  const [cam, setCam] = useState("none");

  useEffect(() => { window.__ready = assetsReady().then(() => new Promise((r) => setTimeout(r, 300))); }, []);
  useEffect(() => { if (s === 0 || s === 3) setCam("none"); }, [s]);

  // 4: push in on the countdown ring and the headline of the pause sheet.
  useAt(s, 4, 0, () => {
    const top = a.current.querySelector(".sheet__top");
    const box = union([top, top.nextElementSibling].filter(Boolean).map((el) => el.getBoundingClientRect()));
    setCam(focus(box, 2.25, 640, 290));
  });
  // 5: pull back and make room for the second phone and the line beside it.
  useAt(s, 5, 0, () => setCam("translate(64px, 0px) scale(1)"));

  return (
    <main className="stage stage--paywise" data-s={s} style={{ width: 1280, height: 800 }}>
      <Sc s={s} from={3} to={5} className="pw-light" />
      <Sc s={s} from={1} to={1} className="kt"><p><Words>Scams take hours.</Words></p></Sc>
      <Sc s={s} from={2} to={2} className="kt"><p><Words>The payment takes *seconds.*</Words></p></Sc>

      <div className="cam" style={{ transform: cam }}>
        <Sc s={s} from={3} to={5} className="pw-phone pw-phone--a"><div ref={a}>{s >= 3 && s <= 6 && <Device screen="risk" style={{ zoom: 0.8 }} />}</div></Sc>
        <Sc s={s} from={5} to={5} className="pw-phone pw-phone--b">{s >= 5 && s <= 6 && <Device screen="alert" style={{ zoom: 0.8 }} />}</Sc>
      </div>

      <Sc s={s} from={4} to={4} className="pw-cap pw-cap--bottom"><p><Words>Only when it looks *wrong.*</Words></p></Sc>
      <Sc s={s} from={5} to={5} className="pw-cap pw-cap--left"><p><Words>Never decide *alone.*</Words></p></Sc>

      <Lockup s={s} from={6} mark={<PwMark size={104} light />} name="Paywise" tag="Live prototype" />
    </main>
  );
}
