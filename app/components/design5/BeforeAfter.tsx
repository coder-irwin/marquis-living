"use client";

import { useRef, useState } from "react";

export default function BeforeAfter({
  before,
  after,
  className = "",
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(55);
  const [dragging, setDragging] = useState(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      data-cursor
      className={`relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl ${className}`}
      onMouseMove={(e) => move(e.clientX)}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* after (full) */}
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute right-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-[0.15em] text-bg">
        After
      </span>

      {/* before (clipped to handle) */}
      <img
        src={before}
        alt="Before"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, filter: "grayscale(0.55) brightness(0.82)" }}
      />
      <span
        className="absolute top-5 rounded-full bg-bg/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-cream"
        style={{ left: 20, opacity: pos > 12 ? 1 : 0 }}
      >
        Before
      </span>

      {/* handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-cream" />
        <div
          className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-bg shadow-2xl transition-transform"
          style={{ transform: `translate(-50%,-50%) scale(${dragging ? 1.1 : 1})` }}
        >
          <span className="text-lg">⇆</span>
        </div>
      </div>
    </div>
  );
}
