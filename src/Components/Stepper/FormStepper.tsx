import React from 'react';
import './FormStepper.css';

interface FormStepperProps {
  steps: string[];
  currentStep: number;
  visited: boolean[];
  handleStepChange: (step: number) => void;
  getButtonColor: (index: number) => string;
  isButtonDisabled: (index: number) => boolean;
}

const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  handleStepChange,
  getButtonColor,
  isButtonDisabled,
}) => {
  return (
    <div className="main-container">
      {steps.map((step, index) => (
        <button
          key={index}
          className="button-stepper"
          onClick={() => handleStepChange(index)}
          disabled={isButtonDisabled(index)}
          style={{
            backgroundColor: getButtonColor(index),
            cursor: isButtonDisabled(index) ? 'not-allowed' : 'pointer',
          }}
        >
          {step}
        </button>
      ))}
    </div>
  );
};

export default FormStepper;
