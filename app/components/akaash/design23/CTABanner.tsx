"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// design14 CTA — full-bleed parallax image banner, ported into design23.
const IMG = "/glocal-portfolio/portfolio-38-02c5ab77.webp";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="ctb">
      <style dangerouslySetInnerHTML={{ __html: CTB_CSS }} />
      <motion.div style={{ y }} className="ctb-bg">
        <img src={IMG} alt="A Marquis Manor home styled in situ" loading="lazy" />
        <div className="ctb-veil" />
      </motion.div>

      <div className="wrap ctb-inner">
        <span className="ey rv">Begin</span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease: EASE }}
          className="serif ctb-h2"
        >
          Let&apos;s design the home you&apos;ll never want to leave.
        </motion.h2>
        <p className="ctb-lead rv">
          Tell us about your space — a single room or an entire residence — and within 48 hours a designer will send a
          first concept built around the way you live. No obligation. Just a glimpse of what could be.
        </p>
        <div className="ctb-actions rv">
          <a href="#contact" className="ctb-btn solid magnetic">Request your concept</a>
          <a href="#collections" className="ctb-btn magnetic">See our work</a>
        </div>
      </div>
    </section>
  );
}

const CTB_CSS = `
.d23 .ctb { position:relative; display:flex; align-items:center; min-height:90vh; overflow:hidden; }
.d23 .ctb-bg { position:absolute; inset:-10% 0; z-index:-1; }
.d23 .ctb-bg img { width:100%; height:100%; object-fit:cover; }
.d23 .ctb-veil { position:absolute; inset:0; background:rgba(244,241,234,.74); }
.d23 .ctb-inner { padding-block:clamp(80px,14vh,160px); }
.d23 .ctb-h2 { margin-top:32px; max-width:18ch; font-size:clamp(2.4rem,6.5vw,6.5rem); }
.d23 .ctb-lead { margin-top:32px; max-width:36rem; font-size:1.1rem; line-height:1.7; color:var(--ink-2); }
.d23 .ctb-actions { margin-top:48px; display:flex; flex-wrap:wrap; gap:18px; }
.d23 .ctb-btn { padding:16px 28px; border:1px solid var(--ink); border-radius:999px; font-size:.9rem; transition:background .4s,color .4s,border-color .4s; }
.d23 .ctb-btn:hover { background:var(--ink); color:var(--paper); }
.d23 .ctb-btn.solid { background:var(--ink); color:var(--paper); }
.d23 .ctb-btn.solid:hover { background:var(--accent); border-color:var(--accent); }
`;
