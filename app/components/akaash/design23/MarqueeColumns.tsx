"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// design14 parallax columns + mix-blend "Now picture yours", ported into design23.
const IMGS = [
  "portfolio-50-790d0901.webp", "portfolio-38-02c5ab77.webp", "portfolio-9-f383f968.webp", "portfolio-16-ab714967.webp",
  "portfolio-11-32dcb15a.webp", "portfolio-24-63c173be.webp", "portfolio-37-001f5b16.webp", "portfolio-12-0547cb1f.webp",
  "portfolio-43-56fef46a.webp", "portfolio-30-2e527f6c.webp", "portfolio-17-4a7a6209.webp", "portfolio-20-9d96aef7.webp",
  "portfolio-26-a24408ad.webp", "portfolio-46-3fc373be.webp",
].map((n) => `/glocal-portfolio/${n}`);
const COLS = [IMGS.slice(0, 4), IMGS.slice(4, 8), IMGS.slice(8, 11), IMGS.slice(11, 14)];

function Col({ imgs, y }: { imgs: string[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="mc-col">
      {imgs.map((src, i) => (
        <div key={i} className="mc-tile"><img src={src} alt="" loading="lazy" /></div>
      ))}
    </motion.div>
  );
}

export default function MarqueeColumns() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-22%", "6%"]);
  const up2 = useTransform(scrollYProgress, [0, 1], ["2%", "-30%"]);
  const down2 = useTransform(scrollYProgress, [0, 1], ["-30%", "2%"]);

  return (
    <section ref={ref} className="mc">
      <style dangerouslySetInnerHTML={{ __html: MC_CSS }} />
      <div className="mc-grid">
        <Col imgs={COLS[0]} y={up} />
        <Col imgs={COLS[1]} y={down} />
        <Col imgs={COLS[2]} y={up2} />
        <Col imgs={COLS[3]} y={down2} />
      </div>
      <div className="mc-center"><h2 className="serif">Now picture yours</h2></div>
    </section>
  );
}

const MC_CSS = `
.d23 .mc { position:relative; height:130vh; overflow:hidden; background:var(--bone-2); }
.d23 .mc-grid { display:grid; height:100%; grid-template-columns:repeat(2,1fr); gap:16px; padding:16px; }
.d23 .mc-col { display:flex; flex-direction:column; gap:16px; }
.d23 .mc-tile { aspect-ratio:3/4; overflow:hidden; border-radius:16px; }
.d23 .mc-tile img { width:100%; height:100%; object-fit:cover; }
.d23 .mc-center { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; mix-blend-mode:difference; }
.d23 .mc-center h2 { font-size:clamp(2.6rem,9vw,8rem); text-align:center; color:#fff; font-weight:300; }
@media (min-width:768px){ .d23 .mc-grid{ grid-template-columns:repeat(4,1fr); } }
@media (max-width:767px){ .d23 .mc-grid > :nth-child(n+3){ display:none; } }
`;
