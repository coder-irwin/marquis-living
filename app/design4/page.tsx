import type { Metadata } from "next";
import Header from "../components/design4/Header";
import OpeningCarousel from "../components/design4/OpeningCarousel";
import { LargeText, SmallText } from "../components/design4/TextSections";
import {
  TwoColumnMedia,
  SingleRightMedia,
  LargeMedia,
} from "../components/design4/MediaSections";
import InstagramStrip from "../components/design4/InstagramStrip";
import Footer from "../components/design4/Footer";
import {
  ROW_1,
  ROW_2,
  ROW_3,
  ROW_4_RIGHT,
  LARGE_1,
  LARGE_2,
} from "../components/design4/data";

export const metadata: Metadata = {
  title: "Design 4 — Marquis Manor · Luxury Furniture & Interiors",
  description:
    "Marquis Manor — the art of designing and crafting luxury furniture. Grandeur, artistry and effortless panache.",
};

export default function Design4Page() {
  return (
    <div id="top" className="bg-[#fcfcfc]">
      <Header />
      <main>
        {/* Opening split hero */}
        <OpeningCarousel />

        {/* Statement */}
        <LargeText text="We believe the most beautiful spaces begin with a single, considered piece." />

        {/* Featured collections */}
        <TwoColumnMedia tiles={[ROW_1[0], ROW_1[1]]} />

        <SmallText>
          <p>
            There are many things that make a room beautiful. Balance and
            proportion. A reverence for materials and the hands that shape them.
            But we believe the most beautiful spaces begin with a single,
            considered piece.
          </p>
          <p>
            Pieces that are not showpieces but companions — inviting
            conversation, comfort, calm. This is the furniture we craft.
          </p>
        </SmallText>

        {/* The Jungle Book */}
        <LargeMedia tile={LARGE_1} />

        <TwoColumnMedia tiles={[ROW_2[0], ROW_2[1]]} />
        <TwoColumnMedia tiles={[ROW_3[0], ROW_3[1]]} />

        {/* Astronomica */}
        <LargeMedia tile={LARGE_2} />

        <SmallText>
          <p>
            Luxury is built on comfort, not on fleeting fashions. Our pieces
            balance sensuous elements of styles old and new, creating an effect
            that&apos;s both distinctive and timeless. And, whether we&apos;re
            crafting a stately cabinet or an artisan-made coffee table, we take
            extraordinary care over every last corner&nbsp;
            <span className="text-[#666666]">
              <b>–</b>&nbsp;b
            </span>
            ecause exceptional craft never, ever goes out of style.
          </p>
        </SmallText>

        {/* Accent Chair (right column only) */}
        <SingleRightMedia tile={ROW_4_RIGHT} />

        {/* Instagram */}
        <InstagramStrip />
      </main>
      <Footer />
    </div>
  );
}
