/* design25 — "Meridian"
   A UX-handbook applied: the full user journey mapped onto a complete website anatomy,
   in a deep warm-ink luxury register. Restrained, small-scale editorial typography.
   All styles scoped to .d25. */

export const D25_CSS = `
.d25{
  /* —— LIGHT THEME —— base is warm paper, text is warm ink everywhere */
  --bg:#f5f1e8; --bg2:#efe9dc; --panel:#ffffff;
  --paper:#f5f1e8; --paper2:#efe9dc;
  --ink:#1b160e; --ink-d:#1b160e;
  --accent:#c9a86a; --accent2:#7e5d28;
  --muted:rgba(27,22,14,.82); --muted-d:rgba(27,22,14,.82);
  --line:rgba(27,22,14,.13); --line-d:rgba(27,22,14,.13);
  /* over-media (video/image) text — always light, independent of theme */
  --on-media:#f6f0e3; --on-media-soft:rgba(246,240,227,.74); --on-media-gold:#dcc18a;
  --serif:'Marcellus',Georgia,serif;
  --sans:'Manrope',system-ui,-apple-system,sans-serif;
  --ease:cubic-bezier(.22,1,.36,1);
  background:var(--bg); color:var(--ink); font-family:var(--sans); font-weight:400;
  font-size:15px; line-height:1.6; -webkit-font-smoothing:antialiased; overflow-x:clip; position:relative;
}
.d25 *{margin:0;padding:0;box-sizing:border-box;}
.d25 a{color:inherit;text-decoration:none;}
.d25 img{display:block;max-width:100%;}
.d25 button{font-family:inherit;cursor:pointer;border:0;background:none;color:inherit;}
.d25 ::selection{background:var(--accent);color:var(--ink-d);}
.d25 .wrap{width:min(1180px,90vw);margin-inline:auto;}
.d25 .serif{font-family:var(--serif);font-weight:500;}
.d25 em{font-style:normal;}

/* ——— custom cursor ——— */
.d25 .cur{position:fixed;top:0;left:0;width:8px;height:8px;border-radius:50%;
  background:var(--accent);pointer-events:none;z-index:9999;mix-blend-mode:difference;
  transition:width .3s var(--ease),height .3s var(--ease),background .3s,opacity .3s;will-change:transform;}
.d25 .cur.big{width:50px;height:50px;background:rgba(201,168,106,.16);
  border:1px solid var(--accent);mix-blend-mode:normal;}
@media (hover:none),(pointer:coarse){.d25 .cur{display:none;}}

/* ——— scroll progress ——— */
.d25 .progress{position:fixed;top:0;left:0;height:2px;width:100%;z-index:9998;
  background:linear-gradient(90deg,var(--accent),var(--accent2));transform:scaleX(0);
  transform-origin:0 50%;}

/* ——— reveals ——— */
.d25 .rv{opacity:0;transform:translateY(28px);transition:opacity 1s var(--ease),transform 1s var(--ease);}
.d25 .rv.in{opacity:1;transform:none;}
.d25 .rv2{opacity:0;transform:translateY(28px);transition:opacity 1s var(--ease) .1s,transform 1s var(--ease) .1s;}
.d25 .rv2.in{opacity:1;transform:none;}
.d25 .rv3{opacity:0;transform:translateY(28px);transition:opacity 1s var(--ease) .2s,transform 1s var(--ease) .2s;}
.d25 .rv3.in{opacity:1;transform:none;}
@media (prefers-reduced-motion:reduce){.d25 .rv,.d25 .rv2,.d25 .rv3{opacity:1;transform:none;}}

/* ——— nav ——— */
.d25 .nav{position:fixed;top:0;left:0;width:100%;z-index:120;transition:background .5s var(--ease),backdrop-filter .5s,border-color .5s,padding .4s var(--ease);border-bottom:1px solid transparent;}
.d25 .nav.solid{background:rgba(245,241,232,.92);backdrop-filter:blur(16px) saturate(1.1);border-bottom-color:var(--line);}
/* transparent nav over the cinematic hero video — keep text light */
.d25 .nav:not(.solid) .logo .lw{color:var(--on-media);}
.d25 .nav:not(.solid) .logo small{color:var(--on-media-soft);}
.d25 .nav:not(.solid) .nav-links a{color:rgba(246,240,227,.78);}
.d25 .nav:not(.solid) .nav-links a:hover,.d25 .nav:not(.solid) .nav-links a.active{color:var(--on-media);}
.d25 .nav:not(.solid) .nav-cta{color:var(--on-media);border-color:rgba(246,240,227,.34);}
.d25 .nav:not(.solid) .burger span{background:var(--on-media);}
.d25 .nav-in{width:min(1180px,92vw);margin-inline:auto;display:flex;align-items:center;justify-content:space-between;padding:20px 0;transition:padding .4s var(--ease);}
.d25 .nav.solid .nav-in{padding:13px 0;}
.d25 .logo{display:inline-flex;flex-direction:column;justify-content:center;gap:3px;line-height:1;}
.d25 .logo .lw{font-family:var(--serif);font-weight:600;font-size:21px;letter-spacing:.005em;white-space:nowrap;}
.d25 .logo .lw i{color:var(--accent2);font-style:normal;}
.d25 .logo small{font-family:var(--sans);font-weight:500;font-size:7.5px;letter-spacing:.32em;text-transform:uppercase;color:var(--muted);white-space:nowrap;}
.d25 .nav-links{display:flex;gap:30px;list-style:none;}
.d25 .nav-links a{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);position:relative;padding:6px 0;transition:color .3s;}
.d25 .nav-links a::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:var(--accent);transition:width .35s var(--ease);}
.d25 .nav-links a:hover,.d25 .nav-links a.active{color:var(--ink);}
.d25 .nav-links a.active::after,.d25 .nav-links a:hover::after{width:100%;}
.d25 .nav-cta{display:inline-flex;align-items:center;gap:9px;font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;border:1px solid var(--line);border-radius:40px;padding:10px 18px;transition:background .4s,color .4s,border-color .4s;}
.d25 .nav-cta:hover{background:var(--accent);color:var(--ink-d);border-color:var(--accent2);}
.d25 .burger{display:none;width:32px;height:18px;position:relative;}
.d25 .burger span{position:absolute;left:0;height:1.5px;width:100%;background:var(--ink);transition:transform .4s var(--ease),opacity .3s;}
.d25 .burger span:nth-child(1){top:2px;}.d25 .burger span:nth-child(2){top:8px;}.d25 .burger span:nth-child(3){top:14px;}
.d25 .mob{position:fixed;inset:0;z-index:115;background:var(--bg2);display:flex;flex-direction:column;justify-content:center;gap:4px;padding:0 9vw;clip-path:inset(0 0 100% 0);transition:clip-path .7s var(--ease);}
.d25 .mob.open{clip-path:inset(0 0 0 0);}
.d25 .mob a{font-family:var(--serif);font-size:clamp(22px,5vw,32px);font-weight:400;padding:7px 0;border-bottom:1px solid var(--line);}
.d25 .mob a em{color:var(--accent2);}

/* ——— eyebrow ——— */
.d25 .ey{display:inline-flex;align-items:center;gap:11px;font-size:10px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--accent2);}
.d25 .ey::before{content:"";width:26px;height:1px;background:var(--accent2);opacity:.7;}
.d25 .light .ey{color:var(--accent2);}
.d25 .light .ey::before{background:var(--accent2);}

/* ——— section scaffolding ——— */
.d25 section{position:relative;}
.d25 .pad{padding:clamp(40px,6vh,76px) 0;}
.d25 .light{background:var(--paper);color:var(--ink-d);}
.d25 .head{max-width:680px;}
.d25 .head h2{font-family:var(--serif);font-weight:400;font-size:clamp(19px,2.3vw,29px);line-height:1.12;letter-spacing:.002em;margin-top:14px;}
.d25 .head h2 em{color:var(--accent2);}
.d25 .light .head h2 em{color:var(--accent2);}
.d25 .head p{margin-top:16px;color:var(--muted);font-size:14.5px;line-height:1.7;max-width:54ch;}
.d25 .light .head p{color:var(--muted-d);}
.d25 .sechead{display:flex;justify-content:space-between;align-items:flex-end;gap:36px;flex-wrap:wrap;margin-bottom:48px;}

/* ——— scroll-scrub hero (frame-by-frame walkthrough) ——— */
.d25 .hero-scrub{position:relative;}
.d25 .scrub-tour{position:relative;width:100%;}
.d25 .scrub-stage{position:sticky;top:0;height:100svh;width:100%;overflow:hidden;background:#000;contain:layout paint;}
.d25 .scrub-frame{position:absolute;inset:0;overflow:hidden;background:#000;transform-origin:center center;will-change:transform;}
.d25 .scrub-frame canvas,.d25 .scrub-frame video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transform:translateZ(0);backface-visibility:hidden;}
.d25 .scrub-vignette{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(120% 92% at 50% 36%,transparent 50%,rgba(14,12,9,.5) 100%),
  linear-gradient(to bottom,rgba(14,12,9,.64) 0%,transparent 22%,transparent 52%,rgba(14,12,9,.96) 100%);}
.d25 .scrub-grain{position:absolute;inset:0;pointer-events:none;opacity:.045;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.d25 .scue{position:absolute;z-index:5;width:min(92vw,620px);pointer-events:none;}
.d25 .scue-in{opacity:0;will-change:opacity,transform;}
.d25 .scue a{pointer-events:auto;}
.d25 .scue--bl{left:clamp(20px,5vw,80px);bottom:clamp(84px,13vh,150px);}
.d25 .scue--tr{right:clamp(20px,5vw,80px);top:clamp(110px,17vh,190px);text-align:right;}
.d25 .scue--br{right:clamp(20px,5vw,80px);bottom:clamp(120px,18vh,200px);text-align:right;}
.d25 .scue--center{left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,720px);text-align:center;}
.d25 .scue .ey{margin-bottom:20px;color:var(--on-media-gold);}
.d25 .scue .ey::before{background:var(--on-media-gold);}
.d25 .scue h1{font-family:var(--serif);font-weight:400;font-size:clamp(26px,3.8vw,50px);line-height:1.05;letter-spacing:.005em;color:var(--on-media);text-shadow:0 4px 44px rgba(0,0,0,.82),0 2px 8px rgba(0,0,0,.6);}
.d25 .scue h1 em{color:var(--on-media-gold);}
.d25 .scue h1 .ln{display:block;overflow:hidden;}
.d25 .scue h1 .ln span{display:block;animation:d25rise 1.1s var(--ease) both;}
.d25 .scue h1 .ln:nth-child(2) span{animation-delay:.1s;}
@keyframes d25rise{from{transform:translateY(105%)}to{transform:none}}
.d25 .scue-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;margin-top:30px;border-top:1px solid var(--line);padding-top:20px;}
.d25 .scue-foot p{max-width:40ch;color:rgba(243,238,226,.82);font-size:14px;line-height:1.6;text-shadow:0 2px 24px rgba(0,0,0,.5);}
.d25 .scue .cap-ey{font-size:10px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:#e6cd9d;margin-bottom:13px;text-shadow:0 1px 18px rgba(0,0,0,.6);}
.d25 .scue .cap{font-family:var(--serif);font-weight:400;font-size:clamp(18px,2.4vw,30px);line-height:1.1;color:#f4e7c8;text-shadow:0 3px 40px rgba(0,0,0,.85),0 1px 6px rgba(0,0,0,.6);}
.d25 .scue--center .scue-in{padding:34px 44px;border-radius:8px;background:radial-gradient(ellipse at center,rgba(14,12,9,.5) 0%,rgba(14,12,9,.2) 55%,transparent 80%);}
.d25 .scue .cap.big{font-size:clamp(26px,4vw,54px);color:var(--on-media);}
.d25 .scue .cap em{color:var(--on-media-gold);font-style:italic;}
.d25 .scue--center .hero-cta{margin-inline:auto;}
.d25 .hero-cta{display:inline-flex;align-items:center;gap:11px;white-space:nowrap;font-size:11px;letter-spacing:.16em;text-transform:uppercase;border:1px solid var(--on-media-gold);color:var(--on-media-gold);border-radius:40px;padding:14px 24px;transition:background .4s,color .4s;background:rgba(14,12,9,.3);backdrop-filter:blur(2px);}
.d25 .hero-cta:hover{background:var(--on-media-gold);color:#1b160e;}
.d25 .scrollcue{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);z-index:5;display:flex;flex-direction:column;align-items:center;gap:7px;color:var(--on-media-soft);font-size:9px;letter-spacing:.3em;text-transform:uppercase;transition:opacity .5s;}
.d25 .scrollcue i{width:1px;height:38px;background:linear-gradient(var(--accent),transparent);position:relative;overflow:hidden;}
.d25 .scrollcue i::after{content:"";position:absolute;top:-50%;left:0;width:100%;height:50%;background:var(--accent);animation:d25cue 2s var(--ease) infinite;}
@keyframes d25cue{0%{top:-50%}60%,100%{top:100%}}
@media (max-width:760px){.d25 .scue--tr,.d25 .scue--br{display:none;}.d25 .scue-foot{flex-direction:column;align-items:flex-start;}}

/* ——— marquee strip ——— */
.d25 .strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg2);overflow:hidden;padding:18px 0;}
.d25 .marq{display:flex;gap:48px;white-space:nowrap;width:max-content;animation:d25marq 38s linear infinite;}
.d25 .marq span{display:inline-flex;align-items:center;gap:48px;font-family:var(--serif);font-style:italic;font-size:20px;color:var(--muted);}
.d25 .marq span b{color:var(--accent2);font-style:normal;font-family:var(--sans);font-weight:400;font-size:11px;letter-spacing:.2em;text-transform:uppercase;}
@keyframes d25marq{to{transform:translateX(-50%)}}

/* ——— introduction ——— */
.d25 .mani{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(36px,5vw,84px);align-items:center;}
.d25 .mani .big{font-family:var(--serif);font-weight:400;font-size:clamp(16px,1.7vw,22px);line-height:1.4;letter-spacing:.002em;}
.d25 .mani .big em{color:var(--accent2);}
.d25 .mani .by{margin-top:26px;display:flex;align-items:center;gap:14px;}
.d25 .mani .by img{width:46px;height:46px;border-radius:50%;object-fit:cover;}
.d25 .mani .by b{display:block;font-weight:500;font-size:13.5px;}
.d25 .mani .by span{font-size:12px;color:var(--muted);}
.d25 .mani-fig{position:relative;}
.d25 .mani-fig img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:3px;}
.d25 .mani-fig figcaption{position:absolute;left:-18px;bottom:28px;background:var(--accent);color:var(--ink-d);padding:14px 20px;border-radius:3px;}
.d25 .mani-fig figcaption b{font-family:var(--serif);font-size:24px;line-height:1;display:block;}
.d25 .mani-fig figcaption span{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;opacity:.8;}

/* ——— services ——— */
.d25 .svc{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:4px;overflow:hidden;}
.d25 .svc .cell{background:var(--bg);padding:36px 34px;position:relative;transition:background .5s var(--ease);}
.d25 .svc .cell:hover{background:var(--panel);}
.d25 .svc .cell .no{font-family:var(--serif);font-size:13px;color:var(--accent2);letter-spacing:.1em;}
.d25 .svc .cell h3{font-family:var(--serif);font-weight:400;font-size:clamp(16px,1.5vw,18px);margin:11px 0 9px;}
.d25 .svc .cell p{color:var(--muted);font-size:13.5px;line-height:1.65;max-width:40ch;}
.d25 .svc .cell ul{list-style:none;margin-top:16px;display:flex;flex-wrap:wrap;gap:7px;}
.d25 .svc .cell li{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:30px;padding:5px 11px;}
.d25 .svc .cell .arr{position:absolute;top:36px;right:34px;color:var(--accent2);opacity:0;transform:translate(-6px,6px);transition:opacity .4s,transform .4s var(--ease);}
.d25 .svc .cell:hover .arr{opacity:1;transform:none;}

/* ——— benefits ——— */
.d25 .benefits{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.d25 .benefit{border-top:1px solid var(--line);padding-top:22px;}
.d25 .benefit .bi{font-size:24px;color:var(--accent2);line-height:1;}
.d25 .benefit h3{font-family:var(--serif);font-weight:400;font-size:16px;margin:14px 0 8px;}
.d25 .benefit p{color:var(--muted);font-size:13px;line-height:1.6;}

/* ——— features (split) ——— */
.d25 .feat-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(36px,5vw,80px);align-items:center;}
.d25 .feat-fig img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:3px;}
.d25 .feat-list{list-style:none;margin-top:26px;}
.d25 .feat-list li{display:grid;grid-template-columns:auto 1fr;gap:16px;padding:18px 0;border-bottom:1px solid var(--line-d);}
.d25 .feat-list li .fn{font-family:var(--serif);font-size:14px;color:var(--accent2);}
.d25 .feat-list li b{display:block;font-weight:500;font-size:15px;color:var(--ink-d);margin-bottom:4px;}
.d25 .feat-list li span{font-size:13px;color:var(--muted-d);line-height:1.55;}

/* ——— process ——— */
.d25 .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;}
.d25 .step{border-top:1px solid var(--line);padding-top:22px;position:relative;}
.d25 .step::before{content:"";position:absolute;top:-1px;left:0;width:0;height:1px;background:var(--accent);transition:width 1s var(--ease);}
.d25 .step.in::before{width:100%;}
.d25 .step .n{font-family:var(--serif);font-size:14px;color:var(--accent2);letter-spacing:.12em;}
.d25 .step h3{font-family:var(--serif);font-weight:400;font-size:clamp(16px,1.4vw,19px);margin:10px 0 8px;}
.d25 .step p{color:var(--muted);font-size:13px;line-height:1.65;}

/* ——— portfolio ——— */
.d25 .pf{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.d25 figure.card{position:relative;overflow:hidden;border-radius:3px;aspect-ratio:3/2;}
.d25 figure.card img{width:100%;height:100%;object-fit:cover;transition:transform 1.1s var(--ease),filter 1.1s var(--ease);filter:saturate(.92) brightness(.94);}
.d25 figure.card:hover img{transform:scale(1.05);filter:saturate(1.04) brightness(1);}
.d25 figure.card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 42%,rgba(14,12,9,.8));opacity:.82;transition:opacity .5s;}
.d25 figure.card:hover::after{opacity:1;}
.d25 figure.card figcaption{position:absolute;left:22px;right:22px;bottom:20px;z-index:2;transform:translateY(7px);transition:transform .5s var(--ease);}
.d25 figure.card:hover figcaption{transform:none;}
.d25 figure.card .tag{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--on-media-gold);}
.d25 figure.card .tt{font-family:var(--serif);font-weight:400;font-size:clamp(15px,1.4vw,18px);color:var(--on-media);margin-top:4px;}
.d25 figure.card .meta{font-size:12px;color:var(--on-media-soft);margin-top:3px;opacity:0;max-height:0;transition:opacity .5s,max-height .5s;}
.d25 figure.card:hover .meta{opacity:1;max-height:36px;}
.d25 .c-wide{grid-column:span 8;aspect-ratio:16/10;}
.d25 .c-tall{grid-column:span 4;}
.d25 .c-half{grid-column:span 6;aspect-ratio:16/11;}
.d25 .c-third{grid-column:span 4;aspect-ratio:4/5;}

/* ——— gallery grid ——— */
.d25 .gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.d25 .gcard{position:relative;overflow:hidden;border-radius:3px;aspect-ratio:3/2;cursor:pointer;}
.d25 .gcard img{width:100%;height:100%;object-fit:cover;transition:transform 1s var(--ease),filter .6s;filter:saturate(.97) brightness(.99);}
.d25 .gcard:hover img{transform:scale(1.07);filter:saturate(1.03) brightness(1);}
.d25 .gcard::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 42%,rgba(14,12,9,.8));opacity:0;transition:opacity .45s;}
.d25 .gcard:hover::after{opacity:1;}
.d25 .gcard figcaption{position:absolute;left:16px;right:16px;bottom:14px;z-index:2;opacity:0;transform:translateY(8px);transition:opacity .45s,transform .45s var(--ease);}
.d25 .gcard:hover figcaption{opacity:1;transform:none;}
.d25 .gcard .gtag{font-size:9.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--on-media-gold);}
.d25 .gcard .gtt{font-family:var(--serif);font-weight:400;font-size:15px;color:var(--on-media);margin-top:2px;}
@media(max-width:1040px){.d25 .gallery-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.d25 .gallery-grid{grid-template-columns:1fr;}}

/* ——— statistics ——— */
.d25 .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:34px;}
.d25 .stat{border-top:1px solid var(--line-d);padding-top:24px;}
.d25 .stat .num{font-family:var(--serif);font-weight:400;font-size:clamp(28px,3vw,40px);line-height:1;letter-spacing:-.01em;color:var(--ink-d);}
.d25 .stat .num .suf{color:var(--accent2);}
.d25 .stat .lab{margin-top:11px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-d);}
.d25 .stat .dsc{margin-top:5px;font-size:13px;color:var(--muted-d);line-height:1.5;}

/* ——— testimonials ——— */
.d25 .quotes{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.d25 .quote{background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:24px 24px;display:flex;flex-direction:column;transition:transform .5s var(--ease),border-color .5s;}
.d25 .quote:hover{transform:translateY(-5px);border-color:rgba(201,168,106,.4);}
.d25 .quote .stars{color:var(--accent2);letter-spacing:2px;font-size:11px;}
.d25 .quote blockquote{font-family:var(--serif);font-size:16px;line-height:1.45;margin:13px 0 18px;flex:1;}
.d25 .quote .who{display:flex;align-items:center;gap:12px;border-top:1px solid var(--line);padding-top:16px;}
.d25 .quote .who img{width:40px;height:40px;border-radius:50%;object-fit:cover;}
.d25 .quote .who b{display:block;font-weight:500;font-size:13px;}
.d25 .quote .who span{font-size:11.5px;color:var(--muted);}

/* ——— before / after comparison slider ——— */
.d25 .ba-compare{position:relative;--pos:50%;aspect-ratio:4/5;width:100%;overflow:hidden;border-radius:4px;cursor:ew-resize;user-select:none;touch-action:none;border:1px solid var(--line-d);background:#000;}
.d25 .ba-compare img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;-webkit-user-drag:none;}
.d25 .ba-compare .ba-before{clip-path:inset(0 calc(100% - var(--pos)) 0 0);filter:grayscale(.5) brightness(.8);}
.d25 .ba-tag{position:absolute;top:16px;z-index:3;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;padding:6px 12px;border-radius:30px;backdrop-filter:blur(4px);pointer-events:none;}
.d25 .ba-tag--before{left:16px;background:rgba(23,19,12,.72);color:var(--paper);border:1px solid rgba(255,255,255,.18);}
.d25 .ba-tag--after{right:16px;background:var(--accent);color:var(--ink-d);}
.d25 .ba-divider{position:absolute;top:0;bottom:0;left:var(--pos);width:2px;background:rgba(255,255,255,.92);transform:translateX(-1px);z-index:2;pointer-events:none;box-shadow:0 0 14px rgba(0,0,0,.45);}
.d25 .ba-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;border-radius:50%;background:rgba(14,12,9,.5);backdrop-filter:blur(6px);border:1.5px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;letter-spacing:1px;box-shadow:0 6px 22px rgba(0,0,0,.4);animation:ba-hint 2.6s var(--ease) 1s 3;}
.d25 .ba-compare.dragging .ba-handle{animation:none;background:rgba(14,12,9,.7);}
.d25 .ba-compare:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
.d25 .ba-hint-cap{margin-top:14px;font-size:11.5px;letter-spacing:.06em;color:var(--muted-d);display:flex;align-items:center;gap:9px;}
.d25 .ba-hint-cap::before{content:"⟷";color:var(--accent2);font-size:15px;}
@keyframes ba-hint{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.14)}}
@media (prefers-reduced-motion:reduce){.d25 .ba-handle{animation:none;}}

/* ——— case study ——— */
.d25 .case{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,4vw,64px);align-items:center;}
.d25 .case-ba{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line-d);border-radius:4px;overflow:hidden;}
.d25 .case-ba .pane{position:relative;aspect-ratio:4/5;}
.d25 .case-ba .pane img{width:100%;height:100%;object-fit:cover;}
.d25 .case-ba .pane.before img{filter:grayscale(.55) brightness(.82);}
.d25 .case-ba .pane span{position:absolute;top:14px;left:14px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;background:rgba(23,19,12,.7);color:var(--paper);backdrop-filter:blur(4px);padding:6px 11px;border-radius:30px;}
.d25 .case-ba .pane.after span{background:var(--accent2);color:#fff;}
.d25 .case-body h3{font-family:var(--serif);font-weight:500;font-size:clamp(24px,3vw,38px);line-height:1.05;margin:14px 0;}
.d25 .case-body h3 em{color:var(--accent2);}
.d25 .case-body p{color:var(--muted-d);font-size:14px;line-height:1.7;max-width:46ch;}
.d25 .case-stats{display:flex;gap:30px;margin-top:26px;flex-wrap:wrap;}
.d25 .case-stats div b{font-family:var(--serif);font-weight:500;font-size:30px;display:block;line-height:1;}
.d25 .case-stats div span{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted-d);}
.d25 .case-link{display:inline-flex;align-items:center;gap:9px;margin-top:26px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-d);border-bottom:1px solid var(--line-d);padding-bottom:5px;transition:color .3s,border-color .3s;}
.d25 .case-link:hover{color:var(--accent2);border-color:var(--accent2);}

/* ——— awards ——— */
.d25 .award{display:grid;grid-template-columns:88px 1fr auto;gap:26px;align-items:baseline;padding:22px 4px;border-top:1px solid var(--line);transition:padding-left .4s var(--ease),background .4s;}
.d25 .award:last-child{border-bottom:1px solid var(--line);}
.d25 .award:hover{padding-left:16px;background:rgba(201,168,106,.05);}
.d25 .award .ay{font-family:var(--serif);font-size:22px;color:var(--accent2);}
.d25 .award .at{font-family:var(--serif);font-weight:500;font-size:clamp(18px,2vw,26px);}
.d25 .award .ao{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);text-align:right;}

/* ——— partners ——— */
.d25 .plist{display:flex;flex-wrap:wrap;align-items:center;gap:18px 48px;padding-top:14px;border-top:1px solid var(--line);}
.d25 .plist span{font-family:var(--serif);font-weight:500;font-size:clamp(18px,2.2vw,28px);color:var(--muted);letter-spacing:.02em;transition:color .4s;}
.d25 .plist span:hover{color:var(--accent2);}

/* ——— pricing ——— */
.d25 .tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch;}
.d25 .tier{background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:34px 30px;display:flex;flex-direction:column;position:relative;transition:transform .5s var(--ease),border-color .5s,background .5s;}
.d25 .tier:hover{transform:translateY(-5px);}
.d25 .tier.feat{background:var(--panel);border-color:rgba(201,168,106,.5);}
.d25 .tier .badge{position:absolute;top:-11px;left:30px;background:var(--accent);color:var(--ink-d);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;padding:5px 12px;border-radius:30px;}
.d25 .tier .tname{font-family:var(--serif);font-weight:400;font-size:20px;}
.d25 .tier .tsub{font-size:13px;color:var(--muted);margin-top:6px;line-height:1.55;min-height:42px;}
.d25 .tier .price{font-family:var(--serif);font-size:28px;font-weight:400;margin:18px 0 4px;letter-spacing:-.005em;}
.d25 .tier .price small{font-family:var(--sans);font-size:12.5px;font-weight:300;color:var(--muted);letter-spacing:.04em;}
.d25 .tier ul{list-style:none;margin:20px 0 24px;display:flex;flex-direction:column;gap:11px;flex:1;}
.d25 .tier li{display:flex;gap:10px;font-size:13.5px;color:rgba(243,238,226,.84);line-height:1.45;}
.d25 .tier li::before{content:"✦";color:var(--accent2);font-size:10px;margin-top:3px;}
.d25 .tier .tbtn{display:block;text-align:center;border:1px solid var(--line);border-radius:40px;padding:13px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;transition:background .4s,color .4s,border-color .4s;}
.d25 .tier .tbtn:hover{background:var(--ink);color:var(--ink-d);border-color:var(--ink);}
.d25 .tier.feat .tbtn{background:var(--accent);color:var(--ink-d);border-color:var(--accent2);}
.d25 .tier.feat .tbtn:hover{background:transparent;color:var(--accent2);}
.d25 .tier-note{text-align:center;margin-top:26px;font-size:12.5px;color:var(--muted-d);}

/* ——— faq ——— */
.d25 .faqwrap{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(36px,5vw,80px);align-items:start;}
.d25 .acc{border-top:1px solid var(--line);}
.d25 .ai{border-bottom:1px solid var(--line);}
.d25 .aq{width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:22px;padding:20px 0;font-family:var(--serif);font-weight:400;font-size:clamp(15px,1.3vw,17px);color:var(--ink);transition:color .3s;}
.d25 .aq:hover{color:var(--accent2);}
.d25 .aq .ic{flex-shrink:0;width:26px;height:26px;border:1px solid var(--line);border-radius:50%;position:relative;transition:background .4s,border-color .4s;}
.d25 .aq .ic::before,.d25 .aq .ic::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--ink);transition:transform .4s var(--ease),background .4s;}
.d25 .aq .ic::before{width:10px;height:1.5px;}.d25 .aq .ic::after{width:1.5px;height:10px;}
.d25 .ai.open .aq{color:var(--accent2);}
.d25 .ai.open .aq .ic{background:var(--accent);border-color:var(--accent2);}
.d25 .ai.open .aq .ic::before,.d25 .ai.open .aq .ic::after{background:var(--ink-d);}
.d25 .ai.open .aq .ic::after{transform:translate(-50%,-50%) scaleY(0);}
.d25 .aa{max-height:0;overflow:hidden;transition:max-height .5s var(--ease);}
.d25 .aa p{padding:0 0 22px;color:var(--muted);font-size:14px;line-height:1.72;max-width:60ch;}

/* ——— cta banner ——— */
.d25 .cta{position:relative;overflow:hidden;}
.d25 .cta-bg{position:absolute;inset:0;z-index:0;}
.d25 .cta-bg img,.d25 .cta-bg video{width:100%;height:100%;object-fit:cover;}
.d25 .cta-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,12,9,.94),rgba(14,12,9,.55));}
.d25 .cta-in{position:relative;z-index:2;padding:clamp(76px,14vh,150px) 0;}
.d25 .cta-in h2{font-family:var(--serif);font-weight:400;font-size:clamp(20px,2.6vw,32px);line-height:1.1;letter-spacing:.002em;max-width:20ch;color:var(--on-media);}
.d25 .cta-in h2 em{color:var(--on-media-gold);}
.d25 .cta-in p{margin-top:18px;color:var(--on-media-soft);font-size:14.5px;line-height:1.68;max-width:50ch;}
.d25 .cta-in .cta-row{margin-top:32px;display:flex;gap:16px;flex-wrap:wrap;align-items:center;}

/* —— static hero (placeholder until the new film is wired) —— */
.d25 .hero-static{position:relative;min-height:92svh;display:flex;align-items:flex-end;overflow:hidden;background:#000;}
.d25 .hero-static>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.d25 .hero-static::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,12,9,.45) 0,transparent 34%,rgba(14,12,9,.86) 100%);}
.d25 .hero-static .wrap{position:relative;z-index:2;padding-bottom:8vh;}
.d25 .hero-static .ey{color:var(--on-media-gold);margin-bottom:20px;}
.d25 .hero-static .ey::before{background:var(--on-media-gold);}
.d25 .hero-static h1{font-family:var(--serif);font-weight:500;font-size:clamp(40px,6.6vw,92px);line-height:.98;letter-spacing:-.008em;color:var(--on-media);text-shadow:0 4px 40px rgba(0,0,0,.5);}
.d25 .hero-static h1 em{color:var(--on-media-gold);}
.d25 .hero-static .hero-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:36px;margin-top:30px;border-top:1px solid rgba(246,240,227,.22);padding-top:22px;}
.d25 .hero-static .hero-foot p{max-width:44ch;color:var(--on-media-soft);font-size:14.5px;line-height:1.62;}
@media (max-width:760px){.d25 .hero-static .hero-foot{flex-direction:column;align-items:flex-start;}}
.d25 .cta-row{margin-top:32px;display:flex;gap:16px;flex-wrap:wrap;align-items:center;}
.d25 .btn-fill{display:inline-flex;align-items:center;gap:11px;background:var(--accent);color:var(--ink-d);border-radius:40px;padding:15px 28px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;transition:transform .4s var(--ease),background .4s;}
.d25 .btn-fill:hover{transform:translateY(-3px);background:#d9bd83;}
.d25 .btn-ghost{display:inline-flex;align-items:center;gap:9px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--on-media);border-bottom:1px solid rgba(246,240,227,.32);padding-bottom:5px;transition:color .3s,border-color .3s;}
.d25 .btn-ghost:hover{color:var(--on-media-gold);border-color:var(--on-media-gold);}

/* ——— cta scroll-scrub ——— */
.d25 .cta-scrub{position:relative;}
.d25 .cta-scrub-tour{position:relative;width:100%;}
.d25 .cta-scrub-stage{position:sticky;top:0;height:100svh;width:100%;overflow:hidden;background:#000;contain:layout paint;}
.d25 .cta-scrub-frame{position:absolute;inset:0;overflow:hidden;background:#000;transform-origin:center center;will-change:transform;}
.d25 .cta-scrub-frame canvas{position:absolute;inset:0;width:100%;height:100%;display:block;transform:translateZ(0);backface-visibility:hidden;}
.d25 .cta-scrub-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(14,12,9,.95) 0%,rgba(14,12,9,.62) 52%,rgba(14,12,9,.3) 100%);}
.d25 .cta-scrub-grain{position:absolute;inset:0;pointer-events:none;opacity:.045;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.d25 .cta-scrub-in{position:absolute;inset:0;display:flex;align-items:center;z-index:5;}
.d25 .cta-scrub-in .wrap{width:min(1180px,90vw);margin-inline:auto;}
.d25 .cta-scrub-in h2{font-family:var(--serif);font-weight:500;font-size:clamp(28px,4.4vw,60px);line-height:1.04;letter-spacing:-.01em;max-width:17ch;color:var(--on-media);text-shadow:0 4px 44px rgba(0,0,0,.55);}
.d25 .cta-scrub-in h2 em{color:var(--on-media-gold);}
.d25 .cta-scrub-in p{margin-top:18px;color:rgba(243,238,226,.84);font-size:14.5px;line-height:1.68;max-width:50ch;text-shadow:0 2px 22px rgba(0,0,0,.5);}
.d25 .cta-scrub-in .cta-row{margin-top:32px;display:flex;gap:16px;flex-wrap:wrap;align-items:center;}

/* ——— contact ——— */
.d25 .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(36px,5vw,80px);}
.d25 .ctitle{font-family:var(--serif);font-weight:400;font-size:clamp(20px,2.5vw,30px);line-height:1.1;margin-top:12px;}
.d25 .ctitle em{color:var(--accent2);}
.d25 .form{display:flex;flex-direction:column;gap:20px;margin-top:28px;}
.d25 .form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.d25 .ff{position:relative;}
.d25 .ff input,.d25 .ff textarea,.d25 .ff select{width:100%;background:transparent;border:0;border-bottom:1px solid var(--line);color:var(--ink);font-family:inherit;font-size:14.5px;font-weight:300;padding:12px 0 10px;transition:border-color .4s;}
.d25 .ff textarea{resize:vertical;min-height:54px;}
.d25 .ff select option{background:var(--bg2);color:var(--ink);}
.d25 .ff input:focus,.d25 .ff textarea:focus,.d25 .ff select:focus{outline:none;border-color:var(--accent2);}
.d25 .ff label{position:absolute;left:0;top:12px;color:var(--muted);font-size:14.5px;pointer-events:none;transition:transform .35s var(--ease),font-size .35s,color .35s;}
.d25 .ff input:focus+label,.d25 .ff input:not(:placeholder-shown)+label,.d25 .ff textarea:focus+label,.d25 .ff textarea:not(:placeholder-shown)+label{transform:translateY(-24px);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent2);}
.d25 .ff.sel label{position:static;display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent2);margin-bottom:7px;}
.d25 .submit{margin-top:8px;align-self:flex-start;display:inline-flex;align-items:center;gap:11px;background:var(--accent);color:var(--ink-d);border-radius:40px;padding:15px 30px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;transition:transform .4s var(--ease),background .4s;}
.d25 .submit:hover{transform:translateY(-3px);}
.d25 .submit.ok{background:#5b7d57;color:#fff;}
.d25 .contact-aside{border-left:1px solid var(--line);padding-left:clamp(0px,4vw,46px);}
.d25 .contact-aside .row{padding:20px 0;border-bottom:1px solid var(--line);}
.d25 .contact-aside .row span{display:block;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent2);margin-bottom:8px;}
.d25 .contact-aside .row b{font-family:var(--serif);font-weight:500;font-size:19px;line-height:1.35;display:block;}
.d25 .contact-aside .row a{color:var(--ink);transition:color .3s;}
.d25 .contact-aside .row a:hover{color:var(--accent2);}

/* ——— footer ——— */
.d25 footer{background:var(--bg2);border-top:1px solid var(--line);padding:76px 0 30px;}
.d25 .foot-news{display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap;padding-bottom:46px;border-bottom:1px solid var(--line);}
.d25 .foot-news h3{font-family:var(--serif);font-weight:500;font-size:clamp(22px,2.4vw,32px);}
.d25 .foot-news p{color:var(--muted);font-size:13px;margin-top:7px;max-width:44ch;}
.d25 .foot-news form{display:flex;gap:10px;min-width:min(380px,90vw);}
.d25 .foot-news input{flex:1;background:transparent;border:1px solid var(--line);border-radius:40px;color:var(--ink);padding:13px 20px;font-family:inherit;font-size:14px;}
.d25 .foot-news input:focus{outline:none;border-color:var(--accent2);}
.d25 .foot-news button{background:var(--accent);color:var(--ink-d);border-radius:40px;padding:0 24px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;transition:background .3s;}
.d25 .foot-news button.ok{background:#5b7d57;color:#fff;}
.d25 .foot-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:36px;padding:50px 0;border-bottom:1px solid var(--line);}
.d25 .foot-brand .logo .lw{font-size:22px;}
.d25 .foot-brand p{color:var(--muted);font-size:13.5px;line-height:1.7;margin-top:16px;max-width:34ch;}
.d25 .foot-col h5{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent2);margin-bottom:16px;}
.d25 .foot-col a{display:block;color:var(--muted);font-size:13.5px;padding:6px 0;transition:color .3s,padding-left .3s;}
.d25 .foot-col a:hover{color:var(--ink);padding-left:6px;}
.d25 .foot-bot{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;padding-top:26px;color:var(--muted);font-size:11.5px;letter-spacing:.04em;}
.d25 .foot-bot .socials{display:flex;gap:22px;}
.d25 .foot-bot a:hover{color:var(--accent2);}

/* ——— floating CTA + cookie ——— */
.d25 .float-cta{position:fixed;right:24px;bottom:24px;z-index:90;display:inline-flex;align-items:center;gap:9px;background:var(--accent);color:var(--ink-d);border-radius:40px;padding:13px 22px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 16px 40px rgba(0,0,0,.4);transform:translateY(140%);transition:transform .6s var(--ease);}
.d25 .float-cta.show{transform:none;}
.d25 .float-cta:hover{background:#d9bd83;}
@media (max-width:720px){.d25 .float-cta{display:none;}}
.d25 .cookie{position:fixed;left:24px;bottom:24px;z-index:95;max-width:360px;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:22px 24px;box-shadow:0 20px 50px rgba(0,0,0,.5);}
.d25 .cookie p{font-size:12.5px;line-height:1.6;color:var(--muted);}
.d25 .cookie p b{color:var(--ink);font-weight:500;}
.d25 .cookie .ck-row{display:flex;gap:10px;margin-top:16px;}
.d25 .cookie button{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;border-radius:30px;padding:10px 18px;transition:.3s;}
.d25 .cookie .ck-ok{background:var(--accent);color:var(--ink-d);}
.d25 .cookie .ck-ok:hover{background:#d9bd83;}
.d25 .cookie .ck-no{border:1px solid var(--line);color:var(--muted);}
.d25 .cookie .ck-no:hover{color:var(--ink);}
@media (max-width:720px){.d25 .cookie{left:14px;right:14px;bottom:14px;max-width:none;}}

/* ——— light-section card overrides ——— */
.d25 .light .svc{background:var(--line-d);border-color:var(--line-d);}
.d25 .light .svc .cell{background:var(--paper2);}
.d25 .light .svc .cell:hover{background:#fff;}
.d25 .light .svc .cell .no{color:var(--accent2);}
.d25 .light .svc .cell h3{color:var(--ink-d);}
.d25 .light .svc .cell p{color:var(--muted-d);}
.d25 .light .svc .cell li{color:var(--muted-d);border-color:var(--line-d);}
.d25 .light .svc .cell .arr{color:var(--accent2);}
.d25 .light .tier{background:#fff;border-color:var(--line-d);}
.d25 .light .tier .tname,.d25 .light .tier .price{color:var(--ink-d);}
.d25 .light .tier .price small{color:var(--muted-d);}
.d25 .light .tier .tsub{color:var(--muted-d);}
.d25 .light .tier li{color:rgba(23,19,12,.82);}
.d25 .light .tier .tbtn{border-color:var(--line-d);color:var(--ink-d);}
.d25 .light .tier .tbtn:hover{background:var(--ink-d);color:var(--paper);border-color:var(--ink-d);}
.d25 .light .tier.feat{background:#fff;border-color:var(--accent2);box-shadow:0 18px 50px rgba(126,93,40,.14);}
.d25 .light .tier.feat .tname,.d25 .light .tier.feat .price{color:var(--ink-d);}
.d25 .light .tier.feat .tsub{color:var(--muted-d);}
.d25 .light .tier.feat .price small{color:var(--muted-d);}
.d25 .light .tier.feat li{color:rgba(27,22,14,.82);}
.d25 .light .tier.feat .tbtn{background:var(--accent2);color:#fff;border-color:var(--accent2);}
.d25 .light .tier.feat .tbtn:hover{background:#1b160e;border-color:#1b160e;}

/* ——— richer section animations ——— */
/* staggered children: container gets .in, children cascade up */
.d25 .stg > *{opacity:0;transform:translateY(30px);transition:opacity .9s var(--ease),transform .9s var(--ease);}
.d25 .stg.in > *{opacity:1;transform:none;}
.d25 .stg.in > *:nth-child(1){transition-delay:.04s}
.d25 .stg.in > *:nth-child(2){transition-delay:.12s}
.d25 .stg.in > *:nth-child(3){transition-delay:.20s}
.d25 .stg.in > *:nth-child(4){transition-delay:.28s}
.d25 .stg.in > *:nth-child(5){transition-delay:.36s}
.d25 .stg.in > *:nth-child(6){transition-delay:.44s}
.d25 .stg.in > *:nth-child(7){transition-delay:.52s}
.d25 .stg.in > *:nth-child(8){transition-delay:.60s}

/* image reveal: fail-open — image is ALWAYS visible, just eases from a gentle zoom */
.d25 .imgrv{overflow:hidden;}
.d25 .imgrv img{transform:scale(1.08);transition:transform 1.6s var(--ease);}
.d25 .imgrv.in img{transform:scale(1);}

/* parallax drift (JS sets --py) */
.d25 .par{will-change:transform;}
.d25 .par > *{transition:transform .12s linear;transform:translateY(var(--py,0px));}

@media (prefers-reduced-motion:reduce){
  .d25 .stg > *{opacity:1;transform:none;}
  .d25 .imgrv{clip-path:none;}
  .d25 .imgrv img{transform:none;}
  .d25 .par > *{transform:none;}
}

/* ——— transformation scrub section ——— */
.d25 .scrub-sec{position:relative;}
.d25 .tr-stats{display:flex;gap:36px;margin-top:24px;justify-content:center;flex-wrap:wrap;}
.d25 .tr-stats b{font-family:var(--serif);font-weight:400;font-size:24px;display:block;line-height:1;color:var(--on-media);text-shadow:0 2px 20px rgba(0,0,0,.55);}
.d25 .tr-stats span{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--on-media-soft);}

/* ——— responsive ——— */
@media (max-width:1040px){
  .d25 .mani,.d25 .faqwrap,.d25 .contact-grid,.d25 .feat-split,.d25 .case{grid-template-columns:1fr;}
  .d25 .svc,.d25 .quotes,.d25 .tiers{grid-template-columns:1fr;}
  .d25 .pf{grid-template-columns:repeat(2,1fr);}
  .d25 .stats,.d25 .steps,.d25 .benefits{grid-template-columns:repeat(2,1fr);}
  .d25 .mani-fig,.d25 .feat-fig{max-width:460px;}
  .d25 .contact-aside{border-left:0;padding-left:0;border-top:1px solid var(--line);padding-top:18px;}
}
@media (max-width:760px){
  .d25 .nav-links,.d25 .nav-cta{display:none;}
  .d25 .burger{display:block;}
  .d25 .case-ba,.d25 .foot-news form{}
  .d25 .foot-news form{flex-direction:column;min-width:0;width:100%;}
  .d25 .hero-foot{flex-direction:column;align-items:flex-start;}
  .d25 .foot-top{grid-template-columns:1fr 1fr;}
  .d25 .form-row{grid-template-columns:1fr;}
  .d25 .award{grid-template-columns:60px 1fr;gap:14px;}
  .d25 .award .ao{display:none;}
}
@media (max-width:480px){
  .d25 .stats,.d25 .steps,.d25 .benefits,.d25 .foot-top,.d25 .pf{grid-template-columns:1fr;}
}
`;
