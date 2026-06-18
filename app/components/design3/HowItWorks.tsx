"use client";

import { motion } from "framer-motion";
import { STEPS } from "./data";
import { AnimatedText } from "../anim";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks() {
  return (
    <section id="how" className="bg-surface py-24 md:py-32">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-6">How it works</p>
          <AnimatedText el="h2" text="Your easy, four-step process" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              data-cursor
              className="group"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-line font-serif text-lg transition-colors duration-500 group-hover:bg-cream group-hover:text-bg">
                  {s.no}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
