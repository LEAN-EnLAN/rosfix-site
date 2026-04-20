import { ChevronLeft, ChevronRight } from "lucide-react";
import type { IntakeStepDefinition } from "./diagnostic-intake.model";

type IntakeStepperProps = {
  steps: IntakeStepDefinition[];
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  nextLabel: string;
};

export function IntakeStepper({
  steps,
  currentStep,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  nextLabel,
}: IntakeStepperProps) {
  return (
    <div className="intake-stepper">
      <div className="intake-stepper__status">
        <span>Progreso</span>
        <strong>
          Paso {currentStep + 1} de {steps.length}
        </strong>
      </div>

      <ol className="intake-stepper__list" aria-label="Pasos del intake">
        {steps.map((step, index) => {
          const isCurrent = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <li
              key={step.id}
              className={`intake-stepper__item${isCurrent ? " is-current" : ""}${isComplete ? " is-complete" : ""}`}
            >
              <span className="intake-stepper__marker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="intake-stepper__copy">
                <small>{step.eyebrow}</small>
                <strong>{step.title}</strong>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="intake-stepper__controls">
        <button type="button" className="secondary-action" onClick={onBack} disabled={!canGoBack}>
          <ChevronLeft size={16} />
          Volver
        </button>

        {canGoNext ? (
          <button type="button" className="primary-action" onClick={onNext}>
            {nextLabel}
            <ChevronRight size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
