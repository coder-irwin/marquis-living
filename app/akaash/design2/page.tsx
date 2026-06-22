import type { Metadata } from "next";
import AkaashDesign2Site from "../../components/akaash/design2/AkaashDesign2Site";

export const metadata: Metadata = {
  title: "Akaash · Design 2 — Marquis Living",
  description:
    "Marquis Living designs your home like a story. A living night-sky hero, a scroll-driven user journey, and a showcase of rooms and bespoke products.",
};

export default function AkaashDesign2Page() {
  return <AkaashDesign2Site />;
}
