import React from "react";
import { useNavigate } from "react-router-dom";
export default function Carditem2({ image, name, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col group w-[15rem] items-center justify-center gap-2"
      onClick={() => navigate(`${id}/products`)}
    >
      <div className="h-[70%] w-[80%] aspect-square bg-gray-200 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover my-auto"
          src={image}
          alt=""
        />
      </div>
      <div className="group-[&:hover]:border-b-2 pb-1 border-black">
        <p className="text-base font-semibold">{name}</p>
      </div>
    </div>
  );
}
