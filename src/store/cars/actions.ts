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


export { getCars };
