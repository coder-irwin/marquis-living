"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function CTA() {
  return (
    <section id="contact" className="px-6 py-32 md:py-44">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow mb-8">Begin</p>
        <h2 className="display mx-auto max-w-[14ch] text-[clamp(2.6rem,8vw,7rem)]">
          Tell us how you&apos;d like to <span className="serif italic text-[var(--accent)]">live</span>.
        </h2>
        <p className="mx-auto mt-8 max-w-md text-lg text-[var(--soft)]">
          We take on a small number of homes each year, so every one gets all of us.
        </p>
        <div className="mt-12 flex items-center justify-center">
          <Magnetic strength={0.45}>
            <a href="mailto:hello@marquismanor.com" className="d5-btn d5-btn-solid">
              Request a consultation
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
