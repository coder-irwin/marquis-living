import { U, VALUES, TIMELINE, TEAM } from "./data";
import { VideoBand, PhotoMarquee } from "./Showcase";
import { PHOTOS, VIDEO_BAND } from "./media";

export default function About() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="eyebrow">About the studio</span>
          <h1>We make rooms<br /><em>believable</em>.</h1>
          <div className="phero-sub">
            <p>Marquis Manor is a small studio with a single obsession: light. We&apos;ve spent over a decade learning how daylight behaves in a space — and how to put it back, render after render.</p>
            <span className="crumbs"><b>Marquis Manor</b> / About</span>
          </div>
          <div className="phero-band img-reveal"><img src={U("photo-1600210492493-0946911123ea", 1900)} alt="Studio interior" /></div>
        </div>
      </section>

      <section className="story">
        <div className="wrap story-grid">
          <div className="s-img img-reveal"><img src={U("photo-1505691938895-1758d7feb511", 1200)} alt="Designer at work" /></div>
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Started after hours.<br />Grew on <em>trust</em>.</h2>
            <p>We began in 2014 as two people rendering interiors after our day jobs, for architects who needed something more honest than the glossy, over-lit visuals everyone else was making.</p>
            <p>Word travelled. A decade on, we&apos;re a full-suite visualisation studio shipping work to twelve countries — but the brief hasn&apos;t changed: make it real, make it warm, make the light tell the truth.</p>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="wrap">
          <span className="eyebrow">What we believe</span>
          <h2 className="display" style={{ marginTop: 16 }}>Three things, held closely.</h2>
          <div className="values-grid stagger-parent">
            {VALUES.map((v) => (
              <div className="value reveal" key={v.h}>
                <div className="vn">{v.n}</div>
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoBand
        src={VIDEO_BAND}
        poster={PHOTOS[5]}
        eyebrow="Inside the studio"
        title={<>Light, studied<br />on <em>repeat</em>.</>}
        sub="Every project opens with a site-specific daylight study — orientation, hour and season — so the mood is grounded in something real."
      />

      <section className="timeline">
        <div className="wrap">
          <span className="eyebrow">The road here</span>
          <h2 className="display" style={{ marginTop: 16 }}>A decade in <em>daylight</em>.</h2>
          <div className="tl">
            {TIMELINE.map((t) => (
              <div className="tl-row reveal" key={t.yr}>
                <div className="yr">{t.yr}</div>
                <div>
                  <h3>{t.h}</h3>
                  <p>{t.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoMarquee offset={4} />

      <section className="team">
        <div className="wrap">
          <span className="eyebrow">The people</span>
          <h2 className="display" style={{ marginTop: 16 }}>Small studio, <em>senior</em> hands.</h2>
          <div className="team-grid stagger-parent">
            {TEAM.map((m) => (
              <div className="member reveal" key={m.name}>
                <div className="m-img"><img src={U(m.img, 700)} alt={m.name} loading="lazy" /></div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
