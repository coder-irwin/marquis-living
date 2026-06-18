"use client";

import { useRef } from "react";
import { ImageTrail } from "../ui/image-trail";
import { COLLECTIONS } from "./data";
import { AnimatedText } from "../anim";

export default function TrailSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 z-0">
        <ImageTrail containerRef={ref} rotationRange={22} interval={80}>
          {COLLECTIONS.map((c, i) => (
            <div
              key={i}
              className="h-32 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl md:h-44 md:w-32"
            >
              <img src={c.img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </ImageTrail>
      </div>

      <div className="container relative z-10 text-center mix-blend-difference">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/80">Move your cursor</p>
        <AnimatedText el="h2" text="Follow the thread." className="display text-[clamp(3rem,10vw,9rem)] text-white" />
      </div>
    </section>
  );
}
