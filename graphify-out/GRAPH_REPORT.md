# Graph Report - portfolio  (2026-10-29)

## Corpus Check
- 45 files · ~33,968 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 18 file(s) not represented in the graph (top: .css 16, (none) 2)

## Summary
- 400 nodes · 832 edges · 18 communities (13 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2100a190`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cosell/CaseStudy.jsx
- package.json
- Sections.jsx
- paywise/CaseStudy.jsx
- steadytrack/CaseStudy.jsx
- screens.jsx
- Site.jsx
- useReveal
- DesignSystem.jsx
- Suhani Rajoria — portfolio site
- AppScreens.jsx
- Collage.jsx
- NameHero.jsx
- Header.jsx
- README.md

## God Nodes (most connected - your core abstractions)
1. `react` - 23 edges
2. `CaseStudy()` - 23 edges
3. `Block()` - 21 edges
4. `CaseStudy()` - 16 edges
5. `CaseStudy()` - 15 edges
6. `CoMark()` - 13 edges
7. `lucide-react` - 11 edges
8. `Sections()` - 11 edges
9. `Design()` - 10 edges
10. `Lead()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Structure` --references--> `SessionScreen()`  [INFERRED]
  CLAUDE.md → src/work/steadytrack/AppScreens.jsx
- `Structure` --references--> `GridHero()`  [INFERRED]
  CLAUDE.md → src/components/GridHero.jsx
- `Structure` --references--> `Sections()`  [INFERRED]
  CLAUDE.md → src/components/Sections.jsx
- `Structure` --references--> `quadMatrix()`  [INFERRED]
  CLAUDE.md → src/components/covers/stage.js
- `Structure` --references--> `useStageFit()`  [INFERRED]
  CLAUDE.md → src/components/covers/stage.js

## Import Cycles
- None detected.

## Communities (18 total, 5 thin omitted)

### Community 0 - "cosell/CaseStudy.jsx"
Cohesion: 0.06
Nodes (69): AFFINITY, Analysis(), BREAKS, CAPS, CaseStudy(), Chips(), CONTROLS, Define() (+61 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (39): dependencies, @fontsource/anton@^5.3.0, @fontsource/caveat@^5.3.0, @fontsource/cormorant-garamond@^5.3.0, @fontsource/dancing-script@^5.3.0, @fontsource/instrument-serif@^5.3.0, @fontsource/inter-tight@^5.3.0, @fontsource/jost@^5.3.0 (+31 more)

### Community 2 - "Sections.jsx"
Cohesion: 0.08
Nodes (36): Structure, @phosphor-icons/react, App(), CosellCover(), M, PaywiseCover(), QUAD, THUMB (+28 more)

### Community 3 - "paywise/CaseStudy.jsx"
Cohesion: 0.09
Nodes (44): Analysis(), ARTICLES, CALL, CaseStudy(), Chips(), CountUp(), CURVE, Design() (+36 more)

### Community 4 - "steadytrack/CaseStudy.jsx"
Cohesion: 0.11
Nodes (38): useActiveId(), useRevealAll(), AppBlock(), AREAS, Block(), CaseStudy(), CHALLENGES, Compare() (+30 more)

### Community 5 - "screens.jsx"
Cohesion: 0.15
Nodes (29): lucide-react@^0.468.0, lucide-react, Demo(), IDS, readHash(), Avatar(), CollectFlow(), CompanionHome() (+21 more)

### Community 6 - "Site.jsx"
Cohesion: 0.15
Nodes (26): about, aboutPhoto, contact, experience, hero, recommendations, skills, stats (+18 more)

### Community 7 - "useReveal"
Cohesion: 0.22
Nodes (9): Contact(), Projects(), Tools(), Work(), heroImage, projects, services, tools (+1 more)

### Community 8 - "DesignSystem.jsx"
Cohesion: 0.22
Nodes (11): Logo(), LogoMark(), COLOR_GROUPS, DesignSystem(), ICONS, Level(), MARKS, Panel() (+3 more)

### Community 9 - "Suhani Rajoria — portfolio site"
Cohesion: 0.20
Nodes (9): CoSell case study brief (in progress), CoSell prototype (separate project, NOT in git yet), Current goal, graphify, Never commit, Open TODOs (need Suhani's input), Run / build, Style and wording rules (from Suhani) (+1 more)

### Community 10 - "AppScreens.jsx"
Cohesion: 0.40
Nodes (9): AppScreens(), HomeScreen(), Nav(), NOTES, Phone(), ProgressScreen(), SessionScreen(), ShareScreen() (+1 more)

### Community 11 - "Collage.jsx"
Cohesion: 0.28
Nodes (6): checklist, Collage(), menu, nav, Piece(), photos

### Community 12 - "NameHero.jsx"
Cohesion: 0.33
Nodes (5): CHARACTERS, MOBILE_SET, NameHero(), NAV, reduced()

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `package.json` to `cosell/CaseStudy.jsx`, `Sections.jsx`, `paywise/CaseStudy.jsx`, `steadytrack/CaseStudy.jsx`, `screens.jsx`, `Site.jsx`, `useReveal`, `DesignSystem.jsx`, `AppScreens.jsx`, `NameHero.jsx`?**
  _High betweenness centrality (0.491) - this node is a cross-community bridge._
- **Should `cosell/CaseStudy.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05627545353572751 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `screens.jsx` to `cosell/CaseStudy.jsx`, `package.json`, `paywise/CaseStudy.jsx`, `steadytrack/CaseStudy.jsx`, `DesignSystem.jsx`, `AppScreens.jsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.054426705370101594 - nodes in this community are weakly interconnected._
- **Why does `@phosphor-icons/react` connect `Sections.jsx` to `package.json`, `Collage.jsx`, `Site.jsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `Sections.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08163265306122448 - nodes in this community are weakly interconnected._
- **Should `paywise/CaseStudy.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09468599033816426 - nodes in this community are weakly interconnected._