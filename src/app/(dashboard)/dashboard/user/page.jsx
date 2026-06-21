"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

import {
  getUserDashboardStats,
  getUserChartData,
} from "@/lib/actions/userDashboard";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function UserDashboardPage() {
  const { data: session } = useSession();

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    loadDashboard();
  }, [session]);

  const loadDashboard = async () => {
    const [statsData, chart] = await Promise.all([
      getUserDashboardStats(session.user.email),
      getUserChartData(session.user.email),
    ]);

    setStats(statsData);
    setChartData(chart);
  };

  if (!stats) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Dashboard</h1>

        <p className="text-slate-500">Reading overview and activity.</p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-6">
          <h3 className="text-slate-500">Books Read</h3>

          <p className="text-4xl font-bold mt-2">{stats.totalBooksRead}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-6">
          <h3 className="text-slate-500">Pending Deliveries</h3>

          <p className="text-4xl font-bold mt-2">{stats.pendingDeliveries}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-6">
          <h3 className="text-slate-500">Total Spent</h3>

          <p className="text-4xl font-bold mt-2">${stats.totalSpent}</p>
        </div>
      </div>

      {/* Chart */}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border p-6">
        <h2 className="text-xl font-bold mb-6">Reading Activity</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="books" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
