import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./getCategoriesApi";
const initialState = {
  categories: [],
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default CategorySlice.reducer;
