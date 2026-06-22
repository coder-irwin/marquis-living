"use client";

// design14 wordmark band (Marquee), ported into design23.
const ITEMS = ["Ocean", "Astronomica", "Jungle Book", "Circus", "House of Cards", "Mask", "Sustainable", "Angel"];

export default function WordmarkMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section className="wmq">
      <style dangerouslySetInnerHTML={{ __html: WMQ_CSS }} />
      <div className="wmq-track">
        {row.map((item, i) => (
          <span key={i} className="wmq-item">
            <span className="serif">{item}</span>
            <span className="wmq-star">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const WMQ_CSS = `
.d23 .wmq { border-block:1px solid var(--line); padding:28px 0; background:var(--bg); overflow:hidden; }
.d23 .wmq-track { display:inline-flex; white-space:nowrap; animation:d23wmq 34s linear infinite; }
.d23 .wmq-item { display:inline-flex; align-items:center; }
.d23 .wmq-item .serif { font-size:clamp(1.5rem,2.6vw,2rem); font-weight:300; color:var(--ink-2); }
.d23 .wmq-star { margin:0 clamp(32px,5vw,52px); color:var(--accent); }
@keyframes d23wmq { from{ transform:translateX(0);} to{ transform:translateX(-50%);} }
@media (prefers-reduced-motion: reduce){ .d23 .wmq-track{ animation:none; } }
`;
