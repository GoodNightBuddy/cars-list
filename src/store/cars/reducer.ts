import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { Car } from "../types/types";
import { addCar, editCar, getCars, removeCar, removeSearchResult, setSearchResult } from "./actions";

type InitialState = {
  cars: Car[];
  loading: boolean;
  error: Error | null;
  search: Car[] | null;
}

const initialState: InitialState = {
  cars: [],
  loading: false,
  error: null,
  search: null
}
const reducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      isAnyOf(
        getCars.pending,
        editCar.pending
      ),
      state => {
        state.loading = true
      }
    )

    .addMatcher(
      isAnyOf(
        getCars.fulfilled,
      ),
      (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars;
      }
    )

    .addMatcher(
      isAnyOf(
        editCar.fulfilled,
      ),
      (state, action) => {
        state.loading = false;
        state.cars[action.payload.index] = action.payload.car;
      }
    )

    .addMatcher(
      isAnyOf(
        addCar.fulfilled,
      ),
      (state, action) => {
        state.loading = false;
        state.cars.unshift(action.payload.car);
      }
    )

    .addMatcher(
      isAnyOf(removeCar.fulfilled),
      (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((car) => car.id !== action.payload.id);
      }
    )

    .addMatcher(
      isAnyOf(setSearchResult.fulfilled),
      (state, action) => {
        state.loading = false;
        state.search = action.payload.search;
      }
    )

    .addMatcher(
      isAnyOf(removeSearchResult.fulfilled),
      (state, action) => {
        state.loading = false;
        state.search = null;
      }
    )

    .addMatcher(
      isAnyOf(
        getCars.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.cars = [];
        state.error = new Error('Error fetching cars');
      }
    )
})

export { reducer };

