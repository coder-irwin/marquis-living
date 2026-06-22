"use client";

import { motion } from "framer-motion";
import { FAN } from "./data";

/**
 * A centered deck of photographs that fans open like cards held in the hand as
 * it scrolls into view. Hovering a frame lifts it forward. Strictly centred —
 * the deck spreads symmetrically around the middle frame.
 */
export default function Fan() {
  const mid = (FAN.length - 1) / 2;

  return (
    <section id="work" className="px-6 py-28 md:py-40">
      <p className="eyebrow mb-5">Selected Work</p>
      <h2 className="display mx-auto mb-20 max-w-[16ch] text-[clamp(2rem,5vw,4rem)]">
        A handful, held to <span className="serif italic text-[var(--accent)]">the light</span>.
      </h2>

      <div
        className="relative mx-auto h-[46vh] min-h-[340px] w-full max-w-3xl"
        style={{ perspective: 1600 }}
      >
        {FAN.map((src, i) => {
          const offset = i - mid; // -2..2
          const angle = offset * 11; // fanned rotation
          const x = offset * 76; // horizontal spread
          const y = Math.abs(offset) * 22; // arc dip

          return (
            <motion.figure
              key={src}
              className="group d5-soft-shadow absolute left-1/2 top-1/2 h-[40vh] min-h-[300px] w-[58vw] max-w-[300px] cursor-pointer overflow-hidden rounded-md ring-1 ring-[var(--line)] hover:z-50"
              style={{ originY: 1, zIndex: 10 + i }}
              initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 0 }}
              whileInView={{
                x: `calc(-50% + ${x}px)`,
                y: `calc(-50% + ${y}px)`,
                rotate: angle,
                opacity: 1,
              }}
              whileHover={{
                x: `calc(-50% + ${x}px)`,
                y: `calc(-50% + ${y - 28}px)`,
                rotate: angle * 0.35,
                scale: 1.07,
              }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Marquis Living project ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.figure>
          );
        })}
      </div>

      <p className="mx-auto mt-16 max-w-sm text-[var(--soft)]">
        Each project is a complete story. Hover to bring one forward.
      </p>
    </section>
  );
}
