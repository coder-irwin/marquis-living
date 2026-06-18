"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "./images";
import { AnimatedText, Reveal } from "./anim";

export default function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section id="studio" className="container py-28 md:py-40">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="eyebrow">(01) — The Atelier</p>
        <p className="max-w-xs text-sm text-muted">Grandeur · Artistry · Effortless Panache</p>
      </div>

      <div className="mt-12 grid items-start gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <AnimatedText
            el="h2"
            text="Marquis Manor turns art into furniture — and furniture into the soul of a room."
            className="display text-[clamp(1.9rem,3.6vw,3.4rem)]"
          />
          <Reveal delay={0.1} className="mt-9 max-w-xl text-lg leading-relaxed text-cream/70">
            Every Marquis Manor collection begins as a story — the ocean, the cosmos, the wild — and is sculpted by hand
            into functional art. We pair rare materials, considered proportion and meticulous craft to create pieces
            that feel collected, never bought.
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <a href="#collections" className="btn">
              Explore the collections
            </a>
          </Reveal>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-5">
          <motion.div style={{ y: y1 }} className="zoom aspect-[3/4] overflow-hidden">
            <img src={IMG.about1} alt="A Marquis Manor dining setting" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="zoom mt-12 aspect-[3/4] overflow-hidden">
            <img src={IMG.about2} alt="A Marquis Manor bedroom setting" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
