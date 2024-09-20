import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

// Defining the headers object to be used in the API requests
const headersObj = {
  headers: {
    "X-RapidAPI-Key": `${apiKey}`, // RapidAPI Key for authentication
    "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com", // RapidAPI host endpoint for Amazon API
  },
};

// Thunk to fetch a list of product categories from the Amazon API
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories", // Action type for fetching categories
  async () => {
    try {
      // Making a GET request to the Amazon API to fetch product categories for the US market
      const response = await axios.get(
        "https://real-time-amazon-data.p.rapidapi.com/product-category-list?country=US",
        headersObj
      );

      // Extracting the "data" array from the response
      const dataObj = response.data?.data.map((category) => {
        return {
          id: category.id, // Extracting category ID
          name: category.name, // Extracting category name
        };
      });

      console.log("updated categories data", dataObj); // Logging the transformed data for debugging
      return dataObj; // Return the transformed data to be stored in the Redux state
    } catch (error) {
      // Catching and logging any errors that occur during the API call
      console.error("Error fetching categories:", error);
      throw error; // Re-throw the error to be caught by Redux for proper error handling
    }
  }
);
