import type { ReactNode } from "react";
import { PHOTOS, SHOWREEL, pick } from "./media";

/* Text-masked studio showreel — the film plays THROUGH giant letterforms on bone. */
export function MaskedShowreel() {
  return (
    <section className="mv-sec">
      <div className="wrap" style={{ marginBottom: 34 }}>
        <span className="eyebrow">The studio reel</span>
      </div>
      <div className="mv">
        <video
          className="mv-video"
          data-autoplay
          muted
          loop
          playsInline
          preload="none"
          poster={PHOTOS[1]}
        >
          <source src={SHOWREEL} type="video/mp4" />
        </video>
        <svg className="mv-svg" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <mask id="d11-reel-mask">
              <rect width="1200" height="560" fill="#fff" />
              <text x="600" y="255" textAnchor="middle" className="mv-t">MARQUIS</text>
              <text x="600" y="455" textAnchor="middle" className="mv-t">MANOR</text>
            </mask>
          </defs>
          <rect className="mv-cover" width="1200" height="560" mask="url(#d11-reel-mask)" />
        </svg>
        <div className="mv-cap"><span>Showreel ’26</span><span>Sound on · 02:14</span></div>
      </div>
    </section>
  );
}

/* Dense parallax gallery wall — columns of real renders drifting at varied speeds. */
export function GalleryWall() {
  const cols = [
    { speed: "-34", imgs: pick(4, 0) },
    { speed: "26", imgs: pick(4, 4) },
    { speed: "-20", imgs: pick(4, 8) },
  ];
  return (
    <section className="wall">
      <div className="wrap wall-head">
        <span className="eyebrow">A wall of work</span>
        <h2 className="display">Every surface,<br />in its best <em>light</em>.</h2>
      </div>
      <div className="wall-grid">
        {cols.map((c, ci) => (
          <div className="wall-col" data-par={c.speed} key={ci}>
            {c.imgs.map((src, i) => (
              <div className="wall-item img-reveal" key={i}>
                <img src={src} alt="Marquis Living render" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* Full-bleed video band with an ivory scrim + ink headline (light-legible). */
export function VideoBand({
  src,
  eyebrow,
  title,
  sub,
  poster,
}: {
  src: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  poster?: string;
}) {
  return (
    <section className="vband">
      <video className="vband-video" data-autoplay muted loop playsInline preload="none" poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="vband-scrim" />
      <div className="wrap vband-in">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display">{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
    </section>
  );
}

/* Looping marquee of real interiors — a media seam between sections. */
export function PhotoMarquee({ offset = 0, reverse = false }: { offset?: number; reverse?: boolean }) {
  const imgs = pick(9, offset);
  return (
    <div className="pm">
      <div className={`pm-track${reverse ? " rev" : ""}`}>
        {[...imgs, ...imgs].map((src, i) => (
          <div className="pm-item" key={i}>
            <img src={src} alt="Marquis Living interior" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
