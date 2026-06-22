"use client";

import { useEffect, useRef, useState } from "react";

const fp = (n: number) => `/design23/products/p${n}.jpeg`;   // after (finished)
const bp = (n: number) => `/design23/products/b${n}.jpeg`;   // before (old/empty) — drop these in
// placeholder shown until per-room before images exist: a real bare/unfinished build
const PLACEHOLDER = "/glocal/4-af932dda.png";

const PRODUCTS = [
  { img: 1, name: "The Living Room", desc: "Where the noise of the city falls away — a marble hearth, sculpted stone and light that softens as the day turns." },
  { img: 3, name: "The Kitchen", desc: "Fluted island, warm walnut, backlit stone. Built for slow mornings and the people who gather without being asked." },
  { img: 6, name: "The Dining Room", desc: "A table for ten beneath a constellation of light. The room your best evenings haven't happened in yet." },
  { img: 4, name: "The Master Suite", desc: "A hand-painted mural, brushed linen and low, forgiving light. The first room you wake in, the last you'll want to leave." },
  { img: 2, name: "The Study", desc: "Backlit shelving, solid timber, one perfect chair. A door that finally closes on the world." },
  { img: 5, name: "The Spa Bath", desc: "Green stone, a halo-lit mirror and water you'll linger under. The quietest five minutes of your day." },
];

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(58);
  const [drag, setDrag] = useState(false);
  // rooms that have a real "before" image on disk; until then, use the placeholder.
  // Detect client-side with new Image() so listeners attach before load (an SSR'd
  // <img> would fire its 404 error before React hydrates, and onError would be missed).
  const [haveBefore, setHaveBefore] = useState<number[]>([]);
  useEffect(() => {
    PRODUCTS.forEach((pr) => {
      const im = new Image();
      im.onload = () => setHaveBefore((a) => (a.includes(pr.img) ? a : [...a, pr.img]));
      im.src = bp(pr.img);
    });
  }, []);

  const move = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };

  const p = PRODUCTS[active];
  const beforeSrc = haveBefore.includes(p.img) ? bp(p.img) : PLACEHOLDER;

  return (
    <section className="ps" id="transformations">
      <div className="wrap">
        <div className="ps-head">
          <h2 className="serif rv">The same four walls. <em>A different life entirely.</em></h2>
          <p className="rv">Every home starts as a bare Dubai shell. Drag across any room to watch ours become a place you&apos;d never want to leave — same footprint, completely transformed.</p>
        </div>

        <div className="ps-grid">
          <div
            className="ba"
            ref={ref}
            onMouseMove={(e) => move(e.clientX)}
            onMouseDown={() => setDrag(true)}
            onMouseUp={() => setDrag(false)}
            onMouseLeave={() => setDrag(false)}
            onTouchMove={(e) => move(e.touches[0].clientX)}
          >
            <img className="after" src={fp(p.img)} alt={`${p.name} — finished`} draggable={false} />
            <span className="tag a">After</span>
            <img
              className="before"
              src={beforeSrc}
              alt={`${p.name} — before`}
              draggable={false}
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            />
            <span className="tag b" style={{ opacity: pos > 12 ? 1 : 0 }}>Before</span>
            <div className="line" style={{ left: `${pos}%` }} />
            <div className="knob" style={{ left: `${pos}%`, transform: `translate(-50%,-50%) scale(${drag ? 1.08 : 1})` }}>⇆</div>
          </div>

          <div className="ps-meta">
            <div className="ps-num">{String(active + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}</div>
            <h3 className="ps-name serif">{p.name}</h3>
            <p className="ps-desc">{p.desc}</p>
            <ul className="ps-list">
              {PRODUCTS.map((pr, i) => (
                <li key={pr.img} className={i === active ? "on" : ""}>
                  <button onClick={() => { setActive(i); setPos(58); }}>
                    <span className="thumb"><img src={fp(pr.img)} alt="" draggable={false} /></span>
                    <span className="pn">{pr.name}</span>
                    <span className="pi">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                </li>
              ))}
            </ul>
            <span className="ps-hint">⇆ Drag to see the transformation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
