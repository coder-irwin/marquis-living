"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { JOURNEY } from "./data";

/**
 * The user journey, "The Marquis Method" — a sticky left panel whose giant
 * numeral + vermilion progress track react to whichever step is in view on the
 * right. Distinct from design2's zig-zag timeline and kept strictly aligned.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="method" ref={ref} className="relative bg-[var(--paper)] py-20 md:py-28">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          {/* ---- sticky panel ---- */}
          <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:py-20">
            <p className="eyebrow mb-6">The User Journey</p>
            <h2 className="display mb-8 text-[clamp(2.4rem,5vw,4.2rem)]">
              The Marquis <span className="ink-text serif italic">Method</span>.
            </h2>

            <div className="relative flex items-end gap-6">
              {/* giant numeral that swaps with the active step */}
              <div className="relative h-[7rem] w-[6rem] overflow-hidden md:h-[11rem] md:w-[9rem]">
                {JOURNEY.map((s, i) => (
                  <motion.span
                    key={s.no}
                    className="serif absolute inset-0 text-[7rem] leading-none text-[var(--vermilion)] md:text-[11rem]"
                    animate={{
                      y: active === i ? "0%" : active > i ? "-110%" : "110%",
                      opacity: active === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {s.no}
                  </motion.span>
                ))}
              </div>

              <div className="pb-3">
                <p className="text-sm tracking-[0.2em] text-[var(--ink-soft)]">
                  STEP {active + 1} / {JOURNEY.length}
                </p>
                <p className="display text-3xl md:text-4xl">{JOURNEY[active].title}</p>
              </div>
            </div>

            {/* progress track */}
            <div className="mt-8 h-px w-full max-w-xs bg-[var(--ink-line)]">
              <motion.div className="h-full bg-[var(--vermilion)]" style={{ width: fill }} />
            </div>
          </div>

          {/* ---- the scrolling steps ---- */}
          <ul>
            {JOURNEY.map((s, i) => (
              <li
                key={s.no}
                className="flex min-h-[80svh] flex-col justify-center py-10 md:min-h-screen"
              >
                <motion.div
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <span className="serif text-2xl text-[var(--vermilion)]">{s.no}</span>
                    <span className="h-px flex-1 bg-[var(--ink-line)]" />
                    <span className="eyebrow !text-[var(--ink-soft)]">{s.line}</span>
                  </div>

                  {/* ink-edge image wipe */}
                  <motion.div
                    className="relative aspect-[16/10] overflow-hidden rounded-sm ring-1 ring-[var(--ink-line)]"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={`${s.title} — ${s.line}, by Marquis Living`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  <h3 className="display mt-7 text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">
                    {s.body}
                  </p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
