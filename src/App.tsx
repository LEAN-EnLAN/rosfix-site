import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  HardDrive,
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

const WA_NUMBER = "5493412008643";
const MAIL = "leanplbo@gmail.com";

const pages: PageConfig[] = [
  { key: "home", title: "Inicio", intro: "Servicio tecnico independiente en Rosario.", path: "./" },
  { key: "services", title: "Servicios", intro: "Celulares, notebooks y PC con criterio tecnico.", path: "servicios.html" },
  { key: "process", title: "Proceso", intro: "Diagnostico, revision y decision con criterio.", path: "proceso.html" },
  { key: "about", title: "Tecnico", intro: "La forma de trabajo detras de rosFIX.", path: "sobre-rosfix.html" },
  { key: "contact", title: "Contacto", intro: "WhatsApp directo y formulario corto.", path: "contacto.html" },
];

const services: ServiceItem[] = [
  {
    title: "PC y notebooks",
    icon: HardDrive,
    text: "Diagnostico de fallas, mantenimiento, optimizacion y reparacion de equipos de escritorio y portatiles. La prioridad es entender la causa real antes de intervenir.",
    points: [
      "Rendimiento, temperatura y mantenimiento",
      "Discos, memoria, sistema y hardware comun",
      "Revision responsable antes de cambiar piezas",
    ],
    image: "assets/workbench-grid.svg",
  },
  {
    title: "Celulares",
    icon: MonitorSmartphone,
    text: "Reparacion de dispositivos moviles, diagnostico de fallas comunes, reemplazo de partes y resolucion de problemas frecuentes en equipos Apple y Android.",
    points: [
      "Diagnostico de fallas comunes",
      "Reemplazo de partes y criterio tecnico",
      "Trabajo claro orientado a resultados concretos",
    ],
    image: "assets/hero-devices.svg",
  },
  {
    title: "Diagnostico tecnico",
    icon: Wrench,
    text: "Evaluacion precisa para detectar fallas de hardware, conectividad o sistema. La prioridad no es vender una reparacion: es decir con honestidad que pasa y que conviene hacer.",
    points: [
      "Diagnostico honesto antes de intervenir",
      "Comunicacion clara sobre opciones reales",
      "Criterio tecnico por encima del automatismo",
    ],
    image: "assets/bench-signal.svg",
  },
];

const featuredLines = [
  "Atencion directa. Sin intermediarios.",
  "Diagnostico real antes de presupuestar.",
  "Servicio tecnico local en Rosario.",
  "Explicacion clara de principio a fin.",
];

const processSteps = [
  ["01", "Escribis", "Contas que equipo es, que sintomas tiene y desde cuando pasa."],
  ["02", "Se revisa", "Se ordena el problema y se descartan supuestos antes de tocar piezas."],
  ["03", "Se explica", "Se comunica con claridad que pasa, que opciones hay y que conviene hacer."],
  ["04", "Se resuelve", "Se repara, se ajusta o se frena si el arreglo no tiene sentido."],
] as const;

const trustRows = [
  ["Hablas con quien revisa", "La consulta, el diagnostico y la entrega pasan por la misma persona."],
  ["Primero se confirma la falla", "No se cambia una pieza porque si. Primero se revisa y despues se decide."],
  ["Si no conviene reparar, se dice", "La recomendacion tiene que cuidar tu plata, no empujarte a cerrar igual."],
] as const;

const faq = [
  ["Trabajas solo con celulares?", "No. rosFIX trabaja con celulares, notebooks y PC de escritorio."],
  ["Pasas presupuesto antes de revisar?", "Se puede orientar por mensaje, pero el presupuesto real sale despues de revisar el equipo."],
  ["Atendes personalmente?", "Si. Uno de los diferenciales principales es justamente la atencion directa y la comunicacion clara durante todo el proceso."],
  ["Trabajas en Rosario y alrededores?", "Si. El servicio esta orientado a Rosario, Santa Fe y zona cercana."],
] as const;

