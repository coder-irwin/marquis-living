"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function VelocityMarquee({ text = "Functional Art" }: { text?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothV = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothV, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * 4 * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    moveBy += dir.current * moveBy * factor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const items = Array.from({ length: 6 });

  return (
    <section className="overflow-hidden border-y border-line bg-surface py-8">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {items.map((_, i) => (
          <span key={i} className="flex items-center font-serif text-[clamp(2rem,6vw,5rem)] leading-none text-cream/85">
            {text}
            <span className="mx-8 text-accent md:mx-12">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
