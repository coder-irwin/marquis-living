import { U } from "./data";
import { ContactForm } from "./Shell";

const FAQ = [
  ["How fast is a first draft?", "Most projects see a first render within 48 hours of a locked brief. Animations and virtual tours take longer — we'll give you an exact date up front."],
  ["Do you work from sketches?", "Absolutely. A napkin sketch, a CAD set, a SketchUp file or a moodboard — whatever you have, we'll work from it."],
  ["How does pricing work?", "Flat, per-deliverable pricing agreed before we start. No hourly surprises; revisions within scope are included."],
  ["Where are you based?", "We're remote-first and deliver worldwide. Time zones have never stopped a project shipping on time."],
];

export default function Contact() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Let&apos;s begin in<br /><em>daylight</em>.</h1>
          <div className="phero-sub">
            <p>Tell us about the room, the building, or the idea. We read every message ourselves and reply — usually within a day.</p>
            <span className="crumbs"><b>Marquis Manor</b> / Contact</span>
          </div>
        </div>
      </section>

      <section className="contact-sec" style={{ paddingTop: 60 }}>
        <div className="wrap contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Reach us</span>
            <h2 className="display">A real person<br />will <em>answer</em>.</h2>
            <p>No bots, no ticket numbers. Send the brief and you&apos;ll hear back from the people who&apos;ll actually do the work.</p>
            <div className="contact-rows">
              <div className="crow"><span className="ck">Email</span><a href="mailto:hello@marquismanor.studio">hello@marquismanor.studio</a></div>
              <div className="crow"><span className="ck">Phone</span><a href="tel:+12135104140">+1 213-510-4140</a></div>
              <div className="crow"><span className="ck">Hours</span><span className="cv">Mon–Fri · 9–6, your time</span></div>
              <div className="crow"><span className="ck">Studio</span><span className="cv">Remote-first · worldwide</span></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="story" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="phero-band img-reveal" style={{ marginTop: 0 }}><img src={U("photo-1600573472550-8090b5e0745e", 1900)} alt="Sunlit pavilion" /></div>
        </div>
      </section>

      <section className="timeline" style={{ paddingTop: 90 }}>
        <div className="wrap">
          <span className="eyebrow">Before you ask</span>
          <h2 className="display" style={{ marginTop: 16 }}>Quick <em>answers</em>.</h2>
          <div className="tl">
            {FAQ.map(([q, a]) => (
              <div className="tl-row reveal" key={q}>
                <div className="yr" style={{ fontSize: 22 }}>Q.</div>
                <div>
                  <h3>{q}</h3>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
