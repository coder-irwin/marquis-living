"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

const Wordmark = ({ className }: { className?: string }) => (
  <span className={`font-serif tracking-tight ${className ?? ""}`}>
    Marquis<span className="italic"> Manor</span>
  </span>
);

const LEFT = [
  { label: "Collections", href: "#" },
  { label: "Atelier", href: "#" },
  { label: "Journal", href: "#" },
];
const RIGHT = [
  { label: "Our Shop", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[color,background-color,border-color] duration-500"
        style={{
          color: scrolled ? "#2f3a48" : "#ffffff",
          backgroundColor: scrolled ? "rgba(252,252,252,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(47,58,72,0.12)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-[clamp(18px,3vw,42px)] py-5">
          {/* Mobile burger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="flex w-7 flex-col gap-[6px] lg:hidden"
          >
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
          </button>

          {/* Left menu */}
          <nav className="hidden flex-1 items-center gap-9 lg:flex">
            {LEFT.map((l) => (
              <a key={l.label} href={l.href} className="ul-link text-[0.8rem] tracking-[0.04em]">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Centered logo */}
          <a href="#top" aria-label="Marquis Manor — home" className="shrink-0">
            <Wordmark className="text-lg md:text-xl" />
          </a>

          {/* Right menu */}
          <nav className="hidden flex-1 items-center justify-end gap-9 lg:flex">
            {RIGHT.map((l) => (
              <a key={l.label} href={l.href} className="ul-link text-[0.8rem] tracking-[0.04em]">
                {l.label}
              </a>
            ))}
          </nav>

          {/* spacer to balance burger on mobile */}
          <span className="w-7 lg:hidden" />
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-[#f4f1ec] px-7 py-6"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => setOpen(false)}
                className="text-[0.8rem] uppercase tracking-[0.2em]"
              >
                Close
              </button>
              <Wordmark className="text-base text-[#2f3a48]" />
              <span className="w-10" />
            </div>

            <nav className="flex flex-col gap-2">
              {[...LEFT, ...RIGHT].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: EASE }}
                  className="font-serif text-[12vw] leading-[1.05] text-[#2f3a48]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.18em] text-[#2f3a48]/60">
              <span>©Marquis Manor</span>
              <span>London</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
