// src/context/AppContext.js
import React, { createContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
// Create context
export const AppContext = createContext();
// Create provider component
export const AppProvider = ({ children }) => {
  const [cartitems, setCartitems] = useState([]);
  const [purchaseItems, setPurchaseItems] = useState(0);
  const [wishlist, setWishlist] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
