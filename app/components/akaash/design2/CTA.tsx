"use client";

import { motion } from "framer-motion";
import { CTA_IMG } from "./data";

export default function CTA() {
  return (
    <section id="contact" className="relative px-4 py-16 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-[var(--line)]">
          <img
            src={CTA_IMG}
            alt="A warm, finished living space by Marquis Manor"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(250,246,239,0.95)] via-[rgba(250,246,239,0.8)] to-[rgba(250,246,239,0.45)]" />

          <div className="relative flex flex-col items-start gap-8 px-7 py-20 md:px-16 md:py-28">
            <motion.h2
              className="display max-w-3xl text-[clamp(2.4rem,6vw,5rem)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s write the <span className="gold-text serif italic">first chapter</span> of
              your home.
            </motion.h2>
            <motion.p
              className="max-w-md text-lg text-[var(--paper-dim)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Tell us how you live, and we&apos;ll show you a home you haven&apos;t
              imagined yet — rendered, walkable, and ready to build.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <a href="mailto:hello@marquismanor.com" className="d2-btn">
                Book a consultation
              </a>
              <a href="#gallery" className="d2-btn-ghost">
                Browse interiors
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
