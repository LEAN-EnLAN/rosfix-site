import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  HardDrive,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
  UserCheck,
  Wrench,
  X,
} from "lucide-react";

type PageKey = "home" | "services" | "process" | "about" | "contact";

type PageConfig = {
  key: PageKey;
  title: string;
  intro: string;
  path: string;
};

type ServiceItem = {
  title: string;
  icon: typeof MonitorSmartphone;
  text: string;
  points: string[];
  image: string;
};

type CourseOffer = {
  eyebrow: string;
  title: string;
  description: string;
  audience: string;
  format: string;
  status: string;
  points: string[];
  message: string;
};

type HeroFact = readonly [string, string];

type EditorialItem = {
  eyebrow?: string;
  title: string;
  text: string;
  points?: string[];
};

type CarouselSlide = {
  eyebrow: string;
  label: string;
  statement: string;
  image: string;
};

const WA_NUMBER = "5493412008643";
const MAIL = "leanplbo@gmail.com";

const pages: PageConfig[] = [
  { key: "home", title: "Inicio", intro: "Servicio tecnico independiente en Rosario.", path: "./" },
  { key: "services", title: "Servicios", intro: "Celulares, notebooks y PC.", path: "servicios.html" },
  { key: "process", title: "Proceso", intro: "Diagnostico y decision claros.", path: "proceso.html" },
  { key: "about", title: "Tecnico", intro: "Criterio tecnico, sin humo.", path: "sobre-rosfix.html" },
  { key: "contact", title: "Contacto", intro: "WhatsApp directo.", path: "contacto.html" },
];

const services: ServiceItem[] = [
  {
    title: "PC y notebooks",
    icon: HardDrive,
    text: "Mantenimiento, rendimiento y mejoras puntuales para equipos de uso real.",
    points: ["Temperatura, limpieza y rendimiento", "Disco, memoria y sistema"],
    image: "assets/workbench-grid.png",
  },
  {
    title: "Celulares",
    icon: MonitorSmartphone,
    text: "Fallas comunes, reemplazo de partes y puesta a punto para uso diario.",
    points: ["Pantalla, bateria y carga", "Cuentas, traspasos y configuracion"],
    image: "assets/hero-devices.png",
  },
  {
    title: "Diagnostico tecnico",
    icon: Wrench,
    text: "Revision para saber si conviene seguir, frenar o derivar.",
    points: ["Diagnostico antes de intervenir", "Opciones claras y decision util"],
    image: "assets/bench-signal.png",
  },
];

const featuredLines = [
  "Atencion directa. Sin intermediarios.",
  "Diagnostico real antes de presupuestar.",
  "Servicio tecnico local en Rosario.",
  "Explicacion clara de principio a fin.",
];

const editorialCarouselSlides: CarouselSlide[] = [
  {
    eyebrow: "Diagnostico cercano",
    label: "Celulares",
    statement: "Hablar directo con quien revisa tu equipo mejora el diagnostico desde el primer mensaje.",
    image: "assets/hero-devices.png",
  },
  {
    eyebrow: "Rendimiento real",
    label: "PC y notebooks",
    statement: "Temperatura, disco y memoria se leen antes de gastar en hardware que tal vez no hace falta cambiar.",
    image: "assets/workbench-grid.png",
  },
  {
    eyebrow: "Decision clara",
    label: "Diagnostico tecnico",
    statement: "No todo caso necesita arreglo: a veces conviene frenar, explicar bien o derivar a tiempo.",
    image: "assets/bench-signal.png",
  },
];

const processSteps = [
  ["01", "Escribis", "Contas que equipo es, que sintomas tiene y desde cuando pasa."],
  ["02", "Se revisa", "Se ordena el problema y se descartan supuestos antes de tocar piezas."],
  ["03", "Se explica", "Se comunica con claridad que pasa, que opciones hay y que conviene hacer."],
  ["04", "Se resuelve", "Se repara, se ajusta o se frena si el arreglo no tiene sentido."],
] as const;

