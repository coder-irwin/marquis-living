"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { IMG } from "../images";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOATERS = [
  { src: IMG.console, cls: "left-[5%] top-[20%] w-[140px] md:w-[210px]", depth: 80, ratio: "aspect-[4/5]" },
  { src: IMG.chair, cls: "right-[7%] top-[16%] w-[120px] md:w-[180px]", depth: 120, ratio: "aspect-[4/5]" },
  { src: IMG.sideTable, cls: "left-[12%] bottom-[12%] w-[120px] md:w-[170px]", depth: 55, ratio: "aspect-square" },
  { src: IMG.crockery, cls: "right-[11%] bottom-[10%] w-[120px] md:w-[160px]", depth: 100, ratio: "aspect-square" },
];

function Floater({
  smx,
  smy,
  depth,
  src,
  cls,
  ratio,
}: {
  smx: MotionValue<number>;
  smy: MotionValue<number>;
  depth: number;
  src: string;
  cls: string;
  ratio: string;
}) {
  const tx = useTransform(smx, [-0.5, 0.5], [depth, -depth]);
  const ty = useTransform(smy, [-0.5, 0.5], [depth * 0.6, -depth * 0.6]);
  return (
    <motion.div className={`absolute ${cls}`} style={{ x: tx, y: ty, z: depth }} data-cursor>
      <div className={`${ratio} w-full overflow-hidden rounded-2xl shadow-2xl`}>
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 18 });
  const smy = useSpring(my, { stiffness: 70, damping: 18 });

  const rotY = useTransform(smx, [-0.5, 0.5], [14, -14]);
  const rotX = useTransform(smy, [-0.5, 0.5], [-12, 12]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yUp = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const line = (txt: React.ReactNode, delay: number) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {txt}
      </motion.span>
    </span>
  );

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{ perspective: 1300 }}
    >
      <motion.div
        className="preserve-3d relative flex h-full w-full items-center justify-center"
        style={{ rotateX: rotX, rotateY: rotY, y: yUp, opacity: fade }}
      >
        {/* floating pieces at varying depth */}
        {FLOATERS.map((f, i) => (
          <Floater key={i} smx={smx} smy={smy} {...f} />
        ))}

        {/* center kinetic headline */}
        <div className="relative z-10 px-4 text-center" style={{ transform: "translateZ(60px)" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="eyebrow mb-7"
          >
            Luxury Furniture · Since 2010
          </motion.p>

          <h1 className="display text-[clamp(3rem,11vw,11rem)]">
            {line("Functional", 0.3)}
            <span className="italic text-accent">{line("Art.", 0.42)}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1, ease: EASE }}
            className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-muted"
          >
            Sculptural, hand-crafted furniture — where every collection is a world you can live inside.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: EASE }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a href="#collections" className="btn btn-solid" data-cursor>
              Explore collections
            </a>
            <a href="#pieces" className="btn" data-cursor>
              View pieces
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-10 w-px bg-cream/40"
        />
      </motion.div>
    </section>
  );
}
