"use client";

import { useRef } from "react";

// design23 port of the "offer-carousel": horizontal snap-scroll of cards
// (image top + content bottom, tag, title, copy, footer brand + arrow),
// repurposed as Marquis Manor signature collections. Scoped CSS; inline SVG
// icons (no lucide); smooth scrollBy via header arrow controls.

const COLLECTIONS = [
  { id: 1, img: "/design23/gallery/bath.png", tag: "Collection", title: "Ocean", desc: "Cool stone, soft light and the hush of water — a home that lowers your shoulders the moment you step inside.", meta: "Bespoke collection" },
  { id: 2, img: "/design23/gallery/living.png", tag: "Collection", title: "Astronomica", desc: "Deep, cinematic tones built around one quiet act of drama — for the home that comes alive after dark.", meta: "Bespoke collection" },
  { id: 3, img: "/design23/gallery/bedroom.png", tag: "Collection", title: "Jungle Book", desc: "Hand-painted murals and living texture. Nature drawn indoors, then made unmistakably luxurious.", meta: "Bespoke collection" },
  { id: 4, img: "/design23/gallery/study.png", tag: "Signature", title: "The Atelier", desc: "Solid timber, leather and backlit shelving — a private room that makes deep work feel like a pleasure.", meta: "Signature room" },
  { id: 5, img: "/design23/gallery/dining.png", tag: "Collection", title: "Hearth & Home", desc: "The long table, the warm stone, the room everyone drifts toward. Built for the life you love to host.", meta: "Bespoke collection" },
  { id: 6, img: "/design23/products/p3.jpeg", tag: "Signature", title: "The Kitchen", desc: "Fluted joinery and honest materials around the truest heart of the home.", meta: "Signature room" },
];

export default function Collections() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = track.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="ofc" id="collections">
      <div className="wrap ofc-head">
        <div>
          <span className="ey rv">Signature collections</span>
          <h2 className="serif rv">Worlds we&apos;ve built — <em>and would build for you.</em></h2>
        </div>
        <div className="ofc-nav">
          <button onClick={() => scroll("left")} aria-label="Scroll left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => scroll("right")} aria-label="Scroll right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div className="ofc-track" ref={track}>
        {COLLECTIONS.map((c) => (
          <a key={c.id} href="#transformations" className="ofc-card">
            <div className="ofc-img"><img src={c.img} alt={c.title} loading="lazy" /></div>
            <div className="ofc-body">
              <div>
                <span className="ofc-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="7" r="1.2" fill="currentColor" /></svg>
                  {c.tag}
                </span>
                <h3 className="serif">{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="ofc-foot">
                <div className="ofc-brand">
                  <span className="ofc-mono">✦</span>
                  <div><b>Marquis Manor</b><span>{c.meta}</span></div>
                </div>
                <span className="ofc-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
