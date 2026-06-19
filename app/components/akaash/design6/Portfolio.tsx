"use client";

import { motion } from "framer-motion";
import { PORTFOLIO } from "./data";

/**
 * Work — a three-column gallery of interiors that fade and lift in on a soft
 * stagger. Imagery is Unsplash (no glocal assets); titles are Marquis Manor.
 */
export default function Portfolio() {
  return (
    <section id="work" className="bg-[var(--paper)] px-6 py-24 md:py-32">
      <div className="container">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">Recently completed.</h2>
          </div>
          <a href="#contact" className="d6-link text-sm text-[var(--soft)]">
            Enquire about a project →
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <motion.figure
              key={p.t}
              className="group relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={`${p.t} — Marquis Manor`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-sm font-medium">{p.t}</span>
                <span className="text-xs tracking-[0.2em]">VIEW</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
