import { CREW, PHOTOS } from "./data";

export default function Crew() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="ey mono">The crew</span>
          <h1 className="lines" style={{ marginTop: 20 }}><span><i>The people</i></span><span><i>behind the <em>light</em>.</i></span></h1>
          <div className="phero-sub">
            <p>A small team of senior hands — directors, visualisers, modellers and stylists who treat every frame like it&apos;s their own home.</p>
            <span className="mono">{CREW.length} in studio</span>
          </div>
          <div className="phero-band ir"><img src={PHOTOS[2]} alt="The studio" /></div>
        </div>
      </section>

      <section className="crew" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="crew-grid">
            {CREW.map((m) => (
              <div className="member rv" key={m.name}>
                <div className="m-card"><span className="m-mono">{m.name.split(" ").map((w) => w[0]).join("")}</span><div className="m-tag"><h3>{m.name}</h3><p>{m.role}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ticker rev">
        <div className="ticker-tr">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>Curious <span className="dot">✦</span> <em>Exacting</em> <span className="dot">✦</span> Warm <span className="dot">✦</span> <em>On time</em> <span className="dot">✦</span> Honest <span className="dot">✦</span>&nbsp;</span>
          ))}
        </div>
      </div>
    </>
  );
}
