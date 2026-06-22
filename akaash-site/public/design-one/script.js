/* ============================================================
   HAVEN — scroll-driven house walkthrough engine
   ============================================================ */
(function () {
  'use strict';

  /* ---------- config ---------- */
  const FRAME_COUNT = 240;
  const FRAME_PATH  = (i) => `assets/frames/frame_${String(i).padStart(4, '0')}.jpg`;

  // chapters in scroll-progress space (0..1) — aligned to the actual
  // rooms in the walkthrough video (240 frames). p = (frame-1)/239.
  const CHAPTERS = [
    { key: 'exterior', in: 0.00, out: 0.11, fade: 0.04 },  // frames 1–40
    { key: 'foyer',    in: 0.155, out: 0.205, fade: 0.035 }, // frames ~38–50
    { key: 'living',   in: 0.235, out: 0.325, fade: 0.04 },  // frames ~57–79
    { key: 'kitchen',  in: 0.350, out: 0.450, fade: 0.04 },  // frames ~85–108
    { key: 'bedroom',  in: 0.525, out: 0.620, fade: 0.04 },  // frames ~126–149
    { key: 'dressing', in: 0.650, out: 0.705, fade: 0.035 }, // frames ~156–169
    { key: 'bath',     in: 0.730, out: 0.815, fade: 0.04 },  // frames ~175–196
    { key: 'study',    in: 0.840, out: 0.890, fade: 0.035 }, // frames ~202–214
    { key: 'lounge',   in: 0.905, out: 0.950, fade: 0.035 }, // frames ~217–228
    { key: 'terrace',  in: 0.965, out: 1.01, fade: 0.035 },  // frames ~231–240
  ];

  // room recognition map (concierge) — thresholds follow the video
  const ROOMS = [
    { until: 0.14, name: 'The Exterior',     ask: 'Love this style? I can design every room inside for you.',      target: 'Whole Home',        cta: 'Yes, design it' },
    { until: 0.225, name: 'The Grand Foyer', ask: 'Detected a double-height entrance. Want a statement arrival?',  target: 'Entrance & Foyer',  cta: 'Design it' },
    { until: 0.345, name: 'The Living Room', ask: 'Detected a living room. Want a bespoke design for this space?', target: 'Living Room',       cta: 'Design it' },
    { until: 0.465, name: 'Dining & Kitchen',ask: 'Detected an open kitchen. Shall I plan the island & joinery?',  target: 'Kitchen & Dining',  cta: 'Design it' },
    { until: 0.525, name: 'The Gallery Hall',ask: 'Detected an art corridor. Want a curated gallery wall?',        target: 'Whole Home',        cta: 'Design it' },
    { until: 0.645, name: 'The Master Suite',ask: 'Detected a bedroom. Shall I craft a restful interior for it?',  target: 'Master Bedroom',    cta: 'Design it' },
    { until: 0.715, name: 'The Dressing Room',ask: 'Detected a walk-in wardrobe. Want bespoke lit joinery?',       target: 'Dressing Room',     cta: 'Design it' },
    { until: 0.825, name: 'The Spa Bathroom',ask: 'Detected a spa bathroom. Want a custom stone & light plan?',    target: 'Spa Bathroom',      cta: 'Design it' },
    { until: 0.905, name: 'The Study',       ask: 'Detected a library study. Want a focused work retreat?',        target: 'Study & Library',   cta: 'Design it' },
    { until: 0.965, name: 'The Lounge',      ask: 'Detected a games lounge. Want a cinema & games plan?',          target: 'Games Lounge',      cta: 'Design it' },
    { until: 1.01, name: 'The Terrace',      ask: 'Detected an outdoor terrace. Ready to design your whole home?', target: 'Whole Home',        cta: 'Design my home' },
  ];

  /* ---------- elements ---------- */
  const canvas   = document.getElementById('frameCanvas');
  const ctx      = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const story    = document.getElementById('story');
  const overlays = document.getElementById('overlays');
  const chapterEls = Array.from(document.querySelectorAll('.chapter'));
  const railDots = Array.from(document.querySelectorAll('.rail__dot'));
  const concierge     = document.getElementById('concierge');
  const conciergeRoom = document.getElementById('conciergeRoom');
  const conciergeAsk  = document.getElementById('conciergeAsk');
  const conciergeBtn  = document.getElementById('conciergeBtn');
  const preloader   = document.getElementById('preloader');
  const preFill     = document.getElementById('preloaderFill');
  const prePct      = document.getElementById('preloaderPct');

  /* ---------- state ---------- */
  const images = new Array(FRAME_COUNT);
  let imgW = 1280, imgH = 720;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cw = 0, ch = 0;
  let curFrame = 0;     // smoothed (float)
  let targetFrame = 0;  // from scroll
  let ready = false;

  /* ---------- canvas sizing (cover-fit) ---------- */
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = canvas.clientWidth;
    ch = canvas.clientHeight;
    canvas.width  = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    lastDrawn = -1;                      // force a repaint at the new size
    drawFrame(Math.round(curFrame));
  }

  function drawFrame(i) {
    const img = images[clamp(i, 0, FRAME_COUNT - 1)];
    if (!img || !img.complete) return;
    const scale = Math.max(cw / imgW, ch / imgH);
    const w = imgW * scale, h = imgH * scale;
    const x = (cw - w) / 2, y = (ch - h) / 2;
    ctx.fillStyle = '#000';
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

  // push current progress into the UI (overlays / concierge / rail)
  function updateUI(p) {
    updateOverlays(p);
    updateConcierge(p);
    updateRail(p);
  }

  /* ---------- overlays / chapters ---------- */
  function windowOpacity(p, c) {
    // trapezoid: fade in over [in-fade, in], full [in, out], fade out [out, out+fade]
    if (p < c.in - c.fade || p > c.out + c.fade) return 0;
    if (p < c.in)  return (p - (c.in - c.fade)) / c.fade;
    if (p > c.out) return 1 - (p - c.out) / c.fade;
    return 1;
  }

  function updateOverlays(p) {
    chapterEls.forEach((el) => {
      const c = CHAPTERS.find((x) => x.key === el.dataset.chapter);
      const o = c ? windowOpacity(p, c) : 0;
      el.style.opacity = o.toFixed(3);
      // subtle parallax rise
      const rise = (1 - o) * 26;
      const base = el.classList.contains('chapter--hero') ? '-46%'
                 : el.classList.contains('chapter--center') ? '0' : '-50%';
      const tx = el.classList.contains('chapter--center') ? 'translate(-50%,' : 'translateY(';
      if (el.classList.contains('chapter--center')) {
        el.style.transform = `translate(-50%, calc(${0}px + ${rise}px))`;
      } else if (el.classList.contains('chapter--hero')) {
        el.style.transform = `translateY(calc(-46% + ${rise}px))`;
      } else {
        el.style.transform = `translateY(calc(-50% + ${rise}px))`;
      }
      el.classList.toggle('is-active', o > 0.5);
    });
  }

  /* ---------- concierge ---------- */
  let lastRoom = -1;
  function updateConcierge(p) {
    concierge.classList.toggle('is-visible', p > 0.015 && p < 0.995);
    let idx = ROOMS.findIndex((r) => p < r.until);
    if (idx === -1) idx = ROOMS.length - 1;
    if (idx === lastRoom) return;
    lastRoom = idx;
    const r = ROOMS[idx];
    // small fade swap
    conciergeRoom.style.opacity = '0';
    conciergeAsk.style.opacity = '0';
    setTimeout(() => {
      conciergeRoom.textContent = r.name;
      conciergeAsk.textContent  = r.ask;
      conciergeBtn.textContent  = r.cta;
      conciergeBtn.dataset.room = r.target;
      conciergeRoom.style.transition = conciergeAsk.style.transition = 'opacity .35s ease';
      conciergeRoom.style.opacity = '1';
      conciergeAsk.style.opacity = '1';
    }, 120);
  }

  /* ---------- rail ---------- */
  function updateRail(p) {
    let active = 0;
    railDots.forEach((d, i) => {
      if (p >= parseFloat(d.dataset.go) - 0.12) active = i;
    });
    railDots.forEach((d, i) => d.classList.toggle('is-on', i === active));
  }
  function goToProgress(p) {
    const scrollable = story.offsetHeight - window.innerHeight;
    const top = story.offsetTop + clamp(p, 0, 1) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  // rail dots + any nav link carrying a data-go target jump into the walkthrough
  document.querySelectorAll('[data-go]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A') e.preventDefault();
      goToProgress(parseFloat(el.dataset.go));
    });
  });

  /* ---------- render loop (one rAF drives everything) ---------- */
  // frame-rate-independent exponential smoothing: identical feel on 60Hz & 120Hz.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SMOOTH = reduceMotion ? 1e3 : 7.5;   // higher = snappier, lower = floatier
  let lastDrawn = -1, lastP = -1, lastT = 0;
  function tick(now) {
    const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
    lastT = now;

    const p = getProgress();
    if (p !== lastP) { updateUI(p); lastP = p; }   // touch the DOM only when progress moves
    targetFrame = p * (FRAME_COUNT - 1);

    curFrame += (targetFrame - curFrame) * (1 - Math.exp(-SMOOTH * dt));
    if (Math.abs(targetFrame - curFrame) < 0.02) curFrame = targetFrame;

    const f = Math.round(curFrame);
    if (f !== lastDrawn) { drawFrame(f); lastDrawn = f; }   // skip redundant redraws
    requestAnimationFrame(tick);
  }

  /* ---------- preloading ---------- */
  function preload() {
    let loaded = 0;
    // priority: first frame instantly, then sequential
    const order = [];
    for (let i = 1; i <= FRAME_COUNT; i++) order.push(i);

    function tally() {
      loaded++;
      const pct = Math.round((loaded / FRAME_COUNT) * 100);
      preFill.style.width = pct + '%';
      prePct.textContent = pct;
      if (loaded === FRAME_COUNT) finishPreload();
    }
    function loadOne(n) {
      const img = new Image();
      img.decoding = 'async';
      images[n - 1] = img;
      img.onload = () => {
        if (n === 1) { imgW = img.naturalWidth || 1280; imgH = img.naturalHeight || 720; }
        // decode each frame ahead of time so its first paint never stalls the scroll
        if (img.decode) img.decode().then(tally, tally);
        else tally();
      };
      img.onerror = tally;
      img.src = FRAME_PATH(n);
    }

    // load first frame, draw, then the rest
    loadOne(1);
    const first = images[0];
    first.addEventListener('load', () => { resize(); drawFrame(0); });
    // stagger remaining to keep UI responsive
    let k = 1;
    const batch = () => {
      for (let b = 0; b < 12 && k < order.length; b++, k++) loadOne(order[k]);
      if (k < order.length) requestAnimationFrame(batch);
    };
    batch();
  }

  function finishPreload() {
    if (ready) return;
    ready = true;
    preloader.classList.add('is-done');
    resize();
    updateUI(getProgress());
    requestAnimationFrame(tick);
    // optional deep-link: #go=0.28 jumps to a point in the walkthrough
    const m = /go=([0-9.]+)/.exec(location.hash);
    if (m) {
      const p = clamp(parseFloat(m[1]), 0, 1);
      const scrollable = story.offsetHeight - window.innerHeight;
      window.scrollTo({ top: story.offsetTop + p * scrollable, behavior: 'auto' });
    }
  }

  /* ---------- modal ---------- */
  const modal      = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalForm  = document.getElementById('modalForm');
  const modalDone  = document.getElementById('modalDone');
  const modalDoneRoom = document.getElementById('modalDoneRoom');

  function openModal(room) {
    modalTitle.textContent = `Design your ${room}`;
    modalDoneRoom.textContent = room.toLowerCase();
    modalForm.style.display = '';
    modalDone.classList.remove('is-show');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.body.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-room]');
    if (cta) { openModal(cta.dataset.room); return; }
    if (e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    modalForm.style.display = 'none';
    modalDone.classList.add('is-show');
  });

  // "Book a visit" focuses the contact form rather than the design modal
  const visitBtn = document.getElementById('visitBtn');
  if (visitBtn) {
    visitBtn.addEventListener('click', () => {
      const nameField = document.querySelector('#leadForm input[name="name"]');
      if (nameField) {
        nameField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => nameField.focus({ preventScroll: true }), 450);
      }
    });
  }

  // main contact form
  const leadForm = document.getElementById('leadForm');
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('.form__submit');
    btn.textContent = 'Thank you — brief received ✓';
    btn.style.background = '#7fa36b';
    btn.disabled = true;
  });
  // prefill contact room dropdown when a chapter cta says so via hash? keep simple.

  /* ---------- utils ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ---------- boot ---------- */
  // the rAF loop reads scroll position every frame, so no scroll listener is
  // needed — this avoids doing layout/DOM work on the (bursty) scroll event.
  window.addEventListener('resize', resize, { passive: true });
  preload();

  // safety: if images are cached and onload races, ensure we don't hang
  setTimeout(() => { if (!ready) finishPreload(); }, 9000);
})();
