"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { D11_CSS } from "./styles";
import { BASE, NAV_LINKS } from "./data";

/* ----------------------------------------------------------------------------
 * Shared CTA band — "let's begin in daylight".
 * -------------------------------------------------------------------------- */
export function CTA() {
  return (
    <section className="cta">
      <div className="wrap cta-in">
        <span className="eyebrow">Start a project</span>
        <h2 className="display">
          Let&apos;s draw daylight
          <br />
          into <em>your</em> space.
        </h2>
        <p>
          Tell us about the room, the building, or the idea. We&apos;ll send back a
          plan, a timeline, and honest pricing — usually within a day.
        </p>
        <a href={`${BASE}/contact`} className="btn btn-fill magnetic" data-cursor>
          <span>Begin a project</span>
          <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
 * Shared contact form (home + contact page).
 * -------------------------------------------------------------------------- */
export function ContactForm() {
  const CHIPS = ["Visualisation", "3D Modelling", "Interior Styling", "Animation", "Virtual Tour", "Not sure yet"];
  return (
    <form className="form" data-form>
      <p className="fnote">Fields marked * are required. No spam, ever.</p>
      <div className="fgrid">
        <div className="ffield">
          <input id="d11-name" type="text" placeholder=" " required />
          <label htmlFor="d11-name">Full name *</label>
        </div>
        <div className="ffield">
          <input id="d11-email" type="email" placeholder=" " required />
          <label htmlFor="d11-email">Email *</label>
        </div>
        <div className="ffield">
          <input id="d11-phone" type="tel" placeholder=" " />
          <label htmlFor="d11-phone">Phone</label>
        </div>
        <div className="ffield">
          <input id="d11-budget" type="text" placeholder=" " />
          <label htmlFor="d11-budget">Approx. budget</label>
        </div>
      </div>
      <p className="fnote" style={{ marginTop: 6 }}>What do you need?</p>
      <div className="chips" data-chips>
        {CHIPS.map((c) => (
          <span className="chip" key={c} data-cursor>{c}</span>
        ))}
      </div>
      <div className="ffield full">
        <textarea id="d11-msg" rows={3} placeholder=" " required />
        <label htmlFor="d11-msg">Tell us about the project *</label>
      </div>
      <button type="submit" className="form-submit magnetic" data-cursor>Send the brief</button>
    </form>
  );
}

/* ----------------------------------------------------------------------------
 * Shell — nav, footer, and all client-side motion, scoped to `.d11`.
 * -------------------------------------------------------------------------- */
export default function Shell({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    const isCoarse = window.matchMedia("(hover:none),(pointer:coarse)").matches;

    /* --- curtain lift + hero kinetic reveal --- */
    const curtain = root.querySelector<HTMLElement>(".curtain");
    const hero = root.querySelector<HTMLElement>(".hero");
    const t1 = window.setTimeout(() => curtain?.classList.add("lift"), 900);
    const t2 = window.setTimeout(() => hero?.classList.add("go"), 1050);
    cleanups.push(() => { window.clearTimeout(t1); window.clearTimeout(t2); });

    /* --- scroll reveals --- */
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll(".reveal,.reveal-l,.reveal-r,.clip-reveal,.img-reveal,.eyebrow").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* --- counters --- */
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const to = parseFloat(el.dataset.to || "0");
        const suf = el.dataset.suf || "";
        const dur = 1500;
        let start = 0;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.innerHTML = `${Math.round(to * eased)}<span class="suf">${suf}</span>`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    root.querySelectorAll<HTMLElement>(".count").forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    /* --- nav scrolled + scroll progress + horizontal works --- */
    const nav = root.querySelector<HTMLElement>(".nav");
    const prog = root.querySelector<HTMLElement>(".scroll-prog");
    const worksSec = root.querySelector<HTMLElement>(".works-h");
    const worksTrack = root.querySelector<HTMLElement>(".works-track");
    const worksBar = root.querySelector<HTMLElement>(".works-progress i");

    const layoutWorks = () => {
      if (!worksSec || !worksTrack) return;
      if (window.innerWidth <= 760) { worksSec.style.height = ""; worksTrack.style.transform = ""; return; }
      const dist = worksTrack.scrollWidth - window.innerWidth + 80;
      worksSec.dataset.dist = String(Math.max(dist, 0));
      worksSec.style.height = `${dist + window.innerHeight}px`;
    };

    const onScroll = () => {
      const y = window.scrollY;
      nav?.classList.toggle("scrolled", y > 60);
      if (prog) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = `${h > 0 ? (y / h) * 100 : 0}%`;
      }
      if (worksSec && worksTrack && window.innerWidth > 760) {
        const dist = parseFloat(worksSec.dataset.dist || "0");
        const total = worksSec.offsetHeight - window.innerHeight;
        const passed = Math.min(Math.max(-worksSec.getBoundingClientRect().top, 0), total);
        const p = total > 0 ? passed / total : 0;
        worksTrack.style.transform = `translateX(${-p * dist}px)`;
        if (worksBar) worksBar.style.width = `${p * 100}%`;
      }
    };
    layoutWorks();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layoutWorks);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", layoutWorks); });

    /* --- custom cursor + magnetic --- */
    if (!isCoarse) {
      const dot = root.querySelector<HTMLElement>(".cursor-dot");
      const ring = root.querySelector<HTMLElement>(".cursor-ring");
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my;
      let raf = 0;
      const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (dot) dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; };
      const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
      const over = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,[data-cursor],.ba,.svc-item")) ring?.classList.add("hover"); };
      const out = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,[data-cursor],.ba,.svc-item")) ring?.classList.remove("hover"); };
      const down = () => ring?.classList.add("down");
      const up = () => ring?.classList.remove("down");
      window.addEventListener("mousemove", move);
      root.addEventListener("mouseover", over);
      root.addEventListener("mouseout", out);
      window.addEventListener("mousedown", down);
      window.addEventListener("mouseup", up);
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", move);
        root.removeEventListener("mouseover", over);
        root.removeEventListener("mouseout", out);
        window.removeEventListener("mousedown", down);
        window.removeEventListener("mouseup", up);
      });

      const magnets = Array.from(root.querySelectorAll<HTMLElement>(".magnetic"));
      const mHandlers = magnets.map((m) => {
        const mm = (e: MouseEvent) => {
          const r = m.getBoundingClientRect();
          m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        };
        const ml = () => { m.style.transform = ""; };
        m.addEventListener("mousemove", mm);
        m.addEventListener("mouseleave", ml);
        return { m, mm, ml };
      });
      cleanups.push(() => mHandlers.forEach(({ m, mm, ml }) => { m.removeEventListener("mousemove", mm); m.removeEventListener("mouseleave", ml); }));
    }

    /* --- hero parallax --- */
    const par = root.querySelector<HTMLElement>(".hero-figure .par");
    if (par) {
      const onPar = () => { par.style.transform = `translateY(${window.scrollY * 0.08}px) scale(1.06)`; };
      window.addEventListener("scroll", onPar, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onPar));
    }

    /* --- services accordion + sticky image swap --- */
    const svcItems = Array.from(root.querySelectorAll<HTMLElement>(".svc-item"));
    const svcImgs = Array.from(root.querySelectorAll<HTMLElement>(".svc-visual img"));
    const setSvc = (idx?: string) => {
      svcImgs.forEach((img) => img.classList.toggle("active", img.dataset.index === idx));
    };
    const svcHandlers = svcItems.map((item) => {
      const click = () => {
        const open = item.classList.contains("open");
        svcItems.forEach((i) => i.classList.remove("open"));
        if (!open) { item.classList.add("open"); setSvc(item.dataset.index); }
      };
      const enter = () => setSvc(item.dataset.index);
      item.addEventListener("click", click);
      item.addEventListener("mouseenter", enter);
      return { item, click, enter };
    });
    if (svcItems[0]) { svcItems[0].classList.add("open"); setSvc(svcItems[0].dataset.index); }
    cleanups.push(() => svcHandlers.forEach(({ item, click, enter }) => { item.removeEventListener("click", click); item.removeEventListener("mouseenter", enter); }));

    /* --- blueprint -> render drag reveal --- */
    root.querySelectorAll<HTMLElement>(".ba").forEach((ba) => {
      const before = ba.querySelector<HTMLElement>(".ba-before");
      const handle = ba.querySelector<HTMLElement>(".ba-handle");
      if (!before || !handle) return;
      let dragging = false;
      const set = (clientX: number) => {
        const r = ba.getBoundingClientRect();
        const p = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
        before.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
        handle.style.left = `${p * 100}%`;
      };
      const dStart = (e: PointerEvent) => { dragging = true; set(e.clientX); };
      const dMove = (e: PointerEvent) => { if (dragging) set(e.clientX); };
      const dEnd = () => { dragging = false; };
      ba.addEventListener("pointerdown", dStart);
      window.addEventListener("pointermove", dMove);
      window.addEventListener("pointerup", dEnd);
      cleanups.push(() => { ba.removeEventListener("pointerdown", dStart); window.removeEventListener("pointermove", dMove); window.removeEventListener("pointerup", dEnd); });
    });

    /* --- work grid filter --- */
    const fbtns = Array.from(root.querySelectorAll<HTMLElement>(".fbtn"));
    const fHandlers = fbtns.map((btn) => {
      const click = () => {
        fbtns.forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        const f = btn.dataset.filter || "all";
        root.querySelectorAll<HTMLElement>(".pcard").forEach((c) => {
          c.classList.toggle("hide", f !== "all" && c.dataset.cat !== f);
        });
      };
      btn.addEventListener("click", click);
      return { btn, click };
    });
    cleanups.push(() => fHandlers.forEach(({ btn, click }) => btn.removeEventListener("click", click)));

    /* --- chips + form submit --- */
    root.querySelectorAll<HTMLElement>(".chip").forEach((chip) => {
      const click = () => chip.classList.toggle("on");
      chip.addEventListener("click", click);
      cleanups.push(() => chip.removeEventListener("click", click));
    });
    root.querySelectorAll<HTMLFormElement>("[data-form]").forEach((form) => {
      const submit = (e: Event) => {
        e.preventDefault();
        const btn = form.querySelector<HTMLButtonElement>(".form-submit");
        if (!btn) return;
        btn.textContent = "Sending…";
        btn.disabled = true;
        window.setTimeout(() => { btn.textContent = "✓ Brief received — we'll reply shortly"; btn.classList.add("success"); }, 1400);
      };
      form.addEventListener("submit", submit);
      cleanups.push(() => form.removeEventListener("submit", submit));
    });

    /* --- mobile menu --- */
    const burger = root.querySelector<HTMLElement>(".burger");
    const menu = root.querySelector<HTMLElement>(".mobile-menu");
    const toggleMenu = () => { burger?.classList.toggle("open"); menu?.classList.toggle("open"); };
    burger?.addEventListener("click", toggleMenu);
    const menuLinks = Array.from(root.querySelectorAll<HTMLElement>(".mobile-menu a"));
    const closeMenu = () => { burger?.classList.remove("open"); menu?.classList.remove("open"); };
    menuLinks.forEach((l) => l.addEventListener("click", closeMenu));
    cleanups.push(() => { burger?.removeEventListener("click", toggleMenu); menuLinks.forEach((l) => l.removeEventListener("click", closeMenu)); });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return (
    <div className="d11" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: D11_CSS }} />

      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="scroll-prog" />

      <div className="curtain">
        <div className="curtain-mark">Marquis <em>Manor</em></div>
      </div>

      <nav className="nav">
        <div className="nav-in">
          <a href={BASE} className="logo magnetic" data-cursor>
            <b>Marquis</b><span className="dot">.</span><i>Manor</i>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={pathname === l.href ? "active" : ""}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href={`${BASE}/contact`} className="nav-cta magnetic" data-cursor><span>Start a project</span></a>
          <button className="burger" aria-label="Menu"><span /><span /><span /></button>
        </div>
      </nav>

      <div className="mobile-menu">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <a href={`${BASE}/contact`}>Start a <em>project</em></a>
      </div>

      <main>{children}</main>

      {cta && <CTA />}

      <div className="foot-strip">
        <div className="foot-strip-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>Spaces in their best light <span className="sep">✦</span>&nbsp;</span>
          ))}
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="logo"><b>Marquis</b><span className="dot">.</span><i>Manor</i></div>
              <p>An architectural visualisation studio drawing daylight into spaces before they are built. Original work, honest pricing, delivered worldwide.</p>
            </div>
            <div className="fcol">
              <h4>Pages</h4>
              {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            </div>
            <div className="fcol">
              <h4>Studio</h4>
              <p>Mon–Fri · 9–6</p>
              <a href="mailto:hello@marquismanor.studio">hello@marquismanor.studio</a>
              <a href="tel:+12135104140">+1 213-510-4140</a>
            </div>
            <div className="fcol">
              <h4>Elsewhere</h4>
              <a href="#">Instagram</a>
              <a href="#">Behance</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div className="foot-bottom">
            <p>© 2026 Marquis Manor — All rights reserved.</p>
            <div className="foot-social">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" /></svg></a>
              <a href="#" aria-label="Behance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h5a2.5 2.5 0 0 1 0 5H3zM3 12h5.5a2.5 2.5 0 0 1 0 5H3zM15 9h5M14.5 14h6a3 3 0 0 0-6 0v.5a3 3 0 0 0 5.4 1.5" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
