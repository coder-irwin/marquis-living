/**
 * Akaash · Design 23 — "Promenade". My own interpretation built on Design 20's
 * signature scroll-driven frame-scrub house walkthrough, reframed in a bright,
 * warm gallery-white editorial language (Cormorant Garamond + Jost, bronze
 * accent on bone). Borrows: word-by-word hero reveal (D9), magnetic custom
 * cursor + scroll reveals + counters (D13), editorial frame-still gallery.
 * Scoped under `.d23`, injected inline.
 */
export const D23_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Inter:wght@300;400;500;600&display=swap');

.d23 {
  --bg:#f4f1ea; --paper:#faf8f3; --bone-2:#ece6da;
  --ink:#16120c; --ink-2:#2a241c;
  --accent:#9c7a44; --accent-2:#c2a161; --accent-soft:rgba(156,122,68,0.12);
  --muted:rgba(22,18,12,0.58); --faint:rgba(22,18,12,0.40);
  --line:rgba(22,18,12,0.14); --line-2:rgba(22,18,12,0.07);
  --ivory:#f5efe4;
  --serif:'Fraunces',Georgia,serif; --sans:'Inter',system-ui,sans-serif;
  background:var(--bg); color:var(--ink); font-family:var(--sans); font-weight:400;
  overflow-x:clip; min-height:100vh; position:relative; -webkit-font-smoothing:antialiased;
}
.d23 *, .d23 *::before, .d23 *::after { margin:0; padding:0; box-sizing:border-box; }
.d23 img { display:block; width:100%; height:100%; object-fit:cover; }
.d23 a { text-decoration:none; color:inherit; }
.d23 button { font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
.d23 ::selection { background:var(--accent); color:var(--paper); }
.d23 section { position:relative; }
.d23 .wrap { width:min(1320px,90vw); margin-inline:auto; }
.d23 .serif { font-family:var(--serif); font-weight:300; letter-spacing:-.03em; line-height:.94; }
.d23 .serif em { font-style:italic; font-weight:300; }
.d23 .ey { font-family:var(--sans); font-size:.72rem; font-weight:500; letter-spacing:.28em; text-transform:uppercase; color:var(--accent); }

/* ---------- cursor ---------- */
.d23 .cur { position:fixed; top:0; left:0; width:9px; height:9px; border-radius:50%; background:var(--accent); z-index:10000; pointer-events:none; transform:translate(-50%,-50%); transition:width .25s,height .25s,background .25s,border-color .25s; }
.d23 .cur.big { width:62px; height:62px; background:transparent; border:1px solid var(--accent); }
@media (hover:none),(pointer:coarse){ .d23 .cur{ display:none; } }

/* ---------- UX polish: scroll progress · wayfinding · focus ---------- */
.d23 .progress { position:fixed; top:0; left:0; height:2px; width:100%; transform-origin:left; transform:scaleX(0); background:var(--accent); z-index:950; pointer-events:none; will-change:transform; }
.d23 .nav-links a.active { opacity:1; }
.d23 .nav-links a.active::after { width:100%; }
.d23 a:focus-visible, .d23 button:focus-visible { outline:2px solid var(--accent); outline-offset:4px; border-radius:3px; }
.d23 .ff input:focus-visible, .d23 .ff textarea:focus-visible, .d23 .ff.sel select:focus-visible { outline:2px solid var(--accent); outline-offset:4px; }
.d23 .contact a:focus-visible, .d23 .contact button:focus-visible, .d23 .contact input:focus-visible, .d23 .contact textarea:focus-visible, .d23 .contact select:focus-visible { outline-color:var(--accent-2); }

/* ---------- preloader ---------- */
.d23 .pre { position:fixed; inset:0; z-index:9999; background:var(--ink); color:var(--ivory); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px; transition:opacity .9s ease, visibility .9s; }
.d23 .pre.gone { opacity:0; visibility:hidden; }
.d23 .pre-mark { font-family:var(--serif); font-weight:500; font-size:clamp(28px,4.4vw,52px); letter-spacing:.01em; }
.d23 .pre-mark em { color:var(--accent-2); font-style:italic; }
.d23 .pre-bar { width:min(280px,60vw); height:1px; background:rgba(245,239,228,.2); position:relative; overflow:hidden; }
.d23 .pre-bar > i { position:absolute; inset:0; transform-origin:left; transform:scaleX(0); background:var(--accent-2); }
.d23 .pre-pct { font-family:var(--sans); font-size:11px; letter-spacing:.32em; text-transform:uppercase; color:rgba(245,239,228,.6); }

/* ---------- nav ---------- */
.d23 .nav { position:fixed; top:0; left:0; right:0; z-index:900; padding:26px 0; transition:padding .4s ease, background .4s ease, box-shadow .4s ease; }
.d23 .nav.solid { padding:14px 0; background:rgba(244,241,234,.86); backdrop-filter:blur(14px); box-shadow:0 1px 0 var(--line-2); }
.d23 .nav-in { width:min(1320px,90vw); margin-inline:auto; display:flex; align-items:center; justify-content:space-between; }
.d23 .logo { font-family:var(--serif); font-weight:600; font-size:22px; letter-spacing:.01em; }
.d23 .logo i { color:var(--accent); font-style:normal; }
.d23 .nav.over-dark .logo, .d23 .nav.over-dark .nav-links a, .d23 .nav.over-dark .nav-cta { color:var(--ivory); }
.d23 .nav-links { display:flex; gap:34px; list-style:none; }
.d23 .nav-links a { font-size:13px; letter-spacing:.04em; color:var(--ink); opacity:.78; transition:opacity .3s; position:relative; }
.d23 .nav-links a::after { content:''; position:absolute; left:0; bottom:-5px; width:0; height:1px; background:currentColor; transition:width .35s cubic-bezier(.22,1,.36,1); }
.d23 .nav-links a:hover { opacity:1; } .d23 .nav-links a:hover::after { width:100%; }
.d23 .nav-cta { font-size:12px; letter-spacing:.18em; text-transform:uppercase; border:1px solid var(--line); padding:11px 20px; border-radius:40px; transition:background .35s,color .35s,border-color .35s; }
.d23 .nav.over-dark .nav-cta { border-color:rgba(245,239,228,.4); }
.d23 .nav-cta:hover { background:var(--accent); color:var(--paper); border-color:var(--accent); }
.d23 .burger { display:none; width:30px; height:18px; position:relative; }
.d23 .burger span { position:absolute; left:0; width:100%; height:1.5px; background:currentColor; transition:.3s; }
.d23 .burger span:nth-child(1){top:0;} .d23 .burger span:nth-child(2){top:50%;transform:translateY(-50%);} .d23 .burger span:nth-child(3){bottom:0;}

/* ---------- walkthrough (frame-scrub) ---------- */
.d23 .walk { position:relative; }
.d23 .stage { position:sticky; top:0; height:100vh; overflow:hidden; background:#0b0a08; }
.d23 .stage canvas, .d23 .stage video { position:absolute; inset:0; width:100%; height:100%; display:block; object-fit:cover; }
.d23 .stage::after { content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(8,7,5,.55) 100%), linear-gradient(180deg, rgba(8,7,5,.35) 0%, transparent 22%, transparent 62%, rgba(8,7,5,.55) 100%); }

.d23 .chapter { position:absolute; z-index:3; max-width:min(640px,80vw); color:var(--ivory); top:50%; transform:translateY(-50%); transition:opacity .5s ease; pointer-events:none; text-shadow:0 2px 34px rgba(0,0,0,.5); }
.d23 .chapter.left { left:7vw; } .d23 .chapter.right { right:7vw; text-align:right; }
.d23 .chapter .c-ey { color:var(--accent-2); margin-bottom:18px; }
.d23 .chapter h2 { font-family:var(--serif); font-weight:500; font-size:clamp(40px,6.4vw,86px); line-height:.98; letter-spacing:-.01em; }
.d23 .chapter h2 em { font-style:italic; color:var(--accent-2); }
.d23 .chapter p { margin-top:20px; font-size:clamp(15px,1.4vw,18px); font-weight:300; line-height:1.6; color:rgba(245,239,228,.82); max-width:42ch; }
.d23 .chapter.right p { margin-left:auto; }
.d23 .chapter .c-cta { display:inline-flex; align-items:center; gap:10px; margin-top:26px; pointer-events:auto; font-size:12px; letter-spacing:.2em; text-transform:uppercase; border-bottom:1px solid rgba(245,239,228,.4); padding-bottom:6px; }
.d23 .chapter .c-cta .ar { transition:transform .3s; } .d23 .chapter .c-cta:hover .ar { transform:translateX(6px); }

/* ---------- hero marketing lines (positioned, scroll-faded) ---------- */
.d23 .htext { position:absolute; z-index:3; max-width:min(640px,84vw); color:var(--ivory); pointer-events:none; transition:opacity .6s ease; text-shadow:0 2px 40px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.4); }
.d23 .htext.center { top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; max-width:min(880px,88vw); }
.d23 .htext.center::before { content:""; position:absolute; inset:-40% -30%; z-index:-1; background:radial-gradient(60% 60% at 50% 50%, rgba(8,7,5,.5), transparent 72%); }
.d23 .htext.bl { left:7vw; bottom:13vh; text-align:left; }
.d23 .htext.tr { right:7vw; top:17vh; text-align:right; }
.d23 .htext .he { display:block; font-family:var(--sans); font-size:12px; font-weight:500; letter-spacing:.3em; text-transform:uppercase; color:var(--accent-2); margin-bottom:18px; }
.d23 .htext h2 { font-family:var(--serif); font-weight:500; font-size:clamp(38px,6.4vw,90px); line-height:.98; letter-spacing:-.01em; }
.d23 .htext h2 em { font-style:italic; color:var(--accent-2); }
@media (max-width:760px){ .d23 .htext.tr{ right:auto; left:7vw; top:14vh; text-align:left; } .d23 .htext.bl{ bottom:10vh; } }

