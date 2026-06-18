const NAMES = ["Architectural Digest", "Elle Decor", "Dezeen", "Vogue Living", "Wallpaper*", "Design Milk", "Frame"];

export default function PressBar() {
  const row = [...NAMES, ...NAMES];
  return (
    <section className="overflow-hidden border-y border-line py-8">
      <p className="mb-5 text-center text-xs uppercase tracking-[0.35em] text-muted">As featured in</p>
      <div className="marquee-track">
        {row.map((n, i) => (
          <span key={i} className="flex items-center">
            <span className="text-lg uppercase tracking-[0.18em] text-cream/60 md:text-xl">{n}</span>
            <span className="mx-8 text-accent md:mx-12">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
