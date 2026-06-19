"use client";

import { motion } from "framer-motion";
import { STATS } from "./data";

export default function Stats() {
  return (
    <section className="bg-[var(--cloud)] px-6 py-24">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="display text-[clamp(2.4rem,5vw,4rem)]">{s.v}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--soft)]">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
