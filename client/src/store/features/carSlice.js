import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

// Get all cars
export const getAllCars = createAsyncThunk(
    "car/getAllCars",
    async (_, thunkApi) => {
        try {
            const res = await API.get("/car/get-all");
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "error in get car from redux";
            return thunkApi.rejectWithValue(message);
        }
    }
);

// Get car by ID
export const getCarDetails = createAsyncThunk(
    "car/getCarDetails",
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/car/${id}`);
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "error in get car details from redux";
            return thunkApi.rejectWithValue(message);
        }
    }
);

const carSlice = createSlice({
    name: 'car',
    initialState: {
        loading: false,
        success: false,
        cars: [],
        carDetail: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // get all cars
        .addCase(getAllCars.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(getAllCars.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.cars = action.payload.car;
        })
        .addCase(getAllCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        // get car details
        .addCase(getCarDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCarDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.carDetail = action.payload.car;
        })
        .addCase(getCarDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export default carSlice.reducer;
