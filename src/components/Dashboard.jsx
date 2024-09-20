import React from "react";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
export default function Dashboard() {
  return (
    <div className="min-h-[100vh] w-[93vw] mx-auto">
      <Outlet />
      <div className="flex w-[100%] gap-8"></div>
    </div>
  );
}
