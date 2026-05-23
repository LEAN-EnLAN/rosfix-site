import type { LucideIcon } from "lucide-react";
import {
  HardDrive,
  House,
  MessageCircle,
  MonitorSmartphone,
  Route,
  UserCheck,
  Wrench,
} from "lucide-react";

export type PageKey = "home" | "services" | "process" | "about" | "contact";

export type PageConfig = {
  key: PageKey;
  title: string;
  intro: string;
  path: string;
  icon: LucideIcon;
};

export type PageCopy = {
  title: string;
  intro: string;
  path: string;
};

export type ServiceItem = {
  title: string;
  icon: LucideIcon;
  text: string;
  points: string[];
};

export type CourseOffer = {
  eyebrow: string;
  title: string;
  description: string;
  audience: string;
  format: string;
  status: string;
  points: string[];
  message: string;
};

export type HeroFact = readonly [string, string];
export type HeroVisualLine = readonly [string, string];

export type EditorialItem = {
  eyebrow?: string;
  title: string;
  text: string;
  points?: string[];
};

export type CarouselSlide = {
  eyebrow: string;
  label: string;
  statement: string;
  image: string;
};

export const WA_NUMBER = "5493412008643";
export const MAIL = "leanplbo@gmail.com";

export const pageCopyByKey: Record<PageKey, PageCopy> = {
  home: { title: "Inicio", intro: "Servicio técnico independiente en Rosario.", path: "./" },
  services: { title: "Servicios", intro: "Celulares, notebooks y PC.", path: "servicios.html" },
  process: { title: "Proceso", intro: "Diagnóstico y decisión claros.", path: "proceso.html" },
  about: { title: "Técnico", intro: "Criterio técnico, sin humo.", path: "sobre-rosfix.html" },
  contact: { title: "Contacto", intro: "WhatsApp directo.", path: "contacto.html" },
};

export const pageIcons: Record<PageKey, LucideIcon> = {
  home: House,
  services: HardDrive,
  process: Route,
  about: UserCheck,
  contact: MessageCircle,
};

export const pageOrder: PageKey[] = ["home", "services", "process", "about", "contact"];

export const pages: PageConfig[] = pageOrder.map((key) => ({
  key,
  ...pageCopyByKey[key],
  icon: pageIcons[key],
}));

export const sharedCtaCopy = {
  requestDiagnosisLabel: "Pedir diagnóstico",
  requestDiagnosisMessage: "Hola Leandro, quiero consultar por un diagnóstico.",
  requestDiagnosisForDeviceMessage: "Hola Leandro, quiero pedir un diagnóstico para mi equipo.",
  contactLabel: "Ver contacto",
  whatsappLabel: "Hablar por WhatsApp",
  whatsappMessage: "Hola Leandro, quiero consultar mi equipo por WhatsApp.",
} as const;

export const technicianProfile = {
  name: "Leandro",
  handle: "rosfix_",
  avatar: "assets/tecnico-avatar.jpg",
  portrait: "assets/tecnico-selfie.png",
  workday: "assets/hero-about.png",
} as const;

export const services: ServiceItem[] = [
  {
    title: "PC y notebooks",
    icon: HardDrive,
    text: "Mantenimiento, rendimiento y mejoras puntuales para equipos de uso real.",
    points: ["Temperatura, limpieza y rendimiento", "Disco, memoria y sistema"],
  },
  {
    title: "Celulares",
    icon: MonitorSmartphone,
    text: "Fallas comunes, reemplazo de partes y puesta a punto para uso diario.",
    points: ["Pantalla, batería y carga", "Cuentas, traspasos y configuración"],
  },
  {
    title: "Diagnóstico técnico",
    icon: Wrench,
    text: "Revisión para saber si conviene seguir, frenar o derivar.",
    points: ["Diagnóstico antes de intervenir", "Opciones claras y decisión útil"],
  },
];

export const featuredLines = [
  "Atención directa. Sin intermediarios.",
  "Diagnóstico real antes de presupuestar.",
];

