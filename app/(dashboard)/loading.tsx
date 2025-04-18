import { Loader } from "@/components/loaders/Loader";
import React from "react";

function DashboardLoading() {
  return (
    <div className="h-[50vh] w-full flex items-center justify-center">
      <Loader size={20} />
    </div>
  );
}

export default DashboardLoading;
