import { SectionShell } from "../layout/SectionShell";

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  items: readonly (readonly [string, string])[];
};

export function FaqSection({
  eyebrow = "FAQ",
  title = "Preguntas que suelen aparecer antes de traer un equipo",
  items,
}: FaqSectionProps) {
  return (
    <SectionShell>
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="faq-grid">
        {items.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
