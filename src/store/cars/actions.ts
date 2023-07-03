import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionType } from "./common";
import { Car } from "../types/types";
import { fetchCars } from "../../utils/api/api";
import { getCarsFromStorage } from "../../utils/storage/cars";

export interface IGetCarsResponse {
  cars: Car[],
  error: Error | null
}

const getCars = createAsyncThunk<IGetCarsResponse>(
  ActionType.GET_CARS,
  async () => {
    try {
      let cars = getCarsFromStorage();
      if (!cars) {
        cars = await fetchCars();
      }
      if (cars) {
        return { cars, error: null }
      } else {
        throw new Error('Error fetching cars')
      }
    } catch (error) {
      console.log(error);
      return { cars: [], error: null }
    }
  },
);


export interface IEditCar {
  car: Car,
  index: number
}

const editCar = createAsyncThunk<IEditCar, IEditCar>(
  ActionType.EDIT_CAR,
  async ({ car, index }) => {
    return { car, index };
  }
);

export interface IAddCar {
  car: Car
}

const addCar = createAsyncThunk<{ car: Car }, { car: Car }>(
  ActionType.ADD_CAR,
  async ({ car }) => {
    return { car };
  }
);

const removeCar = createAsyncThunk<{ index: number }, number>(
  ActionType.ADD_CAR,
  async (index: number) => {
    return { index };
  }
);


export { getCars, editCar, addCar, removeCar };
