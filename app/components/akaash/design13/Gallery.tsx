import { PHOTOS } from "./data";

export default function Gallery() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="ey mono">The gallery</span>
          <h1 className="lines" style={{ marginTop: 20 }}><span><i>Every surface,</i></span><span><i>in its best <em>light</em>.</i></span></h1>
          <div className="phero-sub">
            <p>A wall of recent renders — interiors, exteriors and details, all lit from honest daylight.</p>
            <span className="mono">{PHOTOS.length} frames</span>
          </div>
        </div>
      </section>

      <section className="gallery" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="gal-grid">
            {PHOTOS.map((src, i) => (
              <div className="g-item ir" key={i}><img src={src} alt="Marquis Living render" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
