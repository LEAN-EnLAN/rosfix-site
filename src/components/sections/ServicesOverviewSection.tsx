import { ArrowRight, ChevronRight } from "lucide-react";

import { services } from "../../app-data";
import { SectionShell } from "../layout/SectionShell";

export function ServicesOverviewSection() {
  return (
    <SectionShell className="services-overview">
      <div className="services-overview__intro">
        <div className="section-heading section-heading--compact">
          <span>Servicios</span>
          <h2>Lo que rosfix toma hoy.</h2>
          <p>Celulares, notebooks, PC y diagnostico con criterio.</p>
        </div>
        <a href="servicios.html" className="secondary-action services-overview__link">
          Ver servicios completos
          <ArrowRight size={16} />
        </a>
      </div>
      <div className="services-overview__grid">
        {services.map(({ title, text, points, icon: Icon }) => (
          <article key={title} className="service-overview-card">
            <div className="service-overview-card__body">
              <div className="service-overview-card__head">
                <span className="service-overview-card__icon">
                  <Icon size={16} />
                </span>
                <strong>{title}</strong>
              </div>
              <p>{text}</p>
              <ul className="service-overview-card__points">
                {points.map((item) => (
                  <li key={item}>
                    <ChevronRight size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
