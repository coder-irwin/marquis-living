"use client";

import { useEffect, useRef } from "react";

/**
 * The living night sky behind the hero.
 *
 * A single <canvas> renders four layered behaviours that together read as a
 * folk-tale night: drifting twinkling stars, a slow constellation that wires
 * itself together near the cursor, occasional shooting stars, and warm diya
 * embers that rise and fade. Everything is DPR-aware and pauses when the tab
 * is hidden or the user prefers reduced motion.
 */
export default function Sky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    type Star = { x: number; y: number; r: number; tw: number; tws: number; hue: number };
    type Ember = { x: number; y: number; vy: number; r: number; life: number; max: number };
    type Shoot = { x: number; y: number; vx: number; vy: number; len: number; life: number };

    let stars: Star[] = [];
    let embers: Ember[] = [];
    let shoots: Shoot[] = [];

    const mouse = { x: -9999, y: -9999 };
    // deeper, warmer hues so embers/motes read against the light paper
    const EMBER_HUES = ["201,135,31", "224,83,58", "192,50,122"];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(220, Math.floor((w * h) / 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.025 + 0.005,
        hue: Math.random() > 0.85 ? 1 : 0, // a few warm gold stars
      }));
    };

    const spawnShoot = () => {
      const fromTop = Math.random() > 0.5;
      const x = Math.random() * w;
      const y = fromTop ? Math.random() * h * 0.4 : Math.random() * h * 0.2;
      const angle = (Math.PI / 4) * (Math.random() * 0.6 + 0.7);
      const speed = Math.random() * 6 + 9;
      shoots.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 120 + 90,
        life: 1,
      });
    };

    const spawnEmber = () => {
      embers.push({
        x: Math.random() * w,
        y: h + 10,
        vy: Math.random() * 0.5 + 0.35,
        r: Math.random() * 2 + 1,
        life: 0,
        max: Math.random() * 320 + 220,
      });
    };

    let raf = 0;
    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // ---- stars + near-cursor constellation ----
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.tw += s.tws;
        const a = 0.35 + Math.sin(s.tw) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue
          ? `rgba(176, 123, 29, ${a})`
          : `rgba(60, 48, 34, ${a * 0.55})`;
        ctx.fill();

        // wire nearby stars to the cursor's neighbourhood
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          const al = (1 - Math.sqrt(d2) / 150) * 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(120, 86, 30, ${al})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // ---- shooting stars ----
      if (!reduced && frame % 150 === 0 && shoots.length < 2 && Math.random() > 0.4) {
        spawnShoot();
      }
      shoots = shoots.filter((sh) => sh.life > 0);
      for (const sh of shoots) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        const tailX = sh.x - sh.vx * (sh.len / 12);
        const tailY = sh.y - sh.vy * (sh.len / 12);
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 240, 200, ${sh.life})`);
        grad.addColorStop(1, "rgba(255, 240, 200, 0)");
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // ---- rising diya embers ----
      if (!reduced && frame % 26 === 0 && embers.length < 40) spawnEmber();
      embers = embers.filter((e) => e.life < e.max && e.y > -20);
      for (const e of embers) {
        e.life++;
        e.y -= e.vy;
        e.x += Math.sin((e.life + e.x) * 0.02) * 0.4; // gentle sway
        const t = e.life / e.max;
        const a = Math.sin(t * Math.PI) * 0.7;
        const hue = EMBER_HUES[Math.floor(e.x) % EMBER_HUES.length];
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hue}, ${a})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${hue}, ${a})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      // one static frame is enough
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ev.clientX - rect.left;
      mouse.y = ev.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
