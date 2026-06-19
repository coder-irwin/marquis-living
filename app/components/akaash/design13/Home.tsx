import { BASE, SHOWREEL, PROJECTS, PROCESS, CREW, STATS, PHOTOS, pick } from "./data";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <video className="hero-video" data-autoplay muted loop playsInline preload="none" poster={PHOTOS[1]}>
          <source src={SHOWREEL} type="video/mp4" />
        </video>
        <div className="hero-scrim" />
        <div className="wrap hero-in">
          <div className="hero-top mono">
            <span>(01) — Architectural visualisation</span>
            <span>Est. 2014 · Worldwide</span>
          </div>
          <h1 className="lines">
            <span><i>We build</i></span>
            <span><i><em>light</em> into</i></span>
            <span><i>every room.</i></span>
          </h1>
          <div className="hero-foot">
            <p>A studio that turns blueprints into spaces you can feel — photoreal renders, walkthroughs and tours, lit with the honesty of real daylight.</p>
            <span className="scroll-cue mono">Scroll <span className="ln" /></span>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-tr">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>Interiors <span className="dot">✦</span> <em>Exteriors</em> <span className="dot">✦</span> Walkthroughs <span className="dot">✦</span> <em>Daylight studies</em> <span className="dot">✦</span> Virtual tours <span className="dot">✦</span>&nbsp;</span>
          ))}
        </div>
      </div>

      {/* INTRO / PROOF */}
      <section className="intro">
        <div className="wrap">
          <span className="ey mono">The proof</span>
          <div className="intro-grid" style={{ marginTop: 26 }}>
            <h2 className="rv">A render is only honest when the light is. <span className="mut">So every project begins with the sun</span> — its angle, its hour, its season — and lets the room build itself around it. <em>Less rendered, more remembered.</em></h2>
            <div className="intro-side rv">
              <p>For more than a decade we&apos;ve made spaces believable for architects, developers and interior studios — quietly, accurately, and on time.</p>
              <a href={`${BASE}/process`} className="btn btn-line magnetic" data-cur><span>How we work</span><span className="ar">→</span></a>
            </div>
          </div>
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat rv" key={s.l}>
                <div className="n"><span className="count" data-to={s.n} data-suf={s.suf} /></div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="projects">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="lines"><span><i>The</i></span><span><i><em>proof</em> of work.</i></span></h2>
            <a href={`${BASE}/projects`} className="pr-link" data-cur>All projects →</a>
          </div>
          {PROJECTS.slice(0, 4).map((p, i) => (
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
                <a href={`${BASE}/projects`} className="pr-link" data-cur>View project →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FULL-BLEED BAND */}
      <section className="band ir">
        <img className="par" data-par="-60" src={PHOTOS[5]} alt="Marquis Manor interior" loading="lazy" />
      </section>

      {/* PROCESS */}
      <section className="process on-dark">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="ey mono">The process</span>
              <h2 className="lines" style={{ marginTop: 18 }}><span><i>Five steps,</i></span><span><i>one <em>obsession</em>.</i></span></h2>
            </div>
          </div>
          {PROCESS.map((s) => (
            <div className="pstep" key={s.n}>
              <div className="ps-n">{s.n}</div>
              <h3 className="rv">{s.h}</h3>
              <p className="rv">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREW TEASER */}
      <section className="crew">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="ey mono">The crew</span>
              <h2 className="lines" style={{ marginTop: 18 }}><span><i>Small studio,</i></span><span><i><em>senior</em> hands.</i></span></h2>
            </div>
            <a href={`${BASE}/crew`} className="pr-link" data-cur>Meet everyone →</a>
          </div>
          <div className="crew-grid">
            {CREW.slice(0, 3).map((m) => (
              <div className="member rv" key={m.name}>
                <div className="m-card"><span className="m-mono">{m.name.split(" ").map((w) => w[0]).join("")}</span><div className="m-tag"><h3>{m.name}</h3><p>{m.role}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="gallery">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="lines"><span><i>The</i></span><span><i><em>gallery</em>.</i></span></h2>
            <a href={`${BASE}/gallery`} className="pr-link" data-cur>Full gallery →</a>
          </div>
          <div className="gal-grid">
            {pick(9, 2).map((src, i) => (
              <div className="g-item ir" key={i}><img src={src} alt="Marquis Manor render" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
