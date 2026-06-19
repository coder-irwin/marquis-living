/**
 * Akaash · Design 12 — "Loft". A warm editorial luxury-builder design language
 * (Noto Serif Display + Fragment Mono + Inter; sand accent on bone/near-black;
 * Lenis smooth scroll; full-bleed hero video; serif tickers; editorial project
 * rows; scroll reveals + parallax). Scoped under `.d13`, injected inline.
 */
export const D12_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,opsz,wght@0,10..72,300;0,10..72,400;0,10..72,500;1,10..72,300;1,10..72,400&family=Fragment+Mono:ital@0;1&family=Inter:wght@300;400;500&display=swap');

.d13 {
  --bone:#f5f2ec; --bone-2:#ebe6dc; --paper:#fbfaf6;
  --ink:#181211; --ink-2:#2b2422;
  --sand:#bea890; --sand-2:#a78d72; --sand-soft:rgba(190,168,144,0.14);
  --muted:rgba(24,18,17,0.56); --faint:rgba(24,18,17,0.40);
  --line:rgba(24,18,17,0.14); --line-2:rgba(24,18,17,0.07);
  --serif:'Noto Serif Display',Georgia,serif; --mono:'Fragment Mono',ui-monospace,monospace; --sans:'Inter',system-ui,sans-serif;
  background:var(--bone); color:var(--ink); font-family:var(--sans);
  overflow-x:hidden; min-height:100vh; position:relative; -webkit-font-smoothing:antialiased;
}
.d13 *, .d13 *::before, .d13 *::after { margin:0; padding:0; box-sizing:border-box; }
.d13 img { display:block; width:100%; height:100%; object-fit:cover; }
.d13 a { text-decoration:none; color:inherit; }
.d13 button { font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
.d13 ::selection { background:var(--sand); color:var(--ink); }
.d13 section { position:relative; }
.d13 .wrap { width:min(1320px,90vw); margin-inline:auto; }
.d13 .serif { font-family:var(--serif); font-weight:300; letter-spacing:-.01em; line-height:1.02; }
.d13 .serif em { font-style:italic; }
.d13 .mono { font-family:var(--mono); font-size:12px; letter-spacing:.02em; text-transform:uppercase; }

/* ---------- film grain ---------- */
.d13 .grain { position:fixed; inset:0; z-index:996; pointer-events:none; opacity:0.4; mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E"); background-size:200px; }

/* ---------- cursor ---------- */
.d13 .cur { position:fixed; top:0; left:0; width:10px; height:10px; border-radius:50%; background:var(--sand); z-index:10000; pointer-events:none; transform:translate(-50%,-50%); mix-blend-mode:difference; transition:width .25s,height .25s,background .25s; }
.d13 .cur.big { width:64px; height:64px; background:rgba(190,168,144,0.25); }
@media (hover:none),(pointer:coarse){ .d13 .cur{ display:none; } }

/* ---------- curtain ---------- */
.d13 .curtain { position:fixed; inset:0; z-index:9999; background:var(--ink); display:flex; align-items:center; justify-content:center; transition:transform 1s cubic-bezier(.76,0,.24,1); }
.d13 .curtain.up { transform:translateY(-100%); }
.d13 .curtain b { font-family:var(--serif); font-weight:300; font-size:clamp(26px,4vw,46px); color:var(--bone); }
.d13 .curtain b em { color:var(--sand); font-style:italic; }

/* ---------- reveals ---------- */
.d13 .rv { opacity:0; transform:translateY(40px); transition:opacity 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1); }
.d13 .rv.in { opacity:1; transform:none; }
.d13 .ir { overflow:hidden; }
.d13 .ir img { transform:scale(1.2); transition:transform 1.3s cubic-bezier(.22,1,.36,1); }
.d13 .ir.in img { transform:scale(1); }
.d13 .lines span { display:block; overflow:hidden; }
.d13 .lines span > i { display:block; font-style:inherit; transform:translateY(110%); transition:transform 1s cubic-bezier(.76,0,.24,1); }
.d13 .lines.in span > i { transform:translateY(0); }
.d13 .lines.in span:nth-child(2) > i { transition-delay:.08s; }
.d13 .lines.in span:nth-child(3) > i { transition-delay:.16s; }
.d13 .ey { display:inline-flex; align-items:center; gap:10px; color:var(--sand-2); opacity:0; transition:opacity .8s ease; }
.d13 .ey.in { opacity:1; }
.d13 .ey::before { content:''; width:26px; height:1px; background:var(--sand-2); }

/* ---------- nav ---------- */
.d13 .nav { position:fixed; top:0; left:0; right:0; z-index:900; transition:background .5s,box-shadow .5s; }
.d13 .nav.solid { background:rgba(245,242,236,0.85); backdrop-filter:blur(14px); box-shadow:0 1px 0 var(--line-2); }
.d13 .nav.solid .nav-in, .d13 .nav.solid .logo, .d13 .nav.solid .nav-links a, .d13 .nav.solid .nav-cta { color:var(--ink); }
.d13 .nav-in { display:flex; align-items:center; justify-content:space-between; height:78px; width:min(1320px,90vw); margin-inline:auto; color:var(--bone); transition:height .4s; }
.d13 .nav.solid .nav-in { height:64px; }
.d13 .logo { font-family:var(--serif); font-weight:400; font-size:21px; letter-spacing:.02em; display:flex; gap:1px; align-items:baseline; }
.d13 .logo i { color:var(--sand); font-style:normal; }
.d13 .nav-links { display:flex; gap:30px; list-style:none; }
.d13 .nav-links a { font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:.04em; position:relative; padding:4px 0; opacity:.85; transition:opacity .25s; }
.d13 .nav-links a::after { content:''; position:absolute; left:0; bottom:0; width:100%; height:1px; background:currentColor; transform:scaleX(0); transform-origin:right; transition:transform .35s cubic-bezier(.76,0,.24,1); }
.d13 .nav-links a:hover { opacity:1; }
.d13 .nav-links a:hover::after, .d13 .nav-links a.active::after { transform:scaleX(1); transform-origin:left; }
.d13 .nav-cta { font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:.04em; border:1px solid currentColor; border-radius:40px; padding:10px 20px; transition:background .3s,color .3s,border-color .3s; }
.d13 .nav-cta:hover { background:var(--sand); border-color:var(--sand); color:var(--ink); }
.d13 .burger { display:none; flex-direction:column; gap:5px; width:28px; }
.d13 .burger span { height:1.5px; background:currentColor; }
.d13 .mob { display:none; }

/* ---------- buttons ---------- */
.d13 .btn { display:inline-flex; align-items:center; gap:12px; font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:.06em; padding:16px 30px; border-radius:44px; position:relative; overflow:hidden; }
.d13 .btn span, .d13 .btn .ar { position:relative; z-index:1; transition:color .35s,transform .35s; }
.d13 .btn:hover .ar { transform:translateX(5px); }
.d13 .btn::before { content:''; position:absolute; inset:0; border-radius:44px; transform:translateY(101%); transition:transform .45s cubic-bezier(.76,0,.24,1); }
.d13 .btn-fill { background:var(--sand); color:var(--ink); }
.d13 .btn-fill::before { background:var(--ink); }
.d13 .btn-fill:hover span,.d13 .btn-fill:hover .ar { color:var(--bone); }
.d13 .btn-fill:hover::before { transform:translateY(0); }
.d13 .btn-line { border:1px solid var(--ink); }
.d13 .btn-line::before { background:var(--ink); }
.d13 .btn-line:hover span,.d13 .btn-line:hover .ar { color:var(--bone); }
.d13 .btn-line:hover::before { transform:translateY(0); }
.d13 .on-dark .btn-line { border-color:rgba(255,255,255,0.4); color:var(--bone); }
.d13 .on-dark .btn-line::before { background:var(--sand); }
.d13 .on-dark .btn-line:hover span,.d13 .on-dark .btn-line:hover .ar { color:var(--ink); }

/* ---------- hero ---------- */
.d13 .hero { height:100vh; min-height:640px; position:relative; overflow:hidden; display:flex; align-items:flex-end; color:var(--bone); }
.d13 .hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
.d13 .hero-scrim { position:absolute; inset:0; z-index:1; background:linear-gradient(180deg, rgba(24,18,17,0.5) 0%, rgba(24,18,17,0.1) 35%, rgba(24,18,17,0.15) 60%, rgba(24,18,17,0.78) 100%); }
.d13 .hero-in { position:relative; z-index:2; width:100%; padding-bottom:7vh; }
.d13 .hero-top { display:flex; justify-content:space-between; gap:20px; margin-bottom:30px; color:rgba(245,242,236,0.75); }
.d13 .hero h1 { font-family:var(--serif); font-weight:300; font-size:clamp(48px,9vw,150px); line-height:.92; letter-spacing:-.02em; }
.d13 .hero h1 em { font-style:italic; color:var(--sand); }
.d13 .hero-foot { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; margin-top:36px; flex-wrap:wrap; }
.d13 .hero-foot p { max-width:42ch; font-size:16px; line-height:1.6; color:rgba(245,242,236,0.8); }
.d13 .scroll-cue { display:inline-flex; align-items:center; gap:10px; color:rgba(245,242,236,0.7); }
.d13 .scroll-cue .ln { width:46px; height:1px; background:rgba(245,242,236,0.4); position:relative; overflow:hidden; }
.d13 .scroll-cue .ln::after { content:''; position:absolute; inset:0; background:var(--sand); animation:d13slide 1.8s ease-in-out infinite; }
@keyframes d13slide { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }

/* ---------- ticker ---------- */
.d13 .ticker { border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:24px 0; overflow:hidden; }
.d13 .ticker.on-dark { border-color:rgba(255,255,255,0.14); }
.d13 .ticker-tr { display:flex; gap:30px; width:max-content; white-space:nowrap; animation:d13marq 30s linear infinite; }
.d13 .ticker.rev .ticker-tr { animation-direction:reverse; }
.d13 .ticker:hover .ticker-tr { animation-play-state:paused; }
.d13 .ticker-tr span { font-family:var(--serif); font-weight:300; font-size:clamp(28px,3.4vw,46px); display:inline-flex; align-items:center; gap:30px; }
.d13 .ticker-tr em { font-style:italic; color:var(--sand-2); }
.d13 .ticker-tr .dot { color:var(--sand); }
@keyframes d13marq { to { transform:translateX(-50%); } }

/* ---------- intro / proof ---------- */
.d13 .intro { padding:130px 0; }
.d13 .intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:end; }
.d13 .intro h2 { font-family:var(--serif); font-weight:300; font-size:clamp(28px,3.4vw,50px); line-height:1.18; }
.d13 .intro h2 em { font-style:italic; color:var(--sand-2); }
.d13 .intro h2 .mut { color:var(--faint); }
.d13 .intro-side p { font-size:16px; line-height:1.7; color:var(--muted); margin-bottom:26px; max-width:44ch; }
.d13 .stats { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:80px; border-top:1px solid var(--line); }
.d13 .stat { padding-top:30px; }
.d13 .stat .n { font-family:var(--serif); font-weight:300; font-size:clamp(48px,6vw,86px); line-height:1; }
.d13 .stat .n .suf { color:var(--sand-2); }
.d13 .stat .l { font-family:var(--mono); font-size:11px; text-transform:uppercase; letter-spacing:.04em; color:var(--muted); margin-top:14px; max-width:22ch; }

