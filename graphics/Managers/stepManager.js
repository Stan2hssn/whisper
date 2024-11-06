import Common from "../Common";

export default class StepManager {
  constructor(cameraManager) {
    this.currentStep = 1;
    this.lastTriggeredStep = -1; // Track which step was last triggered
    this.steps = [];
  }

  addStep(steps) {
    this.steps.push(steps);
  }

  setCurrentStep(step) {
    if (this.currentStep !== step) {
      this.currentStep = step;
      this.triggerStep();
    }
  }

  triggerStep() {
    if (this.lastTriggeredStep !== this.currentStep) {
      this.lastTriggeredStep = this.currentStep;

      if (this.steps[this.currentStep]) {
        this.steps[this.currentStep].update(); // Execute the step callback
      }
    }
  }

  render() {
    // Optional: If render needs to react based on the step manager
    this.triggerStep();
  }
}
