"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { D12_CSS } from "./styles";
import { BASE, NAV } from "./data";

/* Shared CTA band. */
export function CTA() {
  return (
    <section className="cta on-dark">
      <div className="wrap">
        <span className="ey mono">Let&apos;s talk</span>
        <h2 className="lines"><span><i>Start something</i></span><span><i><em>worth building.</em></i></span></h2>
        <a href={`${BASE}/contact`} className="btn btn-fill magnetic" data-cur><span>Get in touch</span><span className="ar">→</span></a>
      </div>
    </section>
  );
}

/* Shared contact form. */
export function ContactForm() {
  return (
    <form className="form" data-form>
      <div className="ff"><input id="d13n" type="text" placeholder=" " required /><label htmlFor="d13n">Your name</label></div>
      <div className="ff"><input id="d13e" type="email" placeholder=" " required /><label htmlFor="d13e">Email</label></div>
      <div className="ff"><input id="d13p" type="text" placeholder=" " /><label htmlFor="d13p">Project / location</label></div>
      <div className="ff"><textarea id="d13m" rows={3} placeholder=" " required /><label htmlFor="d13m">Tell us about it</label></div>
      <button type="submit" className="submit magnetic" data-cur>Send it over</button>
    </form>
  );
}

export default function Shell({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cu: Array<() => void> = [];
    const coarse = window.matchMedia("(hover:none),(pointer:coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // curtain
    const curtain = root.querySelector<HTMLElement>(".curtain");
    const tt = window.setTimeout(() => curtain?.classList.add("up"), 850);
    cu.push(() => window.clearTimeout(tt));

    // reveals
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    root.querySelectorAll(".rv,.ir,.lines,.ey").forEach((el) => io.observe(el));
    cu.push(() => io.disconnect());

    // counters
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const to = parseFloat(el.dataset.to || "0"); const suf = el.dataset.suf || "";
      let s = 0; const dur = 1400;
      const step = (t: number) => { if (!s) s = t; const p = Math.min((t - s) / dur, 1); const e2 = 1 - Math.pow(1 - p, 3); el.innerHTML = `${Math.round(to * e2)}<span class="suf">${suf}</span>`; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step); cio.unobserve(el);
    }), { threshold: 0.6 });
    root.querySelectorAll<HTMLElement>(".count").forEach((el) => cio.observe(el));
    cu.push(() => cio.disconnect());

    // nav + parallax driven by scroll
    const nav = root.querySelector<HTMLElement>(".nav");
    const pars = Array.from(root.querySelectorAll<HTMLElement>("[data-par]"));
    const onScroll = () => {
      nav?.classList.toggle("solid", window.scrollY > 80);
      if (!reduce && window.innerWidth > 760) {
        pars.forEach((el) => {
          const sp = parseFloat(el.dataset.par || "0");
          const r = el.getBoundingClientRect();
          const prog = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          el.style.transform = `translate3d(0,${(-prog * sp).toFixed(1)}px,0)`;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cu.push(() => window.removeEventListener("scroll", onScroll));

    // lenis
    if (!reduce) {
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", onScroll);
      let raf = 0; const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      cu.push(() => { cancelAnimationFrame(raf); lenis.destroy(); });
    }

    // video lazy play
    const vio = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.2 });
    root.querySelectorAll<HTMLVideoElement>("video[data-autoplay]").forEach((v) => vio.observe(v));
    cu.push(() => vio.disconnect());

    // cursor + magnetic
    if (!coarse) {
      const cur = root.querySelector<HTMLElement>(".cur");
      let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
      const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
      const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (cur) cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
      const over = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,[data-cur]")) cur?.classList.add("big"); };
      const out = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,[data-cur]")) cur?.classList.remove("big"); };
      window.addEventListener("mousemove", mv); root.addEventListener("mouseover", over); root.addEventListener("mouseout", out);
      raf = requestAnimationFrame(loop);
      cu.push(() => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", mv); root.removeEventListener("mouseover", over); root.removeEventListener("mouseout", out); });

      const mags = Array.from(root.querySelectorAll<HTMLElement>(".magnetic"));
      const mh = mags.map((m) => {
        const mm = (e: MouseEvent) => { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`; };
        const ml = () => { m.style.transform = ""; };
        m.addEventListener("mousemove", mm); m.addEventListener("mouseleave", ml); return { m, mm, ml };
      });
      cu.push(() => mh.forEach(({ m, mm, ml }) => { m.removeEventListener("mousemove", mm); m.removeEventListener("mouseleave", ml); }));
    }

    // forms
    root.querySelectorAll<HTMLFormElement>("[data-form]").forEach((f) => {
      const sub = (e: Event) => { e.preventDefault(); const b = f.querySelector<HTMLButtonElement>(".submit"); if (!b) return; b.textContent = "Sending…"; b.disabled = true; window.setTimeout(() => { b.textContent = "✓ Got it — we'll be in touch"; b.classList.add("ok"); }, 1300); };
      f.addEventListener("submit", sub); cu.push(() => f.removeEventListener("submit", sub));
    });

    // mobile menu
    const burger = root.querySelector<HTMLElement>(".burger");
    const mob = root.querySelector<HTMLElement>(".mob");
    const tg = () => mob?.classList.toggle("open");
    burger?.addEventListener("click", tg);
    const links = Array.from(root.querySelectorAll<HTMLElement>(".mob a"));
    const close = () => mob?.classList.remove("open");
    links.forEach((l) => l.addEventListener("click", close));
    cu.push(() => { burger?.removeEventListener("click", tg); links.forEach((l) => l.removeEventListener("click", close)); });

    return () => cu.forEach((fn) => fn());
  }, [pathname]);

  return (
    <div className="d13" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: D12_CSS }} />
      <div className="grain" aria-hidden="true" />
      <div className="cur" />
      <div className="curtain"><b>Marquis <em>Manor</em></b></div>

      <nav className="nav">
        <div className="nav-in">
          <a href={BASE} className="logo magnetic" data-cur>Marquis<i>.</i>Manor</a>
          <ul className="nav-links">
            {NAV.map((l) => <li key={l.href}><a href={l.href} className={pathname === l.href ? "active" : ""}>{l.label}</a></li>)}
          </ul>
          <a href={`${BASE}/contact`} className="nav-cta magnetic" data-cur>Let&apos;s talk</a>
          <button className="burger" aria-label="Menu"><span /><span /><span /></button>
        </div>
      </nav>

      <div className="mob">
        {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href={`${BASE}/contact`}>Let&apos;s <em>talk</em></a>
      </div>

      <main>{children}</main>

      {cta && <CTA />}

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="logo">Marquis<i style={{ color: "var(--sand)", fontStyle: "normal" }}>.</i>Manor</div>
              <p>An architectural visualisation studio drawing daylight into spaces before they are built. Remote-first, delivered worldwide.</p>
            </div>
            <div className="fcol">
              <h4>Menu</h4>
              {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            </div>
            <div className="fcol">
              <h4>Studio</h4>
              <a href="mailto:hello@marquismanor.studio">hello@marquismanor.studio</a>
              <a href="tel:+12135104140">+1 213-510-4140</a>
              <p>Remote-first · worldwide</p>
            </div>
            <div className="fcol">
              <h4>Join the list</h4>
              <p style={{ marginBottom: 6 }}>New work and studio notes, now and then.</p>
              <form className="foot-mail" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" aria-label="Email" />
                <button type="submit">Join →</button>
              </form>
              <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
                <a href="#">Instagram</a><a href="#">Behance</a><a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="foot-huge">MARQUIS LIVING</div>
          <div className="foot-bottom">
            <p>© 2026 Marquis Living</p>
            <div style={{ display: "flex", gap: 22 }}><a href="#">Privacy</a><a href="#">Terms</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