/* ---------- featured projects (editorial rows) ---------- */
.d13 .projects { padding:40px 0 120px; }
.d13 .sec-head { display:flex; align-items:flex-end; justify-content:space-between; gap:20px; padding:60px 0 50px; flex-wrap:wrap; }
.d13 .sec-head h2 { font-family:var(--serif); font-weight:300; font-size:clamp(34px,5vw,76px); line-height:.98; }
.d13 .sec-head h2 em { font-style:italic; color:var(--sand-2); }
.d13 .prow { display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center; padding:46px 0; border-top:1px solid var(--line); }
.d13 .prow:last-child { border-bottom:1px solid var(--line); }
.d13 .prow.flip .pr-media { order:2; }
.d13 .pr-media { height:62vh; min-height:440px; border-radius:4px; overflow:hidden; }
.d13 .pr-media img { transition:transform 1.1s cubic-bezier(.22,1,.36,1); }
.d13 .prow:hover .pr-media img { transform:scale(1.05); }
.d13 .pr-body .pr-n { font-family:var(--mono); font-size:12px; color:var(--sand-2); }
.d13 .pr-body h3 { font-family:var(--serif); font-weight:300; font-size:clamp(32px,4vw,60px); line-height:1; margin:14px 0 22px; }
.d13 .pr-meta { display:flex; gap:30px; flex-wrap:wrap; margin-bottom:26px; }
.d13 .pr-meta div span { font-family:var(--mono); font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:var(--faint); display:block; margin-bottom:4px; }
.d13 .pr-meta div b { font-weight:400; font-size:15px; }
.d13 .pr-link { font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:.06em; display:inline-flex; gap:10px; align-items:center; border-bottom:1px solid var(--ink); padding-bottom:4px; transition:gap .3s,color .3s,border-color .3s; }
.d13 .pr-link:hover { gap:16px; color:var(--sand-2); border-color:var(--sand-2); }

