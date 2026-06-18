"use client";

import { motion } from "framer-motion";
import { PACKAGES } from "./data";
import { AnimatedText } from "../anim";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Packages() {
  return (
    <section id="packages" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">Packages</p>
            <AnimatedText el="h2" text="Flat pricing, per room" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
          </div>
          <p className="max-w-sm text-muted">No hourly surprises. Know the price before you begin — furniture at trade pricing.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              data-cursor
              className={`group relative flex flex-col rounded-3xl border p-8 transition-transform duration-500 hover:-translate-y-2 ${
                p.featured ? "border-transparent bg-cream text-bg" : "border-line bg-surface"
              }`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-bg px-3 py-1 text-xs uppercase tracking-[0.15em] text-cream">
                  {p.tagline}
                </span>
              )}
              <p className={`text-sm uppercase tracking-[0.2em] ${p.featured ? "text-bg/60" : "text-muted"}`}>{p.name}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-serif text-5xl">{p.price}</span>
                <span className={`mb-1 text-sm ${p.featured ? "text-bg/60" : "text-muted"}`}>{p.unit}</span>
              </div>
              {!p.featured && <p className="mt-2 text-sm text-muted">{p.tagline}</p>}

              <ul className="mt-8 flex flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className={p.featured ? "text-bg" : "text-accent"}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#start"
                className={`btn mt-9 justify-center ${p.featured ? "bg-bg text-cream" : "btn-solid"}`}
                style={p.featured ? { borderColor: "transparent" } : undefined}
              >
                Choose {p.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
