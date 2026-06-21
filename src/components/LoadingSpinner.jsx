"use client";

import { BeatLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-75">
      <BeatLoader size={12} color="#3b82f6" />
    </div>
  );
}
