"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

// design14 "The Catalogue" (HeroParallax), ported into design23.
const P = (n: string) => `/glocal-portfolio/${n}`;
const PRODUCTS = [
  { title: "Ocean", thumbnail: P("portfolio-11-32dcb15a.webp") },
  { title: "Astronomica", thumbnail: P("portfolio-2-2204562c.webp") },
  { title: "Jungle Book", thumbnail: P("portfolio-9-f383f968.webp") },
  { title: "House of Cards", thumbnail: P("portfolio-6-f7fe65b8.webp") },
  { title: "Circus", thumbnail: P("portfolio-16-ab714967.webp") },
  { title: "Sustainable", thumbnail: P("portfolio-29-4a8acfd3.webp") },
  { title: "The Atelier", thumbnail: P("portfolio-50-790d0901.webp") },
  { title: "Mask", thumbnail: P("portfolio-37-001f5b16.webp") },
  { title: "Coastal Suite", thumbnail: P("portfolio-26-a24408ad.webp") },
  { title: "Hearth & Home", thumbnail: P("portfolio-14-19639cd9.webp") },
  { title: "The Nursery", thumbnail: P("portfolio-31-9fc69750.webp") },
  { title: "Spa Retreat", thumbnail: P("portfolio-24-63c173be.webp") },
  { title: "Lounge No. 12", thumbnail: P("portfolio-12-0547cb1f.webp") },
  { title: "Azure Suite", thumbnail: P("portfolio-38-02c5ab77.webp") },
  { title: "The Study", thumbnail: P("portfolio-45-13a00d43.webp") },
];

function Card({ title, thumbnail, translate }: { title: string; thumbnail: string; translate: MotionValue<number> }) {
  return (
    <motion.div style={{ x: translate }} whileHover={{ y: -20 }} className="cat-card">
      <img src={thumbnail} alt={title} loading="lazy" />
      <div className="cat-card-shade" />
      <h3 className="serif cat-card-title">{title}</h3>
    </motion.div>
  );
}

export default function CatalogueParallax() {
  const first = PRODUCTS.slice(0, 5), second = PRODUCTS.slice(5, 10), third = PRODUCTS.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spring = { stiffness: 300, damping: 30, bounce: 100 };
  const tx = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), spring);
  const txr = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), spring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), spring);
  const ty = useSpring(useTransform(scrollYProgress, [0, 0.2], [-500, 40]), spring);

  return (
    <div ref={ref} className="cat">
      <style dangerouslySetInnerHTML={{ __html: CAT_CSS }} />
      <div className="wrap cat-head">
        <span className="ey rv">The Marquis Living Catalogue</span>
        <h2 className="serif cat-title rv">Every room, <br /> one quiet language.</h2>
        <p className="cat-lead rv">
          Living rooms, suites, kitchens and the in-between corners you didn&apos;t know you&apos;d love most — each
          composed in the same unmistakable hand. Keep scrolling, and picture your own address among them.
        </p>
      </div>

      <motion.div style={{ rotateX, rotateZ, translateY: ty, opacity }} className="cat-stage">
        <div className="cat-row cat-rev">{first.map((p) => <Card key={p.title} {...p} translate={tx} />)}</div>
        <div className="cat-row">{second.map((p) => <Card key={p.title} {...p} translate={txr} />)}</div>
        <div className="cat-row cat-rev">{third.map((p) => <Card key={p.title} {...p} translate={tx} />)}</div>
      </motion.div>
    </div>
  );
}

const CAT_CSS = `
.d23 .cat { position:relative; height:265vh; padding:80px 0; overflow:hidden; background:var(--bg); perspective:1000px; transform-style:preserve-3d; }
.d23 .cat-head { padding-block:clamp(40px,8vh,80px); }
.d23 .cat-title { margin-top:24px; font-size:clamp(2.4rem,6vw,5.5rem); }
.d23 .cat-lead { margin-top:32px; max-width:42rem; font-size:clamp(1rem,1.4vw,1.25rem); color:var(--muted); }
.d23 .cat-row { display:flex; gap:clamp(32px,5vw,80px); margin-bottom:clamp(32px,4vw,64px); }
.d23 .cat-row.cat-rev { flex-direction:row-reverse; }
.d23 .cat-card { position:relative; flex-shrink:0; height:24rem; width:30rem; max-width:80vw; border-radius:12px; overflow:hidden; }
.d23 .cat-card img { width:100%; height:100%; object-fit:cover; }
.d23 .cat-card-shade { position:absolute; inset:0; background:rgba(0,0,0,.55); opacity:0; transition:opacity .3s; }
.d23 .cat-card:hover .cat-card-shade { opacity:.6; }
.d23 .cat-card-title { position:absolute; left:20px; bottom:20px; color:#fff; font-size:1.5rem; font-weight:300; opacity:0; transition:opacity .3s; }
.d23 .cat-card:hover .cat-card-title { opacity:1; }
`;
