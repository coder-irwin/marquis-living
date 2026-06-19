"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Sky from "./Sky";
import Mandala from "./Mandala";
import { HERO_IMG } from "./data";

const WORDS = ["Where", "your", "home", "becomes", "a", "story."];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.5 } },
};
const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: the framed interior lifts & scales as you scroll past the hero.
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* ---- the living sky ---- */}
      <motion.div className="absolute inset-0" style={{ y: skyY }}>
        <Sky />
      </motion.div>

      {/* breathing aurora — kesar / gulal / twilight */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="d2-aurora"
          style={{ width: 620, height: 620, left: "-8%", top: "-12%", background: "var(--saffron)" }}
        />
        <div
          className="d2-aurora"
          style={{ width: 540, height: 540, right: "-6%", top: "8%", background: "var(--magenta)", animationDelay: "-6s" }}
        />
        <div
          className="d2-aurora"
          style={{ width: 700, height: 700, left: "30%", bottom: "-30%", background: "var(--indigo)", animationDelay: "-11s" }}
        />
      </div>

      {/* slow rangoli halo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] -z-0 hidden -translate-x-1/2 -translate-y-1/2 text-[var(--marigold)] opacity-[0.16] md:block"
        style={{ opacity: fade }}
      >
        <Mandala className="d2-spin h-[80vmin] w-[80vmin]" petals={28} rings={4} />
      </motion.div>

      {/* ---- copy ---- */}
      <motion.div
        className="container relative z-10 flex min-h-[100svh] flex-col justify-center pt-24"
        style={{ opacity: fade }}
      >
        <motion.p
          className="eyebrow mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          Aakash · Interior Studio — Est. under an open sky
        </motion.p>

        <motion.h1
          className="display max-w-[16ch] text-[clamp(2.8rem,9vw,8rem)]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {WORDS.map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]">
              <motion.span
                variants={word}
                className={`inline-block ${i >= 3 ? "gold-text serif italic" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-lg leading-relaxed text-[var(--paper-dim)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            We design interiors the way storytellers build a world — room by room,
            light by light. Scroll down and walk your home&apos;s journey before it&apos;s
            ever built.
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
          >
            <a href="#journey" className="d2-btn">
              Begin the journey
              <span aria-hidden>↓</span>
            </a>
            <a href="#gallery" className="d2-btn-ghost">
              See our interiors
            </a>
          </motion.div>
        </div>

        {/* ---- the framed interior, floating at the foot of the hero ---- */}
        <motion.div
          className="relative mx-auto mt-14 w-full max-w-4xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-md ring-1 ring-[rgba(245,236,216,0.2)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
            <motion.img
              src={HERO_IMG}
              alt="A furnished open-plan living room designed by Aakash"
              className="h-full w-full object-cover"
              style={{ y: frameY, scale: frameScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <span className="eyebrow !text-[var(--paper)]">Chapter 00 — The Home You Imagine</span>
              <span className="serif text-xl text-[var(--paper)]">Aakash</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.3em] text-[var(--paper-dim)]"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}
