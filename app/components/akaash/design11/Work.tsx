import { WORKS } from "./data";
import { BlueprintReveal } from "./Sections";
import { PhotoMarquee, VideoBand } from "./Showcase";
import { PHOTOS, VIDEO_BAND_2 } from "./media";

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
          <div className="phero-band img-reveal"><img src={PHOTOS[1]} alt="Featured Marquis Manor project" /></div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="work-filter reveal">
            {FILTERS.map((f, i) => (
              <button className={`fbtn${i === 0 ? " on" : ""}`} data-filter={f.k} key={f.k}>{f.label}</button>
            ))}
          </div>
          <div className="pgrid">
            {WORKS.map((w, i) => (
              <article className={`pcard ${SIZES[i % SIZES.length]} img-reveal`} data-cat={w.cat} key={w.title} data-cursor>
                <div className="pc-img"><img src={PHOTOS[i % PHOTOS.length]} alt={w.title} loading="lazy" /></div>
                <div className="pc-over">
                  <h3>{w.title}</h3>
                  <span>{w.tag} · {w.place}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoMarquee offset={6} />

      <VideoBand
        src={VIDEO_BAND_2}
        poster={PHOTOS[8]}
        eyebrow="On site, in motion"
        title={<>Every project,<br />a <em>walkthrough</em>.</>}
        sub="Beyond stills, most projects ship with a cinematic flythrough — the fastest way to feel a space before a brick is laid."
      />

      <BlueprintReveal />
    </>
  );
}
