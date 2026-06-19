import LightField from "./LightField";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Threshold from "./Threshold";
import Descent from "./Descent";
import LightStudy from "./LightStudy";
import Materials from "./Materials";
import Reveal from "./Reveal";
import Invitation from "./Invitation";

export default function MarquisDesign4Site() {
  // `.d4` scopes the cinematic dark aesthetic. The LightField is fixed behind
  // every section so the whole site descends past one continuous environment.
  return (
    <div className="d4 d4-nocursor">
      <LightField />
      <div className="d4-grain" aria-hidden />
      <Cursor />
      <Nav />
      <main className="relative z-[1]">
        <Threshold />
        <Descent />
        <LightStudy />
        <Materials />
        <Reveal />
      </main>
      <Invitation />
    </div>
  );
}
