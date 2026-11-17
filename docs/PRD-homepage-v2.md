# PRD: Homepage v2, same twilight vibe with more personality

Owner: Suhani Rajoria · Builder: Claude Fable 5.2 · Scope: homepage (`index.html`). Case study pages are out of scope. `RoadFooter` (the race) stays exactly as it is.

---

## 1. Goal

Keep the current twilight look, but make the homepage more personal, more interactive and more grown up. Personality comes from things that are really Suhani's: she is a Kathak dancer, a baker, a sculptor, a painter, a sketcher; she travels and loves music; and as a graphic designer she has designed posters and card decks. A recruiter must still reach a case study within 10 seconds.

**Keep:** twilight colours (night `#221c3d` → `#1b1633`, cream text `#fff4e8`, peach `#ffb46b`, coral and pink only in small accents), the fixed nav, the stacking project cards and covers, the footer race, the content in `src/portfolio/content.js`.

**Remove:** the envelope/letter opening, the sparkles, the washi tape, the handwritten "Hi, I'm Suhani" note, the loud sunset gradient blocks. Tone the hero sky down (see 4.1).

**Never:** a site-wide metaphor (letters, stamps, postcards), a light cream-paper theme, a realistic or 3D version of the mascot, cursive or italic display type.

## 2. References and what to take

| Site | Take this | Do not take |
|---|---|---|
| Hritika Arjunwadkar (hritikaarjunwadkar2026.framer.website) | Interactivity: a toolkit of objects you can **drag around**, "hover over objects to see" labels, an About collage, a small mascot helper in the corner. | Her layout and objects. |
| Riddhima Bansal (riddhimabansal.framer.website) | An About page that feels like a collage of the person: cut-out objects around a figure, "What's on my playlist", fun facts, "Pantone feels" swatches. | Her real-photo cutout of herself. Suhani's figure is the illustrated mascot. |
| Naman (namanux26.framer.website) | A hero inside a framed "window" card, a small "Currently designing …" line, a strip of small doodles between sections. | The 3D figure. |
| Suhani's Pinterest board | Aesthetic, warm, tactile objects; editorial type; mood boards; posters pinned up. | Anyone's actual layout or images. |

## 3. Assets (all generated for this project)

### Mascot (sketch style: ink line + flat fills, white tee, blue jeans, black hair, soft rose lips)

`public/mascot/`: `stand.webp` (full body with sketchbook), `wave.webp` (waist-up waving), `peek.webp` (peeking from the right edge), `laptop.webp` (working at a laptop). Decorative: `alt=""`, `aria-hidden`.

### Realistic props (Pinterest-style still-life cutouts, transparent)

`public/props/`:

| Her side | Files |
|---|---|
| Kathak | `ghungroo.webp` |
| Sculpting | `clay-bust.webp` |
| Painting | `palette.webp` |
| Sketching | `dancer-sketch.webp`, `sketchbooks.webp` |
| Baking | `brownie.webp`, `cupcake.webp`, `cake-slice.webp` |
| Music | `headphones.webp`, `record-player.webp` |
| Travel | `travel-journal.webp`, `film-camera.webp` |
| Graphic design | `card-deck.webp`, `poster-roll.webp`, `print-proofs.webp`, `swatches.webp` |

Also available from earlier: `public/post/` paperclip, binder clip, push pin, tapes, folder, clipboard.

### Doodles

Single-colour line only (cream or peach on night), drawn as inline SVG in code: arrows, underlines, small stars, a squiggle, a heart, motion lines. Never multi-colour illustrations.

### Needed from Suhani

Her real **posters** and **card deck** designs as images (for the Graphic design section). The generated `card-deck.webp` and `print-proofs.webp` are only props, never presented as her work.

## 4. Sections

### 4.1 Hero: a card that types her roles

