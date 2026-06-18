"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText, Reveal } from "../anim";

const POINTS = [
  { t: "Photoreal 3D", d: "See your exact room rendered in lifelike detail before a single thing is ordered." },
  { t: "Try before you buy", d: "Swap pieces, finishes and layouts until it's perfect — no guesswork, no regret." },
  { t: "Shop with confidence", d: "Approve the render, then receive the precise shopping list to recreate it at home." },
];

export default function ThreeDFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="py-24 md:py-32">
      <div className="container grid items-center gap-12 md:grid-cols-2">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <motion.img style={{ y, scale: 1.12 }} src={IMG.scene1} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div>
          <p className="eyebrow mb-6">The Marquis Manor 3D difference</p>
          <AnimatedText el="h2" text="See it before you commit." className="display text-[clamp(2rem,4vw,3.4rem)]" />
          <div className="mt-9 flex flex-col gap-7">
            {POINTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="flex gap-5">
                  <span className="font-serif text-lg text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-xl">{p.t}</h3>
                    <p className="mt-1 text-muted">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
