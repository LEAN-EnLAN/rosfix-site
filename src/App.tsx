import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Cpu,
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

type ServiceFamily = {
  name: string;
  icon: typeof MonitorSmartphone;
  summary: string;
  details: string[];
  image: string;
};

const WA_NUMBER = "+5493410000000";

const pages: PageConfig[] = [
  { key: "home", title: "Inicio", intro: "Servicio tecnico independiente en Rosario.", path: "./" },
  { key: "services", title: "Servicios", intro: "Celulares, notebooks, PC y diagnostico basico.", path: "servicios.html" },
  { key: "process", title: "Proceso", intro: "Metodo, tiempos posibles y criterio tecnico.", path: "proceso.html" },
  { key: "about", title: "Tecnico", intro: "La forma de trabajo detras de rosFIX.", path: "sobre-rosfix.html" },
  { key: "contact", title: "Contacto", intro: "WhatsApp directo y formulario corto.", path: "contacto.html" },
];

const serviceFamilies: ServiceFamily[] = [
  {
    name: "Celulares",
    icon: MonitorSmartphone,
    summary: "Pantallas, pin de carga, bateria, software y fallas que requieren revisar con criterio.",
    details: [
      "Pantallas rotas o con toque fallando",
      "Baterias degradadas o infladas",
      "Conectores de carga y flex",
      "Equipos mojados o con golpes",
      "Software, reinicios y rendimiento",
    ],
    image: "assets/hero-devices.svg",
  },
  {
    name: "Notebooks",
    icon: HardDrive,
    summary: "Rendimiento, temperatura, discos, mantenimiento interno y equipos que tardan en arrancar.",
    details: [
      "SSD, RAM y mejoras de rendimiento",
      "Limpieza interna y pasta termica",
      "Cuelgues, reinicios y lentitud",
      "Teclado, pantalla y puertos",
      "Chequeo termico y estabilidad",
    ],
    image: "assets/workbench-grid.svg",
  },
  {
    name: "PC de escritorio",
    icon: Cpu,
    summary: "Armado, mantenimiento, diagnostico por partes y equipos que dejaron de dar imagen.",
    details: [
      "Diagnostico de hardware",
      "Fuente, RAM, video y discos",
      "Mantenimiento preventivo",
      "Armado y reorganizacion",
      "Temperaturas, ruido y estabilidad",
    ],
    image: "assets/bench-signal.svg",
  },
];

const processSteps = [
  ["01", "Consulta inicial", "Contas el problema, el modelo y si ya se le hizo algo al equipo."],
  ["02", "Revision con criterio", "No se adivina. Se revisa el equipo, se confirma la falla y se descartan falsas pistas."],
  ["03", "Presupuesto claro", "Te paso precio, alcance y tiempos posibles en lenguaje normal."],
  ["04", "Reparacion y pruebas", "Se entrega con pruebas hechas y una explicacion concreta de lo que se toco."],
] as const;

const proofPoints = [
  "Diagnostico real antes de presupuestar",
  "Trato directo con quien revisa el equipo",
  "Lenguaje claro, sin jerga innecesaria",
  "Rosario y alrededores como foco de atencion",
];

const reviews = [
  [
    "Lo que mas cierra no es el verso: es entender rapido si tiene arreglo y cuanto sentido tiene hacerlo.",
    "Clientes que comparan criterio antes que marketing",
  ],
  [
    "La marca tiene que verse ordenada porque el servicio tambien lo esta. Taller serio, explicacion clara, seguimiento simple.",
    "Direccion visual para rosFIX",
  ],
] as const;

const faq = [
  ["Cuanto tarda una reparacion?", "Depende de la falla y del repuesto. En problemas comunes, la respuesta suele llegar el mismo dia o al siguiente."],
  ["Vale la pena arreglar un equipo viejo?", "El diagnostico sirve para decidir si conviene reparar, actualizar o frenar antes de gastar mal."],
  ["Que datos tengo que mandar?", "Marca, modelo, sintomas, si se golpeo o mojo y si alguien ya lo reviso."],
  ["Trabajas solo con Rosario?", "La base es Rosario y alrededores. La coordinacion principal se hace por WhatsApp."],
] as const;

const aboutPoints = [
  ["Base local", "Rosario, Santa Fe, con atencion coordinada y seguimiento directo."],
  ["Perfil", "Tecnico independiente con foco en hardware, mantenimiento y diagnostico."],
  ["Metodo", "Revision, explicacion y recomendacion con criterio antes de tocar de mas."],
] as const;

