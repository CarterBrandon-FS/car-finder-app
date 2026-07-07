// Imports your SCSS stylesheet
import "./styles/index.scss";

// Import dataset
import carsData from "../car-dataset.json";

class CarFinder {
  // E6 private fields to protect DOM elements
  #cars;
  #yearSelect;
  #makeSelect;
  #modelSelect;

  constructor(cars) {
    this.#cars = cars;

    // lets grab the dropdown element in the html
    this.#yearSelect = document.getElementById("yearSelect");
    this.#makeSelect = document.getElementById("makeSelect");
    this.#modelSelect = document.getElementById("modelSelect");

    this.info();
  }

  info() {
    this.populateYears();
    this.addEventListeners();
  }

  // Population methods

  populateYears() {
    // Grab unique years and sort them highest to lowest (descending)
    const uniqueYears = [...new Set(this.#cars.map(({ year }) => year))].sort(
      (a, b) => b - a,
    );

    uniqueYears.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      this.#yearSelect.appendChild(option);
    });
  }

  //   the event listeners
  addEventListeners() {
    this.#yearSelect.addEventListeners("change", (e) =>
      this.handleYearChange(e),
    );
    this.#makeSelect.addEventListener("change", (e) =>
      this.handleMakeChange(e),
    );
    this.#modelSelect.addEventListener("change", (e) =>
      this.handleModelChange(e),
    );
  }

  // event handlers
  handleYearChange(event) {
    const selectedYear = event.target.value;
  }
}
