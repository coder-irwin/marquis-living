"use client";

import { motion } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText } from "../anim";

const DESIGNERS = [
  { name: "Camille Roy", spec: "Residential · Coastal", img: IMG.about1 },
  { name: "Élise Fontaine", spec: "Hospitality · Glam", img: IMG.about2 },
  { name: "Marc Lavigne", spec: "Minimal · Sustainable", img: IMG.scene1 },
  { name: "Sofia Reyes", spec: "Eclectic · Commercial", img: IMG.scene2 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Designers() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">The team</p>
            <AnimatedText el="h2" text="Meet your designers" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
          </div>
          <p className="max-w-sm text-muted">Award-winning designers, hand-matched to your taste and your space.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {DESIGNERS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.07 }}
              data-cursor
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-4 font-serif text-xl">{d.name}</h3>
              <p className="text-sm text-muted">{d.spec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
