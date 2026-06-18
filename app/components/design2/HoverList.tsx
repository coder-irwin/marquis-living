"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { COLLECTIONS } from "./data";
import { AnimatedText } from "../anim";

export default function HoverList() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="collections" className="relative bg-bg py-28 md:py-40" onMouseLeave={() => setActive(null)}>
      <div className="container">
        <div className="mb-14">
          <p className="eyebrow mb-6">Browse</p>
          <AnimatedText el="h2" text="Every collection, a world" className="display text-[clamp(2rem,5vw,4rem)]" />
        </div>

        <div className="relative border-t border-line">
          {COLLECTIONS.map((c, i) => (
            <a
              key={c.no}
              href="#"
              data-cursor
              onMouseEnter={() => setActive(i)}
              className="group flex items-center justify-between gap-6 border-b border-line py-6 md:py-8"
            >
              <div className="flex items-center gap-6">
                <span className="font-serif text-sm text-accent">{c.no}</span>
                <h3 className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
                  {c.name}
                </h3>
              </div>
              <span className="hidden max-w-sm text-sm text-muted lg:block">{c.desc}</span>
              <span className="text-2xl text-cream/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-cream">
                ↗
              </span>
            </a>
          ))}

          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute right-[5%] top-1/2 hidden h-72 w-56 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl xl:block"
              >
                <img src={COLLECTIONS[active].img} alt="" className="h-full w-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
