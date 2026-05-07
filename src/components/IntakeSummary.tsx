import { AlertTriangle, CheckCircle2, CircleHelp, FileText } from "lucide-react";
import { WhatsAppExportButton } from "./WhatsAppExportButton";
import type { IntakeStepDefinition, TriageResult } from "./diagnostic-intake.model";

type SummarySection = {
  title: string;
  value: string;
  stepIndex: number;
};

type IntakeSummaryProps = {
  triage: TriageResult;
  steps: IntakeStepDefinition[];
  sections: SummarySection[];
  whatsAppMessage: string;
  reviewConfirmed: boolean;
  onReviewConfirm: (value: boolean) => void;
  onEditStep: (stepIndex: number) => void;
  whatsAppNumber: string;
};

const triageMeta = {
  fit: {
    icon: CheckCircle2,
    eyebrow: "Encaje probable",
  },
  "out-of-scope": {
    icon: AlertTriangle,
    eyebrow: "Fuera de foco",
  },
  unclear: {
    icon: CircleHelp,
    eyebrow: "Lectura abierta",
  },
} as const;

export function IntakeSummary({
  triage,
  sections,
  steps,
  whatsAppMessage,
  reviewConfirmed,
  onReviewConfirm,
  onEditStep,
  whatsAppNumber,
}: IntakeSummaryProps) {
  const meta = triageMeta[triage.status];
  const Icon = meta.icon;

  return (
    <div className="intake-summary">
      <article className={`intake-triage intake-triage--${triage.status}`}>
        <div className="intake-triage__heading">
          <span>{meta.eyebrow}</span>
          <div>
            <Icon size={20} />
            <strong>{triage.title}</strong>
          </div>
        </div>
        <p>{triage.guidance}</p>
        <ul>
          {triage.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </article>

      <div className="intake-summary__grid">
        <section className="intake-summary__panel">
          <div className="intake-summary__panel-head">
            <span>Revision</span>
            <h3>Lo que se va a mandar</h3>
            <p>Podes volver al paso exacto que haga falta sin perder lo ya cargado.</p>
          </div>

          <div className="intake-summary__sections">
            {sections.map((section) => (
              <article key={section.title} className="intake-summary__section">
                <div>
                  <span>{steps[section.stepIndex]?.eyebrow}</span>
                  <strong>{section.title}</strong>
                </div>
                <p>{section.value}</p>
                <button type="button" className="secondary-action intake-summary__edit" onClick={() => onEditStep(section.stepIndex)}>
                  Editar este paso
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="intake-summary__panel intake-summary__panel--message">
          <div className="intake-summary__panel-head">
            <span>WhatsApp final</span>
            <h3>Mensaje estructurado</h3>
            <p>Se abre solo desde este estado revisado. Nada de mandar media consulta a mitad de camino.</p>
          </div>

          <div className="intake-summary__message">
            <div className="intake-summary__message-head">
              <FileText size={18} />
              <strong>Preview exacta</strong>
            </div>
            <pre>{whatsAppMessage}</pre>
          </div>

          <label className="intake-summary__confirm">
            <input type="checkbox" checked={reviewConfirmed} onChange={(event) => onReviewConfirm(event.target.checked)} />
            <span>Revise el resumen y quiero abrir WhatsApp con esta version final.</span>
          </label>

          <WhatsAppExportButton phoneNumber={whatsAppNumber} message={whatsAppMessage} disabled={!reviewConfirmed} />
        </section>
      </div>
    </div>
  );
}
