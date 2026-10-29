# Suhani Rajoria — portfolio site

Personal UX portfolio for Suhani Rajoria (final-year B.Des UX Design, MIT ADT University, minor in Graphic Design). Live on Vercel (`suhani-design.vercel.app`), repo `suhanirajoria895-del/portfolio`, branch `main`. Vercel deploys from `main`.

## Current goal

Applying for the **Demandbase UX Intern** role (agentic "pipeline AI" B2B platform, Hyderabad). The posting asks for proof of: design-to-code (Figma → React, GitHub, live demos), AI-native interaction patterns ("clear, human, and effective" AI), accessibility (WCAG), and design systems/components. CoSell is the hero project for this.

## Run / build

- `npm run dev` (Vite, port 5173). `.claude/launch.json` has a `portfolio` config.
- `npm run build` must pass before every commit.
- Multi-page Vite build (`vite.config.js`): `index.html` (home), `work/cosell/`, `work/paywise/` (+ `work/paywise/demo/`), `work/steadytrack/`.

## Structure

- `src/App.jsx` → `GridHero` + `Sections` (the homepage).
- `src/components/GridHero.jsx` + `src/grid-hero.css` — dark hero card: illustrated portrait (`public/assets/hero-portrait.webp`), "Hi, I am Suhani", panels: 01 "Experience Designer" + Download Resume, 02 intro line ("I look beyond the interface to understand the problem, challenge assumptions, and find what truly matters.") + Get In Touch, 03 "Selected work" carousel (counter + arrows above the cover art; only the visible slide is clickable).
- `src/components/Sections.jsx` + `src/sections.css` — homepage sections: (01) What I do (Sangria panel, bold "Good design removes everything that doesn't help.", three principles), Case studies (stacking cards, layouts split/poster/banner), Experience (Wysbrx, ABDA only — no education card), Skillset (periodic table of skills; "Dh Dev handoff", no "vibe coding"), About (bento: photo `public/assets/about-suhani.webp`, story, Currently, Off-screen), Contact.
- `src/portfolio/content.js` — site text/data (work list with `cover` keys, experience, contact, skills). `src/portfolio/Site.jsx`, `NameHero.jsx`, `Collage.jsx` etc. are old unused versions.
- `src/components/covers/` — project cover art used in the hero carousel and homepage cards:
  - `CosellCover.jsx` — HTML/CSS editorial cover (laptop with real `approval.webp`, phone with real `m-morning.webp`), scales via container units.
  - `PaywiseCover.jsx` — photo (`public/work/paywise/cover-photo.webp`) with the live Paywise pause screen mapped onto the phone via `matrix3d` (`stage.js` → `quadMatrix`, `useStageFit`), thumb redrawn on top.
  - `SteadyTrackCover.jsx` — sage editorial cover using the glove flat-lay render (`public/work/steadytrack/renders/flatlay.jpg`) with the live `SessionScreen` mapped onto the phone.
- Case studies: `src/work/cosell/`, `src/work/paywise/`, `src/work/steadytrack/` (each has its own CSS; CoSell also `Story.jsx`, `Chapters.jsx`, `story.css`, `DesignSystem.jsx`).

## CoSell prototype (separate project, NOT in git yet)

- Source: `C:\Users\suhan\OneDrive\Desktop\cosell` (React 19 + TypeScript + Vite + Tailwind). Not a git repo — needs one, plus a GitHub link on the case study.
- Its build is copied into `public/work/cosell/demo/`. Rebuild with hash routing and an absolute base, and disable Git Bash path mangling:
  ```
  cd ../cosell
  MSYS_NO_PATHCONV=1 VITE_HASH_ROUTER=1 npx vite build --base=/work/cosell/demo/ --outDir dist-portfolio --emptyOutDir
  ```
  then replace `public/work/cosell/demo/` with `dist-portfolio/`. Demo URL: `/work/cosell/demo/index.html#/login`.

## Style and wording rules (from Suhani)

- Homepage palette: Cosmic Latte `#FFF8E7`, Sangria `#930500`, Cornflower `#95BBEA`; no pinks/purples on the homepage. Hero is dark with Instrument Serif italic; sections below use DM Sans. Keep things minimal, not over-colourful; no terracotta.
- CoSell: say **recommendation**, never "suggestion". Use **click(s)**, not tap(s), in CoSell, Paywise and SteadyTrack copy ("Finger taps" in SteadyTrack is an exercise name — leave it).
- Case study facts cards: same light-grey two-column card on all three; no "Achievement"; Team for CoSell and Paywise = **Individual**.
- Trade-off sections are titled "Trade-offs: design decisions and reasoning" (never "what I gave up").
- Never invent facts, metrics, quotes or test results. Use visible `[TODO: …]` placeholders.
- Don't name specific marketplaces in CoSell case-study copy (use "Marketplace A/B/C"); real competitor tools can be named with citations.
- Plain, short sentences. Avoid "leverage", "seamless", "robust", "empower", etc.
- Don't reuse other people's illustrations or copy reference portfolios' text/visuals.
- Push only when Suhani says so; she usually says "push it". Commit messages end with the Co-Authored-By line.

## Never commit

`public/assets/66.png`, `public/work/paywise-cover.png`, `public/work/steadytrack/Futuristic Fingerless Glove…png`, `.impeccable/config.json`, scratch files like `cover-test.html`, `public/__axe.min.js`. `design-assets/` is gitignored (it holds image/cover prompts).

## CoSell case study brief (in progress)

Brief file: `C:\Users\suhan\Downloads\CoSell_case_study_brief.md` (copy into `docs/`). Phase A (case study page) is **built but uncommitted**:

- Hero: outcome-led h1, tags, Timeline, Quick read / Full story toggle.
- Numbered citations `<Cite n />` → Sources section (`Story.jsx`, 8 sources), scope box.
- Research findings with "Design implication"; competitor table with Opportunity column; persona avatar (no stock photo), numbers labelled as estimates.
- Journey Today / With CoSell toggle; principles with "Seen in"; "When Co acts, asks, stops" diagram; Considered vs chosen cards.
- Price-card iteration (industry designer feedback) with Before/After and a live After card; Ask Co chapter; severity system (Info/Watch/Urgent/Critical); new sections 07 Accessibility, 08 Design to code, 10 Sources. Section index 01–10.
- Accessibility: axe-core (WCAG 2.2 AA) now 0 violations on the page (contrast tokens darkened: `--muted #5f5f69`, `--good #15704a`; scroll regions focusable). Run axe with all `[data-reveal]` set to `.in` first, or hidden elements get skipped.

**Phase B (not started):** redesign the CoSell product UI in `../cosell`: decisions-first home ("Needs your decision" ranked by money at risk, "Handled for you", KPI strip, agent status), redesigned price card with the severity system across stock/returns/ads, "Why this?" drawer, activity log, palette refresh; rebuild demo and refresh screenshots. Then apply the same structure to Paywise and SteadyTrack.

**Next planned extra project:** a small public "AI UX patterns" component kit (React + TS) built from CoSell's components, with a live demo and GitHub repo.

## Open TODOs (need Suhani's input)

- CoSell timeline (duration · month year).
- GitHub repo link for the CoSell prototype.
- Confirm the industry-designer feedback wording, and the "40 observations" count.
- Accessibility audit of the prototype itself.
- Real LinkedIn URL in `content.js` (currently linkedin.com). `/resume.pdf` doesn't exist (resume contains a phone number — ask before publishing).
- SteadyTrack year: cover says 2025, homepage card says 2024.
- CoSell screenshots still show "Suggested by Co" and real marketplace names; need re-export.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
