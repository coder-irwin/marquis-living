"use client";

import { motion } from "framer-motion";
import { SERVICES } from "./data";

/**
 * "Why clients stay" — the reference's six-card service grid, with a staggered
 * scroll reveal and a hover lift on each card.
 */
const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Services() {
  return (
    <section id="why" className="bg-[var(--bg)] py-[clamp(4rem,10vw,9rem)]">
      <div className="container">
        <div className="mb-14 max-w-3xl">
          <p className="eyebrow mb-5">Why clients stay</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            More than a vendor.{" "}
            <span className="text-[var(--soft)]">A studio you keep on speed-dial.</span>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.no}
              variants={card}
              className="group relative bg-[var(--bg)] p-9 transition-colors duration-500 hover:bg-white"
            >
              <span className="text-sm font-medium tabular-nums text-[var(--c2)]">{s.no}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 leading-relaxed text-[var(--soft)]">{s.d}</p>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--c1)] to-[var(--c2)] transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
