"use client";

import { Reveal, AnimatedText, LineDivider } from "../anim";

const STEPS = [
  { no: "01", title: "Inspiration", desc: "Every piece begins with a theme — the ocean, the cosmos, the wild — translated into sketches and silhouettes." },
  { no: "02", title: "Design", desc: "Proportion, line and form are refined until the object reads as sculpture first and furniture second." },
  { no: "03", title: "Craft", desc: "Master artisans hand-build each piece from responsibly sourced materials, detailing every joint by hand." },
  { no: "04", title: "Curation", desc: "Finished, inspected and styled — ready to become the soul of your space, delivered with white-glove care." },
];

export default function Process() {
  return (
    <section className="bg-surface py-28 md:py-40">
      <div className="container grid gap-16 md:grid-cols-[0.8fr_1.2fr]">
        <div className="md:sticky md:top-32 md:h-fit">
          <p className="eyebrow mb-6">The Craft</p>
          <AnimatedText el="h2" text="From a story to a sculpture." className="display text-[clamp(2rem,4.5vw,4rem)]" />
          <Reveal delay={0.1} className="mt-8 max-w-sm text-muted">
            Four stages take each Marquis Manor piece from a single idea to a hand-finished work of functional art.
          </Reveal>
        </div>
        <div>
          <LineDivider />
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.05}>
              <div className="flex gap-6 py-10 md:gap-12" data-cursor>
                <span className="font-serif text-lg text-accent">{s.no}</span>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-cream/70">{s.desc}</p>
                </div>
              </div>
              <LineDivider />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
