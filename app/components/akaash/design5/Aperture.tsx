"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { APERTURE_IMG, APERTURE_VIDEO } from "./data";

/**
 * The signature interaction: a small centered circle of an interior that, as
 * you scroll, expands (clip-path radius growing) until it fills the screen —
 * the visitor "steps through the aperture" into the room. A caption resolves
 * once you're inside.
 */
export default function Aperture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // circle radius grows from a small disc to beyond the viewport
  const radius = useTransform(scrollYProgress, [0, 0.85], [13, 150]);
  const clip = useMotionTemplate`circle(${radius}% at 50% 50%)`;
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);

  // intro label (around the small circle) fades as it opens
  const introOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  // inside caption resolves once mostly open
  const capOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const capY = useTransform(scrollYProgress, [0.7, 0.95], [20, 0]);

  return (
    <section id="aperture" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* expanding aperture */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip, WebkitClipPath: clip }}>
          <motion.video
            src={APERTURE_VIDEO}
            poster={APERTURE_IMG}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Marquis Living studio showreel"
            className="h-full w-full object-cover"
            style={{ scale: imgScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <motion.div
            className="absolute inset-x-0 bottom-[12vh] px-6"
            style={{ opacity: capOpacity, y: capY }}
          >
            <p className="eyebrow !text-white/80 mb-3">Project No. 31 — The Quiet House</p>
            <p className="display mx-auto max-w-[14ch] text-white text-[clamp(1.8rem,4vw,3.4rem)]">
              You&apos;re inside now.
            </p>
          </motion.div>
        </motion.div>

        {/* label ringing the small circle before it opens */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: introOpacity }}
        >
          <p className="eyebrow mb-3 text-white/90 mix-blend-difference">The Aperture</p>
        </motion.div>
      </div>
    </section>
  );
}
