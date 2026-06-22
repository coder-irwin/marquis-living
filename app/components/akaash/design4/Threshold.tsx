"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Threshold — the entrance. The title resolves with a camera focus-pull
 * (blur → sharp, letterspacing tightening) rather than a fade or slide, then
 * recedes and blurs as you begin the descent, as if walking past it.
 */
export default function Threshold() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] items-center justify-center">
      <motion.div
        className="container relative z-10 text-center"
        style={{ y, scale, filter, opacity }}
      >
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          Marquis Living — Atelier of Architectural Interiors
        </motion.p>

        <motion.h1
          className="display mx-auto max-w-[18ch] text-[clamp(3rem,11vw,10rem)]"
          initial={{ filter: "blur(22px)", opacity: 0, letterSpacing: "0.16em" }}
          animate={{ filter: "blur(0px)", opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          Step inside <span className="gold-text serif italic">the light</span>.
        </motion.h1>

        <motion.p
          className="mx-auto mt-9 max-w-md text-lg leading-relaxed text-[var(--mist)]"
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.9 }}
        >
          Not a website. A walk through a living piece of architecture — descend,
          and let the house move around you.
        </motion.p>
      </motion.div>

      {/* scroll cue — a thin light line drawing downward */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.65rem] tracking-[0.4em] text-[var(--mist)]">DESCEND</span>
          <motion.span
            className="block h-12 w-px bg-gradient-to-b from-[var(--gold)] to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
