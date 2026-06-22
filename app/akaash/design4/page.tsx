import type { Metadata } from "next";
import MarquisDesign4Site from "../../components/akaash/design4/MarquisDesign4Site";

export const metadata: Metadata = {
  title: "Akaash · Design 4 — Marquis Living · Atrium",
  description:
    "Marquis Living — a cinematic, continuous descent through a living piece of architecture. WebGL volumetric light, a scroll-driven camera, cursor-lit rooms and 3D depth.",
};

export default function AkaashDesign4Page() {
  return <MarquisDesign4Site />;
}
