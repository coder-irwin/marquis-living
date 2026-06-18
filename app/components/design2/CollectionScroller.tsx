"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { COLLECTIONS } from "./data";

const ITEMS = COLLECTIONS.slice(0, 6);

export default function CollectionScroller() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = ITEMS.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999))));
  });

  return (
    <section id="worlds" ref={ref} className="relative" style={{ height: `${n * 65}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* full-bleed images that wipe in over each other */}
        {ITEMS.map((c, i) => (
          <motion.div
            key={c.no}
            className="absolute inset-0"
            style={{ zIndex: i }}
            initial={false}
            animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              src={c.img}
              alt={c.name}
              className="h-full w-full object-cover"
              initial={false}
              animate={{ scale: active === i ? 1.04 : 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        ))}

        {/* captions */}
        <div className="container relative z-50 flex h-full flex-col justify-center">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/80">
            The Collections — {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>

          <div className="relative h-[36vh]">
            {ITEMS.map((c, i) => (
              <motion.div
                key={c.no}
                className="absolute inset-0 flex flex-col justify-center"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 44 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="display text-[clamp(2.8rem,10vw,9rem)] text-white">{c.name}</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex gap-2">
            {ITEMS.map((_, i) => (
              <span key={i} className="h-[3px] w-full max-w-[64px] overflow-hidden rounded-full bg-white/25">
                <motion.span
                  className="block h-full bg-white"
                  initial={false}
                  animate={{ width: i <= active ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
