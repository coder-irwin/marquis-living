"use client";

import { useEffect, useState } from "react";

/**
 * Minimal centered nav — the wordmark sits dead-centre with a hairline of
 * links beneath it, condensing into a slim bar once you scroll.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[rgba(255,255,255,0.8)] py-3 backdrop-blur-md" : "py-6"
      }`}
    >
      <div className="container flex flex-col items-center gap-2">
        <a href="#top" className="serif text-2xl tracking-tight">
          Marquis<span className="text-[var(--accent)]">·</span>Manor
        </a>
        <nav
          className={`flex items-center gap-7 text-[0.78rem] tracking-[0.18em] text-[var(--soft)] transition-all duration-500 ${
            scrolled ? "pointer-events-none h-0 -translate-y-1 opacity-0" : "opacity-100"
          }`}
        >
          <a href="#ethos" className="d5-link uppercase">Ethos</a>
          <a href="#work" className="d5-link uppercase">Work</a>
          <a href="#contact" className="d5-link uppercase">Enquire</a>
        </nav>
      </div>
    </header>
  );
}
