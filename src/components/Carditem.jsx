import React, { useContext, useEffect, useState } from "react";
import heart from "../assets/heart (3).png";
import heartFilled from "../assets/heart filled.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Watchlist from "../pages/watchlist";
import axios from "axios";

const CardItem = ({ image, price, description, asin, ishome, iswatchlist }) => {
  const navigate = useNavigate();
  const { handleAddOrDeletetoWatchlist, wishlist } = useContext(AppContext);
  const [isAdd, setIsAdd] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (wishlist?.some((ele) => ele.asin === asin)) {
      setIsAdd(true);
    } else {
      setIsAdd(false);
    }
  }, [wishlist, asin]);

  const handleWishList = (e) => {
    e.stopPropagation();
    if (isDisabled) return;
    setIsDisabled(true);
    handleAddOrDeletetoWatchlist({
      image,
      price,
      description,
      asin,
      ishome,
      iswatchlist,
    });

    setTimeout(() => {
      setIsDisabled(false);
    }, 200);
  };

  return (
    <div
      onClick={(e) => {
        if (ishome) {
          return navigate(`top deals/products/${asin}`);
        } else {
          return navigate(`${asin}`);
        }
      }}
      className="flex-shrink-0 shadow-lg rounded-lg  sm:w-[16rem] w-[20rem] sm:h-[21rem] h-[20rem]"
    >
      <div className="relative h-[70%]">
        <img
          src={image}
          alt="Item"
          className="w-full h-full  object-contain mb-2 rounded-2xl"
          style={{ backgroundColor: "#f0f0f0" }}
        />
        <div
          onClick={handleWishList}
          className="absolute top-2 z-40 right-2 cursor-pointer flex items-center justify-center w-7 h-7 rounded-full shadow-lg bg-white"
        >
          <img className="w-[60%]" src={isAdd ? heartFilled : heart} alt="" />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-gray-700 mt-1 line-clamp-2">{description}</p>
        <p className="text-xl font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default CardItem;
