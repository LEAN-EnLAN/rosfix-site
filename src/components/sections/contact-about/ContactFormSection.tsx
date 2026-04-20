import type { FormEvent } from "react";
import { MapPin, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";

import { WA_NUMBER } from "../../../app-data";
import { SectionShell } from "../../layout/SectionShell";

function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Hola Leandro, soy ${formData.get("nombre")}.`,
      `Equipo: ${formData.get("equipo")}.`,
      `Modelo o detalle: ${formData.get("modelo")}.`,
      `Problema: ${formData.get("problema")}.`,
      `Urgencia: ${formData.get("urgencia")}.`,
    ].join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          <span>Nombre</span>
          <input required name="nombre" type="text" placeholder="Martin" />
        </label>
        <label>
          <span>Equipo</span>
          <select required name="equipo" defaultValue="Celular">
            <option>Celular</option>
            <option>Notebook</option>
            <option>PC de escritorio</option>
            <option>Otro</option>
          </select>
        </label>
      </div>

      <label>
        <span>Modelo</span>
        <input required name="modelo" type="text" placeholder="Moto G84 / Lenovo IdeaPad / PC Ryzen" />
      </label>

      <label>
        <span>Sintoma</span>
        <textarea required name="problema" rows={5} placeholder="Que hace, que deja de hacer, si se golpeo, si se mojo o si ya lo revisaron." />
      </label>

      <fieldset>
        <legend>Urgencia</legend>
        <div className="field-options">
          <label>
            <input type="radio" name="urgencia" value="Normal" defaultChecked />
            <span>Normal</span>
          </label>
          <label>
            <input type="radio" name="urgencia" value="Alta" />
            <span>Alta</span>
          </label>
        </div>
      </fieldset>

      <button type="submit" className="primary-action">
        <MessageCircle size={17} />
        Enviar por WhatsApp
      </button>
    </form>
  );
}

export function ContactFormSection() {
  return (
    <SectionShell className="section-editorial contact-layout">
      <div className="contact-layout__main">
        <div className="contact-layout__lead">
          <span>WhatsApp directo</span>
          <h2>Manda equipo, modelo y falla.</h2>
          <p>Lo justo para empezar bien.</p>
        </div>
        <ContactForm />
      </div>
      <aside className="contact-aside" aria-label="Guia rapida para escribir">
        <div>
          <UserCheck size={18} />
          <strong>Que mandar</strong>
          <p>Equipo, modelo y que hace o deja de hacer.</p>
        </div>
        <div>
          <ShieldCheck size={18} />
          <strong>Como sigue</strong>
          <p>Se revisa, se explica y despues se decide.</p>
        </div>
        <div>
          <MapPin size={18} />
          <strong>Base</strong>
          <p>Rosario, Santa Fe.</p>
        </div>
      </aside>
    </SectionShell>
  );
}