const trustRows = [
  ["Hablas con quien revisa", "Sin intermediarios entre consulta, diagnostico y entrega."],
  ["Primero se confirma la falla", "La revision viene antes que cambiar piezas."],
  ["Si no conviene reparar, se dice", "La recomendacion tambien tiene que cuidar tu plata."],
] as const;

const faq = [
  ["Conviene llevarlo aunque falle solo a veces?", "Si. Cuando una falla aparece de manera intermitente, el contexto ayuda mucho: cuando pasa, si calienta, si se descarga rapido o si aparece despues de un golpe, humedad o actualizacion."],
  ["Hace falta llevar cargador, funda o accesorios?", "Solo si el problema tiene relacion con carga, bateria, audio, perifericos o compatibilidad. Si no, normalmente alcanza con el equipo y una descripcion clara."],
  ["Tengo informacion importante adentro. Lo aviso antes?", "Si, siempre conviene avisar si hay datos sensibles, cuentas activas o contenido que no queres perder de vista. Eso ordena mejor la revision desde el principio."],
  ["Si ya lo vio otro tecnico, igual sirve consultarlo?", "Si. Lo que te hayan dicho antes puede aportar pistas, pero igual conviene revisar el equipo con criterio propio y no trabajar solo sobre una conclusion ajena."],
] as const;

const processFaq = [
  ["Sirve mandar fotos o videos antes de acercarlo?", "Si. Una foto de una rotura, un video de la falla o un mensaje bien detallado puede ordenar mucho mejor el caso antes de revisar el equipo en persona."],
  ["Que pasa si la falla aparece y desaparece?", "Tambien se toma en serio. Cuando el problema es intermitente, lo mas util es registrar en que momento aparece y bajo que condiciones para no revisar a ciegas."],
  ["Se aprueba algo antes de avanzar con gastos?", "Si. La idea es ordenar primero el diagnostico y despues decidir con informacion clara si tiene sentido seguir, frenar o buscar otra salida."],
  ["Y si el equipo necesita algo que ya no conviene ponerle?", "Tambien forma parte del proceso decirlo a tiempo. A veces la mejor decision no es avanzar, sino evitar un gasto desproporcionado para el equipo que tenes."],
] as const;

const aboutFaq = [
  ["Por que rosfix no toma cualquier caso?", "Porque trabajar con criterio tambien implica marcar limites. Tomar algo que no se puede resolver bien solo agrega ruido, falsas expectativas y malas decisiones."],
  ["Decir que no a tiempo tambien es parte del servicio?", "Si. En muchos casos, una respuesta honesta antes de intervenir vale mas que forzar una reparacion que no cierra tecnica ni economicamente."],
  ["Que mira primero un tecnico serio antes de tocar un equipo?", "Sintomas reales, contexto de uso, antecedentes del problema y si alguien ya intervino antes. Sin esa base, cualquier decision tecnica arranca torcida."],
  ["Si mi caso no encaja con lo que haces, igual me lo van a decir claro?", "Si. La idea no es retener cualquier consulta, sino orientar bien cada caso aunque la mejor salida sea no seguir con rosfix."],
] as const;

const experience = [
  ["Rosario Tecno", "Experiencia en diagnostico y reparacion de celulares, especialmente en dispositivos Apple e iOS, con trabajo tecnico orientado a calidad, tiempos y buena comunicacion."],
  ["Trabajo independiente", "Actividad como tecnico informatico independiente desde 2023, brindando soporte integral, diagnostico de hardware y gestion autonoma de clientes, repuestos y control de calidad."],
  ["Soporte e infraestructura educativa", "Participacion en despliegue tecnico, mantenimiento y resolucion de incidencias de hardware y conectividad en entornos educativos junto al equipo docente del Colegio San Jose / Casa Salesiana."],
];

const servicesEditorialBlocks: EditorialItem[] = [
  {
    eyebrow: "android e iphone",
    title: "Celulares con fallas comunes y traspasos.",
    text: "Bateria, modulo, pin, configuraciones, cuentas y orden general.",
  },
  {
    eyebrow: "pc y notebook",
    title: "PC y notebooks que todavia pueden rendir mejor.",
    text: "Mantenimiento, formateo, mejoras puntuales y revision de hardware comun.",
  },
  {
    eyebrow: "uso cotidiano",
    title: "Problemas chicos que frenan todo.",
    text: "WhatsApp, cuentas, lentitud y configuraciones que hacen perder tiempo.",
  },
];

