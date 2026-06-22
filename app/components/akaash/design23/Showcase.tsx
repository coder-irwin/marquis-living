"use client";

import { useState } from "react";

// Native design23 take on the shadcn "feature-showcase": a tabbed image panel
// (pill tabs switch the room) beside an accordion of steps + CTAs. Scoped CSS,
// bronze/bone editorial theme — no shadcn/Tailwind utilities.

const TABS = [
  { value: "living", label: "Living", src: "/design23/gallery/living.png" },
  { value: "kitchen", label: "Kitchen", src: "/design23/products/p3.jpeg" },
  { value: "bedroom", label: "Bedroom", src: "/design23/gallery/bedroom.png" },
  { value: "bath", label: "Spa Bath", src: "/design23/gallery/bath.png" },
];

const STEPS = [
  { id: "s1", title: "Share your space", text: "Send a photo, a floor plan, or just the address. We read it like a brief — proportions, light, and exactly how you want to live." },
  { id: "s2", title: "See it transformed", text: "Within 48 hours, a first concept rendered into your actual rooms. Not a stock template — your home, exactly as it could be." },
  { id: "s3", title: "Move into the finished home", text: "We craft the bespoke pieces, source the rest, install and style. You simply walk in — to a home that already feels like yours." },
];

const CHIPS = ["48-hour first concept", "Whole-home, handled", "Trusted across Dubai"];

export default function Showcase() {
  const [active, setActive] = useState(TABS[0].value);
  const [open, setOpen] = useState(0);

  return (
    <section className="fs" id="begin">
      <div className="wrap fs-grid">
        {/* left */}
        <div className="fs-left">
          <span className="fs-badge">Begin</span>
          <h2 className="serif fs-title rv">Ready to walk through <em>your own home?</em></h2>
          <p className="fs-desc rv">Start with a single room or the whole house. Preview the spaces we design, then send your brief — your first concept lands within 48 hours, with no obligation.</p>

          <div className="fs-chips">
            {CHIPS.map((c) => <span className="fs-chip" key={c}>{c}</span>)}
          </div>

          <div className="fs-acc">
            {STEPS.map((s, i) => (
              <div className={`fs-item${open === i ? " open" : ""}`} key={s.id}>
                <button className="fs-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{s.title}</span>
                  <span className="fs-ic" aria-hidden>{open === i ? "−" : "+"}</span>
                </button>
                <div className="fs-a"><p>{s.text}</p></div>
              </div>
            ))}
          </div>

          <div className="fs-ctas">
            <a href="#contact" className="fs-btn fill magnetic">Start my design brief <span>→</span></a>
            <a href="#gallery" className="fs-btn ghost magnetic">Browse the gallery</a>
          </div>
        </div>

        {/* right — tabbed image panel */}
        <div className="fs-right">
          <div className="fs-panel">
            {TABS.map((t, i) => (
              <img key={t.value} src={t.src} alt={t.label} loading={i === 0 ? "eager" : "lazy"} className={`fs-media${active === t.value ? " on" : ""}`} />
            ))}
            <div className="fs-tabs">
              {TABS.map((t) => (
                <button key={t.value} className={active === t.value ? "on" : ""} onClick={() => setActive(t.value)}>{t.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
