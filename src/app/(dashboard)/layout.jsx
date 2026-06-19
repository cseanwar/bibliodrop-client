"use client";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardSidebar />

      <main
        className="
          lg:ml-72
          min-h-screen
          px-4
          sm:px-6
          lg:px-8
          py-6
        "
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}