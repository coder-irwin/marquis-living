/**
 * Akaash · Design 11 — "Aperture / Daylight" multi-page set for Marquis Manor.
 *
 * A bright, editorial, gallery-white studio site built on one idea:
 * "we draw daylight into space." Light theme throughout (warm bone + ink +
 * a single clay/terracotta accent). Signature interactions:
 *   - a draggable Blueprint -> Render reveal ("watch the line become light")
 *   - a scroll-driven horizontal "Selected Works" gallery
 *   - a magnetic custom cursor + magnetic CTAs
 *   - kinetic split-text hero, scroll-driven counters, and a curtain page load
 *
 * Everything is scoped under `.d11` and injected inline so the design is fully
 * self-contained and isolated from designs 1-10 and the rest of the app.
 */
export const D11_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.d11 {
  --bone:#f3efe7; --bone-2:#ece6da; --paper:#fbf9f4;
  --ink:#1c1813; --ink-2:#3a352c; --ink-soft:rgba(28,24,19,0.62);
  --ink-faint:rgba(28,24,19,0.40);
  --clay:#bd5d38; --clay-2:#a44d2c; --clay-soft:rgba(189,93,56,0.12);
  --line:rgba(28,24,19,0.13); --line-2:rgba(28,24,19,0.07);
  --sans:'DM Sans',system-ui,sans-serif; --serif:'Fraunces',Georgia,serif;
  background:var(--bone); color:var(--ink); font-family:var(--sans);
  overflow-x:hidden; min-height:100vh; position:relative;
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
}
.d11 *, .d11 *::before, .d11 *::after { margin:0; padding:0; box-sizing:border-box; }
.d11 img { display:block; width:100%; height:100%; object-fit:cover; }
.d11 a { text-decoration:none; color:inherit; }
.d11 button { font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
.d11 ::selection { background:var(--clay); color:var(--paper); }
.d11 section { position:relative; }

/* ============ CUSTOM CURSOR ============ */
.d11 .cursor-dot, .d11 .cursor-ring {
  position:fixed; top:0; left:0; border-radius:50%; pointer-events:none;
  z-index:10000; transform:translate(-50%,-50%); will-change:transform;
}
.d11 .cursor-dot { width:6px; height:6px; background:var(--clay); transition:opacity .3s; }
.d11 .cursor-ring {
  width:38px; height:38px; border:1px solid rgba(28,24,19,0.35);
  transition:width .25s ease, height .25s ease, background .25s ease, border-color .25s ease, opacity .3s;
}
.d11 .cursor-ring.hover { width:64px; height:64px; background:var(--clay-soft); border-color:transparent; }
.d11 .cursor-ring.down { width:30px; height:30px; }
@media (hover:none),(pointer:coarse) { .d11 .cursor-dot, .d11 .cursor-ring { display:none; } }

/* ============ PAGE CURTAIN ============ */
.d11 .curtain {
  position:fixed; inset:0; z-index:9999; background:var(--ink);
  display:flex; align-items:center; justify-content:center;
  transform:translateY(0); transition:transform 1s cubic-bezier(.76,0,.24,1);
}
.d11 .curtain.lift { transform:translateY(-100%); }
.d11 .curtain-mark {
  font-family:var(--serif); font-size:clamp(28px,5vw,52px); font-weight:300;
  color:var(--bone); letter-spacing:.04em; opacity:0; transform:translateY(14px);
  animation:d11CurtainIn .8s ease .1s forwards;
}
.d11 .curtain-mark em { color:var(--clay); font-style:italic; }
@keyframes d11CurtainIn { to { opacity:1; transform:translateY(0); } }

/* ============ SCROLL PROGRESS ============ */
.d11 .scroll-prog { position:fixed; top:0; left:0; height:2px; width:0%; background:var(--clay); z-index:998; }

/* ============ REVEAL UTILITIES ============ */
.d11 .reveal { opacity:0; transform:translateY(38px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
.d11 .reveal.in { opacity:1; transform:none; }
.d11 .reveal-l { opacity:0; transform:translateX(-46px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
.d11 .reveal-l.in { opacity:1; transform:none; }
.d11 .reveal-r { opacity:0; transform:translateX(46px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
.d11 .reveal-r.in { opacity:1; transform:none; }
.d11 .clip-reveal { clip-path:inset(0 100% 0 0); transition:clip-path 1s cubic-bezier(.76,0,.24,1); }
.d11 .clip-reveal.in { clip-path:inset(0 0 0 0); }
.d11 .img-reveal { overflow:hidden; }
.d11 .img-reveal img { transform:scale(1.18); transition:transform 1.2s cubic-bezier(.22,1,.36,1); }
.d11 .img-reveal.in img { transform:scale(1); }
.d11 .eyebrow { display:inline-flex; align-items:center; gap:10px; font-size:11px; text-transform:uppercase; letter-spacing:.28em; color:var(--clay); font-weight:500; opacity:0; transition:opacity .7s ease; }
.d11 .eyebrow.in { opacity:1; }
.d11 .eyebrow::before { content:''; width:24px; height:1px; background:var(--clay); display:inline-block; }
.d11 .zoom img { transition:transform .9s cubic-bezier(.22,1,.36,1); }
.d11 .zoom:hover img { transform:scale(1.05); }

/* ============ LAYOUT HELPERS ============ */
.d11 .wrap { width:min(1280px,92vw); margin-inline:auto; }
.d11 .display { font-family:var(--serif); font-weight:300; line-height:1.02; letter-spacing:-.015em; }
.d11 .display em { font-style:italic; color:var(--clay); }

/* ============ NAVBAR ============ */
.d11 .nav { position:fixed; top:0; left:0; right:0; z-index:900; transition:background .4s ease, box-shadow .4s ease, backdrop-filter .4s; }
.d11 .nav.scrolled { background:rgba(243,239,231,0.82); backdrop-filter:blur(14px) saturate(1.1); box-shadow:0 1px 0 var(--line-2); }
.d11 .nav-in { display:flex; align-items:center; justify-content:space-between; height:84px; width:min(1280px,92vw); margin-inline:auto; transition:height .4s; }
.d11 .nav.scrolled .nav-in { height:66px; }
.d11 .logo { font-family:var(--serif); font-size:25px; font-weight:400; letter-spacing:.01em; display:flex; align-items:baseline; gap:1px; }
.d11 .logo b { font-weight:400; }
.d11 .logo i { font-style:normal; color:var(--clay); }
.d11 .logo .dot { color:var(--clay); }
.d11 .nav-links { display:flex; gap:38px; list-style:none; }
.d11 .nav-links a { font-size:13px; letter-spacing:.02em; color:var(--ink-2); position:relative; padding:6px 0; transition:color .25s; }
.d11 .nav-links a::after { content:''; position:absolute; left:0; bottom:0; height:1px; width:100%; background:var(--clay); transform:scaleX(0); transform-origin:right; transition:transform .35s cubic-bezier(.76,0,.24,1); }
.d11 .nav-links a:hover { color:var(--ink); }
.d11 .nav-links a:hover::after, .d11 .nav-links a.active::after { transform:scaleX(1); transform-origin:left; }
.d11 .nav-links a.active { color:var(--ink); }
.d11 .nav-cta { font-size:12px; letter-spacing:.06em; text-transform:uppercase; padding:11px 22px; border:1px solid var(--ink); border-radius:40px; transition:all .3s cubic-bezier(.76,0,.24,1); position:relative; overflow:hidden; }
.d11 .nav-cta span { position:relative; z-index:1; transition:color .3s; }
.d11 .nav-cta::before { content:''; position:absolute; inset:0; background:var(--ink); transform:translateY(101%); transition:transform .4s cubic-bezier(.76,0,.24,1); }
.d11 .nav-cta:hover::before { transform:translateY(0); }
.d11 .nav-cta:hover span { color:var(--bone); }
.d11 .burger { display:none; flex-direction:column; gap:5px; width:30px; }
.d11 .burger span { height:1.5px; background:var(--ink); transition:transform .3s, opacity .3s; }
.d11 .mobile-menu { display:none; }

/* ============ BUTTONS ============ */
.d11 .btn { display:inline-flex; align-items:center; gap:12px; font-size:12px; letter-spacing:.1em; text-transform:uppercase; padding:16px 30px; border-radius:44px; position:relative; overflow:hidden; transition:color .35s; will-change:transform; }
.d11 .btn span { position:relative; z-index:1; transition:color .35s; }
.d11 .btn .arr { position:relative; z-index:1; transition:transform .35s; }
.d11 .btn:hover .arr { transform:translateX(5px); }
.d11 .btn::before { content:''; position:absolute; inset:0; border-radius:44px; transition:transform .45s cubic-bezier(.76,0,.24,1); }
.d11 .btn-fill { background:var(--clay); color:var(--paper); }
.d11 .btn-fill::before { background:var(--ink); transform:translateY(101%); }
.d11 .btn-fill:hover::before { transform:translateY(0); }
.d11 .btn-fill:hover span, .d11 .btn-fill:hover .arr { color:var(--paper); }
.d11 .btn-ghost { border:1px solid var(--ink); color:var(--ink); }
.d11 .btn-ghost::before { background:var(--ink); transform:translateY(101%); }
.d11 .btn-ghost:hover::before { transform:translateY(0); }
.d11 .btn-ghost:hover span, .d11 .btn-ghost:hover .arr { color:var(--bone); }

/* ============ HERO ============ */
.d11 .hero { padding:150px 0 70px; }
.d11 .hero-grid { display:grid; grid-template-columns:1.15fr .85fr; gap:54px; align-items:end; }
.d11 .hero-eyebrow { margin-bottom:26px; }
.d11 .hero h1 { font-family:var(--serif); font-weight:300; font-size:clamp(46px,7.4vw,116px); line-height:.96; letter-spacing:-.02em; }
.d11 .hero h1 .ln { display:block; overflow:hidden; }
.d11 .hero h1 .ln > span { display:inline-block; transform:translateY(110%); transition:transform 1s cubic-bezier(.76,0,.24,1); }
.d11 .hero.go h1 .ln > span { transform:translateY(0); }
.d11 .hero h1 em { font-style:italic; color:var(--clay); }
.d11 .hero-side { padding-bottom:10px; }
.d11 .hero-side p { font-size:17px; line-height:1.6; color:var(--ink-soft); max-width:38ch; margin-bottom:28px; }
.d11 .hero-actions { display:flex; gap:14px; flex-wrap:wrap; }
.d11 .hero-figure { margin-top:54px; height:64vh; min-height:440px; border-radius:6px; position:relative; }
.d11 .hero-figure .hero-img { position:absolute; inset:0; overflow:hidden; border-radius:6px; }
.d11 .hero-figure img { transform:scale(1.06); }
.d11 .hero-figure .par { will-change:transform; }
/* live 3D gallery feature visual */
.d11 .hero-3d-wrap { overflow:hidden; background:radial-gradient(120% 100% at 50% 0%, var(--bone-2) 0%, var(--bone) 70%); border:1px solid var(--line-2); }
.d11 .hero-3d { position:absolute !important; inset:0; width:100%; height:100%; border-radius:6px; }
.d11 .hero-3d canvas { display:block; width:100% !important; height:100% !important; touch-action:pan-y; }
.d11 .hero-tag { position:absolute; left:26px; bottom:24px; z-index:2; background:rgba(251,249,244,0.9); backdrop-filter:blur(6px); padding:14px 20px; border-radius:4px; font-size:12px; letter-spacing:.04em; color:var(--ink-2); }
.d11 .hero-tag b { color:var(--ink); }
.d11 .hero-stat { position:absolute; right:26px; top:26px; z-index:2; text-align:right; background:rgba(28,24,19,0.86); color:var(--bone); padding:16px 22px; border-radius:4px; }
.d11 .hero-stat b { font-family:var(--serif); font-size:34px; font-weight:400; display:block; line-height:1; }
.d11 .hero-stat span { font-size:11px; letter-spacing:.16em; text-transform:uppercase; opacity:.7; }

/* ============ MARQUEE ============ */
.d11 .marquee { border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:26px 0; overflow:hidden; margin-top:70px; }
.d11 .marquee-track { display:flex; gap:26px; white-space:nowrap; width:max-content; animation:d11Marq 28s linear infinite; }
.d11 .marquee:hover .marquee-track { animation-play-state:paused; }
.d11 .marquee-track span { font-family:var(--serif); font-size:clamp(26px,3vw,40px); font-weight:300; color:var(--ink); display:inline-flex; align-items:center; gap:26px; }
.d11 .marquee-track span em { font-style:italic; color:var(--clay); }
.d11 .marquee-track .star { color:var(--clay); font-size:18px; }
@keyframes d11Marq { to { transform:translateX(-50%); } }

/* ============ MANIFESTO / INTRO ============ */
.d11 .manifesto { padding:120px 0; }
.d11 .manifesto-grid { display:grid; grid-template-columns:1fr 1.6fr; gap:60px; }
.d11 .manifesto-grid .lab { font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }
.d11 .manifesto h2 { font-family:var(--serif); font-weight:300; font-size:clamp(28px,3.6vw,52px); line-height:1.18; letter-spacing:-.01em; }
.d11 .manifesto h2 em { font-style:italic; color:var(--clay); }
.d11 .manifesto h2 .mute { color:var(--ink-faint); }

/* ============ STATS / COUNTERS ============ */
.d11 .stats { padding:70px 0 110px; }
.d11 .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:30px; border-top:1px solid var(--line); }
.d11 .stat { padding:40px 0 0; border-right:1px solid var(--line); padding-right:24px; }
.d11 .stat:last-child { border-right:none; }
.d11 .stat .num { font-family:var(--serif); font-weight:300; font-size:clamp(44px,5vw,72px); line-height:1; letter-spacing:-.02em; }
.d11 .stat .num .suf { color:var(--clay); }
.d11 .stat .lab { margin-top:14px; font-size:13px; color:var(--ink-soft); line-height:1.5; max-width:24ch; }

/* ============ SELECTED WORKS — HORIZONTAL SCROLL ============ */
.d11 .works-h { background:var(--ink); color:var(--bone); }
.d11 .works-sticky { height:100vh; position:sticky; top:0; display:flex; flex-direction:column; overflow:hidden; }
.d11 .works-head { display:flex; align-items:flex-end; justify-content:space-between; padding:42px clamp(20px,4vw,56px) 0; }
.d11 .works-head .eyebrow { color:var(--clay); }
.d11 .works-head .eyebrow::before { background:var(--clay); }
.d11 .works-head h2 { font-family:var(--serif); font-weight:300; font-size:clamp(30px,4vw,58px); line-height:1; }
.d11 .works-head .count { font-size:13px; letter-spacing:.1em; color:rgba(243,239,231,0.6); }
.d11 .works-viewport { flex:1; display:flex; align-items:center; }
.d11 .works-track { display:flex; gap:30px; padding:0 clamp(20px,4vw,56px); will-change:transform; }
.d11 .work-card { width:clamp(300px,40vw,560px); flex-shrink:0; }
.d11 .work-card .wc-img { height:58vh; min-height:360px; overflow:hidden; border-radius:6px; position:relative; }
.d11 .work-card .wc-img img { transition:transform 1s cubic-bezier(.22,1,.36,1); }
.d11 .work-card:hover .wc-img img { transform:scale(1.06); }
.d11 .work-card .wc-idx { position:absolute; top:18px; left:18px; font-size:12px; letter-spacing:.1em; background:rgba(28,24,19,0.6); backdrop-filter:blur(6px); padding:6px 12px; border-radius:30px; }
.d11 .work-card .wc-meta { display:flex; align-items:baseline; justify-content:space-between; margin-top:20px; gap:18px; }
.d11 .work-card h3 { font-family:var(--serif); font-weight:400; font-size:26px; }
.d11 .work-card .wc-tag { font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--clay); white-space:nowrap; }
.d11 .work-card p { margin-top:6px; font-size:14px; color:rgba(243,239,231,0.55); }
.d11 .works-progress { height:2px; background:rgba(243,239,231,0.16); margin:30px clamp(20px,4vw,56px) 40px; border-radius:2px; }
.d11 .works-progress i { display:block; height:100%; width:0%; background:var(--clay); border-radius:2px; }
.d11 .works-hint { position:absolute; bottom:46px; right:clamp(20px,4vw,56px); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:rgba(243,239,231,0.5); display:flex; align-items:center; gap:10px; }
.d11 .works-hint .line { width:40px; height:1px; background:rgba(243,239,231,0.4); position:relative; overflow:hidden; }
.d11 .works-hint .line::after { content:''; position:absolute; inset:0; background:var(--clay); animation:d11Slide 1.8s ease-in-out infinite; }
@keyframes d11Slide { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }

/* ============ BLUEPRINT -> RENDER REVEAL ============ */
.d11 .reveal-sec { padding:120px 0; }
.d11 .reveal-head { max-width:640px; margin-bottom:54px; }
.d11 .reveal-head h2 { font-family:var(--serif); font-weight:300; font-size:clamp(32px,4.4vw,64px); line-height:1.04; margin:22px 0 18px; letter-spacing:-.01em; }
.d11 .reveal-head h2 em { font-style:italic; color:var(--clay); }
.d11 .reveal-head p { font-size:16px; line-height:1.6; color:var(--ink-soft); max-width:52ch; }
.d11 .ba { position:relative; width:100%; height:72vh; min-height:460px; border-radius:8px; overflow:hidden; user-select:none; touch-action:pan-y; box-shadow:0 30px 80px -40px rgba(28,24,19,0.5); }
.d11 .ba-layer { position:absolute; inset:0; }
.d11 .ba-after { z-index:1; }
.d11 .ba-before { z-index:2; clip-path:inset(0 50% 0 0); }
.d11 .ba-before .ba-blue { position:absolute; inset:0; background:#11212e; }
.d11 .ba-before img { position:absolute; inset:0; filter:grayscale(1) brightness(1.5) contrast(1.1) invert(1) sepia(1) hue-rotate(165deg) saturate(3) opacity(.85); mix-blend-mode:screen; }
.d11 .ba-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(120,190,225,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(120,190,225,0.18) 1px,transparent 1px); background-size:34px 34px; z-index:1; }
.d11 .ba-label { position:absolute; bottom:22px; z-index:3; font-size:11px; letter-spacing:.18em; text-transform:uppercase; padding:8px 14px; border-radius:30px; backdrop-filter:blur(6px); }
.d11 .ba-label.l-before { left:22px; background:rgba(17,33,46,0.7); color:#bfe2f2; border:1px solid rgba(120,190,225,0.4); }
.d11 .ba-label.l-after { right:22px; background:rgba(251,249,244,0.82); color:var(--ink); }
.d11 .ba-handle { position:absolute; top:0; bottom:0; width:2px; background:var(--paper); left:50%; z-index:4; transform:translateX(-50%); cursor:ew-resize; box-shadow:0 0 0 1px rgba(28,24,19,0.1); }
.d11 .ba-knob { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:54px; height:54px; border-radius:50%; background:var(--paper); display:flex; align-items:center; justify-content:center; gap:4px; box-shadow:0 8px 24px -6px rgba(28,24,19,0.5); }
.d11 .ba-knob::before, .d11 .ba-knob::after { content:''; width:0; height:0; border-top:5px solid transparent; border-bottom:5px solid transparent; }
.d11 .ba-knob::before { border-right:7px solid var(--clay); }
.d11 .ba-knob::after { border-left:7px solid var(--clay); }
.d11 .ba-caption { margin-top:22px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:14px; font-size:13px; color:var(--ink-soft); }

/* ============ SERVICES (sticky list) ============ */
.d11 .svc { padding:120px 0; }
.d11 .svc-top { display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:end; margin-bottom:70px; }
.d11 .svc-top h2 { font-family:var(--serif); font-weight:300; font-size:clamp(34px,5vw,76px); line-height:1; margin-top:20px; letter-spacing:-.015em; }
.d11 .svc-top h2 em { font-style:italic; color:var(--clay); }
.d11 .svc-top p { font-size:16px; line-height:1.6; color:var(--ink-soft); }
.d11 .svc-layout { display:grid; grid-template-columns:.95fr 1.05fr; gap:64px; align-items:start; }
.d11 .svc-visual { position:sticky; top:110px; height:62vh; min-height:420px; border-radius:8px; overflow:hidden; }
.d11 .svc-visual img { position:absolute; inset:0; opacity:0; transform:scale(1.08); transition:opacity .7s ease, transform 1.1s cubic-bezier(.22,1,.36,1); }
.d11 .svc-visual img.active { opacity:1; transform:scale(1); }
.d11 .svc-list { display:flex; flex-direction:column; }
.d11 .svc-item { padding:34px 0; border-bottom:1px solid var(--line); cursor:pointer; }
.d11 .svc-item:first-child { border-top:1px solid var(--line); }
.d11 .svc-item-head { display:flex; align-items:baseline; gap:20px; }
.d11 .svc-item .n { font-size:13px; color:var(--clay); letter-spacing:.08em; min-width:34px; }
.d11 .svc-item h3 { font-family:var(--serif); font-weight:400; font-size:clamp(24px,2.7vw,38px); line-height:1.05; transition:color .3s; flex:1; }
.d11 .svc-item .plus { font-size:22px; color:var(--ink-faint); transition:transform .4s, color .3s; }
.d11 .svc-item.open .plus { transform:rotate(45deg); color:var(--clay); }
.d11 .svc-item.open h3 { color:var(--clay); }
.d11 .svc-body { display:grid; grid-template-rows:0fr; transition:grid-template-rows .5s cubic-bezier(.76,0,.24,1); padding-left:54px; }
.d11 .svc-item.open .svc-body { grid-template-rows:1fr; }
.d11 .svc-body-in { overflow:hidden; }
.d11 .svc-body p { padding-top:16px; font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:52ch; }
.d11 .svc-body .ideal { margin-top:16px; font-size:12px; letter-spacing:.04em; color:var(--ink-faint); }
.d11 .svc-body .ideal b { color:var(--ink-2); font-weight:500; }

/* ============ PROCESS ============ */
.d11 .process { padding:110px 0; background:var(--bone-2); }
.d11 .process h2 { font-family:var(--serif); font-weight:300; font-size:clamp(32px,4.4vw,62px); margin-top:20px; }
.d11 .process h2 em { font-style:italic; color:var(--clay); }
.d11 .process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:60px; background:var(--line); border:1px solid var(--line); }
.d11 .pstep { background:var(--bone-2); padding:36px 28px 44px; transition:background .4s; }
.d11 .pstep:hover { background:var(--paper); }
.d11 .pstep .pn { font-family:var(--serif); font-size:46px; font-weight:300; color:var(--clay); line-height:1; }
.d11 .pstep h3 { font-size:18px; margin:22px 0 12px; font-weight:600; }
.d11 .pstep p { font-size:14px; line-height:1.6; color:var(--ink-soft); }

/* ============ TESTIMONIAL ============ */
.d11 .quote-sec { padding:130px 0; }
.d11 .quote-sec blockquote { font-family:var(--serif); font-weight:300; font-size:clamp(28px,3.8vw,54px); line-height:1.22; letter-spacing:-.01em; max-width:18ch; margin:0 auto; text-align:center; }
.d11 .quote-sec blockquote em { font-style:italic; color:var(--clay); }
.d11 .quote-by { text-align:center; margin-top:34px; font-size:13px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-soft); }
.d11 .quote-by b { color:var(--ink); }

/* ============ SHARED CTA ============ */
.d11 .cta { padding:130px 0; background:var(--ink); color:var(--bone); overflow:hidden; }
.d11 .cta-in { text-align:center; }
.d11 .cta .eyebrow { color:var(--clay); }
.d11 .cta .eyebrow::before { background:var(--clay); }
.d11 .cta h2 { font-family:var(--serif); font-weight:300; font-size:clamp(40px,7vw,108px); line-height:1; margin:26px 0 18px; letter-spacing:-.02em; }
.d11 .cta h2 em { font-style:italic; color:var(--clay); }
.d11 .cta p { color:rgba(243,239,231,0.6); font-size:17px; max-width:46ch; margin:0 auto 38px; line-height:1.6; }
.d11 .cta .btn-fill::before { background:var(--bone); }
.d11 .cta .btn-fill:hover span, .d11 .cta .btn-fill:hover .arr { color:var(--ink); }

/* ============ CONTACT FORM ============ */
.d11 .contact-sec { padding:120px 0; }
.d11 .contact-grid { display:grid; grid-template-columns:.9fr 1.1fr; gap:70px; }
.d11 .contact-info h2 { font-family:var(--serif); font-weight:300; font-size:clamp(34px,4.6vw,64px); line-height:1.04; margin:22px 0 24px; letter-spacing:-.01em; }
.d11 .contact-info h2 em { font-style:italic; color:var(--clay); }
.d11 .contact-info > p { font-size:16px; line-height:1.6; color:var(--ink-soft); max-width:44ch; margin-bottom:40px; }
.d11 .contact-rows { display:flex; flex-direction:column; gap:2px; }
.d11 .crow { padding:22px 0; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:4px; }
.d11 .crow:last-child { border-bottom:1px solid var(--line); }
.d11 .crow .ck { font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint); }
.d11 .crow a, .d11 .crow span.cv { font-size:20px; font-family:var(--serif); color:var(--ink); transition:color .25s; }
.d11 .crow a:hover { color:var(--clay); }
.d11 .form { background:var(--paper); padding:44px; border-radius:8px; border:1px solid var(--line-2); }
.d11 .form .fnote { font-size:12px; color:var(--ink-faint); margin-bottom:24px; }
.d11 .fgrid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.d11 .ffield { position:relative; margin-bottom:18px; }
.d11 .ffield.full { grid-column:1/-1; }
.d11 .ffield label { position:absolute; left:0; top:16px; font-size:15px; color:var(--ink-faint); pointer-events:none; transition:all .25s ease; }
.d11 .ffield input, .d11 .ffield textarea { width:100%; background:transparent; border:none; border-bottom:1px solid var(--line); padding:16px 0 12px; font-size:15px; color:var(--ink); font-family:inherit; transition:border-color .3s; resize:none; }
.d11 .ffield input:focus, .d11 .ffield textarea:focus { outline:none; border-bottom-color:var(--clay); }
.d11 .ffield input:focus + label, .d11 .ffield input:not(:placeholder-shown) + label,
.d11 .ffield textarea:focus + label, .d11 .ffield textarea:not(:placeholder-shown) + label { top:-10px; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--clay); }
.d11 .chips { display:flex; flex-wrap:wrap; gap:10px; margin:6px 0 26px; }
.d11 .chip { font-size:12px; letter-spacing:.04em; padding:9px 16px; border:1px solid var(--line); border-radius:30px; color:var(--ink-2); transition:all .25s; user-select:none; }
.d11 .chip:hover { border-color:var(--ink); }
.d11 .chip.on { background:var(--clay); border-color:var(--clay); color:var(--paper); }
.d11 .form-submit { width:100%; margin-top:8px; background:var(--ink); color:var(--bone); padding:18px; border-radius:44px; font-size:13px; letter-spacing:.12em; text-transform:uppercase; transition:background .35s; }
.d11 .form-submit:hover { background:var(--clay); }
.d11 .form-submit.success { background:#3f7d4f; }

/* ============ PAGE HERO (interior pages) ============ */
.d11 .phero { padding:170px 0 60px; }
.d11 .phero .eyebrow { margin-bottom:24px; }
.d11 .phero h1 { font-family:var(--serif); font-weight:300; font-size:clamp(48px,8vw,128px); line-height:.94; letter-spacing:-.02em; }
.d11 .phero h1 em { font-style:italic; color:var(--clay); }
.d11 .phero-sub { display:flex; justify-content:space-between; align-items:flex-end; gap:30px; margin-top:34px; flex-wrap:wrap; }
.d11 .phero-sub p { font-size:17px; line-height:1.6; color:var(--ink-soft); max-width:46ch; }
.d11 .phero-sub .crumbs { font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); }
.d11 .phero-sub .crumbs b { color:var(--clay); }
.d11 .phero-band { height:56vh; min-height:380px; margin-top:54px; border-radius:8px; overflow:hidden; }

/* ============ ABOUT ============ */
.d11 .story { padding:110px 0; }
.d11 .story-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
.d11 .story-grid .s-img { height:60vh; min-height:420px; border-radius:8px; overflow:hidden; }
.d11 .story h2 { font-family:var(--serif); font-weight:300; font-size:clamp(30px,3.8vw,52px); line-height:1.12; margin:20px 0 22px; }
.d11 .story h2 em { font-style:italic; color:var(--clay); }
.d11 .story p { font-size:16px; line-height:1.7; color:var(--ink-soft); margin-bottom:18px; max-width:50ch; }
.d11 .values { padding:110px 0; background:var(--bone-2); }
.d11 .values-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:34px; margin-top:56px; }
.d11 .value { padding:36px 30px; background:var(--paper); border-radius:8px; border:1px solid var(--line-2); transition:transform .4s cubic-bezier(.22,1,.36,1); }
.d11 .value:hover { transform:translateY(-6px); }
.d11 .value .vn { font-family:var(--serif); font-size:18px; color:var(--clay); }
.d11 .value h3 { font-family:var(--serif); font-weight:400; font-size:26px; margin:18px 0 12px; }
.d11 .value p { font-size:14px; line-height:1.6; color:var(--ink-soft); }
.d11 .timeline { padding:110px 0; }
.d11 .tl { margin-top:56px; border-top:1px solid var(--line); }
.d11 .tl-row { display:grid; grid-template-columns:160px 1fr; gap:40px; padding:34px 0; border-bottom:1px solid var(--line); transition:padding-left .4s; }
.d11 .tl-row:hover { padding-left:14px; }
.d11 .tl-row .yr { font-family:var(--serif); font-size:34px; font-weight:300; color:var(--clay); }
.d11 .tl-row h3 { font-size:20px; font-weight:600; margin-bottom:8px; }
.d11 .tl-row p { font-size:15px; line-height:1.6; color:var(--ink-soft); max-width:60ch; }
.d11 .team { padding:110px 0 130px; }
.d11 .team-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:26px; margin-top:56px; }
.d11 .member .m-img { height:340px; border-radius:8px; overflow:hidden; margin-bottom:18px; filter:grayscale(1); transition:filter .5s; }
.d11 .member:hover .m-img { filter:grayscale(0); }
.d11 .member h3 { font-family:var(--serif); font-weight:400; font-size:22px; }
.d11 .member p { font-size:13px; color:var(--clay); letter-spacing:.04em; margin-top:4px; }

