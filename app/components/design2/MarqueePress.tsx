const NAMES = ["Architectural Digest", "Elle Decor", "Dezeen", "Wallpaper*", "Vogue Living", "Design Milk", "Frame"];

export default function MarqueePress() {
  const row = [...NAMES, ...NAMES];
  return (
    <section className="overflow-hidden border-y border-line bg-bg py-9">
      <div className="mb-5 text-center text-xs uppercase tracking-[0.35em] text-muted">As featured in</div>
      <div className="marquee-track">
        {row.map((n, i) => (
          <span key={i} className="flex items-center">
            <span className="text-lg uppercase tracking-[0.18em] text-cream/70 md:text-2xl">{n}</span>
            <span className="mx-8 text-accent md:mx-12">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
