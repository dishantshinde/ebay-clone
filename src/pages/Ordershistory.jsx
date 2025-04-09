import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import CloseIcon from "../assets/close.png";
export default function OrderHistory() {
  const { order, handleRemoveOrder } = useContext(AppContext);
  if (!order || order.length === 0) {
    return <div>No orders available</div>; // Handle case when there are no orders
  }
  return (
    <div className="space-y-5 my-5">
      {order.map((ele, indx) => {
        return (
          <Ordercomponent
            key={indx}
            nthorder={ele}
            index={indx}
            handleRemoveOrder={handleRemoveOrder}
            order={order}
          />
        );
      })}
    </div>
  );
}

const Ordercomponent = ({ nthorder, index, handleRemoveOrder, order }) => {
  const [image, setImage] = useState(nthorder?.items[0].image);
  if (!nthorder) {
    return;
  }
  return (
    <div
      onClick={() => handleRemoveOrder(order[index]._id)}
      className="relative flex justify-between mx-3 p-5 w-full h-[20rem] bg-slate-200 rounded-lg border border-slate-400"
    >
      <img className="w-[30%] rounded-md object-contain" src={image} alt="" />
      <div className="h-full w-[2px] rounded-lg bg-gray-400"></div>
      <ol className="flex flex-col w-[30%] overflow-scroll">
        {nthorder.items.map((ele, indx) => {
          return (
            <li
              key={indx}
              className="flex flex-shrink-0 items-center justify-center p-2 border-b border-gray-500"
            >
              <span className="mr-4">{indx + 1}.</span>
              <span className="line-clamp-3">{ele.name}</span>
            </li>
          );
        })}
      </ol>
      <div className="h-full w-[2px] rounded-lg bg-gray-400"></div>
      <div className="w-[30%] flex flex-col justify-between">
        <span>Number of Items: {nthorder.order.totalItems}</span>
        <span>Total : ${nthorder.order.totalAmount}</span>
      </div>
      <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-300 border border-gray-500 hover:scale-110 cursor-pointer">
        <img className="w-1/2" src={CloseIcon} alt="" />
      </div>
    </div>
  );
};
