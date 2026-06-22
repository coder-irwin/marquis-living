import { PROCESS } from "./data";
import { ServicesBlock, BlueprintReveal } from "./Sections";
import { GalleryWall, VideoBand, PhotoMarquee } from "./Showcase";
import { PHOTOS, VIDEO_BAND } from "./media";

export default function Services() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1>Everything from<br />line to <em>light</em>.</h1>
          <div className="phero-sub">
            <p>Whatever stage you&apos;re at — a napkin sketch or a finished set of drawings — there&apos;s a service here to carry it the rest of the way to photoreal.</p>
            <span className="crumbs"><b>Marquis Living</b> / Services</span>
          </div>
          <div className="phero-band img-reveal"><img src={PHOTOS[9]} alt="Render workspace" /></div>
        </div>
      </section>

      <ServicesBlock heading={false} />

      <section className="process">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 className="display">A calm, <em>predictable</em> process.</h2>
          <div className="process-grid stagger-parent">
            {PROCESS.map((p) => (
              <div className="pstep reveal" key={p.n}>
                <div className="pn">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoBand
        src={VIDEO_BAND}
        poster={PHOTOS[2]}
        eyebrow="The output"
        title={<>Delivered the way<br />you&apos;ll <em>use</em> it.</>}
        sub="Print-ready stills, web crops, animation masters and interactive tours — every format, colour-managed and on time."
      />

      <GalleryWall />

      <PhotoMarquee offset={9} reverse />

      <BlueprintReveal />
    </>
  );
}
