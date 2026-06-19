"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GALLERY } from "./data";

/**
 * Zoom-parallax gallery (A?/ZoomParallax in the reference) — a 300vh scroll
 * track with a sticky stage; seven of the studio's own interiors scale out at
 * different rates as you scroll, the centre image filling the frame.
 */
const POS = [
  "h-[26vh] w-[26vw]",
  "h-[30vh] w-[35vw] top-[-30vh] left-[5vw]",
  "h-[45vh] w-[20vw] top-[-10vh] left-[-25vw]",
  "h-[26vh] w-[25vw] left-[27.5vw]",
  "h-[25vh] w-[20vw] top-[27.5vh] left-[5vw]",
  "h-[25vh] w-[30vw] top-[27.5vh] left-[-22.5vw]",
  "h-[15vh] w-[15vw] top-[22.5vh] left-[25vw]",
];

export default function ZoomParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // One transform per image (fixed count — hooks stay in stable order).
  const s0 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const s1 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s3 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s4 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [s0, s1, s2, s3, s4, s5, s6];

  return (
    <section id="work" className="relative">
      <div className="container py-[clamp(4rem,10vw,9rem)]">
        <p className="eyebrow mb-5">Selected work</p>
        <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.6rem)]">
          Interiors we&apos;ve made, room by room.
        </h2>
      </div>

      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {GALLERY.slice(0, 7).map((g, i) => (
            <motion.div
              key={g.src}
              style={{ scale: scales[i] }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative ${POS[i]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.src}
                  alt={g.t}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
