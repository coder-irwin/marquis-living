"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MATERIALS } from "./data";

/**
 * Materials — a vertical scroll drives a horizontal traverse across a wall of
 * physically-named finishes. Each plate catches a sheen sweep on approach;
 * the swatch itself is the colour of the material.
 */
export default function Materials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container mb-10">
          <p className="eyebrow mb-4">The Materials</p>
          <h2 className="display text-[clamp(2rem,5vw,4rem)]">
            Chosen to <span className="gold-text serif italic">age</span> beautifully.
          </h2>
        </div>

        <motion.div className="flex gap-7 pl-[6vw] will-change-transform" style={{ x }}>
          {MATERIALS.map((m, i) => (
            <article
              key={m.name}
              data-hot
              className="d4-plate group relative h-[52vh] w-[78vw] shrink-0 overflow-hidden rounded-sm ring-1 ring-[var(--line)] sm:w-[40vw] lg:w-[26vw]"
              style={{ background: m.hex }}
            >
              {/* tonal depth + reflection on the lower third */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute left-5 top-5 text-xs tracking-[0.25em] text-white/70 mix-blend-overlay">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="serif text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {m.name}
                </h3>
                <p className="text-sm text-white/80">{m.note}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
