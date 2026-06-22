"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Native design23 port of the "circular-testimonials" component: a 3D image
// carousel (active centre, left/right tilted) + word-blur quote reveal +
// autoplay + arrows. framer-motion only; arrows are inline SVG (no react-icons).

const TESTIMONIALS = [
  { quote: "We'd lived here two years and it never felt like ours. Marquis Living gave us a home we now can't bear to leave.", name: "Elena Rossi", designation: "Homeowner · Palm Jumeirah", src: "/design23/people/p1.jpg" },
  { quote: "The first concept arrived in 48 hours and it was already right. They carried the entire build — we simply watched our home appear.", name: "David Okonkwo", designation: "Homeowner · Emirates Hills", src: "/design23/people/p2.jpg" },
  { quote: "Every material, every fall of light — considered. The first time I walked in, I cried. No room had ever done that to me.", name: "Priya Nair", designation: "Homeowner · Downtown Dubai", src: "/design23/people/p3.jpg" },
  { quote: "I've handed projects to a dozen studios. None deliver this level of taste — with this little drama getting there.", name: "Marcus Hale", designation: "Property Developer · DIFC", src: "/design23/people/p4.jpg" },
  { quote: "From a bare shell to a finished home, they never lost the thread. Guests assume we styled it for photos. We didn't — it just lives like that.", name: "Sofia Bianchi", designation: "Homeowner · Jumeirah Bay", src: "/design23/people/p5.jpg" },
];

function calcGap(width: number) {
  const minW = 1024, maxW = 1456, minG = 50, maxG = 80;
  if (width <= minW) return minG;
  if (width >= maxW) return maxG;
  return minG + (maxG - minG) * ((width - minW) / (maxW - minW));
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [w, setW] = useState(1100);
  const imgRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const len = TESTIMONIALS.length;
  const current = useMemo(() => TESTIMONIALS[active], [active]);

  useEffect(() => {
    const onR = () => { if (imgRef.current) setW(imgRef.current.offsetWidth); };
    onR(); window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    // respect reduced-motion: no autoplay, arrows still work
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setActive((p) => (p + 1) % len), 5000);
  }, [len]);

  useEffect(() => {
    start();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [start]);

  const next = () => { setActive((p) => (p + 1) % len); start(); };
  const prev = () => { setActive((p) => (p - 1 + len) % len); start(); };

  const imageStyle = (index: number): React.CSSProperties => {
    const gap = calcGap(w);
    const up = gap * 0.8;
    const isActive = index === active;
    const isLeft = (active - 1 + len) % len === index;
    const isRight = (active + 1) % len === index;
    if (isActive) return { zIndex: 3, opacity: 1, transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition: "all .8s cubic-bezier(.4,2,.3,1)" };
    if (isLeft) return { zIndex: 2, opacity: 1, transform: `translateX(-${gap}px) translateY(-${up}px) scale(.85) rotateY(15deg)`, transition: "all .8s cubic-bezier(.4,2,.3,1)" };
    if (isRight) return { zIndex: 2, opacity: 1, transform: `translateX(${gap}px) translateY(-${up}px) scale(.85) rotateY(-15deg)`, transition: "all .8s cubic-bezier(.4,2,.3,1)" };
    return { zIndex: 1, opacity: 0, transition: "all .8s cubic-bezier(.4,2,.3,1)" };
  };

  return (
    <section className="tst" id="voices">
      <div className="wrap">
        <div className="tst-head">
          <span className="ey rv">In their words</span>
          <h2 className="serif rv">The homes we build, <em>and the lives inside them.</em></h2>
        </div>

        <div className="tst-grid">
          <div className="tst-images" ref={imgRef}>
            {TESTIMONIALS.map((t, i) => (
              <img key={t.src} src={t.src} alt={t.name} className="tst-img" draggable={false} style={imageStyle(i)} />
            ))}
          </div>

          <div className="tst-content">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                <p className="tst-quote">
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span key={i} initial={{ filter: "blur(10px)", opacity: 0, y: 5 }} animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: "easeInOut", delay: 0.022 * i }} style={{ display: "inline-block" }}>
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </p>
                <h3 className="tst-name serif">{current.name}</h3>
                <p className="tst-desig">{current.designation}</p>
              </motion.div>
            </AnimatePresence>

            <div className="tst-arrows">
              <button onClick={prev} aria-label="Previous testimonial">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={next} aria-label="Next testimonial">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
