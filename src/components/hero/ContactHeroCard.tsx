import { MAIL } from "../../app-data";

export function ContactHeroCard() {
  return (
    <div className="contact-hero-card">
      <div className="contact-hero-card__lead">
        <span>Canal principal</span>
        <strong>WhatsApp directo para leer bien el caso.</strong>
      </div>
      <dl className="contact-hero-card__lines" aria-label="Datos de contacto de rosfix">
        <div>
          <dt>WhatsApp</dt>
          <dd>+54 9 341 2008643</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{MAIL}</dd>
        </div>
        <div>
          <dt>Base</dt>
          <dd>Rosario, Santa Fe</dd>
        </div>
      </dl>
    </div>
  );
}
