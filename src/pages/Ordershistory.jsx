import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
export default function OrderHistory() {
  const { order } = useContext(AppContext);
  if (!order || order.length === 0) {
    return <div>No orders available</div>; // Handle case when there are no orders
  }
  return (
    <div className="space-y-5">
      {order.map((ele, indx) => {
        return <Ordercomponent key={indx} nthorder={ele} />;
      })}
    </div>
  );
}

const Ordercomponent = ({ nthorder }) => {
  const [image, setImage] = useState(nthorder?.items[0].image);
  if (!nthorder) {
    return;
  }
  return (
    <div className="flex justify-between mx-3 p-5 w-full h-[20rem] bg-slate-200 rounded-lg border border-slate-400">
      <img className="w-[30%] rounded-md object-contain" src={image} alt="" />
      <div className="h-full w-[2px] rounded-lg bg-gray-400"></div>
      <ol className="flex flex-col w-[30%] overflow-scroll">
        {nthorder.items.map((ele, indx) => {
          return (
            <li
              key={indx}
              className="flex items-center justify-center p-2 border-b border-gray-500 line-clamp-2"
            >
              {ele.name}
            </li>
          );
        })}
      </ol>
      <div className="h-full w-[2px] rounded-lg bg-gray-400"></div>
      <div className="w-[30%] flex flex-col justify-between">
        <span>Number of Items: {nthorder.order.totalItems}</span>
        <span>Total : ${nthorder.order.totalAmount}</span>
      </div>
    </div>
  );
};
