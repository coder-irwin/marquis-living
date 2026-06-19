export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)]">
      <div className="container py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(3rem,12vw,9rem)] leading-none">
            Marquis<span className="text-[var(--marigold)]">·</span>Manor
          </h2>
          <div className="flex gap-12 text-sm text-[var(--paper-dim)]">
            <ul className="space-y-2">
              <li className="text-[var(--paper)]">Explore</li>
              <li><a href="#journey" className="d2-link">Journey</a></li>
              <li><a href="#chapters" className="d2-link">Rooms</a></li>
              <li><a href="#gallery" className="d2-link">Interiors</a></li>
            </ul>
            <ul className="space-y-2">
              <li className="text-[var(--paper)]">Connect</li>
              <li><a href="mailto:hello@marquismanor.com" className="d2-link">Email</a></li>
              <li><a href="#" className="d2-link">Instagram</a></li>
              <li><a href="#" className="d2-link">Pinterest</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--paper-dim)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Marquis Manor — where your home becomes a story.</span>
          <span>Design 2 — /akaash/design2</span>
        </div>
      </div>
    </footer>
  );
}