/* word-by-word hero reveal (chapter 0) */
.d23 .reveal span { display:inline-block; overflow:hidden; vertical-align:top; }
.d23 .reveal span > i { display:inline-block; font-style:inherit; transform:translateY(110%); transition:transform .95s cubic-bezier(.22,1,.36,1); }
.d23 .reveal.go span > i { transform:translateY(0); }
.d23 .reveal.go span:nth-child(2) > i{transition-delay:.07s;} .d23 .reveal.go span:nth-child(3) > i{transition-delay:.14s;}
.d23 .reveal.go span:nth-child(4) > i{transition-delay:.21s;} .d23 .reveal.go span:nth-child(5) > i{transition-delay:.28s;}

.d23 .scroll-cue { position:absolute; bottom:34px; left:50%; transform:translateX(-50%); z-index:4; color:var(--ivory); display:flex; flex-direction:column; align-items:center; gap:12px; opacity:.85; transition:opacity .4s; }
.d23 .scroll-cue.hide { opacity:0; }
.d23 .scroll-cue .mouse { width:22px; height:36px; border:1px solid rgba(245,239,228,.6); border-radius:14px; position:relative; }
.d23 .scroll-cue .mouse::after { content:''; position:absolute; top:6px; left:50%; width:3px; height:7px; border-radius:3px; background:var(--ivory); transform:translateX(-50%); animation:d23wheel 1.6s infinite; }
@keyframes d23wheel { 0%{opacity:0;transform:translate(-50%,0);} 30%{opacity:1;} 100%{opacity:0;transform:translate(-50%,12px);} }
.d23 .scroll-cue span { font-size:10px; letter-spacing:.3em; text-transform:uppercase; }

