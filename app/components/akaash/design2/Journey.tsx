"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { JOURNEY } from "./data";

/**
 * The user / design journey — a vertical path the visitor scrolls down. A gold
 * line draws itself as you go, and each of the four movements (Dream → Plan →
 * Craft → Live) reveals in turn. This is the "user journey" made literal.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative py-28 md:py-40">
      <div className="container">
        <header className="mb-20 max-w-2xl">
          <p className="eyebrow mb-5">The User Journey</p>
          <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">
            Four movements from <span className="gold-text serif italic">first call</span> to
            the keys in your hand.
          </h2>
        </header>

        <div ref={ref} className="relative pl-10 md:pl-0">
          {/* spine */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-[var(--line)] md:left-1/2" />
          <motion.div
            className="absolute left-[14px] top-0 w-px origin-top bg-gradient-to-b from-[var(--marigold)] via-[var(--saffron)] to-[var(--magenta)] md:left-1/2"
            style={{ scaleY: lineScale, height: "100%" }}
          />

          <ul className="space-y-16 md:space-y-28">
            {JOURNEY.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={m.step}
                  className={`relative md:flex ${left ? "md:justify-start" : "md:justify-end"}`}
                >
                  {/* node */}
                  <span className="absolute left-[14px] top-2 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="block h-3.5 w-3.5 rounded-full bg-[var(--marigold)] shadow-[0_0_18px_3px_rgba(255,194,75,0.6)]" />
                  </span>

                  <motion.div
                    className={`md:w-[44%] ${left ? "" : "md:text-right"}`}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-2 flex items-baseline gap-4">
                      <span className="serif text-5xl text-[var(--marigold)] opacity-40">
                        0{i + 1}
                      </span>
                      <span className="eyebrow !text-[var(--paper-dim)]">{m.sub}</span>
                    </div>
                    <h3 className="display mb-3 text-4xl md:text-5xl">{m.step}</h3>
                    <p className="max-w-sm text-[var(--paper-dim)] md:ml-0 md:inline-block">
                      {m.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