- Background: keep the twilight sky but calmer: drop the sparkles, dim the sky photo to about 60% with a night overlay, and fade it into the page colour sooner.
- Centre: one **card**, framed like a design-tool canvas: a thin top bar with three small dots on the left and a label `suhani-rajoria.fig` on the right; inside, generous space.
- Inside the card:
  - Small line: `Hi, I'm Suhani 👋` (plain sans, not handwriting).
  - Big line: **I'm a** `[typing word]` where the word types, pauses and deletes in a loop: **UX designer → UI designer → Visual designer → Creative designer** (Suhani to confirm the list and order). A blinking caret; the typed word is in peach with a soft **selection box with corner handles** around it, like a selected text layer.
  - Her line **Curiosity, with a purpose.** and her two-sentence intro (unchanged).
  - Buttons: **See my work** and **Resume ↗**.
  - Small status: `● Open to internships · Pune 14:20` (live clock; Suhani to confirm wording and city).
- Mascot: `peek.webp` peeks over the right edge of the card. She leans a few degrees toward the cursor (spring). Click her and she pops a small speech bubble with one random line from a list Suhani writes, for example "Probably baking right now" (Suhani writes these; no invented facts).
- Multiplayer cursor (optional): a small labelled cursor `Suhani` drifts across the card and "clicks" the typed word, like a Figma collaborator.

### 4.2 Doodle strip

Between hero and work, a thin row of small line doodles that scrolls slowly sideways: a ghungroo, a cupcake, a paintbrush, headphones, a plane, a pencil (single-colour line SVG). Pauses on hover.

### 4.3 Work (case studies)

Keep the stacking split cards and covers. Restyle to the calmer twilight: card surface `#2a2350`, 1px cream hairline at 10%, 20px radius. `laptop.webp` sits beside the section heading. Hover: image scales 1.02, arrow moves 4px.

### 4.4 Graphic design: "The pin board"

The wow section, and the place her posters and card decks live. Recommended:

- A wide, dark **pin board** (deep felt texture, night-tone) under a soft warm "desk lamp" glow that follows the cursor (radial gradient that lights the area under the cursor; everything else stays dim).
- Suhani's **posters** are pinned on it at slight angles with push pins and tape (real images from her). Hover: a poster lifts, straightens and its shadow grows. Click: it opens full size in a lightbox with title and one line about it.
- Her **card deck** sits on the board as a stack. Click it and the cards **deal out** across the board in a fan, one by one, then each can be flipped over to see the back. Click the stack again to gather them.
- Posters and cards can be **dragged** around the board (Hritika-style), with a "Tidy up" button that springs them back.
- Props around the edges for atmosphere: `swatches.webp`, `poster-roll.webp`, `print-proofs.webp`.
- Mobile: becomes a horizontal snap carousel of posters, then the card deck fan.

Alternative if the pin board feels too much: an **infinite poster marquee** (two rows moving in opposite directions, pause on hover, click to open). Simpler, but much more common.

### 4.5 Experience

Simple list (role, org, dates, place, three points). No props.

### 4.6 Skills: the toolkit table

Hritika-style but her own: the skills groups (Research, Design, Systems, Build) as labelled chips, plus a small toolkit tray where objects can be dragged and **hovering an object shows what it stands for**. Use the earlier `post/` and `props/` objects that fit (sketchbooks for research notes, swatches for visual design). Keep "Dev handoff"; never "vibe coding".

### 4.7 About: "Bits of me" collage

The personality section, after Riddhima's collage idea but with Suhani's own things:

- Centre: `stand.webp` (her mascot, full body), large.
- Around her, the realistic props, each a small **interactive** piece. Hover shows a label; drag moves it; some react:
  - `ghungroo.webp` → "Kathak" (hover: a gentle jingle shake; optional soft bell sound, muted by default, off with reduced motion).
  - `brownie.webp`, `cupcake.webp` → "Baking" (click: a small bite gets taken out with a mask).
  - `clay-bust.webp` → "Sculpting".
  - `palette.webp` → "Painting".
  - `dancer-sketch.webp` → "Sketching".
  - `travel-journal.webp`, `film-camera.webp` → "Travel" (camera click: a white flash and a polaroid slides out).
  - `headphones.webp` or `record-player.webp` → "On repeat": a small playlist card with 3 songs (Suhani provides the songs).
