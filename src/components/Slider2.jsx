import React, { useRef, useState } from "react";
import CardItem from "./Carditem"; // Import the CardItem component
import largeimg from "../assets/large image.png"; // Replace this with actual image paths
import nextArrow from "../assets/right-arrow.png";
import previousArrow from "../assets/left-arrow.png";
import Carditem2 from "./CardItem2.0";
import demoimg2 from "../assets/demoimgmobile.webp";

export default function Slider2({ listitem }) {
  const SliderRef = useRef(null); // Reference to the slider container
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle left and right navigation
  const handleSlider = (direction) => {
    const cardWidth = 15; // Assuming each card has a fixed width of 256px (adjust as needed)

    // Determine the new scroll position based on the direction
    let newIndex = currentIndex;
    if (direction === "left" && currentIndex > 1) {
      newIndex = currentIndex - 2;
    } else if (direction === "right" && currentIndex < listitem.length - 4) {
      newIndex = currentIndex + 2;
    }

    // Update the transform style to move the slider
    SliderRef.current.style.transform = `translateX(-${
      newIndex * cardWidth
    }rem)`;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full p-4 relative">
      <h3 className="text-2xl font-bold mb-4">Get your home ready for fall</h3>

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
        <div ref={SliderRef} className="flex transition-transform duration-500">
          {listitem.map((item, index) => (
            <div key={index}>
              {" "}
              {/* Fixed width for each card */}
              <Carditem2 name={item.name} image={item.image} id={item.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
