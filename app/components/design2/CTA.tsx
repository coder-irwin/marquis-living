"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText } from "../anim";
import Magnetic from "../Magnetic";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-16%", "16%"]);

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <img src={IMG.cta} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/72" />
      </motion.div>

      <div className="container">
        <p className="eyebrow mb-8">(05) — Enquire</p>
        <AnimatedText
          el="h2"
          text="Make it the centre of your room."
          className="display max-w-4xl text-[clamp(2.4rem,7vw,7rem)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-lg text-cream/75"
        >
          Tell us the collection or piece you love — a designer is ready to help you bring a Marquis Manor original home.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <a href="#" className="btn btn-solid" data-cursor>
              Start an enquiry
            </a>
          </Magnetic>
          <a href="#collections" className="btn" data-cursor>
            Browse collections
          </a>
        </motion.div>
      </div>
    </section>
  );
}
