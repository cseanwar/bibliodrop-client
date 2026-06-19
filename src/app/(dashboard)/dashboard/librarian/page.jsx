"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  FaBook,
  FaMoneyBillWave,
  FaClock,
  FaArrowTrendUp,
} from "react-icons/fa6";

const stats = [
  {
    title: "Total Books Listed",
    value: 148,
    icon: FaBook,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Total Earnings",
    value: "$2,450",
    icon: FaMoneyBillWave,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Pending Requests",
    value: 17,
    icon: FaClock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const chartData = [
  {
    month: "Jan",
    books: 15,
  },
  {
    month: "Feb",
    books: 22,
  },
  {
    month: "Mar",
    books: 18,
  },
  {
    month: "Apr",
    books: 30,
  },
  {
    month: "May",
    books: 26,
  },
  {
    month: "Jun",
    books: 38,
  },
];

const popularBooks = [
  {
    title: "Atomic Habits",
    requests: 46,
  },
  {
    title: "The Psychology of Money",
    requests: 39,
  },
  {
    title: "Deep Work",
    requests: 28,
  },
  {
    title: "Rich Dad Poor Dad",
    requests: 25,
  },
];

export default function LibrarianOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Librarian Dashboard
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your books, requests and delivery performance.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-3xl
              p-6
              shadow-sm
            "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
                >
                  <Icon className={`text-2xl ${item.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}

      <div
        className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-3xl
        p-6
      "
      >
        <div className="flex items-center gap-3 mb-6">
          <FaArrowTrendUp className="text-blue-500" />

          <h2 className="font-semibold text-slate-900 dark:text-white">
            Monthly Book Requests
          </h2>
        </div>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="books" radius={[8, 8, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Books */}

      <div
        className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-3xl
        p-6
      "
      >
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">
          Most Requested Books
        </h2>

        <div className="space-y-4">
          {popularBooks.map((book, index) => (
            <div
              key={index}
              className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              bg-slate-50
              dark:bg-slate-800/50
            "
            >
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  {book.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  High demand book
                </p>
              </div>

              <span
                className="
                px-3 py-1
                rounded-full
                text-sm
                bg-blue-100
                dark:bg-blue-500/20
                text-blue-600
                dark:text-blue-400
                font-medium
              "
              >
                {book.requests} Requests
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
