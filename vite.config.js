import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Multi-page: the portfolio home plus one static page per case study (works on any static host).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        cosell: resolve(import.meta.dirname, "work/cosell/index.html"),
      },
    },
  },
});
