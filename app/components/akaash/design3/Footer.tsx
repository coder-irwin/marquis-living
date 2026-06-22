"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden border-t border-[var(--ink-line)] bg-[var(--paper-2)]">
      {/* soft ink blot ornament */}
      <div
        aria-hidden
        className="d3-blot pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle at 40% 40%, var(--ink), transparent 70%)" }}
      />

      <div className="container relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-5">Let&apos;s begin</p>
          <h2 className="display text-[clamp(2.6rem,7vw,6rem)]">
            Tell us how you <span className="ink-text serif italic">live</span>.
          </h2>
          <p className="mt-6 max-w-md text-lg text-[var(--ink-soft)]">
            We&apos;ll sketch a home you haven&apos;t imagined yet — rendered, walkable
            and ready to build.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="mailto:hello@marquismanor.com" className="d3-btn">
              Book a consultation
            </a>
            <a href="#method" className="d3-btn-ghost">
              See the method
            </a>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--ink-line)] pt-6 text-xs text-[var(--ink-soft)] md:flex-row md:items-center md:justify-between">
          <span className="serif text-lg text-[var(--ink)]">
            Marquis<span className="text-[var(--vermilion)]">·</span>Manor
          </span>
          <span>© {new Date().getFullYear()} Marquis Living — drawn in ink, built to live in.</span>
          <span>Design 3 — /akaash/design3</span>
        </div>
      </div>
    </footer>
  );
}
