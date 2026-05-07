export type DeviceType = "cellphone" | "notebook" | "desktop" | "other" | "";

export type IntakeSymptom =
  | "no-power"
  | "screen"
  | "battery-charge"
  | "slow-performance"
  | "accounts-software"
  | "heat-noise"
  | "liquid-impact"
  | "data-recovery"
  | "board-level"
  | "other";

export type Urgency = "normal" | "high" | "data-risk" | "";
export type PriorAttempts = "none" | "basic-checks" | "other-tech" | "opened-before" | "";
export type ContactPreference = "whatsapp" | "call-back" | "";

export type IntakeAnswers = {
  deviceType: DeviceType;
  symptoms: IntakeSymptom[];
  urgency: Urgency;
  priorAttempts: PriorAttempts;
  contactPreference: ContactPreference;
  details: string;
};

export type TriageResult = {
  status: "fit" | "out-of-scope" | "unclear";
  title: string;
  guidance: string;
  reasons: string[];
};

export type IntakeStepDefinition = {
  id: "device" | "symptoms" | "context" | "contact" | "review";
  eyebrow: string;
  title: string;
  description: string;
};

export const intakeSteps: IntakeStepDefinition[] = [
  {
    id: "device",
    eyebrow: "Paso 1",
    title: "Que equipo queres revisar",
    description: "Primero se encuadra el tipo de equipo. Eso define si rosfix lo toma o si conviene frenar a tiempo.",
  },
  {
    id: "symptoms",
    eyebrow: "Paso 2",
    title: "Que esta pasando",
    description: "Marca los sintomas mas cercanos. No es un diagnostico final: solo ordena mejor el caso.",
  },
  {
    id: "context",
    eyebrow: "Paso 3",
    title: "Urgencia y antecedentes",
    description: "Con esto se baja el humo: si hay riesgo de datos o si ya lo tocaron, cambia la lectura del caso.",
  },
  {
    id: "contact",
    eyebrow: "Paso 4",
    title: "Como preferis seguir",
    description: "Se define el canal y cualquier detalle libre que te parezca importante sumar.",
  },
  {
    id: "review",
    eyebrow: "Paso 5",
    title: "Revision final antes de WhatsApp",
    description: "Aca ves el resumen, el triage conservador y el mensaje exacto que se va a mandar.",
  },
];

export const deviceOptions: Array<{ value: Exclude<DeviceType, "">; label: string; hint: string }> = [
  { value: "cellphone", label: "Celular", hint: "Android o iPhone con fallas comunes, cuentas o traspasos." },
  { value: "notebook", label: "Notebook", hint: "Equipos lentos, con temperatura, disco, memoria o sistema." },
  { value: "desktop", label: "PC de escritorio", hint: "Chequeos de hardware comun, mantenimiento y rendimiento." },
  { value: "other", label: "Otro equipo", hint: "Si no entra en estas categorias, rosfix puede no tomarlo." },
];

export const symptomOptions: Array<{ value: IntakeSymptom; label: string; hint: string }> = [
  { value: "no-power", label: "No enciende / no arranca", hint: "No prende, reinicia o queda clavado al iniciar." },
  { value: "screen", label: "Pantalla o imagen", hint: "Modulo roto, imagen rara, touch o display." },
  { value: "battery-charge", label: "Bateria / carga", hint: "Se descarga rapido, no carga o el pin falla." },
  { value: "slow-performance", label: "Lentitud o cuelgues", hint: "Va pesado, levanta temperatura o se traba." },
  { value: "accounts-software", label: "Sistema / cuentas / configuracion", hint: "Actualizaciones, cuentas, backups o software comun." },
  { value: "heat-noise", label: "Temperatura o ruido", hint: "Se calienta, suena raro o el cooler trabaja de mas." },
  { value: "liquid-impact", label: "Golpe o humedad", hint: "Hubo caida, liquido o daño fisico y no esta claro el alcance." },
  { value: "data-recovery", label: "Datos importantes en riesgo", hint: "Necesitas cuidar datos o recuperar algo sensible." },
  { value: "board-level", label: "Microsoldadura / placa", hint: "Trabajo de placa fina o board-level, fuera del foco actual." },
  { value: "other", label: "Otro sintoma", hint: "No encaja del todo y necesita contexto adicional." },
];

