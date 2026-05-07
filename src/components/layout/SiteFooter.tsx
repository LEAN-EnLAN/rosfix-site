import { Mail, MapPin, MessageCircle } from "lucide-react";

import { MAIL, WA_NUMBER, pages, sharedCtaCopy } from "../../app-data";
import { WhatsAppLink } from "../WhatsAppLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>rosfix</strong>
          <p>Diagnostico claro y trato directo.</p>
          <p>Servicio tecnico en Rosario.</p>
          <WhatsAppLink className="action-link footer-contact__cta" message={sharedCtaCopy.requestDiagnosisMessage}>
            <MessageCircle size={16} />
            {sharedCtaCopy.requestDiagnosisLabel}
          </WhatsAppLink>
        </div>
        <div>
          <span>Paginas</span>
          <div className="footer-links">
            {pages.map((page) => (
              <a key={page.key} href={page.path}>
                {page.title}
              </a>
            ))}
          </div>
        </div>
        <div>
          <span>Contacto</span>
          <div className="footer-contact">
            <a href={`https://wa.me/${WA_NUMBER}`} className="footer-contact__item" target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              <span>+54 9 341 2008643</span>
            </a>
            <a href={`mailto:${MAIL}`} className="footer-contact__item">
              <Mail size={16} />
              <span>{MAIL}</span>
            </a>
            <div className="footer-contact__item">
              <MapPin size={16} />
              <span>Rosario, Santa Fe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
