"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import {
  getLibrarianDeliveries,
  updateDeliveryStatus,
} from "@/lib/actions/deliveries";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ManageDeliveriesPage() {
  const { data: session } = useSession();

  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      if (!session?.user?.email) return;

      const data = await getLibrarianDeliveries(session.user.email);

      setDeliveries(data || []);
    } catch {
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [session]);

  const handleStatusChange = async (delivery) => {
    try {
      let nextStatus = "";

      if (delivery.status === "Pending") {
        nextStatus = "Dispatched";
      } else if (delivery.status === "Dispatched") {
        nextStatus = "Delivered";
      } else {
        return;
      }

      await updateDeliveryStatus(delivery._id, nextStatus);

      toast.success(`Marked as ${nextStatus}`);

      fetchDeliveries();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
      return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Deliveries</h1>

        <p className="text-slate-500 mt-2">Update delivery progress.</p>
      </div>

      {deliveries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No Delivery Requests</h2>
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
                      className={`px-3 py-1 rounded-full text-sm
                      ${
                        delivery.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : delivery.status === "Dispatched"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {delivery.status !== "Delivered" ? (
                      <button
                        onClick={() => handleStatusChange(delivery)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                      >
                        {delivery.status === "Pending"
                          ? "Dispatch"
                          : "Mark Delivered"}
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
