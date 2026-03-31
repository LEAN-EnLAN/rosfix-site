import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  GraduationCap,
  HardDrive,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
  TerminalSquare,
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

type Feature = {
  title: string;
  text: string;
};

type ServiceItem = {
  title: string;
  icon: typeof MonitorSmartphone;
  text: string;
  points: string[];
  image: string;
};

type CourseItem = {
  title: string;
  text: string;
};

const WA_NUMBER = "5493412008643";
const MAIL = "leanplbo@gmail.com";

const pages: PageConfig[] = [
  { key: "home", title: "Inicio", intro: "Servicio tecnico y formacion practica con criterio real.", path: "./" },
  { key: "services", title: "Servicios", intro: "Hardware, celulares, Linux y diagnostico real.", path: "servicios.html" },
  { key: "process", title: "Metodo", intro: "Diagnostico, criterio, explicacion y formacion util.", path: "proceso.html" },
  { key: "about", title: "ROSFIX", intro: "La base tecnica y humana detras de la marca.", path: "sobre-rosfix.html" },
  { key: "contact", title: "Contacto", intro: "Atencion directa para servicio tecnico y cursos.", path: "contacto.html" },
];

const pillars: Feature[] = [
  {
    title: "Atencion directa",
    text: "Cada caso se trata de forma personal. Sin soporte en capas, sin respuestas de manual.",
  },
  {
    title: "Diagnostico real",
    text: "Antes de tocar un equipo o cambiar piezas, primero se entiende el problema.",
  },
  {
    title: "Cursos hechos a mano",
    text: "Contenido explicado desde la experiencia real, con foco en lo util y sin relleno innecesario.",
  },
  {
    title: "Hardware, celulares y Linux",
    text: "Un perfil tecnico hibrido para resolver desde fallas fisicas hasta problemas de sistema.",
  },
];

const featuredLines = [
  "No trabajamos por volumen. Trabajamos con criterio.",
  "No improvisamos respuestas. Diagnosticamos.",
  "No hacemos cursos inflados. Ensenamos lo que sirve.",
  "Atencion directa. Sin respuestas copiadas.",
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
    title: "Linux y software",
    icon: TerminalSquare,
    text: "Soporte tecnico para instalacion, configuracion, administracion y resolucion de problemas en entornos Linux y sistemas informaticos en general.",
    points: [
      "Linux aplicado a soporte y trabajo real",
      "Configuracion, diagnostico y administracion",
      "Menos teoria abstracta, mas utilidad concreta",
    ],
    image: "assets/bench-signal.svg",
  },
  {
    title: "Diagnostico tecnico",
    icon: Cpu,
    text: "Evaluacion precisa para detectar fallas de hardware, conectividad o sistema. La prioridad no es vender una reparacion: es decir con honestidad que pasa y que conviene hacer.",
    points: [
      "Diagnostico honesto antes de intervenir",
      "Comunicacion clara sobre opciones reales",
      "Criterio tecnico por encima del automatismo",
    ],
    image: "assets/hero-workbench.svg",
  },
];

const courses: CourseItem[] = [
  {
    title: "Diagnostico de PC que no enciende",
    text: "Una guia practica para entender causas comunes, detectar fallas y ordenar el diagnostico sin perder tiempo ni cambiar piezas al azar.",
  },
  {
    title: "Reparacion basica de celulares",
    text: "Fundamentos utiles para empezar a entender fallas frecuentes, componentes, logica de reparacion y buenas practicas de trabajo.",
  },
  {
    title: "Linux practico para usuarios reales",
    text: "Uso real de Linux para soporte, administracion, diagnostico y trabajo tecnico. Menos teoria abstracta, mas herramientas aplicables.",
  },
  {
    title: "Electronica basica aplicada",
    text: "Conceptos esenciales de electronica orientados al diagnostico, la medicion y la comprension tecnica de fallas comunes.",
  },
];

const processSteps = [
  ["01", "Escribis", "Contas que esta pasando, que necesitas resolver o que queres aprender."],
  ["02", "Se evalua", "Se analiza el caso, se ordena el problema y se define que conviene revisar."],
  ["03", "Se explica", "Antes de avanzar, se comunica con claridad que pasa, que opciones hay y que tiene sentido hacer."],
  ["04", "Se resuelve o se ensena", "Se repara, se optimiza o se transforma el problema en un proceso de aprendizaje util."],
] as const;

