import type { Metadata } from "next";
import MarquisDesign3Site from "../../components/akaash/design3/MarquisDesign3Site";

export const metadata: Metadata = {
  title: "Akaash · Design 3 — Marquis Manor",
  description:
    "Marquis Manor — an interior atelier. An ink-reveal hero you wipe away to uncover the room, and a sticky 'Marquis Method' user journey from consult to reveal.",
};

export default function AkaashDesign3Page() {
  return <MarquisDesign3Site />;
}
