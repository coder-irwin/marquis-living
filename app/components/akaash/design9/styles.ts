// Akaash · Design 9 — "Cinema" scoped styles for Marquis Manor.
//
// Kept self-contained (injected via a <style> tag in the site shell) instead of
// appended to the shared globals.css, so design9 is fully isolated from every
// other design and never races with concurrent edits to globals.css. Everything
// is namespaced under `.d9`. Re-creates the studio reference's MOTION primitives
// only (marquee, shine, glow, slide-swap) — no third-party CSS is copied.

export const D9_CSS = `
.d9 {
  --bg: #f6f4ef;        /* light editorial paper */
  --ink: #111114;       /* near-black */
  --soft: #5d5f63;
  --line: rgba(17, 17, 20, 0.12);
  --night: #060010;     /* cinematic video backdrop */
  --c1: #00d4f3;        /* studio gradient — cyan */
  --c2: #ff005b;        /* studio gradient — magenta */

  position: relative;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-inter), system-ui, sans-serif;
  overflow-x: hidden;
}
.d9 ::selection { background: var(--c2); color: #ffffff; }

.d9 .display {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 600;
  line-height: 0.96;
  letter-spacing: -0.045em;
}
.d9 .eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--soft);
}

/* Gradient "shine" text (reference: ColorfulText shine) */
.d9-shine {
  background: linear-gradient(
    90deg,
    currentColor 0%,
    currentColor 38%,
    var(--c1) 48%,
    var(--c2) 58%,
    currentColor 70%,
    currentColor 100%
  );
  background-size: 250% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--ink);
  animation: d9-shine 6s linear infinite;
}
@keyframes d9-shine {
  0% { background-position: 150% center; }
  100% { background-position: -150% center; }
}

/* Glowing gradient button (reference: LinkButton glowing) */
.d9-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 30px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  background: #111114;
  isolation: isolate;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.d9-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(90deg, var(--c1), var(--c2), var(--c1), var(--c2), var(--c1));
  background-size: 400% auto;
  opacity: 0;
  transition: opacity 0.45s ease;
  animation: d9-glow 20s linear infinite;
}
.d9-btn:hover { transform: translateY(-2px); }
.d9-btn:hover::before { opacity: 1; }
@keyframes d9-glow {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

.d9-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 30px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: inherit;
  border: 1px solid currentColor;
  opacity: 0.8;
  transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.d9-btn-ghost:hover { opacity: 1; transform: translateY(-2px); }

/* Slide-swap link (reference: ::after data-replace + translate3d) */
.d9-link {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}
.d9-link span {
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
}
.d9-link::after {
  content: attr(data-replace);
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  color: var(--c2);
  transform: translate3d(200%, 0, 0);
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
}
.d9-link:hover span { transform: translate3d(-200%, 0, 0); }
.d9-link:hover::after { transform: translate3d(0, 0, 0); }

/* Infinite marquee (reference: Carousel scroll, doubled track → -50%) */
.d9-marquee {
  display: flex;
  width: max-content;
  animation: d9-marquee var(--d9-marquee-time, 28s) linear infinite;
}
.d9-marquee-track:hover .d9-marquee { animation-play-state: paused; }
@keyframes d9-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .d9-shine,
  .d9-btn::before,
  .d9-marquee { animation: none; }
}
`;
