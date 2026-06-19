"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Method", href: "#method" },
  { label: "Studio", href: "#footer" },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--ink-line)] bg-[rgba(247,242,233,0.82)] text-[var(--ink)] backdrop-blur-md"
          : "border-b border-transparent text-[var(--paper)]"
      }`}
    >
      <nav className="container flex h-[72px] items-center justify-between">
        <a href="#top" className="serif text-2xl tracking-tight">
          Marquis<span className="text-[var(--vermilion)]">·</span>Manor
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="d3-link text-sm">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#footer"
          className={`d3-btn !px-5 !py-2.5 text-sm ${
            scrolled ? "" : "!bg-[var(--paper)] !text-[var(--ink)]"
          }`}
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}
