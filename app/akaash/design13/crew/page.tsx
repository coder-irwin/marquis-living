import type { Metadata } from "next";
import Shell from "../../../components/akaash/design13/Shell";
import Crew from "../../../components/akaash/design13/Crew";

export const metadata: Metadata = {
  title: "The Crew — Marquis Living · Loft",
  description: "A small team of senior hands — directors, visualisers, modellers and stylists who treat every frame like their own home.",
};

export default function AkaashDesign12CrewPage() {
  return (
    <Shell>
      <Crew />
    </Shell>
  );
}