function WhatsAppLink({ className, children }: { className: string; children: ReactNode }) {
  return (
    <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className={className}>
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
            Pedir diagnostico
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

function ServiceMatrix() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Servicios</span>
        <h2>Distribucion clara y foco en problemas reales</h2>
      </div>
      <div className="service-grid">
        {serviceFamilies.map(({ name, summary, details, icon: Icon, image }) => (
          <article key={name} className="service-panel">
            <div className="service-panel__head">
              <Icon size={18} />
              <strong>{name}</strong>
            </div>
            <p>{summary}</p>
            <img src={image} alt="" className="service-panel__image" />
            <ul>
              {details.map((item) => (
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
        <h2>El sitio tiene que explicar como trabajas, no solo listar arreglos</h2>
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

function ReviewsStrip() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Senal de confianza</span>
        <h2>La conversion viene de claridad operativa y de una marca que parece ordenada</h2>
      </div>
      <div className="review-strip">
        {reviews.map(([quote, author]) => (
          <blockquote key={quote}>
            <p>{quote}</p>
            <footer>{author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>FAQ</span>
        <h2>Preguntas que sacan friccion antes de escribir</h2>
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

function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Hola Leandro, soy ${formData.get("nombre")}.`,
      `Tengo un ${formData.get("equipo")} ${formData.get("modelo")}.`,
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
        <span>Marca y modelo</span>
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
        Enviar consulta por WhatsApp
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
          <p>Diagnostico claro, trato directo y servicio tecnico con foco en Rosario.</p>
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
          <span>Accion</span>
          <WhatsAppLink className="action-link">
            <MessageCircle size={16} />
            Hablar ahora
          </WhatsAppLink>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Servicio tecnico independiente"
        title="Diagnostico claro para equipos que tienen que volver a rendir."
        body="Celulares, notebooks y PC en Rosario con trato directo, criterio real y seguimiento por WhatsApp."
        note="Primero se confirma la falla. Despues se decide si conviene reparar, actualizar o frenar."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Pedir diagnostico por WhatsApp
            </WhatsAppLink>
            <a href="servicios.html" className="secondary-action">
              Ver reparaciones
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/hero-workbench.svg" alt="Ilustracion de banco de trabajo tecnico" />
            <div className="display-note">
              <span>Mesa de trabajo</span>
              <strong>Revision, descarte y criterio antes de tocar piezas</strong>
            </div>
          </div>
        }
      />

      <section className="shell proof-ribbon">
        {proofPoints.map((item) => (
          <div key={item}>
            <Check size={14} />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="section section-contrast shell quick-band">
        <div>
          <span>Canal principal</span>
          <strong>WhatsApp directo</strong>
        </div>
        <div>
          <span>Tipo de trabajo</span>
          <strong>Celulares, notebooks y PC</strong>
        </div>
        <div>
          <span>Decision</span>
          <strong>Presupuesto solo despues de revisar</strong>
        </div>
      </section>

      <ServiceMatrix />
      <ProcessRail />
      <ReviewsStrip />

      <section className="section section-editorial shell split-callout">
        <div>
          <span>Sobre la marca</span>
          <h2>Oscura, precisa y con textura propia. Nada de tarjetas blandas ni marketing de plantilla.</h2>
        </div>
        <div>
          <p>
            La direccion visual mezcla orden suizo, interfaces oscuras y referencias de hardware sin copiar el look
            de una app SaaS. La sensacion tiene que ser premium, pero aterrizada al oficio.
          </p>
          <a href="proceso.html" className="secondary-action">
            Entender el proceso
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Cada tipo de equipo pide una forma distinta de revisar y resolver."
        body="La informacion se reparte por familia de equipo y por tipo de problema para que tu caso se ubique rapido."
        note="La idea no es listar todo. Es ayudarte a ver si rosFIX es el lugar correcto para tu equipo."
        actions={
          <WhatsAppLink className="primary-action">
            <MessageCircle size={17} />
            Consultar mi equipo
          </WhatsAppLink>
        }
        aside={
          <div className="display-panel">
            <img src="assets/hero-devices.svg" alt="Composicion de dispositivos en estilo tecnico" />
            <div className="display-note">
              <span>Categoria</span>
              <strong>Celulares, notebooks y PC</strong>
            </div>
          </div>
        }
      />

      <ServiceMatrix />

      <section className="section section-editorial shell detail-columns">
        {serviceFamilies.map((service) => (
          <article key={service.name}>
            <h2>{service.name}</h2>
            <p>{service.summary}</p>
            <ul>
              {service.details.map((item) => (
                <li key={item}>
                  <ChevronRight size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Diagnostico"
        title="El proceso vale porque evita errores antes del arreglo."
        body="Mostrar metodo, tiempos posibles y criterio tecnico convierte mejor que prometer magia o precios instantaneos."
        note="Se revisa, se descarta, se explica y recien ahi se define el camino."
        actions={
          <a href="contacto.html" className="primary-action">
            <Wrench size={17} />
            Contar mi problema
          </a>
        }
          aside={
            <div className="display-panel">
              <img src="assets/workbench-grid.svg" alt="Textura y composicion de banco tecnico" />
              <div className="display-note">
                <span>Promesa</span>
                <strong>Orden antes de tocar el equipo</strong>
              </div>
            </div>
          }
        />
      <ProcessRail />
      <FAQSection />

      <section className="section section-contrast shell detail-columns">
        <article>
          <h2>Que convierte de verdad</h2>
          <ul>
            <li>
              <ChevronRight size={14} />
              <span>CTA directo: "Pedir diagnostico por WhatsApp" y "Ver reparaciones".</span>
            </li>
            <li>
              <ChevronRight size={14} />
              <span>Prueba de metodo: proceso, tiempos razonables, honestidad si no conviene reparar.</span>
            </li>
            <li>
              <ChevronRight size={14} />
              <span>Senales visuales de taller real: assets propios, textura y estructura consistente.</span>
            </li>
          </ul>
        </article>
        <article>
          <h2>Que evitamos</h2>
          <ul>
            <li>
              <ChevronRight size={14} />
              <span>Animaciones vacias, bloques inflados y tonos de startup generica.</span>
            </li>
            <li>
              <ChevronRight size={14} />
              <span>Promesas de tiempo o precio sin contexto.</span>
            </li>
            <li>
              <ChevronRight size={14} />
              <span>La repeticion de cajas blandas y layouts que parecen hechos por piloto automatico.</span>
            </li>
          </ul>
        </article>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Tecnico"
        title="Una marca chica puede verse seria si el trabajo esta ordenado."
        body="rosFIX no se apoya en una vidriera grande. Se apoya en explicacion clara, revision real y una forma de trabajo consistente."
        note="La confianza no sale de parecer enorme. Sale de decir la posta y sostenerla."
        actions={
          <a href="contacto.html" className="secondary-action">
            Empezar una consulta
            <ArrowRight size={16} />
          </a>
        }
        aside={
          <div className="display-panel">
            <img src="assets/bench-signal.svg" alt="Visual tecnico de rosFIX" />
            <div className="display-note">
              <span>Perfil</span>
              <strong>Tecnico independiente en Rosario</strong>
            </div>
          </div>
        }
      />

      <section className="section section-editorial shell detail-columns">
        {aboutPoints.map(([title, body]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section section-contrast shell split-callout">
        <div>
          <span>Direccion visual</span>
          <h2>Dark swiss, textura de terminal y una paleta calida que no cae en el azul generico.</h2>
        </div>
        <div>
          <p>
            La web usa paneles duros, lineas finas, tipografia controlada y assets custom para transmitir
            oficio. La idea es premium sin perder credibilidad de taller real.
          </p>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="La consulta tiene que bajar friccion y mejorar la respuesta."
        body="Se centraliza el formulario, WhatsApp y la informacion que conviene tener a mano para arrancar mejor."
        note="Modelo, falla, urgencia y antecedentes valen mas que un mensaje corto sin contexto."
        actions={
          <WhatsAppLink className="primary-action">
            <MessageCircle size={17} />
            Ir directo a WhatsApp
          </WhatsAppLink>
        }
        aside={
          <div className="contact-side">
            <div>
              <span>Zona</span>
              <strong>Rosario y alrededores</strong>
            </div>
            <div>
              <span>Canal</span>
              <strong>WhatsApp como via principal</strong>
            </div>
            <div>
              <span>Ideal para enviar</span>
              <strong>Modelo, falla, fotos y urgencia</strong>
            </div>
          </div>
        }
      />

      <section className="section section-editorial shell contact-layout">
        <div>
          <div className="section-heading">
            <span>Consulta</span>
            <h2>Deja todo listo para una respuesta mejor</h2>
          </div>
          <ContactForm />
        </div>
        <aside className="contact-aside">
          <div>
            <MapPin size={18} />
            <strong>Atencion local</strong>
            <p>Contenido y SEO trabajados para Rosario, Santa Fe y consultas cercanas.</p>
          </div>
          <div>
            <ShieldCheck size={18} />
            <strong>Mensaje util</strong>
            <p>Modelo, sintomas, golpes, humedad y revisiones previas ayudan a diagnosticar mejor.</p>
          </div>
          <div>
            <Wrench size={18} />
            <strong>Decision clara</strong>
            <p>Si conviene reparar se avanza. Si no conviene, la respuesta tambien tiene que servirte.</p>
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
