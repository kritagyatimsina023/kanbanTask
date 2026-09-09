import React from "react";
import { LoaderCircle } from "lucide-react";

const CommonLoader = () => {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle className="size-7 animate-spin text-neutral-500" />

        <p className="text-sm font-medium text-neutral-500">Loading...</p>
      </div>
    </div>
  );
};

export default CommonLoader;
