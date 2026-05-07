import type { ReactNode } from "react";

import type { HeroFact } from "../../app-data";
import { cn } from "../../utils/cn";

type HeroFrameProps = {
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
  actions?: ReactNode;
  aside: ReactNode;
  facts?: HeroFact[];
  variant?: "home" | "inner";
  tone?: "home" | "services" | "process" | "about" | "contact";
  reverse?: boolean;
};

export function HeroFrame({
  eyebrow,
  title,
  body,
  note,
  actions,
  aside,
  facts,
  variant = "home",
  tone = "home",
  reverse = false,
}: HeroFrameProps) {
  return (
    <section
      className={cn(
        "hero-block shell",
        `hero-block--${variant}`,
        `hero-block--${tone}`,
        reverse && "hero-block--reverse",
      )}
    >
      <div className="hero-copy">
        <div className="eyebrow-line">
          <span>{eyebrow}</span>
          <span className="eyebrow-dot" />
          <span>Rosario, Santa Fe</span>
        </div>
        <h1>{title}</h1>
        <p>{body}</p>
        {facts?.length ? (
          <dl className="hero-facts" aria-label="Datos clave">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {note ? <div className="hero-note">{note}</div> : null}
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
      <div className="hero-aside">{aside}</div>
    </section>
  );
}
