"use client";

import { motion } from "framer-motion";
import { IMG } from "../images";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const line = (txt: React.ReactNode, delay: number) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {txt}
      </motion.span>
    </span>
  );

  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      <div className="container grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        {/* copy */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="eyebrow mb-6"
          >
            Online Interior Design · By Marquis Living
          </motion.p>

          <h1 className="display text-[clamp(2.6rem,6.5vw,5.4rem)]">
            {line("A space you'll", 0.25)}
            {line(<span className="italic text-accent">love</span>, 0.35)}
            {line("— guaranteed.", 0.45)}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted"
          >
            Work one-to-one with a Marquis Living designer. Get photorealistic concepts for your room and a curated
            shopping list of hand-crafted pieces — all online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#start" className="btn btn-solid" data-cursor>
              Start my transformation
            </a>
            <a href="#how" className="btn" data-cursor>
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-10 flex items-center gap-5 text-sm text-muted"
          >
            <div className="flex -space-x-2">
              {[IMG.about1, IMG.about2, IMG.scene1].map((src, i) => (
                <span key={i} className="h-9 w-9 overflow-hidden rounded-full border-2 border-bg">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </span>
              ))}
            </div>
            <span>
              Loved by <span className="text-cream">2,400+</span> homes · ★★★★★
            </span>
          </motion.div>
        </div>

        {/* hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
            <img src={IMG.hero} alt="A Marquis Living designed living room" className="h-full w-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: EASE }}
            className="absolute -bottom-6 -left-4 rounded-2xl border border-line bg-bg/90 p-5 shadow-xl backdrop-blur md:-left-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Avg. project</p>
            <p className="font-serif text-2xl">2–3 weeks · from $449</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
