import { U, WORKS } from "./data";
import { BlueprintReveal } from "./Sections";

const FILTERS = [
  { k: "all", label: "All work" },
  { k: "interior", label: "Interiors" },
  { k: "exterior", label: "Exteriors" },
  { k: "commercial", label: "Commercial" },
  { k: "hospitality", label: "Hospitality" },
];

/* Repeating size rhythm for an editorial masonry feel. */
const SIZES = ["big", "small", "wide", "tall", "tall", "wide", "small", "big"];

export default function Work() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="eyebrow">Selected work</span>
          <h1>Rooms before<br />they were <em>built</em>.</h1>
          <div className="phero-sub">
            <p>A cross-section of recent projects — residential, commercial and hospitality — each one lit from a real, site-specific daylight study.</p>
            <span className="crumbs"><b>Marquis Manor</b> / Work</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="work-filter">
            {FILTERS.map((f, i) => (
              <button className={`fbtn${i === 0 ? " on" : ""}`} data-filter={f.k} key={f.k}>{f.label}</button>
            ))}
          </div>
          <div className="pgrid">
            {WORKS.map((w, i) => (
              <article className={`pcard ${SIZES[i % SIZES.length]} img-reveal`} data-cat={w.cat} key={w.title} data-cursor>
                <div className="pc-img"><img src={U(w.id, 1300)} alt={w.title} loading="lazy" /></div>
                <div className="pc-over">
                  <h3>{w.title}</h3>
                  <span>{w.tag} · {w.place}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BlueprintReveal />
    </>
  );
}
