import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchtopDeals } from "./productApi";

const initialState = {
  products: [],
  topdeals: [],
  status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchtopDeals.fulfilled, (state, action) => {
        state.topdeals = action.payload;
      });
  },
});

export default productsSlice.reducer;
