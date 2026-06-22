"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText, Reveal } from "../anim";

export default function SplitFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section id="atelier" className="container py-28 md:py-40">
      <div className="grid items-start gap-14 md:grid-cols-2">
        <div className="md:sticky md:top-32 md:h-fit">
          <p className="eyebrow mb-6">The Atelier</p>
          <AnimatedText el="h2" text="Where stories become objects." className="display text-[clamp(2rem,4vw,3.6rem)]" />
          <Reveal delay={0.1} className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Founded in 2010, Marquis Living is a small team of designers, makers and stylists. Every collection begins as
            a story and is sculpted by hand into furniture you live with — grounded in honest materials and meticulous
            proportion.
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <a href="#collections" className="btn" data-cursor>
              Explore the collections
            </a>
          </Reveal>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-5">
          <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden rounded-2xl" data-cursor>
            <img src={IMG.about1} alt="" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="mt-12 aspect-[3/4] overflow-hidden rounded-2xl" data-cursor>
            <img src={IMG.about2} alt="" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
