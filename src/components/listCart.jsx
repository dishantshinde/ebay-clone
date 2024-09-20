import React, { useContext } from "react";
import largeimg from "../assets/demoimgmobile.webp";
import crossicon from "../assets/close.png";
import { AppContext } from "../context/AppContext";
export default function ListCart({ listitem }) {
  const { cartitems, setCartitems } = useContext(AppContext);
  const isMobile = window.screen.width < 480;
  const handleDelete = (name) => {
    if (cartitems && setCartitems) {
      const filteredlist = cartitems.filter((ele) => ele.name !== name);
      setCartitems(filteredlist);
    }
  };
  return (
    <div className="sm:w-[60%] w-[100%] border-y-2 border-gray-400 flex flex-col">
      {listitem?.map((ele, index) => (
        <div
          key={index}
          className="relative flex h-24 w-[97%] sm:gap-6 gap-1 sm:px-10 px-2 py-3 justify-between m-2 bg-gray-50 sm:text-[13px] text-[11px] border-[1px] border-gray-300 rounded-md items-center"
        >
          <img className="h-[100%]" src={ele.image} alt="" />
          <span className="font-bold max-w-[20rem] line-clamp-2">
            {ele.name}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-right">Quantity:{ele.quantity}</span>
            {!isMobile && (
              <span className="text-right">expedited date: 4 or 5 days</span>
            )}
            {!isMobile && <span className="text-right">CA Sales tax</span>}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold sm:text-[16px] text-[13px] text-center">
              ${(ele.price.split("$")[1] * ele.quantity).toFixed(2)}
            </span>
            <span className="text-center">FREE</span>
            <span className="text-center">+ $1.00</span>
          </div>
          <div
            onClick={() => handleDelete(ele.name)}
            className="flex items-center justify-center absolute sm:top-2 sm:right-2 -top-2 -right-2 cursor-pointer w-5 h-5 rounded-full bg-slate-300 hover:bg-slate-600 overflow-hidden"
          >
            <img className="w-[60%] object-contain" src={crossicon} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
