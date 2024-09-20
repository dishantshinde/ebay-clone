import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products/productsSlice";
import CategorySlice from "./slices/categories/categorySlice";
import dealslice from "./slices/deals/dealslice";
import productDetailsSlice from "./slices/productDetails/productDetailsSlice";

const store = configureStore({
  reducer: {
    category: CategorySlice, // Handles the categories
    product: productsSlice, // Handles the products
    deal: dealslice,
    productDetail: productDetailsSlice,
  },
});

export default store;
