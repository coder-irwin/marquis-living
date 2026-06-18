"use client";

import { ZoomParallax } from "./ui/zoom-parallax";
import { PF } from "./images";
import { AnimatedText } from "./anim";

// 7 unique portfolio interiors — no repeats with the parallax.
const images = [
  { src: PF.livingKitchen, alt: "Open-plan living & kitchen" },
  { src: PF.bedWhite, alt: "Serene bedroom suite" },
  { src: PF.diningBubble, alt: "Sculptural dining room" },
  { src: PF.bedBotanical, alt: "Botanical bedroom" },
  { src: PF.kitchen2, alt: "Chef's kitchen" },
  { src: PF.office1, alt: "Executive study" },
  { src: PF.balconyLounge, alt: "Skyline balcony lounge" },
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
