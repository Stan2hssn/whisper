import Emotions from "./DOM/emotions.js";

class DOM {
  Component = {};

  constructor() {}

  init() {
    this.Component.emotions = new Emotions();
  }

  updateComponent(componentToShow) {
    // Handle component updates if needed
    Object.keys(this.Component).forEach((key) => {
      if (
        typeof this.Component[key].show &&
        typeof this.Component[key].hide === "function"
      ) {
        if (key !== componentToShow) {
          this.Component[key].hide();
        } else {
          this.Component[key].show();
        }
      }
    });
  }

  render(t) {
    if (this.Component.emotion) {
      this.Component.emotion.render(t);
    }
  }

  resize() {
    if (this.Component.emotion) {
      this.Component.emotion.resize();
    }
  }

  setDebug(debug) {
    // Handle debugging for DOM components if needed
  }
}

export default new DOM();
