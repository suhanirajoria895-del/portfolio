import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/mrs-saint-delafield/400.css";
import { WorkCards } from "../components/Sections.jsx";
import markup from "./home.html?raw";
import { initHome } from "./home.js";
import "./home.css";

/* The homepage is mostly hand-built motion and drag code, so it renders static markup once
   and wires the interactions up imperatively after mount. The case-study cards are the
   original React stacking cards, mounted into the Work section. */
export default function Home() {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    setCards(document.getElementById("workCards"));
    initHome();
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {cards && createPortal(<WorkCards />, cards)}
    </>
  );
}
