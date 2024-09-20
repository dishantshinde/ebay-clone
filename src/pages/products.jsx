import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/slices/products/productApi";
import Slider from "../components/Slider";

export default function Products() {
  const { categoryquery } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    if (categoryquery) {
      dispatch(fetchProducts(categoryquery));
    } else {
      console.log("error fetching products");
    }
  }, [dispatch, categoryquery]);
  if (!products) {
    return;
  }
  return (
    <>
      <Slider listitem={products} searched={categoryquery} />
    </>
  );
}
