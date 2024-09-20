import React, { useEffect, useRef } from "react";
import offericon from "../assets/discount.png";
import { useNavigate } from "react-router-dom";
import ColorThief from "colorthief";
import { getColor } from "colorthief";
export default function AdCard({ listitem }) {
  // Function to handle left and right navigation

  return (
    <div className="relative my-5">
      <div
        className="flex gap-6 overflow-x-scroll"
        style={{ scrollBehavior: "smooth" }}
      >
        {listitem
          .map((item, indx) => (
            <Card
              key={indx}
              dealBadge={item.dealBadge} // Pass the dealBadge
              dealTitle={item.dealTitle} // Pass the dealTitle
              dealPhoto={item.dealPhoto} // Pass the dealPhoto
              dealUrl={item.dealUrl}
              dealType={item.dealType}
              dealId={item.dealId}
              dealAsin={item.productAsin}
            />
          ))
          .slice(0, 10)}
      </div>
    </div>
  );
}

const Card = ({
  dealBadge,
  dealTitle,
  dealPhoto,
  dealUrl,
  dealType,
  dealAsin,
}) => {
  const navigate = useNavigate();
  const adRef = useRef();
  useEffect(() => {
    if (dealPhoto) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.src = dealPhoto;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        try {
          const [r, g, b] = colorThief.getColor(img);
          const dominantColor = `rgb(${r}, ${g}, ${b})`;

          if (adRef.current) {
            adRef.current.style.background = `linear-gradient(to bottom, ${dominantColor} 0%, #F7FAFC 60%)`;
          }
        } catch (error) {
          console.error("Error extracting color:", error);
        }
      };
    }
  });
  return (
    <div
      ref={adRef}
      className="relative flex flex-shrink-0 justify-between border-2 shadow-md gap-2 w-[90vw] h-[15rem] sm:w-[43rem] sm:h-[20rem] bg-slate-200 rounded-2xl sm:px-8 px-3 py-5 sm:py-10 mt-3"
    >
      <div className="space-y-5 w-[50%]">
        <h3 className="sm:text-[2rem] text-xl font-semibold">
          {dealBadge} {/* Use dealTitle prop */}
        </h3>
        <p className="sm:text-md  text-[13px] mob line-clamp-3">{dealTitle}.</p>
        <button
          onClick={() => navigate(`deals/products/${dealAsin}`)}
          className="py-3 px-6 mt-3 text-slate-200 bg-gray-900 text-md font-semibold rounded-full"
        >
          Shop now
        </button>
      </div>
      <div>
        <img
          className="h-[100%] object-contain rounded-md"
          src={dealPhoto} // Use dealPhoto prop
          alt={dealTitle}
        />
      </div>
      <div className="absolute z-10 top-3 right-3 w-[10%] rounded-full">
        <img className="h-[10%]" src={offericon} alt="" />
      </div>
    </div>
  );
};
