"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAdminStats } from "@/lib/actions/admin";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getAdminStats();

      setStats(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load dashboard");
    }
  };

  if (!stats) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  const chartData = stats.categoryData.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-slate-500 mt-2">Platform overview and statistics.</p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6">
          <p className="text-slate-500">Total Users</p>

          <h2 className="text-4xl font-bold mt-2">{stats.totalUsers}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6">
          <p className="text-slate-500">Total Books</p>

          <h2 className="text-4xl font-bold mt-2">{stats.totalBooks}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6">
          <p className="text-slate-500">Total Deliveries</p>

          <h2 className="text-4xl font-bold mt-2">{stats.totalDeliveries}</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6">
          <p className="text-slate-500">Total Revenue</p>

          <h2 className="text-4xl font-bold mt-2">${stats.totalRevenue}</h2>
        </div>
      </div>

      {/* Chart */}

      <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Books by Category</h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
