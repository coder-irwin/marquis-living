"use client";

import { motion } from "framer-motion";
import { FEATURES } from "./data";

function Check() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--teal)]/12 text-[var(--teal)]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

/**
 * Why Marquis Manor — four feature points that scale + fade in subtly on
 * scroll approach, each marked with a teal check.
 */
export default function Features() {
  return (
    <section id="why" className="px-6 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="eyebrow mb-4">Why Marquis Manor</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            Built like a workshop, run like a studio.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.t}
              className="d6-card flex items-start gap-5 p-7"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Check />
              <div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight">{f.t}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--soft)]">{f.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
