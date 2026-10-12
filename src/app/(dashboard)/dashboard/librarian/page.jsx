"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getLibrarianStats } from "@/lib/actions/librarian";
import { FaBook, FaMoneyBillWave, FaShippingFast, FaFire } from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import StatCard from "@/components/StateCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const BAR_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

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

  const chartData =
    stats.mostRequestedBooks?.length > 0
      ? stats.mostRequestedBooks.map((item) => ({
          name:
            item._id?.length > 20
              ? `${item._id.substring(0, 18)}...`
              : item._id || "Untitled",
          requests: item.requests,
        }))
      : [
          { name: "Books Listed", requests: stats.totalBooksListed || 0 },
          { name: "Pending", requests: stats.activePendingRequests || 0 },
        ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Librarian Dashboard</h1>

        <p className="text-slate-500">Overview of your library and performance.</p>
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

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Most Requested Books</h2>
            <p className="text-sm text-slate-500">
              Delivery requests distribution across your listings
            </p>
          </div>
          <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <FaFire size={18} />
          </span>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mini-list of Most Requested Books */}
      {stats.mostRequestedBooks?.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-4">Top Requested Books</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {stats.mostRequestedBooks.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-semibold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {item._id || "Untitled"}
                  </span>
                </div>
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {item.requests} {item.requests === 1 ? "request" : "requests"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
