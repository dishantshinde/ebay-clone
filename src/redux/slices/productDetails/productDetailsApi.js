import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk
const apiKey = process.env.REACT_APP_API_KEY;

const headersObj = {
  headers: {
    "X-RapidAPI-Key": apiKey, // RapidAPI Key for authentication
    "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com", // RapidAPI host for Amazon API
  },
};

export const fetchProductDetails = createAsyncThunk(
  "product/fetchDetails",
  async (asinKey, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asinKey}&country=US`,
        headersObj
      );

      const data = response.data;
      console.log("desc of product", data);

      // Create an object with only the required keys and values
      const productDetails = {
        title: data.data.product_title, // Product title
        price: data.data.product_price, // Current price
        originalPrice: data.data.product_original_price, // Original price
        isAmazonChoice: data.data.is_amazon_choice, // Amazon choice status
        isBestSeller: data.data.is_best_seller, // Best seller status
        starRating: data.data.product_star_rating, // Star rating
        mainPhoto: data.data.product_photo, // Main product photo
        additionalPhotos: data.data.product_photos, // Array of additional product photos
        description: data.data.about_product, // Product description (array of strings)
        salesVolume: data.data.sales_volume, // Sales volume info
        customerFeedback: data.data.customers_say, // Customer feedback summary
        productInfo: data.data.product_information, // Product info
      };

      console.log("Product description:", productDetails); // Ensure this gets logged

      return productDetails;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
