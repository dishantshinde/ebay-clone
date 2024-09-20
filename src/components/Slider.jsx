import React, { useRef, useState } from "react";
import CardItem from "./Carditem"; // Import the CardItem component
import largeimg from "../assets/large image.png"; // Replace this with actual image paths
import nextArrow from "../assets/right-arrow.png";
import previousArrow from "../assets/left-arrow.png";

export default function Slider({
  listitem,
  searched,
  ishome = false,
  iswatchlist = false,
}) {
  const SliderRef = useRef(null); // Reference to the slider container
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = window.screen.width < 480;

  // Function to handle left and right navigation
  const handleSlider = (direction) => {
    const cardWidth = isMobile ? 21 : 17; // Assuming each card has a fixed width of 17rem (adjust as needed)

    // Determine the new scroll position based on the direction
    let newIndex = currentIndex;

    // For left navigation
    if (direction === "left" && currentIndex > 1) {
      newIndex = currentIndex - (isMobile ? 1 : 2);
    }

    // For right navigation
    else if (
      direction === "right" &&
      currentIndex < listitem.length - (isMobile ? 2 : 4)
    ) {
      newIndex = currentIndex + (isMobile ? 1 : 2);
    }

    // Update the transform style to move the slider
    SliderRef.current.style.transform = `translateX(-${
      newIndex * cardWidth
    }rem)`;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full p-4 relative my-5">
      <h3 className="sm:text-2xl text-xl font-bold mb-4">
        {searched && `${searched}`}
      </h3>

      {/* Left and Right Navigation Buttons */}
      <button
        onClick={() => handleSlider("left")}
        className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 rounded-full bg-gray-100 p-2"
        style={{
          boxShadow:
            "1px 0.3px 5px rgb(0, 0, 0, 0.23), -1px 0.3px 5px rgb(0, 0, 0, 0.23)",
        }}
      >
        <img className="w-4" src={previousArrow} alt="" />
      </button>
      <button
        onClick={() => handleSlider("right")}
        className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 rounded-full bg-gray-100 p-2"
        style={{
          boxShadow:
            "1px 0.3px 5px rgb(0, 0, 0, 0.23), -1px 0.3px 5px rgb(0, 0, 0, 0.23)",
        }}
      >
        <img className="w-4" src={nextArrow} alt="" />
      </button>

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          ref={SliderRef}
          className="flex space-x-4 transition-transform duration-500"
        >
          {listitem.map((item, index) => (
            <div key={index}>
              {" "}
              {/* Fixed width for each card */}
              <CardItem
                image={item.productPhoto || item.image}
                price={item.productPrice || item.price}
                description={item.productTitle || item.description}
                asin={item.productAsin || item.asin}
                ishome={ishome}
                iswatchlist={iswatchlist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
