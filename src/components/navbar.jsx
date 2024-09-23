import React, { useContext, useEffect, useState } from "react";
import ebayicon from "../assets/ebay 2.png";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import check from "../assets/checked.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const categories = useSelector((state) => state.category.categories);
  console.log("categories are", categories);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showWatchList, setShowWatchList] = useState(false);
  const navigate = useNavigate();
  const { cartitems, purchaseItems, wishlist, user } = useContext(AppContext);
  console.log("p items", purchaseItems);
  console.log("wishlist has", wishlist);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleClick = (query) => {
    navigate(`/${encodeURIComponent(query)}/products`);
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      console.log("Empty search query");
      alert("Please enter a search term.");
      return;
    }
    console.log("handle search triggered");
    console.log("search term:", search);
    navigate(`/${encodeURIComponent(search)}/products`);
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="h-auto">
      {/* Top Navigation */}
      <div className="w-[93vw] mx-auto flex justify-between">
        {/* Left Side */}
        <div className="flex justify-between text-[13px] mt-1 mb-2 gap-5">
          <span>
            Hi (
            <span
              onClick={handleSignout}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSignout();
              }}
              className="text-blue-600 hover:underline hover:cursor-pointer"
            >
              {user ? "Signout" : "Signup"}
            </span>
            )
          </span>
          <span className="hidden sm:inline cursor-pointer hover:text-blue-600">
            Daily Deals
          </span>
          <span className="hidden sm:inline cursor-pointer hover:text-blue-600">
            Brand Outlet
          </span>
          <span className="hidden sm:inline cursor-pointer hover:text-blue-600">
            Gift Cards
          </span>
          <span className="hidden sm:inline cursor-pointer hover:text-blue-600">
            Help & Contact
          </span>
        </div>

        {/* Right Side */}
        <div className="flex justify-between items-center text-[13px] mr-1 gap-5">
          <span className="hidden sm:inline cursor-pointer hover:text-blue-600">
            Self
          </span>

          {/* Watchlist Dropdown */}
          <div className="relative flex items-center cursor-pointer">
            <span
              onClick={() => setShowWatchList((prev) => !prev)}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === "Enter") setShowWatchList((prev) => !prev);
              }}
              className="mr-[2px] hover:underline"
            >
              Watchlist
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3"
              onClick={() => setShowWatchList((prev) => !prev)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 13-7.5 7.5-7.5-7.5"
              />
            </svg>
            {showWatchList && (
              <div className="absolute top-full right-0 p-1 z-40 bg-slate-50 shadow-xl gap-4 rounded-md sm:w-[20rem] w-[10rem] max-h-[50vw] overflow-y-scroll">
                <ol className="flex flex-col gap-2">
                  {wishlist?.map((ele, indx) => (
                    <li
                      onClick={() => {
                        setShowWatchList(false);
                        navigate(`watchlist/products`);
                      }}
                      key={indx}
                      className="flex items-center justify-center gap-2 rounded-md w-full hover:underline border-2 border-black p-3 cursor-pointer"
                    >
                      <span>{indx + 1}.</span>
                      <span className="line-clamp-3">{ele.description}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* My Ebay Dropdown */}
          <div className="flex items-center">
            <span className="hidden sm:inline cursor-pointer hover:text-blue-600">
              My Ebay
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3 hidden sm:inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 13-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          {/* Purchase Items Indicator */}
          <span
            onClick={() => setShow((prev) => !prev)}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => {
              if (e.key === "Enter") setShow((prev) => !prev);
            }}
            className="relative transform hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {purchaseItems > 0 && (
              <div className="absolute left-1/2 bottom-1/2 flex items-center justify-center w-[60%] h-[60%] bg-red-500 rounded-full">
                <span className="text-[9px] text-white font-bold">
                  {cartitems.length}
                </span>
              </div>
            )}
            {show && (
              <div className="absolute flex gap-4 top-full right-1/2 p-3 rounded-tr-none rounded-md bg-slate-200 z-40 shadow-xl w-[15rem] h-auto">
                <img className="w-5 object-contain" src={check} alt="" />
                <span>Your order of {purchaseItems} items is successful.</span>
              </div>
            )}
          </span>

          {/* Cart Icon */}
          <span
            className="relative transform hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/cart")}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate("/cart");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cartitems.length > 0 && (
              <div className="absolute left-1/2 bottom-1/2 flex items-center justify-center w-[60%] h-[60%] bg-red-500 rounded-full">
                <span className="text-[9px] text-white font-bold">
                  {cartitems.length}
                </span>
              </div>
            )}
          </span>
        </div>
      </div>

      <hr />

      {/* Main Navigation and Search */}
      <div className="hidden sm:flex justify-center">
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer justify-between items-center w-[93vw] h-[90px]"
        >
          <img className="h-[50px]" src={ebayicon} alt="ebayicon" />

          {/* Shop by Category */}
          <button
            className="relative flex items-center text-gray-500"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick
              setClick((prev) => !prev);
            }}
          >
            Shop by category&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 13-7.5 7.5-7.5-7.5"
              />
            </svg>
            {click && (
              <div
                className="absolute left-1/2 top-full z-50 py-5 pl-10 w-[60vw] bg-white rounded-lg grid grid-cols-4 gap-4"
                style={{ boxShadow: "0 2px 3px 2px rgb(0,0,0,0.2)" }}
                onClick={(e) => e.stopPropagation()} // Prevent parent onClick
              >
                {categories.map((ele, indx) => (
                  <span
                    key={indx}
                    className="text-[13px] text-gray-500 font-semibold text-left hover:underline hover:text-black cursor-pointer"
                    onClick={() =>
                      navigate(`/${encodeURIComponent(ele.name)}/products`)
                    }
                  >
                    {ele.name}
                  </span>
                ))}
              </div>
            )}
          </button>

          {/* Search Bar */}
          <div className="flex gap-2 items-center border-[3px] border-black rounded-full px-6 py-2">
            <svg
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick
                handleSearch();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              className="border-none w-[50vw] focus:outline-none"
              placeholder="Enter content to search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                console.log("Search input:", e.target.value);
              }}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick
              handleSearch();
            }}
            className="bg-blue-600 hover:bg-blue-700 px-14 py-2 border-none rounded-full text-white cursor-pointer"
          >
            Search
          </button>

          {/* Advanced Search */}
          <button
            onClick={(e) => e.stopPropagation()} // Prevent parent onClick
            className="border-none text-gray-500 cursor-pointer"
          >
            Advanced
          </button>
        </div>
      </div>
      <div className="w-[95vw] flex sm:hidden mx-auto flex-col mt-4 gap-4">
        <img className="w-[40%]" src={ebayicon} alt="ebayicon" />
        <div className="flex gap-2 w-[100%] items-center border-[3px] border-black rounded-full px-6 py-2">
          <svg
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick
              handleSearch();
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            className="border-none w-[50vw] focus:outline-none"
            placeholder="Enter content to search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log("Search input:", e.target.value);
            }}
          />
        </div>
      </div>

      <hr />

      {/* Category List (Large Screens Only) */}
      <div className="hidden sm:flex justify-center">
        <ul className="flex gap-7 text-[13px] text-gray-700">
          <li
            onClick={() => handleClick("New")}
            className="cursor-pointer hover:text-blue-600"
          >
            Explore(new)!
          </li>
          <li
            onClick={() => handleClick("Accessories")}
            className="cursor-pointer hover:text-blue-600"
          >
            Accessories
          </li>
          <li
            onClick={() => handleClick("Motors")}
            className="cursor-pointer hover:text-blue-600"
          >
            Motors
          </li>
          <li
            onClick={() => handleClick("Electronics")}
            className="cursor-pointer hover:text-blue-600"
          >
            Electronics
          </li>
          <li
            onClick={() => handleClick("Collectibles")}
            className="cursor-pointer hover:text-blue-600"
          >
            Collectibles
          </li>
          <li
            onClick={() => handleClick("Home and garden")}
            className="cursor-pointer hover:text-blue-600"
          >
            Home & Garden
          </li>
          <li
            onClick={() => handleClick("Fashion")}
            className="cursor-pointer hover:text-blue-600"
          >
            Fashion
          </li>
          <li
            onClick={() => handleClick("Toys")}
            className="cursor-pointer hover:text-blue-600"
          >
            Toys
          </li>
          <li
            onClick={() => handleClick("Sporting goods")}
            className="cursor-pointer hover:text-blue-600"
          >
            Sporting goods
          </li>
          <li
            onClick={() => handleClick("Business and industrial")}
            className="cursor-pointer hover:text-blue-600"
          >
            Business & Industrial
          </li>
          <li
            onClick={() => handleClick("Jewelry and watches")}
            className="cursor-pointer hover:text-blue-600"
          >
            Jewelry & Watches
          </li>
          <li
            onClick={() => handleClick("Ebay live")}
            className="cursor-pointer hover:text-blue-600"
          >
            eBay live
          </li>
          <li
            onClick={() => handleClick("Refurbished")}
            className="cursor-pointer hover:text-blue-600"
          >
            Refurbished
          </li>
        </ul>
      </div>
    </div>
  );
}
