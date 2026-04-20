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
  home: { title: "Inicio", intro: "Servicio tecnico independiente en Rosario.", path: "./" },
  services: { title: "Servicios", intro: "Celulares, notebooks y PC.", path: "servicios.html" },
  process: { title: "Proceso", intro: "Diagnostico y decision claros.", path: "proceso.html" },
  about: { title: "Tecnico", intro: "Criterio tecnico, sin humo.", path: "sobre-rosfix.html" },
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
  requestDiagnosisLabel: "Pedir diagnostico",
  requestDiagnosisMessage: "Hola Leandro, quiero consultar por un diagnostico.",
  requestDiagnosisForDeviceMessage: "Hola Leandro, quiero pedir un diagnostico para mi equipo.",
  contactLabel: "Ver contacto",
  whatsappLabel: "Hablar por WhatsApp",
  whatsappMessage: "Hola Leandro, quiero consultar mi equipo por WhatsApp.",
} as const;

export const technicianProfile = {
  name: "Leandro",
  handle: "leandro.rosfix",
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
    points: ["Pantalla, bateria y carga", "Cuentas, traspasos y configuracion"],
  },
  {
    title: "Diagnostico tecnico",
    icon: Wrench,
    text: "Revision para saber si conviene seguir, frenar o derivar.",
    points: ["Diagnostico antes de intervenir", "Opciones claras y decision util"],
  },
];

export const featuredLines = [
  "Atencion directa. Sin intermediarios.",
  "Diagnostico real antes de presupuestar.",
  "Servicio tecnico local en Rosario.",
  "Explicacion clara de principio a fin.",
];

export const editorialCarouselSlides: CarouselSlide[] = [
  {
    eyebrow: "Diagnostico cercano",
    label: "Celulares",
    statement: "Hablar directo con quien revisa tu equipo mejora el diagnostico desde el primer mensaje.",
    image: "assets/editorial-diagnostico-cercano.png",
  },
  {
    eyebrow: "Rendimiento real",
    label: "PC y notebooks",
    statement: "Temperatura, disco y memoria se leen antes de gastar en hardware que tal vez no hace falta cambiar.",
    image: "assets/editorial-rendimiento-real.png",
  },
  {
    eyebrow: "Decision clara",
    label: "Diagnostico tecnico",
    statement: "No todo caso necesita arreglo: a veces conviene frenar, explicar bien o derivar a tiempo.",
    image: "assets/editorial-decision-clara.png",
  },
];

export const processSteps = [
  ["01", "Escribis", "Contas que equipo es, que sintomas tiene y desde cuando pasa."],
  ["02", "Se revisa", "Se ordena el problema y se descartan supuestos antes de tocar piezas."],
  ["03", "Se explica", "Se comunica con claridad que pasa, que opciones hay y que conviene hacer."],
  ["04", "Se resuelve", "Se repara, se ajusta o se frena si el arreglo no tiene sentido."],
] as const;

export const trustRows = [
  ["Hablas con quien revisa", "Sin intermediarios entre consulta, diagnostico y entrega."],
  ["Primero se confirma la falla", "La revision viene antes que cambiar piezas."],
  ["Si no conviene reparar, se dice", "La recomendacion tambien tiene que cuidar tu plata."],
] as const;

export const faq = [
  ["Conviene llevarlo aunque falle solo a veces?", "Si. Cuando una falla aparece de manera intermitente, el contexto ayuda mucho: cuando pasa, si calienta, si se descarga rapido o si aparece despues de un golpe, humedad o actualizacion."],
  ["Hace falta llevar cargador, funda o accesorios?", "Solo si el problema tiene relacion con carga, bateria, audio, perifericos o compatibilidad. Si no, normalmente alcanza con el equipo y una descripcion clara."],
  ["Tengo informacion importante adentro. Lo aviso antes?", "Si, siempre conviene avisar si hay datos sensibles, cuentas activas o contenido que no queres perder de vista. Eso ordena mejor la revision desde el principio."],
  ["Si ya lo vio otro tecnico, igual sirve consultarlo?", "Si. Lo que te hayan dicho antes puede aportar pistas, pero igual conviene revisar el equipo con criterio propio y no trabajar solo sobre una conclusion ajena."],
] as const;

export const processFaq = [
  ["Sirve mandar fotos o videos antes de acercarlo?", "Si. Una foto de una rotura, un video de la falla o un mensaje bien detallado puede ordenar mucho mejor el caso antes de revisar el equipo en persona."],
  ["Que pasa si la falla aparece y desaparece?", "Tambien se toma en serio. Cuando el problema es intermitente, lo mas util es registrar en que momento aparece y bajo que condiciones para no revisar a ciegas."],
  ["Se aprueba algo antes de avanzar con gastos?", "Si. La idea es ordenar primero el diagnostico y despues decidir con informacion clara si tiene sentido seguir, frenar o buscar otra salida."],
  ["Y si el equipo necesita algo que ya no conviene ponerle?", "Tambien forma parte del proceso decirlo a tiempo. A veces la mejor decision no es avanzar, sino evitar un gasto desproporcionado para el equipo que tenes."],
] as const;

export const aboutFaq = [
  ["Por que rosfix no toma cualquier caso?", "Porque trabajar con criterio tambien implica marcar limites. Tomar algo que no se puede resolver bien solo agrega ruido, falsas expectativas y malas decisiones."],
  ["Decir que no a tiempo tambien es parte del servicio?", "Si. En muchos casos, una respuesta honesta antes de intervenir vale mas que forzar una reparacion que no cierra tecnica ni economicamente."],
  ["Que mira primero un tecnico serio antes de tocar un equipo?", "Sintomas reales, contexto de uso, antecedentes del problema y si alguien ya intervino antes. Sin esa base, cualquier decision tecnica arranca torcida."],
  ["Si mi caso no encaja con lo que haces, igual me lo van a decir claro?", "Si. La idea no es retener cualquier consulta, sino orientar bien cada caso aunque la mejor salida sea no seguir con rosfix."],
] as const;

export const experience = [
  ["Rosario Tecno", "Experiencia en diagnostico y reparacion de celulares, especialmente en dispositivos Apple e iOS, con trabajo tecnico orientado a calidad, tiempos y buena comunicacion."],
  ["Trabajo independiente", "Actividad como tecnico informatico independiente desde 2023, brindando soporte integral, diagnostico de hardware y gestion autonoma de clientes, repuestos y control de calidad."],
  ["Soporte e infraestructura educativa", "Participacion en despliegue tecnico, mantenimiento y resolucion de incidencias de hardware y conectividad en entornos educativos junto al equipo docente del Colegio San Jose / Casa Salesiana."],
];

export const servicesEditorialBlocks: EditorialItem[] = [
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

export const courses: CourseOffer[] = [
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

export const processEditorialSteps: EditorialItem[] = [
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

export const aboutEditorialPrinciples: EditorialItem[] = [
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
