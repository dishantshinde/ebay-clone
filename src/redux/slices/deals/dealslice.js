import { createSlice } from "@reduxjs/toolkit";
import { fetchDeals } from "./dealApi";

const initialState = {
  deals: [],
  loading: false,
  error: null,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.deals = action.payload; // Set fetched deals to state
        state.loading = false;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.error = action.error.message; // Set error message
        state.loading = false;
      });
  },
});

export default dealsSlice.reducer;
