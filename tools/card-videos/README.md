# Homepage card films

Short edited films for the three case-study cards on the homepage (`public/work/<project>/card.mp4` + `card-poster.webp`).
They are built from the real prototype screens, not screen recordings: kinetic type, zooms into the screens, and a closing card.

- `stage.html` + `main.jsx`: loads one stage, chosen by `?v=cosell|paywise|steadytrack`.
- `cosell.jsx`, `paywise.jsx`, `steadytrack.jsx`: each film's scenes and cues. `lib.jsx` has the shared timeline helpers, `stage.css` the look.
- `record.cjs`: films a stage frame by frame on its own clock, encodes it with ffmpeg and writes the poster.

To preview one in real time, run `npm run dev` and open `/tools/card-videos/stage.html?v=paywise&play`.

To re-record after a UI change:

```
npm run dev
node tools/card-videos/record.cjs            # all three
node tools/card-videos/record.cjs paywise    # just one
```

Needs Playwright with Chromium, and ffmpeg. These files are not part of the site build.
