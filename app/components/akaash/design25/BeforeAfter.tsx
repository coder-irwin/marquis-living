"use client";

/* design25 — interactive before/after comparison slider.
   Drag the handle (or click/tap anywhere, or use arrow keys when focused) to wipe
   between the "before" and "after" images. Pointer events cover mouse + touch.
   Scoped under .d25. */

import { useEffect, useRef } from "react";

type Props = { before: string; after: string; beforeLabel?: string; afterLabel?: string };

export default function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dragging = false;
    const clamp = (v: number, a = 0, b = 100) => Math.min(b, Math.max(a, v));
    const set = (clientX: number) => {
      const r = el.getBoundingClientRect();
      const pos = clamp(((clientX - r.left) / r.width) * 100);
      el.style.setProperty("--pos", `${pos}%`);
      el.setAttribute("aria-valuenow", String(Math.round(pos)));
    };
    const down = (e: PointerEvent) => { dragging = true; el.classList.add("dragging"); try { el.setPointerCapture(e.pointerId); } catch {} set(e.clientX); };
    const move = (e: PointerEvent) => { if (dragging) set(e.clientX); };
    const up = (e: PointerEvent) => { dragging = false; el.classList.remove("dragging"); try { el.releasePointerCapture(e.pointerId); } catch {} };
    const key = (e: KeyboardEvent) => {
      const cur = parseFloat(el.style.getPropertyValue("--pos")) || 50;
      if (e.key === "ArrowLeft") { e.preventDefault(); const p = clamp(cur - 4); el.style.setProperty("--pos", `${p}%`); el.setAttribute("aria-valuenow", String(Math.round(p))); }
      if (e.key === "ArrowRight") { e.preventDefault(); const p = clamp(cur + 4); el.style.setProperty("--pos", `${p}%`); el.setAttribute("aria-valuenow", String(Math.round(p))); }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("keydown", key);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div
      className="ba-compare"
      ref={ref}
      role="slider"
      aria-label="Drag to compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
      tabIndex={0}
    >
      <img className="ba-after" src={after} alt={`${afterLabel} — Marquis Living`} draggable={false} loading="lazy" />
      <img className="ba-before" src={before} alt={`${beforeLabel} — Marquis Living`} draggable={false} loading="lazy" />
      <span className="ba-tag ba-tag--before">{beforeLabel}</span>
      <span className="ba-tag ba-tag--after">{afterLabel}</span>
      <div className="ba-divider"><span className="ba-handle" aria-hidden>‹&nbsp;›</span></div>
    </div>
  );
}
