"use client";

import { useEffect, useRef } from "react";
import { D23_CSS } from "./styles";
import Collections from "./Collections";
import Products from "./Products";
import Showcase from "./Showcase";
import Testimonials from "./Testimonials";
// ported design14 sections (isolated, scoped .d23)
import Atelier from "./Atelier";
import WordmarkMarquee from "./WordmarkMarquee";
import ProjectsZoom from "./ProjectsZoom";
import LingerGallery from "./LingerGallery";
import CatalogueParallax from "./CatalogueParallax";
import Approach from "./Approach";
import MarqueeColumns from "./MarqueeColumns";
import CTABanner from "./CTABanner";
import Footer from "./Footer";
import Hero from "./Hero";

const GALLERY = [
  { src: "/design23/gallery/living.png", span: "full", cap: "01 / Living", t: "Where the day settles" },
  { src: "/design23/gallery/dining.png", span: "half", cap: "02 / Dining", t: "A table that holds people" },
  { src: "/design23/gallery/bedroom.png", span: "half", cap: "03 / Master Suite", t: "Rest, made architectural" },
  { src: "/design23/gallery/study.png", span: "third", cap: "04 / Study", t: "A room that holds focus" },
  { src: "/design23/products/p3.jpeg", span: "third", cap: "05 / Kitchen", t: "Warm stone & joinery" },
  { src: "/design23/gallery/bath.png", span: "third", cap: "06 / Spa Bath", t: "Daily ritual, elevated" },
];

const STEPS = [
  { n: "01", t: "Listen", p: "We walk your space and learn how you actually live — how you host, where you unwind, what you can't stand. The brief is built around your life, never a trend." },
  { n: "02", t: "Envision", p: "Within 48 hours, a first concept rendered into your real rooms — palette, materials, light. You feel the finished home long before we build it." },
  { n: "03", t: "Craft", p: "Bespoke joinery, sourced stone, commissioned pieces. We hold every maker to the drawing, so nothing is lost between the idea and the install." },
  { n: "04", t: "Reveal", p: "One considered handover. We build it, style it and light it — then hand you the keys to a home that already feels unmistakably yours." },
];

