import type { Metadata } from "next";
import Shell from "../../../components/akaash/design11/Shell";
import About from "../../../components/akaash/design11/About";

export const metadata: Metadata = {
  title: "About — Marquis Living · Aperture",
  description:
    "A small architectural visualisation studio with one obsession: light. Our story, values, a decade-long timeline and the people behind Marquis Living.",
};

export default function AkaashDesign11AboutPage() {
  return (
    <Shell>
      <About />
    </Shell>
  );
}
