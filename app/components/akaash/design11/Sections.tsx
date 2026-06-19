import { U, WORKS, SERVICES } from "./data";

/* Horizontal scroll-driven "Selected Works" gallery (home). */
export function SelectedWorks() {
  return (
    <section className="works-h">
      <div className="works-sticky">
        <div className="works-head">
          <div>
            <span className="eyebrow">Selected works</span>
            <h2 className="display" style={{ marginTop: 16 }}>
              Rooms we&apos;ve<br />lit, lately.
            </h2>
          </div>
          <span className="count-wrap">
            <span className="count" data-to={WORKS.length} data-suf="" /> projects in view
          </span>
        </div>
        <div className="works-viewport">
          <div className="works-track">
            {WORKS.map((w, i) => (
              <article className="work-card" key={w.title}>
                <div className="wc-img">
                  <span className="wc-idx">{String(i + 1).padStart(2, "0")}</span>
                  <img src={U(w.id, 1100)} alt={w.title} loading="lazy" />
                </div>
                <div className="wc-meta">
                  <h3>{w.title}</h3>
                  <span className="wc-tag">{w.tag}</span>
                </div>
                <p>{w.place}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="works-progress"><i /></div>
        <div className="works-hint">
          <span>Scroll to explore</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}

/* The signature draggable Blueprint -> Render reveal. */
export function BlueprintReveal() {
  return (
    <section className="reveal-sec">
      <div className="wrap">
        <div className="reveal-head">
          <span className="eyebrow">The Daylight method</span>
          <h2 className="display">
            Watch the line<br />become <em>light</em>.
          </h2>
          <p>
            Every Marquis Manor project travels from a precise technical blueprint to
            a fully lit, photoreal render. Drag the handle to move between the drawing
            and the daylight — the same room, twice.
          </p>
        </div>
        <div className="ba" data-cursor>
          <div className="ba-layer ba-after">
            <img src={U("photo-1600585154340-be6161a56a0c", 1600)} alt="Final render" />
            <span className="ba-label l-after">Render</span>
          </div>
          <div className="ba-layer ba-before">
            <div className="ba-blue" />
            <div className="ba-grid" />
            <img src={U("photo-1600585154340-be6161a56a0c", 1600)} alt="Blueprint" />
            <span className="ba-label l-before">Blueprint</span>
          </div>
          <div className="ba-handle"><div className="ba-knob" /></div>
        </div>
        <div className="ba-caption">
          <span>← Drag · the same room, drawn and lit</span>
          <span>Bayfront Penthouse · Marina District</span>
        </div>
      </div>
    </section>
  );
}

/* Sticky services list with image swap (home preview + services page). */
export function ServicesBlock({ heading = true }: { heading?: boolean }) {
  return (
    <section className="svc">
      <div className="wrap">
        {heading && (
          <div className="svc-top">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="display">
                A full-suite<br />visualisation <em>studio</em>.
              </h2>
            </div>
            <p>
              From a single hero still to an interactive virtual tour, every service
              shares one obsession — getting the light honest. Hover a service to
              preview it; tap to read more.
            </p>
          </div>
        )}
        <div className="svc-layout">
          <div className="svc-visual">
            {SERVICES.map((s, i) => (
              <img key={s.title} data-index={i} className={i === 0 ? "active" : ""} src={U(s.img, 1100)} alt={s.title} loading="lazy" />
            ))}
          </div>
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <div className="svc-item" data-index={i} key={s.title}>
                <div className="svc-item-head">
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <span className="plus">+</span>
                </div>
                <div className="svc-body">
                  <div className="svc-body-in">
                    <p>{s.desc}</p>
                    <p className="ideal"><b>Ideal for</b> — {s.ideal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
