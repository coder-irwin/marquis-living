"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "We don't make furniture. We make the quiet centre of a room — objects with weight and story, hand-built from honest materials, that turn a house into somewhere you never want to leave.";

const WORDS = TEXT.split(" ");

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.25"] });

  return (
    <section id="manifesto" className="bg-bg py-32 md:py-48">
      <div ref={ref} className="container max-w-5xl">
        <p className="eyebrow mb-10">(03) — Manifesto</p>
        <p className="display flex flex-wrap text-[clamp(1.8rem,4.5vw,3.6rem)] leading-[1.25]">
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1 / WORDS.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
