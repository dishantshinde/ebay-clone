import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

// Defining the headers object to be used in the API requests
const headersObj = {
  headers: {
    "X-RapidAPI-Key": `${apiKey}`, // RapidAPI Key for authentication
    "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com", // RapidAPI host for Amazon API
  },
};

// Thunk to fetch a list of products from the Amazon API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", // Action type for fetching products
  async (query) => {
    try {
      const response = await axios.get(
        `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`,
        headersObj
      );
      console.log("product response", response);

      // Extracting the products data and transforming it into a usable format
      const productsData = response.data?.data?.products.map((product) => ({
        productAsin: product.asin,
        productTitle: product.product_title,
        productPrice: product.product_price,
        productOriginalPrice: product.product_original_price,
        currency: product.currency,
        productStarRating: product.product_star_rating,
        productNumRatings: product.product_num_ratings,
        productUrl: product.product_url,
        productPhoto: product.product_photo,
        productNumOffers: product.product_num_offers,
        productMinimumOfferPrice: product.product_minimum_offer_price,
        isBestSeller: product.is_best_seller,
        isAmazonChoice: product.is_amazon_choice,
        isPrime: product.is_prime,
        climatePledgeFriendly: product.climate_pledge_friendly,
        salesVolume: product.sales_volume,
        delivery: product.delivery,
        hasVariations: product.has_variations,
      }));

      console.log("Fetched products data:", productsData); // For debugging
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw error to be caught by Redux
    }
  }
);
export const fetchtopDeals = createAsyncThunk(
  "products/fetchtopdeals", // Action type for fetching products
  async () => {
    try {
      const response = await axios.get(
        `https://real-time-amazon-data.p.rapidapi.com/search?query=top%20deals&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`,
        headersObj
      );
      console.log("product response", response);

      // Extracting the products data and transforming it into a usable format
      const productsData = response.data?.data?.products.map((product) => ({
        productAsin: product.asin,
        productTitle: product.product_title,
        productPrice: product.product_price,
        productOriginalPrice: product.product_original_price,
        currency: product.currency,
        productStarRating: product.product_star_rating,
        productNumRatings: product.product_num_ratings,
        productUrl: product.product_url,
        productPhoto: product.product_photo,
        productNumOffers: product.product_num_offers,
        productMinimumOfferPrice: product.product_minimum_offer_price,
        isBestSeller: product.is_best_seller,
        isAmazonChoice: product.is_amazon_choice,
        isPrime: product.is_prime,
        climatePledgeFriendly: product.climate_pledge_friendly,
        salesVolume: product.sales_volume,
        delivery: product.delivery,
        hasVariations: product.has_variations,
      }));

      console.log("Fetched products data:", productsData); // For debugging
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw error to be caught by Redux
    }
  }
);
