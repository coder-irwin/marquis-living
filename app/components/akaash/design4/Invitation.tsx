"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Invitation — the way out. The wordmark scales with the final scroll, the
 * light field still glowing behind, closing the journey without a hard footer.
 */
export default function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.02]);
  const lift = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <footer id="invitation" ref={ref} className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden py-24 text-center">
      <motion.div style={{ scale, y: lift }} className="container">
        <p className="eyebrow mb-8">Begin a project</p>
        <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.6rem,9vw,8rem)]">
          Step into a home that <span className="gold-text serif italic">remembers</span> you.
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <a href="mailto:hello@marquismanor.com" className="d4-btn" data-hot>
            Request an invitation
          </a>
          <a href="#top" className="d4-btn-ghost" data-hot>
            Return to the threshold
          </a>
        </div>
      </motion.div>

      <div className="container mt-20 flex w-full flex-col gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--mist)] md:flex-row md:items-center md:justify-between">
        <span className="serif text-lg text-[var(--bone)]">
          Marquis<span className="text-[var(--gold)]">·</span>Manor
        </span>
        <span>© {new Date().getFullYear()} Marquis Living — a living piece of architecture.</span>
        <span>Design 4 — /akaash/design4</span>
      </div>
    </footer>
  );
}
