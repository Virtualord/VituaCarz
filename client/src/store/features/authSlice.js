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

// UpdateUser
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, updatedUser }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      const res = await API.patch(`/user/update/${id}`, updatedUser, {
        headers: { Authorization: token },
      });

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error updating user";

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
      state.loading = false;

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
        state.error = action.payload || "Registration failed";
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
        state.error = action.payload || "Login failed";
      })

      // Load token
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        // Support either { user: {...} } or direct user response
        const updatedUser =
          action.payload?.user ?? action.payload;

        state.user = updatedUser;

        // Sync localStorage
        const appData = JSON.parse(
          localStorage.getItem("appData") || "{}"
        );

        localStorage.setItem(
          "appData",
          JSON.stringify({
            ...appData,
            user: updatedUser,
          })
        );
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Failed to update user";
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;