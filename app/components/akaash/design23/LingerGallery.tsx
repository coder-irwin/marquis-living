"use client";

import { useState } from "react";

// design14 "Linger on a room" (GalleryGrid) — expanding flex row on hover.
const PIECES = [
  { name: "The Majlis", tag: "Living", img: "/glocal-portfolio/portfolio-12-0547cb1f.webp" },
  { name: "The Chef's Kitchen", tag: "Kitchen", img: "/glocal-portfolio/portfolio-43-56fef46a.webp" },
  { name: "Sunlit Dining", tag: "Dining", img: "/glocal-portfolio/portfolio-30-2e527f6c.webp" },
  { name: "The Master Suite", tag: "Bedroom", img: "/glocal-portfolio/portfolio-17-4a7a6209.webp" },
  { name: "The Study", tag: "Study", img: "/glocal-portfolio/portfolio-46-3fc373be.webp" },
  { name: "The Children's Room", tag: "Bedroom", img: "/glocal-portfolio/portfolio-34-6ff5a7d2-85b8c675-2399-43e8-90c4-890bfd058f92.jpg" },
];

export default function LingerGallery() {
  const [active, setActive] = useState(0);
  return (
    <section className="lg">
      <style dangerouslySetInnerHTML={{ __html: LG_CSS }} />
      <div className="wrap">
        <div className="lg-head">
          <div>
            <span className="ey rv">A Closer Look</span>
            <h2 className="serif rv">Linger on a room</h2>
          </div>
          <p className="lg-sub rv">Rest on any room and it opens to fill the frame — the way it will one day fill your evenings.</p>
        </div>

        <div className="lg-row">
          {PIECES.map((p, i) => (
            <div
              key={p.name}
              className="lg-cell"
              onMouseEnter={() => setActive(i)}
              style={{ flexGrow: active === i ? 6 : 1 }}
            >
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="lg-shade" />
              <div className="lg-cap" style={{ opacity: active === i ? 1 : 0 }}>
                <p className="serif lg-name">{p.name}</p>
                <p className="lg-tag">{p.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LG_CSS = `
.d23 .lg { background:var(--bg); padding:clamp(90px,15vh,200px) 0; }
.d23 .lg-head { margin-bottom:48px; display:flex; flex-wrap:wrap; gap:16px; align-items:flex-end; justify-content:space-between; }
.d23 .lg-head h2 { font-size:clamp(2rem,5vw,4rem); margin-top:18px; }
.d23 .lg-sub { max-width:24rem; color:var(--muted); }
.d23 .lg-row { display:flex; gap:12px; height:64vh; }
.d23 .lg-cell { position:relative; flex-basis:0; min-width:0; overflow:hidden; border-radius:16px; cursor:pointer; transition:flex-grow .7s cubic-bezier(.22,1,.36,1); }
.d23 .lg-cell img { width:100%; height:100%; object-fit:cover; }
.d23 .lg-shade { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.6), transparent 55%); }
.d23 .lg-cap { position:absolute; left:20px; bottom:20px; transition:opacity .5s; }
.d23 .lg-name { color:#fff; font-size:1.35rem; font-weight:300; }
.d23 .lg-tag { font-size:.72rem; text-transform:uppercase; letter-spacing:.2em; color:rgba(255,255,255,.72); }
@media (max-width:760px){ .d23 .lg-row{ height:auto; flex-direction:column; } .d23 .lg-cell{ height:46vh; flex-grow:1 !important; } .d23 .lg-cap{ opacity:1 !important; } }
`;
