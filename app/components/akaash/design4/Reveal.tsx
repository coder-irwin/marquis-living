"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { REVEAL_IMG } from "./data";

/**
 * The Reveal — the resolved room presented on a plane that tilts in 3D toward
 * the cursor (parallax depth on the framed art + caption), and lifts slightly
 * as it enters. The emotional arrival of the journey.
 */
export default function Reveal() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { damping: 24, stiffness: 180 });
  const sy = useSpring(ry, { damping: 24, stiffness: 180 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rise = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const grow = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section className="relative py-28 md:py-40">
      <div className="container">
        <p className="eyebrow mb-10 text-center">The Reveal</p>
        <motion.div
          ref={ref}
          data-hot
          onPointerMove={onMove}
          onPointerLeave={reset}
          className="relative mx-auto max-w-5xl"
          style={{ y: rise, scale: grow, perspective: 1200 }}
        >
          <motion.div
            className="preserve-3d relative aspect-[16/9] overflow-hidden rounded-md ring-1 ring-[var(--line)] shadow-[0_70px_180px_-50px_rgba(0,0,0,0.9)]"
            style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={REVEAL_IMG}
              alt="The finished room — Marquis Manor"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,7,0.55)] via-transparent to-transparent" />

            {/* caption floats above the surface */}
            <div
              className="absolute bottom-7 left-7 right-7 flex items-end justify-between"
              style={{ transform: "translateZ(60px)" }}
            >
              <div>
                <p className="eyebrow !text-white/85">Project No. 47</p>
                <p className="display text-3xl text-white">The Atrium House</p>
              </div>
              <span className="serif text-xl text-[var(--gold-bright)]">Marquis Manor</span>
            </div>
          </motion.div>
        </motion.div>

        <p className="mx-auto mt-12 max-w-xl text-center text-lg leading-relaxed text-[var(--mist)]">
          You didn&apos;t scroll a page. You walked a house — through its light, its
          descent, its materials, into the room at the end of it.
        </p>
      </div>
    </section>
  );
}
