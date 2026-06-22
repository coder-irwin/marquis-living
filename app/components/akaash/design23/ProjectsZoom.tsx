"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// design14 ProjectsZoom — zoom-in that resolves into a pinned stack of projects.
// Ported into design23; lenis auto-nudge omitted to avoid scroll hijacking.
const PROJECTS = [
  { no: "01", name: "Al Aziz", sub: "Private Residence", parent: "/glocal/living-furnished.jpg", primary: "/glocal-portfolio/portfolio-16-ab714967.webp", secondary: "/glocal-portfolio/portfolio-24-63c173be.webp" },
  { no: "02", name: "Al Noor", sub: "Sky Villa", parent: "/glocal-portfolio/portfolio-50-790d0901.webp", primary: "/glocal-portfolio/portfolio-9-f383f968.webp", secondary: "/glocal-portfolio/portfolio-29-4a8acfd3.webp" },
  { no: "03", name: "Al Reem", sub: "Penthouse", parent: "/glocal/2-9eb1d05f.jpg", primary: "/glocal-portfolio/portfolio-38-02c5ab77.webp", secondary: "/glocal-portfolio/portfolio-6-f7fe65b8.webp" },
  { no: "04", name: "Al Manara", sub: "Garden Villa", parent: "/glocal-portfolio/portfolio-11-32dcb15a.webp", primary: "/glocal-portfolio/portfolio-44-32b2df33.webp", secondary: "/glocal-portfolio/portfolio-46-3fc373be.webp" },
  { no: "05", name: "Bayt Al Bahr", sub: "Beach House", parent: "/glocal-portfolio/portfolio-14-19639cd9.webp", primary: "/glocal-portfolio/portfolio-17-4a7a6209.webp", secondary: "/glocal-portfolio/portfolio-23-11724ad1.webp" },
];

const P = (n: string) => `/glocal-portfolio/${n}`;
const DECOR = [
  { src: P("portfolio-15-a3421fe6.webp"), scale: 5, cls: "d1" },
  { src: P("portfolio-7-02896555.webp"), scale: 6, cls: "d2" },
  { src: P("portfolio-30-2e527f6c.webp"), scale: 5, cls: "d3" },
  { src: P("portfolio-44-32b2df33.webp"), scale: 6, cls: "d4" },
  { src: P("portfolio-46-3fc373be.webp"), scale: 8, cls: "d5" },
  { src: P("portfolio-6-f7fe65b8.webp"), scale: 9, cls: "d6" },
];

const ZOOM = 0.42;
const r = (t: number) => ZOOM + t * (1 - ZOOM);

export default function ProjectsZoom() {
  return (
    <div id="projects" className="pz">
      <style dangerouslySetInnerHTML={{ __html: PZ_CSS }} />
      <div className="pz-intro">
        <div className="wrap pz-intro-in">
          <span className="ey rv">Selected Works</span>
          <h2 className="serif pz-intro-h2 rv">Homes we&apos;ve made unforgettable</h2>
          <p className="pz-intro-p rv">Keep scrolling — walk through the residences our clients now call home, one room at a time.</p>
        </div>
      </div>

      <FirstProjectZoom project={PROJECTS[0]} />
      {PROJECTS.slice(1).map((p) => <ProjectSection key={p.no} project={p} />)}
    </div>
  );
}

function Name({ project, opacity }: { project: (typeof PROJECTS)[number]; opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="pz-name">
      <div className="pz-name-top"><span className="serif">{project.no}</span><span className="pz-name-rule" /></div>
      <h3 className="serif pz-name-h">{project.name}</h3>
      <p className="pz-name-sub">{project.sub}</p>
    </motion.div>
  );
}

function Slide({ src, y, z }: { src: string; y: MotionValue<string>; z: number }) {
  return (
    <motion.div style={{ y, zIndex: z }} className="pz-slide">
      <div className="pz-slide-frame"><img src={src} alt="" /></div>
    </motion.div>
  );
}

