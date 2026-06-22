"use client";

import { motion } from "framer-motion";
import { ROOMS } from "./data";
import { AnimatedText } from "../anim";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RoomIdeas() {
  return (
    <section id="rooms" className="bg-surface py-24 md:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">Design ideas</p>
            <AnimatedText el="h2" text="Every room, reimagined" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
          </div>
          <p className="max-w-sm text-muted">From living rooms to hospitality spaces — explore what a Marquis Living design looks like.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {ROOMS.map((r, i) => (
            <motion.a
              key={r.name}
              href="#start"
              data-cursor
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img
                src={r.img}
                alt={r.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <h3 className="font-serif text-2xl text-white">{r.name}</h3>
                <span className="text-white/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