/* progress rail */
.d23 .rail { position:fixed; right:26px; top:50%; transform:translateY(-50%); z-index:600; display:flex; flex-direction:column; gap:14px; opacity:0; transition:opacity .5s; }
.d23 .rail.show { opacity:1; }
.d23 .rail button { width:8px; height:8px; border-radius:50%; background:rgba(245,239,228,.45); transition:transform .3s,background .3s; }
.d23 .rail button.on { background:var(--accent-2); transform:scale(1.5); }
@media (max-width:760px){ .d23 .rail{ display:none; } }

/* ---------- intro / stats ---------- */
.d23 .intro { padding:130px 0 100px; }
.d23 .intro .ey { margin-bottom:30px; }
.d23 .intro .lede { font-family:var(--serif); font-weight:400; font-size:clamp(28px,4vw,56px); line-height:1.12; letter-spacing:-.01em; max-width:20ch; }
.d23 .intro .lede em { font-style:italic; color:var(--accent); }
.d23 .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:30px; margin-top:80px; border-top:1px solid var(--line); padding-top:46px; }
.d23 .stat .num { font-family:var(--serif); font-weight:500; font-size:clamp(40px,5vw,68px); color:var(--accent); line-height:1; }
.d23 .stat .num .suf { font-size:.5em; }
.d23 .stat .lab { font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); margin-top:12px; }

/* ---------- gallery ---------- */
.d23 .gal { padding:40px 0 120px; }
.d23 .gal-head { display:flex; align-items:flex-end; justify-content:space-between; gap:30px; margin-bottom:50px; flex-wrap:wrap; }
.d23 .gal-head h2 { font-family:var(--serif); font-weight:500; font-size:clamp(18px,2.6vw,38px); line-height:1.05; letter-spacing:-.01em; }
.d23 .gal-head h2 em { font-style:italic; color:var(--accent); }
.d23 .gal-head p { max-width:36ch; color:var(--muted); font-size:15px; line-height:1.6; }
.d23 .grid { display:grid; grid-template-columns:repeat(6,1fr); gap:18px; }
.d23 .fig { position:relative; overflow:hidden; border-radius:2px; background:var(--bone-2); }
.d23 .fig.full { grid-column:span 6; aspect-ratio:24/9; } .d23 .fig.half { grid-column:span 3; aspect-ratio:3/2; } .d23 .fig.third { grid-column:span 2; aspect-ratio:4/3; }
.d23 .fig img { transition:transform 1.1s cubic-bezier(.22,1,.36,1), filter .8s; filter:saturate(.92); }
.d23 .fig:hover img { transform:scale(1.06); filter:saturate(1.05); }
.d23 .fig figcaption { position:absolute; left:16px; bottom:14px; color:var(--ivory); font-size:11px; letter-spacing:.2em; text-transform:uppercase; text-shadow:0 1px 12px rgba(0,0,0,.6); }
.d23 .fig figcaption b { font-family:var(--serif); font-weight:500; font-size:15px; letter-spacing:0; display:block; text-transform:none; }

/* ---------- process ---------- */
.d23 .proc { background:var(--ink); color:var(--ivory); padding:120px 0; }
.d23 .proc .ey { color:var(--accent-2); }
.d23 .proc h2 { font-family:var(--serif); font-weight:500; font-size:clamp(18px,2.6vw,36px); margin:16px 0 44px; line-height:1.05; }
.d23 .proc h2 em { font-style:italic; color:var(--accent-2); }
.d23 .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
.d23 .step { padding:32px 26px 32px 0; border-top:1px solid rgba(245,239,228,.16); }
.d23 .step .n { font-family:var(--serif); font-weight:500; font-size:40px; color:var(--accent-2); }
.d23 .step h3 { font-family:var(--serif); font-weight:500; font-size:24px; margin:14px 0 10px; }
.d23 .step p { font-size:14px; line-height:1.65; color:rgba(245,239,228,.66); font-weight:300; }

/* ---------- cta ---------- */
.d23 .cta { background:var(--accent); color:var(--paper); padding:120px 0; text-align:center; }
.d23 .cta h2 { font-family:var(--serif); font-weight:500; font-size:clamp(38px,6vw,92px); line-height:1; letter-spacing:-.01em; }
.d23 .cta h2 em { font-style:italic; }
.d23 .cta .btn { display:inline-flex; align-items:center; gap:10px; margin-top:40px; background:var(--ink); color:var(--ivory); padding:18px 34px; border-radius:46px; font-size:13px; letter-spacing:.16em; text-transform:uppercase; transition:transform .3s; }
.d23 .cta .btn:hover { transform:translateY(-3px); }

