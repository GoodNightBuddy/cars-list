import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { Car } from "../types/types";
import { getCars } from "./actions";
import { saveCarsToStorage } from "../../utils/storage/cars";

type InitialState = {
  cars: Car[];
  loading: boolean;
  error: Error | null;
}

const initialState: InitialState = {
  cars: [],
  loading: false,
  error: null
}
const reducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      isAnyOf(
        getCars.pending
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
        saveCarsToStorage(action.payload.cars);
      }
    )

    .addMatcher(
      isAnyOf(
        getCars.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.cars = [];
        state.error =  new Error ('Error fetching cars');
      }
    )
})

export { reducer };

