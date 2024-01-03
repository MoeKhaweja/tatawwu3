import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fetchData from "../helpers/fetch";
import * as FileSystem from "expo-file-system";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  isVerified: null,
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
      const response = await FileSystem.uploadAsync(
        "http://192.168.1.2:8000/auth/verify",
        data,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "private",
          headers: { Authorization: `Bearer ${currentState.user.user.token}` },
        }
      );

      dispatch(verifyImage.fulfilled());
      console.log(response);

      //   dispatch(verifyImage(data));
      // Handle successful login
    } catch (error) {
      dispatch(verifyImage.rejected(error.message));
      return rejectWithValue(error.message);
      return;
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
      if (response.status == 200) {
        dispatch(registerUser.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(registerUser.rejected("error registering user"));
      return rejectWithValue(error.message);
    }
  }
);

export const sendPin = createAsyncThunk(
  "user/pin",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      dispatch(sendPin.pending());

      const response = await axios.post(
        "http://192.168.1.2:8000/mail/reset",
        email
      );
      console.log(response.data);
      if (response.status == 200) {
        dispatch(sendPin.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(sendPin.rejected("error registering user"));
      return rejectWithValue(error.message);
    }
  }
);

export const verifyPin = createAsyncThunk(
  "user/verifyPin",
  async (pin, { dispatch, rejectWithValue }) => {
    try {
      dispatch(verifyPin.pending());

      const response = await axios.post(
        "http://192.168.1.2:8000/auth/reset",
        pin
      );
      console.log(response.data);
      if (response.status == 200) {
        dispatch(verifyPin.fulfilled());
      }

      return response.data;
    } catch (error) {
      dispatch(verifyPin.rejected("error verifying pin"));
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
        state.isVerified = false;
      })
      .addCase(verifyImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendPin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendPin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = userSlice.actions; // No regular actions
export default userSlice.reducer;
