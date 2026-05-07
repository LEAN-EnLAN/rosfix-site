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
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="intake-stepper">
      <div className="intake-stepper__status">
        <strong>
          Paso {currentStep + 1} de {steps.length}
        </strong>
        <span>{steps[currentStep].title}</span>
      </div>
      <div className="intake-stepper__bar" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length}>
        <span style={{ width: `${progress}%` }} />
      </div>
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
