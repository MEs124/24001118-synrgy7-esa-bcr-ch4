class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    const fragment = document.createDocumentFragment();
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      fragment.appendChild(node);
    });
    this.carContainerElement.appendChild(fragment);
  };

  async load() {
    try {
      const cars = await Binar.listCars();
      Car.init(cars);
    } catch (error) {
      console.error("Failed to load cars:", error);
    }
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