/* ============ WORK / PORTFOLIO ============ */
.d11 .work-filter { display:flex; gap:12px; flex-wrap:wrap; margin:50px 0 14px; }
.d11 .fbtn { font-size:12px; letter-spacing:.08em; text-transform:uppercase; padding:11px 20px; border:1px solid var(--line); border-radius:30px; color:var(--ink-2); transition:all .3s; }
.d11 .fbtn:hover { border-color:var(--ink); }
.d11 .fbtn.on { background:var(--ink); border-color:var(--ink); color:var(--bone); }
.d11 .pgrid { display:grid; grid-template-columns:repeat(12,1fr); gap:26px; padding:30px 0 120px; }
.d11 .pcard { position:relative; overflow:hidden; border-radius:8px; cursor:pointer; }
.d11 .pcard.hide { display:none; }
.d11 .pcard .pc-img { width:100%; height:100%; overflow:hidden; }
.d11 .pcard img { transition:transform 1s cubic-bezier(.22,1,.36,1); }
.d11 .pcard:hover img { transform:scale(1.05); }
.d11 .pcard .pc-over { position:absolute; inset:0; background:linear-gradient(to top,rgba(28,24,19,0.78),rgba(28,24,19,0) 55%); opacity:0; transition:opacity .5s; display:flex; flex-direction:column; justify-content:flex-end; padding:26px; }
.d11 .pcard:hover .pc-over { opacity:1; }
.d11 .pcard .pc-over h3 { font-family:var(--serif); font-weight:400; font-size:26px; color:var(--bone); transform:translateY(14px); transition:transform .5s; }
.d11 .pcard .pc-over span { font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:var(--clay); transform:translateY(14px); transition:transform .5s .05s; margin-top:6px; }
.d11 .pcard:hover .pc-over h3, .d11 .pcard:hover .pc-over span { transform:translateY(0); }
.d11 .pcard.tall { grid-column:span 6; height:560px; }
.d11 .pcard.wide { grid-column:span 6; height:420px; }
.d11 .pcard.big { grid-column:span 8; height:520px; }
.d11 .pcard.small { grid-column:span 4; height:520px; }

