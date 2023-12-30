import { createSlice } from "@reduxjs/toolkit";

// Slice reducer handling the returned promise from the async action creator
const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {}, // Add your other reducers here if needed
});

export default usersSlice.reducer;
