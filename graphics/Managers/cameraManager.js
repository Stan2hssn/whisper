import { PerspectiveCamera, OrthographicCamera, Vector3 } from "three";
import Device from "../pure/Device.js";
import Common from "../Common.js";
import gsap from "gsap";

class CameraManager {
  constructor(params) {
    this.params = params;
    this.currentPosition = new Vector3();
    this.currentLookingAt = new Vector3();
    this.offset = 0;

    this.cameras = {
      instanceCamera: null,
      mainCamera: null,
      projectionCamera: null,
      reflectionCamera: null,
    };

    this.animateTo = this.animateTo.bind(this);
  }

  getPerspectiveCamera() {
    return new PerspectiveCamera(
      this.params.cameraFov,
      Device.viewport.width / Device.viewport.height,
      this.params.cameraNear,
      this.params.cameraFar,
    );
  }

  getOrthographicCamera() {
    return new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  }

  createCameras({ startPosition, startKeyLookAt }) {
    // Create Perspective Camera
    this.cameras.instanceCamera = this.getPerspectiveCamera();

    // Create Orthographic Camera
    this.cameras.mainCamera = this.getOrthographicCamera();

    // Create projection Camera
    this.cameras.projectionCamera = this.getPerspectiveCamera();

    // Create reflection Camera
    this.cameras.reflectionCamera = this.getPerspectiveCamera();

    // Set initial camera animation parameters
    this.setupCameraAnimation({ startPosition, startKeyLookAt });
  }

  setupCameraAnimation({ startPosition, startKeyLookAt }) {
    this.currentPosition.set(startPosition.x, startPosition.y, startPosition.z);

    this.currentLookingAt.set(
      startKeyLookAt.x,
      startKeyLookAt.y,
      startKeyLookAt.z,
    );
  }

  render() {
    this.cameras.reflectionCamera.position.set(
      this.cameras.instanceCamera.position.x,
      -this.cameras.instanceCamera.position.y + this.offset,
      this.cameras.instanceCamera.position.z,
    );
    this.cameras.reflectionCamera.lookAt(
      this.currentLookingAt.x,
      -this.currentLookingAt.y,
      this.currentLookingAt.z,
    );
  }

  animateTo(keyPositions, keyLookAt) {
    gsap.to(this.currentPosition, {
      duration: 3,
      x: keyPositions.x,
      y: keyPositions.y,
      z: keyPositions.z,
      ease: "power2.inOut",
      onUpdate: () => {
        if (this.cameras.instanceCamera) {
          this.cameras.instanceCamera.position.copy(this.currentPosition);
        }
      },
    });

    gsap.to(this.currentLookingAt, {
      duration: 3.2,
      x: keyLookAt.x,
      y: keyLookAt.y,
      z: keyLookAt.z,
      ease: "power2.inOut",
      onUpdate: () => {
        if (this.cameras.instanceCamera) {
          this.cameras.instanceCamera.lookAt(this.currentLookingAt);
        }
      },
    });
  }

  resizeCamera(camera, depth = false) {
    const aspect = Device.viewport.width / Device.viewport.height;

    if (depth) {
      let depthCamera = camera;
      depthCamera.position.set(2, 2, 9);
      depthCamera.aspect = aspect;
    } else {
      camera.aspect = aspect;
      camera.position.copy(this.currentPosition);
      camera.lookAt(this.currentLookingAt);
    }

    camera.updateProjectionMatrix();
  }

  resizeCameras(aspect) {
    if (this.cameras.instanceCamera) {
      this.resizeCamera(this.cameras.instanceCamera);
    }
    if (this.cameras.mainCamera) {
      this.cameras.mainCamera.left = -1;
      this.cameras.mainCamera.right = 1;
      this.cameras.mainCamera.top = 1;
      this.cameras.mainCamera.bottom = -1;

      this.cameras.mainCamera.position.set(0, 0, 1);

      this.cameras.mainCamera.updateProjectionMatrix();
    }
    this.cameras.projectionCamera.position.set(0, 1.8 * aspect, 28);
    this.cameras.projectionCamera.lookAt(0, 0, 28);
    this.cameras.projectionCamera.aspect = 2.26;
    this.cameras.projectionCamera.updateProjectionMatrix();
    this.cameras.projectionCamera.updateMatrixWorld();

    this.cameras.reflectionCamera.aspect = aspect;
    this.cameras.reflectionCamera.updateProjectionMatrix();
  }

  setDebug(debug) {
    if (!debug) {
      console.error("Debug object is not defined.");
      return;
    }

    // Set up debug bindings
    this.debug = debug;
    const camFolder = this.debug.addFolder({ title: "Camera" });
    camFolder.addBinding(this, "offset", {
      label: "Offset",
      min: 0,
      max: 20,
      step: 1,
    });
  }
}

export default CameraManager;
