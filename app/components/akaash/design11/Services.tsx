import { U, PROCESS } from "./data";
import { ServicesBlock, BlueprintReveal } from "./Sections";

export default function Services() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1>Everything from<br />line to <em>light</em>.</h1>
          <div className="phero-sub">
            <p>Whatever stage you&apos;re at — a napkin sketch or a finished set of drawings — there&apos;s a service here to carry it the rest of the way to photoreal.</p>
            <span className="crumbs"><b>Marquis Manor</b> / Services</span>
          </div>
          <div className="phero-band img-reveal"><img src={U("photo-1600566753086-00f18fb6b3ea", 1900)} alt="Render workspace" /></div>
        </div>
      </section>

      <ServicesBlock heading={false} />

      <section className="process">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 className="display">A calm, <em>predictable</em> process.</h2>
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

      <BlueprintReveal />
    </>
  );
}