const experience = [
  ["Rosario Tecno", "Experiencia en diagnostico y reparacion de celulares, especialmente en dispositivos Apple e iOS, con trabajo tecnico orientado a calidad, tiempos y buena comunicacion."],
  ["Trabajo independiente", "Actividad como tecnico informatico independiente desde 2023, brindando soporte integral, diagnostico de hardware y gestion autonoma de clientes, repuestos y control de calidad."],
  ["Soporte e infraestructura educativa", "Participacion en despliegue tecnico, mantenimiento y resolucion de incidencias de hardware y conectividad en entornos educativos junto al equipo docente del Colegio San Jose / Casa Salesiana."],
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

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-6">
        <a href="./" className="brand-mark" aria-label="rosFIX inicio">
          <img src="assets/brand-mark.svg" alt="" width="34" height="34" />
          <span>
            <strong>rosFIX</strong>
            <small>servicio tecnico en Rosario</small>
          </span>
        </a>

        <nav className="nav-desktop">
          {pages.map((page) => (
            <a key={page.key} href={page.path} className={page.key === currentPage ? "is-active" : undefined}>
              {page.title}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <WhatsAppLink className="action-link">
            <MessageCircle size={16} />
            Solicitar diagnostico
          </WhatsAppLink>
        </div>

        <button className="menu-button md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="shell mobile-nav md:hidden">
          {pages.map((page) => (
            <a key={page.key} href={page.path} className={page.key === currentPage ? "is-active" : undefined}>
              {page.title}
            </a>
          ))}
          <WhatsAppLink className="action-link">
            <MessageCircle size={16} />
            Hablar por WhatsApp
          </WhatsAppLink>
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
}: {
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
  actions?: ReactNode;
  aside: ReactNode;
}) {
  return (
    <section className="hero-block shell">
      <div className="hero-copy">
        <div className="eyebrow-line">
          <span>{eyebrow}</span>
          <span className="eyebrow-dot" />
          <span>Rosario, Santa Fe</span>
        </div>
        <h1>{title}</h1>
        <p>{body}</p>
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
    <section className="section shell">
      <div className="section-heading">
        <span>Servicios</span>
        <h2>Hardware, celulares y diagnostico con criterio real</h2>
        <p>No se trata de listar cien arreglos. Se trata de mostrar que cada problema se revisa con orden y se explica sin humo.</p>
      </div>
      <div className="service-grid service-grid-wide">
        {services.map(({ title, text, points, icon: Icon, image }) => (
          <article key={title} className="service-panel">
            <div className="service-panel__head">
              <Icon size={18} />
              <strong>{title}</strong>
            </div>
            <p>{text}</p>
            <img src={image} alt="" className="service-panel__image" />
            <ul>
              {points.map((item) => (
                <li key={item}>
                  <ChevronRight size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
    <section className="section section-editorial shell">
      <div className="section-heading">
        <span>Confianza</span>
        <h2>La diferencia esta en como se toma la decision tecnica</h2>
      </div>
      <div className="detail-columns">
        {trustRows.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>FAQ</span>
        <h2>Preguntas que suelen aparecer antes de traer un equipo</h2>
      </div>
      <div className="faq-grid">
        {faq.map(([question, answer]) => (
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
          <input required name="nombre" type="text" placeholder="Ej: Martin" />
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
        <span>Que le pasa?</span>
        <textarea required name="problema" rows={5} placeholder="Contame sintomas, si se golpeo o mojo, y si alguien ya lo reviso." />
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
        Contactar rosFIX
      </button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>rosFIX</strong>
          <p>Diagnostico tecnico especializado.</p>
          <p>Servicio tecnico local en Rosario con criterio, seguimiento directo y explicacion clara.</p>
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
          <p>WhatsApp: +54 9 341 2008643</p>
          <p>{MAIL}</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="rosFIX"
        title="Diagnostico real, atencion directa y trabajo tecnico con criterio."
        body="rosFIX es un servicio tecnico independiente para celulares, notebooks y PC en Rosario, pensado para quienes prefieren entender bien que pasa antes de gastar."
        note="No se vende humo con presupuestos instantaneos. Primero se revisa, se explica y despues se decide."
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
            <img src="assets/hero-workbench.svg" alt="Banco de trabajo tecnico de rosFIX" />
            <div className="display-note">
              <span>Enfoque</span>
              <strong>Revision, descarte y criterio antes de tocar piezas</strong>
            </div>
          </div>
        }
      />

      <FeatureRibbon />
      <ServicesSection />
      <TrustSection />

      <section className="section section-contrast shell split-callout">
        <div>
          <span>Manifiesto</span>
          <h2>Hay servicios que trabajan por volumen. rosFIX prefiere trabajar con criterio.</h2>
        </div>
        <div>
          <p>
            Muchas veces el problema no es solo que algo falle, sino que nadie se tome el tiempo de
            diagnosticarlo bien, explicarlo bien y resolverlo con responsabilidad.
          </p>
          <p>
            La atencion es directa. El diagnostico es honesto. Y si algo no conviene, se dice.
          </p>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios tecnicos"
        title="Servicio tecnico con criterio y comunicacion clara."
        body="Reparacion de computadoras y celulares con una logica simple: diagnostico real, trabajo responsable y seguimiento directo."
        note="La especialidad no se comunica como show tecnico. Se comunica como decisiones correctas sobre problemas reales."
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
            <img src="assets/hero-devices.svg" alt="Visual tecnico de dispositivos y herramientas" />
            <div className="display-note">
              <span>Foco</span>
              <strong>Hardware, celulares y diagnostico responsable</strong>
            </div>
          </div>
        }
      />

      <ServicesSection />
      <FaqSection />
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Proceso"
        title="Mas criterio. Menos automatismo."
        body="Atencion directa, diagnostico honesto y una forma de trabajo pensada para explicar bien que pasa con tu equipo."
        note="No se trata de aparentar complejidad. Se trata de entender bien el problema y decidir con informacion."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Pedir revision
            </WhatsAppLink>
            <a href="sobre-rosfix.html" className="secondary-action">
              Conocer rosFIX
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/workbench-grid.svg" alt="Panel de metodo y diagnostico de rosFIX" />
            <div className="display-note">
              <span>Metodo</span>
              <strong>Se evalua, se explica y recien despues se decide</strong>
            </div>
          </div>
        }
      />

      <ProcessRail />
      <TrustSection />
      <FaqSection />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre rosFIX"
        title="Resolver con criterio y comunicar con claridad."
        body="Leandro Palombo combina experiencia en reparacion de celulares, soporte tecnico, hardware y sistemas, con una forma de trabajo orientada a explicar bien lo que hace."
        note="rosFIX toma esa base y la convierte en una manera de trabajar: diagnostico honesto, soporte real y decisiones tecnicas claras."
        actions={
          <>
            <a href="contacto.html" className="primary-action">
              <MessageCircle size={17} />
              Contactar rosFIX
            </a>
            <a href="servicios.html" className="secondary-action">
              Explorar servicios
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/bench-signal.svg" alt="Visual tecnico y humano de rosFIX" />
            <div className="display-note">
              <span>Perfil</span>
              <strong>Reparacion, soporte y criterio tecnico real</strong>
            </div>
          </div>
        }
      />

      <ExperienceSection />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Si el equipo esta fallando, arranquemos por la informacion correcta."
        body="Servicio tecnico con una logica simple: decir la verdad, explicar bien y trabajar con responsabilidad."
        note="Si queres consultar por un equipo o pedir una revision, escribime directamente."
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
      />

      <section className="section section-editorial shell contact-layout">
        <div>
          <div className="section-heading">
            <span>Contacto</span>
            <h2>Escribime directamente</h2>
          </div>
          <ContactForm />
        </div>
        <aside className="contact-aside">
          <div>
            <UserCheck size={18} />
            <strong>Atencion directa</strong>
            <p>Cada caso se trata sin intermediarios y con comunicacion clara durante todo el proceso.</p>
          </div>
          <div>
            <ShieldCheck size={18} />
            <strong>Diagnostico honesto</strong>
            <p>La prioridad es entender bien el problema y decirte con claridad que conviene hacer.</p>
          </div>
          <div>
            <MapPin size={18} />
            <strong>Base local</strong>
            <p>Rosario, Santa Fe. Servicio tecnico local con criterio real y seguimiento directo.</p>
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
        {page === "home" ? null : (
          <section className="page-intro shell">
            <span>{current.title}</span>
            <p>{current.intro}</p>
          </section>
        )}
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
