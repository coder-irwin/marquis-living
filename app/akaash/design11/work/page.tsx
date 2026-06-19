import type { Metadata } from "next";
import Shell from "../../../components/akaash/design11/Shell";
import Work from "../../../components/akaash/design11/Work";

export const metadata: Metadata = {
  title: "Work — Marquis Manor · Aperture",
  description:
    "Selected architectural visualisation work — residential, commercial and hospitality projects, each lit from a real, site-specific daylight study.",
};

export default function AkaashDesign11WorkPage() {
  return (
    <Shell>
      <Work />
    </Shell>
  );
}