const serviceFaq = [
  ["Trabajas solo con celulares?", "No. ROSFIX combina reparacion de celulares, computadoras, notebooks, soporte tecnico y trabajo sobre sistemas."],
  ["Haces diagnostico antes de reparar?", "Si. La prioridad es entender bien el problema antes de tocar el equipo o sugerir un reemplazo."],
  ["Atendes personalmente?", "Si. Uno de los diferenciales principales es justamente la atencion directa y la comunicacion clara durante el proceso."],
  ["Trabajas con Apple y Android?", "Si. Hay experiencia concreta en dispositivos Apple e iOS, ademas de trabajo con equipos Android y hardware multimarca."],
] as const;

const courseFaq = [
  ["Los cursos estan pensados para principiantes?", "Depende del curso, pero la idea general es explicar de forma clara, util y progresiva, sin asumir mas conocimiento del necesario."],
  ["Son cursos teoricos?", "No. El enfoque esta puesto en aplicacion, criterio, herramientas y resolucion de problemas reales."],
  ["Se puede aprender aunque no quiera trabajar de tecnico?", "Si. Los cursos tambien estan pensados para personas que quieren entender mejor la tecnologia que usan o resolver problemas cotidianos por su cuenta."],
] as const;

const experience = [
  ["Rosario Tecno", "Experiencia en diagnostico y reparacion de celulares, especialmente en dispositivos Apple e iOS, con trabajo tecnico orientado a calidad, tiempos y buena comunicacion."],
  ["Trabajo independiente", "Actividad como tecnico informatico independiente desde 2023, brindando soporte integral, diagnostico de hardware y gestion autonoma de clientes, repuestos y control de calidad."],
  ["Soporte e infraestructura educativa", "Participacion en despliegue tecnico, mantenimiento y resolucion de incidencias de hardware y conectividad en entornos educativos junto al equipo docente del Colegio San Jose / Casa Salesiana."],
  ["Formacion y desarrollo", "Perfil hibrido con base en hardware, redes, software y administracion de sistemas, con ingles fluido y desarrollo de proyectos tecnicos propios."],
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
        <a href="./" className="brand-mark" aria-label="ROSFIX inicio">
          <img src="assets/brand-mark.svg" alt="" width="34" height="34" />
          <span>
            <strong>ROSFIX</strong>
            <small>servicio tecnico y formacion practica</small>
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

function PillarGrid() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Pilares</span>
        <h2>Atencion directa, diagnostico real y formacion util</h2>
      </div>
      <div className="detail-columns">
        {pillars.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureRibbon() {
  return (
    <section className="shell proof-ribbon">
      {featuredLines.map((item) => (
        <div key={item}>
          <ShieldCheck size={14} />
          <span>{item}</span>
        </div>
      ))}
    </section>
  );
}

function ServicesSection({ title = "Servicios tecnicos", intro = "Trabajo sobre problemas reales, con foco en diagnostico, reparacion responsable y comunicacion clara durante todo el proceso." }: { title?: string; intro?: string }) {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Servicios</span>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="service-grid service-grid-wide">
        {services.map(({ title: name, text, points, icon: Icon, image }) => (
          <article key={name} className="service-panel">
            <div className="service-panel__head">
              <Icon size={18} />
              <strong>{name}</strong>
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

function CoursesSection() {
  return (
    <section className="section section-editorial shell">
      <div className="section-heading">
        <span>Cursos</span>
        <h2>Cursos practicos</h2>
        <p>Cursos pensados para ensenar desde la experiencia real, con foco en problemas cotidianos, criterio tecnico y aplicacion inmediata.</p>
      </div>
      <div className="detail-columns">
        {courses.map((course) => (
          <article key={course.title}>
            <h2>{course.title}</h2>
            <p>{course.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="section section-contrast shell split-callout">
      <div>
        <span>Metodologia</span>
        <h2>Como estan hechos los cursos</h2>
      </div>
      <div>
        <p>
          Cada curso esta armado desde la experiencia real de reparacion, soporte y resolucion de problemas.
          El objetivo no es llenar horas ni sonar tecnico: es hacer entendible lo importante, ordenar el
          razonamiento y ensenar de una forma util de verdad.
        </p>
      </div>
    </section>
  );
}

function ProcessRail() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Proceso</span>
        <h2>Como trabajamos</h2>
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

function FaqSection({
  title,
  items,
}: {
  title: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>FAQ</span>
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

function FounderSection() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Fundador</span>
        <h2>Sobre el fundador</h2>
      </div>
      <div className="split-callout">
        <div>
          <p>
            Leandro Palombo combina experiencia en reparacion de celulares, soporte tecnico, hardware y sistemas,
            con una formacion tecnica solida en informatica y una fuerte orientacion a explicar bien lo que hace.
          </p>
        </div>
        <div>
          <p>
            Trabajo en reparacion de celulares en Rosario Tecno, se desempena como tecnico informatico independiente
            desde 2023 y colaboro en soporte tecnico e infraestructura educativa en el Colegio San Jose / Casa
            Salesiana entre 2022 y 2025.
          </p>
          <p>
            Actualmente cursa su ultimo tramo de la Tecnicatura en Informatica. Tambien participo en el proyecto
            Pildhora, con el que obtuvo el 2. puesto provincial en Agromakers 2025.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section section-editorial shell">
      <div className="section-heading">
        <span>Experiencia real</span>
        <h2>Base tecnica y trabajo sostenido en casos concretos</h2>
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

function PlaceholderTestimonials() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <span>Testimonios</span>
        <h2>Proximamente: casos reales y testimonios</h2>
        <p>ROSFIX esta en construccion como marca publica. Proximamente vas a poder ver casos reales, resultados concretos y experiencias de clientes y alumnos.</p>
      </div>
      <div className="review-strip">
        <blockquote>
          <p>Espacio reservado para experiencia de cliente de servicio tecnico.</p>
          <footer>Cliente de servicio tecnico</footer>
        </blockquote>
        <blockquote>
          <p>Espacio reservado para alumno de curso practico.</p>
          <footer>Alumno de cursos</footer>
        </blockquote>
        <blockquote>
          <p>Espacio reservado para caso real de diagnostico complejo resuelto.</p>
          <footer>Caso real documentado</footer>
        </blockquote>
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
      `Quiero consultar por ${formData.get("motivo")}.`,
      `Equipo o curso: ${formData.get("modelo")}.`,
      `Detalle: ${formData.get("problema")}.`,
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
          <span>Motivo</span>
          <select required name="motivo" defaultValue="un diagnostico tecnico">
            <option value="un diagnostico tecnico">Solicitar diagnostico</option>
            <option value="un servicio tecnico">Consultar por servicio</option>
            <option value="un curso practico">Consultar por cursos</option>
          </select>
        </label>
      </div>

      <label>
        <span>Equipo o curso</span>
        <input required name="modelo" type="text" placeholder="PC, notebook, celular o curso que te interesa" />
      </label>

      <label>
        <span>Que necesitas resolver</span>
        <textarea required name="problema" rows={5} placeholder="Contame el problema, lo que queres aprender o el contexto del equipo." />
      </label>

      <fieldset>
        <legend>Prioridad</legend>
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
        Contactar ROSFIX
      </button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>ROSFIX</strong>
          <p>Diagnostico tecnico especializado.</p>
          <p>Servicio tecnico, formacion practica y criterio real. Rosario, Santa Fe.</p>
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
          <span>Microcopy</span>
          <p>Atencion directa.</p>
          <p>Sin humo.</p>
          <p>Sin respuestas copiadas.</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="ROSFIX"
        title="Diagnostico real. Atencion directa. Cursos hechos a mano."
        body="ROSFIX es una marca independiente para quienes buscan reparar mejor, entender mejor y aprender sin relleno. Servicio tecnico con criterio, comunicacion directa y formacion practica explicada como a uno le hubiese gustado aprender."
        note="No se posiciona como laboratorio de placa ni como promesa vacia de complejidad. Se posiciona como criterio tecnico, soporte real y formacion util."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Solicitar diagnostico
            </WhatsAppLink>
            <a href="servicios.html" className="secondary-action">
              Ver cursos
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/hero-workbench.svg" alt="Banco de trabajo tecnico de ROSFIX" />
            <div className="display-note">
              <span>Concepto</span>
              <strong>Servicio tecnico y formacion practica con criterio real</strong>
            </div>
          </div>
        }
      />

      <FeatureRibbon />
      <PillarGrid />
      <ServicesSection />
      <CoursesSection />
      <MethodSection />
      <PlaceholderTestimonials />

      <section className="section section-contrast shell split-callout">
        <div>
          <span>Manifiesto</span>
          <h2>Hay servicios que trabajan por volumen. ROSFIX prefiere trabajar con criterio.</h2>
        </div>
        <div>
          <p>
            Muchas veces el problema no es solo que algo falle, sino que nadie se tome el tiempo de
            diagnosticarlo bien, explicarlo bien y resolverlo con responsabilidad. La atencion es directa.
            El diagnostico es honesto. La explicacion importa. Y si algo no conviene, se dice.
          </p>
          <p>
            Lo mismo pasa con la formacion. No se trata de vender cursos inflados, sino de ensenar lo que
            realmente sirve, desde la practica, con paciencia y con el tipo de claridad que normalmente falta.
          </p>
        </div>
      </section>

      <section className="section shell split-callout">
        <div>
          <span>CTA final</span>
          <h2>Si valoras atencion directa y trabajo tecnico real, estas en el lugar correcto.</h2>
        </div>
        <div>
          <p>
            ROSFIX esta hecho para quienes prefieren resolver con criterio antes que entrar en una cadena de
            respuestas automaticas.
          </p>
          <WhatsAppLink className="primary-action">
            <MessageCircle size={17} />
            Hablar ahora
          </WhatsAppLink>
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
        title="Servicio tecnico con criterio. Formacion sin humo."
        body="Reparacion de computadoras y celulares, soporte tecnico y cursos practicos disenados desde la experiencia real. Sin respuestas copiadas. Sin vueltas. Sin promesas vacias."
        note="ROSFIX no se comunica como especialista absoluto en board repair ni como promesa de microsoldadura. Se comunica como diagnostico real, soporte tecnico, Linux y formacion util."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Explorar servicios
            </WhatsAppLink>
            <a href="proceso.html" className="secondary-action">
              Ver metodologia
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/hero-devices.svg" alt="Visual tecnico de dispositivos y herramientas" />
            <div className="display-note">
              <span>Foco</span>
              <strong>Hardware, celulares, Linux y diagnostico responsable</strong>
            </div>
          </div>
        }
      />

      <ServicesSection
        title="Servicios tecnicos"
        intro="Trabajo sobre problemas reales, con foco en diagnostico, reparacion responsable y comunicacion clara durante todo el proceso."
      />
      <CoursesSection />
      <FaqSection title="Preguntas frecuentes sobre servicios" items={serviceFaq} />
    </>
  );
}

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Metodo"
        title="Mas criterio. Menos automatismo."
        body="Atencion directa, diagnostico honesto y cursos construidos desde la practica real. ROSFIX combina reparacion, soporte tecnico y ensenanza clara para resolver problemas de verdad."
        note="No se trata de aparentar complejidad. Se trata de entender bien el problema."
        actions={
          <>
            <WhatsAppLink className="primary-action">
              <MessageCircle size={17} />
              Pedir revision
            </WhatsAppLink>
            <a href="sobre-rosfix.html" className="secondary-action">
              Conocer ROSFIX
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/workbench-grid.svg" alt="Panel de metodo y diagnostico de ROSFIX" />
            <div className="display-note">
              <span>Metodo</span>
              <strong>Se evalua, se explica y recien despues se decide</strong>
            </div>
          </div>
        }
      />

      <ProcessRail />
      <MethodSection />
      <FaqSection title="Preguntas frecuentes sobre cursos" items={courseFaq} />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre ROSFIX"
        title="Resolver con criterio, comunicar con claridad y ensenar sin humo."
        body="Leandro Palombo combina experiencia en reparacion de celulares, soporte tecnico, hardware y sistemas, con una formacion tecnica solida en informatica y una fuerte orientacion a explicar bien lo que hace."
        note="ROSFIX toma esa base y la convierte en una forma de trabajo: diagnostico honesto, soporte real y cursos explicados como se deberian aprender."
        actions={
          <>
            <a href="contacto.html" className="primary-action">
              <MessageCircle size={17} />
              Contactar ROSFIX
            </a>
            <a href="servicios.html" className="secondary-action">
              Explorar servicios
              <ArrowRight size={16} />
            </a>
          </>
        }
        aside={
          <div className="display-panel">
            <img src="assets/bench-signal.svg" alt="Visual tecnico y humano de ROSFIX" />
            <div className="display-note">
              <span>Perfil</span>
              <strong>Reparacion, soporte, hardware, sistemas y formacion</strong>
            </div>
          </div>
        }
      />

      <FounderSection />
      <ExperienceSection />
      <PlaceholderTestimonials />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Reparar mejor. Entender mejor. Aprender mejor."
        body="Servicio tecnico y formacion practica con una logica simple: decir la verdad, explicar bien y trabajar con responsabilidad."
        note="Si queres consultar por un equipo, pedir una revision o saber mas sobre los cursos, escribime directamente."
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
            <GraduationCap size={18} />
            <strong>Cursos practicos</strong>
            <p>Tambien podes escribir para consultar por cursos, metodologia y contenido formativo.</p>
          </div>
          <div>
            <MapPin size={18} />
            <strong>Base local</strong>
            <p>Rosario, Santa Fe. Servicio tecnico, soporte y formacion con criterio real.</p>
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
