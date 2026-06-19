/**
 * A purely decorative rangoli/mandala drawn as SVG. Generated so the petal
 * rings are mathematically even — used as a slow-turning halo behind the hero
 * word and as a section ornament. No client JS; CSS handles the rotation.
 */
export default function Mandala({
  className = "",
  petals = 24,
  rings = 3,
}: {
  className?: string;
  petals?: number;
  rings?: number;
}) {
  const c = 200;
  // Round trig output to a fixed precision so the server and client emit
  // byte-identical attribute strings (Node vs V8 differ in the last float
  // digit otherwise, which trips React's hydration check).
  const r3 = (n: number) => Math.round(n * 1000) / 1000;
  const ringDefs = Array.from({ length: rings }, (_, r) => {
    const radius = 60 + r * 45;
    const petalLen = 28 - r * 4;
    return Array.from({ length: petals }, (_, i) => {
      const a = (i / petals) * Math.PI * 2;
      const x = r3(c + Math.cos(a) * radius);
      const y = r3(c + Math.sin(a) * radius);
      return (
        <circle
          key={`${r}-${i}`}
          cx={x}
          cy={y}
          r={petalLen / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.8}
        />
      );
    });
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden
      fill="none"
    >
      <circle cx={c} cy={c} r={36} stroke="currentColor" strokeWidth={0.8} />
      <circle cx={c} cy={c} r={18} stroke="currentColor" strokeWidth={0.8} />
      {ringDefs}
      {Array.from({ length: petals }, (_, i) => {
        const a = (i / petals) * Math.PI * 2;
        return (
          <line
            key={`spoke-${i}`}
            x1={c}
            y1={c}
            x2={r3(c + Math.cos(a) * 195)}
            y2={r3(c + Math.sin(a) * 195)}
            stroke="currentColor"
            strokeWidth={0.3}
            opacity={0.5}
          />
        );
      })}
    </svg>
  );
}
