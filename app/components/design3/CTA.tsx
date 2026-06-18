"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText } from "../anim";
import Magnetic from "../Magnetic";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="start" ref={ref} className="relative flex min-h-[88vh] items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <img src={IMG.cta} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/72" />
      </motion.div>

      <div className="container text-center">
        <p className="eyebrow mb-8">Start today</p>
        <AnimatedText
          el="h2"
          text="Your transformation starts here."
          className="display mx-auto max-w-4xl text-[clamp(2.4rem,6.5vw,6rem)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-xl text-lg text-cream/75"
        >
          Take the style quiz, meet your designer, and see your room reimagined with Marquis Manor — risk-free, you’ll
          love it guaranteed.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <Magnetic>
            <a href="#" className="btn btn-solid" data-cursor>
              Start my transformation
            </a>
          </Magnetic>
          <a href="#packages" className="btn" data-cursor>
            See packages
          </a>
        </motion.div>
      </div>
    </section>
  );
}
