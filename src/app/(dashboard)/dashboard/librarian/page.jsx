"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getLibrarianStats } from "@/lib/actions/librarian";
import { FaBook, FaMoneyBillWave, FaShippingFast } from "react-icons/fa";
import StatCard from "@/components/StateCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LibrarianDashboard() {
  const { data: session } = useSession();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      getLibrarianStats(session.user.email).then(setStats);
    }
  }, [session]);

  if (!stats) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Librarian Dashboard</h1>

        <p className="text-slate-500">Overview of your library.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Books Listed"
          value={stats.totalBooksListed}
          icon={<FaBook />}
        />

        <StatCard
          title="Total Earnings"
          value={`$${stats.totalEarnings}`}
          icon={<FaMoneyBillWave />}
        />

        <StatCard
          title="Pending Requests"
          value={stats.activePendingRequests}
          icon={<FaShippingFast />}
        />
      </div>
    </div>
  );
}
