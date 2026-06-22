"use client";

import { Skeleton } from "@heroui/react";

export default function CardSkeleton() {
  return (
    <div className="border rounded-2xl overflow-hidden">
      <Skeleton className="aspect-2/3 w-full" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-1/3 rounded-lg" />
      </div>
    </div>
  );
}
