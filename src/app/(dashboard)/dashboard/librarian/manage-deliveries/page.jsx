"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import {
  getLibrarianDeliveries,
  updateDeliveryStatus,
} from "@/lib/actions/deliveries";

export default function ManageDeliveriesPage() {
  const { data: session } = useSession();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      const data = await getLibrarianDeliveries(session?.user?.email);

      setDeliveries(data || []);
    } catch {
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchDeliveries();
    }
  }, [session]);

  const handleStatusUpdate = async (id) => {
    try {
      await updateDeliveryStatus(id);

      toast.success("Status updated");

      fetchDeliveries();
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading deliveries...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Deliveries</h1>

        <p className="text-slate-500 mt-2">
          Track and update delivery requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border">
          <h3 className="text-slate-500 text-sm">Total Requests</h3>
          <p className="text-3xl font-bold mt-2">{deliveries.length}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border">
          <h3 className="text-slate-500 text-sm">Pending</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-500">
            {deliveries.filter((d) => d.status === "Requested").length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border">
          <h3 className="text-slate-500 text-sm">Delivered</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">
            {deliveries.filter((d) => d.status === "Delivered").length}
          </p>
        </div>
      </div>

      {/* Table */}
      {deliveries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold">No delivery requests found</h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left">Client</th>

                <th className="px-6 py-4 text-left">Book</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery._id} className="border-b">
                  <td className="px-6 py-4">{delivery.userName}</td>

                  <td className="px-6 py-4">{delivery.bookTitle}</td>

                  <td className="px-6 py-4">
                    {new Date(delivery.requestedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm
                        ${
                          delivery.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : delivery.status === "Dispatched"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {delivery.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {delivery.status !== "Delivered" ? (
                      <button
                        onClick={() => handleStatusUpdate(delivery._id)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                      >
                        Update Status
                      </button>
                    ) : (
                      <span className="text-green-600 font-medium">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
