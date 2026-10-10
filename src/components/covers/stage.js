import { useEffect, useRef, useState } from "react";

/* Projective transform (CSS matrix3d) that maps a w×h rectangle onto a quad
   given as [top-left, top-right, bottom-right, bottom-left] points. */
export function quadMatrix(w, h, quad) {
  const src = [[0, 0], [w, 0], [w, h], [0, h]];
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = quad[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  }
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    [b[c], b[p]] = [b[p], b[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const [a, bb, c, d, e, f, g, hh] = b.map((v, i) => v / A[i][i]);
  return `matrix3d(${a},${d},0,${g},${bb},${e},0,${hh},0,0,1,0,${c},${f},0,1)`;
}

/* Scales a fixed-size stage (sw×sh) to cover its parent box, centred. */
export function useStageFit(sw, sh) {
  const ref = useRef(null);
  const [fit, setFit] = useState({ s: 0, x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      const { width: w, height: h } = el.getBoundingClientRect();
      const s = Math.max(w / sw, h / sh);
      setFit({ s, x: (w - sw * s) / 2, y: (h - sh * s) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [sw, sh]);
  return [ref, { transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.s})`, opacity: fit.s ? 1 : 0 }];
}