export const urgencyOptions: Array<{ value: Exclude<Urgency, "">; label: string; hint: string }> = [
  { value: "normal", label: "Normal", hint: "Quiero ordenar el caso sin riesgo inmediato." },
  { value: "high", label: "Alta", hint: "El equipo frena trabajo, estudio o uso diario." },
  { value: "data-risk", label: "Hay datos en riesgo", hint: "La prioridad es no empeorar informacion o accesos." },
];

export const priorAttemptOptions: Array<{ value: Exclude<PriorAttempts, "">; label: string; hint: string }> = [
  { value: "none", label: "Todavia no hice nada", hint: "Caso fresco, sin intervenciones previas." },
  { value: "basic-checks", label: "Solo probe cosas basicas", hint: "Reinicio, cargador, limpieza simple o ajustes de software." },
  { value: "other-tech", label: "Ya lo vio otra persona", hint: "Hubo otro diagnostico o revision previa." },
  { value: "opened-before", label: "Ya lo abrieron o repararon", hint: "Hay antecedente de intervencion interna o cambio de piezas." },
];

export const contactPreferenceOptions: Array<{ value: Exclude<ContactPreference, "">; label: string; hint: string }> = [
  { value: "whatsapp", label: "Seguir por WhatsApp", hint: "Ideal si queres responder con fotos, videos o contexto escrito." },
  { value: "call-back", label: "Pedir que me respondan para coordinar", hint: "Se iguala por WhatsApp, pero con pedido claro de devolucion." },
];

const symptomLabels: Record<IntakeSymptom, string> = {
  "no-power": "No enciende / no arranca",
  screen: "Pantalla o imagen",
  "battery-charge": "Bateria / carga",
  "slow-performance": "Lentitud o cuelgues",
  "accounts-software": "Sistema / cuentas / configuracion",
  "heat-noise": "Temperatura o ruido",
  "liquid-impact": "Golpe o humedad",
  "data-recovery": "Datos importantes en riesgo",
  "board-level": "Microsoldadura / placa",
  other: "Otro sintoma",
};

const deviceLabels: Record<Exclude<DeviceType, "">, string> = {
  cellphone: "Celular",
  notebook: "Notebook",
  desktop: "PC de escritorio",
  other: "Otro equipo",
};

const urgencyLabels: Record<Exclude<Urgency, "">, string> = {
  normal: "Normal",
  high: "Alta",
  "data-risk": "Hay datos en riesgo",
};

const priorAttemptLabels: Record<Exclude<PriorAttempts, "">, string> = {
  none: "Todavia no hice nada",
  "basic-checks": "Solo probe cosas basicas",
  "other-tech": "Ya lo vio otra persona",
  "opened-before": "Ya lo abrieron o repararon",
};

const contactPreferenceLabels: Record<Exclude<ContactPreference, "">, string> = {
  whatsapp: "Seguir por WhatsApp",
  "call-back": "Pedir que me respondan para coordinar",
};

export function formatDeviceType(deviceType: DeviceType) {
  return deviceType ? deviceLabels[deviceType] : "Sin definir";
}

export function formatSymptoms(symptoms: IntakeSymptom[]) {
  return symptoms.map((symptom) => symptomLabels[symptom]).join(", ");
}

export function formatUrgency(urgency: Urgency) {
  return urgency ? urgencyLabels[urgency] : "Sin definir";
}

export function formatPriorAttempts(priorAttempts: PriorAttempts) {
  return priorAttempts ? priorAttemptLabels[priorAttempts] : "Sin definir";
}

export function formatContactPreference(contactPreference: ContactPreference) {
  return contactPreference ? contactPreferenceLabels[contactPreference] : "Sin definir";
}

