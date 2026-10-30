import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CaseStudy from "./CaseStudy.jsx";
import "./rk.css";
import "./bands.css";
import "./demo/app.css";
import "@fontsource-variable/plus-jakarta-sans/index.css";
import "../../font.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaseStudy />
  </StrictMode>
);
