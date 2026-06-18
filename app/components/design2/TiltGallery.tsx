"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText } from "../anim";

const PIECES = [
  { name: "Wing Console", tag: "Console", img: IMG.console },
  { name: "Beetle Crockery", tag: "Accessories", img: IMG.crockery },
  { name: "Lotus Side Table", tag: "Side Table", img: IMG.sideTable },
  { name: "Rossie Chair", tag: "Accent Chair", img: IMG.chair },
  { name: "Buckle Center Table", tag: "Center Table", img: IMG.centerTable },
  { name: "Marquis Bed", tag: "Bed", img: IMG.bed },
];

function TiltCard({ piece, index }: { piece: (typeof PIECES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(252,252,252,0.35), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set((0.5 - py) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor
        className="preserve-3d group relative overflow-hidden rounded-2xl bg-bg"
        style={{ rotateX: srx, rotateY: sry }}
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={piece.img}
            alt={piece.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* glare */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
        {/* label */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-6">
          <div style={{ transform: "translateZ(40px)" }}>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">{piece.tag}</p>
            <p className="font-serif text-2xl text-white">{piece.name}</p>
          </div>
          <span className="text-xl text-white/80" style={{ transform: "translateZ(40px)" }}>
            ↗
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TiltGallery() {
  return (
    <section id="pieces" className="container py-28 md:py-40">
      <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-6">(02) — Signature Pieces</p>
          <AnimatedText el="h2" text="Made to be touched" className="display text-[clamp(2.2rem,5vw,4.5rem)]" />
        </div>
        <p className="max-w-sm text-muted">Hover a piece — it leans toward you, as if catching the light.</p>
      </div>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {PIECES.map((p, i) => (
          <TiltCard key={p.name} piece={p} index={i} />
        ))}
      </div>
    </section>
  );
}
