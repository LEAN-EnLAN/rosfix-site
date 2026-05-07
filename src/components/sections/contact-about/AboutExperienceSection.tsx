import { experience } from "../../../app-data";
import { SectionShell } from "../../layout/SectionShell";

export function ExperienceSection() {
  return (
    <SectionShell className="section-editorial">
      <div className="section-heading">
        <span>Experiencia</span>
        <h2>Base tecnica sostenida en trabajo real</h2>
      </div>
      <div className="detail-columns">
        {experience.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
