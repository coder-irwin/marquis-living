export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-6 py-16">
      <a href="#top" className="serif text-3xl tracking-tight">
        Marquis<span className="text-[var(--accent)]">·</span>Manor
      </a>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-7 text-sm text-[var(--soft)]">
        <a href="#ethos" className="d5-link">Ethos</a>
        <a href="#work" className="d5-link">Work</a>
        <a href="#contact" className="d5-link">Enquire</a>
        <a href="mailto:hello@marquismanor.com" className="d5-link">Email</a>
      </nav>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--soft)]">
        <span>© {new Date().getFullYear()} Marquis Manor — interior architecture, made in-house.</span>
        <span>Design 5 — /akaash/design5</span>
      </div>
    </footer>
  );
}
