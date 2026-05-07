import { useMemo } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import {
  aboutEditorialPrinciples,
  aboutFaq,
  faq,
  pageCopyByKey,
  pages,
  processEditorialSteps,
  processFaq,
  servicesEditorialBlocks,
  sharedCtaCopy,
  WA_NUMBER,
  type PageKey,
} from "./app-data";
import { DiagnosticIntake } from "./components/DiagnosticIntake";
import {
  AboutHeroAside,
  ContactHeroAside,
  ProcessHeroAside,
  ServicesHeroAside,
} from "./components/hero/PageHeroAsides";
import { WhatsAppLink } from "./components/WhatsAppLink";
import { HeroFrame } from "./components/layout/HeroFrame";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { ContentDivider } from "./components/sections/ContentDivider";
import { ContentArchive } from "./components/sections/ContentArchive";
import { CoursesSection } from "./components/sections/CoursesSection";
import { EditorialCarouselSection } from "./components/sections/EditorialCarouselSection";
import { EditorialNarrativeSection } from "./components/sections/EditorialNarrativeSection";
import { FaqSection } from "./components/sections/FaqSection";
import { FeatureRibbon } from "./components/sections/FeatureRibbon";
import { ProcessRailSection } from "./components/sections/ProcessRailSection";
import { ServicesOverviewSection } from "./components/sections/ServicesOverviewSection";
import { TrustOverviewSection } from "./components/sections/TrustOverviewSection";
import { ExperienceSection } from "./components/sections/contact-about/AboutExperienceSection";

/**
 * Parallel ownership note (Phase 1 foundation):
 * - Shared/static copy now lives in `src/app-data.ts`.
 * - Layout primitives live in `src/components/layout/*` and are the only safe composition seam for later streams.
 * - Keep page composition here, but DO NOT reintroduce nav/footer/hero/shared-section primitives or shared data back into this file.
 * - Planned stream ownership: nav/header, hero, editorial/services/process, contact/about, then final integrator.
 */

