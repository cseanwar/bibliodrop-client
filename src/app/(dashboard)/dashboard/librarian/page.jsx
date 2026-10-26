"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getLibrarianStats } from "@/lib/actions/librarian";
import {
  FaBook,
  FaMoneyBillWave,
  FaShippingFast,
  FaFire,
  FaChartArea,
  FaChartBar,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import StatCard from "@/components/StateCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const BAR_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

// Custom tooltip for earnings chart
const EarningsTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-lg text-sm">
        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
        <p className="text-blue-600 font-bold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for requests chart
const RequestsTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-lg text-sm">
        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
        <p className="text-blue-600 font-bold">{payload[0].value} {payload[0].value === 1 ? "request" : "requests"}</p>
      </div>
    );
  }
  return null;
};

export default function LibrarianDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [activeChart, setActiveChart] = useState("requests"); // "requests" | "earnings"

  useEffect(() => {
    if (session?.user?.email) {
      getLibrarianStats(session.user.email).then(setStats);
    }
  }, [session]);

  if (!stats) {
    return <LoadingSpinner />;
  }

  // Bar chart data — most requested books
  const requestsChartData =
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

  // Area chart data — monthly earnings
  const earningsChartData =
    stats.monthlyEarnings?.length > 0
      ? stats.monthlyEarnings
      : [{ month: "No data yet", earnings: 0 }];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Librarian Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your library and performance.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Books Listed"
          value={stats.totalBooksListed}
          icon={<FaBook />}
        />
        <StatCard
          title="Total Earnings"
          value={`$${Number(stats.totalEarnings || 0).toFixed(2)}`}
          icon={<FaMoneyBillWave />}
        />
        <StatCard
          title="Pending Requests"
          value={stats.activePendingRequests}
          icon={<FaShippingFast />}
        />
      </div>

      {/* Chart Card — tabbed between Requests & Earnings */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        {/* Chart Header + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">
              {activeChart === "requests" ? "Most Requested Books" : "Monthly Earnings"}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {activeChart === "requests"
                ? "Delivery requests distribution across your listings"
                : "Your earnings from completed deliveries over time"}
            </p>
          </div>

          {/* Tab toggle buttons */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveChart("requests")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeChart === "requests"
                  ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <FaChartBar size={13} />
              Requests
            </button>
            <button
              onClick={() => setActiveChart("earnings")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeChart === "earnings"
                  ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <FaChartArea size={13} />
              Earnings
            </button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === "requests" ? (
              <BarChart data={requestsChartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={1} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.12} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RequestsTooltip />} />
                <Bar dataKey="requests" radius={[8, 8, 0, 0]} maxBarSize={56}>
                  {requestsChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <AreaChart data={earningsChartData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.12} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<EarningsTooltip />} />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#earningsGrad)"
                  dot={{ fill: "#2563eb", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#1d4ed8" }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Requested Books list */}
      {activeChart === "requests" && stats.mostRequestedBooks?.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <FaFire size={14} />
            </span>
            <h2 className="text-xl font-bold">Top Requested Books</h2>
          </div>
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

      {/* Monthly Earnings breakdown list */}
      {activeChart === "earnings" && stats.monthlyEarnings?.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-4">Earnings Breakdown</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[...stats.monthlyEarnings].reverse().map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {item.month}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  ${Number(item.earnings).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
