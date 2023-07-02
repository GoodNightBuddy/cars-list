import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./rootReducer";

const store = configureStore({
  reducer: {
    cars: carsReducer,
  }
})

export { store };