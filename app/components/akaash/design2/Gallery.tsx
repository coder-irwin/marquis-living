"use client";

import { motion } from "framer-motion";
import { GALLERY } from "./data";

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="container">
        <header className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Selected Interiors</p>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4rem)]">A wall of finished work.</h2>
          </div>
          <p className="max-w-sm text-[var(--paper-dim)]">
            A few of the homes we&apos;ve authored across the city — each one its own
            complete story.
          </p>
        </header>

        {/* masonry via CSS columns */}
        <div className="[column-fill:_balance] gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((src, i) => (
            <motion.figure
              key={src}
              className="zoom mb-5 break-inside-avoid overflow-hidden rounded-md ring-1 ring-[rgba(245,236,216,0.1)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={src}
                alt={`Interior project ${i + 1} by Aakash`}
                loading="lazy"
                className="w-full"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
