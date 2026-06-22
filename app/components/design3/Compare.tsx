"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "../anim";

const TRAD = [
  "Hourly fees that quietly spiral",
  "Weeks of in-person meetings",
  "One designer, one opinion",
  "You source and chase everything",
];
const US = [
  "Flat per-room pricing, known upfront",
  "Done online, on your own schedule",
  "Multiple concepts to choose from",
  "A curated shopping list, delivered",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Compare() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-6">Why online</p>
          <AnimatedText el="h2" text="A smarter way to design" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-3xl border border-line p-8 md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Traditional design</p>
            <ul className="mt-7 flex flex-col gap-4">
              {TRAD.map((t) => (
                <li key={t} className="flex items-center gap-3 text-muted">
                  <span className="text-cream/30">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            data-cursor
            className="rounded-3xl bg-cream p-8 text-bg md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-bg/60">Marquis Living online</p>
            <ul className="mt-7 flex flex-col gap-4">
              {US.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="text-bg">✦</span>
                  {t}
                </li>
              ))}
            </ul>
            <a href="#start" className="btn mt-9 bg-bg text-cream" style={{ borderColor: "transparent" }}>
              Start my design
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
