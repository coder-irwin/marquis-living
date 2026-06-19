"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CHAPTERS } from "./data";

function Chapter({ c, i }: { c: (typeof CHAPTERS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const flip = i % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="zoom relative aspect-[4/5] overflow-hidden rounded-md ring-1 ring-[var(--line)]">
        <motion.img
          src={c.img}
          alt={`${c.title} — ${c.tag} interior by Marquis Manor`}
          className="h-full w-full object-cover"
          style={{ scale: imgScale, y: imgY }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-[rgba(250,246,239,0.82)] px-3 py-1 text-xs tracking-[0.2em] text-[var(--paper)] backdrop-blur">
          {c.tag}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-5 flex items-center gap-4">
          <span className="serif text-6xl text-[var(--marigold)] opacity-30">{c.no}</span>
          <span className="d2-rule w-16" />
          <span className="eyebrow">{c.kicker}</span>
        </div>
        <h3 className="display mb-5 text-[clamp(2rem,4.5vw,3.6rem)]">{c.title}</h3>
        <p className="max-w-md text-lg leading-relaxed text-[var(--paper-dim)]">{c.body}</p>
        <a href="#contact" className="d2-link mt-7 inline-block text-sm text-[var(--marigold)]">
          Explore this space →
        </a>
      </motion.div>
    </div>
  );
}

export default function Chapters() {
  return (
    <section id="chapters" className="relative py-24 md:py-32">
      <div className="container">
        <header className="mx-auto mb-20 max-w-2xl text-center">
          <p className="eyebrow mb-5">The Rooms · Our Products</p>
          <h2 className="display text-[clamp(2.2rem,5.5vw,4rem)]">
            Every room is a <span className="gold-text serif italic">chapter</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[var(--paper-dim)]">
            Furniture, lighting and finishes we design and build in-house — shown
            here in the spaces they were made for.
          </p>
        </header>

        <div className="space-y-24 md:space-y-36">
          {CHAPTERS.map((c, i) => (
            <Chapter key={c.no} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