/* ---------- feature showcase (tabbed panel + accordion) ---------- */
.d23 .fs { padding:130px 0; }
.d23 .fs-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
.d23 .fs-badge { display:inline-block; font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--accent); border:1px solid var(--accent); border-radius:30px; padding:6px 14px; }
.d23 .fs-title { font-size:clamp(19px,2.6vw,38px); line-height:1.04; letter-spacing:-.01em; margin:18px 0 0; }
.d23 .fs-title em { font-style:italic; color:var(--accent); }
.d23 .fs-desc { margin-top:22px; max-width:46ch; color:var(--muted); font-size:16px; line-height:1.6; }
.d23 .fs-chips { margin-top:24px; display:flex; flex-wrap:wrap; gap:10px; }
.d23 .fs-chip { font-size:12px; letter-spacing:.04em; color:var(--ink); background:var(--bone-2); border-radius:30px; padding:8px 15px; }
.d23 .fs-acc { margin-top:36px; border-top:1px solid var(--line); }
.d23 .fs-item { border-bottom:1px solid var(--line); }
.d23 .fs-q { display:flex; align-items:center; justify-content:space-between; gap:16px; width:100%; padding:18px 2px; text-align:left; font-family:var(--serif); font-weight:500; font-size:clamp(19px,2vw,24px); color:var(--ink); transition:color .3s; }
.d23 .fs-q:hover { color:var(--accent); }
.d23 .fs-ic { font-family:var(--sans); font-size:22px; color:var(--accent); flex:none; line-height:1; }
.d23 .fs-a { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.22,1,.36,1); }
.d23 .fs-item.open .fs-a { max-height:220px; }
.d23 .fs-a p { padding:0 2px 20px; color:var(--muted); font-size:15px; line-height:1.65; max-width:46ch; }
.d23 .fs-ctas { margin-top:34px; display:flex; flex-wrap:wrap; gap:14px; }
.d23 .fs-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 30px; border-radius:44px; font-size:12px; letter-spacing:.16em; text-transform:uppercase; transition:transform .3s, background .3s, color .3s; }
.d23 .fs-btn.fill { background:var(--ink); color:var(--ivory); }
.d23 .fs-btn.fill span { transition:transform .3s; } .d23 .fs-btn.fill:hover { transform:translateY(-2px); } .d23 .fs-btn.fill:hover span { transform:translateX(5px); }
.d23 .fs-btn.ghost { border:1px solid var(--line); color:var(--ink); }
.d23 .fs-btn.ghost:hover { background:var(--accent); color:var(--paper); border-color:var(--accent); }
.d23 .fs-panel { position:relative; width:100%; height:min(640px,72vh); border-radius:6px; overflow:hidden; background:var(--bone-2); box-shadow:0 40px 90px -50px rgba(22,18,12,.55); }
.d23 .fs-media { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transform:scale(1.04); transition:opacity .7s ease, transform 1.1s cubic-bezier(.22,1,.36,1); }
.d23 .fs-media.on { opacity:1; transform:scale(1); }
.d23 .fs-tabs { position:absolute; inset-inline:0; bottom:18px; z-index:3; display:flex; justify-content:center; gap:8px; }
.d23 .fs-tabs > div, .d23 .fs-panel .fs-tabs { padding:0; }
.d23 .fs-tabs button { font-size:12px; letter-spacing:.06em; padding:9px 16px; border-radius:30px; background:rgba(245,239,228,.78); color:var(--ink); backdrop-filter:blur(8px); transition:background .3s, color .3s; }
.d23 .fs-tabs button.on { background:var(--ink); color:var(--ivory); }

/* ---------- testimonials (3D circular carousel) ---------- */
.d23 .tst { padding:130px 0; background:var(--paper); }
.d23 .tst-head { text-align:center; margin-bottom:64px; }
.d23 .tst-head .ey { color:var(--accent); }
.d23 .tst-head h2 { font-family:var(--serif); font-weight:500; font-size:clamp(18px,2.6vw,36px); line-height:1.05; letter-spacing:-.01em; margin-top:16px; }
.d23 .tst-head h2 em { font-style:italic; color:var(--accent); }
.d23 .tst-grid { display:grid; gap:4.5rem; grid-template-columns:1fr; max-width:1040px; margin-inline:auto; align-items:center; }
.d23 .tst-images { position:relative; width:100%; height:24rem; perspective:1000px; }
.d23 .tst-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:14px; box-shadow:0 22px 55px -20px rgba(22,18,12,.5); }
.d23 .tst-content { display:flex; flex-direction:column; justify-content:center; min-height:18rem; }
.d23 .tst-quote { font-family:var(--serif); font-weight:400; font-style:italic; font-size:clamp(20px,2.2vw,27px); line-height:1.5; color:var(--ink-2); }
.d23 .tst-name { font-family:var(--serif); font-weight:600; font-size:clamp(22px,2.4vw,28px); color:var(--ink); margin-top:26px; }
.d23 .tst-desig { color:var(--muted); font-size:12px; letter-spacing:.16em; text-transform:uppercase; margin-top:7px; }
.d23 .tst-arrows { display:flex; gap:1.1rem; padding-top:2.6rem; }
.d23 .tst-arrows button { width:2.8rem; height:2.8rem; border-radius:50%; display:grid; place-items:center; background:var(--ink); color:var(--ivory); transition:background .3s, transform .3s; }
.d23 .tst-arrows button:hover { background:var(--accent); transform:translateY(-2px); }
.d23 .tst-arrows svg { width:18px; height:18px; }
@media (min-width:860px){ .d23 .tst-grid{ grid-template-columns:1fr 1fr; } }

