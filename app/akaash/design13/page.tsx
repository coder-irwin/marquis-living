import type { Metadata } from "next";
import Shell from "../../components/akaash/design13/Shell";
import Home from "../../components/akaash/design13/Home";

export const metadata: Metadata = {
  title: "Marquis Manor — Architectural Visualisation Studio · Loft",
  description:
    "Marquis Manor builds light into every room — photoreal architectural renders, walkthroughs and virtual tours. A warm, editorial studio site with smooth scroll, serif tickers and editorial project rows.",
};

export default function AkaashDesign12Page() {
  return (
    <Shell>
      <Home />
    </Shell>
  );
}
