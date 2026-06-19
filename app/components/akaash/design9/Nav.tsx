"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#why" },
  { label: "Services", href: "#why" },
  { label: "Contact", href: "#contact" },
];

/**
 * Header — transparent over the video masthead, frosts on scroll. Nav links use
 * the slide-swap hover (the reference's `data-replace` / translate3d trick),
 * and the CTA is the glowing gradient button.
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
        scrolled
          ? "border-b border-[var(--line)] bg-[rgba(246,244,239,0.82)] text-[var(--ink)] backdrop-blur-md"
          : "border-b border-transparent text-white"
      }`}
    >
      <nav className="container flex h-[72px] items-center justify-between">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          Marquis Manor
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="d9-link text-sm font-medium" data-replace={l.label}>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="d9-btn !px-5 !py-2.5 text-sm">
          Start a project
        </a>
      </nav>
    </header>
  );
}
