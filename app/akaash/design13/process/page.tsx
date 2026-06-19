import type { Metadata } from "next";
import Shell from "../../../components/akaash/design13/Shell";
import Process from "../../../components/akaash/design13/Process";

export const metadata: Metadata = {
  title: "The Process — Marquis Manor · Loft",
  description: "From the first conversation to final delivery — exactly how a Marquis Manor project moves: listen, draw, light, dress, deliver.",
};

export default function AkaashDesign12ProcessPage() {
  return (
    <Shell>
      <Process />
    </Shell>
  );
}
