import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CaseStudy from "./CaseStudy.jsx";
import "../steadytrack/st.css";
import "../steadytrack/apps.css";
import "./rk.css";
import "./screens.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaseStudy />
  </StrictMode>
);
