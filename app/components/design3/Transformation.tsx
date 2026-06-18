"use client";

import { Reveal, AnimatedText } from "../anim";
import BeforeAfter from "./BeforeAfter";
import { IMG } from "../images";

export default function Transformation() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">The difference</p>
            <AnimatedText el="h2" text="Drag to see the transformation" className="display text-[clamp(2rem,4.5vw,3.6rem)]" />
          </div>
          <p className="max-w-sm text-muted">
            Same room, reimagined with Marquis Manor pieces. Drag the handle — before on the left, after on the right.
          </p>
        </div>

        <Reveal>
          <BeforeAfter before={IMG.scene2} after={IMG.hero} />
        </Reveal>
      </div>
    </section>
  );
}