function FirstProjectZoom({ project }: { project: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const parentScale = useTransform(p, [0, ZOOM, 1], [0.25, 1, 1.07]);
  const darken = useTransform(p, [ZOOM - 0.05, ZOOM, r(0.3)], [0, 0.08, 0.5]);
  const gradOpacity = useTransform(p, [ZOOM - 0.05, ZOOM], [0, 1]);
  const nameOpacity = useTransform(p, [r(0.02), r(0.1), r(0.9), r(0.99)], [0, 1, 1, 0]);
  const primaryY = useTransform(p, [r(0.15), r(0.43), r(0.5), r(0.62)], ["115%", "0%", "0%", "-120%"]);
  const secondaryY = useTransform(p, [r(0.52), r(0.72)], ["115%", "0%"]);
  const decorFade = useTransform(p, [0, ZOOM * 0.78, ZOOM], [1, 1, 0]);

  return (
    <section ref={ref} className="pz-first">
      <div className="pz-sticky">
        <motion.img style={{ scale: parentScale }} src={project.parent} alt="" className="pz-parent" />
        <motion.div className="pz-grad" style={{ opacity: gradOpacity }} />
        <motion.div className="pz-darken" style={{ opacity: darken }} />
        {DECOR.map((d, i) => <Decor key={i} src={d.src} scale={d.scale} cls={d.cls} fade={decorFade} prog={p} />)}
        <Slide src={project.primary} y={primaryY} z={10} />
        <Slide src={project.secondary} y={secondaryY} z={20} />
        <Name project={project} opacity={nameOpacity} />
      </div>
    </section>
  );
}

function ProjectSection({ project }: { project: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const parentScale = useTransform(p, [0, 1], [1, 1.07]);
  const darken = useTransform(p, [0.14, 0.3], [0.08, 0.5]);
  const nameOpacity = useTransform(p, [0, 0.08, 0.9, 0.99], [0, 1, 1, 0]);
  const primaryY = useTransform(p, [0.15, 0.43, 0.5, 0.62], ["115%", "0%", "0%", "-120%"]);
  const secondaryY = useTransform(p, [0.52, 0.72], ["115%", "0%"]);

  return (
    <section ref={ref} className="pz-sec">
      <div className="pz-sticky">
        <motion.img style={{ scale: parentScale }} src={project.parent} alt="" className="pz-parent" />
        <div className="pz-grad" style={{ opacity: 1 }} />
        <motion.div className="pz-darken" style={{ opacity: darken }} />
        <Slide src={project.primary} y={primaryY} z={10} />
        <Slide src={project.secondary} y={secondaryY} z={20} />
        <Name project={project} opacity={nameOpacity} />
      </div>
    </section>
  );
}

function Decor({ src, scale, cls, fade, prog }: { src: string; scale: number; cls: string; fade: MotionValue<number>; prog: MotionValue<number> }) {
  const s = useTransform(prog, [0, ZOOM], [1, scale]);
  return (
    <motion.div style={{ scale: s, opacity: fade }} className="pz-decor-wrap">
      <div className={`pz-decor ${cls}`}><img src={src} alt="" /></div>
    </motion.div>
  );
}

const PZ_CSS = `
.d23 .pz { background:var(--bg); }
.d23 .pz-intro { background:var(--bg); }
.d23 .pz-intro-in { display:flex; flex-direction:column; align-items:center; text-align:center; padding-top:clamp(96px,14vh,128px); padding-bottom:16px; }
.d23 .pz-intro-h2 { margin-top:22px; font-size:clamp(2.4rem,6vw,5.5rem); }
.d23 .pz-intro-p { margin-top:24px; max-width:34rem; color:var(--muted); }
.d23 .pz-first { position:relative; height:560vh; background:var(--bg); }
.d23 .pz-sec { position:relative; height:360vh; background:var(--bg); }
.d23 .pz-sticky { position:sticky; top:0; height:100vh; width:100%; overflow:hidden; background:var(--bg); }
.d23 .pz-parent { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; will-change:transform; }
.d23 .pz-grad { position:absolute; inset-inline:0; bottom:0; z-index:3; height:33%; background:linear-gradient(to top, rgba(0,0,0,.55), transparent); pointer-events:none; }
.d23 .pz-darken { position:absolute; inset:0; z-index:2; background:#000; }
.d23 .pz-decor-wrap { position:absolute; inset:0; z-index:30; display:flex; align-items:center; justify-content:center; }
.d23 .pz-decor { position:relative; overflow:hidden; }
.d23 .pz-decor img { width:100%; height:100%; object-fit:cover; }
.d23 .pz-decor.d1 { top:-30vh; left:5vw; height:30vh; width:35vw; }
.d23 .pz-decor.d2 { top:-10vh; left:-25vw; height:45vh; width:20vw; }
.d23 .pz-decor.d3 { left:27.5vw; height:25vh; width:25vw; }
.d23 .pz-decor.d4 { top:27.5vh; left:5vw; height:25vh; width:20vw; }
.d23 .pz-decor.d5 { top:27.5vh; left:-22.5vw; height:25vh; width:30vw; }
.d23 .pz-decor.d6 { top:22.5vh; left:25vw; height:15vh; width:15vw; }
.d23 .pz-slide { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; will-change:transform; }
.d23 .pz-slide-frame { height:80vh; width:82vw; overflow:hidden; box-shadow:0 50px 120px -40px rgba(0,0,0,.85); }
.d23 .pz-slide-frame img { width:100%; height:100%; object-fit:cover; }
.d23 .pz-name { position:absolute; bottom:7vh; left:clamp(24px,5vw,56px); z-index:40; color:#fff; }
.d23 .pz-name-top { display:flex; align-items:center; gap:16px; }
.d23 .pz-name-top span:first-child { font-size:.9rem; color:rgba(255,255,255,.65); }
.d23 .pz-name-rule { width:36px; height:1px; background:rgba(255,255,255,.4); }
.d23 .pz-name-h { margin-top:16px; font-size:clamp(2rem,4.6vw,3.8rem); line-height:1; font-weight:300; letter-spacing:-.01em; }
.d23 .pz-name-sub { margin-top:12px; font-size:.7rem; text-transform:uppercase; letter-spacing:.32em; color:rgba(255,255,255,.55); }
`;
