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
    this.#yearSelect.addEventListener("change", (e) =>
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

    // if year is changed lets reset it
    this.resetDropdown(this.#makeSelect, "Make");
    this.resetDropdown(this.#modelSelect, "Model");
    this.lockSection("model");

    // If they selected the default empty option, keep Make locked and stop
    if (!selectedYear) {
      this.lockSection("make");
      return;
    }

    // Filter cars by the chosen year to get the makes
    const carsForYear = this.#cars.filter((car) => car.year == selectedYear);
    const uniqueMakes = [
      ...new Set(carsForYear.map((car) => car.Manufacturer)),
    ].sort();

    console.log("1. The year you clicked:", selectedYear);
    console.log("2. Cars found for this year:", carsForYear);
    console.log("3. The makes we extracted:", uniqueMakes);

    uniqueMakes.forEach((make) => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      this.#makeSelect.appendChild(option);
    });

    // Unlock the make dropdown and remove disabled classes
    this.#makeSelect.disabled = false;
    document.getElementById("makeTitle").classList.remove("disabled");
    document.getElementById("makeLabel").classList.remove("disabled");
  }

  handleMakeChange(event) {
    const selectedYear = this.#yearSelect.value;
    const selectedMake = event.target.value;

    // Reset the model dropdown if they change the make
    this.resetDropdown(this.#modelSelect, "Model");

    if (!selectedMake) {
      this.lockSection("model");
      return;
    }

    // Filter cars by both the year and make to get specific model
    const matchingCars = this.#cars.filter(
      (car) => car.year == selectedYear && car.Manufacturer === selectedMake,
    );
    const uniqueModels = [
      ...new Set(matchingCars.map((car) => car.model)),
    ].sort();

    uniqueModels.forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      this.#modelSelect.appendChild(option);
    });

    // Unlock the Model dropdown and remove the gray disabled text classes
    this.#modelSelect.disabled = false;
    document.getElementById("modelTitle").classList.remove("disabled");
    document.getElementById("modelLabel").classList.remove("disabled");
  }

  handleModelChange(event) {
    const selectedModel = event.target.value;
    if (!selectedModel) return;

    //Find the exact car object in the. dataset
    const selectedCar = this.#cars.find(
      (car) =>
        car.year == this.#yearSelect.value &&
        car.Manufacturer === this.#makeSelect.value &&
        car.model === selectedModel,
    );

    // Fullfill th efinal assignment by logging the object
    console.log("Dream Car Found:", selectedCar);
  }

  //   Quickly clears a dropdown back to its orginal state
  resetDropdown(selectElement, defaultText) {
    selectElement.innerHTML = `<option value="">${defaultText}</option>`;
  }

  // Visually locks a section and turns the text gray
  lockSection(section) {
    const select = section === "make" ? this.#makeSelect : this.#modelSelect;
    select.disabled = true;
    document.getElementById(`${section}Title`).classList.add("disabled");
    document.getElementById(`${section}Label`).classList.add("disabled");
  }
}

const app = new CarFinder(carsData);
