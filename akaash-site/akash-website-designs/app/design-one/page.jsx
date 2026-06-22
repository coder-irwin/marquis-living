"use client";

import { useEffect } from "react";
import "./design-one.css";

export default function DesignOne() {
  useEffect(() => {
    /* ============================================================
       HAVEN — scroll-driven house walkthrough engine
       (ported verbatim from the static script.js, with React-safe
        cleanup so it tears down correctly on unmount / Strict Mode)
       ============================================================ */
    let disposed = false;
    let rafId = 0;
    let safetyTimer = 0;
    let swapTimer = 0;

    /* ---------- config ---------- */
    const FRAME_COUNT = 240;
    const FRAME_PATH = (i) =>
      `/design-one/assets/frames/frame_${String(i).padStart(4, "0")}.jpg`;

    const CHAPTERS = [
      { key: "exterior", in: 0.0, out: 0.11, fade: 0.04 },
      { key: "foyer", in: 0.155, out: 0.205, fade: 0.035 },
      { key: "living", in: 0.235, out: 0.325, fade: 0.04 },
      { key: "kitchen", in: 0.35, out: 0.45, fade: 0.04 },
      { key: "bedroom", in: 0.525, out: 0.62, fade: 0.04 },
      { key: "dressing", in: 0.65, out: 0.705, fade: 0.035 },
      { key: "bath", in: 0.73, out: 0.815, fade: 0.04 },
      { key: "study", in: 0.84, out: 0.89, fade: 0.035 },
      { key: "lounge", in: 0.905, out: 0.95, fade: 0.035 },
      { key: "terrace", in: 0.965, out: 1.01, fade: 0.035 },
    ];

    const ROOMS = [
      { until: 0.14, name: "The Exterior", ask: "Love this style? I can design every room inside for you.", target: "Whole Home", cta: "Yes, design it" },
      { until: 0.225, name: "The Grand Foyer", ask: "Detected a double-height entrance. Want a statement arrival?", target: "Entrance & Foyer", cta: "Design it" },
      { until: 0.345, name: "The Living Room", ask: "Detected a living room. Want a bespoke design for this space?", target: "Living Room", cta: "Design it" },
      { until: 0.465, name: "Dining & Kitchen", ask: "Detected an open kitchen. Shall I plan the island & joinery?", target: "Kitchen & Dining", cta: "Design it" },
      { until: 0.525, name: "The Gallery Hall", ask: "Detected an art corridor. Want a curated gallery wall?", target: "Whole Home", cta: "Design it" },
      { until: 0.645, name: "The Master Suite", ask: "Detected a bedroom. Shall I craft a restful interior for it?", target: "Master Bedroom", cta: "Design it" },
      { until: 0.715, name: "The Dressing Room", ask: "Detected a walk-in wardrobe. Want bespoke lit joinery?", target: "Dressing Room", cta: "Design it" },
      { until: 0.825, name: "The Spa Bathroom", ask: "Detected a spa bathroom. Want a custom stone & light plan?", target: "Spa Bathroom", cta: "Design it" },
      { until: 0.905, name: "The Study", ask: "Detected a library study. Want a focused work retreat?", target: "Study & Library", cta: "Design it" },
      { until: 0.965, name: "The Lounge", ask: "Detected a games lounge. Want a cinema & games plan?", target: "Games Lounge", cta: "Design it" },
      { until: 1.01, name: "The Terrace", ask: "Detected an outdoor terrace. Ready to design your whole home?", target: "Whole Home", cta: "Design my home" },
    ];

    /* ---------- elements ---------- */
    const canvas = document.getElementById("frameCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const story = document.getElementById("story");
    const chapterEls = Array.from(document.querySelectorAll(".chapter"));
    const railDots = Array.from(document.querySelectorAll(".rail__dot"));
    const concierge = document.getElementById("concierge");
    const conciergeRoom = document.getElementById("conciergeRoom");
    const conciergeAsk = document.getElementById("conciergeAsk");
    const conciergeBtn = document.getElementById("conciergeBtn");
    const preloader = document.getElementById("preloader");
    const preFill = document.getElementById("preloaderFill");
    const prePct = document.getElementById("preloaderPct");

    /* ---------- state ---------- */
    const images = new Array(FRAME_COUNT);
    let imgW = 1280,
      imgH = 720;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0,
      ch = 0;
    let curFrame = 0;
    let targetFrame = 0;
    let ready = false;

    /* ---------- utils ---------- */
    function clamp(v, a, b) {
      return v < a ? a : v > b ? b : v;
    }

    /* ---------- canvas sizing (cover-fit) ---------- */
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

    function drawFrame(i) {
      const img = images[clamp(i, 0, FRAME_COUNT - 1)];
      if (!img || !img.complete) return;
      const scale = Math.max(cw / imgW, ch / imgH);
      const w = imgW * scale,
        h = imgH * scale;
      const x = (cw - w) / 2,
        y = (ch - h) / 2;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    /* ---------- scroll → progress ---------- */
    function getProgress() {
      const rect = story.getBoundingClientRect();
      const scrollable = story.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return clamp(-rect.top / scrollable, 0, 1);
    }

    function updateUI(p) {
      updateOverlays(p);
      updateConcierge(p);
      updateRail(p);
    }

    /* ---------- overlays / chapters ---------- */
    function windowOpacity(p, c) {
      if (p < c.in - c.fade || p > c.out + c.fade) return 0;
      if (p < c.in) return (p - (c.in - c.fade)) / c.fade;
      if (p > c.out) return 1 - (p - c.out) / c.fade;
      return 1;
    }

    function updateOverlays(p) {
      chapterEls.forEach((el) => {
        const c = CHAPTERS.find((x) => x.key === el.dataset.chapter);
        const o = c ? windowOpacity(p, c) : 0;
        el.style.opacity = o.toFixed(3);
        const rise = (1 - o) * 26;
        if (el.classList.contains("chapter--center")) {
          el.style.transform = `translate(-50%, calc(${0}px + ${rise}px))`;
        } else if (el.classList.contains("chapter--hero")) {
          el.style.transform = `translateY(calc(-46% + ${rise}px))`;
        } else {
          el.style.transform = `translateY(calc(-50% + ${rise}px))`;
        }
        el.classList.toggle("is-active", o > 0.5);
      });
    }

    /* ---------- concierge ---------- */
    let lastRoom = -1;
    function updateConcierge(p) {
      concierge.classList.toggle("is-visible", p > 0.015 && p < 0.995);
      let idx = ROOMS.findIndex((r) => p < r.until);
      if (idx === -1) idx = ROOMS.length - 1;
      if (idx === lastRoom) return;
      lastRoom = idx;
      const r = ROOMS[idx];
      conciergeRoom.style.opacity = "0";
      conciergeAsk.style.opacity = "0";
      swapTimer = setTimeout(() => {
        if (disposed) return;
        conciergeRoom.textContent = r.name;
        conciergeAsk.textContent = r.ask;
        conciergeBtn.textContent = r.cta;
        conciergeBtn.dataset.room = r.target;
        conciergeRoom.style.transition = conciergeAsk.style.transition =
          "opacity .35s ease";
        conciergeRoom.style.opacity = "1";
        conciergeAsk.style.opacity = "1";
      }, 120);
    }

    /* ---------- rail ---------- */
    function updateRail(p) {
      let active = 0;
      railDots.forEach((d, i) => {
        if (p >= parseFloat(d.dataset.go) - 0.12) active = i;
      });
      railDots.forEach((d, i) => d.classList.toggle("is-on", i === active));
    }
    function goToProgress(p) {
      const scrollable = story.offsetHeight - window.innerHeight;
      const top = story.offsetTop + clamp(p, 0, 1) * scrollable;
      window.scrollTo({ top, behavior: "smooth" });
    }

    const goEls = Array.from(document.querySelectorAll("[data-go]"));
    const goHandlers = goEls.map((el) => {
      const h = (e) => {
        if (el.tagName === "A") e.preventDefault();
        goToProgress(parseFloat(el.dataset.go));
      };
      el.addEventListener("click", h);
      return [el, h];
    });

    /* ---------- render loop (one rAF drives everything) ---------- */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const SMOOTH = reduceMotion ? 1e3 : 7.5;
    let lastDrawn = -1,
      lastP = -1,
      lastT = 0;
    function tick(now) {
      if (disposed) return;
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
      lastT = now;

      const p = getProgress();
      if (p !== lastP) {
        updateUI(p);
        lastP = p;
      }
      targetFrame = p * (FRAME_COUNT - 1);

      curFrame += (targetFrame - curFrame) * (1 - Math.exp(-SMOOTH * dt));
      if (Math.abs(targetFrame - curFrame) < 0.02) curFrame = targetFrame;

      const f = Math.round(curFrame);
      if (f !== lastDrawn) {
        drawFrame(f);
        lastDrawn = f;
      }
      rafId = requestAnimationFrame(tick);
    }

    /* ---------- preloading ---------- */
    function preload() {
      let loaded = 0;
      const order = [];
      for (let i = 1; i <= FRAME_COUNT; i++) order.push(i);

      function tally() {
        loaded++;
        const pct = Math.round((loaded / FRAME_COUNT) * 100);
        if (preFill) preFill.style.width = pct + "%";
        if (prePct) prePct.textContent = pct;
        if (loaded === FRAME_COUNT) finishPreload();
      }
      function loadOne(n) {
        const img = new Image();
        img.decoding = "async";
        images[n - 1] = img;
        img.onload = () => {
          if (n === 1) {
            imgW = img.naturalWidth || 1280;
            imgH = img.naturalHeight || 720;
          }
          if (img.decode) img.decode().then(tally, tally);
          else tally();
        };
        img.onerror = tally;
        img.src = FRAME_PATH(n);
      }

      loadOne(1);
      const first = images[0];
      first.addEventListener("load", () => {
        if (disposed) return;
        resize();
        drawFrame(0);
      });
      let k = 1;
      const batch = () => {
        if (disposed) return;
        for (let b = 0; b < 12 && k < order.length; b++, k++) loadOne(order[k]);
        if (k < order.length) requestAnimationFrame(batch);
      };
      batch();
    }

    function finishPreload() {
      if (ready || disposed) return;
      ready = true;
      preloader.classList.add("is-done");
      resize();
      updateUI(getProgress());
      rafId = requestAnimationFrame(tick);
      const m = /go=([0-9.]+)/.exec(location.hash);
      if (m) {
        const p = clamp(parseFloat(m[1]), 0, 1);
        const scrollable = story.offsetHeight - window.innerHeight;
        window.scrollTo({
          top: story.offsetTop + p * scrollable,
          behavior: "auto",
        });
      }
    }

    /* ---------- modal ---------- */
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalForm = document.getElementById("modalForm");
    const modalDone = document.getElementById("modalDone");
    const modalDoneRoom = document.getElementById("modalDoneRoom");

    function openModal(room) {
      modalTitle.textContent = `Design your ${room}`;
      modalDoneRoom.textContent = room.toLowerCase();
      modalForm.style.display = "";
      modalDone.classList.remove("is-show");
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeModal() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    function onBodyClick(e) {
      const cta = e.target.closest("[data-room]");
      if (cta) {
        openModal(cta.dataset.room);
        return;
      }
      if (e.target.closest("[data-close]")) closeModal();
    }
    function onKeydown(e) {
      if (e.key === "Escape") closeModal();
    }
    function onModalSubmit(e) {
      e.preventDefault();
      modalForm.style.display = "none";
      modalDone.classList.add("is-show");
    }
    document.body.addEventListener("click", onBodyClick);
    document.addEventListener("keydown", onKeydown);
    modalForm.addEventListener("submit", onModalSubmit);

    /* ---------- "Book a visit" → focus contact form ---------- */
    const visitBtn = document.getElementById("visitBtn");
    function onVisit() {
      const nameField = document.querySelector('#leadForm input[name="name"]');
      if (nameField) {
        nameField.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => nameField.focus({ preventScroll: true }), 450);
      }
    }
    if (visitBtn) visitBtn.addEventListener("click", onVisit);

    /* ---------- main contact form ---------- */
    const leadForm = document.getElementById("leadForm");
    function onLeadSubmit(e) {
      e.preventDefault();
      const btn = leadForm.querySelector(".form__submit");
      btn.textContent = "Thank you — brief received ✓";
      btn.style.background = "#7fa36b";
      btn.disabled = true;
    }
    if (leadForm) leadForm.addEventListener("submit", onLeadSubmit);

    /* ---------- boot ---------- */
    window.addEventListener("resize", resize, { passive: true });
    preload();
    safetyTimer = setTimeout(() => {
      if (!ready) finishPreload();
    }, 9000);

    /* ---------- cleanup ---------- */
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
      clearTimeout(swapTimer);
      window.removeEventListener("resize", resize);
      document.body.removeEventListener("click", onBodyClick);
      document.removeEventListener("keydown", onKeydown);
      goHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      if (modalForm) modalForm.removeEventListener("submit", onModalSubmit);
      if (leadForm) leadForm.removeEventListener("submit", onLeadSubmit);
      if (visitBtn) visitBtn.removeEventListener("click", onVisit);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* ============ PRELOADER ============ */}
      <div className="preloader" id="preloader">
        <div className="preloader__inner">
          <div className="preloader__mark">✦</div>
          <div className="preloader__brand">MARQUIS LIVING</div>
          <div className="preloader__bar">
            <span id="preloaderFill"></span>
          </div>
          <div className="preloader__pct">
            <span id="preloaderPct">0</span>%
          </div>
          <div className="preloader__hint">Preparing your walkthrough</div>
        </div>
      </div>

      {/* ============ FIXED NAV ============ */}
      <header className="nav" id="nav">
        <a className="nav__brand" href="#top">
          <span className="nav__mark">✦</span> MARQUIS LIVING
        </a>
        <nav className="nav__links">
          <a href="#" data-go="0.28">Living</a>
          <a href="#" data-go="0.40">Kitchen</a>
          <a href="#" data-go="0.57">Bedroom</a>
          <a href="#" data-go="0.77">Spa Bath</a>
          <a href="#" data-go="0.99">Terrace</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <a href="#contact" className="nav__cta">Book a consultation</a>
      </header>

      {/* ============ SCROLL-DRIVEN STORY ============ */}
      <main id="top">
        <section className="story" id="story">
          <div className="stage" id="stage">
            <canvas id="frameCanvas"></canvas>
            <div className="stage__vignette"></div>
            <div className="stage__grain"></div>

            {/* Chapter overlays (opacity driven by JS) */}
            <div className="overlays" id="overlays">
              <article className="chapter chapter--hero" data-chapter="exterior">
                <p className="chapter__eyebrow">Marquis Living · Est. 2014</p>
                <h1 className="chapter__title">
                  Walk into<br />a home that<br />
                  <em>feels like you.</em>
                </h1>
                <p className="chapter__lead">
                  Scroll to step through the house, room by room. We&apos;ll meet
                  you in every space.
                </p>
                <div className="scrollcue">
                  <span></span>Scroll to enter
                </div>
              </article>

              <article className="chapter chapter--left" data-chapter="foyer">
                <p className="chapter__eyebrow">01 — The Grand Entrance</p>
                <h2 className="chapter__title">
                  A first<br />breath of light.
                </h2>
                <p className="chapter__lead">
                  A double-height atrium, a floating stone staircase, the garden
                  pulled indoors. The arrival sets the tone for the whole home.
                </p>
                <button className="chapter__cta" data-room="Entrance & Foyer">
                  Design this entrance <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--right" data-chapter="living">
                <p className="chapter__eyebrow">02 — The Living Room</p>
                <h2 className="chapter__title">
                  Where the<br />day unwinds.
                </h2>
                <p className="chapter__lead">
                  Sculptural sofas, a linear fire, light that pools across stone.
                  Living spaces that hold a crowd and a quiet evening alike.
                </p>
                <button className="chapter__cta" data-room="Living Room">
                  Design this living room <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--left" data-chapter="kitchen">
                <p className="chapter__eyebrow">03 — Dining & Kitchen</p>
                <h2 className="chapter__title">
                  Gathered<br />around stone.
                </h2>
                <p className="chapter__lead">
                  A book-matched marble island, a table for ten, chef-grade
                  joinery in smoked oak. The heart of the house, made to host.
                </p>
                <button className="chapter__cta" data-room="Kitchen & Dining">
                  Design this kitchen <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--right" data-chapter="bedroom">
                <p className="chapter__eyebrow">04 — The Master Suite</p>
                <h2 className="chapter__title">
                  A quiet<br />place to land.
                </h2>
                <p className="chapter__lead">
                  A hushed palette, layered textiles, the hillside framed
                  wall-to-wall. The last room you see at night — we make it the
                  calmest.
                </p>
                <button className="chapter__cta" data-room="Master Bedroom">
                  Design this bedroom <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--left" data-chapter="dressing">
                <p className="chapter__eyebrow">05 — The Dressing Room</p>
                <h2 className="chapter__title">
                  Everything<br />in its place.
                </h2>
                <p className="chapter__lead">
                  Walnut joinery, backlit shelving, a glass-topped island for
                  watches and keepsakes. A boutique of your own, off the suite.
                </p>
                <button className="chapter__cta" data-room="Dressing Room">
                  Design this wardrobe <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--right" data-chapter="bath">
                <p className="chapter__eyebrow">06 — The Spa Bathroom</p>
                <h2 className="chapter__title">
                  Marble,<br />steam & silence.
                </h2>
                <p className="chapter__lead">
                  A freestanding soak, book-matched stone, twin vanities under
                  warm halo light. Your private spa, designed around your
                  morning.
                </p>
                <button className="chapter__cta" data-room="Spa Bathroom">
                  Design this bathroom <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--left" data-chapter="study">
                <p className="chapter__eyebrow">07 — The Study</p>
                <h2 className="chapter__title">
                  Room<br />to think.
                </h2>
                <p className="chapter__lead">
                  Floor-to-ceiling library, a solid desk, light from two sides. A
                  quiet corner of the house built for focus and long evenings.
                </p>
                <button className="chapter__cta" data-room="Study & Library">
                  Design this study <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--right" data-chapter="lounge">
                <p className="chapter__eyebrow">08 — The Lounge</p>
                <h2 className="chapter__title">
                  Where<br />evenings linger.
                </h2>
                <p className="chapter__lead">
                  A games table, a cinema wall, the city glittering past the
                  glass. The room where the night keeps going.
                </p>
                <button className="chapter__cta" data-room="Games Lounge">
                  Design this lounge <i>→</i>
                </button>
              </article>

              <article className="chapter chapter--center" data-chapter="terrace">
                <p className="chapter__eyebrow">09 — The Terrace</p>
                <h2 className="chapter__title">
                  The skyline<br />is your last wall.
                </h2>
                <p className="chapter__lead">
                  Indoor-outdoor living, framed for the golden hour. This is where
                  your home opens up to the city.
                </p>
                <button
                  className="chapter__cta chapter__cta--solid"
                  data-room="Whole Home"
                >
                  Design my whole home <i>→</i>
                </button>
              </article>
            </div>

            {/* Progress rail */}
            <div className="rail" id="rail">
              <button className="rail__dot" data-go="0.02" aria-label="Exterior"><span>Exterior</span></button>
              <button className="rail__dot" data-go="0.18" aria-label="Grand Foyer"><span>Foyer</span></button>
              <button className="rail__dot" data-go="0.28" aria-label="Living Room"><span>Living</span></button>
              <button className="rail__dot" data-go="0.40" aria-label="Dining & Kitchen"><span>Kitchen</span></button>
              <button className="rail__dot" data-go="0.57" aria-label="Master Suite"><span>Bedroom</span></button>
              <button className="rail__dot" data-go="0.68" aria-label="Dressing Room"><span>Dressing</span></button>
              <button className="rail__dot" data-go="0.77" aria-label="Spa Bathroom"><span>Spa Bath</span></button>
              <button className="rail__dot" data-go="0.86" aria-label="Study"><span>Study</span></button>
              <button className="rail__dot" data-go="0.93" aria-label="Lounge"><span>Lounge</span></button>
              <button className="rail__dot" data-go="0.99" aria-label="Terrace"><span>Terrace</span></button>
            </div>

            {/* Concierge / room-recognition assistant */}
            <div className="concierge" id="concierge">
              <div className="concierge__avatar">✦</div>
              <div className="concierge__body">
                <p className="concierge__label">Now viewing</p>
                <p className="concierge__room" id="conciergeRoom">The Exterior</p>
                <p className="concierge__ask" id="conciergeAsk">
                  Like the look? I can design the rooms inside for you.
                </p>
              </div>
              <button
                className="concierge__btn"
                id="conciergeBtn"
                data-room="Living Room"
              >
                Yes, design it
              </button>
            </div>
          </div>
        </section>

        {/* ============ STATS BAND ============ */}
        <section className="stats">
          <div className="stats__item"><span className="stats__no">11</span><span className="stats__label">Rooms reimagined</span></div>
          <div className="stats__item"><span className="stats__no">120+</span><span className="stats__label">Homes delivered</span></div>
          <div className="stats__item"><span className="stats__no">2014</span><span className="stats__label">Atelier founded</span></div>
          <div className="stats__item"><span className="stats__no">48h</span><span className="stats__label">To your first concept</span></div>
        </section>

        {/* ============ GALLERY ============ */}
        <section className="gallery" id="gallery">
          <div className="gallery__head">
            <p className="panel__eyebrow">Inside the residence</p>
            <h2 className="panel__title">
              Every room,<br />up close.
            </h2>
            <p className="gallery__intro">
              A closer look at the spaces you just walked through — each one
              designed, styled and finished by the Marquis Living atelier.
            </p>
          </div>
          <div className="gallery__grid">
            <figure className="shot shot--full">
              <img src="/design-one/assets/frames/frame_0001.jpg" alt="Modern villa exterior at dusk" loading="lazy" />
              <figcaption><span className="shot__no">01</span> The Exterior</figcaption>
            </figure>
            <figure className="shot shot--half">
              <img src="/design-one/assets/frames/frame_0045.jpg" alt="Double-height entrance foyer with floating staircase" loading="lazy" />
              <figcaption><span className="shot__no">02</span> Grand Foyer</figcaption>
            </figure>
            <figure className="shot shot--half">
              <img src="/design-one/assets/frames/frame_0075.jpg" alt="Open-plan living room with sectional sofas" loading="lazy" />
              <figcaption><span className="shot__no">03</span> Living Room</figcaption>
            </figure>
            <figure className="shot shot--third">
              <img src="/design-one/assets/frames/frame_0105.jpg" alt="Marble island kitchen in smoked oak" loading="lazy" />
              <figcaption><span className="shot__no">04</span> Kitchen &amp; Dining</figcaption>
            </figure>
            <figure className="shot shot--third">
              <img src="/design-one/assets/frames/frame_0135.jpg" alt="Master bedroom with hillside view" loading="lazy" />
              <figcaption><span className="shot__no">05</span> Master Suite</figcaption>
            </figure>
            <figure className="shot shot--third">
              <img src="/design-one/assets/frames/frame_0165.jpg" alt="Walnut walk-in dressing room" loading="lazy" />
              <figcaption><span className="shot__no">06</span> Dressing Room</figcaption>
            </figure>
            <figure className="shot shot--half">
              <img src="/design-one/assets/frames/frame_0180.jpg" alt="Spa bathroom with freestanding tub and stone wall" loading="lazy" />
              <figcaption><span className="shot__no">07</span> Spa Bathroom</figcaption>
            </figure>
            <figure className="shot shot--half">
              <img src="/design-one/assets/frames/frame_0210.jpg" alt="Home study with floor-to-ceiling library" loading="lazy" />
              <figcaption><span className="shot__no">08</span> The Study</figcaption>
            </figure>
            <figure className="shot shot--half">
              <img src="/design-one/assets/frames/frame_0225.jpg" alt="Games lounge with pool table and cinema wall" loading="lazy" />
              <figcaption><span className="shot__no">09</span> The Lounge</figcaption>
            </figure>
            <figure className="shot shot--half">
              <img src="/design-one/assets/frames/frame_0240.jpg" alt="Rooftop terrace overlooking the city skyline at sunset" loading="lazy" />
              <figcaption><span className="shot__no">10</span> The Terrace</figcaption>
            </figure>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="panel panel--services">
          <p className="panel__eyebrow">What we do</p>
          <h2 className="panel__title">
            Full-home interior design,<br />room by room.
          </h2>
          <div className="grid">
            <article className="card">
              <div className="card__img"><img src="/design-one/assets/frames/frame_0075.jpg" alt="Living room concept and mood" loading="lazy" /></div>
              <span className="card__no">A</span><h3>Concept &amp; mood</h3>
              <p>We translate how you want to live into a material palette, lighting plan and floor layout.</p>
            </article>
            <article className="card">
              <div className="card__img"><img src="/design-one/assets/frames/frame_0165.jpg" alt="Bespoke walnut joinery" loading="lazy" /></div>
              <span className="card__no">B</span><h3>Bespoke joinery</h3>
              <p>Custom millwork, wardrobes and kitchens built to the millimetre for your space.</p>
            </article>
            <article className="card">
              <div className="card__img"><img src="/design-one/assets/frames/frame_0135.jpg" alt="Styled and finished bedroom" loading="lazy" /></div>
              <span className="card__no">C</span><h3>Styling &amp; install</h3>
              <p>Furniture, art and the final 5% of styling that makes a room feel finished.</p>
            </article>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className="panel panel--process">
          <p className="panel__eyebrow">How it works</p>
          <h2 className="panel__title">
            From first scroll<br />to final styling.
          </h2>
          <ol className="steps">
            <li className="step">
              <span className="step__no">01</span>
              <h3>Discovery</h3>
              <p>We learn how you live, room by room — your routines, your collections, the light you love.</p>
            </li>
            <li className="step">
              <span className="step__no">02</span>
              <h3>Concept</h3>
              <p>Within 48 hours you receive a material palette, mood and layout for the spaces you choose.</p>
            </li>
            <li className="step">
              <span className="step__no">03</span>
              <h3>Make</h3>
              <p>Bespoke joinery, lighting and furniture are drawn, sourced and built to the millimetre.</p>
            </li>
            <li className="step">
              <span className="step__no">04</span>
              <h3>Install</h3>
              <p>We deliver, place and style every last detail — then hand you the keys to a finished home.</p>
            </li>
          </ol>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="panel panel--quotes">
          <p className="panel__eyebrow">In their words</p>
          <div className="quotes">
            <figure className="quote">
              <div className="quote__thumb"><img src="/design-one/assets/frames/frame_0135.jpg" alt="Hillside residence bedroom" loading="lazy" /></div>
              <blockquote>&quot;They walked us through the whole house before a single wall moved. By install day it felt exactly like the renders — only warmer.&quot;</blockquote>
              <figcaption><span className="quote__stars">★★★★★</span>Marielle &amp; Tom · Hillside Residence</figcaption>
            </figure>
            <figure className="quote">
              <div className="quote__thumb"><img src="/design-one/assets/frames/frame_0180.jpg" alt="City penthouse spa bathroom" loading="lazy" /></div>
              <blockquote>&quot;The dressing room and spa bath alone changed how our mornings feel. Worth every conversation.&quot;</blockquote>
              <figcaption><span className="quote__stars">★★★★★</span>Priya N. · City Penthouse</figcaption>
            </figure>
            <figure className="quote">
              <div className="quote__thumb"><img src="/design-one/assets/frames/frame_0240.jpg" alt="Coastal villa terrace" loading="lazy" /></div>
              <blockquote>&quot;We picked three rooms to start. We ended up letting Marquis Living do the entire home — and the terrace is now where we live.&quot;</blockquote>
              <figcaption><span className="quote__stars">★★★★★</span>The Alvarez Family · Coastal Villa</figcaption>
            </figure>
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section className="cta-banner">
          <h2 className="cta-banner__title">
            Ready to walk through<br />your own home?
          </h2>
          <button className="cta-banner__btn" data-room="Whole Home">
            Start my design brief ✦
          </button>
        </section>

        {/* ============ CONTACT ============ */}
        <section className="panel panel--contact" id="contact">
          <div className="contact__grid">
            <div className="contact__form">
              <p className="panel__eyebrow">Start your project</p>
              <h2 className="panel__title">
                Tell us about<br />your space.
              </h2>
              <form className="form" id="leadForm">
                <div className="form__row">
                  <label>Your name<input type="text" name="name" placeholder="Jane Doe" required /></label>
                  <label>Email<input type="email" name="email" placeholder="you@email.com" required /></label>
                </div>
                <div className="form__row">
                  <label>Room(s) to design
                    <select name="room" id="formRoom" defaultValue="Whole Home">
                      <option>Whole Home</option>
                      <option>Entrance &amp; Foyer</option>
                      <option>Living Room</option>
                      <option>Kitchen &amp; Dining</option>
                      <option>Master Bedroom</option>
                      <option>Dressing Room</option>
                      <option>Spa Bathroom</option>
                      <option>Study &amp; Library</option>
                      <option>Games Lounge</option>
                      <option>Terrace</option>
                    </select>
                  </label>
                  <label>Budget
                    <select name="budget" defaultValue="Exploring">
                      <option>Exploring</option>
                      <option>$25k – $75k</option>
                      <option>$75k – $200k</option>
                      <option>$200k+</option>
                    </select>
                  </label>
                </div>
                <label className="form__full">Anything you&apos;d love<textarea name="notes" rows="3" placeholder="A warm, light-filled living room with a reading nook…"></textarea></label>
                <button type="submit" className="form__submit">Request my design brief ✦</button>
              </form>
            </div>

            <aside className="visit">
              <figure className="visit__img">
                <img src="/design-one/assets/frames/frame_0045.jpg" alt="Marquis Living atelier entrance" loading="lazy" />
                <figcaption>The atelier · Bel Air</figcaption>
              </figure>
              <div className="visit__body">
                <p className="panel__eyebrow">Visit the atelier</p>
                <h3 className="visit__title">Come see it in person.</h3>
                <p className="visit__copy">
                  Book a private walkthrough of our studio and material library —
                  or invite a designer to your space. We host by appointment six
                  days a week.
                </p>
                <ul className="visit__list">
                  <li><span>Head office</span>14 Mulholland Terrace<br />Los Angeles, CA 90077</li>
                  <li><span>Opening hours</span>Mon–Fri · 9am – 6pm<br />Saturday · by appointment</li>
                  <li><span>Talk to us</span><a href="mailto:hello@marquismanor.studio">hello@marquismanor.studio</a><br /><a href="tel:+13105550142">+1 (310) 555-0142</a></li>
                </ul>
                <button className="visit__btn" id="visitBtn" type="button">
                  Book a visit <i>→</i>
                </button>
              </div>
            </aside>
          </div>
        </section>

        <footer className="footer">
          <div className="footer__brand"><span>✦</span> MARQUIS LIVING</div>
          <p>Marquis Living · Interior Design · hello@marquismanor.studio</p>
          <p className="footer__fine">A scroll-through concept experience.</p>
        </footer>
      </main>

      {/* ============ DESIGN MODAL ============ */}
      <div className="modal" id="modal" aria-hidden="true">
        <div className="modal__backdrop" data-close></div>
        <div className="modal__card" role="dialog" aria-modal="true">
          <button className="modal__x" data-close aria-label="Close">×</button>
          <p className="modal__eyebrow">Bespoke interior</p>
          <h3 className="modal__title" id="modalTitle">Design your Living Room</h3>
          <p className="modal__copy">
            Leave your details and a Marquis Living designer will send a tailored
            concept for this room within 48 hours.
          </p>
          <form className="modal__form" id="modalForm">
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Send me a concept ✦</button>
          </form>
          <div className="modal__done" id="modalDone">
            <div className="modal__check">✓</div>
            <p>Beautiful. We&apos;ll be in touch about your <span id="modalDoneRoom">space</span>.</p>
          </div>
        </div>
      </div>
    </>
  );
}