/* ---------- contact ---------- */
.d23 .contact { padding:120px 0; }
.d23 .contact-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:70px; align-items:start; }
.d23 .contact h2 { font-family:var(--serif); font-weight:500; font-size:clamp(18px,2.4vw,34px); line-height:1.05; margin-bottom:20px; }
.d23 .contact h2 em { font-style:italic; color:var(--accent); }
.d23 .contact .sub { color:var(--muted); font-size:16px; line-height:1.6; max-width:40ch; }
.d23 .form { display:flex; flex-direction:column; gap:22px; }
.d23 .ff { position:relative; }
.d23 .ff input, .d23 .ff textarea { width:100%; background:transparent; border:none; border-bottom:1px solid var(--line); padding:14px 0 10px; font-family:var(--sans); font-size:16px; color:var(--ink); }
.d23 .ff textarea { resize:none; }
.d23 .ff input:focus, .d23 .ff textarea:focus { outline:none; border-color:var(--accent); }
.d23 .ff label { position:absolute; left:0; top:14px; color:var(--faint); font-size:16px; pointer-events:none; transition:.3s; }
.d23 .ff input:focus + label, .d23 .ff input:not(:placeholder-shown) + label, .d23 .ff textarea:focus + label, .d23 .ff textarea:not(:placeholder-shown) + label { top:-10px; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); }
.d23 .submit { align-self:flex-start; margin-top:8px; background:var(--ink); color:var(--ivory); padding:16px 32px; border-radius:44px; font-size:12px; letter-spacing:.18em; text-transform:uppercase; transition:background .4s,transform .3s; }
.d23 .submit:hover { transform:translateY(-2px); }
.d23 .submit.ok { background:var(--accent); }

/* ---------- contact: box-reveal + input glow + ripple ---------- */
.d23 .contact-left { position:relative; }
.d23 .ripple { position:absolute; left:-50px; top:-70px; width:500px; height:500px; z-index:0; pointer-events:none; }
.d23 .ripple span { position:absolute; top:50%; left:50%; width:50px; height:50px; transform:translate(-50%,-50%); border:1px solid var(--accent); border-radius:50%; opacity:0; animation:d23ripple 4.5s ease-out infinite; }
@keyframes d23ripple { 0%{ width:50px; height:50px; opacity:.62; } 70%{ opacity:.2; } 100%{ width:500px; height:500px; opacity:0; } }
/* orbiting accent dots (on-brand take on the component's OrbitingCircles) */
.d23 .orbit { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border:1px dashed rgba(156,122,68,.28); border-radius:50%; }
.d23 .orbit::before { content:''; position:absolute; top:-5px; left:50%; width:10px; height:10px; margin-left:-5px; border-radius:50%; background:var(--accent); box-shadow:0 0 18px rgba(156,122,68,.95); }
.d23 .orbit.o1 { width:320px; height:320px; animation:d23orbit 16s linear infinite; }
.d23 .orbit.o2 { width:200px; height:200px; animation:d23orbit 11s linear infinite reverse; }
.d23 .orbit.o2::before { width:7px; height:7px; margin-left:-3.5px; top:-3.5px; }
@keyframes d23orbit { to { transform:translate(-50%,-50%) rotate(360deg); } }
.d23 .contact-left > *:not(.ripple) { position:relative; z-index:1; }
.d23 .contact-meta { margin-top:32px; display:flex; flex-direction:column; gap:7px; }
.d23 .contact-meta a { font-size:15px; color:var(--ink); opacity:.78; transition:color .3s; width:fit-content; } .d23 .contact-meta a:hover{ color:var(--accent); }

.d23 .boxrv { position:relative; opacity:0; transform:translateY(30px); transition:opacity .6s ease calc(.42s + var(--d,0s)), transform .85s cubic-bezier(.22,1,.36,1) calc(.42s + var(--d,0s)); }
.d23 .boxrv.in { opacity:1; transform:none; }
.d23 .boxrv::before { content:''; position:absolute; top:2px; bottom:2px; left:-2px; right:-2px; background:var(--accent); z-index:6; border-radius:3px; transform:scaleX(0); transform-origin:right; pointer-events:none; }
.d23 .boxrv.in::before { animation:d23box 1.05s cubic-bezier(.76,0,.24,1) var(--d,0s) forwards; }
@keyframes d23box { 0%{ transform:scaleX(1); transform-origin:left; } 48%{ transform:scaleX(1); transform-origin:left; } 49%{ transform:scaleX(1); transform-origin:right; } 100%{ transform:scaleX(0); transform-origin:right; } }
.d23 .form .boxrv:nth-child(2){ --d:.12s; } .d23 .form .boxrv:nth-child(3){ --d:.24s; } .d23 .form .boxrv:nth-child(4){ --d:.36s; }

.d23 .ff input, .d23 .ff textarea, .d23 .ff label { position:relative; z-index:1; }
.d23 .ff::after { content:''; position:absolute; inset:-8px -12px; border-radius:14px; background:radial-gradient(160px circle at var(--mx,50%) var(--my,50%), rgba(156,122,68,.22), transparent 70%); opacity:0; transition:opacity .35s; pointer-events:none; z-index:0; }
.d23 .ff:hover::after, .d23 .ff:focus-within::after { opacity:1; }

