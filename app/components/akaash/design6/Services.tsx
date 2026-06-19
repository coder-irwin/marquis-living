"use client";

import { motion } from "framer-motion";
import { SERVICES } from "./data";

/**
 * Services — a clean three-column grid of six, each card revealing on a soft
 * stagger as the section enters the viewport (restrained, studio-style motion).
 */
export default function Services() {
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="container">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">A studio, end to end.</h2>
          </div>
          <p className="max-w-sm text-[var(--soft)]">
            Six disciplines, one team — so nothing falls between the cracks of a brief.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.no}
              className="d6-card p-7"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-medium tracking-[0.2em] text-[var(--teal)]">{s.no}</span>
                <span className="h-2 w-2 rounded-full bg-[var(--teal)]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--soft)]">{s.d}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
