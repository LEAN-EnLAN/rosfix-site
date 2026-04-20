import { technicianProfile } from "../../app-data";

export function InstagramFramesSection() {
  return (
    <div className="instagram-frames">
      <div className="instagram-frames__bg" />
      <div className="instagram-frames__stack">
        <div className="phone-mockup">
          <div className="phone-mockup__notch" />
          <div className="phone-mockup__screen">
            <article className="instagram-frame">
              <div className="instagram-frame__header">
                <div className="instagram-frame__avatar">
                  <img src={technicianProfile.avatar} alt={`Avatar de ${technicianProfile.name} en rosfix`} />
                </div>
                <div className="instagram-frame__user">
                  <strong>{technicianProfile.handle}</strong>
                  <span>Rosario, Argentina</span>
                </div>
                <div className="instagram-frame__more">•••</div>
              </div>
              <div className="instagram-frame__image">
                <img src={technicianProfile.portrait} alt={`${technicianProfile.name}, tecnico de rosfix`} />
              </div>
              <div className="instagram-frame__actions">
                <div className="instagram-frame__action-icons">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </div>
              <div className="instagram-frame__likes">
                <strong>74 Me gusta</strong>
              </div>
              <div className="instagram-frame__caption">
                <strong>{technicianProfile.handle}</strong> {technicianProfile.name} revisa tu equipo y te responde directo.
              </div>
              <div className="instagram-frame__comments-link">Ver los 3 comentarios</div>
              <div className="instagram-frame__timestamp">HACE 2 DÍAS</div>
            </article>
          </div>
        </div>
        <div className="phone-mockup phone-mockup--secondary">
          <div className="phone-mockup__notch" />
          <div className="phone-mockup__screen">
            <article className="instagram-frame">
              <div className="instagram-frame__header">
                <div className="instagram-frame__avatar">
                  <img src={technicianProfile.avatar} alt={`Avatar de ${technicianProfile.name} en rosfix`} />
                </div>
                <div className="instagram-frame__user">
                  <strong>{technicianProfile.handle}</strong>
                  <span>Rosario, Argentina</span>
                </div>
                <div className="instagram-frame__more">•••</div>
              </div>
              <div className="instagram-frame__image">
                <img src={technicianProfile.workday} alt={`${technicianProfile.name} durante una jornada tecnica en rosfix`} />
              </div>
              <div className="instagram-frame__actions">
                <div className="instagram-frame__action-icons">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </div>
              <div className="instagram-frame__likes">
                <strong>52 Me gusta</strong>
              </div>
              <div className="instagram-frame__caption">
                <strong>{technicianProfile.handle}</strong> Trabajo real, criterio y seguimiento.
              </div>
              <div className="instagram-frame__comments-link">Ver los 2 comentarios</div>
              <div className="instagram-frame__timestamp">HACE 5 DÍAS</div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
