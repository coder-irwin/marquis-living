"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "We believe a room should feel inevitable — as if it could never have been any other way. Nothing loud, nothing spare. Only what belongs.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}{" "}
    </motion.span>
  );
}

export default function Ethos() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const words = TEXT.split(" ");

  return (
    <section id="ethos" ref={ref} className="bg-[var(--cloud)] px-6 py-32 md:py-44">
      <p className="eyebrow mb-8">Our Ethos</p>
      <p className="display mx-auto max-w-4xl text-[clamp(1.7rem,4.2vw,3.2rem)] leading-[1.2]">
        {words.map((w, idx) => {
          const start = idx / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={idx} progress={scrollYProgress} range={[start, end]}>
              {w}
            </Word>
          );
        })}
      </p>
      <div className="d5-rule mt-12">
        <span className="serif italic text-lg">Marquis Manor</span>
      </div>
    </section>
  );
}