/* ---------- process ---------- */
.d13 .process { padding:120px 0; background:var(--ink); color:var(--bone); }
.d13 .process .sec-head h2 em { color:var(--sand); }
.d13 .process .ey { color:var(--sand); }
.d13 .process .ey::before { background:var(--sand); }
.d13 .pstep { display:grid; grid-template-columns:120px 1fr 1.2fr; gap:40px; align-items:start; padding:44px 0; border-top:1px solid rgba(255,255,255,0.14); transition:padding-left .4s; }
.d13 .pstep:hover { padding-left:14px; }
.d13 .pstep:last-child { border-bottom:1px solid rgba(255,255,255,0.14); }
.d13 .pstep .ps-n { font-family:var(--serif); font-weight:300; font-size:46px; color:var(--sand); line-height:.9; }
.d13 .pstep h3 { font-family:var(--serif); font-weight:300; font-size:clamp(26px,2.6vw,38px); }
.d13 .pstep p { font-size:15px; line-height:1.7; color:rgba(245,242,236,0.6); max-width:52ch; }

/* ---------- crew ---------- */
.d13 .crew { padding:120px 0; }
.d13 .crew-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; margin-top:50px; }
.d13 .member .m-card { aspect-ratio:4/5; border-radius:4px; overflow:hidden; display:flex; align-items:flex-end; padding:24px; background:linear-gradient(160deg,var(--bone-2),#ded5c6); position:relative; }
.d13 .member .m-mono { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:var(--serif); font-weight:300; font-size:72px; color:rgba(24,18,17,0.16); }
.d13 .member .m-tag { position:relative; z-index:1; }
.d13 .member h3 { font-family:var(--serif); font-weight:400; font-size:24px; }
.d13 .member p { font-family:var(--mono); font-size:11px; text-transform:uppercase; letter-spacing:.04em; color:var(--sand-2); margin-top:4px; }

/* ---------- gallery ---------- */
.d13 .gallery { padding:60px 0 120px; }
.d13 .gal-grid { columns:3; column-gap:22px; margin-top:40px; }
.d13 .gal-grid .g-item { break-inside:avoid; margin-bottom:22px; border-radius:4px; overflow:hidden; }
.d13 .gal-grid .g-item img { transition:transform 1s cubic-bezier(.22,1,.36,1); }
.d13 .gal-grid .g-item:hover img { transform:scale(1.05); }

/* ---------- full-bleed media band ---------- */
.d13 .band { height:84vh; min-height:520px; position:relative; overflow:hidden; }
.d13 .band img, .d13 .band video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.d13 .band .par { will-change:transform; height:120%; top:-10%; }

/* ---------- cta ---------- */
.d13 .cta { padding:150px 0; background:var(--ink); color:var(--bone); text-align:center; }
.d13 .cta .ey { color:var(--sand); justify-content:center; }
.d13 .cta .ey::before { background:var(--sand); }
.d13 .cta h2 { font-family:var(--serif); font-weight:300; font-size:clamp(48px,9vw,150px); line-height:.92; margin:26px 0 34px; letter-spacing:-.02em; }
.d13 .cta h2 em { font-style:italic; color:var(--sand); }

/* ---------- contact ---------- */
.d13 .contact { padding:160px 0 120px; }
.d13 .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; }
.d13 .contact h1 { font-family:var(--serif); font-weight:300; font-size:clamp(48px,7vw,110px); line-height:.94; letter-spacing:-.02em; }
.d13 .contact h1 em { font-style:italic; color:var(--sand-2); }
.d13 .contact .lead { font-size:17px; line-height:1.6; color:var(--muted); max-width:42ch; margin:26px 0 36px; }
.d13 .crow { padding:20px 0; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:4px; }
.d13 .crow:last-child { border-bottom:1px solid var(--line); }
.d13 .crow span { font-family:var(--mono); font-size:10px; text-transform:uppercase; letter-spacing:.12em; color:var(--faint); }
.d13 .crow a, .d13 .crow b { font-family:var(--serif); font-weight:300; font-size:22px; }
.d13 .crow a:hover { color:var(--sand-2); }
.d13 .form { background:var(--paper); border:1px solid var(--line-2); border-radius:6px; padding:42px; }
.d13 .ff { position:relative; margin-bottom:26px; }
.d13 .ff input, .d13 .ff textarea { width:100%; background:transparent; border:none; border-bottom:1px solid var(--line); padding:14px 0 10px; font-family:inherit; font-size:15px; color:var(--ink); resize:none; }
.d13 .ff input:focus, .d13 .ff textarea:focus { outline:none; border-color:var(--sand-2); }
.d13 .ff label { position:absolute; left:0; top:14px; color:var(--faint); font-size:15px; pointer-events:none; transition:.25s; }
.d13 .ff input:focus + label, .d13 .ff input:not(:placeholder-shown) + label, .d13 .ff textarea:focus + label, .d13 .ff textarea:not(:placeholder-shown) + label { top:-9px; font-family:var(--mono); font-size:10px; text-transform:uppercase; letter-spacing:.08em; color:var(--sand-2); }
.d13 .submit { width:100%; background:var(--ink); color:var(--bone); padding:17px; border-radius:44px; font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:.08em; transition:background .35s; }
.d13 .submit:hover { background:var(--sand-2); }
.d13 .submit.ok { background:#3f7d4f; }

/* ---------- page hero (interior pages) ---------- */
.d13 .phero { padding:170px 0 50px; }
.d13 .phero h1 { font-family:var(--serif); font-weight:300; font-size:clamp(52px,9vw,150px); line-height:.92; letter-spacing:-.02em; }
.d13 .phero h1 em { font-style:italic; color:var(--sand-2); }
.d13 .phero-sub { display:flex; justify-content:space-between; gap:24px; margin-top:30px; flex-wrap:wrap; align-items:flex-end; }
.d13 .phero-sub p { max-width:46ch; font-size:16px; line-height:1.6; color:var(--muted); }
.d13 .phero-band { height:58vh; min-height:400px; margin-top:50px; border-radius:4px; overflow:hidden; }

/* ---------- footer ---------- */
.d13 footer { background:var(--ink); color:var(--bone); padding:90px 0 40px; }
.d13 .foot-top { display:grid; grid-template-columns:1.6fr 1fr 1fr 1.3fr; gap:40px; padding-bottom:60px; border-bottom:1px solid rgba(255,255,255,0.12); }
.d13 .foot-brand .logo { font-size:30px; margin-bottom:18px; color:var(--bone); }
.d13 .foot-brand p { font-size:14px; line-height:1.6; color:rgba(245,242,236,0.55); max-width:32ch; }
.d13 .fcol h4 { font-family:var(--mono); font-size:10px; text-transform:uppercase; letter-spacing:.12em; color:rgba(245,242,236,0.45); margin-bottom:20px; }
.d13 .fcol a, .d13 .fcol p { display:block; font-size:14px; color:rgba(245,242,236,0.78); margin-bottom:12px; transition:color .25s; }
.d13 .fcol a:hover { color:var(--sand); }
.d13 .foot-mail { display:flex; gap:10px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:10px; margin-top:10px; }
.d13 .foot-mail input { flex:1; background:transparent; border:none; color:var(--bone); font-family:inherit; font-size:14px; }
.d13 .foot-mail input:focus { outline:none; }
.d13 .foot-mail button { font-family:var(--mono); font-size:11px; text-transform:uppercase; color:var(--sand); }
.d13 .foot-bottom { display:flex; justify-content:space-between; padding-top:28px; flex-wrap:wrap; gap:12px; }
.d13 .foot-bottom p, .d13 .foot-bottom a { font-family:var(--mono); font-size:11px; text-transform:uppercase; letter-spacing:.04em; color:rgba(245,242,236,0.45); }
.d13 .foot-huge { font-family:var(--serif); font-weight:300; font-size:clamp(60px,16vw,240px); line-height:.8; letter-spacing:-.02em; color:rgba(245,242,236,0.06); padding:50px 0 10px; text-align:center; white-space:nowrap; }

/* ---------- responsive ---------- */
@media (max-width:1024px){
  .d13 .intro-grid,.d13 .prow,.d13 .prow.flip .pr-media,.d13 .contact-grid { grid-template-columns:1fr; }
  .d13 .prow.flip .pr-media { order:0; }
  .d13 .pr-media { height:48vh; }
  .d13 .crew-grid { grid-template-columns:repeat(2,1fr); }
  .d13 .gal-grid { columns:2; }
  .d13 .pstep { grid-template-columns:80px 1fr; }
  .d13 .pstep p { grid-column:2; }
}
@media (max-width:760px){
  .d13 .nav-links,.d13 .nav-cta { display:none; }
  .d13 .burger { display:flex; }
  .d13 .mob { display:flex; flex-direction:column; position:fixed; inset:0; background:var(--ink); color:var(--bone); z-index:899; padding:120px 8vw 40px; transform:translateY(-100%); transition:transform .6s cubic-bezier(.76,0,.24,1); }
  .d13 .mob.open { transform:translateY(0); }
  .d13 .mob a { font-family:var(--serif); font-weight:300; font-size:34px; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.12); }
  .d13 .mob a em { color:var(--sand); font-style:italic; }
  .d13 .stats { grid-template-columns:1fr; }
  .d13 .stat { border-bottom:1px solid var(--line); padding-bottom:24px; }
  .d13 .crew-grid,.d13 .gal-grid { grid-template-columns:1fr; columns:1; }
  .d13 .pstep { grid-template-columns:1fr; gap:14px; }
  .d13 .pstep p { grid-column:1; }
}
`;
