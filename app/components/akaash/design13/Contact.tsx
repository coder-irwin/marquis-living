import { ContactForm } from "./Shell";

export default function Contact() {
  return (
    <section className="contact">
      <div className="wrap contact-grid">
        <div>
          <span className="ey mono">Get in touch</span>
          <h1 className="lines" style={{ marginTop: 22 }}><span><i>Let&apos;s</i></span><span><i><em>talk.</em></i></span></h1>
          <p className="lead rv">Tell us about the room, the building, or the idea. We read every message ourselves and reply — usually within a day.</p>
          <div className="rv">
            <div className="crow"><span>Email</span><a href="mailto:hello@marquismanor.studio">hello@marquismanor.studio</a></div>
            <div className="crow"><span>Call us</span><a href="tel:+12135104140">+1 213-510-4140</a></div>
            <div className="crow"><span>Hours</span><b>Mon–Fri · 9–6, your time</b></div>
            <div className="crow"><span>Studio</span><b>Remote-first · worldwide</b></div>
          </div>
        </div>
        <div className="rv">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