/* submit shimmer sweep on hover (nod to the component's BottomGradient) */
.d23 .submit { position:relative; overflow:hidden; }
.d23 .submit::after { content:''; position:absolute; top:0; bottom:0; left:-60%; width:45%; background:linear-gradient(100deg, transparent, rgba(245,239,228,.42), transparent); transform:skewX(-18deg); pointer-events:none; }
.d23 .submit:hover::after { animation:d23shimmer .85s ease; }
@keyframes d23shimmer { from{ left:-60%; } to{ left:130%; } }

/* contact — richer form (room/budget selects) + visit-the-atelier card */
.d23 .contact .ey { display:block; margin-bottom:14px; }
.d23 .form-row { display:grid; grid-template-columns:1fr 1fr; gap:28px; }
.d23 .ff.sel { display:flex; flex-direction:column; gap:9px; }
.d23 .ff.sel > label { position:static; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); }
.d23 .ff.sel select { appearance:none; -webkit-appearance:none; width:100%; background:transparent; border:none; border-bottom:1px solid var(--line); padding:10px 26px 10px 0; font-family:var(--sans); font-size:16px; color:var(--ink); cursor:pointer; border-radius:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239c7a44' fill='none' stroke-width='1.5'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 2px center; }
.d23 .ff.sel select:focus { outline:none; border-color:var(--accent); }

.d23 .visit { border:1px solid var(--line); border-radius:6px; overflow:hidden; background:var(--paper); display:flex; flex-direction:column; }
.d23 .visit-img { position:relative; aspect-ratio:16/10; overflow:hidden; }
.d23 .visit-img figcaption { position:absolute; left:16px; bottom:14px; color:var(--ivory); font-size:11px; letter-spacing:.18em; text-transform:uppercase; text-shadow:0 1px 12px rgba(0,0,0,.6); }
.d23 .visit-body { padding:30px 32px 34px; }
.d23 .visit-body .ey { margin-bottom:12px; }
.d23 .visit-body h3 { font-family:var(--serif); font-weight:500; font-size:clamp(16px,1.8vw,23px); line-height:1.1; }
.d23 .visit-body h3 em { font-style:italic; color:var(--accent); }
.d23 .visit-copy { margin-top:14px; color:var(--muted); font-size:14px; line-height:1.6; }
.d23 .visit-list { list-style:none; margin:24px 0 26px; }
.d23 .visit-list li { padding:14px 0; border-top:1px solid var(--line); font-size:14px; color:var(--ink); line-height:1.5; }
.d23 .visit-list li span { display:block; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin-bottom:6px; }
.d23 .visit-list a { color:var(--ink); } .d23 .visit-list a:hover { color:var(--accent); }
.d23 .visit-btn { display:inline-flex; align-items:center; gap:10px; border:1px solid var(--ink); border-radius:44px; padding:14px 28px; font-size:12px; letter-spacing:.16em; text-transform:uppercase; transition:background .3s,color .3s; }
.d23 .visit-btn:hover { background:var(--ink); color:var(--ivory); }
.d23 .visit-btn span { transition:transform .3s; } .d23 .visit-btn:hover span { transform:translateX(5px); }
@media (max-width:560px){ .d23 .form-row{ grid-template-columns:1fr; gap:22px; } }

/* contact — premium dark theme (scoped to this section only) */
.d23 .contact { background:#0c0a07; color:var(--ivory); }
.d23 .contact ::selection { background:var(--accent-2); color:var(--ink); }
.d23 .contact .ey { color:var(--accent-2); }
.d23 .contact h2, .d23 .contact .visit-body h3 { color:var(--ivory); }
.d23 .contact h2 em, .d23 .contact .visit-body h3 em { color:var(--accent-2); }
.d23 .contact .ff input, .d23 .contact .ff textarea, .d23 .contact .ff.sel select { color:var(--ivory); border-bottom-color:rgba(245,239,228,.22); }
.d23 .contact .ff label { color:rgba(245,239,228,.5); }
.d23 .contact .ff input:focus, .d23 .contact .ff textarea:focus, .d23 .contact .ff.sel select:focus { border-bottom-color:var(--accent-2); }
.d23 .contact .ff input:focus + label, .d23 .contact .ff input:not(:placeholder-shown) + label, .d23 .contact .ff textarea:focus + label, .d23 .contact .ff textarea:not(:placeholder-shown) + label, .d23 .contact .ff.sel > label { color:var(--accent-2); }
.d23 .contact .ff.sel select option { color:var(--ink); }
.d23 .contact .submit { background:var(--accent-2); color:var(--ink); }
.d23 .contact .submit.ok { background:var(--ivory); color:var(--ink); }
.d23 .contact .visit { background:#15110a; border-color:rgba(245,239,228,.14); }
.d23 .contact .visit-copy { color:rgba(245,239,228,.6); }
.d23 .contact .visit-list li { border-top-color:rgba(245,239,228,.14); color:var(--ivory); }
.d23 .contact .visit-list li span { color:rgba(245,239,228,.5); }
.d23 .contact .visit-list a { color:var(--ivory); } .d23 .contact .visit-list a:hover { color:var(--accent-2); }
.d23 .contact .visit-btn { border-color:rgba(245,239,228,.4); color:var(--ivory); }
.d23 .contact .visit-btn:hover { background:var(--ivory); color:var(--ink); border-color:var(--ivory); }
.d23 .contact .orbit { border-color:rgba(194,161,97,.32); }

/* ---------- footer ---------- */
.d23 footer { border-top:1px solid var(--line); padding:70px 0 40px; }
.d23 .foot-top { display:flex; align-items:flex-start; justify-content:space-between; gap:40px; flex-wrap:wrap; }
.d23 .foot-brand { font-family:var(--serif); font-weight:600; font-size:30px; }
.d23 .foot-brand i { color:var(--accent); font-style:normal; }
.d23 .foot-links { display:flex; gap:54px; flex-wrap:wrap; }
.d23 .fcol h4 { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
.d23 .fcol a, .d23 .fcol p { display:block; font-size:14px; color:var(--ink); opacity:.74; margin-bottom:9px; }
.d23 .foot-huge { font-family:var(--serif); font-weight:500; font-size:clamp(58px,15vw,220px); line-height:.9; letter-spacing:-.02em; color:var(--bone-2); margin:60px 0 30px; text-align:center; user-select:none; }
.d23 .foot-bottom { display:flex; align-items:center; justify-content:space-between; gap:20px; font-size:12px; color:var(--muted); flex-wrap:wrap; }

/* ---------- reveals ---------- */
.d23 .rv { opacity:0; transform:translateY(42px); transition:opacity 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1); }
.d23 .rv.in { opacity:1; transform:none; }
.d23 .ir { overflow:hidden; } .d23 .ir img { transform:scale(1.18); transition:transform 1.3s cubic-bezier(.22,1,.36,1); } .d23 .ir.in img { transform:scale(1); }

/* ---------- collections carousel ---------- */
.d23 .ofc { padding:120px 0; overflow:hidden; }
.d23 .ofc-head { display:flex; align-items:flex-end; justify-content:space-between; gap:30px; margin-bottom:46px; }
.d23 .ofc-head .ey { color:var(--accent); }
.d23 .ofc-head h2 { font-family:var(--serif); font-weight:500; font-size:clamp(18px,2.4vw,34px); line-height:1.05; letter-spacing:-.01em; margin-top:14px; }
.d23 .ofc-head h2 em { font-style:italic; color:var(--accent); }
.d23 .ofc-nav { display:flex; gap:12px; flex:none; }
.d23 .ofc-nav button { width:50px; height:50px; border-radius:50%; border:1px solid var(--line); display:grid; place-items:center; color:var(--ink); transition:background .3s,color .3s,border-color .3s,transform .3s; }
.d23 .ofc-nav button:hover { background:var(--ink); color:var(--ivory); border-color:var(--ink); }
.d23 .ofc-nav svg { width:20px; height:20px; }
.d23 .ofc-track { display:flex; gap:24px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px max(calc((100vw - min(1320px,90vw)) / 2),5vw) 30px; scrollbar-width:none; -ms-overflow-style:none; }
.d23 .ofc-track::-webkit-scrollbar { display:none; }
.d23 .ofc-card { flex:0 0 auto; width:320px; height:440px; border-radius:18px; overflow:hidden; scroll-snap-align:start; background:var(--paper); border:1px solid var(--line-2); box-shadow:0 18px 44px -28px rgba(22,18,12,.4); display:flex; flex-direction:column; transition:transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s; }
.d23 .ofc-card:hover { transform:translateY(-10px); box-shadow:0 40px 70px -34px rgba(22,18,12,.55); }
.d23 .ofc-img { position:relative; height:52%; overflow:hidden; }
.d23 .ofc-img img { width:100%; height:100%; object-fit:cover; transition:transform .7s cubic-bezier(.22,1,.36,1); }
.d23 .ofc-card:hover .ofc-img img { transform:scale(1.08); }
.d23 .ofc-body { height:48%; padding:22px 22px 20px; display:flex; flex-direction:column; justify-content:space-between; }
.d23 .ofc-tag { display:inline-flex; align-items:center; gap:7px; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); }
.d23 .ofc-tag svg { width:14px; height:14px; }
.d23 .ofc-body h3 { font-family:var(--serif); font-weight:500; font-size:26px; line-height:1; margin:12px 0 8px; color:var(--ink); }
.d23 .ofc-body p { font-size:13.5px; line-height:1.55; color:var(--muted); }
.d23 .ofc-foot { display:flex; align-items:center; justify-content:space-between; padding-top:16px; border-top:1px solid var(--line); }
.d23 .ofc-brand { display:flex; align-items:center; gap:11px; }
.d23 .ofc-mono { width:32px; height:32px; border-radius:50%; display:grid; place-items:center; background:var(--bone-2); color:var(--accent); font-size:14px; flex:none; }
.d23 .ofc-brand b { display:block; font-size:12px; font-weight:600; color:var(--ink); }
.d23 .ofc-brand span { font-size:11px; color:var(--faint); }
.d23 .ofc-arrow { width:36px; height:36px; border-radius:50%; display:grid; place-items:center; background:var(--bone-2); color:var(--ink); transition:transform .4s,background .3s,color .3s; }
.d23 .ofc-card:hover .ofc-arrow { background:var(--accent); color:var(--paper); transform:rotate(-45deg); }
.d23 .ofc-arrow svg { width:16px; height:16px; }
@media (max-width:560px){ .d23 .ofc-card{ width:260px; height:400px; } }

/* ---------- product showcase (before/after) ---------- */
.d23 .ps { padding:130px 0; }
.d23 .ps-head { display:flex; align-items:flex-end; justify-content:space-between; gap:30px; margin-bottom:54px; flex-wrap:wrap; }
.d23 .ps-head h2 { font-family:var(--serif); font-weight:500; font-size:clamp(18px,2.6vw,38px); line-height:1.05; letter-spacing:-.01em; }
.d23 .ps-head h2 em { font-style:italic; color:var(--accent); }
.d23 .ps-head p { max-width:34ch; color:var(--muted); font-size:15px; line-height:1.6; }
.d23 .ps-grid { display:grid; grid-template-columns:1.7fr 1fr; gap:54px; align-items:center; }
.d23 .ba { position:relative; width:100%; aspect-ratio:16/10; overflow:hidden; border-radius:4px; cursor:ew-resize; user-select:none; background:var(--bone-2); box-shadow:0 34px 80px -46px rgba(22,18,12,.55); }
.d23 .ba img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
/* fallback-only raw treatment, applied inline when no real 'before' image exists yet */
.d23 .ba .before.raw { filter:grayscale(.72) brightness(.7) contrast(1.03); }
.d23 .ba .tag { position:absolute; top:18px; font-size:10px; letter-spacing:.2em; text-transform:uppercase; padding:6px 13px; border-radius:30px; z-index:5; transition:opacity .25s; }
.d23 .ba .tag.a { right:18px; background:rgba(245,239,228,.92); color:var(--ink); }
.d23 .ba .tag.b { left:18px; background:rgba(22,18,12,.72); color:var(--ivory); }
.d23 .ba .line { position:absolute; inset-block:0; width:1px; background:var(--ivory); transform:translateX(-50%); z-index:6; pointer-events:none; }
.d23 .ba .knob { position:absolute; top:50%; width:54px; height:54px; border-radius:50%; background:var(--ivory); color:var(--ink); display:grid; place-items:center; z-index:7; pointer-events:none; box-shadow:0 10px 28px rgba(0,0,0,.32); font-size:18px; transition:transform .12s ease; }
.d23 .ps-num { font-family:var(--serif); font-weight:500; font-size:22px; color:var(--accent); letter-spacing:.04em; }
.d23 .ps-name { font-family:var(--serif); font-weight:500; font-size:clamp(16px,1.9vw,25px); line-height:1.1; margin:10px 0 14px; }
.d23 .ps-desc { color:var(--muted); font-size:15px; line-height:1.65; max-width:38ch; }
.d23 .ps-list { list-style:none; margin-top:30px; border-top:1px solid var(--line); }
.d23 .ps-list li { border-bottom:1px solid var(--line); }
.d23 .ps-list button { display:flex; align-items:center; gap:16px; width:100%; padding:14px 4px; text-align:left; transition:padding-left .35s ease; }
.d23 .ps-list button:hover { padding-left:12px; }
.d23 .ps-list .thumb { width:56px; height:40px; border-radius:3px; overflow:hidden; flex:none; filter:saturate(.92); }
.d23 .ps-list .thumb img { width:100%; height:100%; object-fit:cover; }
.d23 .ps-list .pn { font-family:var(--serif); font-size:20px; font-weight:500; color:var(--muted); transition:color .3s; }
.d23 .ps-list .pi { margin-left:auto; font-size:11px; letter-spacing:.16em; color:var(--faint); }
.d23 .ps-list li.on button { padding-left:12px; }
.d23 .ps-list li.on .pn, .d23 .ps-list li:hover .pn { color:var(--ink); }
.d23 .ps-hint { margin-top:24px; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); display:inline-flex; align-items:center; gap:10px; }

/* ---------- mobile ---------- */
.d23 .mob { position:fixed; inset:0; z-index:880; background:var(--ink); color:var(--ivory); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px; transform:translateY(-100%); transition:transform .6s cubic-bezier(.76,0,.24,1); }
.d23 .mob.open { transform:translateY(0); }
.d23 .mob a { font-family:var(--serif); font-size:34px; font-weight:500; }
.d23 .mob a em { font-style:italic; color:var(--accent-2); }
@media (max-width:900px){
  .d23 .stats{ grid-template-columns:repeat(2,1fr); gap:40px 30px; } .d23 .steps{ grid-template-columns:repeat(2,1fr); }
  .d23 .grid{ grid-template-columns:repeat(2,1fr); } .d23 .fig.full{ grid-column:span 2; } .d23 .fig.half{ grid-column:span 2; } .d23 .fig.third{ grid-column:span 1; }
  .d23 .contact-grid{ grid-template-columns:1fr; gap:50px; }
  .d23 .ps-grid{ grid-template-columns:1fr; gap:38px; }
}
@media (max-width:760px){
  .d23 .nav-links, .d23 .nav-cta{ display:none; } .d23 .burger{ display:block; }
  .d23 .chapter.right{ left:7vw; right:auto; text-align:left; } .d23 .chapter.right p{ margin-left:0; }
}
@media (prefers-reduced-motion: reduce){ .d23 *{ animation:none !important; transition:none !important; } .d23 .rv{ opacity:1; transform:none; } .d23 .reveal span > i{ transform:none; } }

/* ---------- unified heading style — matches the ProjectsZoom "Al Manara" project name,
   applied to every main section heading across the site (Fraunces · 300 · clamp 2–3.8rem). ---------- */
.d23 .ofc-head h2, .d23 .ps-head h2, .d23 .gal-head h2, .d23 .proc h2, .d23 .fs-title,
.d23 .tst-head h2, .d23 .contact h2, .d23 .visit-body h3, .d23 .atl-copy h2, .d23 .apr-title,
.d23 .lg-head h2, .d23 .wld-title, .d23 .cat-title, .d23 .fbh-h2, .d23 .ctb-h2, .d23 .pz-intro-h2 {
  font-family:var(--serif) !important; font-weight:300 !important;
  font-size:clamp(2rem,4.6vw,3.8rem) !important; line-height:1.05 !important; letter-spacing:-.01em !important;
}
`;
