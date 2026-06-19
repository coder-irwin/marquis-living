import { U, BASE, PROCESS } from "./data";
import { SelectedWorks, BlueprintReveal, ServicesBlock } from "./Sections";
import { MaskedShowreel, GalleryWall, VideoBand, PhotoMarquee } from "./Showcase";
import { PHOTOS, VIDEO_BAND } from "./media";
import { ContactForm } from "./Shell";
import InfiniteGallery from "../../ui/3d-gallery-photography";

/** Bright, architectural frames for the hero's live 3D gallery. */
const HERO_GALLERY = [
  "photo-1600585154340-be6161a56a0c",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1618221195710-dd6b41faaea6",
  "photo-1600566753190-17f0baa2a6c3",
  "photo-1600210492493-0946911123ea",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1615874959474-d609969a20ed",
  "photo-1600573472550-8090b5e0745e",
  "photo-1505691938895-1758d7feb511",
  "photo-1600566753086-00f18fb6b3ea",
].map((id) => ({ src: U(id, 900), alt: "Marquis Manor render" }));

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow hero-eyebrow">Architectural visualisation studio</span>
              <h1>
                <span className="ln"><span>We draw</span></span>
                <span className="ln"><span><em>daylight</em></span></span>
                <span className="ln"><span>into space.</span></span>
              </h1>
            </div>
            <div className="hero-side">
              <p>
                Marquis Manor turns blueprints into rooms you can feel — photoreal
                renders, walkthroughs and virtual tours, lit honestly and delivered
                worldwide.
              </p>
              <div className="hero-actions">
                <a href={`${BASE}/work`} className="btn btn-fill magnetic" data-cursor><span>See our work</span><span className="arr">→</span></a>
                <a href={`${BASE}/services`} className="btn btn-ghost magnetic" data-cursor><span>Services</span></a>
              </div>
            </div>
          </div>

          <div className="hero-figure hero-3d-wrap">
            <InfiniteGallery
              images={HERO_GALLERY}
              speed={1}
              visibleCount={10}
              className="hero-3d"
            />
            <div className="hero-stat"><b>11</b><span>Years in light</span></div>
            <div className="hero-tag"><b>Live 3D gallery</b> — scroll, drag or let it drift</div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k}>
                Interiors <span className="star">✦</span> Exteriors <span className="star">✦</span> <em>Walkthroughs</em> <span className="star">✦</span> 3D Modelling <span className="star">✦</span> Virtual Tours <span className="star">✦</span> <em>Daylight studies</em> <span className="star">✦</span>&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO — copy flanked by drifting real photos */}
      <section className="manifesto">
        <div className="wrap manifesto-grid">
          <div className="manifesto-copy">
            <span className="lab reveal">The idea</span>
            <h2 className="reveal">
              A render is only honest when the light is. <span className="mute">So we begin every project with the sun</span> — its angle, its hour, its season — and let everything else fall into place around it. <em>The result feels less rendered, more remembered.</em>
            </h2>
          </div>
          <div className="manifesto-media">
            <div className="mfp mfp-a img-reveal" data-par="-36"><img src={PHOTOS[4]} alt="Sunlit interior" loading="lazy" /></div>
            <div className="mfp mfp-b img-reveal" data-par="44"><img src={PHOTOS[7]} alt="Daylit living space" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* PHOTO MARQUEE seam */}
      <PhotoMarquee offset={0} reverse />

      {/* STATS */}
      <section className="stats">
        <div className="wrap">
          <div className="stats-grid">
            <div className="stat reveal"><div className="num"><span className="count" data-to={450} data-suf="+" /></div><div className="lab">Projects lit, modelled and delivered since 2014.</div></div>
            <div className="stat reveal"><div className="num"><span className="count" data-to={12} data-suf="" /></div><div className="lab">Countries we ship finished work to, remotely.</div></div>
            <div className="stat reveal"><div className="num"><span className="count" data-to={98} data-suf="%" /></div><div className="lab">Clients who return for their next project.</div></div>
            <div className="stat reveal"><div className="num"><span className="count" data-to={48} data-suf="h" /></div><div className="lab">Typical turnaround on a first draft render.</div></div>
          </div>
        </div>
      </section>

      {/* TEXT-MASKED SHOWREEL */}
      <MaskedShowreel />

      {/* SELECTED WORKS — horizontal */}
      <SelectedWorks />

      {/* PARALLAX GALLERY WALL */}
      <GalleryWall />

      {/* BLUEPRINT -> RENDER */}
      <BlueprintReveal />

      {/* FULL-BLEED VIDEO BAND */}
      <VideoBand
        src={VIDEO_BAND}
        poster={PHOTOS[2]}
        eyebrow="Vision in motion"
        title={<>Stills move.<br />Spaces <em>breathe</em>.</>}
        sub="Cinematic walkthroughs and product films, paced and scored so a space reveals itself the way it would in person."
      />

      {/* SERVICES */}
      <ServicesBlock />

      {/* PROCESS */}
      <section className="process">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 className="display">Four steps, <em>one</em> obsession.</h2>
          <div className="process-grid">
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

      {/* PHOTO MARQUEE seam */}
      <PhotoMarquee offset={12} />

      {/* TESTIMONIAL */}
      <section className="quote-sec">
        <div className="wrap">
          <blockquote className="reveal">
            &ldquo;They didn&apos;t render our building. They <em>photographed</em> it a year before it existed.&rdquo;
          </blockquote>
          <div className="quote-by reveal"><b>Lena Hoffmann</b> — Principal, Hoffmann &amp; Reyes Architects</div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-sec">
        <div className="wrap contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Get in touch</span>
            <h2 className="display">Great spaces start with a <em>conversation</em>.</h2>
            <p>Send a sketch, a moodboard, or just a sentence. We&apos;ll reply with a plan, a timeline and honest pricing — no obligation.</p>
            <div className="contact-rows">
              <div className="crow"><span className="ck">Email</span><a href="mailto:hello@marquismanor.studio">hello@marquismanor.studio</a></div>
              <div className="crow"><span className="ck">Phone</span><a href="tel:+12135104140">+1 213-510-4140</a></div>
              <div className="crow"><span className="ck">Studio</span><span className="cv">Remote-first · worldwide</span></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
