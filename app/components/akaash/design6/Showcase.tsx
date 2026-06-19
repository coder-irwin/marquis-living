"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FEATURE_IMG } from "./data";

/**
 * A full-bleed featured interior that parallaxes behind a short editorial line
 * — a calm, luxurious pause between the services grid and the work gallery.
 */
export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
      <motion.img
        src={FEATURE_IMG}
        alt="A completed Marquis Manor interior"
        className="absolute inset-0 h-[124%] w-full object-cover"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="container relative flex h-full items-end pb-14">
        <motion.p
          className="display max-w-3xl text-white text-[clamp(1.8rem,4.5vw,3.4rem)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Every detail, made in-house and measured to the room.
        </motion.p>
      </div>
    </section>
  );
}
