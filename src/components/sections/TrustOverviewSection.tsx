import { ArrowRight } from "lucide-react";

import { sharedCtaCopy, trustRows } from "../../app-data";
import { WhatsAppLink } from "../WhatsAppLink";
import { SectionShell } from "../layout/SectionShell";

export function TrustOverviewSection() {
  return (
    <SectionShell className="trust-overview">
      <div className="trust-overview__intro">
        <div className="section-heading section-heading--compact">
          <span>Confianza</span>
          <h2>Como trabaja rosfix.</h2>
        </div>
        <WhatsAppLink className="secondary-action trust-overview__link" message={sharedCtaCopy.whatsappMessage}>
          {sharedCtaCopy.whatsappLabel}
          <ArrowRight size={16} />
        </WhatsAppLink>
      </div>
      <div className="trust-overview__grid">
        {trustRows.map(([title, text], index) => (
          <article key={title} className="trust-overview-card">
            <span className="trust-overview-card__index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
