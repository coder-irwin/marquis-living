import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marquis Manor — Design Index",
  description: "An index of the Marquis Manor concept designs.",
};

const DESIGNS = [
  { href: "/akaash/design23", n: "23", name: "Promenade", desc: "Scroll-driven house walkthrough · light editorial", tag: "Newest" },
  { href: "/akaash/design13", n: "13", name: "Loft", desc: "Warm editorial luxury-builder · smooth scroll" },
  { href: "/akaash/design11", n: "11", name: "Aperture", desc: "Kinetic editorial · before/after reveal" },
  { href: "/akaash/design9", n: "09", name: "Cinema", desc: "Cinematic video · zoom-parallax gallery" },
  { href: "/akaash/design6", n: "06", name: "Atelier", desc: "Airy minimal studio · word reveals" },
  { href: "/akaash/design5", n: "05", name: "Aperture (light)", desc: "Crisp white · fanning work deck" },
  { href: "/akaash/design4", n: "04", name: "Atrium", desc: "Cinematic 3D scroll descent" },
  { href: "/akaash/design3", n: "03", name: "Ink Reveal", desc: "Ink-wipe hero · the Marquis method" },
  { href: "/akaash/design2", n: "02", name: "Night Sky", desc: "Living night-sky parallax journey" },
];

const CSS = `
.dx{--bg:#f4f1ea;--ink:#16120c;--accent:#9c7a44;--muted:rgba(22,18,12,.56);--line:rgba(22,18,12,.13);
  --serif:'Cormorant Garamond',Georgia,serif;--sans:'Jost',system-ui,sans-serif;
  background:var(--bg);color:var(--ink);font-family:var(--sans);font-weight:300;min-height:100vh;-webkit-font-smoothing:antialiased;}
.dx *{margin:0;padding:0;box-sizing:border-box;}
.dx a{text-decoration:none;color:inherit;}
.dx .wrap{width:min(1200px,90vw);margin-inline:auto;}
.dx header{padding:120px 0 60px;}
.dx .ey{font-size:12px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);}
.dx h1{font-family:var(--serif);font-weight:500;font-size:clamp(44px,8vw,108px);line-height:.96;letter-spacing:-.01em;margin-top:22px;}
.dx h1 em{font-style:italic;color:var(--accent);}
.dx .sub{margin-top:26px;color:var(--muted);font-size:17px;line-height:1.6;max-width:46ch;}
.dx .list{padding-bottom:120px;border-top:1px solid var(--line);}
.dx .row{display:grid;grid-template-columns:90px 1fr auto;align-items:center;gap:30px;padding:30px 6px;border-bottom:1px solid var(--line);transition:padding-left .4s ease,background .4s ease;}
.dx .row:hover{padding-left:24px;background:rgba(156,122,68,.05);}
.dx .row .num{font-family:var(--serif);font-weight:500;font-size:34px;color:var(--accent);}
.dx .row .name{font-family:var(--serif);font-weight:500;font-size:clamp(26px,3.4vw,42px);line-height:1;}
.dx .row .desc{font-size:14px;color:var(--muted);margin-top:8px;letter-spacing:.01em;}
.dx .row .go{display:flex;align-items:center;gap:12px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);transition:color .3s,transform .3s;white-space:nowrap;}
.dx .row:hover .go{color:var(--accent);transform:translateX(6px);}
.dx .row .pill{margin-left:14px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent);border-radius:30px;padding:4px 10px;}
.dx footer{padding:40px 0 60px;color:var(--muted);font-size:12px;letter-spacing:.04em;}
@media (max-width:720px){
  .dx .row{grid-template-columns:56px 1fr;gap:18px;}
  .dx .row .num{font-size:24px;}
  .dx .row .go{display:none;}
}
`;

export default function AkaashIndexPage() {
  return (
    <div className="dx">
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');${CSS}` }} />
      <header>
        <div className="wrap">
          <div className="ey">Marquis Manor · Concept Designs</div>
          <h1>The design <em>index.</em></h1>
          <p className="sub">Every concept direction in one place. Pick a number to walk through it.</p>
        </div>
      </header>

      <section className="list">
        <div className="wrap">
          {DESIGNS.map((d) => (
            <a className="row" href={d.href} key={d.href}>
              <div className="num">{d.n}</div>
              <div>
                <div className="name">{d.name}{d.tag && <span className="pill">{d.tag}</span>}</div>
                <div className="desc">{d.desc}</div>
              </div>
              <div className="go">View <span>→</span></div>
            </a>
          ))}
        </div>
      </section>

      <footer>
        <div className="wrap">© 2026 Marquis Manor — concept experiences</div>
      </footer>
    </div>
  );
}
