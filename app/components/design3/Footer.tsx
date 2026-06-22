"use client";

import { motion } from "framer-motion";

const COLS = [
  { title: "Service", items: ["How it works", "Packages", "Projects", "Room ideas", "FAQ"] },
  { title: "Company", items: ["The atelier", "Designers", "Press", "Reviews", "Contact"] },
  { title: "Connect", items: ["Instagram", "Pinterest", "Facebook", "Newsletter"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg pt-20">
      <div className="container">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <a href="#top" className="font-serif text-2xl">
              Marquis<span className="italic"> Manor</span>
            </a>
            <p className="mt-5 max-w-xs text-muted">
              Online interior design, backed by an atelier of hand-crafted furniture. A space you’ll love — guaranteed.
            </p>
            <a href="#start" className="btn btn-solid btn-sm mt-7" data-cursor>
              Start my design
            </a>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="mb-6 text-sm uppercase tracking-[0.2em] text-muted">{c.title}</p>
              <ul className="flex flex-col gap-3">
                {c.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="ul-link text-lg" data-cursor>
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "28%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display select-none text-center text-[clamp(3rem,18vw,16rem)] leading-[0.8] pb-[0.18em]"
          >
            Marquis Living
          </motion.h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-7 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Marquis Living. All rights reserved.</p>
          <p>Design 03 — online interior design.</p>
        </div>
      </div>
    </footer>
  );
}
