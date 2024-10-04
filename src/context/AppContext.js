// src/context/AppContext.js
import React, { createContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import axios from "axios";
// Create context
export const AppContext = createContext();
// Create provider component
export const AppProvider = ({ children }) => {
  const [cartitems, setCartitems] = useState([]);
  const [purchaseItems, setPurchaseItems] = useState(0);
  const [wishlist, setWishlist] = useState(null);
  const [user, setUser] = useState();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user obj -", user);
        setUser(user.email);
      } else {
        setUser(null);
      }
    });
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (user) {
      console.log("user is -", user);
      handleGetWatchlist();
      handleActiveUser(user);
      getAllOrders(user);
    }
  }, [user]);

  const handleActiveUser = async (email) => {
    try {
      const response = await axios.post(
        "https://ebay-backend-smla.onrender.com/api/user",
        {
          email,
        }
      );
      console.log("active user is:", response);
      return response;
    } catch (err) {
      console.error("Error found: ", err.message);
    }
  };
  const handleAddOrDeletetoWatchlist = async (obj) => {
    try {
      const response = await axios.post(
        "https://ebay-backend-smla.onrender.com/api/watchlist/addordelete",
        { email: user, ...obj }
      );
      console.log("item added to watchlist", response.data);
      handleGetWatchlist();
    } catch (err) {
      console.error("Error found", err.message);
    }
  };
  const handleGetWatchlist = async () => {
    try {
      const response = await axios.get(
        `https://ebay-backend-smla.onrender.com/api/watchlist/allproducts?email=${user}`
      );
      console.log("Watchlist for user is :", response.data);
      setWishlist(response.data);
    } catch (err) {
      console.error("Error fetching Wishlist", err.message);
    }
  };
  const handleAddOrders = async (cartlist, order) => {
    try {
      const response = await axios.post(
        "https://ebay-backend-smla.onrender.com/api/user/orders/add",
        {
          email: user,
          cartlist,
          order,
        }
      );
      console.log("order added:", response.data);
    } catch (err) {
      console.error("Error adding order:", err.response?.data || err.message);
    }
  };
  const getAllOrders = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/orders?email=${email}`
      );
      console.log("orders fetched are", response.data.data);
      setOrder(response.data.data);
    } catch (err) {
      console.error("Error fetching orders", err.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartitems,
        setCartitems,
        purchaseItems,
        setPurchaseItems,
        wishlist,
        setWishlist,
        user,
        handleActiveUser,
        handleAddOrDeletetoWatchlist,
        handleGetWatchlist,
        handleAddOrders,
        getAllOrders,
        order,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
