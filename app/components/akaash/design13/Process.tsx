import { PROCESS, PHOTOS } from "./data";

export default function Process() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="ey mono">How we work</span>
          <h1 className="lines" style={{ marginTop: 20 }}><span><i>A calm,</i></span><span><i><em>predictable</em> path.</i></span></h1>
          <div className="phero-sub">
            <p>From the first conversation to final delivery, here is exactly how a Marquis Living project moves — no guesswork, no surprises.</p>
            <span className="mono">{PROCESS.length} stages</span>
          </div>
          <div className="phero-band ir"><img src={PHOTOS[4]} alt="Studio render" /></div>
        </div>
      </section>

      <section className="process on-dark">
        <div className="wrap">
          {PROCESS.map((s) => (
            <div className="pstep" key={s.n}>
              <div className="ps-n">{s.n}</div>
              <h3 className="rv">{s.h}</h3>
              <p className="rv">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band ir">
        <img className="par" data-par="-60" src={PHOTOS[8]} alt="Marquis Living interior" loading="lazy" />
      </section>
    </>
  );
}
