"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// design14 "The Atelier" (Studio), ported into design23's scoped .d23 language.
const ABOUT_1 = "/glocal-portfolio/portfolio-26-a24408ad.webp"; // dining setting
const ABOUT_2 = "/glocal-portfolio/portfolio-44-32b2df33.webp"; // bedroom setting

export default function Atelier() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section className="atl" id="studio">
      <style dangerouslySetInnerHTML={{ __html: ATL_CSS }} />
      <div className="wrap">
        <div className="atl-top">
          <span className="ey rv">The Atelier</span>
          <p className="atl-kick rv">Noor · Sukoon · Quiet Grandeur</p>
        </div>

        <div className="atl-grid">
          <div className="atl-copy">
            <h2 className="serif rv">We don&apos;t decorate rooms. <em>We compose the way you&apos;ll live in them.</em></h2>
            <p className="atl-lead rv">
              It starts with a question most studios never ask: how do you actually want to feel when you walk through your
              own door? From that single answer we shape light, stone, scent and silence into a home that feels like it was
              always yours — gathered over a lifetime, never decorated in a weekend.
            </p>
            <a href="#collections" className="atl-btn rv magnetic">See what that looks like <span>→</span></a>
          </div>

          <div ref={ref} className="atl-imgs">
            <motion.figure style={{ y: y1 }} className="ir"><img src={ABOUT_1} alt="A Marquis Manor dining setting" loading="lazy" /></motion.figure>
            <motion.figure style={{ y: y2 }} className="ir atl-img2"><img src={ABOUT_2} alt="A Marquis Manor bedroom setting" loading="lazy" /></motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}

const ATL_CSS = `
.d23 .atl { background:var(--paper); padding:clamp(90px,15vh,200px) 0; }
.d23 .atl-top { display:flex; flex-wrap:wrap; gap:16px; align-items:flex-end; justify-content:space-between; }
.d23 .atl-kick { max-width:18rem; font-size:.86rem; color:var(--muted); }
.d23 .atl-grid { margin-top:48px; display:grid; gap:56px; align-items:start; grid-template-columns:1.1fr .9fr; }
.d23 .atl-copy h2 { font-size:clamp(1.9rem,3.6vw,3.4rem); }
.d23 .atl-lead { margin-top:34px; max-width:36rem; font-size:1.12rem; line-height:1.75; color:var(--ink-2); }
.d23 .atl-btn { display:inline-flex; align-items:center; gap:12px; margin-top:40px; padding:15px 26px; border:1px solid var(--line); border-radius:999px; font-size:.9rem; transition:background .4s,color .4s,border-color .4s; }
.d23 .atl-btn span { transition:transform .35s; } .d23 .atl-btn:hover { background:var(--ink); color:var(--paper); border-color:var(--ink); } .d23 .atl-btn:hover span { transform:translateX(5px); }
.d23 .atl-imgs { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.d23 .atl-imgs figure { aspect-ratio:3/4; overflow:hidden; border-radius:3px; }
.d23 .atl-img2 { margin-top:48px; }
@media (max-width:860px){ .d23 .atl-grid{ grid-template-columns:1fr; gap:40px; } }
`;
