import gsap from "gsap";

export default class {
  constructor() {
    // Variables
    this.japaneseList = null;
    this.japaneseItems = [];
    this.translatedList = null;
    this.translatedItems = [];
    this.totalItems = 0;
    this.slideWidth = 0;
    this.currentIndex = 0;
    this.isSetup = false;

    // Flame drag related variables
    this.container = null;
    this.flame = null;
    this.isDragging = false;
    this.startY = 0;
    this.currentTranslateY = 0;

    // Carousel variable is intended to be a global variable
    this.currentPercentage = 0;

    // Bind methods to the correct context
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.onFlameMouseDown = this.onFlameMouseDown.bind(this);
    this.onFlameTouchStart = this.onFlameTouchStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
  }

  show() {
    this.createDOMElements();
    this.cacheDOMElements();
    this.setupCarousel();
    this.setupFlameDrag();
    this.addEventListeners();

    gsap
      .to(this.main, {
        display: "flex",
      })
      .then(() => {
        gsap.to(this.main, {
          opacity: 1,
          duration: 1,
          delay: 2,
          ease: "power2.inOut",
        });
      });
  }

  hide() {
    gsap
      .to(this.main, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      })
      .then(() => {
        this.removeEventListeners();
        this.removeDOMElements();
      });
  }

  // Create the DOM elements

  createDOMElements() {
    // Create the 'emotions' container
    this.main = document.createElement("div");
    this.main.classList.add("emotions");

    // Create the 'emotionsColor' div
    const emotionsColor = document.createElement("div");
    emotionsColor.classList.add("emotionsColor");

    // Create the 'carousel' div
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    // Create the 'arrow prev' div
    const prevArrow = document.createElement("div");
    prevArrow.classList.add("arrow", "prev");
    prevArrow.innerHTML = `
      <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.13395 11.91L6.07295 12.97L0.29395 7.193C0.200796 7.10043 0.126867 6.99036 0.0764193 6.86911C0.0259713 6.74786 0 6.61783 0 6.4865C0 6.35517 0.0259713 6.22514 0.0764193 6.10389C0.126867 5.98264 0.200796 5.87257 0.29395 5.78L6.07295 0L7.13295 1.06L1.70895 6.485L7.13395 11.91Z" fill="white"/>
      </svg>
    `;

    // Create the 'arrow next' div
    const nextArrow = document.createElement("div");
    nextArrow.classList.add("arrow", "next");
    nextArrow.innerHTML = `
      <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.19345e-05 1.05997L1.06102 -2.86102e-05L6.84002 5.77697C6.93318 5.86954 7.0071 5.97961 7.05755 6.10086C7.108 6.22212 7.13397 6.35214 7.13397 6.48347C7.13397 6.6148 7.108 6.74483 7.05755 6.86608C7.0071 6.98733 6.93318 7.0974 6.84002 7.18997L1.06102 12.97L0.00102186 11.91L5.42502 6.48497L2.19345e-05 1.05997Z" fill="white"/>
      </svg>
    `;

    // Create the 'emotionsJapanese' ul and its li items
    const emotionsJapanese = document.createElement("ul");
    emotionsJapanese.classList.add("emotionsJapanese");
    const japaneseItems = ["チャンス", "富", "お金", "仕事", "人生"];
    japaneseItems.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      emotionsJapanese.appendChild(li);
    });

    // Create the 'emotionsTranslated' ul and its li items
    const emotionsTranslated = document.createElement("ul");
    emotionsTranslated.classList.add("emotionsTranslated");
    const translatedItems = [
      "Chance",
      "Réusite",
      "Richesse",
      "Santé",
      "Travail",
    ];
    translatedItems.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      emotionsTranslated.appendChild(li);
    });

    // Create the 'emotionDescription' p
    const emotionDescription = document.createElement("p");
    emotionDescription.classList.add("emotionDescription");
    emotionDescription.innerHTML =
      "Veuillez choisir la valeur que vous souhaitez <br /> transmettre à l’atelier pour vos voeux de fin d’année";

    // Build the structure
    carousel.appendChild(prevArrow);
    carousel.appendChild(emotionsJapanese);
    carousel.appendChild(nextArrow);

    emotionsColor.appendChild(carousel);
    emotionsColor.appendChild(emotionsTranslated);
    emotionsColor.appendChild(emotionDescription);

    // Create the 'emotionsIntensity' div and its children
    const emotionsIntensity = document.createElement("div");
    emotionsIntensity.classList.add("emotionsIntensity");

    const dragContainer = document.createElement("div");
    dragContainer.classList.add("dragContainer");

    const flame = document.createElement("div");
    flame.classList.add("flame");

    dragContainer.appendChild(flame);
    emotionsIntensity.appendChild(dragContainer);

    // Append 'emotionsColor' and 'emotionsIntensity' to 'main' (this.main)
    this.main.appendChild(emotionsColor);
    this.main.appendChild(emotionsIntensity);

    // Append 'main' to the container
    const container = document.querySelector(".container");
    container.appendChild(this.main);
  }

  cacheDOMElements() {
    this.main = document.querySelector(".emotions");
    this.japaneseList = this.main.querySelector(".emotionsJapanese");
    this.japaneseItems = this.main.querySelectorAll(".emotionsJapanese li");
    this.translatedList = this.main.querySelector(".emotionsTranslated");
    this.translatedItems = this.main.querySelectorAll(".emotionsTranslated li");
    this.container = this.main.querySelector(".dragContainer");
    this.flame = this.container.querySelector(".flame");
    this.totalItems = this.japaneseItems.length;
    const padding = 32;
    this.gap = 16;

    if (this.totalItems > 0) {
      this.slideWidth = this.japaneseItems[0].clientWidth + padding * 2;
    }
  }

  setupCarousel() {
    if (this.totalItems === 0) return;

    // Set widths for items and lists
    this.japaneseItems.forEach((item) => {
      this.japaneseList.style.width = `${this.slideWidth}px`;
      item.style.width = `${this.slideWidth}px`;
    });

    this.translatedItems.forEach((item) => {
      this.translatedList.style.width = `${this.slideWidth}px`;
      item.style.width = `${this.slideWidth}px`;
    });

    this.isSetup = true;
  }

  setupFlameDrag() {
    // Mouse event listeners
    this.flame.addEventListener("mousedown", this.onFlameMouseDown, {
      passive: false,
    });

    // Touch event listeners
    this.flame.addEventListener("touchstart", this.onFlameTouchStart, {
      passive: false,
    });
  }

  // Flame drag methods

  onFlameMouseDown(e) {
    this.isDragging = true;
    this.startY = e.clientY; // Store the initial Y position
    document.addEventListener("mousemove", this.onDrag, {
      passive: false,
    });
    document.addEventListener("mouseup", this.stopDragging, {
      passive: false,
    });
  }

  onFlameTouchStart(e) {
    this.isDragging = true;
    this.startY = e.touches[0].clientY; // Store the initial Y position for touch
    document.addEventListener("touchmove", this.onDrag, {
      passive: false,
    });
    document.addEventListener("touchend", this.stopDragging, {
      passive: false,
    });
  }

  onDrag(e) {
    if (!this.isDragging) return;

    // Get current position based on mouse or touch
    const currentY = e.type.includes("mouse")
      ? e.clientY
      : e.touches[0].clientY;
    const deltaY = currentY - this.startY;

    // Get necessary dimensions
    const containerHeight = this.container.clientHeight;
    const flameHeight = this.flame.clientHeight;

    // Calculate new translation value
    let newTranslateY = this.currentTranslateY + deltaY;

    // Define new translation limits
    const minTranslateY = flameHeight * 0.5; // Upper limit
    const maxTranslateY = -(containerHeight - flameHeight * 0.25); // Lower limit

    // Constrain movement within limits
    if (newTranslateY > minTranslateY) {
      newTranslateY = minTranslateY;
    }
    if (newTranslateY < maxTranslateY) {
      newTranslateY = maxTranslateY;
    }

    // Apply transformation using translate3D
    this.flame.style.transform = `translate3d(0, ${newTranslateY}px, 0)`;

    // Calculate slider position percentage
    const totalRange = maxTranslateY - minTranslateY;
    this.currentPercentage =
      ((newTranslateY - minTranslateY) / totalRange) * 100;
  }

  stopDragging() {
    this.isDragging = false;

    // Update the currentTranslateY with the new value
    const transformMatrix = window.getComputedStyle(this.flame).transform;

    if (transformMatrix !== "none") {
      const matrixValues = transformMatrix
        .match(/matrix.*\((.+)\)/)[1]
        .split(", ");
      this.currentTranslateY = parseFloat(matrixValues[5]);
    }

    // Remove event listeners
    document.removeEventListener("mousemove", this.onDrag);
    document.removeEventListener("mouseup", this.stopDragging);
    document.removeEventListener("touchmove", this.onDrag);
    document.removeEventListener("touchend", this.stopDragging);
  }

  // Carousel methods

  nextSlide() {
    this.currentIndex += 1;
    if (this.currentIndex > this.totalItems - 1) {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex -= 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.totalItems - 1;
    }
    this.updateCarousel();
  }

  updateCarousel() {
    this.japaneseItems.forEach((item) => {
      item.style.transform = `translateX(-${this.currentIndex * this.slideWidth + this.gap * this.currentIndex}px)`;
    });
    this.translatedItems.forEach((item) => {
      item.style.transform = `translateX(-${this.currentIndex * this.slideWidth + this.gap * this.currentIndex}px)`;
    });
  }

  // Add and remove event listeners

  addEventListeners() {
    const nextArrow = this.main.querySelector(".arrow.next");
    const prevArrow = this.main.querySelector(".arrow.prev");

    if (nextArrow) {
      nextArrow.addEventListener("click", this.nextSlide);
    }
    if (prevArrow) {
      prevArrow.addEventListener("click", this.prevSlide);
    }
  }

  removeEventListeners() {
    const nextArrow = this.main.querySelector(".arrow.next");
    const prevArrow = this.main.querySelector(".arrow.prev");

    if (nextArrow) {
      nextArrow.removeEventListener("click", this.nextSlide);
    }
    if (prevArrow) {
      prevArrow.removeEventListener("click", this.prevSlide);
    }

    if (this.flame) {
      this.flame.removeEventListener("mousedown", this.onFlameMouseDown);
      this.flame.removeEventListener("touchstart", this.onFlameTouchStart);
    }
  }

  // Remove the DOM elements

  removeDOMElements() {
    // Remove the 'main' element from the DOM
    if (this.main && this.main.parentNode) {
      this.main.parentNode.removeChild(this.main);
    }

    // Set references to null to help garbage collection
    this.main = null;
    this.japaneseList = null;
    this.japaneseItems = [];
    this.translatedList = null;
    this.translatedItems = [];
    this.container = null;
    this.flame = null;
  }

  render(t) {}

  resize() {}

  setDebug(debug) {}
}
