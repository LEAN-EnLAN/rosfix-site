import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type ContentArchiveProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
};

export function ContentArchive({ eyebrow, title, summary, children }: ContentArchiveProps) {
  return (
    <details className="content-archive">
      <summary>
        <div className="shell content-archive__summary-inner">
          <div className="content-archive__lead">
            <span>{eyebrow}</span>
            <strong>{title}</strong>
          </div>
          <div className="content-archive__meta">
            <p>{summary}</p>
            <span className="content-archive__action">
              <span>Abrir respuestas</span>
              <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </summary>
      <div className="content-archive__body">{children}</div>
    </details>
  );
}