export const editorialCarouselSlides: CarouselSlide[] = [
  {
    eyebrow: "Diagnóstico cercano",
    label: "Celulares",
    statement: "Hablar directo con quien revisa tu equipo mejora el diagnóstico desde el primer mensaje.",
    image: "assets/editorial-diagnostico-cercano.png",
  },
  {
    eyebrow: "Rendimiento real",
    label: "PC y notebooks",
    statement: "Temperatura, disco y memoria se leen antes de gastar en hardware que tal vez no hace falta cambiar.",
    image: "assets/editorial-rendimiento-real.png",
  },
  {
    eyebrow: "Decisión clara",
    label: "Diagnóstico técnico",
    statement: "No todo caso necesita arreglo: a veces conviene frenar, explicar bien o derivar a tiempo.",
    image: "assets/editorial-decision-clara.png",
  },
];

export const processSteps = [
  ["01", "Escribís", "Contás qué equipo es, qué síntomas tiene y desde cuándo pasa."],
  ["02", "Se revisa", "Se ordena el problema y se descartan supuestos antes de tocar piezas."],
  ["03", "Se explica", "Se comunica con claridad qué pasa, qué opciones hay y qué conviene hacer."],
  ["04", "Se resuelve", "Se repara, se ajusta o se frena si el arreglo no tiene sentido."],
] as const;

export const trustRows = [
  ["Hablas con quien revisa", "Sin intermediarios entre consulta, diagnóstico y entrega."],
  ["Primero se confirma la falla", "La revisión viene antes que cambiar piezas."],
  ["Si no conviene reparar, se dice", "La recomendación también tiene que cuidar tu plata."],
] as const;

export const faq = [
  ["Conviene llevarlo aunque falle solo a veces?", "Si. Cuando una falla aparece de manera intermitente, el contexto ayuda mucho: cuando pasa, si calienta, si se descarga rápido o si aparece después de un golpe, humedad o actualización."],
  ["Hace falta llevar cargador, funda o accesorios?", "Solo si el problema tiene relación con carga, batería, audio, periféricos o compatibilidad. Si no, normalmente alcanza con el equipo y una descripcion clara."],
  ["Tengo información importante adentro. Lo aviso antes?", "Si, siempre conviene avisar si hay datos sensibles, cuentas activas o contenido qué no queres perder de vista. Eso ordena mejor la revision desde el principio."],
  ["Si ya lo vio otro técnico, igual sirve consultarlo?", "Si. Lo que te hayan dicho antes puede aportar pistas, pero igual conviene revisar el equipo con criterio propio y no trabajar solo sobre una conclusion ajena."],
] as const;

export const processFaq = [
  ["Sirve mandar fotos o videos antes de acercarlo?", "Si. Una foto de una rotura, un video de la falla o un mensaje bien detallado puede ordenar mucho mejor el caso antes de revisar el equipo en persona."],
  ["Qué pasa si la falla aparece y desaparece?", "También se toma en serio. Cuando el problema es intermitente, lo más útil es registrar en que momento aparece y bajo que condiciones para no revisar a ciegas."],
  ["Se aprueba algo antes de avanzar con gastos?", "Si. La idea es ordenar primero el diagnóstico y después decidir con información clara si tiene sentido seguir, frenar o buscar otra salida."],
  ["Y si el equipo necesita algo que ya no conviene ponerle?", "También forma parte del proceso decirlo a tiempo. A veces la mejor decisión no es avanzar, sino evitar un gasto desproporcionado para el equipo que tenes."],
] as const;

export const aboutFaq = [
  ["Por que rosfix no toma cualquier caso?", "Porque trabajar con criterio también implica marcar limites. Tomar algo qué no se puede resolver bien solo agrega ruido, falsas expectativas y malas decisiónes."],
  ["Decir qué no a tiempo también es parte del servicio?", "Si. En muchos casos, una respuesta honesta antes de intervenir vale más que forzar una reparación qué no cierra tecnica ni economicamente."],
  ["Qué mira primero un técnico serio antes de tocar un equipo?", "Síntomás reales, contexto de uso, antecedentes del problema y si alguien ya intervino antes. Sin esa base, cualquier decisión tecnica arranca torcida."],
  ["Si mi caso no encaja con lo que haces, igual me lo van a decir claro?", "Si. La idea no es retener cualquier consulta, sino orientar bien cada caso aunque la mejor salida sea no seguir con rosfix."],
] as const;

