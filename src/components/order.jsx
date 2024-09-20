import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import checked from "../assets/checked.png";
import cross from "../assets/close.png";
export default function Order() {
  const { cartitems, setPurchaseItems, setCartitems } = useContext(AppContext);
  const [totalitems, setTotalitems] = useState({});
  const [showModal, setShowModal] = useState(false);
  console.log("carditems..", cartitems);
  useEffect(() => {
    if (cartitems) {
      const noOfitems = cartitems.reduce(
        (acc, currele) => currele.quantity + acc,
        0
      );
      const totalAmmount = cartitems.reduce(
        (acc, ele) =>
          Number(ele.price.split("$")[1]) * Number(ele.quantity) + acc,
        0
      );
      setTotalitems({ noOfitems, totalAmmount: totalAmmount.toFixed(2) });
    }
  }, [cartitems]);
  if (!cartitems) {
    return;
  }
  return (
    <>
      {" "}
      <div className="flex flex-col py-3 px-10 sm:self-start sm:w-[30%] w-[100%] h-auto justify-between sm:text-base text-[12px] rounded-md border-[1px] border-gray-300">
        <div className="flex justify-between my-4">
          <div className="flex flex-col gap-2 sm:text-right w-[10rem]">
            <span>{`Subtotal (${totalitems.noOfitems} items)`}</span>
            <span>Shipping charges:</span>
            <span>CA Sales Tax:</span>
            <span className="text-green-400">Discounts{"(10%)"}:</span>
          </div>
          <div className="flex flex-col gap-2 text-right font-semibold">
            <span>{`$${totalitems.totalAmmount}`}</span>
            <span>FREE</span>
            <span>$1.00</span>
            <span className="text-green-400">{`$${(
              0.1 * totalitems.totalAmmount
            ).toFixed(2)}`}</span>
          </div>
        </div>
        <hr />
        <div className="flex my-2 justify-between text-lg sm:text-right font-bold">
          <span className="w-[8rem]">Total:</span>
          <span>{`$${(
            totalitems.totalAmmount -
            0.1 * totalitems.totalAmmount +
            1
          ).toFixed(2)}`}</span>
        </div>
        <hr />
        <button
          onClick={() => {
            setShowModal(true);
            setPurchaseItems((prev) => {
              return prev + totalitems.noOfitems;
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 px-9 py-3 my-4 cursor-pointer rounded-full shadow-lg text-white"
        >
          Confirm Order
        </button>
      </div>{" "}
      {showModal && (
        <div>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex items-center justify-center sm:w-[35rem] sm:h-[15rem] w-[95vw] h-[15rem] z-50 bg-slate-50 border-4 shadow-xl border-green-600">
            <div className="flex flex-col gap-4 justify-center">
              <span className="w-full flex justify-center">
                <img className="sm:w-11 w-[20%]" src={checked} alt="" />
              </span>
              <span className="sm:text-2xl text-xl text-center font-bold text-green-600">
                Your order is placed successfully !
              </span>
            </div>
            <div
              onClick={() => {
                setCartitems([]);
                setShowModal(false);
              }}
              className="absolute flex items-center justify-center top-4 right-4 w-6 h-6 rounded-full hover:bg-slate-500 cursor-pointer bg-slate-300"
            >
              <img className="w-[40%]" src={cross} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
