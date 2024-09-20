import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../redux/slices/productDetails/productDetailsApi";
import ItemDescription from "../components/ItemDesc";
export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(`${productId}`));
  }, [dispatch, productId]);

  const data = useSelector((state) => state.productDetail.productDetails);
  console.log("desc", data);
  if (!data) {
    return;
  }
  return (
    <div className="mt-3">
      <ItemDescription
        name={data.title}
        image={data.mainPhoto}
        description={data.description}
        price={data.originalPrice}
        sales={data.salesVolume}
        rating={data.starRating}
        additionalImages={data.additionalPhotos}
        customerFeedback={data.customerFeedback}
      />
    </div>
  );
}
