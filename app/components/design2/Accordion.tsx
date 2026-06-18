"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedText } from "../anim";

const ITEMS = [
  { q: "Responsibly sourced timber", a: "Every frame begins with FSC-certified hardwoods, chosen for grain and longevity — built to be handed down, not thrown away." },
  { q: "Hand-applied finishes", a: "Oils, lacquers and patinas are layered by hand over days, so each surface catches light the way only craft can." },
  { q: "Artisan joinery", a: "Traditional joints, modern precision. No shortcuts, no visible fixings — just quiet, honest construction." },
  { q: "Made to order", a: "Each piece is built for you, to your dimensions and palette, then inspected and styled before it ever leaves the atelier." },
];

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container py-28 md:py-40">
      <p className="eyebrow mb-6">Craft &amp; Materials</p>
      <AnimatedText el="h2" text="The making" className="display mb-14 text-[clamp(2rem,5vw,4rem)]" />

      <div className="border-t border-line">
        {ITEMS.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-line">
              <button
                data-cursor
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
              >
                <span className="font-serif text-2xl transition-transform duration-500 md:text-4xl" style={{ transform: isOpen ? "translateX(12px)" : "none" }}>
                  {it.q}
                </span>
                <span className="text-3xl text-accent">{isOpen ? "–" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 pl-1 text-lg leading-relaxed text-muted">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
