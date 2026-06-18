"use client";

import { useState } from "react";
import { PIECES } from "./data";
import { AnimatedText } from "./anim";

export default function GalleryGrid() {
  const [active, setActive] = useState(0);

  return (
    <section className="container py-28 md:py-40">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-6">Showroom</p>
          <AnimatedText el="h2" text="Hover to explore" className="display text-[clamp(2rem,5vw,4rem)]" />
        </div>
        <p className="max-w-sm text-muted">A wall of pieces — point at one and it opens to fill the room.</p>
      </div>

      <div className="flex h-[64vh] gap-3">
        {PIECES.map((p, i) => (
          <div
            key={p.name}
            data-cursor
            onMouseEnter={() => setActive(i)}
            className="relative cursor-pointer overflow-hidden rounded-2xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ flexGrow: active === i ? 6 : 1, flexBasis: 0 }}
          >
            <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p
                className="font-serif text-xl text-white transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                {p.name}
              </p>
              <p
                className="text-xs uppercase tracking-[0.2em] text-white/70 transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                {p.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
