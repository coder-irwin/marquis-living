"use client";

// design14 footer (columns + giant wordmark), ported into design23.
const COLS = [
  { title: "About Us", items: ["Team", "Company", "Press", "Reviews", "Locations"] },
  { title: "Customer Support", items: ["Catalogues", "FAQ", "Contact Us", "Gift Cards", "Shipping Policy"] },
  { title: "Connect", items: ["Instagram", "Facebook", "Pinterest", "Twitter", "Threads"] },
];

export default function Footer() {
  return (
    <footer className="ft">
      <style dangerouslySetInnerHTML={{ __html: FT_CSS }} />
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#top" className="serif ft-mark">Marquis<em> Manor</em></a>
            <p className="ft-blurb">We craft interiors people never want to leave — homes composed in light, material and quiet, considered grandeur.</p>
          </div>
          {COLS.map((c) => (
            <div key={c.title} className="ft-col">
              <p className="ft-col-title">{c.title}</p>
              <ul>{c.items.map((it) => <li key={it}><a href="#" className="ft-link">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>

        <div className="ft-wordmark"><h2 className="serif">Marquis Living</h2></div>

        <div className="ft-base">
          <p>© 2026 Marquis Living · All rights reserved.</p>
          <p>The art of interior design.</p>
        </div>
      </div>
    </footer>
  );
}

const FT_CSS = `
.d23 .ft { border-top:1px solid var(--line); padding-top:80px; background:var(--paper); }
.d23 .ft-top { display:grid; gap:48px; grid-template-columns:1.4fr .8fr .8fr .8fr; padding-bottom:80px; }
.d23 .ft-mark { font-size:1.6rem; font-weight:300; } .d23 .ft-mark em { font-style:italic; }
.d23 .ft-blurb { margin-top:20px; max-width:20rem; color:var(--muted); }
.d23 .ft-col-title { margin-bottom:22px; font-size:.78rem; text-transform:uppercase; letter-spacing:.2em; color:var(--muted); }
.d23 .ft-col ul { list-style:none; display:flex; flex-direction:column; gap:12px; }
.d23 .ft-link { position:relative; font-size:1.05rem; }
.d23 .ft-link::after { content:''; position:absolute; left:0; bottom:-2px; width:100%; height:1px; background:currentColor; transform:scaleX(0); transform-origin:right; transition:transform .4s cubic-bezier(.65,0,.35,1); }
.d23 .ft-link:hover::after { transform:scaleX(1); transform-origin:left; }
.d23 .ft-wordmark { overflow:hidden; }
.d23 .ft-wordmark h2 { text-align:center; font-size:clamp(3rem,17vw,15rem); line-height:.8; font-weight:300; padding-bottom:.18em; user-select:none; }
.d23 .ft-base { display:flex; flex-direction:column; gap:12px; align-items:center; justify-content:space-between; border-top:1px solid var(--line); padding-block:28px; font-size:.85rem; color:var(--muted); }
@media (min-width:768px){ .d23 .ft-base{ flex-direction:row; } }
@media (max-width:760px){ .d23 .ft-top{ grid-template-columns:1fr 1fr; } }
`;
