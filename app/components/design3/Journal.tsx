"use client";

import { motion } from "framer-motion";
import { IMG } from "../images";
import { AnimatedText } from "../anim";

const POSTS = [
  { cat: "Living Room", title: "Five ways to bring coastal calm into any space", img: IMG.hero },
  { cat: "Materials", title: "Why hand-finished timber only gets better with age", img: IMG.about1 },
  { cat: "Small Spaces", title: "How to make a studio feel twice its size", img: IMG.scene2 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Journal() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">Guides &amp; ideas</p>
            <AnimatedText el="h2" text="From the journal" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
          </div>
          <a href="#" className="btn btn-sm self-start" data-cursor>
            Read the journal
          </a>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              data-cursor
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">{p.cat}</p>
              <h3 className="mt-2 font-serif text-2xl leading-snug">{p.title}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
