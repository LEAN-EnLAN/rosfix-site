import { ContactHeroCard } from "./ContactHeroCard";
import { InstagramFramesSection } from "./InstagramFramesSection";
import { PageHeroVisual } from "./PageHeroVisual";

export function HomeHeroAside() {
  return (
    <PageHeroVisual
      image="assets/hero-workbench.png"
      alt="Mesa de trabajo tecnica de rosfix con herramientas y equipos en revision"
      eyebrow="Mesa de trabajo"
      title="Revision, descarte y criterio antes de tocar piezas."
      lines={[
        ["Lugar", "Banco real de trabajo"],
        ["Lectura", "Sintoma antes que suposicion"],
        ["Salida", "Decision util para el cliente"],
      ]}
      className="hero-visual--home"
    />
  );
}

export function ServicesHeroAside() {
  return (
    <PageHeroVisual
      image="assets/hero-services.png"
      alt="Recepcion de equipos y herramientas de diagnostico en un entorno tecnico sobrio"
      eyebrow="Servicios"
      title="Celulares, notebooks y PC con diagnostico antes de gastar."
      lines={[
        ["Alcance", "Celulares, notebooks y PC"],
        ["Metodo", "Diagnostico antes de intervenir"],
        ["Canal", "WhatsApp directo"],
      ]}
      className="hero-visual--services"
    />
  );
}

export function ProcessHeroAside() {
  return (
    <PageHeroVisual
      image="assets/hero-process.png"
      alt="Escena de proceso con equipo abierto y lectura tecnica"
      eyebrow="Proceso"
      title="Asi se ordena un caso en rosfix."
      lines={[
        ["Recepcion", "Equipo, modelo y sintoma"],
        ["Diagnostico", "Hasta 48 hs"],
        ["Decision", "Se explica antes de avanzar"],
      ]}
      className="hero-visual--process"
    />
  );
}

export function AboutHeroAside() {
  return <InstagramFramesSection />;
}

export function ContactHeroAside() {
  return <ContactHeroCard />;
}
