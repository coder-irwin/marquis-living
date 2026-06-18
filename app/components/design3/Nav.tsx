"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Packages", href: "#packages" },
  { label: "Projects", href: "#projects" },
  { label: "Rooms", href: "#rooms" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(252,252,252,0.85)" : "rgba(252,252,252,0)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="#top" className="font-serif text-xl tracking-tight">
          Marquis<span className="italic"> Manor</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="ul-link text-sm text-cream/75 transition-colors hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#packages" className="hidden text-sm text-cream/75 transition-colors hover:text-cream sm:block">
            Pricing
          </a>
          <a href="#start" className="btn btn-solid btn-sm">
            Start my design
          </a>
        </div>
      </div>
    </motion.header>
  );
}
