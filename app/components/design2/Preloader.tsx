"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";

const PANELS = 6;
const EASE = [0.76, 0, 0.24, 1] as const;

interface Lenis {
  stop?: () => void;
  start?: () => void;
}

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);

  // lock scroll + count up
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    (window as unknown as { lenis?: Lenis }).lenis?.stop?.();

    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setReveal(true),
    });
    return () => controls.stop();
  }, []);

  // after the count finishes, part the panels then unlock
  useEffect(() => {
    if (!reveal) return;
    const t = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      (window as unknown as { lenis?: Lenis }).lenis?.start?.();
    }, 1150);
    return () => clearTimeout(t);
  }, [reveal]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* panels that slide up to reveal the site */}
      {Array.from({ length: PANELS }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1 bg-bg"
          style={{ borderRight: i < PANELS - 1 ? "1px solid rgba(3,3,3,0.04)" : "none" }}
          initial={{ y: 0 }}
          animate={reveal ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.95, ease: EASE, delay: reveal ? i * 0.07 : 0 }}
        />
      ))}

      {/* centred brand + loading readout */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={{ opacity: reveal ? 0 : 1, y: reveal ? -30 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow mb-7">Marquis Living</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="display text-center text-[clamp(2.6rem,9vw,8rem)]"
          >
            Functional <span className="italic">Art</span>
          </motion.h1>
        </div>

        <div className="mt-10 flex w-[min(440px,72vw)] items-center gap-5">
          <div className="relative h-px flex-1 overflow-hidden bg-line">
            <div className="absolute inset-y-0 left-0 bg-cream" style={{ width: `${count}%` }} />
          </div>
          <span className="font-serif text-lg tabular-nums">{String(count).padStart(3, "0")}</span>
        </div>
      </motion.div>
    </div>
  );
}
