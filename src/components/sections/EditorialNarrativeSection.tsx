import { ChevronRight } from "lucide-react";

import type { EditorialItem } from "../../app-data";
import { SectionShell } from "../layout/SectionShell";

type EditorialNarrativeSectionProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  items: EditorialItem[];
};

export function EditorialNarrativeSection({
  eyebrow,
  title,
  intro,
  items,
}: EditorialNarrativeSectionProps) {
  return (
    <SectionShell className="editorial-narrative">
      <div className="section-heading editorial-narrative__heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="editorial-narrative__grid">
        {items.map(({ eyebrow: itemEyebrow, title: itemTitle, text, points }) => (
          <article key={itemTitle}>
            {itemEyebrow ? <span>{itemEyebrow}</span> : null}
            <h3>{itemTitle}</h3>
            <p>{text}</p>
            {points?.length ? (
              <ul>
                {points.map((point) => (
                  <li key={point}>
                    <ChevronRight size={14} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
