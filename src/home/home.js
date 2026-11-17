// Homepage behaviour: opening, nav, hero card, constellation, typewriter, guide mascot,
// experience badges, graphic carousel and the About board. Runs once on mount.
export function initHome() {
  if (window.__homeInit) return;
  window.__homeInit = true;
    const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const at = new URLSearchParams(location.search).get("at");
    const root = document.documentElement;
    if (at) { root.classList.add("shot"); $$("header, section, .handoff, #contact").forEach((e) => { if (e.id !== at) e.style.display = "none"; }); }
    const splitChars = (el, cls) => { el.innerHTML = [...el.textContent].map((c, i) => c === " " ? " " : `<span class="${cls}" style="--i:${i}">${c}</span>`).join(""); };

    // ── Opening: mascot sketched, coloured, then the paper tears open onto the hero (once per visit; click to skip)
    const intro = $("#intro");
    let seen = false; try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch (e) {}
    const start = () => { document.body.classList.add("ready"); };
    if (at || reduce || seen || location.hash) { intro.remove(); start(); }
    else {

      const done = () => { if (!intro.isConnected || intro.classList.contains("out")) return; intro.classList.add("out"); start(); try { sessionStorage.setItem("intro-seen", "1"); } catch (e) {} setTimeout(() => intro.remove(), 1300); };
      setTimeout(done, 3300); intro.addEventListener("click", done);
    }

    // ── Nav
    const nav = $("#nav"), pill = $("#pill");
    const sigT = $("#logo .sig-t");
    $("#logo").addEventListener("pointerenter", () => { if (reduce || sigT.getAnimations().some((a) => a.playState === "running")) return; sigT.style.animation = "none"; void sigT.offsetWidth; sigT.style.animation = "write 1.6s cubic-bezier(.55, .1, .35, 1) forwards"; });
    const movePill = () => { const a = $(".links a.on"); if (!a) return (pill.style.width = "0"); pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px"; };
    const onScroll = () => {
      nav.classList.toggle("is-merged", scrollY > 80 || (!!at && at !== "hero"));
      let cur = "hero";
      $$("[data-spy]").forEach((a) => { const s = document.getElementById(a.dataset.spy); if (s && s.offsetParent !== null && s.getBoundingClientRect().top < innerHeight * .4) cur = a.dataset.spy; });
      $$("[data-spy]").forEach((a) => a.classList.toggle("on", a.dataset.spy === cur));
      movePill();
      $("#prog").style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))})`;
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    nav.addEventListener("transitionend", movePill); if (document.fonts) document.fonts.ready.then(movePill);

    // ── Hero: name letters, card tilt, sparkles and shooting stars
    splitChars($("#nameTxt"), "ch");
    const card = $("#card"), photo = $("#photo"), flipper = $(".flipper", photo);
    flipper.addEventListener("click", () => photo.classList.toggle("flip"));
    flipper.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); photo.classList.toggle("flip"); } });
    $("#hero").addEventListener("pointermove", (e) => {
      const b = card.getBoundingClientRect(), dx = (e.clientX - (b.left + b.width / 2)) / b.width, dy = (e.clientY - (b.top + b.height / 2)) / b.height;
      card.style.setProperty("--ry", (Math.max(-1, Math.min(1, dx)) * 5).toFixed(2) + "deg"); $("#float").style.setProperty("--mx", Math.max(-1, Math.min(1, dx)).toFixed(2)); $("#float").style.setProperty("--my", Math.max(-1, Math.min(1, dy)).toFixed(2)); card.style.setProperty("--rx", (Math.max(-1, Math.min(1, dy)) * -4).toFixed(2) + "deg");
    });
    $("#hero").addEventListener("pointerleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
    const SPARKS = [[30, 10, 22, 5], [70, 8, 26, 6], [50, 96, 18, 2]];
    $("#sparks").innerHTML = SPARKS.map(([x, y, w, n], k) => `<img class="spark" src="/hero/sparkle-${n}.webp" alt="" style="left:${x}%;top:${y}%;width:${w}px;--t:${3 + (k % 3)}s;--dl:${-k * .7}s" />`).join("");
    const shoot = () => { if (document.hidden) return; const s = document.createElement("i"); s.className = "shoot"; s.style.left = 45 + Math.random() * 50 + "%"; s.style.top = 4 + Math.random() * 30 + "%"; $("#hero").appendChild(s); setTimeout(() => s.remove(), 1400); };
    if (!reduce && !at) (function loop() { shoot(); setTimeout(loop, 2600 + Math.random() * 3200); })();

    // ── Typed role line. Phrases are about how she works, never hobbies.
    const PHRASES = ["UX designer", "Visual designer", "Systems thinker", "Research-led", "Detail-obsessed", "Curious mind", "Problem framer", "Code-curious"];
    const twTxt = $("#twTxt");
    const word = $("#word"); let text = PHRASES[0], pi = 0, mode = "del";
    function step() {
      const p = PHRASES[pi];
      if (mode === "type") {
        if (text.length < p.length) { text = p.slice(0, text.length + 1); word.textContent = text; if (twTxt) twTxt.textContent = text; return setTimeout(step, 85 + Math.random() * 90); }
        mode = "del"; return setTimeout(step, 2000);
      }
      if (text.length) { text = text.slice(0, -1); word.textContent = text; if (twTxt) twTxt.textContent = text; return setTimeout(step, 45); }
      mode = "type"; pi = (pi + 1) % PHRASES.length; setTimeout(step, 380);
    }
    if (!reduce && !at) setTimeout(step, 3400);

    // ── Skills as a constellation: [name, x%, y%], joined in order around the card
    const STARS = [
      ["User research", 5, 22, "Interviews, surveys and observation to learn how people really work."],
      ["Journey mapping", 8, 34, "Mapping each step, feeling and pain point across a task."],
      ["Information architecture", 4, 46, "Structuring content so people find things where they expect them."],
      ["Wireframing", 8, 58, "Quick low-fidelity layouts to test structure before style."],
      ["Interaction design", 4, 70, "States, feedback and flows that make a product feel responsive."],
      ["Prototyping", 8, 84, "Clickable flows to test ideas before anything is built."],
      ["Design systems", 4, 95, "Tokens, components and rules that keep screens consistent."],
      ["Accessibility", 96, 94, "Contrast, focus, labels and plain language, checked against WCAG."],
      ["Visual design", 92, 82, "Type, colour and layout with a clear hierarchy."],
      ["Branding", 96, 68, "Identities, logos and the visual voice that ties them together."],
      ["Typography", 92, 52, "Choosing and pairing type that reads well at every size."],
      ["Dev handoff", 96, 36, "Specs, tokens and notes developers can build from."]];
    const STARPATH = "M8 0c.6 4.2 3.2 7 8 8-4.8 1-7.4 3.8-8 8-.6-4.2-3.2-7-8-8 4.8-1 7.4-3.8 8-8z";
    $("#stars").innerHTML = STARS.map(([n, x, y, d], k) => `<button class="star ${x < 30 ? "l" : x > 70 ? "r" : ""}" aria-label="${n}" style="left:${x}%;top:${y}%;--dl:${-k * .45}s;--k:${k}"><svg viewBox="0 0 16 16"><path d="${STARPATH}"/></svg><span class="tag" aria-hidden="true">${n}</span></button>`).join("");
    $("#conLines").innerHTML = `<polyline points="${STARS.map((s) => s[1] + "," + s[2]).join(" ")}"/>${STARS.slice(1).map((s, k) => `<line class="seg" pathLength="1" x1="${STARS[k][1]}" y1="${STARS[k][2]}" x2="${s[1]}" y2="${s[2]}"/>`).join("")}<line id="conCur"/>`;
    $("#skillsM").innerHTML = STARS.map((s) => `<span>${s[0]}</span>`).join("");
    const starEls = $$(".star"), conCur = $("#conCur"), heroEl = $("#hero");
    heroEl.addEventListener("pointermove", (e) => {
      const b = heroEl.getBoundingClientRect(), mx = e.clientX - b.left, my = e.clientY - b.top;
      let best = null, bd = 260;
      starEls.forEach((s, k) => {
        const d = Math.hypot(STARS[k][1] / 100 * b.width - mx, STARS[k][2] / 100 * b.height - my);
        s.style.setProperty("--p", Math.max(0, 1 - d / 220).toFixed(2));
        if (d < bd) { bd = d; best = k; }
      });
      starEls.forEach((s, k) => s.classList.toggle("near", k === best));
      if (best === null) return (conCur.style.opacity = 0);
      conCur.setAttribute("x1", mx / b.width * 100); conCur.setAttribute("y1", my / b.height * 100);
      conCur.setAttribute("x2", STARS[best][1]); conCur.setAttribute("y2", STARS[best][2]); conCur.style.opacity = .8;
      const c = card.getBoundingClientRect(); card.style.setProperty("--sx", e.clientX - c.left + "px"); card.style.setProperty("--sy", e.clientY - c.top + "px");
    });
    heroEl.addEventListener("pointerleave", () => { conCur.style.opacity = 0; starEls.forEach((s) => { s.style.setProperty("--p", 0); s.classList.remove("near"); }); });

    const buddy = $("#buddy"), bubble = $("#bubble");
    let bubbleT;
    const say = (msg, ms = 2600) => { bubble.innerHTML = msg; bubble.classList.remove("hide"); clearTimeout(bubbleT); bubbleT = setTimeout(() => bubble.classList.add("hide"), ms); };
    const hop = () => { buddy.classList.remove("hop"); void buddy.offsetWidth; buddy.classList.add("hop"); };
    // Collect the stars: each one you hover lights up and joins the constellation
    const lit = new Set(), segs = $$("#conLines .seg");
    const collect = (k) => {
      if (lit.has(k)) return;
      lit.add(k); const s = starEls[k]; s.classList.add("lit", "pop-in"); setTimeout(() => s.classList.remove("pop-in"), 650);
      segs.forEach((g, i) => g.classList.toggle("on", lit.has(i) && lit.has(i + 1)));
      hop();
      if (lit.size === STARS.length) { heroEl.classList.add("all"); say("you found them all!", 3000); for (let n = 0; n < 5; n++) setTimeout(shoot, n * 180); }
      else if (lit.size === 1) say("nice! find all 12", 2400);
      else if (lit.size === 6) say("halfway there", 2000);
    };
    starEls.forEach((s, k) => { s.addEventListener("pointerenter", () => collect(k)); s.addEventListener("focus", () => collect(k)); });
    buddy.addEventListener("click", () => { hop(); say("hi! scroll down, I'll show you around", 2600); });
    const HIS = ["hi!", "hello!", "hi there!"]; let hiN = 0;
    if (!at && !reduce) setInterval(() => { if (scrollY < innerHeight * .6 && bubble.classList.contains("hide")) say(HIS[hiN++ % HIS.length], 1800); }, 5200);
    setTimeout(() => { if (!at) say("psst, can you find my 12 skills in the stars?", 4000); }, 4400);

    // ── Guide: hops into each section with a pose and a line
    const GUIDE = { work: ["laptop-floor", 150, "start here: my projects"], experience: ["point", 92, "where I've worked so far"], graphic: ["thumbs", 96, "posters and print, too"], about: ["sit", 118, "a few things about me"] };
    const guide = $("#guide"), gImg = $("#gImg"), gBub = $("#gBub"); let gAt = null, gT;
    const gSay = (m) => { gBub.textContent = m; gBub.classList.remove("hide"); clearTimeout(gT); gT = setTimeout(() => gBub.classList.add("hide"), 2600); };
    function guideTick() {
      const y = innerHeight * .55; let cur = null;
      Object.keys(GUIDE).forEach((id) => { const el = document.getElementById(id); if (!el || el.offsetParent === null) return; const b = el.getBoundingClientRect(); if (b.top <= y && b.bottom > y) cur = id; });
      const foot = $("#contact").getBoundingClientRect().top < innerHeight * .7;
      guide.classList.toggle("on", !!cur && !foot);
      if (!cur || cur === gAt) return;
      const was = gAt; gAt = cur; const [img, w, line] = GUIDE[cur];
      if (!was) { gImg.src = `/mascot/${img}.webp`; guide.style.setProperty("--gw", w + "px"); gSay(line); return; }
      guide.classList.remove("jump"); void guide.offsetWidth; guide.classList.add("jump");
      setTimeout(() => { gImg.src = `/mascot/${img}.webp`; guide.style.setProperty("--gw", w + "px"); }, 230);
      setTimeout(() => gSay(line), 450);
    }
    if (!at) { addEventListener("scroll", guideTick, { passive: true }); guideTick(); }

    // ── Work cards: image tilts toward the cursor
    $$(".wcard").forEach((c) => {
      const im = $(".img", c);
      c.addEventListener("pointermove", (e) => { const b = im.getBoundingClientRect(); im.style.setProperty("--ty", ((e.clientX - b.left) / b.width - .5) * 8 + "deg"); im.style.setProperty("--tx", ((e.clientY - b.top) / b.height - .5) * -8 + "deg"); });
      c.addEventListener("pointerleave", () => { im.style.setProperty("--tx", "0deg"); im.style.setProperty("--ty", "0deg"); });
    });

    // ── Experience: small badges that swing with the mouse and flip on click
    const EXP = [
      { org: "Wysbrx Technologies", for: "UGAO for Industree Foundation", role: "UI/UX Designer Intern", when: "Jun – Jul 2026 · Remote", c1: "#ff6b5a", c2: "#ffd2c4",
        pts: ["Redesigned admin and field app screens and designed new flows, delivering 70+ high-fidelity screens.", "Designed for accessibility: bilingual support, clear hierarchy and simple guided forms.", "Built a shared design system and worked closely with developers."] },
      { org: "ABDA Studio", for: "Boutique hotel website", role: "Research Intern", when: "May – Jul 2025 · Hyderabad", c1: "#8f7cf0", c2: "#e2dcff",
        pts: ["Led brand discovery and a competitor analysis of leading hotel sites.", "Ran user interviews and turned the insights into a clear design direction.", "Designed wireframes and early visual explorations."] },
    ];
    const ART = {
      "ABDA Studio": `<div class="note-r n1">User interviews</div><div class="note-r n2">Competitor analysis</div><div class="note-r n3">Wireframes</div>
        <div class="keytag"><svg viewBox="0 0 92 170"><circle cx="46" cy="10" r="8" fill="none" stroke="#c9a24a" stroke-width="3"/>
        <path d="M46 18v40" stroke="#c9a24a" stroke-width="5" stroke-linecap="round"/><path d="M46 44h10M46 52h7" stroke="#c9a24a" stroke-width="4" stroke-linecap="round"/>
        <path d="M18 64h56l10 14v74a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V78Z" fill="#8f7cf0"/><circle cx="46" cy="76" r="4" fill="#fff"/>
        <text x="46" y="112" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="20" fill="#fff">ABDA</text>
        <text x="46" y="130" text-anchor="middle" font-family="Poppins" font-weight="500" font-size="9" letter-spacing="2" fill="#e2dcff">STUDIO</text></svg></div>`,
      "Wysbrx Technologies": `<div class="phone p1"><i class="h"></i><i></i><i class="l"></i><i></i><i class="b"></i></div><div class="phone p2"><i class="h"></i><i class="l"></i><i></i><i></i><i class="b"></i></div>
        <div class="phone p3"><i class="h"></i><i></i><i></i><i class="l"></i><i class="b"></i></div><span class="chip k1">70+ screens</span><span class="chip k2">Design system</span>`,
    };
    const jr = $("#journey");
    [...EXP].reverse().forEach((x) => {
      const st = document.createElement("article"); st.className = "stop reveal";
      st.innerHTML = `<div class="art" aria-hidden="true">${ART[x.org] || ""}</div><div class="stxt"><span class="yr">${x.when.split(" · ")[0].split(" ").pop()}</span>
        <h3>${x.org}</h3><p class="meta">${x.role} · ${x.for}</p><p class="meta2">${x.when}</p>
        <button class="more" aria-expanded="false">What I did <i>+</i></button><ul class="did"><div>${x.pts.map((p) => `<li>${p}</li>`).join("")}</div></ul></div>`;
      const btn = $(".more", st), tog = () => { const o = st.classList.toggle("open"); btn.setAttribute("aria-expanded", o); };
      btn.addEventListener("click", tog); $(".art", st).addEventListener("click", tog);
      jr.appendChild(st);
    });
    // the paper plane follows the path as the section scrolls past
    {
      const path = $("#jp"), plane = $("#plane"), svgEl = $(".jpath");
      const fly = () => {
        const r = jr.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .3)));
        const pt = path.getPointAtLength(p), nx = path.getPointAtLength(Math.min(1, p + .01)), w = svgEl.clientWidth, hh = svgEl.clientHeight;
        const ang = Math.atan2((nx.y - pt.y) * hh / 420, (nx.x - pt.x) * w / 1000) * 180 / Math.PI;
        plane.style.left = (pt.x / 1000 * w - 17) + "px"; plane.style.top = (40 + pt.y / 420 * hh - 17) + "px"; plane.style.rotate = (ang + 20) + "deg";
      };
      fly(); addEventListener("scroll", fly, { passive: true }); addEventListener("resize", fly);
    }

    // ── Graphic carousel
    // Section is hidden until the real images arrive; then the carousel is built.
    if (!$("#graphic").hidden) {
    const SLIDES = [["poster", 1], ["poster", 2], ["deck", 3], ["poster", 4], ["poster", 5], ["deck", 6], ["poster", 7], ["poster", 8]];
    const track = $("#track"), car = $("#carousel");
    track.innerHTML = SLIDES.concat(SLIDES).map(([t, s], n) => `<div class="slide ${t === "deck" ? "deck" : ""}"><div class="ph"><img src="/dummy/d${s}.jpg" alt="" draggable="false" /></div><p><b>Work ${String(n % SLIDES.length + 1).padStart(2, "0")}</b> · placeholder</p></div>`).join("");
    let x = 0, v = reduce ? 0 : .45, drag = null;
    const slides = $$(".slide", track);
    function frame() {
      const half = track.scrollWidth / 2;
      if (!drag) x -= v;
      if (x < -half) x += half; if (x > 0) x -= half;
      track.style.transform = `translateX(${x}px)`;
      const mid = innerWidth / 2;
      slides.forEach((s) => { const b = s.getBoundingClientRect(), d = Math.min(1, Math.abs(b.left + b.width / 2 - mid) / (innerWidth * .6)); s.style.transform = `scale(${1.08 - d * .22}) translateY(${d * 18}px)`; s.style.opacity = 1 - d * .35; });
      if (!at) requestAnimationFrame(frame);
    }
    frame();
    car.addEventListener("pointerenter", () => (v = 0)); car.addEventListener("pointerleave", () => (v = reduce ? 0 : .45));
    car.addEventListener("pointerdown", (e) => { drag = { sx: e.clientX, x }; car.setPointerCapture(e.pointerId); });
    car.addEventListener("pointermove", (e) => { if (drag) x = drag.x + (e.clientX - drag.sx); });
    car.addEventListener("pointerup", () => (drag = null));
    }

    // ── About board
    const ICONS = {"maze":"M1.126 16.547c-1.5013-1.4881-1.5013-3.9009 0-5.389l4.0778-4.042c1.2692-1.258 3.205-1.4525 4.6803-.5836.4564.2687.4524.8852.077 1.2573-.3753.372-.988.34-1.4975.1923-.6524-.1891-1.386-.0287-1.9006.4813l-4.0777 4.0419a1.8935 1.8935 0 0 0 0 2.6945c.7506.744 1.9678.744 2.7184 0l8.1555-8.0836c1.5014-1.4882 3.9355-1.4882 5.437 0l4.0778 4.0418c1.5013 1.4881 1.5013 3.901 0 5.389-1.5014 1.4882-3.9356 1.4882-5.437 0l-1.3593-1.3472-1.699 1.684c-1.2692 1.258-3.205 1.4526-4.6804.5837-.4563-.2687-.4523-.8852-.077-1.2573.3754-.372.988-.34 1.4975-.1923.6524.1892 1.386.0287 1.9006-.4813l1.7476-1.7322c.724-.7175 1.8975-.7175 2.6214 0l1.4078 1.3954c.7507.744 1.9678.744 2.7186 0a1.8936 1.8936 0 0 0 0-2.6945l-4.0779-4.0419c-.7507-.744-1.9678-.744-2.7185 0L6.563 16.5471c-1.5014 1.4882-3.9356 1.4881-5.437 0","cursor":"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23","figma":"M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z","framer":"M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z","miro":"M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z","notion":"M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z","react":"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z","github":"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12","claude":"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"};
    const TOOLS = [["Figma", "figma", "#F24E1E"], ["Framer", "framer", "#0055FF"], ["Adobe XD", ["Xd", "#470137", "#ff61f6"]], ["Illustrator", ["Ai", "#330000", "#ff9a00"]], ["Notion", "notion", "#000"], ["Claude", "claude", "#D97757"], ["Cursor", "cursor", "#000"], ["GitHub", "github", "#181717"], ["React", "react", "#087ea4"]];
    const toolHTML = ([n, ic, c]) => Array.isArray(ic)
      ? `<div class="tstk"><span style="background:${ic[1]};color:${ic[2]}">${ic[0]}</span></div>`
      : `<div class="tstk"><span><svg viewBox="0 0 24 24" fill="${c}"><path d="${ICONS[ic] || ""}"/></svg></span></div>`;
    const img = (f) => `<img src="/board/${f}.webp" alt="" draggable="false" />`;
    const arrow = (d) => `<svg viewBox="0 0 54 34"><path d="${d}" /></svg>`;
    const ITEMS = [
      { id: "story", x: .02, y: 32, w: 370, r: -1.5, html: `<div class="paper"><p>I'm a product designer with a visual designer's eye and a human-centred approach.</p><p>I start with how people actually think and behave, then shape interfaces and systems that feel considered, accessible and quietly confident. I'm most drawn to complex products and AI interactions, where clarity and trust carry the most weight.</p></div>` },
      { id: "me", x: .37, y: 8, w: 230, r: 4, html: `<figure class="pola"><img class="shot" src="/assets/about-suhani.webp" alt="Suhani" draggable="false" /><img class="frame" src="/board/polaroid.webp" alt="" draggable="false" /><img class="pin" src="/board/pin-red.webp" alt="" /><figcaption>daydreamer 24/7</figcaption></figure>` },
      { id: "ds-cur", x: .6, y: 42, w: 132, r: -6, html: `<div class="dcur"><svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-8 8-2.6z" fill="#ff6b5a" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg><span>Suhani</span></div>` },
      { id: "ds-aa", x: .715, y: 19, w: 108, r: 5, html: `<div class="dstk daa"><b>Aa</b><small>Poppins · 600</small></div>`, lbl: "Typography" },
      { id: "ds-al", x: .885, y: 171, w: 132, r: 7, html: `<div class="dal"><i>Hug</i>×<i>Fill</i></div>`, lbl: "Auto layout" },
      { id: "brownies", x: .6, y: 416, w: 126, r: -5, html: img("brownies"), lbl: "Baking" },
      { id: "hw-bake", x: .5, y: 531, w: 200, r: 4, hw: 1, html: `${arrow("M27 32 C 24 22, 26 12, 30 3 M24 8 L30 3 L35 9")}I make the best brownies. no debate.` },
      { id: "music", x: .745, y: 398, w: 104, r: 7, html: img("headphones"), lbl: "Music" },
      { id: "hw-music", x: .725, y: 512, w: 150, r: -4, hw: 1, html: `${arrow("M27 32 C 24 22, 26 12, 30 3 M24 8 L30 3 L35 9")}headphones on, world off` },
      { id: "tools", x: .6, y: 214, w: 150, r: -2, html: `<div class="tag-strip">Tools I use</div>` },
      ...TOOLS.map((t, n) => ({ id: "t-" + t[1], x: .585 + (n % 5) * .058 + (n > 4 ? .028 : 0), y: 254 + (n > 4 ? 66 : 0) + (n % 2) * 6, w: 58, r: [-8, 5, -3, 7, -5, 4, -6, 3, 8][n], html: toolHTML(t), lbl: t[0] })),
      { id: "tablet", x: .9, y: 264, w: 104, r: 6, html: img("tablet"), lbl: "Digital sketches" },
      { id: "ghungroo", x: .02, y: 376, w: 150, r: -8, html: img("ghungroo"), lbl: "Kathak" },
      { id: "hw-off", x: .02, y: 512, w: 200, r: 3, hw: 1, html: `off-screen, I paint, sculpt and sketch` },
      { id: "canvas", x: .17, y: 400, w: 116, r: 5, html: img("canvas"), lbl: "Painting" },
      { id: "sketch", x: .3, y: 336, w: 160, r: -3, html: img("sketchbook"), lbl: "Sketching" },
      { id: "hw-kit", x: .46, y: 312, w: 140, r: -5, hw: 1, html: `my everyday kit${arrow("M6 8 C 20 4, 36 10, 48 24 M40 24 L48 24 L47 16")}` },
      { id: "clay", x: .46, y: 360, w: 104, r: 4, html: img("clay-head"), lbl: "Sculpting" },
      { id: "pad", x: .86, y: 416, w: 150, r: 5, html: `<div class="pad" role="button" tabindex="0" aria-label="Peel off a note"><i></i><i></i><div class="pad-top">leave me<br />a note <b>✎</b></div></div>`, lbl: "Click to peel one off" },
      { id: "s-star", x: .55, y: 164, w: 78, r: -10, html: img("holo-star") },
      { id: "s-flower", x: .885, y: 24, w: 98, r: 8, html: img("smiley-flower") },
      { id: "s-heart", x: .8, y: 150, w: 74, r: -8, html: img("chrome-heart") },
      { id: "s-swatch", x: .405, y: 488, w: 104, r: -6, html: img("swatches"), lbl: "Colour" },
    ];
    const board = $("#board"), KEY = "suhani-board-v7";
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
    let z = 10, tidy = false;
    const pos = {};
    const place = (el, x, y, r) => { el.style.left = x + "px"; el.style.top = y + "px"; if (r !== undefined) el.style.rotate = r + "deg"; };
    const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} };
    function addItem(it, isNote) {
      const el = document.createElement("div"); el.className = "pi" + (it.hw ? " hw" : ""); el.dataset.id = it.id; el.style.setProperty("--w", it.w + "px"); el.style.setProperty("--r", it.r + "deg");
      el.innerHTML = it.html + (it.lbl ? `<span class="lbl">${it.lbl}</span>` : "");
      board.appendChild(el);
      const s = saved.pos && saved.pos[it.id], bw = board.clientWidth;
      pos[it.id] = { x: s ? s.x * bw : it.x * bw, y: s ? s.y : it.y, r: +it.r, home: { x: it.x, y: it.y, r: +it.r } };
      place(el, Math.min(pos[it.id].x, bw - 40), pos[it.id].y);
      let sx, sy, ox, oy;
      el.addEventListener("pointerdown", (e) => {
        if (e.target.closest("[contenteditable], button")) return;
        el.classList.add("drag"); el.style.zIndex = ++z; sx = e.clientX; sy = e.clientY; ox = parseFloat(el.style.left); oy = parseFloat(el.style.top); el.setPointerCapture(e.pointerId);
      });
      el.addEventListener("pointermove", (e) => { if (!el.hasPointerCapture(e.pointerId)) return; const nx = ox + e.clientX - sx, ny = oy + e.clientY - sy; place(el, nx, ny); if (!tidy) { pos[it.id].x = nx; pos[it.id].y = ny; } });
      el.addEventListener("pointerup", () => { el.classList.remove("drag"); if (tidy) return; saved.pos = saved.pos || {}; saved.pos[it.id] = { x: pos[it.id].x / board.clientWidth, y: pos[it.id].y }; if (isNote) saveNotes(); persist(); });
      return el;
    }
    ITEMS.forEach((it) => addItem(it));
    $$(".pi", board).forEach((el, k) => { el.style.setProperty("--k", (el.classList.contains("hw") ? 1.1 + k * .02 : k * .045) + "s"); const s = $(".tstk", el); if (s) s.style.setProperty("--fd", -k * .4 + "s"); });
    const goLive = () => { board.classList.add("entering", "live"); setTimeout(() => board.classList.remove("entering"), 2600); };
    if (at || reduce) board.classList.add("live");
    else new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { goLive(); o.disconnect(); } }), { threshold: .2 }).observe(board);
    const saveNotes = () => { saved.notes = $$(".pi[data-note]", board).map((n) => ({ id: n.dataset.id, text: $("[contenteditable]", n).textContent })); persist(); };
    function addNote(n) {
      const it = { id: n.id, x: n.x ?? .4, y: n.y ?? 300, w: 170, r: (Math.random() * 8 - 4).toFixed(1), html: `<div class="note"><button class="x" aria-label="Remove note">×</button><div contenteditable="true" spellcheck="false">${(n.text || "").replace(/</g, "&lt;")}</div></div>` };
      const el = addItem(it, true); el.dataset.note = "1"; el.style.zIndex = ++z;
      const ed = $("[contenteditable]", el); ed.addEventListener("input", saveNotes);
      $(".x", el).addEventListener("click", () => { el.remove(); if (saved.pos) delete saved.pos[it.id]; saveNotes(); });
      return ed;
    }
    (saved.notes || []).forEach((n) => addNote(n));
    const pad = $(".pad", board);
    const peel = () => {
      pad.classList.remove("peel"); void pad.offsetWidth; pad.classList.add("peel");
      const pe = pad.closest(".pi"), bw = board.clientWidth;
      const ed = addNote({ id: "n" + Date.now(), x: Math.max(0, (pe.offsetLeft - 190) / bw), y: Math.max(0, pe.offsetTop - 60) });
      saveNotes(); setTimeout(() => ed.focus(), 50);
    };
    let pd = null;
    pad.addEventListener("pointerdown", (e) => (pd = [e.clientX, e.clientY]));
    pad.addEventListener("click", (e) => { if (pd && Math.hypot(e.clientX - pd[0], e.clientY - pd[1]) > 5) return; peel(); });
    pad.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); peel(); } });

    // Tidy up: justified rows that fill the whole board, not one side
    function layoutTidy() {
      const els = $$(".pi:not(.hw)", board), bw = board.clientWidth, gap = 26, rows = [];
      let row = [], w = 0;
      els.forEach((el) => { const ew = el.offsetWidth; if (row.length && w + ew + gap * row.length > bw) { rows.push(row); row = []; w = 0; } row.push(el); w += ew; });
      if (row.length) rows.push(row);
      const rowH = rows.map((r) => Math.max(...r.map((el) => el.offsetHeight)));
      const H = Math.max(620, rowH.reduce((a, b) => a + b, 0) + 40 * (rows.length + 1));
      const vgap = (H - rowH.reduce((a, b) => a + b, 0)) / (rows.length + 1);
      let y = vgap;
      rows.forEach((r, ri) => {
        const sum = r.reduce((a, el) => a + el.offsetWidth, 0), free = bw - sum, sp = free / (r.length + 1);
        let x = sp;
        r.forEach((el) => { place(el, x, y + (rowH[ri] - el.offsetHeight) / 2, 0); x += el.offsetWidth + sp; });
        y += rowH[ri] + vgap;
      });
      board.style.height = H + "px"; board.classList.add("tidy");
    }
    function layoutLoose() { board.style.height = ""; board.classList.remove("tidy"); $$(".pi", board).forEach((el) => { const p = pos[el.dataset.id]; place(el, p.x, p.y, p.r); }); }
    $("#tidy").addEventListener("click", (e) => { tidy = !tidy; e.currentTarget.textContent = tidy ? "Scatter" : "Tidy up"; tidy ? layoutTidy() : layoutLoose(); });
    $("#resetB")?.addEventListener("click", () => { saved = {}; persist(); $$(".pi[data-note]", board).forEach((n) => n.remove()); $$(".pi", board).forEach((el) => { const p = pos[el.dataset.id]; p.x = p.home.x * board.clientWidth; p.y = p.home.y; p.r = p.home.r; }); tidy = false; $("#tidy").textContent = "Tidy up"; layoutLoose(); });
    if (innerWidth < 900 || new URLSearchParams(location.search).has("tidy")) { tidy = true; $("#tidy").textContent = "Scatter"; const go = () => tidy && layoutTidy(); document.readyState === "complete" ? go() : addEventListener("load", go); }
    addEventListener("resize", () => tidy && layoutTidy());

    // Shuffle throws everything to a new spot; items also lean away from the cursor
    $$(".pi", board).forEach((el, k) => el.style.setProperty("--fd2", -(k * .53 % 6).toFixed(2) + "s"));
    $("#shuffle").addEventListener("click", () => {
      if (tidy) { tidy = false; $("#tidy").textContent = "Tidy up"; board.style.height = ""; board.classList.remove("tidy"); }
      const bw = board.clientWidth, bh = innerWidth < 760 ? board.clientHeight : 620;
      $$(".pi", board).forEach((el) => { const p = pos[el.dataset.id]; p.x = Math.random() * Math.max(0, bw - el.offsetWidth); p.y = Math.random() * Math.max(0, bh - el.offsetHeight); p.r = +(Math.random() * 24 - 12).toFixed(1); place(el, p.x, p.y, p.r); });
    });
    let rq = 0;
    board.addEventListener("pointermove", (e) => {
      if (tidy || rq || reduce) return;
      rq = requestAnimationFrame(() => {
        rq = 0; const b = board.getBoundingClientRect(), mx = e.clientX - b.left, my = e.clientY - b.top;
        $$(".pi", board).forEach((el) => {
          if (el.classList.contains("drag") || el.matches(":hover")) return (el.style.translate = "");
          const dx = el.offsetLeft + el.offsetWidth / 2 - mx, dy = el.offsetTop + el.offsetHeight / 2 - my, d = Math.hypot(dx, dy), R = Math.max(el.offsetWidth, el.offsetHeight) / 2 + 90;
          el.style.translate = d < R && d > 1 ? `${dx / d * (1 - d / R) * 18}px ${dy / d * (1 - d / R) * 18}px` : "";
        });
      });
    });
    board.addEventListener("pointerleave", () => $$(".pi", board).forEach((el) => (el.style.translate = "")));

    // ── Cards and badges rise in as they scroll into view
    $$(".wcard, .board-bar").forEach((el) => el.classList.add("reveal"));
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } }), { threshold: .12 });
    $$(".reveal").forEach((el) => (at ? el.classList.add("in") : io2.observe(el)));

    // ── Headings slide up word by word when they scroll in
    $$("h2").forEach((h) => { let d = 0; h.innerHTML = h.innerHTML.split(/(<br\s*\/?>)/).map((part) => part.startsWith("<br") ? part : part.split(" ").filter(Boolean).map((w) => `<span class="w"><span style="--d:${d++}">${w}</span></span>`).join(" ")).join(""); });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .4 });
    // one key word per heading gets a hand-drawn coral mark that draws in after the words land
    $$("h2[data-mark]").forEach((h) => {
      const w = [...h.querySelectorAll(".w")].find((x) => x.textContent.trim() === h.dataset.mark); if (!w) return;
      w.classList.add("mk");
      w.insertAdjacentHTML("beforeend", h.dataset.markKind === "circle"
        ? `<svg class="mk-c" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M150 10C110 0 30 6 12 30 0 50 40 72 100 72s96-14 94-38C192 12 140 6 96 8"/></svg>`
        : `<svg class="mk-u" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M3 12C40 5 70 15 100 9s60-6 97 2"/></svg>`);
    });
    $$("h2").forEach((h) => (at ? h.classList.add("in") : io.observe(h)));

    // ── Magnetic buttons
    $$(".mag").forEach((b) => {
      b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`; });
      b.addEventListener("pointerleave", () => (b.style.transform = ""));
    });

    // ── A small sparkle burst wherever you click
    const STAR = '<svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 0c.6 4.2 3.2 7 8 8-4.8 1-7.4 3.8-8 8-.6-4.2-3.2-7-8-8 4.8-1 7.4-3.8 8-8z"/></svg>';
    addEventListener("pointerdown", (e) => {
      if (reduce || e.target.closest(".pi, .carousel, [contenteditable], .rf-stage")) return;
      const b = document.createElement("div"); b.className = "burst"; b.style.left = e.clientX + "px"; b.style.top = e.clientY + "px";
      b.innerHTML = Array.from({ length: 6 }, (_, k) => { const a = k / 6 * Math.PI * 2 + Math.random() * .5, d = 26 + Math.random() * 18; return STAR.replace("<svg", `<svg style="--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;color:${["#ffb46b", "#ff8fb8", "#fff4e8"][k % 3]}"`); }).join("");
      document.body.appendChild(b); setTimeout(() => b.remove(), 800);
    });

    // ── Custom cursor: a glowing star on the pointer, its label trails behind, stardust falls off as it moves
    const cur = $("#cur"), tag = $("#curTag"), txt = $("#curText"), cv = $("#trail"), ctx = cv.getContext("2d");
    let mx = -100, my = -100, tx = mx, ty = my, lx = mx, ly = my, off = false;
    const dust = [], DUST = ["255,214,160", "255,143,184", "255,244,232", "255,180,107"];
    const size = () => { const r = devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; ctx.setTransform(r, 0, 0, r, 0, 0); };
    size(); addEventListener("resize", size);
    addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY; cur.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target.closest("[data-cursor], a, button, .pi"), sec = e.target.closest("[data-tone]");
      off = !!e.target.closest(".rf-stage"); cur.classList.toggle("is-off", off);
      root.style.setProperty("--tone", sec ? sec.dataset.tone : "#ffb46b");
      const label = t && (t.dataset.cursor || (t.classList.contains("pi") ? "Drag" : ""));
      cur.classList.toggle("is-link", !!t); tag.classList.toggle("is-label", !!label);
      if (label) txt.textContent = label;
      const d = Math.hypot(mx - lx, my - ly);
      if (!reduce && !off && d > 6) {
        for (let k = 0; k < Math.min(3, d / 10); k++) dust.push({ x: mx + (Math.random() - .5) * 8, y: my + (Math.random() - .5) * 8, vx: (Math.random() - .5) * .6, vy: Math.random() * .6 + .2, r: Math.random() * 1.8 + .8, life: 1, c: DUST[Math.random() * 4 | 0] });
        lx = mx; ly = my; if (dust.length > 90) dust.splice(0, dust.length - 90);
      }
    });
    addEventListener("pointerdown", () => cur.classList.add("is-down"));
    addEventListener("pointerup", () => cur.classList.remove("is-down"));
    (function loop() {
      tx += (mx - tx) * .25; ty += (my - ty) * .25; tag.style.transform = `translate(${tx}px, ${ty}px)`;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let k = dust.length - 1; k >= 0; k--) {
        const p = dust[k]; p.x += p.vx; p.y += p.vy; p.life -= .022;
        if (p.life <= 0) { dust.splice(k, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, 6.283); ctx.fillStyle = `rgba(${p.c},${p.life})`; ctx.shadowColor = `rgba(${p.c},.9)`; ctx.shadowBlur = 6; ctx.fill();
      }
      if (!at) requestAnimationFrame(loop);
    })();

  // Hero fact cards: click to flip
  $$(".fc").forEach((b) => b.addEventListener("click", () => { b.classList.toggle("on"); b.setAttribute("aria-label", b.classList.contains("on") ? "I " + $(".f-f", b).textContent : "Reveal a fact"); }));

  // Play: jump to the footer and start the race (RoadFooter listens for this)
  $$("[data-play]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); window.dispatchEvent(new Event("rf:play")); }));
}
