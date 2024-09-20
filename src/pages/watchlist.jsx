import React, { useContext } from "react";
import Slider from "../components/Slider";
import { AppContext } from "../context/AppContext";

export default function Watchlist() {
  const { wishlist } = useContext(AppContext);
  const isWatchist = true;

  console.log("wishlist ifs", wishlist);
  if (!wishlist) {
    return;
  }
  return (
    <>
      {wishlist.length !== 0 ? (
        <Slider
          listitem={wishlist}
          searched="Watchlist"
          iswatchlist={isWatchist}
        />
      ) : (
        <div className="py-10 mt-2 w-[100%] text-center bg-slate-100 rounded-lg text-xl font-bold">
          No Content in Watchlist!
        </div>
      )}
    </>
  );
}
