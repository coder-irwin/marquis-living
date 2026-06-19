"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Mandala from "./Mandala";

const TEXT =
  "A house is built with walls and beams; a home is built with stories. We just make sure the stories have somewhere beautiful to live.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}{" "}
    </motion.span>
  );
}

export default function Quote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"],
  });
  const words = TEXT.split(" ");

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <Mandala
        className="d2-spin-rev pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[var(--indigo)] opacity-[0.07]"
        petals={32}
        rings={5}
      />
      <div className="container relative">
        <p className="display mx-auto max-w-4xl text-center text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.18]">
          {words.map((wd, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {wd}
              </Word>
            );
          })}
        </p>
        <p className="mt-10 text-center text-sm tracking-[0.25em] text-[var(--marigold)]">
          — MARQUIS MANOR
        </p>
      </div>
    </section>
  );
}
