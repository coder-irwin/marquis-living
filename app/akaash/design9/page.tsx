import type { Metadata } from "next";
import MarquisDesign9Site from "../../components/akaash/design9/MarquisDesign9Site";

export const metadata: Metadata = {
  title: "Akaash · Design 9 — Marquis Manor · Cinema",
  description:
    "Marquis Manor — a cinematic interior-studio landing: full-screen video masthead, word-by-word hero reveal, a text-masked video, infinite marquees, gradient shine text and a scroll zoom-parallax gallery. Original copy and the studio's own imagery.",
};

export default function AkaashDesign9Page() {
  return <MarquisDesign9Site />;
}
