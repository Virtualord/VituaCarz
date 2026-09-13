import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/carSlice"

export const store = configureStore({
    reducer: {
        cars: carReducer,
    },
});