"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 11, suffix: "", label: "Art collections" },
  { value: 250, suffix: "+", label: "Signature pieces" },
  { value: 100, suffix: "%", label: "Hand-crafted" },
  { value: 40, suffix: "+", label: "Master artisans" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-serif text-[clamp(3rem,7vw,6rem)] leading-none">
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="container py-24 md:py-32">
      <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <Counter to={s.value} suffix={s.suffix} />
            <p className="mt-4 text-sm uppercase tracking-[0.15em] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
