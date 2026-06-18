"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "./data";
import { AnimatedText } from "../anim";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">Real projects</p>
            <AnimatedText el="h2" text="Spaces we've transformed" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
          </div>
          <a href="#projects" className="btn btn-sm self-start" data-cursor>
            View all projects
          </a>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#start"
              data-cursor
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-bg/85 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                  {p.tag}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <h3 className="font-serif text-2xl">{p.title}</h3>
                <span className="text-xl text-cream/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-cream">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
