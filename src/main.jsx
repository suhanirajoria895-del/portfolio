import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700-italic.css";
import "@fontsource/caveat/400.css";
import "@fontsource/caveat/700.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/inter-tight/700.css";
import "@fontsource-variable/dm-sans/index.css";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/600.css";
import "@fontsource/dancing-script/700.css";
import "@fontsource/inter-tight/500.css";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
