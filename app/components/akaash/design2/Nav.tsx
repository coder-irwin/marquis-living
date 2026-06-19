"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Journey", href: "#journey" },
  { label: "Rooms", href: "#chapters" },
  { label: "Interiors", href: "#gallery" },
  { label: "Studio", href: "#contact" },
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
          ? "border-b border-[var(--line)] bg-[rgba(250,246,239,0.82)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container flex h-[72px] items-center justify-between">
        <a href="#top" className="serif text-2xl tracking-tight text-[var(--paper)]">
          Marquis<span className="text-[var(--marigold)]">·</span>Manor
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="d2-link text-sm text-[var(--paper-dim)] transition-colors hover:text-[var(--paper)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="d2-btn !px-5 !py-2.5 text-sm">
          Start your story
        </a>
      </nav>
    </header>
  );
}
