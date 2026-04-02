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

type EditorialItem = {
  eyebrow?: string;
  title: string;
  text: string;
  points?: string[];
};

const WA_NUMBER = "5493412008643";
const MAIL = "leanplbo@gmail.com";

const pages: PageConfig[] = [
  { key: "home", title: "Inicio", intro: "Servicio tecnico independiente en Rosario.", path: "./" },
  { key: "services", title: "Servicios", intro: "Celulares, notebooks y PC con criterio tecnico.", path: "servicios.html" },
  { key: "process", title: "Proceso", intro: "Diagnostico, revision y decision con criterio.", path: "proceso.html" },
  { key: "about", title: "Tecnico", intro: "La forma de trabajo detras de rosfix.", path: "sobre-rosfix.html" },
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
    image: "assets/workbench-grid.png",
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
    image: "assets/hero-devices.png",
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
    image: "assets/bench-signal.png",
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
    title: "Celulares con fallas comunes, traspasos y orden tecnico.",
    text: "Hay equipos que necesitan limpieza, bateria, modulo, pin o una buena revision antes de decidir si conviene reparar. Tambien hay valor en configurar, ordenar y dejar claro que datos y cuentas estan en juego.",
  },
  {
    eyebrow: "pc y notebook",
    title: "Equipos lentos o inestables que todavia pueden rendir mejor.",
    text: "Formateo, diagnostico, mejora funcional, armado y revision de piezas basicas para equipos de uso real. La idea no es prometer potencia infinita: es dejar claro hasta donde conviene llegar.",
  },
  {
    eyebrow: "uso cotidiano",
    title: "Problemas chicos que igual traban tu dia entero.",
    text: "WhatsApp, cuentas, traspasos, configuraciones especificas, lentitud y desorden digital tambien forman parte del servicio. Son cosas que muchos minimizan, pero son exactamente las que hacen perder tiempo todos los dias.",
  },
];

const servicesEditorialTruths: EditorialItem[] = [
  {
    title: "No todo necesita un cambio completo.",
    text: "Muchas veces alcanza con revisar, limpiar, reordenar o descartar una sospecha equivocada antes de gastar en piezas nuevas.",
  },
  {
    title: "A veces hace falta diagnostico, no gasto.",
    text: "La utilidad no siempre esta en reparar de inmediato. A veces esta en entender bien que falla y que salida tiene sentido para vos.",
  },
  {
    title: "Tambien resolvemos lo que otros patean.",
    text: "Configurar, destrabar, explicar y dejar un equipo usable tambien es servicio tecnico cuando el problema es real.",
  },
];

const processEditorialSteps: EditorialItem[] = [
  {
    eyebrow: "01",
    title: "Recepcion y estado inicial.",
    text: "Se ordena que equipo es, que sintomas tiene y en que estado entra. El problema se toma desde informacion concreta, no desde supuestos.",
  },
  {
    eyebrow: "02",
    title: "Diagnostico con plazo claro.",
    text: "En hasta 2 dias ya deberias saber que pasa, que se descarto y si conviene avanzar o frenar.",
  },
  {
    eyebrow: "03",
    title: "Presupuesto despues de revisar.",
    text: "La cifra sale una vez que el diagnostico ordena el caso. Primero verdad tecnica, despues decision.",
  },
  {
    eyebrow: "04",
    title: "Reparacion o derivacion con contexto.",
    text: "Si se sigue con rosfix, hay pasos claros. Si no, igual te llevas una base util para continuar con otro tecnico.",
  },
];

const processEditorialTruths: EditorialItem[] = [
  {
    title: "No desaparece tu equipo.",
    text: "Hay estado inicial, avance identificable y cierre claro. No quedas esperando sin saber nada.",
  },
  {
    title: "No desaparece la informacion.",
    text: "Aunque el trabajo no siga aca, el diagnostico deja contexto, descarte y una salida mas clara.",
  },
  {
    title: "Siempre vas a saber la verdad.",
    text: "Si el arreglo no conviene, si falta una pieza o si el caso pide derivacion, se dice sin vueltas.",
  },
];

const aboutEditorialPrinciples: EditorialItem[] = [
  {
    eyebrow: "criterio",
    title: "No tomo todo.",
    text: "Se toman equipos y problemas de complejidad media que se puedan resolver bien, con tiempos razonables y comunicacion clara.",
  },
  {
    eyebrow: "limite",
    title: "Si no conviene, se dice.",
    text: "Decir que no a una reparacion que no cierra tambien protege al cliente. El valor no esta en intervenir por orgullo.",
  },
  {
    eyebrow: "utilidad",
    title: "Aunque no lo haga yo, igual te tiene que servir.",
    text: "Un diagnostico util, una derivacion ordenada o una recomendacion honesta tambien forman parte del trabajo.",
  },
];

