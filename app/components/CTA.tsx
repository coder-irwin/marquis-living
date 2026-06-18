"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "./images";
import { AnimatedText } from "./anim";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[90vh] items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <img src={IMG.cta} alt="A Marquis Manor piece styled in situ" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/75" />
      </motion.div>

      <div className="container">
        <p className="eyebrow mb-8">(05) — Enquire</p>
        <AnimatedText
          el="h2"
          text="Bring a Marquis Manor piece home."
          className="display max-w-4xl text-[clamp(2.4rem,6.5vw,6.5rem)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-lg text-cream/75"
        >
          A designer is available to chat. Tell us the collection or piece you love and we’ll help you make it part of
          your space.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <a href="#" className="btn btn-solid">
            Start an enquiry
          </a>
          <a href="#collections" className="btn">
            Browse collections
          </a>
        </motion.div>
      </div>
    </section>
  );
}
