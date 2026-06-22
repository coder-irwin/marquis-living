"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { WORDS } from "./data";

/**
 * Centered hero. A kinetic word cycles through the studio's adjectives in the
 * headline; everything is composed on the centre line. No left/right layout.
 */
export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-28">
      <motion.p
        className="eyebrow mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Marquis Living — Interior Architecture
      </motion.p>

      <motion.h1
        className="display mx-auto max-w-[15ch] text-[clamp(2.8rem,9vw,8rem)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        A home, quietly
        <br />
        <span className="relative inline-block align-bottom overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[i]}
              className="serif italic text-[var(--accent)] inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {WORDS[i]}
            </motion.span>
          </AnimatePresence>
        </span>
        .
      </motion.h1>

      <motion.p
        className="mx-auto mt-9 max-w-md text-lg leading-relaxed text-[var(--soft)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        An interior studio for people who notice the details. Scroll, and step
        through the aperture into a space we made.
      </motion.p>

      <motion.div
        className="mt-11 flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.85 }}
      >
        <Magnetic>
          <a href="#aperture" className="d5-btn d5-btn-solid">Step inside</a>
        </Magnetic>
        <Magnetic>
          <a href="#work" className="d5-btn">View our work</a>
        </Magnetic>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.4em] text-[var(--soft)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}
