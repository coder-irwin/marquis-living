"use client";

import { useRef } from "react";
import { IMG } from "./images";
import { AnimatedText, LineDivider } from "./anim";
import { ImageTrail } from "./ui/image-trail";

const COLLECTIONS = [
  {
    no: "01",
    title: "Ocean",
    desc: "Drawn from the mystery and serene beauty of the sea — fluid forms, organic textures and calming hues that echo the waves, marine life and coastal marvels of the world.",
  },
  {
    no: "02",
    title: "Astronomica",
    desc: "A tribute to the wonders of the universe. Cosmic patterns, starry accents and celestial hues bring depth, imagination and ethereal elegance inspired by the night sky and beyond.",
  },
  {
    no: "03",
    title: "Jungle Book",
    desc: "Inspired by the unblemished vibrancy of nature. Wild textures, vivid colours and patterns recall the forests and creatures of the wild, bringing adventure and storytelling into modern spaces.",
  },
  {
    no: "04",
    title: "Circus",
    desc: "Vivid colours, fanciful forms and dynamic textures evoke the joy, playfulness and drama of the big top — fun, creativity and theatricality for your space.",
  },
  {
    no: "05",
    title: "House of Cards",
    desc: "The balance and bold geometry of stacked cards. Strong line-work, layered shapes and dynamic patterns play stability against fragility through symmetry, gravity and tension.",
  },
  {
    no: "06",
    title: "Marquis Sustainable",
    desc: "Timeless design that respects the planet — responsibly sourced materials and sustainable methods offering elegance, durability and a greener, more responsible future.",
  },
];

const TRAIL_IMAGES = [
  IMG.hero,
  IMG.scene1,
  IMG.about1,
  IMG.bar,
  IMG.scene2,
  IMG.about2,
  IMG.console,
  IMG.chair,
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative overflow-hidden bg-surface py-28 md:py-40"
    >
      {/* cursor-following image trail across the whole section */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ImageTrail containerRef={sectionRef} rotationRange={20} interval={90}>
          {TRAIL_IMAGES.map((src, i) => (
            <div
              key={i}
              className="h-32 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl md:h-40 md:w-32"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </ImageTrail>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">(02) — The Collections</p>
            <AnimatedText el="h2" text="Art-inspired collections" className="display text-[clamp(2.2rem,5vw,4.5rem)]" />
          </div>
          <p className="max-w-sm text-muted">
            Each collection is a world of its own — sculpted into furniture you live with every day.
          </p>
        </div>

        {/* the collections list */}
        <div className="mt-16">
          <LineDivider />
          {COLLECTIONS.map((s) => (
            <div key={s.no} className="group relative">
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition-colors md:gap-10 md:py-10">
                <span className="font-serif text-sm text-accent">{s.no}</span>
                <div>
                  <h3 className="font-serif text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-muted">{s.desc}</p>
                </div>
                <span className="text-2xl text-cream/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-cream">
                  ↗
                </span>
              </div>
              <LineDivider />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
