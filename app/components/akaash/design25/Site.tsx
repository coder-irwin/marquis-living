"use client";

/* design25 — "Meridian"
   Flow: Hero → Introduction → Featured Services → Benefits → Features → Process →
   Portfolio → Statistics → Testimonials → Case Studies → Awards → Partners →
   Pricing → FAQ → CTA → Contact → Footer. Self-contained, scoped to .d25. */

import { useEffect, useRef, useState } from "react";
import { D25_CSS } from "./styles";
import ScrubHero from "./ScrubHero";
import ScrubTransform from "./ScrubTransform";

const NAV = [
  { href: "#intro", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const MARQUEE = ["Whole-home interiors", "Architecture & renovation", "Bespoke joinery", "First concept in 48 hours", "Sourced, not specified", "Styled & handed over"];

const SERVICES = [
  { no: "01", t: "Whole-Home Interiors", p: "One vision carried from the entrance through every room — never a set of disconnected spaces.", tags: ["Concept", "Space planning", "FF&E"] },
  { no: "02", t: "Architecture & Renovation", p: "We move walls, raise ceilings and rework light, end-to-end with engineers and authorities.", tags: ["Floor plans", "Permits", "Build"] },
  { no: "03", t: "Bespoke Joinery & Stone", p: "Cabinetry, kitchens and stonework drawn to the millimetre and made by our own makers.", tags: ["Millwork", "Marble", "Metal"] },
  { no: "04", t: "Styling & Handover", p: "Art, objects and the last warm lamp — styled and handed over, ready to live in.", tags: ["Curation", "Styling", "Reveal"] },
];

const BENEFITS = [
  { i: "✦", t: "48-hour concept", p: "Your real rooms rendered before a single thing moves." },
  { i: "◈", t: "One accountable team", p: "Design, build and styling, all under a single roof." },
  { i: "❖", t: "Bespoke, never bought", p: "Joinery and stone made to your millimetre, not a catalogue." },
  { i: "✶", t: "Built & handed over", p: "We style it, light it, and hand you the keys." },
];

const FEATURES = [
  { n: "01", t: "Photoreal 3D renders", p: "Your actual rooms, not generic moodboards." },
  { n: "02", t: "Material library access", p: "Feel the stone, timber and finish in person." },
  { n: "03", t: "Live project schedule", p: "A room-by-room timeline you can check anytime." },
  { n: "04", t: "In-house joinery", p: "Our own makers hold every piece to the drawing." },
  { n: "05", t: "Authority approvals", p: "Permits and inspections handled end to end." },
  { n: "06", t: "White-glove handover", p: "Styled, photographed and ready to live in." },
];

const STEPS = [
  { n: "الأول", t: "Listen", p: "We walk your space and learn how you actually live." },
  { n: "الثاني", t: "Envision", p: "A first concept in your real rooms within 48 hours." },
  { n: "الثالث", t: "Craft", p: "Bespoke joinery and sourced stone, made to the drawing." },
  { n: "الرابع", t: "Reveal", p: "We build, style and light — then hand you the keys." },
];

const G = "/design25/gallery";

const WORK = [
  { src: `${G}/living-marble.jpg`, tag: "Penthouse · Downtown Dubai", t: "Al Menara" },
  { src: `${G}/bedroom-canopy.jpg`, tag: "Villa · Emirates Hills", t: "Al Zubara" },
  { src: `${G}/spa-bath.jpg`, tag: "Penthouse · Bluewaters Island", t: "Al Nur" },
  { src: `${G}/study-library.jpg`, tag: "Apartment · DIFC", t: "Al Qasr" },
  { src: `${G}/kitchen-marble.jpg`, tag: "Villa · Palm Jumeirah", t: "Al Reem" },
  { src: `${G}/dining-arched.jpg`, tag: "Villa · Al Barari", t: "Al Maha" },
  { src: `${G}/living-fireplace.jpg`, tag: "Apartment · Jumeirah Bay", t: "Al Sahel" },
  { src: `${G}/grand-stair.jpg`, tag: "Villa · Dubai Hills", t: "Al Dana" },
];

const GALLERY = [
  { src: `${G}/home-cinema.jpg`, t: "Al Anbar", tag: "Palm Jumeirah" },
  { src: `${G}/wine-cellar.jpg`, t: "Al Murjan", tag: "Jumeirah Bay" },
  { src: `${G}/terrace-view.jpg`, t: "Al Yasmin", tag: "Al Barari" },
  { src: `${G}/dining-oak.jpg`, t: "Al Fanar", tag: "Emirates Hills" },
  { src: `${G}/living-lounge.jpg`, t: "Al Naseem", tag: "Downtown Dubai" },
  { src: `${G}/dining-pendant.jpg`, t: "Al Waha", tag: "Dubai Hills" },
  { src: `${G}/bath-vanity.jpg`, t: "Al Rimal", tag: "District One" },
  { src: `${G}/arched-hall.jpg`, t: "Al Falak", tag: "Bluewaters Island" },
  { src: `${G}/dressing-detail.jpg`, t: "Al Joud", tag: "DIFC" },
  { src: `${G}/bedroom-suite.jpg`, t: "Al Badr", tag: "City Walk" },
  { src: `${G}/wood-detail.jpg`, t: "Al Sidra", tag: "Tilal Al Ghaf" },
  { src: `${G}/dining-gallery.jpg`, t: "Al Hadiqa", tag: "Jumeirah" },
];

const STATS = [
  { to: 18, suf: "yrs", lab: "Designing in Dubai", dsc: "Since 2008, room by room." },
  { to: 240, suf: "+", lab: "Homes delivered", dsc: "Villas, penthouses, palaces." },
  { to: 14, suf: "", lab: "Design awards", dsc: "Regional & international." },
  { to: 96, suf: "%", lab: "From referral", dsc: "Clients who send us friends." },
];

const QUOTES = [
  { q: "They handed back a home we recognised — only better. Every room finally makes sense.", n: "Layla Al-Mansoori", r: "Villa · Emirates Hills", img: "/design23/people/p1.jpg" },
  { q: "The 48-hour concept sold us. Seeing our actual rooms rendered made it feel safe.", n: "James Whitfield", r: "Penthouse · Downtown", img: "/design23/people/p2.jpg" },
  { q: "Bespoke joinery you can't buy anywhere. The craft is on another level.", n: "Priya Nair", r: "Apartment · DIFC", img: "/design23/people/p3.jpg" },
];

const TIERS = [
  { name: "Concept", sub: "A clear, buildable vision to run with.", price: "$8k", unit: "/ project", feats: ["Full design concept board", "Space plan & 3D render", "Material & finish schedule", "Lighting plan", "One revision round"], cta: "Start with Concept", feat: false },
  { name: "Signature", sub: "Designed and delivered, end to end.", price: "$45k", unit: "+ / home", feats: ["Everything in Concept", "Whole-home design", "Bespoke joinery & stone", "Procurement & sourcing", "Site & trade management", "Styling & handover"], cta: "Book a consultation", feat: true },
  { name: "Bespoke", sub: "Architecture & interiors as one commission.", price: "POA", unit: "by enquiry", feats: ["Everything in Signature", "Architecture & structure", "Authority approvals", "Custom commissions & art", "Dedicated project lead", "White-glove aftercare"], cta: "Enquire privately", feat: false },
];

const FAQ = [
  { q: "How fast do we see a first concept?", a: "Within 48 hours of our first walkthrough you'll see an initial concept rendered into your actual rooms — palette, materials and light. A real direction, not a generic moodboard." },
  { q: "Do you handle the build, or only the design?", a: "Both. With Signature and Bespoke we manage every trade, supplier and authority approval end to end, with one accountable team from first sketch to final styling." },
  { q: "Can you work with my existing furniture and art?", a: "Absolutely. We catalogue what you love and design around it, blending heirloom and commissioned pieces so the home feels collected over time, not bought in a weekend." },
  { q: "How long does a whole-home project take?", a: "Typically four to nine months depending on structural work. You get a room-by-room timeline at kickoff and a live schedule you can check at any point." },
  { q: "Where do you work?", a: "We're based in Al Quoz, Dubai and work across the UAE. For the right commission we travel — ask us about projects beyond the Emirates." },
];

const FOOT_COLS = [
  { h: "Studio", links: ["Our story", "The team", "Awards & press", "Careers", "Journal"] },
  { h: "Services", links: ["Whole-home interiors", "Architecture", "Bespoke joinery", "Styling & handover"] },
  { h: "Connect", links: ["Book a consultation", "Visit the atelier", "Instagram", "Pinterest", "LinkedIn"] },
];

function clamp(v: number, a = 0, b = 1) { return Math.min(b, Math.max(a, v)); }

export default function Site() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const [mob, setMob] = useState(false);
  const [cookie, setCookie] = useState(true);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cu: Array<() => void> = [];
    const coarse = window.matchMedia("(hover:none),(pointer:coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nav = root.querySelector<HTMLElement>(".nav");
    const prog = root.querySelector<HTMLElement>(".progress");
    const pars = reduce ? [] : Array.from(root.querySelectorAll<HTMLElement>(".par"));

    const onScroll = () => {
      const y = window.scrollY;
      if (prog) prog.style.transform = `scaleX(${clamp(y / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1))})`;
      nav?.classList.toggle("solid", y > 60);
      const vh = window.innerHeight;
      for (const el of pars) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const mid = r.top + r.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(mid * -0.06).toFixed(1)}px`);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cu.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); });

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    root.querySelectorAll(".rv,.rv2,.rv3,.step,.stg,.imgrv").forEach((el) => io.observe(el));
    cu.push(() => io.disconnect());

    const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const navIo = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = (e.target as HTMLElement).id;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    }), { rootMargin: "-45% 0px -45% 0px" });
    ["intro", "services", "process", "work", "pricing", "contact"].forEach((id) => {
      const s = root.querySelector(`#${id}`); if (s) navIo.observe(s);
    });
    cu.push(() => navIo.disconnect());

    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const to = parseFloat(el.dataset.to || "0"); const suf = el.dataset.suf || "";
      let s = 0; const dur = 1600;
      const stepf = (t: number) => { if (!s) s = t; const pr = Math.min((t - s) / dur, 1); const e2 = 1 - Math.pow(1 - pr, 3); el.innerHTML = `${Math.round(to * e2)}<span class="suf">${suf}</span>`; if (pr < 1) requestAnimationFrame(stepf); };
      requestAnimationFrame(stepf); cio.unobserve(el);
    }), { threshold: 0.6 });
    root.querySelectorAll<HTMLElement>(".num").forEach((el) => cio.observe(el));
    cu.push(() => cio.disconnect());

    if (!coarse) {
      const cur = root.querySelector<HTMLElement>(".cur");
      let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
      const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
      const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (cur) cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
      const over = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,input,textarea,select,.aq")) cur?.classList.add("big"); };
      const out = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,.magnetic,input,textarea,select,.aq")) cur?.classList.remove("big"); };
      window.addEventListener("mousemove", mv); root.addEventListener("mouseover", over); root.addEventListener("mouseout", out);
      raf = requestAnimationFrame(loop);
      cu.push(() => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", mv); root.removeEventListener("mouseover", over); root.removeEventListener("mouseout", out); });

      if (!reduce) {
        const mags = Array.from(root.querySelectorAll<HTMLElement>(".magnetic"));
        const mh = mags.map((m) => {
          const mm = (e: MouseEvent) => { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`; };
          const ml = () => { m.style.transform = ""; };
          m.addEventListener("mousemove", mm); m.addEventListener("mouseleave", ml); return { m, mm, ml };
        });
        cu.push(() => mh.forEach(({ m, mm, ml }) => { m.removeEventListener("mousemove", mm); m.removeEventListener("mouseleave", ml); }));
      }
    }

    const anchor = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return; const id = a.getAttribute("href"); if (!id || id === "#") return;
      const el = root.querySelector<HTMLElement>(id); if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: reduce ? "auto" : "smooth" });
      setMob(false);
    };
    root.addEventListener("click", anchor); cu.push(() => root.removeEventListener("click", anchor));

    root.querySelectorAll<HTMLFormElement>("[data-form]").forEach((f) => {
      const sub = (e: Event) => { e.preventDefault(); const b = f.querySelector<HTMLButtonElement>("button[type=submit]"); if (!b) return; b.textContent = "Sending…"; b.disabled = true; window.setTimeout(() => { b.textContent = b.dataset.done || "✓ Thank you — we'll be in touch"; b.classList.add("ok"); }, 1200); };
      f.addEventListener("submit", sub); cu.push(() => f.removeEventListener("submit", sub));
    });

    return () => cu.forEach((fn) => fn());
  }, []);

  return (
    <div className="d25" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Marcellus&display=swap');${D25_CSS}` }} />
      <div className="cur" aria-hidden />
      <div className="progress" aria-hidden />

      {/* ——— NAV ——— */}
      <nav className="nav">
        <div className="nav-in">
          <a href="#top" className="logo magnetic"><span className="lw">Marquis<i>.</i>Living</span><small>Dubai interior house</small></a>
          <ul className="nav-links">{NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          <a href="#contact" className="nav-cta magnetic">Book a consultation</a>
          <button className="burger" aria-label="Menu" onClick={() => setMob((v) => !v)}><span /><span /><span /></button>
        </div>
      </nav>
      <div className={`mob${mob ? " open" : ""}`}>
        {NAV.map((l) => <a key={l.href} href={l.href} onClick={() => setMob(false)}>{l.label}</a>)}
        <a href="#contact" onClick={() => setMob(false)}>Book a <em>consultation</em></a>
      </div>

      <span id="top" />

      {/* ——— 1 · HERO (scroll-scrub from the Gulshan Dynasty 4K tour) ——— */}
      <ScrubHero />

      {/* trust strip */}
      <div className="strip" aria-hidden>
        <div className="marq">
          {[0, 1].map((k) => <span key={k}>{MARQUEE.map((m, i) => <span key={i}>{m}<b>✦</b></span>)}</span>)}
        </div>
      </div>

      {/* ——— 2 · INTRODUCTION ——— */}
      <section className="pad" id="intro">
        <div className="wrap mani">
          <div className="mani-copy">
            <span className="ey rv">Our belief</span>
            <p className="big rv2" style={{ marginTop: 18 }}>A home should feel <em>inevitable</em> — as if it could only ever have been this way. We don&apos;t decorate rooms; we resolve the whole house into one calm composition that fits the life inside it.</p>
            <p className="mani-body rv2">For eighteen years we&apos;ve worked the way the best homes are made — slowly, attentively, and as one team. Architecture, interiors, joinery and styling all answer to a single vision, so nothing feels added on and everything feels considered. Walls move, light is reworked, and every material is chosen in person rather than specified from a catalogue.</p>
            <p className="mani-body rv2">That patience is what you feel when you walk in. Proportions sit right, storage disappears into the joinery, and the rooms flow from one to the next without a seam. We hand back a house that holds the way you actually live — quiet where it should be quiet, generous where it matters, and finished down to the last grain of stone.</p>
            <ul className="mani-points rv2">
              <li><b>One studio</b><span>Design, build &amp; styling under a single, accountable roof.</span></li>
              <li><b>Made, not bought</b><span>Bespoke joinery and stone drawn to your millimetre.</span></li>
            </ul>
            <div className="by rv3">
              <img src="/design23/people/p4.jpg" alt="Yousef Haddad" />
              <div><b>Yousef Haddad</b><span>Founder &amp; Principal Designer</span></div>
            </div>
          </div>
          <figure className="mani-fig rv2 par">
            <img src="/design23/products/p2.jpeg" alt="A considered Marquis Living study" />
          </figure>
        </div>
      </section>

      {/* ——— 3 · FEATURED SERVICES ——— */}
      <section className="pad light" id="services">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48 }}>
            <span className="ey rv">What we do</span>
            <h2 className="rv2">Everything, under <em>one roof.</em></h2>
            <p className="rv2">Four disciplines, one accountable team — from first sketch to the last warm lamp.</p>
          </div>
          <div className="svc stg">
            {SERVICES.map((s) => (
              <div className="cell" key={s.no}>
                <span className="arr">↗</span>
                <div className="no">{s.no}</div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
                <ul>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 4 · BENEFITS ——— */}
      <section className="pad" id="benefits">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48 }}>
            <span className="ey rv">Why Marquis</span>
            <h2 className="rv2">The difference you&apos;ll <em>feel.</em></h2>
          </div>
          <div className="benefits stg">
            {BENEFITS.map((b) => (
              <div className="benefit" key={b.t}>
                <div className="bi">{b.i}</div>
                <h3>{b.t}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 5 · FEATURES ——— */}
      <section className="pad light" id="features">
        <div className="wrap feat-split">
          <figure className="feat-fig imgrv"><img src="/design23/products/p3.jpeg" alt="Warm stone and bespoke joinery in a Marquis Living kitchen" /></figure>
          <div>
            <span className="ey rv">What&apos;s included</span>
            <h2 className="head rv2" style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: "clamp(19px,2.3vw,29px)", lineHeight: 1.12, marginTop: 14 }}>Inside every <em style={{ color: "var(--accent2)" }}>commission.</em></h2>
            <ul className="feat-list rv2">
              {FEATURES.map((f) => (
                <li key={f.n}><span className="fn">{f.n}</span><div><b>{f.t}</b><span>{f.p}</span></div></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— 6 · PROCESS ——— */}
      <section className="pad" id="process">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48 }}>
            <span className="ey rv">How it works</span>
            <h2 className="rv2">From first walk to <em>final light.</em></h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}><div className="n">{s.n}</div><h3>{s.t}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 7 · PORTFOLIO ——— */}
      <section className="pad" id="work" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48 }}>
            <span className="ey rv">Selected work</span>
            <h2 className="rv2">Real Dubai rooms, <em>down to the stone.</em></h2>
            <p className="rv2">Homes we&apos;ve designed and built. Hover to lean in.</p>
          </div>
          <div className="pf stg">
            {WORK.map((w) => (
              <figure className="card" key={w.t}>
                <img src={w.src} alt={w.t} loading="lazy" />
                <figcaption><div className="tag">{w.tag}</div><div className="tt">{w.t}</div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— GALLERY ——— */}
      <section className="pad" id="gallery" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head" style={{ marginBottom: 40 }}>
            <span className="ey rv">The spaces</span>
            <h2 className="rv2">Room by room, <em>considered.</em></h2>
            <p className="rv2">A walk through the details — from the grand stair to the quietest corner.</p>
          </div>
          <div className="gallery-grid stg">
            {GALLERY.map((g) => (
              <figure className="gcard" key={g.t}>
                <img src={g.src} alt={g.t} loading="lazy" />
                <figcaption><div className="gtag">{g.tag}</div><div className="gtt">{g.t}</div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 8 · STATISTICS ——— */}
      <section className="pad light" id="stats">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48 }}>
            <span className="ey rv">By the numbers</span>
            <h2 className="rv2">Eighteen years, <em>quietly.</em></h2>
          </div>
          <div className="stats stg">
            {STATS.map((s) => (
              <div className="stat" key={s.lab}>
                <div className="num" data-to={s.to} data-suf={s.suf}>0</div>
                <div className="lab">{s.lab}</div>
                <div className="dsc">{s.dsc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 9 · TESTIMONIALS ——— */}
      <section className="pad" id="voices">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48 }}>
            <span className="ey rv">In their words</span>
            <h2 className="rv2">Clients who send us <em>their friends.</em></h2>
          </div>
          <div className="quotes stg">
            {QUOTES.map((q) => (
              <div className="quote" key={q.n}>
                <div className="stars">★★★★★</div>
                <blockquote>“{q.q}”</blockquote>
                <div className="who"><img src={q.img} alt={q.n} loading="lazy" /><div><b>{q.n}</b><span>{q.r}</span></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CASE STUDY (scroll-scrub transformation: broken → luxury) ——— */}
      <ScrubTransform />

      {/* ——— PRICING ——— */}
      <section className="pad light" id="pricing">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 48, maxWidth: 680 }}>
            <span className="ey rv">Ways to work with us</span>
            <h2 className="rv2">Pick where to <em>begin.</em></h2>
            <p className="rv2">Transparent starting points. Every project is scoped to your home — these are where conversations start.</p>
          </div>
          <div className="tiers stg">
            {TIERS.map((t) => (
              <div className={`tier${t.feat ? " feat" : ""}`} key={t.name}>
                {t.feat && <span className="badge">Most chosen</span>}
                <div className="tname">{t.name}</div>
                <div className="tsub">{t.sub}</div>
                <div className="price">{t.price} <small>{t.unit}</small></div>
                <ul>{t.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#contact" className="tbtn magnetic">{t.cta}</a>
              </div>
            ))}
          </div>
          <p className="tier-note rv">Not sure which fits? <a href="#contact" style={{ color: "var(--accent2)", borderBottom: "1px solid currentColor" }}>Tell us about your space.</a></p>
        </div>
      </section>

      {/* ——— 14 · FAQ ——— */}
      <section className="pad" id="faq">
        <div className="wrap faqwrap">
          <div className="head" style={{ position: "sticky", top: 100 }}>
            <span className="ey rv">Good to know</span>
            <h2 className="rv2">Questions, <em>answered.</em></h2>
            <p className="rv2">Still wondering? <a href="#contact" style={{ color: "var(--accent2)", borderBottom: "1px solid currentColor" }}>Just ask us.</a></p>
          </div>
          <div className="acc rv2">
            {FAQ.map((f, i) => (
              <div className={`ai${open === i ? " open" : ""}`} key={i}>
                <button className="aq" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{f.q}<span className="ic" aria-hidden /></button>
                <div className="aa" style={{ maxHeight: open === i ? 300 : 0 }}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CALL TO ACTION (static banner) ——— */}
      <section className="cta">
        <div className="cta-bg"><img src="/design23/gallery/bedroom.png" alt="" /></div>
        <div className="cta-in wrap">
          <h2 className="rv">Your home is waiting to <em>feel like yours.</em></h2>
          <p className="rv2">One walkthrough, one 48-hour concept, and you&apos;ll see it. No obligation — just the first honest look at what your space could become.</p>
          <div className="cta-row rv2">
            <a href="#contact" className="btn-fill magnetic">Book a consultation <span>→</span></a>
            <a href="#work" className="btn-ghost">Browse the work</a>
          </div>
        </div>
      </section>

      {/* ——— 16 · CONTACT ——— */}
      <section className="pad" id="contact">
        <div className="wrap contact-grid">
          <div>
            <span className="ey rv">Start your project</span>
            <h2 className="ctitle rv2">Tell us about <em>your space.</em></h2>
            <form className="form" data-form>
              <div className="form-row">
                <div className="ff"><input id="d25n" type="text" placeholder=" " required /><label htmlFor="d25n">Your name</label></div>
                <div className="ff"><input id="d25e" type="email" placeholder=" " required /><label htmlFor="d25e">Email</label></div>
              </div>
              <div className="form-row">
                <div className="ff sel"><label htmlFor="d25room">Scope</label><select id="d25room" defaultValue="Whole Home">{["Whole Home", "Single Room", "Kitchen & Dining", "Master Suite", "Renovation", "Architecture + Interiors"].map((r) => <option key={r}>{r}</option>)}</select></div>
                <div className="ff sel"><label htmlFor="d25b">Budget</label><select id="d25b" defaultValue="Exploring">{["Exploring", "$25k – $75k", "$75k – $250k", "$250k+"].map((b) => <option key={b}>{b}</option>)}</select></div>
              </div>
              <div className="ff"><textarea id="d25m" rows={3} placeholder=" " /><label htmlFor="d25m">Anything you&apos;d love</label></div>
              <button type="submit" className="submit magnetic" data-done="✓ Got it — we'll be in touch">Request my design brief ✦</button>
            </form>
          </div>
          <aside className="contact-aside rv2">
            <div className="row"><span>The atelier</span><b>Alserkal Avenue, Al Quoz 1<br />Dubai, United Arab Emirates</b></div>
            <div className="row"><span>Hours</span><b>Mon–Sat · 10am – 7pm<br />Sunday · by appointment</b></div>
            <div className="row"><span>Talk to us</span><b><a href="mailto:hello@marquisliving.ae">hello@marquisliving.ae</a><br /><a href="tel:+97145550142">+971 4 555 0142</a></b></div>
            <div className="row" style={{ borderBottom: 0 }}><span>Response time</span><b>We reply within one working day.</b></div>
          </aside>
        </div>
      </section>

      {/* ——— 17 · FOOTER ——— */}
      <footer>
        <div className="wrap">
          <div className="foot-news">
            <div>
              <h3>The quiet letter.</h3>
              <p>One considered email a month — a finished home, a material we love. No noise.</p>
            </div>
            <form data-form>
              <input type="email" placeholder="Your email" required aria-label="Email" />
              <button type="submit" data-done="✓ Subscribed">Subscribe</button>
            </form>
          </div>
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#top" className="logo"><span className="lw">Marquis<i>.</i>Living</span></a>
              <p>Dubai&apos;s interior design house. Homes that hold the way you live — room by room, down to the last grain of stone.</p>
            </div>
            {FOOT_COLS.map((c) => (
              <div className="foot-col" key={c.h}><h5>{c.h}</h5>{c.links.map((l) => <a href="#contact" key={l}>{l}</a>)}</div>
            ))}
          </div>
          <div className="foot-bot">
            <span>© 2026 Marquis Living — concept experience · design 25 “Meridian”</span>
            <div className="socials"><a href="#top">Instagram</a><a href="#top">Pinterest</a><a href="#top">LinkedIn</a></div>
          </div>
        </div>
      </footer>

      {cookie && (
        <div className="cookie">
          <p><b>A note on cookies.</b> We use a few to understand how the site is used and make your visit smoother. No noise, no resale.</p>
          <div className="ck-row">
            <button className="ck-ok" onClick={() => setCookie(false)}>Accept</button>
            <button className="ck-no" onClick={() => setCookie(false)}>Essential only</button>
          </div>
        </div>
      )}
    </div>
  );
}
