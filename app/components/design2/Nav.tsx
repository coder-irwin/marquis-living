"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Pieces", href: "#pieces" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(252,252,252,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between py-5">
        <a href="#top" className="font-serif text-xl tracking-tight">
          Marquis<span className="italic"> Manor</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="ul-link text-sm text-cream/80 transition-colors hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-solid btn-sm">
          Enquire now
        </a>
      </div>
    </motion.header>
  );
}
