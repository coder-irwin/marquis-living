"use client";

/* ============================================================
   design23 hero — an EXACT clone of main-branch design14's hero:
   IntroCamera "lens-open" loader → pinned scroll-scrub frame sequence →
   the finished video shrinks AS it slides up into the next section, with
   scroll-cued gold captions, vignette and grain. Frame assets reuse
   design23's own /design23/hero-frames sequence. Scoped under .d23.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FRAME_COUNT = 240;
const FRAME_PATH = (i: number) => `/design23/hero-frames/frame_${String(i).padStart(4, "0")}.jpg`;
const STILL = FRAME_PATH(1);

const SCRUB_VH = 400;
const TOUR_VH = SCRUB_VH + 100; // trailing 100vh = shrink + slide into next section
const SHRINK_SCALE = 0.85;
const SHRINK_RADIUS = 16;

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

type Pos = "center" | "bl" | "br" | "tl" | "tr" | "ml" | "mr";
type HeroCue = { ar?: string; eyebrow?: string; line: string; pos: Pos; in: number; out: number };
const CUES: HeroCue[] = [
  { eyebrow: "An Atelier of Interiors · Est. 2014", line: "Marquis Manor", pos: "center", in: 0.0, out: 0.2 },
  { ar: "بيت النور", line: "Step into the home you've pictured.", pos: "bl", in: 0.27, out: 0.48 },
  { eyebrow: "Bespoke, to the last reveal", line: "Where light learns to live.", pos: "tr", in: 0.55, out: 0.76 },
  { eyebrow: "By appointment", line: "Come home to more.", pos: "br", in: 0.83, out: 1.0 },
];
function cueOpacity(p: number, c: HeroCue) {
  const fade = (c.out - c.in) * 0.32;
  if (p <= c.in || p >= c.out) return 0;
  if (p < c.in + fade) return (p - c.in) / fade;
  if (p > c.out - fade) return (c.out - p) / fade;
  return 1;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const cueRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const tour = tourRef.current!;
    const stage = stageRef.current!;
    const frame = frameRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const images = new Array<HTMLImageElement>(FRAME_COUNT);
    let imgW = 1280, imgH = 720;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0, ch = 0;
    let curFrame = 0;
    let ready = false;
    let cancelled = false;
    let raf = 0;
    let lastDrawn = -1;
    let lastShrink = -1;
    let lastOverHero = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
      drawFrame(Math.round(curFrame));
    }

    function drawFrame(i: number) {
      const img = images[clamp(i, 0, FRAME_COUNT - 1)];
      if (!img || !img.complete) return;
      const scale = Math.max(cw / imgW, ch / imgH);
      const w = imgW * scale, h = imgH * scale;
      const x = (cw - w) / 2, y = (ch - h) / 2;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function getProgress() {
      const rect = tour.getBoundingClientRect();
      const scrollable = tour.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return clamp(-rect.top / scrollable, 0, 1);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SMOOTH = reduceMotion ? 1e3 : 7.5;
    let lastT = 0;
    function tick(now: number) {
      if (cancelled) return;
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
      lastT = now;

      const scrub = clamp(getProgress(), 0, 1);
      const shrink = clamp(-stage.getBoundingClientRect().top / window.innerHeight, 0, 1);

      const targetFrame = scrub * (FRAME_COUNT - 1);
      curFrame += (targetFrame - curFrame) * (1 - Math.exp(-SMOOTH * dt));
      if (Math.abs(targetFrame - curFrame) < 0.02) curFrame = targetFrame;
      const f = Math.round(curFrame);
      if (f !== lastDrawn) { drawFrame(f); lastDrawn = f; }

      if (shrink !== lastShrink) {
        const s = 1 - (1 - SHRINK_SCALE) * shrink;
        frame.style.transform = `scale(${s})`;
        frame.style.borderRadius = `${shrink * SHRINK_RADIUS}px`;
        lastShrink = shrink;
      }

      for (let i = 0; i < CUES.length; i++) {
        const el = cueRefs.current[i];
        if (!el) continue;
        const o = cueOpacity(scrub, CUES[i]);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${(1 - o) * 16}px)`;
      }

      // tell the navbar whether the dark hero still dominates the viewport
      const overHero = shrink < 0.55;
      if (overHero !== lastOverHero) {
        lastOverHero = overHero;
        window.dispatchEvent(new CustomEvent("d23:overhero", { detail: overHero }));
      }

      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (ready || cancelled) return;
      ready = true;
      resize();
      raf = requestAnimationFrame(tick);
    }

    function preload() {
      let loaded = 0;
      const order: number[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) order.push(i);

      function tally() {
        loaded++;
        if (loaded === FRAME_COUNT) start();
      }
      function loadOne(n: number) {
        const img = new Image();
        img.decoding = "async";
        images[n - 1] = img;
        img.onload = () => {
          if (n === 1) { imgW = img.naturalWidth || 1280; imgH = img.naturalHeight || 720; }
          if (img.decode) img.decode().then(tally, tally);
          else tally();
        };
        img.onerror = tally;
        img.src = FRAME_PATH(n);
      }

      loadOne(1);
      images[0].addEventListener("load", () => { resize(); drawFrame(0); });
      let k = 1;
      const batch = () => {
        if (cancelled) return;
        for (let b = 0; b < 12 && k < order.length; b++, k++) loadOne(order[k]);
        if (k < order.length) requestAnimationFrame(batch);
      };
      batch();
    }

    window.addEventListener("resize", resize, { passive: true });
    preload();
    const safety = window.setTimeout(() => { if (!ready) start(); }, 9000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div className="hero14" id="promenade">
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />
      <IntroCamera />

      <div className="tour" ref={tourRef} style={{ height: `${TOUR_VH}vh` }}>
        <div className="stage" ref={stageRef}>
          <div className="frame" ref={frameRef}>
            <canvas ref={canvasRef} />
            <div className="stage__vignette" />
            <div className="stage__grain" />
            {CUES.map((c, i) => (
              <div key={i} className={`herocue herocue--${c.pos}`}>
                <div className="herocue__inner" ref={(el) => { cueRefs.current[i] = el; }}>
                  {c.ar && <p className="herocue__ar">{c.ar}</p>}
                  {c.eyebrow && <p className="herocue__eyebrow">{c.eyebrow}</p>}
                  <p className="herocue__line">{c.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- intro "lens open" loader (design14 IntroCamera, scoped) ---------- */
