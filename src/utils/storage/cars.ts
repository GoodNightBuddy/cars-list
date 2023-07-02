import { Car } from "../../store/types/types";

function saveCarsToStorage(cars: Car[]) {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function getCarsFromStorage() {
  const data = localStorage.getItem("cars");
  if (!data) return null;
  const cars = JSON.parse(data);
  if (!cars.length) return null;
  return cars;
}

export { saveCarsToStorage, getCarsFromStorage };