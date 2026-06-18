"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "./data";
import { AnimatedText } from "../anim";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
        <div className="md:sticky md:top-32 md:h-fit">
          <p className="eyebrow mb-6">FAQ</p>
          <AnimatedText el="h2" text="Good to know" className="display text-[clamp(2rem,4vw,3.4rem)]" />
          <p className="mt-6 max-w-xs text-muted">Still curious? Start a design and your designer will answer everything.</p>
        </div>

        <div className="border-t border-line">
          {FAQS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-line">
                <button
                  data-cursor
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-xl md:text-2xl">{it.q}</span>
                  <span className="text-2xl text-accent">{isOpen ? "–" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-muted">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