const EASE = [0.76, 0, 0.24, 1] as const;

function IntroCamera() {
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    window.scrollTo(0, 0);

    let raf = 0;
    const start = performance.now();
    const t = (now: number) => {
      const p = Math.min((now - start) / 1300, 1);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(t);
    };
    raf = requestAnimationFrame(t);
    const finish = window.setTimeout(() => setDone(true), 3150);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(finish); };
  }, []);

  useEffect(() => {
    if (!done) return;
    const lenis = (window as unknown as { lenis?: { start: () => void } }).lenis;
    lenis?.start();
  }, [done]);

  const FW = Math.min(vp.w * 0.62, 380);
  const FH = Math.min(vp.h * 0.42, 230);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="hero-intro" exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
          {vp.w > 0 && (
            <>
              <motion.div
                className="hero-intro__win"
                initial={{ width: FW, height: FH }}
                animate={{ width: [FW, FW, vp.w], height: [FH, FH, vp.h] }}
                transition={{ duration: 2.7, times: [0, 0.55, 1], ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STILL} alt="" aria-hidden className="hero-intro__img" style={{ width: vp.w, height: vp.h }} />
                <motion.div
                  className="hero-intro__veil"
                  initial={{ opacity: 0.45 }}
                  animate={{ opacity: [0.45, 0.45, 0] }}
                  transition={{ duration: 2.7, times: [0, 0.55, 1], ease: EASE }}
                />
              </motion.div>

              <motion.div
                className="hero-intro__finder"
                style={{ width: FW, height: FH }}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [1.08, 1, 1, 1.03] }}
                transition={{ duration: 2.7, times: [0, 0.14, 0.5, 0.62], ease: EASE }}
              >
                <span className="hb hb--tl" /><span className="hb hb--tr" /><span className="hb hb--br" /><span className="hb hb--bl" />
                <div className="hero-intro__label">
                  <span className="hero-intro__dot" />
                  <span className="hero-intro__brand">Marquis Manor</span>
                </div>
              </motion.div>

              <motion.div
                className="hero-intro__prog"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.7, times: [0, 0.12, 0.5, 0.6], ease: EASE }}
              >
                <div className="hero-intro__bar"><div style={{ width: `${pct}%` }} /></div>
                <span className="serif hero-intro__pct">{pct}</span>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const HERO_CSS = `
.d23 .hero14 { position:relative; }
.d23 .tour { position:relative; width:100%; }
.d23 .hero14 .stage { position:sticky; top:0; height:100vh; width:100%; overflow:hidden; background:var(--paper); contain:layout paint; }
.d23 .hero14 .frame { position:absolute; inset:0; overflow:hidden; background:#000; transform-origin:center center; will-change:transform; }
.d23 .hero14 canvas { position:absolute; inset:0; width:100%; height:100%; display:block; transform:translateZ(0); backface-visibility:hidden; }
.d23 .stage__vignette { position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(120% 90% at 50% 38%, transparent 52%, rgba(0,0,0,.42) 100%),
            linear-gradient(to bottom, rgba(0,0,0,.5) 0%, transparent 26%, transparent 60%, rgba(0,0,0,.58) 100%); }
.d23 .stage__grain { position:absolute; inset:0; pointer-events:none; opacity:.05; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

.d23 .herocue { position:absolute; width:min(92vw,560px); pointer-events:none; z-index:5; }
.d23 .herocue__inner { opacity:0; will-change:opacity,transform; }
.d23 .herocue--center { left:50%; top:50%; transform:translate(-50%,-50%); width:min(92vw,760px); text-align:center; }
.d23 .herocue--bl { left:clamp(22px,5vw,80px); bottom:clamp(96px,14vh,160px); text-align:left; }
.d23 .herocue--br { right:clamp(22px,5vw,80px); bottom:clamp(96px,14vh,160px); text-align:right; }
.d23 .herocue--tl { left:clamp(22px,5vw,80px); top:clamp(112px,17vh,190px); text-align:left; }
.d23 .herocue--tr { right:clamp(22px,5vw,80px); top:clamp(112px,17vh,190px); text-align:right; }
.d23 .herocue--ml { left:clamp(22px,5vw,80px); top:50%; transform:translateY(-50%); text-align:left; }
.d23 .herocue--mr { right:clamp(22px,5vw,80px); top:50%; transform:translateY(-50%); text-align:right; }
.d23 .herocue__ar { font-family:var(--serif),serif; font-size:clamp(14px,1.7vw,22px); color:#ecd7ab; margin-bottom:12px; text-shadow:0 2px 26px rgba(0,0,0,.55); }
.d23 .herocue__eyebrow { font-family:var(--sans); font-size:clamp(9px,.75vw,11px); letter-spacing:.4em; text-transform:uppercase; color:#e6cd9d; margin-bottom:14px; text-shadow:0 1px 18px rgba(0,0,0,.6); }
.d23 .herocue__line { font-family:var(--serif); font-weight:400; font-size:clamp(20px,3vw,40px); line-height:1.08; letter-spacing:.004em; color:#f4e7c8; text-shadow:0 3px 42px rgba(0,0,0,.6); }

/* intro loader */
.d23 .hero-intro { position:fixed; inset:0; z-index:100; display:flex; align-items:center; justify-content:center; overflow:hidden; background:#000; }
.d23 .hero-intro__win { position:relative; overflow:hidden; }
.d23 .hero-intro__img { position:absolute; left:50%; top:50%; max-width:none; transform:translate(-50%,-50%); object-fit:cover; }
.d23 .hero-intro__veil { position:absolute; inset:0; background:#000; }
.d23 .hero-intro__finder { pointer-events:none; position:absolute; }
.d23 .hero-intro .hb { position:absolute; height:32px; width:32px; border-color:rgba(255,255,255,.75); }
.d23 .hero-intro .hb--tl { left:16px; top:16px; border-left:1px solid; border-top:1px solid; }
.d23 .hero-intro .hb--tr { right:16px; top:16px; border-right:1px solid; border-top:1px solid; }
.d23 .hero-intro .hb--br { right:16px; bottom:16px; border-right:1px solid; border-bottom:1px solid; }
.d23 .hero-intro .hb--bl { left:16px; bottom:16px; border-left:1px solid; border-bottom:1px solid; }
.d23 .hero-intro__label { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:#fff; }
.d23 .hero-intro__dot { height:6px; width:6px; border-radius:50%; background:var(--accent-2); }
.d23 .hero-intro__brand { font-size:11px; text-transform:uppercase; letter-spacing:.42em; }
.d23 .hero-intro__prog { position:absolute; bottom:13vh; display:flex; width:min(70vw,380px); align-items:center; gap:16px; }
.d23 .hero-intro__bar { height:1px; flex:1; background:rgba(255,255,255,.2); }
.d23 .hero-intro__bar > div { height:100%; background:#fff; transition:width .15s; }
.d23 .hero-intro__pct { width:32px; text-align:right; font-size:12px; font-variant-numeric:tabular-nums; color:rgba(255,255,255,.7); }
`;
