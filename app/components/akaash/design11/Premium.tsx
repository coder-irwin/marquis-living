import { SERVICES, BASE } from "./data";
import { PHOTOS } from "./media";

/* Dark service cards — render visual + number + copy + "explore" (ref: image.png). */
export function ServicesCards() {
  const cards = SERVICES.slice(0, 3);
  return (
    <section className="scards">
      <div className="wrap">
        <div className="scards-head">
          <span className="eyebrow">What we do</span>
          <h2 className="display">Built for every stage<br />of the <em>render</em>.</h2>
        </div>
        <div className="scards-grid stagger-parent">
          {cards.map((s, i) => (
            <article className="scard reveal" key={s.title}>
              <div className="scard-img img-reveal"><img src={PHOTOS[(i * 4 + 2) % PHOTOS.length]} alt={s.title} loading="lazy" /></div>
              <div className="scard-body">
                <span className="scard-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="scard-ideal"><span>Ideal for</span> {s.ideal}</div>
                <a href={`${BASE}/services`} className="scard-link" data-cursor>Explore <span className="arr">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { h: "Studio-grade quality, without the agency bill.", p: "Concept detailing, material accuracy, lighting precision and photoreal rendering — handled end to end, at pricing that stays refreshingly sane." },
  { h: "Fast, reliable, pixel-perfect — every time.", p: "From modelling to revisions to final delivery, we hold timelines without ever cutting the detail that makes a render believable." },
  { h: "A creative partner, not a vendor.", p: "We sit inside your process — brainstorming, suggesting materials, iterating — and keep communication open and honest at every step." },
];

/* Dark big-number showcase rows (ref: image copy.png). */
export function WhyShowcase() {
  return (
    <section className="why-dark">
      <div className="wrap why-dark-head">
        <span className="eyebrow">Why Marquis Living</span>
        <h2 className="display">Every detail,<br /><em>every time</em>.</h2>
      </div>
      <div className="wrap why-dark-rows">
        {WHY.map((w, i) => (
          <div className={`wd-row${i % 2 ? " flip" : ""}`} key={i}>
            <div className="wd-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="wd-img img-reveal" data-par={i % 2 ? "26" : "-26"}>
              <img src={PHOTOS[(i * 5 + 1) % PHOTOS.length]} alt="Marquis Living render" loading="lazy" />
            </div>
            <div className="wd-copy reveal">
              <h3>{w.h}</h3>
              <p>{w.p}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