- Text blocks around: "Bits of me" (her `content.about` paragraphs, shortened), a short quote in her own words, "Pantone feels" with three of her colours, and three fun facts **written by Suhani**.
- Line doodles (single colour) connect labels to objects.
- Mobile: becomes a vertical stack of small cards with each prop.

### 4.8 Mascot helper (optional)

A small `wave.webp` head in the bottom-right corner. Click: a little bubble with three shortcuts (See work, Resume, Say hi). It hides while the footer race is on screen.

### 4.9 Footer

Unchanged.

## 5. Motion and interaction

| # | Moment | Behaviour |
|---|---|---|
| M1 | Hero load | Card fades and rises 24px (600ms); content staggers in (80ms). |
| M2 | Typing roles | 70ms per character, hold 1.6s, delete 35ms per character; selection box resizes with a spring to fit the word. |
| M3 | Mascot peek | Slides in from behind the card edge after 800ms; leans toward cursor; click shows a bubble for 2.5s. |
| M4 | Doodle strip | Slow marquee, pause on hover. |
| M5 | Pin board lamp | Radial light follows the cursor (eased), board dims elsewhere. |
| M6 | Poster hover | Lift 8px, rotate to 0°, shadow grows; click opens lightbox (View Transition). |
| M7 | Card deck | Click deals cards into a fan (stagger 60ms, spring); click a card to flip (rotateY 180°). |
| M8 | Drag | Posters, cards and About props drag with inertia and spring back on "Tidy up". |
| M9 | About reactions | Ghungroo shake, brownie bite, camera flash + polaroid, headphones open the playlist. |
| M10 | Section reveal | Fade up 16px once, at 20% visibility. |

Libraries: `motion` (motion.dev) for springs, drag and layout; CSS for simple transitions. Every interaction has a keyboard path (buttons for deal, flip, tidy, open), and with `prefers-reduced-motion` everything is static (no typing loop: show the roles as a static list "UX · UI · Visual · Creative designer").

## 6. Accessibility

WCAG 2.2 AA. Typed text is announced once as a static sentence (`aria-label="I'm a UX, UI, visual and creative designer"`, the animated word `aria-hidden`). Drag is never the only way to reach content. Lightbox traps focus and closes on Escape. Contrast of muted text and peach on night checked. axe-core after build: 0 violations.

## 7. Copy rules

Only Suhani's own content and lines; never invent facts, songs, fun facts, quotes or metrics: use visible `[TODO: …]`. Short plain sentences. "Click", not "tap". "Wearable", never "hardware". No "leverage", "seamless", "robust", "empower", no UX laws, no chai, no "big dreams". No italic or cursive display type.

## 8. Build steps

1. Tone down the hero sky; remove envelope, sparkles, tape, note.
2. Hero card with typing roles, status line, mascot peek (M1–M3).
3. Doodle strip (M4).
4. Work restyle with laptop mascot.
5. Graphic design pin board (M5–M8) with Suhani's poster and card images.
6. Experience list; Skills toolkit.
7. About collage with interactive props (M9).
8. Mascot helper (optional).
9. Mobile, reduced motion, keyboard paths, axe-core, Lighthouse (≥ 85 mobile). `npm run build` passes.

One commit per step. Push only when Suhani says so.

## 9. Needed from Suhani

1. Role list for the typing line, and its order.
2. Status line wording and city.
3. Poster images and card deck images (fronts and backs), with a title for each.
4. Three songs for "On repeat", three fun facts, one quote in her own words, three "Pantone feels" colours.
5. A few one-liners for the mascot's speech bubble.
