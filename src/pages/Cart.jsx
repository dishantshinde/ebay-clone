import React, { useContext } from "react";
import Order from "../components/order";
import ListCart from "./../components/listCart";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
export default function Cart() {
  const { cartitems } = useContext(AppContext);
  console.log("cart items", cartitems);
  useEffect(() => {
    console.log("Updated cart items:", cartitems);
  }, [cartitems]);
  return (
    <div className="flex mob flexcol justify-center sm:justify-between pt-5 mob gap">
      {cartitems.length === 0 ? (
        <div className="w-[100%] text-center text-xl py-6 h-[4rem] bg-slate-100 font-bold mt-[1rem]">
          Your Cart is empty!
        </div>
      ) : (
        <>
          <ListCart listitem={cartitems} />
          <Order />
        </>
      )}
    </div>
  );
}