const courses: CourseOffer[] = [
  {
    eyebrow: "curso 01",
    title: "Diagnostico con criterio para fallas reales.",
    description: "Leer sintomas y revisar con mas orden.",
    audience: "Inicio tecnico / autodidacta.",
    format: "Casos reales / clases cortas.",
    status: "Proxima apertura.",
    points: [
      "Preguntas que ordenan el caso",
      "Primer chequeo util",
      "Cuando frenar o derivar",
    ],
    message: "Hola Leandro, quiero enterarme primero del curso de diagnostico con criterio.",
  },
  {
    eyebrow: "curso 02",
    title: "Mantenimiento y criterio para PC y notebooks.",
    description: "Mejoras reales y mantenimiento util.",
    audience: "Usuarios curiosos / etapa inicial.",
    format: "Chequeos guiados / equipos comunes.",
    status: "En desarrollo.",
    points: [
      "Limpieza y temperatura",
      "Memoria, disco y sistema",
      "Cuando no conviene invertir",
    ],
    message: "Hola Leandro, me interesa el curso de mantenimiento y criterio para PC y notebooks.",
  },
];

const processEditorialSteps: EditorialItem[] = [
  {
    eyebrow: "01",
    title: "Recepcion y estado inicial.",
    text: "Se ordena el caso desde informacion concreta.",
  },
  {
    eyebrow: "02",
    title: "Diagnostico con plazo claro.",
    text: "En hasta 2 dias ya deberias saber que pasa.",
  },
  {
    eyebrow: "03",
    title: "Presupuesto despues de revisar.",
    text: "Primero verdad tecnica. Despues decision.",
  },
  {
    eyebrow: "04",
    title: "Reparacion o derivacion con contexto.",
    text: "Si no sigue aca, igual salis con una base util.",
  },
];

const aboutEditorialPrinciples: EditorialItem[] = [
  {
    eyebrow: "criterio",
    title: "No tomo todo.",
    text: "Se toman casos que se puedan resolver bien.",
  },
  {
    eyebrow: "limite",
    title: "Si no conviene, se dice.",
    text: "Forzar una reparacion tambien puede ser un error.",
  },
  {
    eyebrow: "utilidad",
    title: "Aunque no lo haga yo, igual te tiene que servir.",
    text: "Un diagnostico util o una buena derivacion tambien cuentan.",
  },
];

