"use client";

/* design25 — pinned scroll-scrub "transformation" section. As you scroll, a derelict
   room is reborn into a finished luxury interior (the single-continuous cinematic,
   240 silent frames). Tells the before→after story far more powerfully than a static
   slider. Scoped under .d25 — NOT the hero. */

import { useEffect, useRef } from "react";

const FRAME_COUNT = 240;
const FRAME_PATH = (i: number) => `/design25/transform-frames/frame_${String(i).padStart(4, "0")}.jpg`;

const SHRINK_SCALE = 0.9;
const SHRINK_RADIUS = 16;

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

type Pos = "bl" | "tr" | "br" | "center";
type Cue = { pos: Pos; in: number; out: number };
const CUES: Cue[] = [
  { pos: "bl", in: -0.2, out: 0.24 },     // over the broken room
  { pos: "br", in: 0.3, out: 0.5 },       // during the turn
  { pos: "center", in: 0.62, out: 1.25 }, // the finished home
];

function cueOpacity(p: number, c: Cue) {
  const fade = (c.out - c.in) * 0.32;
  if (p <= c.in || p >= c.out) return 0;
  if (p < c.in + fade) return (p - c.in) / fade;
  if (p > c.out - fade) return (c.out - p) / fade;
  return 1;
}

export default function ScrubTransform() {
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
    let ready = false, cancelled = false, raf = 0;
    let lastDrawn = -1, lastShrink = -1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = canvas.clientWidth; ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      lastDrawn = -1; drawFrame(Math.round(curFrame));
    }

    function drawFrame(i: number) {
      const img = images[clamp(i, 0, FRAME_COUNT - 1)];
      if (!img || !img.complete) return;
      const scale = Math.max(cw / imgW, ch / imgH);
      const w = imgW * scale, h = imgH * scale;
      const x = (cw - w) / 2, y = (ch - h) / 2;
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function getProgress() {
      const rect = tour.getBoundingClientRect();
      const scrollable = tour.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return clamp(-rect.top / scrollable, 0, 1);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SMOOTH = reduce ? 1e3 : 7.5;
    let lastT = 0;
    function tick(now: number) {
      if (cancelled) return;
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
      lastT = now;

      const scrub = getProgress();
      const shrink = clamp(-stage.getBoundingClientRect().top / window.innerHeight, 0, 1);

      const target = scrub * (FRAME_COUNT - 1);
      curFrame += (target - curFrame) * (1 - Math.exp(-SMOOTH * dt));
      if (Math.abs(target - curFrame) < 0.02) curFrame = target;
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
        el.style.transform = `translateY(${(1 - o) * 14}px)`;
      }

      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (ready || cancelled) return;
      ready = true; resize(); raf = requestAnimationFrame(tick);
    }

    function preload() {
      let loaded = 0;
      const tally = () => { loaded++; if (loaded === FRAME_COUNT) start(); };
      const loadOne = (n: number) => {
        const img = new Image(); img.decoding = "async"; images[n - 1] = img;
        img.onload = () => {
          if (n === 1) { imgW = img.naturalWidth || 1280; imgH = img.naturalHeight || 720; }
          if (img.decode) img.decode().then(tally, tally); else tally();
        };
        img.onerror = tally; img.src = FRAME_PATH(n);
      };
      loadOne(1);
      images[0].addEventListener("load", () => { resize(); drawFrame(0); });
      let k = 2;
      const batch = () => {
        if (cancelled) return;
        for (let b = 0; b < 12 && k <= FRAME_COUNT; b++, k++) loadOne(k);
        if (k <= FRAME_COUNT) requestAnimationFrame(batch);
      };
      batch();
    }

    // lazy: start fetching frames only when the section nears the viewport
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { preload(); io.disconnect(); }
    }, { rootMargin: "200% 0px 200% 0px" });
    io.observe(tour);

    window.addEventListener("resize", resize, { passive: true });
    const safety = window.setTimeout(() => { if (!ready) preload(); }, 12000);

    return () => {
      cancelled = true; cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", resize); window.clearTimeout(safety);
    };
  }, []);

  return (
    <section className="scrub-sec" id="transformation">
      <div className="scrub-tour" ref={tourRef}>
        <div className="scrub-stage" ref={stageRef}>
          <div className="scrub-frame" ref={frameRef}>
            <canvas ref={canvasRef} />
            <div className="scrub-vignette" />
            <div className="scrub-grain" />

            <div className="scue scue--bl">
              <div className="scue-in" ref={(el) => { cueRefs.current[0] = el; }}>
                <span className="ey">The transformation</span>
                <h1>
                  <span className="ln"><span>Every home</span></span>
                  <span className="ln"><span>has a <em>past.</em></span></span>
                </h1>
                <div className="scue-foot">
                  <p>A tired, broken shell — walls cracked, light long gone. This is where most stories would end. Ours begins here.</p>
                </div>
              </div>
            </div>

            <div className="scue scue--br">
              <div className="scue-in" ref={(el) => { cueRefs.current[1] = el; }}>
                <p className="cap-ey">Then we begin</p>
                <p className="cap">Watch it <em>turn.</em></p>
              </div>
            </div>

            <div className="scue scue--center">
              <div className="scue-in" ref={(el) => { cueRefs.current[2] = el; }}>
                <p className="cap-ey">Case study · Emirates Hills</p>
                <p className="cap big">Made <em>extraordinary.</em></p>
                <div className="tr-stats">
                  <div><b>9 mo</b><span>design to handover</span></div>
                  <div><b>6</b><span>rooms reworked</span></div>
                  <div><b>4,200</b><span>sqft</span></div>
                </div>
                <a href="#work" className="hero-cta magnetic" style={{ marginTop: 24 }}>See more projects <span>→</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
