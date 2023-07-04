import { Car } from "../../store/types/types";

const validateCar = (car: Car) => {
  const invalidFields: string[] = [];

  if (!car.car) {
    invalidFields.push('car');
  }

  if (!/^[a-zA-Z\s-]+$/.test(car.car)) {
    invalidFields.push('car');
  }

  if (!car.car_model) {
    invalidFields.push('car_model');
  }

  if (!car.car_vin) {
    invalidFields.push('car_vin');
  }

  if (!/^[a-zA-Z0-9]+$/.test(car.car_vin)) {
    invalidFields.push('car_vin');
  }

  if (!car.car_color) {
    invalidFields.push('car_color');
  }

  if (!/^[a-zA-Z\s-]+$/.test(car.car_color)) {
    invalidFields.push('car_color');
  }

  const pricePattern = /^\$?[0-9]+([,.][0-9]+)?$/;
  if (!pricePattern.test(car.price)) {
    invalidFields.push('price');
  }

  const year = parseInt(car.car_model_year as string, 10);
  if (
    isNaN(year) ||
    car.car_model_year.toString().length !== 4 ||
    !/^20|19/.test(car.car_model_year.toString())
  ) {
    invalidFields.push('car_model_year');
  }

  return invalidFields;
};

export { validateCar };