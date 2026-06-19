import type { Metadata } from "next";
import MarquisDesign5Site from "../../components/akaash/design5/MarquisDesign5Site";

export const metadata: Metadata = {
  title: "Akaash · Design 5 — Marquis Manor · Aperture",
  description:
    "Marquis Manor — a white, centered, minimal premium interior studio site. Step through a scroll-driven aperture into the home, and a fanning deck of selected work.",
};

export default function AkaashDesign5Page() {
  return <MarquisDesign5Site />;
}
