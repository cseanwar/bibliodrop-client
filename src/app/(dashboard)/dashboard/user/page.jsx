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
import { FaBookOpen, FaTruck, FaDollarSign } from "react-icons/fa";
import StatCard from "@/components/StateCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function UserDashboardPage() {
  const { data: session } = useSession();

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    loadDashboard();
  }, [session]);

  const loadDashboard = async () => {
    try {
      const [statsData, chart] = await Promise.all([
        getUserDashboardStats(session.user.email),
        getUserChartData(session.user.email),
      ]);

      setStats(
        statsData || {
          totalBooksRead: 0,
          pendingDeliveries: 0,
          totalSpent: 0,
        }
      );
      setChartData(chart || []);
    } catch (error) {
      console.error("Failed to load user dashboard:", error);
      setStats({
        totalBooksRead: 0,
        pendingDeliveries: 0,
        totalSpent: 0,
      });
      setChartData([]);
    }
  };

  if (!stats) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Dashboard</h1>

        <p className="text-slate-500">Reading overview and activity.</p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Books Read"
          value={stats.totalBooksRead}
          icon={<FaBookOpen />}
        />

        <StatCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={<FaTruck />}
        />

        <StatCard
          title="Total Spent"
          value={`$${(Number(stats.totalSpent) || 0).toFixed(2)}`}
          icon={<FaDollarSign />}
        />
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
