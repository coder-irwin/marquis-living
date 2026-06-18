"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 45, suffix: "%", label: "Up to, off at 350+ furniture partners" },
  { value: 2400, suffix: "+", label: "Homes designed and loved" },
  { value: 3, suffix: "", label: "Concepts to choose from" },
  { value: 98, suffix: "%", label: "Would recommend Marquis Manor" },
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
    <span ref={ref} className="font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-none">
      {val}
      {suffix}
    </span>
  );
}

export default function Perks() {
  return (
    <section className="border-y border-line bg-cream text-bg">
      <div className="container grid grid-cols-2 gap-x-8 gap-y-12 py-20 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} data-cursor>
            <Counter to={s.value} suffix={s.suffix} />
            <p className="mt-4 max-w-[22ch] text-sm text-bg/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
