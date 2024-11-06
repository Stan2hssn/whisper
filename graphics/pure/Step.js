import Common from "../Common";
import DOM from "../DOM";

export default class Step {
  constructor({ keyPositions, keyLookAt, componentToShow }) {
    this.keyPositions = keyPositions;
    this.keyLookAt = keyLookAt;
    this.componentToShow = componentToShow;
  }

  update() {
    Common.cameraManager.animateTo(this.keyPositions, this.keyLookAt);

    if (!this.componentToShow) return;
    DOM.updateComponent(this.componentToShow);
  }
}