export function deriveTriage(answers: IntakeAnswers): TriageResult {
  const reasons: string[] = [];
  const hasSupportedDevice = answers.deviceType === "cellphone" || answers.deviceType === "notebook" || answers.deviceType === "desktop";
  const hasBoardLevel = answers.symptoms.includes("board-level");
  const hasRiskyContext =
    answers.urgency === "data-risk" ||
    answers.symptoms.includes("liquid-impact") ||
    answers.symptoms.includes("data-recovery") ||
    answers.priorAttempts === "other-tech" ||
    answers.priorAttempts === "opened-before" ||
    answers.symptoms.includes("other");

  if (!hasSupportedDevice || hasBoardLevel) {
    if (!hasSupportedDevice) {
      reasons.push("El equipo no entra en celulares, notebooks o PC de escritorio.");
    }

    if (hasBoardLevel) {
      reasons.push("La consulta apunta a trabajo de placa fina o microsoldadura.");
    }

    return {
      status: "out-of-scope",
      title: "Puede quedar fuera del alcance actual",
      guidance: "Antes de prometer una revision, conviene frenar y confirmar si rosfix realmente toma este tipo de caso.",
      reasons,
    };
  }

  const fitSymptoms = answers.symptoms.every((symptom) =>
    ["no-power", "screen", "battery-charge", "slow-performance", "accounts-software", "heat-noise"].includes(symptom),
  );

  if (fitSymptoms && answers.urgency !== "data-risk" && ["none", "basic-checks"].includes(answers.priorAttempts)) {
    reasons.push("El equipo entra en el alcance actual de rosfix.");
    reasons.push("Los sintomas parecen compatibles con una revision inicial comun.");

    return {
      status: "fit",
      title: "Puede encajar para una revision inicial",
      guidance: "Lo mas razonable es seguir por WhatsApp con este resumen para ordenar diagnostico, tiempos y siguiente paso sin vender certeza de mas.",
      reasons,
    };
  }

  if (hasRiskyContext) {
    if (answers.urgency === "data-risk") {
      reasons.push("Hay riesgo de datos o accesos sensibles.");
    }

    if (answers.symptoms.includes("liquid-impact")) {
      reasons.push("Hubo golpe o humedad y el alcance real puede cambiar al revisar.");
    }

    if (answers.symptoms.includes("data-recovery")) {
      reasons.push("La prioridad es cuidar informacion, no prometer una solucion cerrada.");
    }

    if (answers.priorAttempts === "other-tech" || answers.priorAttempts === "opened-before") {
      reasons.push("Ya hubo intervenciones previas y eso puede distorsionar el caso inicial.");
    }

    if (answers.symptoms.includes("other")) {
      reasons.push("Hay sintomas que no encajan del todo en una categoria clara.");
    }
  }

  if (reasons.length === 0) {
    reasons.push("El caso necesita un poco mas de contexto antes de ubicarlo con seguridad.");
  }

  return {
    status: "unclear",
    title: "Conviene revisar con cautela",
    guidance: "Segui por WhatsApp, pero como caso abierto: hace falta contexto adicional antes de decir si entra limpio, si cambia la prioridad o si conviene derivar.",
    reasons,
  };
}

function normalizeDetails(details: string) {
  return details.replace(/\s+/g, " ").trim();
}

export function buildWhatsAppMessage(answers: IntakeAnswers, triage: TriageResult) {
  const lines = [
    "Hola Leandro, te mando el intake guiado de rosfix.",
    "",
    `• Equipo: ${formatDeviceType(answers.deviceType)}`,
    `• Sintomas: ${formatSymptoms(answers.symptoms)}`,
    `• Urgencia: ${formatUrgency(answers.urgency)}`,
    `• Intentos previos: ${formatPriorAttempts(answers.priorAttempts)}`,
    `• Preferencia de contacto: ${formatContactPreference(answers.contactPreference)}`,
  ];

  const details = normalizeDetails(answers.details);

  if (details) {
    lines.push(`• Detalles extra: ${details}`);
  }

  lines.push(
    "",
    `• Triage rosfix: ${triage.title}`,
    `• Siguiente paso sugerido: ${triage.guidance}`,
    `• Motivos: ${triage.reasons.join(" / ")}`,
  );

  return lines.join("\n");
}
