"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../images";

export default function ParallaxBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.4, 1, 1, 0.4]);

  return (
    <section ref={ref} className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-125">
        <img src={IMG.scene1} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/55" />
      </motion.div>
      <motion.p
        style={{ opacity }}
        className="container max-w-4xl text-center font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.3]"
      >
        “A Marquis Living piece is not bought. It is welcomed — and it stays for a lifetime.”
      </motion.p>
    </section>
  );
}
