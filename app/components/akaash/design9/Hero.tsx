"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HEADLINE, SHINE, HERO_VIDEO, HERO_POSTER } from "./data";

/**
 * Hero — full-screen background video masthead (A1) with the headline revealed
 * word-by-word (A2) over it, then a gradient "shine" subline. The video gently
 * scales out on scroll for a parallax feel.
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.95 } },
};
const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const vidScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const vidY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.42, 0.72]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#060010]">
      {/* full-screen background video */}
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: vidScale, y: vidY }}
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Marquis Manor studio showreel"
      />
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlay }} aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{ background: "linear-gradient(to top, rgba(6,0,16,0.9) 0%, transparent 45%)" }}
      />

      {/* content */}
      <div className="container relative z-10 flex h-full flex-col justify-end pb-[12vh] text-white">
        <motion.p
          className="eyebrow mb-7 !text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          Marquis Manor — Interior Atelier
        </motion.p>

        <motion.h1
          className="display max-w-[16ch] text-[clamp(2.6rem,8.5vw,7.5rem)]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {HEADLINE.map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="d9-shine mt-6 text-[clamp(1.2rem,2.6vw,2.1rem)] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          {SHINE}
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9 }}
        >
          <a href="#work" className="d9-btn">View our work</a>
          <a href="#why" className="d9-btn-ghost text-white">What we do</a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 h-10 w-[1px] -translate-x-1/2 bg-white/40"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
        aria-hidden
      />
    </section>
  );
}
