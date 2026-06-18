"use client";

import { ZoomParallax } from "./ui/zoom-parallax";
import { IMG } from "./images";
import { AnimatedText } from "./anim";

const images = [
  { src: IMG.hero, alt: "Marquis Manor styled living room" },
  { src: IMG.console, alt: "Wing Console" },
  { src: IMG.chair, alt: "Cliffside Pavilion" },
  { src: IMG.centerTable, alt: "Buckle Center Table" },
  { src: IMG.sideTable, alt: "Sunlit Dining" },
  { src: IMG.bed, alt: "Marquis Bed" },
  { src: IMG.pendant, alt: "Coastal Living" },
];

export default function Work() {
  return (
    <section id="work">
      <div className="container flex flex-col items-center pb-4 pt-24 text-center md:pt-32">
        <p className="eyebrow mb-6">(03) — Signature Pieces</p>
        <AnimatedText el="h2" text="Functional art" className="display text-[clamp(2.4rem,6vw,5.5rem)]" />
        <p className="mt-6 max-w-xl text-muted">
          Keep scrolling — the collection opens out around you, one hand-crafted piece at a time.
        </p>
      </div>

      <ZoomParallax images={images} />
    </section>
  );
}
