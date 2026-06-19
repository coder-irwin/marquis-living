import type { Metadata } from "next";
import Shell from "../../../components/akaash/design13/Shell";
import Gallery from "../../../components/akaash/design13/Gallery";

export const metadata: Metadata = {
  title: "Gallery — Marquis Manor · Loft",
  description: "A wall of recent Marquis Manor renders — interiors, exteriors and details, all lit from honest daylight.",
};

export default function AkaashDesign12GalleryPage() {
  return (
    <Shell>
      <Gallery />
    </Shell>
  );
}
