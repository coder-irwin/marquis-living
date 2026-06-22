"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HEADLINE, HERO_VIDEO, HERO_POSTER } from "./data";

/**
 * Hero — full-width, oversized bold sans headline revealed word-by-word (the
 * signature motion borrowed in spirit from the studio reference), over a light
 * airy field, followed by the studio showreel playing muted/looped in a large
 * rounded frame that parallaxes on scroll. Copy is entirely Marquis Living.
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section id="top" ref={ref} className="relative pt-[68px]">
      <div className="container pt-20 md:pt-28">
        <motion.p
          className="eyebrow mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Marquis Living — Interior Studio
        </motion.p>

        <motion.h1
          className="display max-w-5xl text-[clamp(2.8rem,9vw,8rem)]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {HEADLINE.map((w, i) => (
            <span key={i} className="mr-[0.24em] inline-block overflow-hidden align-bottom pb-[0.06em]">
              <motion.span
                variants={word}
                className={`inline-block ${i === HEADLINE.length - 1 ? "text-[var(--teal)]" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-lg leading-relaxed text-[var(--soft)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            An interior studio that designs, makes and installs — architecture,
            furniture and light, all under one roof.
          </motion.p>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}
          >
            <a href="#work" className="d6-btn">View our work</a>
            <a href="#services" className="d6-btn-ghost">What we do</a>
          </motion.div>
        </div>
      </div>

      <div className="container mt-14 md:mt-20">
        <motion.div
          className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl shadow-[0_50px_120px_-50px_rgba(22,24,26,0.45)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.video
            className="h-full w-full object-cover"
            style={{ scale: imgScale, y: imgY }}
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Marquis Living studio showreel"
          />
          {/* soft top scrim keeps the frame feeling light and editorial */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
