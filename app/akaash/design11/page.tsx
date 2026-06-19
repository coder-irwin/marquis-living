import type { Metadata } from "next";
import Shell from "../../components/akaash/design11/Shell";
import Home from "../../components/akaash/design11/Home";

export const metadata: Metadata = {
  title: "Marquis Manor — Architectural Visualisation Studio · Aperture",
  description:
    "Marquis Manor draws daylight into space — photoreal architectural renders, walkthroughs and virtual tours. A bright, editorial studio site with a draggable blueprint-to-render reveal, scroll-driven works gallery and a magnetic cursor.",
};

export default function AkaashDesign11Page() {
  return (
    <Shell>
      <Home />
    </Shell>
  );
}
