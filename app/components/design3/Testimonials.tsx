"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IMG } from "../images";

const QUOTES = [
  { quote: "The whole process was so helpful. From first concept to install, everything was better than we imagined.", name: "Élise Fontaine", role: "Living Room · Ocean", img: IMG.about1 },
  { quote: "This apartment finally captures my personality and style perfectly. I love every corner.", name: "Daniel Okafor", role: "Apartment · Sustainable", img: IMG.about2 },
  { quote: "Our home office designs fit each of us perfectly. They make getting work done a real pleasure.", name: "Priya & Sam", role: "Home Office · House of Cards", img: IMG.scene1 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + QUOTES.length) % QUOTES.length);
  const q = QUOTES[i];

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container">
        <p className="eyebrow mb-12">Client love</p>
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.25]">“{q.quote}”</p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="h-px w-12 bg-accent" />
                  <div>
                    <p className="font-serif text-lg">{q.name}</p>
                    <p className="text-sm text-muted">{q.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button data-cursor onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-cream hover:text-bg">
                ←
              </button>
              <button data-cursor onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-cream hover:text-bg">
                →
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={i}
                src={q.img}
                alt={q.name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
