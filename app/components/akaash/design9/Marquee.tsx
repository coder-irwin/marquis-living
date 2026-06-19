import { MARQUEE } from "./data";

/**
 * Infinite marquee ticker (A7) — the reference's `Carousel scroll` keyframe:
 * one track is rendered twice and translated -50%, so the loop is seamless.
 * Pauses on hover.
 */
export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section className="border-y border-[var(--line)] bg-[var(--bg)] py-7">
      <div className="d9-marquee-track overflow-hidden">
        <div className="d9-marquee" style={{ ["--d9-marquee-time" as string]: "30s" }}>
          {/* rendered twice for the seamless -50% loop */}
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {items.map((label, i) => (
                <li key={`${dup}-${i}`} className="flex items-center whitespace-nowrap">
                  <span className="px-8 text-[clamp(1.4rem,3vw,2.4rem)] font-medium tracking-tight text-[var(--ink)]">
                    {label}
                  </span>
                  <span className="text-[var(--c2)]">&#9679;</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
