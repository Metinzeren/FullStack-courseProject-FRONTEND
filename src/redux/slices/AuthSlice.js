import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk("auth", async (formData) => {
  const response = await axios.post(
    "https://kursmeto.onrender.com/users/login",
    formData
  );
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
export const Auths = (state) => {
  return state.user;
};
