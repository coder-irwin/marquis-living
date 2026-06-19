import { MARQUEE_WORDS } from "./data";

export default function Marquee() {
  const row = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <section className="relative overflow-hidden border-y border-[var(--line)] py-8">
      <div className="marquee-track">
        {[...row, ...row].map((t, i) => (
          <span
            key={i}
            className="display flex items-center text-[clamp(1.6rem,4vw,3.2rem)] text-[var(--paper)]"
          >
            <span className="px-7">{t}</span>
            <span className="text-[var(--marigold)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
