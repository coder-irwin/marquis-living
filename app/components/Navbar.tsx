"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";

const LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Pieces", href: "#work" },
  { label: "Atelier", href: "#studio" },
  { label: "Craft", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(252,252,252,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between py-5">
          <a
            href="#top"
            className="font-serif text-xl tracking-tight transition-colors duration-500"
            style={{ color: scrolled ? "var(--color-cream)" : "#fcfcfc" }}
          >
            Marquis<span className="italic"> Manor</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="ul-link text-sm transition-colors duration-500"
                style={{ color: scrolled ? "rgba(3,3,3,0.8)" : "rgba(252,252,252,0.85)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <a href="#contact" className="btn btn-solid">
                Enquire now
              </a>
            </Magnetic>
          </div>

          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="h-px w-7 transition-colors duration-500" style={{ backgroundColor: scrolled ? "#030303" : "#fcfcfc" }} />
            <span className="h-px w-7 transition-colors duration-500" style={{ backgroundColor: scrolled ? "#030303" : "#fcfcfc" }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-surface px-7 pb-12 pt-7"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl">Marquis<span className="italic"> Manor</span></span>
              <button aria-label="Close" onClick={() => setOpen(false)} className="text-3xl leading-none">
                ×
              </button>
            </div>
            <nav className="mt-auto flex flex-col gap-3">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-solid mt-10 self-start">
              Enquire now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