const aboutEditorialTruths: EditorialItem[] = [
  {
    title: "Limites claros como forma de cuidado.",
    text: "No prometer cualquier cosa evita hacer perder tiempo, plata y contexto.",
  },
  {
    title: "Equipos viejos o rescatables con vida util.",
    text: "Cuando todavia hay margen real, se evalua con criterio. Cuando ya no lo hay, se explica.",
  },
  {
    title: "Primero criterio, despues intervencion.",
    text: "La honestidad tecnica no se agrega al final: ordena la decision desde el principio.",
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

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-6">
        <a href="./" className="brand-mark" aria-label="rosfix inicio">
          <img src="assets/rosfix-mark.svg" alt="" className="brand-mark__logo" />
          <span>
            <strong>rosfix</strong>
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
            <div className="service-panel__content">
              <div className="service-panel__head">
                <Icon size={18} />
                <strong>{title}</strong>
              </div>
              <div className="service-panel__body">
                <p>{text}</p>
                <ul>
                  {points.map((item) => (
                    <li key={item}>
                      <ChevronRight size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="service-panel__media">
              <img src={image} alt="" className="service-panel__image" />
            </div>
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
        Contactar rosfix
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
        eyebrow="rosfix"
        title="Diagnostico real, atencion directa y trabajo tecnico con criterio."
        body="rosfix es un servicio tecnico independiente para celulares, notebooks y PC en Rosario, pensado para quienes prefieren entender bien que pasa antes de gastar."
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
            <img src="assets/hero-workbench.png" alt="Banco de trabajo tecnico de rosfix" />
            <div className="display-note">
              <span>Enfoque</span>
              <strong>Revision, descarte y criterio antes de tocar piezas</strong>
            </div>
          </div>
        }
      />

      <FeatureRibbon />
      <ServicesSection />
      <ImageStatementSection
        ariaLabel="Diagnostico cercano y atencion directa en rosfix"
        eyebrow="Diagnostico cercano"
        title="Un mejor diagnostico empieza hablando directo con quien revisa tu equipo."
        image="assets/editorial-breath.png"
      />
      <TrustSection />

      <section className="section section-contrast shell split-callout">
        <div>
          <span>Manifiesto</span>
          <h2>Hay servicios que trabajan por volumen. rosfix prefiere trabajar con criterio.</h2>
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
            <img src="assets/hero-devices.png" alt="Visual tecnico de dispositivos y herramientas" />
            <div className="display-note">
              <span>Foco</span>
              <strong>Hardware, celulares y diagnostico responsable</strong>
            </div>
          </div>
        }
      />

      <EditorialNarrativeSection
        eyebrow="Servicios"
        title="Problemas cotidianos, explicados y resueltos."
        intro="rosfix no entra solo cuando hay una reparacion grande. Tambien entra cuando hace falta ordenar, configurar, recuperar contexto y destrabar equipos que siguen teniendo solucion."
        items={servicesEditorialBlocks}
      />

      <EditorialNarrativeSection
        eyebrow="Criterio"
        title="La idea no es sumar trabajo: es bajar ruido."
        intro="El valor no siempre esta en cambiar piezas. Muchas veces esta en revisar bien, descartar una sospecha equivocada y dejarte una salida clara."
        items={servicesEditorialTruths}
      />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes antes de traer tu equipo"
        summary="Presupuesto, accesorios, datos sensibles y otras consultas practicas para llegar con mejor contexto."
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
              <strong>Se evalua, se explica y recien despues se decide</strong>
            </div>
          </div>
        }
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
        intro="Hay recepcion, diagnostico con plazo, presupuesto despues de revisar y una salida clara aunque el trabajo no siga con rosfix."
        items={processEditorialSteps}
      />

      <EditorialNarrativeSection
        eyebrow="Verdades"
        title="Siempre deberias saber donde estas parado."
        intro="El proceso esta pensado para bajar ansiedad, no para fabricar misterio. La informacion tambien forma parte del servicio."
        items={processEditorialTruths}
      />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes sobre revision y tiempos"
        summary="Seguimiento, aprobaciones y decisiones practicas para saber que esperar durante cada etapa."
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
        eyebrow="Sobre rosfix"
        title="Resolver con criterio y comunicar con claridad."
        body="Leandro Palombo combina experiencia en reparacion de celulares, soporte tecnico, hardware y sistemas, con una forma de trabajo orientada a explicar bien lo que hace."
        note="rosfix toma esa base y la convierte en una manera de trabajar: diagnostico honesto, soporte real y decisiones tecnicas claras."
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
      />

      <EditorialNarrativeSection
        eyebrow="Tecnico"
        title="Criterio tecnico, honestidad y limites claros."
        intro="rosfix no intenta tomar cualquier cosa. Toma lo que se puede resolver bien y dice con claridad cuando una intervencion no tiene sentido."
        items={aboutEditorialPrinciples}
      />

      <EditorialNarrativeSection
        eyebrow="Honestidad"
        title="La utilidad tambien esta en saber hasta donde conviene llegar."
        intro="Un buen diagnostico no se mide solo por lo que repara. Tambien se mide por lo que evita hacerte perder."
        items={aboutEditorialTruths}
      />

      <ContentArchive
        eyebrow="Consultas"
        title="Dudas frecuentes sobre criterio y forma de trabajo"
        summary="Alcance real, limites tecnicos y la manera en que se comunica cada caso desde el inicio."
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
