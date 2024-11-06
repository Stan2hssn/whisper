import Managers from "./pure/Managers.js";

import Device from "./pure/Device.js";
import { Pane } from "tweakpane";

import Step from "./pure/Step.js";

class Common {
  constructor() {
    this.params = {
      sceneColor: 0x222222,
      cameraFov: 52,
      cameraNear: 0.1,
      cameraFar: 800.0,
    };

    this.stepManager = Managers.StepManager();
    this.sceneManager = Managers.Scene(this.params);
    this.cameraManager = Managers.Camera(this.params);
    this.rendererManager = Managers.Renderer();

    this.render = this.render.bind(this);
  }

  init({ canvas }) {
    this.rendererManager.initRender({ canvas });
    this.sceneManager.setupScenes();

    // Create Cameras
    this.cameraManager.createCameras({
      startPosition: { x: 0, y: 4, z: 30 },
      startKeyLookAt: { x: 0, y: 0, z: 28 },
    });

    // Add steps
    this.stepManager.addStep(
      new Step({
        keyPositions: { x: 0, y: 4, z: 30 },
        keyLookAt: { x: 0, y: 0, z: 28 },
        componentToShow: undefined,
      }),
    );
    this.stepManager.addStep(
      new Step({
        keyPositions: { x: 0, y: 2, z: 8 },
        keyLookAt: { x: 0, y: 1, z: 0 },
        componentToShow: "emotions",
      }),
    );
    this.stepManager.addStep(
      new Step({
        keyPositions: { x: 8, y: 1, z: 8 },
        keyLookAt: { x: 0, y: 2, z: 0 },
        componentToShow: "text",
      }),
    );

    console.log("this.stepManager", this.stepManager);
  }

  render(t) {
    this.stepManager.render();
    this.cameraManager.render(t);
  }

  dispose() {
    if (this.rendererManager.renderer) {
      this.rendererManager.renderer.dispose();
    }
  }

  resize() {
    const parentElement =
      this.rendererManager.renderer.domElement.parentElement;
    Device.viewport.width = parentElement.offsetWidth;
    Device.viewport.height = parentElement.offsetHeight;
    Device.pixelRatio = window.devicePixelRatio;

    const aspectRatio = Device.viewport.width / Device.viewport.height;
    Device.aspectRatio = aspectRatio;

    this.cameraManager.resizeCameras(aspectRatio);
    this.rendererManager.resizeRenderer(aspectRatio);
  }

  setDebug() {
    this.debug = new Pane();
    this.cameraManager.setDebug(this.debug);

    // Add a debug button to change steps
    const stepButton = this.debug.addButton({ title: "Next Step" });
    stepButton.on("click", () => {
      const nextStep = (this.stepManager.currentStep + 1) % 3; // Assuming 3 steps
      this.stepManager.setCurrentStep(nextStep);
    });
  }
}

export default new Common();
