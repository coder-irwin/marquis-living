import type { Metadata } from "next";
import Shell from "../../../components/akaash/design13/Shell";
import Projects from "../../../components/akaash/design13/Projects";

export const metadata: Metadata = {
  title: "Projects — Marquis Living · Loft",
  description: "Selected architectural visualisation work — residential, commercial and hospitality projects, each lit from a real daylight study.",
};

export default function AkaashDesign12ProjectsPage() {
  return (
    <Shell>
      <Projects />
    </Shell>
  );
}
