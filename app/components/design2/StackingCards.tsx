"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { COLLECTIONS } from "./data";

const CARDS = COLLECTIONS.slice(0, 5);

function Card({
  c,
  i,
  total,
  progress,
}: {
  c: (typeof COLLECTIONS)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{ scale, top: `${i * 26}px` }}
        data-cursor
        className="relative h-[64vh] w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
      >
        <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8">
          <div>
            <p className="font-serif text-sm text-white/70">{c.no}</p>
            <h3 className="font-serif text-4xl text-white md:text-6xl">{c.name}</h3>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-white/80 md:block">{c.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="bg-bg">
      <div className="container pt-24 text-center md:pt-32">
        <p className="eyebrow mb-6">Stacked</p>
        <h2 className="display text-[clamp(2rem,5vw,4rem)]">Layer by layer</h2>
      </div>
      <div ref={ref} className="container">
        {CARDS.map((c, i) => (
          <Card key={c.no} c={c} i={i} total={CARDS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
