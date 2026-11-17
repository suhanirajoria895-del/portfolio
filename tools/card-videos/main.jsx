// Stages for the homepage card videos. Not part of the site build.
// Open /tools/card-videos/stage.html?v=cosell|paywise|steadytrack&play in `npm run dev` to preview one,
// or run record.cjs to film all three (see README.md).
import { createRoot } from "react-dom/client";
import "@fontsource-variable/plus-jakarta-sans/index.css";
import "../../src/font.css";
import "./stage.css";

const STAGES = {
  cosell: () => import("./cosell.jsx"),
  paywise: () => import("./paywise.jsx"),
  steadytrack: () => import("./steadytrack.jsx"),
};
const name = new URLSearchParams(location.search).get("v") || "cosell";
STAGES[name]().then(({ default: Stage }) => createRoot(document.getElementById("root")).render(<Stage />));
