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

const removeCar = createAsyncThunk<{ id: number }, number>(
  ActionType.DELETE_CAR,
  async (id: number) => {
    return { id };
  }
);

interface ISearchCar {
  search: Car[]
}

const setSearchResult = createAsyncThunk<ISearchCar, ISearchCar>(
  ActionType.SET_SEARCH_RESULT,
  async ({ search }) => {
    return { search };
  }
);

const removeSearchResult = createAsyncThunk(
  ActionType.REMOVE_SEARCH_RESULT,
  () => {
  }
);



export { getCars, editCar, addCar, removeCar, setSearchResult, removeSearchResult };