export const experience = [
  ["Rosario Tecno", "Experiencia en diagnóstico y reparación de celulares, especialmente en dispositivos Apple e iOS, con trabajo técnico orientado a calidad, tiempos y buena comúnicacion."],
  ["Trabajo independiente", "Actividad como técnico informatico independiente desde 2023, brindando soporte integral, diagnóstico de hardware y gestión autónoma de clientes, repuestos y control de calidad."],
  ["Soporte e infraestructura educativa", "Participación en despliegue técnico, mantenimiento y resolución de incidencias de hardware y conectividad en entornos educativos junto al equipo docente del Colegio San José / Casa Salesiana."],
];

export const servicesEditorialBlocks: EditorialItem[] = [
  {
    eyebrow: "android e iphone",
    title: "Celulares con fallas comúnes y traspasos.",
    text: "Bateria, modulo, pin, configuraciónes, cuentas y orden general.",
  },
  {
    eyebrow: "pc y notebook",
    title: "PC y notebooks que todavia pueden rendir mejor.",
    text: "Mantenimiento, formateo, mejoras puntuales y revision de hardware común.",
  },
  {
    eyebrow: "uso cotidiano",
    title: "Problemás chicos que frenan todo.",
    text: "WhatsApp, cuentas, lentitud y configuraciónes que hacen perder tiempo.",
  },
];

export const courses: CourseOffer[] = [
  {
    eyebrow: "curso 01",
    title: "Diagnóstico con criterio para fallas reales.",
    description: "Leer síntomás y revisar con más orden.",
    audience: "Inicio técnico / autodidacta.",
    format: "Casos reales / clases cortas.",
    status: "Proxima apertura.",
    points: [
      "Preguntas que ordenan el caso",
      "Primer chequeo útil",
      "Cuando frenar o derivar",
    ],
    message: "Hola Leandro, quiero enterarme primero del curso de diagnóstico con criterio.",
  },
  {
    eyebrow: "curso 02",
    title: "Mantenimiento y criterio para PC y notebooks.",
    description: "Mejoras reales y mantenimiento útil.",
    audience: "Usuarios curiosos / etapa inicial.",
    format: "Chequeos guiados / equipos comúnes.",
    status: "En desarrollo.",
    points: [
      "Limpieza y temperatura",
      "Memoria, disco y sistema",
      "Cuando no conviene invertir",
    ],
    message: "Hola Leandro, me interesa el curso de mantenimiento y criterio para PC y notebooks.",
  },
];

export const processEditorialSteps: EditorialItem[] = [
  {
    eyebrow: "01",
    title: "Recepcion y estado inicial.",
    text: "Se ordena el caso desde información concreta.",
  },
  {
    eyebrow: "02",
    title: "Diagnóstico con plazo claro.",
    text: "En hasta 2 días ya deberias saber que pasa.",
  },
  {
    eyebrow: "03",
    title: "Presupuesto después de revisar.",
    text: "Primero verdad tecnica. Después decisión.",
  },
  {
    eyebrow: "04",
    title: "Reparacion o derivacion con contexto.",
    text: "Si no sigue aca, igual salís con una base útil.",
  },
];

export const aboutEditorialPrinciples: EditorialItem[] = [
  {
    eyebrow: "criterio",
    title: "No tomo todo.",
    text: "Se toman casos que se puedan resolver bien.",
  },
  {
    eyebrow: "limite",
    title: "Si no conviene, se dice.",
    text: "Forzar una reparación también puede ser un error.",
  },
  {
    eyebrow: "útilidad",
    title: "Aunqué no lo haga yo, igual te tiene que servir.",
    text: "Un diagnóstico útil o una buena derivacion también cuentan.",
  },
];
