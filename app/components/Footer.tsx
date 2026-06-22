"use client";

import { motion } from "framer-motion";

const COLS = [
  { title: "About Us", items: ["Team", "Company", "Press", "Reviews", "Locations"] },
  { title: "Customer Support", items: ["Catalogues", "FAQ", "Contact Us", "Gift Cards", "Shipping Policy"] },
  { title: "Connect", items: ["Instagram", "Facebook", "Pinterest", "Twitter", "Threads"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-line pt-20">
      <div className="container">
        <div className="grid gap-12 pb-20 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <a href="#top" className="font-serif text-2xl">
              Marquis<span className="italic"> Manor</span>
            </a>
            <p className="mt-5 max-w-xs text-muted">
              The art of designing &amp; crafting luxury furniture — grandeur, artistry and effortless panache.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <p className="mb-6 text-sm uppercase tracking-[0.2em] text-muted">{c.title}</p>
              <ul className="flex flex-col gap-3">
                {c.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="ul-link text-lg">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant wordmark */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "30%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display select-none text-center text-[clamp(3rem,17vw,15rem)] leading-[0.8] pb-[0.18em]"
          >
            Marquis Living
          </motion.h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-7 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Marquis Living. All rights reserved.</p>
          <p>The Art of Designing &amp; Crafting Luxury Furniture</p>
        </div>
      </div>
    </footer>
  );
}
