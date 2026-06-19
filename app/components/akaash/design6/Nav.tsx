"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#why" },
  { label: "Contact", href: "#contact" },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-[var(--line)] bg-[rgba(245,243,237,0.82)] backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="container flex h-[68px] items-center justify-between">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          Marquis Manor<span className="text-[var(--teal)]">.</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="d6-link text-sm text-[var(--soft)]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="d6-btn !px-5 !py-2.5 text-sm">
          Start a project
        </a>
      </nav>
    </header>
  );
}
