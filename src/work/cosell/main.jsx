import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import CaseStudy from "./CaseStudy.jsx";
import "./cs.css";
import "./story.css";
import "./extras.css";
import "@fontsource-variable/plus-jakarta-sans/index.css";
import "../../font.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaseStudy />
  </StrictMode>
);