const NAV = [
  { href: "#promenade", label: "Promenade" },
  { href: "#collections", label: "Collections" },
  { href: "#gallery", label: "Gallery" },
  { href: "#process", label: "Process" },
  { href: "#voices", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

function clamp(v: number, a = 0, b = 1) { return Math.min(b, Math.max(a, v)); }

export default function Site() {
  const ref = useRef<HTMLDivElement>(null);

  /* ---- chapters, nav state, rail, cursor, reveals, counters, forms ---- */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cu: Array<() => void> = [];
    const coarse = window.matchMedia("(hover:none),(pointer:coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nav = root.querySelector<HTMLElement>(".nav");
    const prog = root.querySelector<HTMLElement>(".progress");

    // nav theme is driven by the hero: white-on-dark while the cinematic hero
    // dominates the viewport, dark-on-light (solid) once it has shrunk away.
    let overHero = true;
    const applyNav = () => {
      nav?.classList.toggle("over-dark", overHero);
      nav?.classList.toggle("solid", window.scrollY > 80 && !overHero);
    };
    const onScroll = () => {
      if (prog) prog.style.transform = `scaleX(${clamp(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1))})`;
      applyNav();
    };
    const onHero = (e: Event) => { overHero = !!(e as CustomEvent).detail; applyNav(); };
    window.addEventListener("d23:overhero", onHero as EventListener);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cu.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); window.removeEventListener("d23:overhero", onHero as EventListener); });

    // reveals
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    root.querySelectorAll(".rv,.ir,.boxrv").forEach((el) => io.observe(el));
    cu.push(() => io.disconnect());

    // nav wayfinding: highlight the link for the section crossing the viewport centre
    const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const navIo = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = (e.target as HTMLElement).id;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    }), { rootMargin: "-45% 0px -45% 0px" });
    ["promenade", "collections", "gallery", "process", "voices", "contact"].forEach((id) => {
      const s = root.querySelector(`#${id}`); if (s) navIo.observe(s);
    });
    cu.push(() => navIo.disconnect());

    // contact input glow: radial highlight follows the cursor per field
    const glows = Array.from(root.querySelectorAll<HTMLElement>(".contact .ff"));
    const gmove = (e: Event) => {
      const el = e.currentTarget as HTMLElement; const m = e as MouseEvent;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${m.clientX - r.left}px`);
      el.style.setProperty("--my", `${m.clientY - r.top}px`);
    };
    glows.forEach((g) => g.addEventListener("mousemove", gmove));
    cu.push(() => glows.forEach((g) => g.removeEventListener("mousemove", gmove)));

    // counters
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const to = parseFloat(el.dataset.to || "0"); const suf = el.dataset.suf || "";
      let s = 0; const dur = 1500;
      const step = (t: number) => { if (!s) s = t; const pr = Math.min((t - s) / dur, 1); const e2 = 1 - Math.pow(1 - pr, 3); el.innerHTML = `${Math.round(to * e2)}<span class="suf">${suf}</span>`; if (pr < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step); cio.unobserve(el);
    }), { threshold: 0.6 });
    root.querySelectorAll<HTMLElement>(".num").forEach((el) => cio.observe(el));
    cu.push(() => cio.disconnect());

    // cursor + magnetic
    if (!coarse) {
      const cur = root.querySelector<HTMLElement>(".cur");
      let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
      const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
      const cloop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (cur) cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; raf = requestAnimationFrame(cloop); };
      const over = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,input,textarea")) cur?.classList.add("big"); };
      const out = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,input,textarea")) cur?.classList.remove("big"); };
      window.addEventListener("mousemove", mv); root.addEventListener("mouseover", over); root.addEventListener("mouseout", out);
      raf = requestAnimationFrame(cloop);
      cu.push(() => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", mv); root.removeEventListener("mouseover", over); root.removeEventListener("mouseout", out); });

      if (!reduce) {
        const mags = Array.from(root.querySelectorAll<HTMLElement>(".magnetic"));
        const mh = mags.map((m) => {
          const mm = (e: MouseEvent) => { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`; };
          const ml = () => { m.style.transform = ""; };
          m.addEventListener("mousemove", mm); m.addEventListener("mouseleave", ml); return { m, mm, ml };
        });
        cu.push(() => mh.forEach(({ m, mm, ml }) => { m.removeEventListener("mousemove", mm); m.removeEventListener("mouseleave", ml); }));
      }
    }

    // anchor smooth scroll
    const anchor = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return; const id = a.getAttribute("href"); if (!id || id === "#") return;
      const el = root.querySelector<HTMLElement>(id); if (!el) return;
      e.preventDefault();
      const lenis = (window as unknown as { lenis?: { scrollTo: (t: number | HTMLElement, o?: { offset?: number; duration?: number }) => void } }).lenis;
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 }); else window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      root.querySelector(".mob")?.classList.remove("open");
    };
    root.addEventListener("click", anchor); cu.push(() => root.removeEventListener("click", anchor));

    // form
    root.querySelectorAll<HTMLFormElement>("[data-form]").forEach((f) => {
      const sub = (e: Event) => { e.preventDefault(); const b = f.querySelector<HTMLButtonElement>(".submit"); if (!b) return; b.textContent = "Sending…"; b.disabled = true; window.setTimeout(() => { b.textContent = "✓ Got it — we'll be in touch"; b.classList.add("ok"); }, 1300); };
      f.addEventListener("submit", sub); cu.push(() => f.removeEventListener("submit", sub));
    });

    // mobile menu
    const burger = root.querySelector<HTMLElement>(".burger");
    const mob = root.querySelector<HTMLElement>(".mob");
    const tg = () => mob?.classList.toggle("open");
    burger?.addEventListener("click", tg); cu.push(() => burger?.removeEventListener("click", tg));

    return () => cu.forEach((fn) => fn());
  }, []);

  return (
    <div className="d23" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: D23_CSS }} />
      <div className="cur" />
      <div className="progress" aria-hidden="true" />

      {/* nav */}
      <nav className="nav over-dark">
        <div className="nav-in">
          <a href="#top" className="logo magnetic">Marquis<i>.</i>Manor</a>
          <ul className="nav-links">
            {NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <a href="#contact" className="nav-cta magnetic">Book a consultation</a>
          <button className="burger" aria-label="Menu"><span /><span /><span /></button>
        </div>
      </nav>

      <div className="mob">
        {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="#contact">Book a <em>consultation</em></a>
      </div>

      <span id="top" />

      {/* hero — exact clone of design14's immersive walkthrough */}
      <Hero />

      {/* the atelier (design14 Studio) */}
      <Atelier />

      {/* moving wordmark band (design14 Marquee) */}
      <WordmarkMarquee />

      {/* collections carousel — second section after hero */}
      <Collections />

      {/* product showcase — before/after */}
      <Products />

      {/* zoom-into-stack of residences (design14 ProjectsZoom) */}
      <ProjectsZoom />

      {/* linger on a room — expanding gallery (design14 GalleryGrid) */}
      <LingerGallery />

      {/* gallery */}
      <section className="gal" id="gallery">
        <div className="wrap">
          <div className="gal-head">
            <h2 className="serif rv">Look closer. <em>This is the standard.</em></h2>
            <p className="rv">Not moodboards or borrowed references — real Dubai rooms we&apos;ve designed and built, down to the last grain of stone and fall of light. Hover to lean in.</p>
          </div>
          <div className="grid">
            {GALLERY.map((g) => (
              <figure className={`fig ${g.span} ir`} key={g.src}>
                <img src={g.src} alt={g.t} loading="lazy" />
                <figcaption>{g.cap}<b>{g.t}</b></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* the catalogue — hero parallax rows (design14 MarquisParallax) */}
      <CatalogueParallax />

      {/* the approach — centred reveal + parallax trio (design14 Approach) */}
      <Approach />

      {/* parallax columns + "Now picture yours" (design14 MarqueeColumns) */}
      <MarqueeColumns />

      {/* process */}
      <section className="proc" id="process">
        <div className="wrap">
          <div className="ey rv">How we work</div>
          <h2 className="serif rv">From first walk to <em>final light.</em></h2>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step rv" key={s.n}>
                <div className="n serif">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* feature showcase (replaces the old CTA banner) */}
      <Showcase />

      {/* testimonials */}
      <Testimonials />

      {/* CTA banner — full-bleed parallax image (design14 CTA) */}
      <CTABanner />

      {/* contact */}
      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          {/* left — project form */}
          <div className="contact-left">
            <div className="ripple" aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} style={{ animationDelay: `${i * 0.7}s` }} />)}
              <i className="orbit o1" /><i className="orbit o2" />
            </div>
            <span className="ey boxrv">Start your project</span>
            <h2 className="serif boxrv">Tell us about <em>your space.</em></h2>
            <form className="form" data-form>
              <div className="form-row">
                <div className="ff boxrv"><input id="d23n" type="text" placeholder=" " required /><label htmlFor="d23n">Your name</label></div>
                <div className="ff boxrv"><input id="d23e" type="email" placeholder=" " required /><label htmlFor="d23e">Email</label></div>
              </div>
              <div className="form-row">
                <div className="ff sel boxrv">
                  <label htmlFor="d23room">Room(s) to design</label>
                  <select id="d23room" name="room" defaultValue="Whole Home">
                    {["Whole Home", "Entrance & Foyer", "Living Room", "Kitchen & Dining", "Master Bedroom", "Dressing Room", "Spa Bathroom", "Study & Library", "Games Lounge", "Terrace"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="ff sel boxrv">
                  <label htmlFor="d23budget">Budget</label>
                  <select id="d23budget" name="budget" defaultValue="Exploring">
                    {["Exploring", "$25k – $75k", "$75k – $200k", "$200k+"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="ff boxrv"><textarea id="d23m" rows={3} placeholder=" " /><label htmlFor="d23m">Anything you&apos;d love</label></div>
              <button type="submit" className="submit magnetic">Request my design brief ✦</button>
            </form>
          </div>

          {/* right — visit the atelier */}
          <aside className="visit boxrv">
            <figure className="visit-img ir">
              <img src="/design23/gallery/living.png" alt="Marquis Manor atelier" loading="lazy" />
              <figcaption>The atelier · Alserkal Avenue, Dubai</figcaption>
            </figure>
            <div className="visit-body">
              <span className="ey">Visit the atelier</span>
              <h3 className="serif">Come see it <em>in person.</em></h3>
              <p className="visit-copy">Walk our Dubai studio and material library — feel the stone, the timber, the weight of every finish — or invite a designer to your home. By appointment, six days a week.</p>
              <ul className="visit-list">
                <li><span>The atelier</span>Alserkal Avenue, Al Quoz 1<br />Dubai, United Arab Emirates</li>
                <li><span>Opening hours</span>Mon–Sat · 10am – 7pm<br />Sunday · by appointment</li>
                <li><span>Talk to us</span><a href="mailto:hello@marquismanor.ae">hello@marquismanor.ae</a><br /><a href="tel:+97145550142">+971 4 555 0142</a></li>
              </ul>
              <a href="mailto:hello@marquismanor.ae?subject=Book a visit" className="visit-btn magnetic">Book a visit <span>→</span></a>
            </div>
          </aside>
        </div>
      </section>

      {/* footer (design14 Footer) */}
      <Footer />

    </div>
  );
}
