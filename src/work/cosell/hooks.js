import { useEffect, useRef, useState } from "react";

/** Adds .in to every [data-reveal] inside the root once it scrolls into view. */
export function useRevealAll() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    // ?reveal=all shows everything at once (screenshots, print, PDF export)
    const showAll = new URLSearchParams(window.location.search).get("reveal") === "all";
    if (showAll || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Which of the given element ids is currently in the reading band of the viewport. */
export function useActiveId(ids, rootMargin = "-45% 0px -50% 0px") {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids, rootMargin]);
  return active;
}

/** Click-and-drag horizontal scrolling for mouse users (touch and trackpads scroll natively). */
export function useDragScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add("dragging");
    };
    const onMove = (e) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
      el.classList.remove("dragging");
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);
  return ref;
}
