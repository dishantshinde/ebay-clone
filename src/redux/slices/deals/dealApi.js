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

// Thunk to fetch a list of deals from the Amazon API
export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals", // Action type for fetching deals
  async () => {
    try {
      const response = await axios.get(
        "https://real-time-amazon-data.p.rapidapi.com/deals-v2?country=US&min_product_star_rating=ALL&price_range=ALL&discount_range=ALL",
        headersObj
      );
      console.log("deal response", response);

      // Extracting the deals data and transforming it into a usable format
      const dealsData = response.data?.data?.deals.map((deal) => ({
        dealId: deal.deal_id,
        dealTitle: deal.deal_title,
        dealPhoto: deal.deal_photo,
        dealUrl: deal.deal_url,
        dealBadge: deal.deal_badge,
        dealType: deal.deal_type,
        dealStartsAt: deal.deal_starts_at,
        dealEndsAt: deal.deal_ends_at,
        productAsin: deal.product_asin,
      }));

      console.log("Fetched deals data:", dealsData); // For debugging
      return dealsData;
    } catch (error) {
      console.error("Error fetching deals:", error);
      throw error; // Re-throw error to be caught by Redux
    }
  }
);
