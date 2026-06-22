"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { SPOTLIGHT_IMG } from "./data";

/**
 * Light Study — the room sits in near-darkness; the visitor's cursor is a
 * physical pool of light that travels across the surfaces, revealing the
 * interior only where it falls. On touch devices the light drifts on its own.
 */
export default function LightStudy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const x = useSpring(mx, { damping: 30, stiffness: 200 });
  const y = useSpring(my, { damping: 30, stiffness: 200 });

  // the reveal mask + the warm light glow both track the same point
  const mask = useMotionTemplate`radial-gradient(circle 22vw at ${x}% ${y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 42%, rgba(0,0,0,0) 72%)`;
  const glow = useMotionTemplate`radial-gradient(circle 24vw at ${x}% ${y}%, rgba(201,169,106,0.25), transparent 70%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section className="relative py-24 md:py-36">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="display max-w-xl text-[clamp(2rem,5vw,4rem)]">
            We design with <span className="gold-text serif italic">light</span> first.
          </h2>
          <p className="hidden max-w-xs text-sm text-[var(--mist)] md:block">
            {touched ? "Light drifts across the room." : "Move your light across the room."}
          </p>
        </div>

        <div
          ref={wrapRef}
          data-hot
          onPointerMove={onMove}
          onPointerDown={() => setTouched(true)}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-sm ring-1 ring-[var(--line)]"
          style={{ touchAction: "pan-y" }}
        >
          {/* the room — only seen where the light falls */}
          <motion.img
            src={SPOTLIGHT_IMG}
            alt="A dark interior revealed by light — Marquis Living"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              WebkitMaskImage: mask,
              maskImage: mask,
            }}
          />
          {/* base darkness with a barely-there ghost of the room */}
          <img
            src={SPOTLIGHT_IMG}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.06]"
          />
          {/* warm light bloom over the revealed area */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
          <div className="pointer-events-none absolute inset-0 bg-[var(--void)]/10" />
        </div>
      </div>
    </section>
  );
}
