import { Loader } from "@/components/loaders/Loader";
import React from "react";

function ProjectLoading() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Loader size={30} />;
    </main>
  );
}

export default ProjectLoading;
