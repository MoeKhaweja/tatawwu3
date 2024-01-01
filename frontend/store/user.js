import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fetchData from "../helpers/fetch";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  isVerified: false,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(loginUser.pending());

      const response = await axios.post(
        "http://192.168.1.2:8000/auth/login",
        credentials
      );

      dispatch(loginUser.fulfilled(response.data));

      const currentState = getState();
      console.log("Current State:", currentState);

      return response.data;
    } catch (error) {
      dispatch(loginUser.rejected(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const verifyImage = createAsyncThunk(
  "user/verify",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentState = getState();
      console.log("Current State:", currentState);

      dispatch(verifyImage.pending());
      const response = fetchData(
        "auth/verify",
        "post",
        currentState.user.user.token,
        data
      );
      dispatch(verifyImage.fulfilled());

      return response.data;
    } catch (error) {
      dispatch(verifyImage.rejected(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerUser.pending());

      const response = await axios.post(
        "http://192.168.1.2:8000/auth/register",
        userData
      );
      console.log(response.data);

      dispatch(registerUser.fulfilled());

      return response.data;
    } catch (error) {
      dispatch(registerUser.rejected("error registering user"));
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions; // No regular actions
export default userSlice.reducer;