/* ============ FOOTER ============ */
.d11 .foot-strip { overflow:hidden; padding:30px 0; border-top:1px solid var(--line); }
.d11 .foot-strip-track { display:flex; gap:30px; white-space:nowrap; width:max-content; animation:d11Marq 30s linear infinite; }
.d11 .foot-strip-track span { font-family:var(--serif); font-size:clamp(34px,6vw,90px); font-weight:300; color:var(--ink); letter-spacing:-.01em; }
.d11 .foot-strip-track .sep { color:var(--clay); }
.d11 footer { background:var(--ink); color:var(--bone); padding:80px 0 36px; }
.d11 .foot-top { display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; padding-bottom:60px; border-bottom:1px solid rgba(243,239,231,0.12); }
.d11 .foot-brand .logo { font-size:30px; color:var(--bone); margin-bottom:18px; }
.d11 .foot-brand p { font-size:14px; line-height:1.6; color:rgba(243,239,231,0.55); max-width:34ch; }
.d11 .fcol h4 { font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(243,239,231,0.45); margin-bottom:20px; }
.d11 .fcol a, .d11 .fcol p { display:block; font-size:14px; color:rgba(243,239,231,0.78); margin-bottom:12px; transition:color .25s; }
.d11 .fcol a:hover { color:var(--clay); }
.d11 .foot-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:30px; flex-wrap:wrap; gap:14px; }
.d11 .foot-bottom p { font-size:12px; color:rgba(243,239,231,0.45); }
.d11 .foot-social { display:flex; gap:14px; }
.d11 .foot-social a { width:38px; height:38px; border:1px solid rgba(243,239,231,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all .3s; }
.d11 .foot-social a:hover { background:var(--clay); border-color:var(--clay); }
.d11 .foot-social svg { width:16px; height:16px; }

/* ============ RESPONSIVE ============ */
@media (max-width:1024px) {
  .d11 .hero-grid, .d11 .manifesto-grid, .d11 .svc-top, .d11 .svc-layout, .d11 .story-grid, .d11 .contact-grid { grid-template-columns:1fr; }
  .d11 .stats-grid, .d11 .process-grid { grid-template-columns:repeat(2,1fr); }
  .d11 .values-grid { grid-template-columns:1fr; }
  .d11 .team-grid { grid-template-columns:repeat(2,1fr); }
  .d11 .svc-visual { display:none; }
  .d11 .stat:nth-child(2) { border-right:none; }
}
@media (max-width:760px) {
  .d11 .nav-links, .d11 .nav-cta { display:none; }
  .d11 .burger { display:flex; }
  .d11 .mobile-menu { display:flex; flex-direction:column; gap:6px; position:fixed; inset:0; background:var(--bone); z-index:899; padding:120px 7vw 40px; transform:translateY(-100%); transition:transform .6s cubic-bezier(.76,0,.24,1); }
  .d11 .mobile-menu.open { transform:translateY(0); }
  .d11 .mobile-menu a { font-family:var(--serif); font-size:34px; font-weight:300; padding:14px 0; border-bottom:1px solid var(--line); }
  .d11 .mobile-menu a em { color:var(--clay); font-style:italic; }
  .d11 .fgrid { grid-template-columns:1fr; }
  .d11 .stats-grid { grid-template-columns:1fr; }
  .d11 .stat { border-right:none; border-bottom:1px solid var(--line); padding-bottom:30px; }
  .d11 .process-grid { grid-template-columns:1fr; }
  .d11 .pcard.tall, .d11 .pcard.wide, .d11 .pcard.big, .d11 .pcard.small { grid-column:span 12; height:420px; }
  .d11 .foot-top { grid-template-columns:1fr 1fr; }
  .d11 .team-grid { grid-template-columns:1fr; }
  .d11 .reveal-head h2, .d11 .hero h1 { font-size:clamp(40px,12vw,70px); }
  .d11 .form { padding:28px; }
  .d11 .works-sticky { height:auto; }
  .d11 .works-viewport { overflow-x:auto; padding-bottom:20px; }
}
`;
