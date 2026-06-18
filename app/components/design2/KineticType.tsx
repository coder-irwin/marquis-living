"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function KineticType() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1.04, 1.34]);
  const tracking = useTransform(scrollYProgress, [0, 1], ["-0.04em", "0.16em"]);
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4]);

  return (
    <section ref={ref} className="flex h-[85vh] items-center overflow-hidden bg-bg">
      <motion.h2
        style={{ scale, letterSpacing: tracking, x, opacity }}
        className="display whitespace-nowrap text-[clamp(3rem,13vw,13rem)]"
      >
        Grandeur · Artistry · Panache ·
      </motion.h2>
    </section>
  );
}
