const ITEMS = [
  "Ocean",
  "Astronomica",
  "Jungle Book",
  "Circus",
  "House of Cards",
  "Mask",
  "Sustainable",
  "Angel",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-line py-7">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif text-2xl text-cream/70 md:text-3xl">{item}</span>
            <span className="mx-8 text-accent md:mx-12">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
