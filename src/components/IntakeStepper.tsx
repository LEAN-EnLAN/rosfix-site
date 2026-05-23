import type { IntakeStepDefinition } from "./diagnostic-intake.model";

type IntakeStepperProps = {
  steps: IntakeStepDefinition[];
  currentStep: number;
};

export function IntakeStepper({
  steps,
  currentStep,
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
    </div>
  );
}
