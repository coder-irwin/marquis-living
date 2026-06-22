"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const QUOTES = [
  { quote: "Our Ocean console is the first thing every guest stops at. It doesn't look like furniture — it looks like art we happen to use every day.", name: "Ananya Mehta", role: "Ocean Collection" },
  { quote: "The detailing is extraordinary. You can feel the hours of hand-work in every curve of the Astronomica pieces.", name: "Rohan Kapoor", role: "Astronomica Collection" },
  { quote: "Marquis Living understood exactly the drama we wanted. The Circus chairs turned an ordinary corner into the heart of the house.", name: "Priya Sharma", role: "Circus Collection" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);
  const q = QUOTES[i];

  return (
    <section className="container py-28 md:py-40">
      <p className="eyebrow mb-10">Kind Words</p>
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="display max-w-5xl text-[clamp(1.6rem,3.6vw,3.2rem)] leading-[1.15]">“{q.quote}”</p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-accent" />
              <div>
                <p className="font-serif text-xl">{q.name}</p>
                <p className="text-sm text-muted">{q.role}</p>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <button data-cursor onClick={() => go(-1)} aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:bg-cream hover:text-bg">
          ←
        </button>
        <button data-cursor onClick={() => go(1)} aria-label="Next" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:bg-cream hover:text-bg">
          →
        </button>
        <span className="ml-4 text-sm text-muted">
          {String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
