import { BASE, PROJECTS } from "./data";

export default function Projects() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="ey mono">Selected work</span>
          <h1 className="lines" style={{ marginTop: 20 }}><span><i>Rooms before</i></span><span><i>they were <em>built</em>.</i></span></h1>
          <div className="phero-sub">
            <p>Residential, commercial and hospitality — each project lit from a real, site-specific daylight study.</p>
            <span className="mono">{PROJECTS.length} projects</span>
          </div>
        </div>
      </section>

      <section className="projects" style={{ paddingTop: 30 }}>
        <div className="wrap">
          {PROJECTS.map((p, i) => (
            <article className={`prow${i % 2 ? " flip" : ""}`} key={p.title}>
              <div className="pr-media ir"><img src={p.img} alt={p.title} loading="lazy" /></div>
              <div className="pr-body">
                <div className="pr-n mono">Project {p.n}</div>
                <h3>{p.title}</h3>
                <div className="pr-meta">
                  <div><span>Type</span><b>{p.type}</b></div>
                  <div><span>Place</span><b>{p.place}</b></div>
                  <div><span>Year</span><b>{p.year}</b></div>
                </div>
                <a href={`${BASE}/contact`} className="pr-link" data-cur>Enquire →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