function WhatsAppLink({
  className,
  children,
  message,
}: {
  className: string;
  children: ReactNode;
  message?: string;
}) {
  const href = message
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WA_NUMBER}`;

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

function Nav({ currentPage }: { currentPage: PageKey }) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const shouldLock = open && window.innerWidth < 768;
    const previousOverflow = document.body.style.overflow;

    if (shouldLock) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [currentPage]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="site-header__inner">
        <div className="shell site-header__row">
          <a href="./" className="brand-mark" aria-label="rosfix inicio" onClick={closeMenu}>
            <img src="assets/rosfix-mark.svg" alt="" className="brand-mark__logo" />
            <span>
              <strong>rosfix</strong>
              <small>Diagnostico claro en Rosario</small>
            </span>
          </a>

          <nav className="nav-desktop" aria-label="Principal">
            {pages.map((page) => (
              <a
                key={page.key}
                href={page.path}
                className={page.key === currentPage ? "is-active" : undefined}
              >
                {page.title}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <WhatsAppLink className="action-link site-header__cta" message="Hola Leandro, quiero consultar por un diagnostico.">
              <MessageCircle size={16} />
              Solicitar diagnostico
            </WhatsAppLink>
          </div>

          <button
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-wrap">
          <div
            id="mobile-nav-panel"
            className="shell mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <div className="mobile-nav__intro">
              <span>Servicio tecnico</span>
              <p>Diagnostico real, trato directo y seguimiento por WhatsApp.</p>
            </div>

            <nav className="mobile-nav__links" aria-label="Principal mobile">
              {pages.map((page) => (
                <a
                  key={page.key}
                  href={page.path}
                  className={page.key === currentPage ? "is-active" : undefined}
                  onClick={closeMenu}
                >
                  <strong>{page.title}</strong>
                  <span>{page.intro}</span>
                </a>
              ))}
            </nav>

            <div className="mobile-nav__footer">
              <WhatsAppLink
                className="primary-action mobile-nav__cta"
                message="Hola Leandro, quiero pedir un diagnostico para mi equipo."
              >
                <MessageCircle size={16} />
                Pedir diagnostico
              </WhatsAppLink>
              <a href="contacto.html" className="secondary-action mobile-nav__contact" onClick={closeMenu}>
                Ver contacto
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function PageHero({
  eyebrow,
  title,
  body,
  note,
  actions,
  aside,
  facts,
  variant = "home",
}: {
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
  actions?: ReactNode;
  aside: ReactNode;
  facts?: HeroFact[];
  variant?: "home" | "inner";
}) {
  return (
    <section className={`hero-block shell hero-block--${variant}`}>
      <div className="hero-copy">
        <div className="eyebrow-line">
          <span>{eyebrow}</span>
          <span className="eyebrow-dot" />
          <span>Rosario, Santa Fe</span>
        </div>
        <h1>{title}</h1>
        <p>{body}</p>
        {facts?.length ? (
          <dl className="hero-facts" aria-label="Datos clave">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {note ? <div className="hero-note">{note}</div> : null}
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
      <div className="hero-aside">{aside}</div>
    </section>
  );
}

function FeatureRibbon() {
  return (
    <section className="shell proof-ribbon">
      {featuredLines.map((item) => (
        <div key={item}>
          <Check size={14} />
          <span>{item}</span>
        </div>
      ))}
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section shell services-overview">
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
    </section>
  );
}

function EditorialCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((value) => (value + 1) % editorialCarouselSlides.length);
    }, 5600);

    return () => window.clearInterval(intervalId);
  }, []);

  const goTo = (index: number) => setCurrentIndex(index);
  const goPrev = () => setCurrentIndex((value) => (value - 1 + editorialCarouselSlides.length) % editorialCarouselSlides.length);
  const goNext = () => setCurrentIndex((value) => (value + 1) % editorialCarouselSlides.length);

  return (
    <section className="editorial-carousel" aria-label="Casos frecuentes en rosfix">
      <div className="editorial-carousel__viewport">
        <div
          className="editorial-carousel__track"
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {editorialCarouselSlides.map((slide) => (
            <article key={slide.eyebrow} className="editorial-carousel__slide">
              <div className="editorial-carousel__frame">
                <div className="editorial-carousel__grid" aria-hidden="true" />
                <div className="editorial-carousel__media" aria-hidden="true">
                  <img src={slide.image} alt="" />
                </div>
                <div className="editorial-carousel__copy">
                  <span>{slide.label}</span>
                  <strong>{slide.eyebrow}</strong>
                  <p>{slide.statement}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell editorial-carousel__controls">
        <div className="editorial-carousel__rail">
          {editorialCarouselSlides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              className={`editorial-carousel__index${index === currentIndex ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Ir a ${slide.eyebrow}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{slide.eyebrow}</strong>
            </button>
          ))}
        </div>

        <div className="editorial-carousel__actions">
          <button type="button" className="editorial-carousel__button" onClick={goPrev} aria-label="Slide anterior">
            <ChevronLeft size={16} />
          </button>
          <div className="editorial-carousel__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(currentIndex + 1) / editorialCarouselSlides.length})` }} />
          </div>
          <button type="button" className="editorial-carousel__button" onClick={goNext} aria-label="Slide siguiente">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="section shell courses-section">
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
        {courses.map(({ eyebrow, title, description, audience, format, status, points, message }) => (
          <article key={title} className="course-panel">
            <div className="course-panel__topline">
              <span>{eyebrow}</span>
              <b>{status}</b>
            </div>
            <div className="course-panel__main">
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
            <dl className="course-panel__facts" aria-label="Datos del curso">
              <div>
                <dt>Perfil</dt>
                <dd>{audience}</dd>
              </div>
              <div>
                <dt>Formato</dt>
                <dd>{format}</dd>
              </div>
            </dl>
            <ul className="course-panel__chips" aria-label="Temas principales">
              {points.slice(0, 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <WhatsAppLink className="action-link course-panel__action" message={message}>
              <MessageCircle size={16} />
              Pedir aviso primero
            </WhatsAppLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessRail() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Proceso</span>
        <h2>Se revisa, se explica y despues se decide</h2>
      </div>
      <div className="process-rail">
        {processSteps.map(([number, title, description]) => (
          <article key={number}>
            <small>{number}</small>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section shell trust-overview">
      <div className="trust-overview__intro">
        <div className="section-heading section-heading--compact">
          <span>Confianza</span>
          <h2>Como trabaja rosfix.</h2>
          <p>Menos vueltas, mejor lectura del caso y una decision clara.</p>
        </div>
        <WhatsAppLink className="secondary-action trust-overview__link" message="Hola Leandro, quiero consultar mi equipo por WhatsApp.">
          Hablar por WhatsApp
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
    </section>
  );
}

function FaqSection({
  eyebrow = "FAQ",
  title = "Preguntas que suelen aparecer antes de traer un equipo",
  items = faq,
}: {
  eyebrow?: string;
  title?: string;
  items?: readonly (readonly [string, string])[];
}) {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="faq-grid">
        {items.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section section-editorial shell">
      <div className="section-heading">
        <span>Experiencia</span>
        <h2>Base tecnica sostenida en trabajo real</h2>
      </div>
      <div className="detail-columns">
        {experience.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContentArchive({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
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

function ImageStatementSection({
  ariaLabel,
  eyebrow,
  title,
  image,
  align = "right",
}: {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  image: string;
  align?: "left" | "right";
}) {
  return (
    <section className={`breathing-section breathing-section--${align}`} aria-label={ariaLabel}>
      <div className="breathing-section__media" aria-hidden="true">
        <img src={image} alt="" />
      </div>
      <div className="breathing-section__copy shell">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>
    </section>
  );
}

function EditorialNarrativeSection({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: EditorialItem[];
}) {
  return (
    <section className="section shell editorial-narrative">
      <div className="section-heading editorial-narrative__heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="editorial-narrative__grid">
        {items.map(({ eyebrow: itemEyebrow, title: itemTitle, text, points }) => (
          <article key={itemTitle}>
            {itemEyebrow ? <span>{itemEyebrow}</span> : null}
            <h3>{itemTitle}</h3>
            <p>{text}</p>
            {points?.length ? (
              <ul>
                {points.map((point) => (
                  <li key={point}>
                    <ChevronRight size={14} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>rosfix</strong>
          <p>Diagnostico claro y trato directo.</p>
          <p>Servicio tecnico en Rosario.</p>
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

function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="rosfix"
        title="Diagnostico real para celulares, notebooks y PC."
        body="Servicio tecnico independiente en Rosario."
        note="Atencion directa y criterio real."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Solicitar diagnostico
            </WhatsAppLink>
            <a href="servicios.html" className="secondary-action">
              Ver servicios
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/hero-workbench.png" alt="Banco de trabajo tecnico de rosfix" />
            <div className="display-note">
              <span>Enfoque</span>
              <strong>Revision, descarte y criterio antes de tocar piezas</strong>
            </div>
          </div>
        }
      />

      <FeatureRibbon />
      <EditorialCarouselSection />
      <ServicesSection />
      <CoursesSection />
      <TrustSection />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Celulares, notebooks y PC con criterio."
        body="Fallas comunes y decisiones utiles sobre equipos de uso real."
        facts={[
          ["Equipos", "Celulares, notebooks y PC"],
          ["Enfoque", "Fallas comunes y decisiones utiles"],
          ["Trato", "Directo por WhatsApp"],
        ]}
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
        aside={
          <div className="display-panel">
            <img src="assets/hero-devices.png" alt="Visual tecnico de dispositivos y herramientas" />
            <div className="display-note">
              <span>Foco</span>
              <strong>Hardware comun, celulares y diagnostico responsable</strong>
            </div>
          </div>
        }
        variant="inner"
      />

      <EditorialNarrativeSection
        eyebrow="Servicios"
        title="Problemas cotidianos, resueltos con orden."
        intro="Celulares, notebooks y PC con foco en uso real."
        items={servicesEditorialBlocks}
      />

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
      <PageHero
        eyebrow="Proceso"
        title="Diagnostico claro desde el primer mensaje."
        body="Cada caso entra con contexto y sale con una decision clara."
        facts={[
          ["Diagnostico", "Hasta 48 hs"],
          ["Presupuesto", "Despues de revisar"],
          ["Seguimiento", "Directo y claro"],
        ]}
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
        aside={
          <div className="display-panel">
            <img src="assets/workbench-grid.png" alt="Panel de metodo y diagnostico de rosfix" />
            <div className="display-note">
              <span>Metodo</span>
              <strong>Se evalua, se explica y despues se decide</strong>
            </div>
          </div>
        }
        variant="inner"
      />

      <ImageStatementSection
        ariaLabel="Criterio tecnico en cada decision de rosfix"
        eyebrow="Criterio"
        title="El criterio ordena el diagnostico desde el primer mensaje, no al final del arreglo."
        image="assets/editorial-criterio.png"
        align="left"
      />

      <EditorialNarrativeSection
        eyebrow="Proceso"
        title="Tu equipo no entra en un limbo tecnico."
        intro="Recepcion, diagnostico, decision y salida clara."
        items={processEditorialSteps}
      />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes sobre revision y tiempos"
        summary="Seguimiento, aprobaciones y tiempos reales durante cada etapa."
      >
        <FaqSection
          eyebrow="Consultas"
          title="Respuestas utiles sobre diagnostico, seguimiento y aprobacion"
          items={processFaq}
        />
      </ContentArchive>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Tecnico"
        title="Tecnico independiente, criterio claro."
        body="Trabajo con fallas comunes y una regla simple: no prometer de mas."
        facts={[
          ["Base", "Rosario, Santa Fe"],
          ["Alcance", "Celulares, notebooks y PC"],
          ["Limite", "Sin prometer de mas"],
        ]}
        actions={
          <>
            <a href="contacto.html" className="primary-action">
              <MessageCircle size={17} />
              Contactar rosfix
            </a>
            <a href="servicios.html" className="secondary-action">
              Explorar servicios
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/tecnico-leandro.png" alt="Visual tecnico y humano de rosfix" />
            <div className="display-note">
              <span>Perfil</span>
              <strong>Reparacion, soporte y criterio tecnico real</strong>
            </div>
          </div>
        }
        variant="inner"
      />

      <EditorialNarrativeSection
        eyebrow="Tecnico"
        title="Criterio tecnico, honestidad y limites claros."
        intro="Se toma lo que se puede resolver bien."
        items={aboutEditorialPrinciples}
      />

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
      <PageHero
        eyebrow="Contacto"
        title="Contame el equipo y el sintoma."
        body="Con eso ya se puede ordenar el caso."
        facts={[
          ["Canal", "WhatsApp directo"],
          ["Ciudad", "Rosario, Santa Fe"],
          ["Trato", "Sin intermediarios"],
        ]}
        actions={
          <WhatsAppLink className="primary-action">
            <MessageCircle size={17} />
            Hablar por WhatsApp
          </WhatsAppLink>
        }
        aside={
          <div className="contact-side">
            <div>
              <span>Ciudad</span>
              <strong>Rosario, Santa Fe</strong>
            </div>
            <div>
              <span>Telefono</span>
              <strong>+54 9 341 2008643</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{MAIL}</strong>
            </div>
          </div>
        }
        variant="inner"
      />

      <section className="section section-editorial shell contact-layout">
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
      </section>
    </>
  );
}

export default function App({ page }: { page: PageKey }) {
  const current = useMemo(() => pages.find((item) => item.key === page) ?? pages[0], [page]);

  return (
    <div className="site-frame">
      <Nav currentPage={current.key} />
      <main>
        {page === "home" && <HomePage />}
        {page === "services" && <ServicesPage />}
        {page === "process" && <ProcessPage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}
