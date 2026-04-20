import { ArrowRight } from "lucide-react";

import { courses } from "../../app-data";
import { WhatsAppLink } from "../WhatsAppLink";
import { SectionShell } from "../layout/SectionShell";

export function CoursesSection() {
  return (
    <SectionShell className="courses-section">
      <div className="courses-section__intro">
        <div className="section-heading section-heading--compact courses-section__heading">
          <span>Cursos</span>
          <h2>Aprender con criterio.</h2>
          <p>Casos reales, chequeos utiles y cero humo tecnico.</p>
        </div>
        <WhatsAppLink className="secondary-action courses-section__link" message="Hola Leandro, quiero consultar por los cursos de rosfix.">
          Consultar cursos
          <ArrowRight size={16} />
        </WhatsAppLink>
      </div>
      <div className="courses-grid">
        {courses.map((course) => (
          <article key={course.eyebrow} className="course-card">
            <div className="course-card__header">
              <span className="course-card__eyebrow">{course.eyebrow}</span>
              <span className="course-card__status">{course.status}</span>
            </div>
            <h3 className="course-card__title">{course.title}</h3>
            <p className="course-card__desc">{course.description}</p>
            <dl className="course-card__meta">
              <div>
                <dt>Perfil</dt>
                <dd>{course.audience}</dd>
              </div>
              <div>
                <dt>Formato</dt>
                <dd>{course.format}</dd>
              </div>
            </dl>
            <div className="course-card__points">
              {course.points.map((point) => (
                <span key={point} className="course-card__tag">{point}</span>
              ))}
            </div>
            <WhatsAppLink className="course-card__cta" message={course.message}>
              Pedir aviso primero
            </WhatsAppLink>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