function HomePage() {
  return (
    <>
      <HeroFrame
        eyebrow="rosfix"
        title="Diagnostico real para equipos de uso diario."
        body="Celulares, notebooks y PC con trato directo en Rosario."
        note="Primero se entiende el caso. Despues se decide que conviene hacer."
        actions={
          <>
            <WhatsAppLink className="primary-action" message={sharedCtaCopy.requestDiagnosisMessage}>
              <MessageCircle size={17} />
              {sharedCtaCopy.requestDiagnosisLabel}
            </WhatsAppLink>
            <a href="servicios.html" className="secondary-action">
              Ver servicios
              <ArrowRight size={16} />
            </a>
          </>
        }
        tone="home"
      />

      <FeatureRibbon />
      <ServicesOverviewSection />
      <ContentDivider />
      <ProcessRailSection />
      <EditorialCarouselSection />
      <ContentDivider />
      <TrustOverviewSection />
      <ContentDivider />
      <CoursesSection />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <HeroFrame
        eyebrow="Servicios"
        title="Que entra, que no, y como se trabaja."
        body="Celulares, notebooks y PC de uso cotidiano. Fallas comunes, mejoras puntuales y diagnostico antes de gastar."
        facts={[
          ["Toma hoy", "Celulares, notebooks y PC"],
          ["No promete", "Microsoldadura ni board-level"],
          ["Canal", "WhatsApp directo"],
        ]}
        note="Se trabaja con alcance claro, sin prometer cosas que no corresponden."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Consultar mi equipo
            </WhatsAppLink>
            <a href="proceso.html" className="secondary-action">
              Ver metodo
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={<ServicesHeroAside />}
        variant="inner"
        tone="services"
      />

      <EditorialNarrativeSection
        eyebrow="Servicios"
        title="Problemas cotidianos, resueltos con orden."
        intro="Celulares, notebooks y PC con foco en uso real."
        items={servicesEditorialBlocks}
      />

      <ContentDivider />

      <CoursesSection />

      <ContentDivider />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes antes de traer tu equipo"
        summary="Presupuesto, accesorios y contexto util antes de revisar."
      >
        <FaqSection
          eyebrow="Consultas"
          title="Respuestas utiles antes de acercar un equipo"
          items={faq}
        />
      </ContentArchive>
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <HeroFrame
        eyebrow="Proceso"
        title="Asi se ordena un caso en rosfix."
        body="Mensaje, revision, diagnostico y decision. Sin limbo tecnico ni presupuesto lanzado al aire."
        facts={[
          ["Primer paso", "Equipo, modelo y sintoma"],
          ["Diagnostico", "Hasta 48 hs"],
          ["Decision", "Se explica antes de avanzar"],
        ]}
        note="Se confirma el estado del equipo antes de hablar de repuestos, tiempos o presupuesto."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Pedir revision
            </WhatsAppLink>
            <a href="sobre-rosfix.html" className="secondary-action">
              Conocer rosfix
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={<ProcessHeroAside />}
        variant="inner"
        tone="process"
      />

      <EditorialNarrativeSection
        eyebrow="Proceso"
        title="Asi se ordena un caso en rosfix."
        intro="Mensaje, revision, diagnostico y decision."
        items={processEditorialSteps}
      />

      <ContentDivider />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes sobre el proceso"
        summary="Fotos, plazos y decisiones antes de avanzar."
      >
        <FaqSection
          eyebrow="Consultas"
          title="Respuestas utiles sobre el proceso de revision"
          items={processFaq}
        />
      </ContentArchive>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <HeroFrame
        eyebrow="Tecnico"
        title="Quien revisa tu equipo tambien te responde."
        body="Tecnico independiente en Rosario. Menos burocracia, mas contexto para leer bien cada caso."
        facts={[
          ["Base", "Rosario, Santa Fe"],
          ["Alcance", "Celulares, notebooks y PC"],
          ["Criterio", "No prometer de mas"],
        ]}
        actions={
          <>
            <a href={pageCopyByKey.contact.path} className="primary-action">
              <MessageCircle size={17} />
              Contactar rosfix
            </a>
            <a href="servicios.html" className="secondary-action">
              Explorar servicios
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={<AboutHeroAside />}
        variant="inner"
        tone="about"
      />

      <EditorialNarrativeSection
        eyebrow="Tecnico"
        title="Criterio tecnico, honestidad y limites claros."
        intro="Se toma lo que se puede resolver bien."
        items={aboutEditorialPrinciples}
      />

      <ExperienceSection />

      <ContentDivider />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes sobre criterio y forma de trabajo"
        summary="Alcance real, limites tecnicos y decisiones desde el inicio."
      >
        <FaqSection
          eyebrow="Consultas"
          title="Respuestas utiles sobre criterio, alcance y decisiones tecnicas"
          items={aboutFaq}
        />
      </ContentArchive>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <HeroFrame
        eyebrow="Contacto"
        title="Ordena el caso antes de abrir WhatsApp."
        body="Hace el intake guiado, revisa el resumen final y recien ahi se arma el handoff con contexto util."
        facts={[
          ["Canal", "Intake guiado + WhatsApp final"],
          ["Base", "Rosario, Santa Fe"],
          ["Trato", "Sin intermediarios"],
        ]}
        note="Si ya lo revisaron, si se golpeo o si se mojo, sumalo en el flujo. La idea es no saltarse la revision final."
        actions={
          <a href="#diagnostico-intake" className="primary-action">
            <MessageCircle size={17} />
            Empezar intake guiado
          </a>
        }
        aside={<ContactHeroAside />}
        variant="inner"
        tone="contact"
      />

      <section className="section">
        <div className="shell">
          <DiagnosticIntake whatsAppNumber={WA_NUMBER} />
        </div>
      </section>
    </>
  );
}

export default function App({ page }: { page: PageKey }) {
  const current = useMemo(() => pages.find((item) => item.key === page) ?? pages[0], [page]);

  return (
    <div className="site-frame">
      <SiteHeader currentPage={current.key} />
      <main>
        {current.key === "home" && <HomePage />}
        {current.key === "services" && <ServicesPage />}
        {current.key === "process" && <ProcessPage />}
        {current.key === "about" && <AboutPage />}
        {current.key === "contact" && <ContactPage />}
      </main>
      <SiteFooter />
    </div>
  );
}
