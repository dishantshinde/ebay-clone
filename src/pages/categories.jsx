import React from "react";
import AdCard from "./../components/AdCard";
import Slider2 from "./../components/Slider2";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";
export default function Categories() {
  const deals = useSelector((state) => state.deal.deals);
  const productData = useSelector((state) => state.product.topdeals);
  if (!productData || !deals) {
    return;
  }
  return (
    <>
      <AdCard listitem={deals} />
      <Slider listitem={productData} searched={"Top Deals"} ishome={true} />
    </>
  );
}
