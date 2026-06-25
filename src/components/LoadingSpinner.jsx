"use client";

import { BeatLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <BeatLoader size={15} color="#3b82f6" />
    </div>
  );
}
