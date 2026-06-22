"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--line)] bg-[var(--paper)] px-6 pt-24 pb-12">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-[0.7rem] uppercase tracking-[0.32em] text-[var(--teal)]">Begin a project</p>
          <h2 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
            Let&apos;s build something <span className="text-[var(--teal)]">lasting</span>.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:hello@marquismanor.com" className="d6-btn">Book a consultation</a>
            <a href="#work" className="d6-btn-ghost">See more work</a>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-10 border-t border-[var(--line)] pt-12 text-sm sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">Marquis Living<span className="text-[var(--teal)]">.</span></p>
            <p className="mt-2 text-[var(--soft)]">Interior architecture, furniture &amp; light — made in-house.</p>
          </div>
          <div>
            <p className="mb-3 text-[var(--soft)]/70">Studio</p>
            <ul className="space-y-2">
              <li><a href="#services" className="d6-link">Services</a></li>
              <li><a href="#work" className="d6-link">Work</a></li>
              <li><a href="#why" className="d6-link">About</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[var(--soft)]/70">Connect</p>
            <ul className="space-y-2">
              <li><a href="mailto:hello@marquismanor.com" className="d6-link">Email</a></li>
              <li><a href="#" className="d6-link">Instagram</a></li>
              <li><a href="#" className="d6-link">Pinterest</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[var(--soft)]/70">Studio hours</p>
            <p className="text-[var(--soft)]">Mon–Fri, 9–6<br />By appointment</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--soft)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Marquis Living. All rights reserved.</span>
          <span>Design 6 — /akaash/design6</span>
        </div>
      </div>
    </footer>
  );
}
