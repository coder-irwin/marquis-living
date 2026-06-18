"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText } from "../anim";

const STYLES = [
  { name: "Modern Coastal", img: IMG.hero, desc: "Light, airy and serene — soft textures and ocean-calm tones." },
  { name: "Glam & Elegant", img: IMG.scene1, desc: "Rich materials, sculptural form and a little well-placed drama." },
  { name: "Warm Minimal", img: IMG.about2, desc: "Quiet, considered and uncluttered — warmth without the excess." },
  { name: "Eclectic", img: IMG.bar, desc: "Bold colour and playful contrast, curated with real intention." },
  { name: "Timeless Classic", img: IMG.about1, desc: "Proportion and craftsmanship that simply never date." },
];

export default function StyleFinder() {
  const [i, setI] = useState(0);

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container">
        <div className="mb-12">
          <p className="eyebrow mb-6">Find your style</p>
          <AnimatedText el="h2" text="Which look is you?" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col">
            {STYLES.map((s, idx) => (
              <button
                key={s.name}
                data-cursor
                onMouseEnter={() => setI(idx)}
                onClick={() => setI(idx)}
                className="group flex items-center justify-between border-b border-line py-5 text-left"
              >
                <span
                  className={`font-serif text-2xl transition-all duration-300 md:text-4xl ${
                    i === idx ? "translate-x-2 text-cream" : "text-cream/35"
                  }`}
                >
                  {s.name}
                </span>
                <span className={`text-xl transition-opacity duration-300 ${i === idx ? "opacity-100" : "opacity-0"}`}>→</span>
              </button>
            ))}
            <a href="#start" className="btn btn-solid mt-9 self-start" data-cursor>
              Start with {STYLES[i].name}
            </a>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={i}
                src={STYLES[i].img}
                alt={STYLES[i].name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-sm text-white"
                >
                  {STYLES[i].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
