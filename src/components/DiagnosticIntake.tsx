import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { IntakeStepper } from "./IntakeStepper";
import { IntakeSummary } from "./IntakeSummary";
import {
  buildWhatsAppMessage,
  contactPreferenceOptions,
  deriveTriage,
  deviceOptions,
  formatContactPreference,
  formatDeviceType,
  formatPriorAttempts,
  formatSymptoms,
  formatUrgency,
  intakeSteps,
  priorAttemptOptions,
  symptomOptions,
  urgencyOptions,
  type IntakeAnswers,
} from "./diagnostic-intake.model";

type IntakeField = keyof IntakeAnswers;
type IntakeErrors = Partial<Record<IntakeField, string>>;

const initialAnswers: IntakeAnswers = {
  deviceType: "",
  symptoms: [],
  urgency: "",
  priorAttempts: "",
  contactPreference: "",
  details: "",
};

export function DiagnosticIntake({ whatsAppNumber }: { whatsAppNumber: string }) {
  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [reviewConfirmed, setReviewConfirmed] = useState(false);

  const triage = useMemo(() => deriveTriage(answers), [answers]);
  const whatsAppMessage = useMemo(() => buildWhatsAppMessage(answers, triage), [answers, triage]);

  const summarySections = useMemo(
    () => [
      { title: "Equipo", value: formatDeviceType(answers.deviceType), stepIndex: 0 },
      { title: "Sintomas", value: formatSymptoms(answers.symptoms), stepIndex: 1 },
      {
        title: "Contexto",
        value: `${formatUrgency(answers.urgency)} · ${formatPriorAttempts(answers.priorAttempts)}`,
        stepIndex: 2,
      },
      {
        title: "Contacto y detalles",
        value: [formatContactPreference(answers.contactPreference), answers.details.trim()].filter(Boolean).join(" · "),
        stepIndex: 3,
      },
    ],
    [answers],
  );

  const updateAnswers = (patch: Partial<IntakeAnswers>, fieldsToClear: IntakeField[] = []) => {
    setAnswers((current) => ({ ...current, ...patch }));
    setReviewConfirmed(false);

    if (fieldsToClear.length > 0) {
      setErrors((current) => {
        const next = { ...current };
        fieldsToClear.forEach((field) => delete next[field]);
        return next;
      });
    }
  };

  const toggleSymptom = (value: IntakeAnswers["symptoms"][number]) => {
    const nextSymptoms = answers.symptoms.includes(value)
      ? answers.symptoms.filter((item) => item !== value)
      : [...answers.symptoms, value];

    updateAnswers({ symptoms: nextSymptoms }, ["symptoms"]);
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors: IntakeErrors = {};

    if (stepIndex === 0 && !answers.deviceType) {
      nextErrors.deviceType = "Elegi el tipo de equipo para seguir.";
    }

    if (stepIndex === 1 && answers.symptoms.length === 0) {
      nextErrors.symptoms = "Marca al menos un sintoma para poder ordenar el caso.";
    }

    if (stepIndex === 2) {
      if (!answers.urgency) {
        nextErrors.urgency = "Marca la prioridad actual del caso.";
      }

      if (!answers.priorAttempts) {
        nextErrors.priorAttempts = "Conta si ya hubo intentos o revisiones previas.";
      }
    }

    if (stepIndex === 3 && !answers.contactPreference) {
      nextErrors.contactPreference = "Defini como queres continuar esta consulta.";
    }

    setErrors((current) => ({ ...current, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, intakeSteps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const nextLabel = currentStep === intakeSteps.length - 2 ? "Ver resumen final" : "Siguiente paso";

  return (
    <section id="diagnostico-intake" className="intake-shell" aria-label="Intake guiado de diagnostico">
      <div className="intake-shell__header">
        <span>Intake guiado</span>
        <h2>Ordena el caso antes de abrir WhatsApp.</h2>
        <p>
          Son cinco pasos cortos. La idea no es diagnosticar desde la web, sino llegar a WhatsApp con contexto util y una lectura
          conservadora.
        </p>
      </div>

      <IntakeStepper
        steps={intakeSteps}
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        canGoBack={currentStep > 0}
        canGoNext={currentStep < intakeSteps.length - 1}
        nextLabel={nextLabel}
      />

      <div className="intake-panel">
        {currentStep < intakeSteps.length - 1 ? (
          <>
            <header className="intake-panel__head">
              <span>{intakeSteps[currentStep].eyebrow}</span>
              <h3>{intakeSteps[currentStep].title}</h3>
              <p>{intakeSteps[currentStep].description}</p>
            </header>

            {currentStep === 0 ? (
              <div className="intake-choice-grid" role="radiogroup" aria-label="Tipo de equipo">
                {deviceOptions.map((option) => {
                  const checked = answers.deviceType === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`intake-choice-card${checked ? " is-selected" : ""}`}
                      onClick={() => updateAnswers({ deviceType: option.value }, ["deviceType"])}
                      aria-pressed={checked}
                    >
                      <span>{option.label}</span>
                      <strong>{option.hint}</strong>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {currentStep === 1 ? (
              <div className="intake-choice-grid intake-choice-grid--symptoms">
                {symptomOptions.map((option) => {
                  const checked = answers.symptoms.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`intake-choice-card${checked ? " is-selected" : ""}`}
                      onClick={() => toggleSymptom(option.value)}
                      aria-pressed={checked}
                    >
                      <span>{option.label}</span>
                      <strong>{option.hint}</strong>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div className="intake-stack">
                <div className="intake-fieldset">
                  <span className="intake-fieldset__label">Urgencia</span>
                  <div className="intake-choice-grid intake-choice-grid--compact">
                    {urgencyOptions.map((option) => {
                      const checked = answers.urgency === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`intake-choice-card${checked ? " is-selected" : ""}`}
                          onClick={() => updateAnswers({ urgency: option.value }, ["urgency"])}
                          aria-pressed={checked}
                        >
                          <span>{option.label}</span>
                          <strong>{option.hint}</strong>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="intake-fieldset">
                  <span className="intake-fieldset__label">Intentos previos</span>
                  <div className="intake-choice-grid intake-choice-grid--compact">
                    {priorAttemptOptions.map((option) => {
                      const checked = answers.priorAttempts === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`intake-choice-card${checked ? " is-selected" : ""}`}
                          onClick={() => updateAnswers({ priorAttempts: option.value }, ["priorAttempts"])}
                          aria-pressed={checked}
                        >
                          <span>{option.label}</span>
                          <strong>{option.hint}</strong>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="intake-stack">
                <div className="intake-fieldset">
                  <span className="intake-fieldset__label">Preferencia de contacto</span>
                  <div className="intake-choice-grid intake-choice-grid--compact">
                    {contactPreferenceOptions.map((option) => {
                      const checked = answers.contactPreference === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`intake-choice-card${checked ? " is-selected" : ""}`}
                          onClick={() => updateAnswers({ contactPreference: option.value }, ["contactPreference"])}
                          aria-pressed={checked}
                        >
                          <span>{option.label}</span>
                          <strong>{option.hint}</strong>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="intake-textarea">
                  <span>Detalle opcional</span>
                  <textarea
                    rows={5}
                    value={answers.details}
                    onChange={(event) => updateAnswers({ details: event.target.value })}
                    placeholder="Marca aca cualquier contexto fino: si se mojo, si pasa a cierta hora, si hay cuentas sensibles, si el equipo es de trabajo, etc."
                  />
                  <small>Opcional. Si no suma, no inventes texto: mejor corto y honesto.</small>
                </label>
              </div>
            ) : null}

            {Object.entries(errors)
              .filter(([field]) => {
                if (currentStep === 0) return field === "deviceType";
                if (currentStep === 1) return field === "symptoms";
                if (currentStep === 2) return field === "urgency" || field === "priorAttempts";
                if (currentStep === 3) return field === "contactPreference";
                return false;
              })
              .map(([field, message]) => (
                <div key={field} className="intake-inline-error" role="alert">
                  <AlertCircle size={16} />
                  <span>{message}</span>
                </div>
              ))}

            <div className="intake-panel__note">
              <CheckCircle2 size={16} />
              <p>
                {currentStep === 0 && "Si elegis otro equipo, el triage va a frenar antes de prometer una revision que no corresponde."}
                {currentStep === 1 && "Si marcas sintomas de placa, datos o golpe/humedad, el resumen va a quedar mas conservador."}
                {currentStep === 2 && "Urgencia alta no implica prioridad garantizada: solo ayuda a leer mejor el contexto del caso."}
                {currentStep === 3 && "WhatsApp recien se abre en la revision final, con todo el resumen ordenado."}
              </p>
            </div>
          </>
        ) : (
          <IntakeSummary
            triage={triage}
            steps={intakeSteps}
            sections={summarySections}
            whatsAppMessage={whatsAppMessage}
            reviewConfirmed={reviewConfirmed}
            onReviewConfirm={setReviewConfirmed}
            onEditStep={setCurrentStep}
            whatsAppNumber={whatsAppNumber}
          />
        )}
      </div>
    </section>
  );
}
