"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { COLLECTIONS, PIECES } from "./data";

const ALL = [...COLLECTIONS.map((c) => c.img), ...PIECES.map((p) => p.img)];
const COLS = [ALL.slice(0, 4), ALL.slice(4, 8), ALL.slice(8, 11), ALL.slice(11, 14)];

function Col({ imgs, y }: { imgs: string[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-4">
      {imgs.map((src, i) => (
        <div key={i} className="aspect-[3/4] overflow-hidden rounded-2xl">
          <img src={src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

export default function MarqueeColumns() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-22%", "6%"]);
  const up2 = useTransform(scrollYProgress, [0, 1], ["2%", "-30%"]);
  const down2 = useTransform(scrollYProgress, [0, 1], ["-30%", "2%"]);

  return (
    <section ref={ref} className="relative h-[130vh] overflow-hidden bg-surface">
      <div className="grid h-full grid-cols-2 gap-4 px-4 md:grid-cols-4">
        <Col imgs={COLS[0]} y={up} />
        <Col imgs={COLS[1]} y={down} />
        <Col imgs={COLS[2]} y={up2} />
        <Col imgs={COLS[3]} y={down2} />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center mix-blend-difference">
        <h2 className="display text-center text-[clamp(2.6rem,9vw,8rem)] text-white">In your space</h2>
      </div>
    </section>
  );
}
