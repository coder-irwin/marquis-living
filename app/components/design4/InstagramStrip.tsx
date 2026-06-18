import { INSTAGRAM } from "./data";

export default function InstagramStrip() {
  return (
    <section className="overflow-hidden py-[clamp(48px,9vw,120px)]">
      <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-[clamp(18px,3vw,42px)]">
        {INSTAGRAM.map((src, i) => (
          <a
            key={i}
            href="#"
            className="zoom relative aspect-[3/4] w-[42vw] shrink-0 snap-start overflow-hidden md:w-[19vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Instagram post" loading="lazy" className="h-full w-full object-cover" />
          </a>
        ))}
      </div>
      <div className="container mt-10 text-center">
        <h4 className="font-serif text-2xl text-[#2f3a48] md:text-3xl">
          <a href="#" className="ul-link">@marquismanor</a>
        </h4>
      </div>
    </section>
  );
}
