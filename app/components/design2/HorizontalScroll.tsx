"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PIECES } from "./data";

function Card({
  p,
  i,
  total,
  progress,
}: {
  p: (typeof PIECES)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const imgX = useTransform(progress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      data-cursor
      className="group relative h-[66vh] w-[82vw] shrink-0 overflow-hidden rounded-3xl sm:w-[58vw] lg:w-[40vw]"
    >
      <motion.img
        src={p.img}
        alt={p.name}
        style={{ x: imgX, scale: 1.18 }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.28]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="absolute left-7 top-7 font-serif text-sm text-white/80">
        {String(i + 1).padStart(2, "0")} <span className="text-white/40">/ {String(total).padStart(2, "0")}</span>
      </div>

      <div className="absolute inset-x-7 bottom-7 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-white/70">{p.tag}</p>
          <h3 className="font-serif text-3xl leading-none text-white md:text-5xl">{p.name}</h3>
          <span className="mt-3 inline-block overflow-hidden">
            <span className="block translate-y-full text-sm text-white/80 transition-transform duration-500 group-hover:translate-y-0">
              View piece →
            </span>
          </span>
        </div>
        <span className="text-2xl text-white/80 transition-transform duration-500 group-hover:rotate-45">↗</span>
      </div>
    </div>
  );
}

export default function HorizontalScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-66%"]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="drift" ref={ref} className="relative h-[400vh] bg-bg">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Signature Pieces</p>
            <h2 className="display text-[clamp(2rem,5vw,4rem)]">The gallery</h2>
          </div>
          <div className="hidden flex-1 items-center gap-4 md:flex">
            <div className="h-px flex-1 bg-line">
              <motion.div className="h-full origin-left bg-cream" style={{ scaleX: barScale }} />
            </div>
            <span className="text-sm text-muted">drag the world →</span>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-[clamp(20px,4vw,56px)]">
          {PIECES.map((p, i) => (
            <Card key={p.name} p={p} i={i} total={PIECES.length} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
