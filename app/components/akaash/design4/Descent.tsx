"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { DESCENT } from "./data";

function Plane({
  progress,
  i,
  total,
  img,
  label,
}: {
  progress: MotionValue<number>;
  i: number;
  total: number;
  img: string;
  label: string;
}) {
  // each plane owns a slice of the scroll; the camera dollies through it
  const seg = 1 / total;
  const start = i * seg;
  const mid = start + seg * 0.5;
  const end = start + seg;

  const scale = useTransform(progress, [start, end], [0.55 + i * 0.05, 1.45]);
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const z = useTransform(progress, [start, end], [-200, 120]);
  const labelOpacity = useTransform(progress, [start, mid, mid + 0.04, end], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, scale, z }}
    >
      <div className="relative h-[62vh] w-[86vw] max-w-5xl overflow-hidden rounded-sm ring-1 ring-[var(--line)] shadow-[0_60px_160px_-40px_rgba(0,0,0,0.9)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={`${label} — Marquis Manor`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,7,0.6)] via-transparent to-[rgba(6,6,7,0.3)]" />
        <motion.span
          className="absolute bottom-6 left-6 serif text-2xl text-white"
          style={{ opacity: labelOpacity }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Descent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const railOpacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
        style={{ perspective: 1400 }}
      >
        <div className="preserve-3d relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {DESCENT.map((p, i) => (
            <Plane
              key={p.label}
              progress={scrollYProgress}
              i={i}
              total={DESCENT.length}
              img={p.img}
              label={p.label}
            />
          ))}
        </div>

        {/* a depth rail on the side, drawing as you descend */}
        <motion.div
          className="absolute right-8 top-1/2 z-10 hidden h-48 -translate-y-1/2 md:block"
          style={{ opacity: railOpacity }}
        >
          <div className="relative h-full w-px bg-[var(--line)]">
            <motion.div
              className="absolute left-0 top-0 w-px bg-[var(--gold)]"
              style={{ height: railFill }}
            />
          </div>
        </motion.div>

        <p className="eyebrow absolute left-1/2 top-10 -translate-x-1/2 text-center">
          The Descent
        </p>
      </div>
    </section>
  );
}
