import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

export const register = createAsyncThunk(
  "auth/userRegister",
  async ({ uname, email, password, phone }, thunkApi) => {
    try {
      const res = await API.post("/user/register", {
        uname,
        email,
        password,
        phone,
      });

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error registering user";

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("appData", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error logging in";

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const loadToken = createAsyncThunk(
  "auth/loadToken",
  async () => {
    const localData = localStorage.getItem("appData");

    if (!localData) {
      return null;
    }

    const appData = JSON.parse(localData);

    return appData?.token || null;
  }
);

const getInitialAuthData = () => {
  try {
    const localData = localStorage.getItem("appData");
    if (localData) {
      return JSON.parse(localData);
    }
  } catch (error) {
    console.error("Failed to parse appData from localStorage", error);
  }
  return null;
};

const initialAuthData = getInitialAuthData();

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    success: false,
    user: initialAuthData?.user || null,
    token: initialAuthData?.token || null,
    error: null,
  },

  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.success = false;
      state.error = null;

      localStorage.removeItem("appData");
    },
  },

  extraReducers: (builder) => {
    builder

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Load token
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;