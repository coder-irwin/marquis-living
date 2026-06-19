"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InkReveal from "../../ui/ink-reveal";
import { HERO_IMG } from "./data";

/**
 * Hero for design3 — the InkReveal canvas sits over a full-bleed interior.
 * The page reads as blank warm paper; the cursor inks it away to uncover the
 * room beneath. On touch / coarse-pointer devices (no mousemove) we skip the
 * mask and show the room directly so the hero is never blank.
 */
export default function Hero() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[var(--paper)]">
      {/* the room, hidden beneath the ink until revealed */}
      <img
        src={HERO_IMG}
        alt="A furnished open-plan living room by Marquis Manor"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* readability scrim only along the bottom, where the headline sits */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-gradient-to-t from-[rgba(20,16,10,0.6)] to-transparent" />

      {/* the ink mask — desktop/hover only */}
      {canHover ? (
        <InkReveal
          maskColor={[247, 242, 233]}
          brushSize={150}
          lifetime={750}
          gradientStops={[0.97, 0.9, 0]}
        />
      ) : null}

      {/* headline — above the ink (z-10), always readable */}
      <div className="container relative z-10 flex h-full flex-col justify-between py-10">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <span className="eyebrow">Marquis Manor · Atelier of Interiors</span>
          {canHover ? (
            <span className="hidden items-center gap-2 text-xs tracking-[0.25em] text-[var(--paper)] md:flex">
              <span className="d3-bob">✦</span> MOVE TO REVEAL
            </span>
          ) : null}
        </motion.div>

        <div>
          <motion.h1
            className="display max-w-[14ch] text-[var(--paper)] text-[clamp(3rem,10vw,9rem)] drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Drawn in ink. <span className="serif italic">Built to live in.</span>
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-col items-start gap-7 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="max-w-md text-lg leading-relaxed text-[rgba(247,242,233,0.86)]">
              An interior studio that sketches your home by hand and builds it
              to last. {canHover ? "Wipe the ink away to step inside." : "Scroll to walk the journey."}
            </p>
            <div className="flex items-center gap-4">
              <a href="#method" className="d3-btn !bg-[var(--paper)] !text-[var(--ink)] hover:!bg-[var(--vermilion)] hover:!text-[var(--paper)]">
                Begin the journey
                <span aria-hidden>↓</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
