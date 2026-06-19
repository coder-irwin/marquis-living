"use client";

import { motion } from "framer-motion";

const FOOT_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "hello@marquismanor.studio", href: "#" },
];

/**
 * Footer (#contact) — the cinematic close: a dark panel, a gradient-shine call
 * to action, slide-swap links (the reference's `data-replace` hover) and a
 * back-to-top control with the glowing gradient on hover.
 */
export default function Footer() {
  return (
    <footer id="contact" className="bg-[#060010] text-white">
      <div className="container py-[clamp(4rem,9vw,8rem)]">
        <motion.h2
          className="display max-w-[16ch] text-[clamp(2.4rem,7vw,6rem)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Great spaces start with a{" "}
          <span className="d9-shine">conversation.</span>
        </motion.h2>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="#" className="d9-btn">Start a project</a>
          <a href="#" className="d9-btn-ghost text-white">Book a consultation</a>
        </div>

        <div className="mt-20 flex flex-col gap-10 border-t border-white/15 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">Marquis Manor</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55">
              Interior architecture, furniture, lighting and styling — designed,
              made and installed under one roof.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOT_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="d9-link text-sm text-white/75"
                  data-replace={l.label}
                >
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex items-center justify-between text-xs text-white/40">
          <span>© 2026 Marquis Manor. All rights reserved.</span>
          <a href="#top" className="d9-btn !px-5 !py-2.5 !text-xs">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
