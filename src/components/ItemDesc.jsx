import React, { useContext, useEffect, useRef, useState } from "react";
import demoImg from "../assets/large image.png";
import heartOutline from "../assets/heart (3).png";
import Plus from "../assets/add.png";
import Minus from "../assets/minus (2).png";
import staricon from "../assets/star.png";
import { AppContext } from "../context/AppContext";
export default function ItemDescription({
  price,
  image,
  name,
  description,
  sales,
  rating,
  additionalImages,
  customerFeedback,
}) {
  const [displayimage, setdisplayImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const { cartitems, setCartitems } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setdisplayImage(image);
  }, [image]);
  const handleAddtoCart = () => {
    handleSetNotification();
    if (cartitems.find((ele) => ele.name === name)) {
      const newcartitems = cartitems.filter((ele) => ele.name !== name);
      setCartitems([
        ...newcartitems,
        { image, name, price: price || "$10", quantity },
      ]);
      return;
    }
    setCartitems((prev) => {
      console.log("inside setstate");
      return [...prev, { image, name, price: price || "$10", quantity }];
    });

    console.log("item added to cart", { image, name, price, quantity });
  };
  useEffect(() => {
    console.log("cart items", cartitems);
  }, [cartitems]);
  const handleSetNotification = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };
  return (
    <div className="flex mob flexcol w-[100%] gap-6 overflow-hidden">
      <div className="flex mob flexcol justify-center gap-4 items-center sm:w-[60%] w-[90vw] rounded-lg bg-blue-50">
        <div className="flex flex-col">
          <ul className="flex sm:flex-col gap-4 flex-wrap">
            {additionalImages
              .map((image, indx) => {
                return (
                  <li
                    key={indx}
                    className="sm:w-[6rem] w-[3rem] sm:h-[6rem] h-[3rem] hover:border-2 border-black rounded-lg overflow-hidden"
                    onClick={() => setdisplayImage(image)}
                  >
                    <img
                      className="object-cover w-full h-full px-1 py-1"
                      src={image}
                      alt=""
                    />
                  </li>
                );
              })
              .slice(0, 5)}
          </ul>
        </div>
        <div className="h-full w-[1px] mx-2 bg-gray-400"></div>
        <img className="w-[70%]" src={displayimage} alt="" />
      </div>
      <div className="sm:w-[40%] w-[90vw] px-4 flex flex-col gap-y-6 mb-5">
        <p className="sm:text-3xl text-lg font-bold">{name}</p>
        <hr />
        <p className="sm:text-lg text-base font-semibold">
          Price: {price || "$10"}
        </p>
        <hr />
        <p className="flex items-center gap-1 sm:text-lg font-semibold">
          {rating} <img className="w-5 h-5" src={staricon} alt="" />{" "}
        </p>
        <hr />
        <p className="sm:text-lg font-semibold line-clamp-2">
          {sales || customerFeedback}
        </p>
        <hr />
        <p className="flex sm:text-lg font-semibold gap-2">
          Quantity :{" "}
          <span className="border-[1px] border-gray-500 rounded-md px-5 py-2">
            {quantity}
          </span>
          <div className="flex flex-col justify-between gap-[1px]">
            <div
              onClick={() => setQuantity((prev) => prev + 1)}
              className="flex justify-center items-center w-5 h-5"
            >
              <img className="w-full cursor-pointer" src={Plus} alt="" />
            </div>
            <div
              onClick={() => {
                if (quantity > 1) {
                  setQuantity((prev) => prev - 1);
                }
              }}
              className="flex justify-center items-center w-5 h-5"
            >
              <img className="w-full cursor-pointer" src={Minus} alt="" />
            </div>
          </div>
        </p>
        <hr />
        <p className="sm:text-base text-[15px] line-clamp-5">{description}</p>
        <button
          type="click"
          onClick={handleAddtoCart}
          className="w-[100%] rounded-full py-3 bg-blue-500 border-blue-500 border-2 hover:bg-blue-800 cursor-pointer text-white"
        >
          Add to Cart
        </button>
        <button
          type="click"
          className="flex justify-center items-center w-[100%] rounded-full py-3 border-2 border-blue-500 text-blue-500 gap-2"
        >
          <img className="w-5" src={heartOutline} alt="" /> Add to Watchlist
        </button>
      </div>
      <div
        className={`fixed flex items-center justify-center top-3/4 left-[97vw] sm:w-[20rem] w-[15rem] h-[4rem] bg-green-400 rounded-md border-l-8 transition-all ease-in-out duration-300 ${
          isVisible
            ? `opacity-100 ${
                window.screen.width < 480
                  ? "-translate-x-[15rem]"
                  : "-translate-x-[20rem]"
              }`
            : "opacity-0 translate-x-0"
        } border-black`}
      >
        <span className="text-lg] font-bold text-white">
          Item added Successfully !
        </span>
      </div>
    </div>
  );
}
