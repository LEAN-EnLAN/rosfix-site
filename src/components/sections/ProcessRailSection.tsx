import { processSteps } from "../../app-data";
import { SectionShell } from "../layout/SectionShell";

export function ProcessRailSection() {
  return (
    <SectionShell>
      <div className="section-heading">
        <span>Proceso</span>
        <h2>Se revisa, se explica y despues se decide</h2>
      </div>
      <div className="process-rail">
        {processSteps.map(([number, title, description]) => (
          <article key={number}>
            <small>{number}</small>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
