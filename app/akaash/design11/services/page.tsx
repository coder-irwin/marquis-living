import type { Metadata } from "next";
import Shell from "../../../components/akaash/design11/Shell";
import Services from "../../../components/akaash/design11/Services";

export const metadata: Metadata = {
  title: "Services — Marquis Manor · Aperture",
  description:
    "Architectural visualisation, 3D modelling, interior styling, walkthrough animation and virtual tours — everything from line to light, with a calm, predictable process.",
};

export default function AkaashDesign11ServicesPage() {
  return (
    <Shell>
      <Services />
    </Shell>
  );
}
