"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getLibrarianStats } from "@/lib/actions/librarian";

export default function LibrarianDashboard() {
  const { data: session } = useSession();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      getLibrarianStats(session.user.email).then(setStats);
    }
  }, [session]);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Librarian Dashboard</h1>

        <p className="text-slate-500">Overview of your library.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border">
          <h3 className="text-slate-500 text-base">Total Books Listed</h3>

          <p className="text-4xl font-bold mt-2">{stats.totalBooksListed}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border">
          <h3 className="text-slate-500 text-base">Total Earnings</h3>

          <p className="text-4xl font-bold mt-2">${stats.totalEarnings}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border">
          <h3 className="text-slate-500 text-base">Pending Requests</h3>

          <p className="text-4xl font-bold mt-2">
            {stats.activePendingRequests}
          </p>
        </div>
      </div>
    </div>
  );
}
