import React, { useContext, useEffect, useState } from "react";
import ebayicon from "../assets/ebay 2.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    navigate(`/${query}/products`);
  };
  const handleSearch = () => {
    navigate(`/${search}/products`);
  };
  const handleSignout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      // Optionally, navigate to a different page or update the UI
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="h-auto">
      <div className="w-[93vw] mx-auto flex justify-between">
        <div className="flex justify-between text-[13px] mt-1 mb-2 gap-5">
          <span>
            Hi (
            <span
              onClick={handleSignout}
              className="text-blue-600 hover:underline hover:cursor-pointer "
            >
              {user ? "Signout" : "Signup"}
            </span>
            )
          </span>
          {window.screen.width > 480 && <span>Daily Deals</span>}
          {window.screen.width > 480 && <span>Brand Outlet</span>}
          {window.screen.width > 480 && <span>Gift Cards</span>}
          {window.screen.width > 480 && <span>Help & Contact</span>}
        </div>
        <div className="flex justify-between items-center text-[13px] mr-1 gap-5">
          {window.screen.width > 480 && <span>Self</span>}
          <div className="relative flex items-center cursor-pointer">
            {" "}
            <span
              onClick={() => setShowWatchList((prev) => !prev)}
              className="mr-[2px]"
            >
              watchlist{" "}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 13-7.5 7.5-7.5-7.5"
              />
            </svg>
            {showWatchList && (
              <div className="absolute top-full right-0 p-1 z-40 bg-slate-50 shadow-xl gap-4 rounded-md sm:w-[20rem] w-[10rem]  max-h-[50vw] overflow-y-scroll">
                <ol className="flex flex-col gap-2">
                  {wishlist?.map((ele, indx) => {
                    return (
                      <li
                        onClick={() => {
                          setShowWatchList((prev) => !prev);
                          navigate(`watchlist/products`);
                        }}
                        key={indx}
                        className="flex items-center justify-center gap-2 rounded-md w-full hover:underline border-2 border-black p-3"
                      >
                        <span>{indx + 1}.</span>
                        <span className="line-clamp-3">{ele.description}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {window.screen.width > 480 && <span>My Ebay</span>}
            {window.screen.width > 480 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 13-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>

          <span
            onClick={() => setShow((prev) => !prev)}
            className="relative transform hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
                <span>your order of {purchaseItems} items is successfull.</span>
              </div>
            )}
          </span>
          <span
            className="relative transform hover:scale-110 transition-transform duration-300"
            onClick={() => navigate("/cart")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
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
      <div>
        <hr />
        {window.screen.width > 480 ? (
          <div className="flex justify-center">
            <div
              onClick={() => navigate("/")}
              className="flex cursor-pointer justify-between items-center w-[93vw] h-[90px]"
            >
              <img className=" h-[50px]" src={ebayicon} alt="ebayicon" />
              <button
                className="relative flex items-center text-gray-500"
                onClick={() => setClick((prev) => !prev)}
              >
                Shop by category&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 13-7.5 7.5-7.5-7.5"
                  />
                </svg>
                {click && (
                  <div
                    className="absolute left-1/2 top-full z-50 py-5 pl-10  w-[60vw] bg-white rounded-lg grid grid-cols-4 gap-4"
                    style={{ boxShadow: "0 2px 3px 2px rgb(0,0,0,0.2)" }}
                  >
                    {categories.map((ele, indx) => {
                      return (
                        <span
                          className="text-[13px] text-gray-500 font-semibold text-left hover:underline hover:text-black"
                          id={indx}
                          onClick={() => navigate(`${ele.name}/products`)}
                        >
                          {ele.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </button>
              <div className="flex gap-2 items-center border-[3px] border-black rounded-full px-6 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  className="border-none w-[50vw] focus:outline-none"
                  placeholder="enter content to search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 px-14 py-2 border-none rounded-full text-white"
              >
                Search
              </button>
              <button className="border-none text-gray-500">Advanced</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mx-3 gap-3 mb-5">
            <img className=" w-[40vw]" src={ebayicon} alt="ebayicon" />
            <div className="flex gap-2 items-center border-[3px] border-black rounded-full px-6 py-2">
              <svg
                onClick={handleSearch}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                className="border-none w-[50vw] focus:outline-none"
                placeholder="enter content to search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        <hr />
        {window.screen.width > 480 && (
          <div className="flex justify-center">
            <ul className="flex gap-7 text-[13px] text-gray-700">
              <li onClick={() => handleClick("New")}>Explore(new)!</li>
              <li onClick={() => handleClick("Accessories")}>Accessories</li>
              <li onClick={() => handleClick("Motors")}>Motors</li>
              <li onClick={() => handleClick("Electronics")}>Electronics</li>
              <li onClick={() => handleClick("Collectibles")}>Collectibles</li>
              <li onClick={() => handleClick("Home and garden")}>
                Home & Garden
              </li>
              <li onClick={() => handleClick("Fashion")}>Fashion</li>
              <li onClick={() => handleClick("Toys")}>Toys</li>
              <li onClick={() => handleClick("Sporting goods")}>
                Sporting goods
              </li>
              <li onClick={() => handleClick("Bussiness and industrial")}>
                Business & Industrial
              </li>
              <li onClick={() => handleClick("Jewelry and watches")}>
                Jewelry & Watches
              </li>
              <li onClick={() => handleClick("Ebay live")}>eBay live</li>
              <li onClick={() => handleClick("Refurbished")}>Refurbished</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
