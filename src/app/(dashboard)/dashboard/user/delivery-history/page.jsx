"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import { getUserDeliveries } from "@/lib/actions/deliveries";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function DeliveryHistoryPage() {
  const { data: session } = useSession();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getUserDeliveries(session?.user?.email);

      setDeliveries(data || []);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchHistory();
    }
  }, [session]);

  if (loading) {
      return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Delivery History</h1>

        <p className="text-slate-500 mt-2">Track your requested books.</p>
      </div>

      {deliveries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold">No delivery history found</h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left">Book</th>

                <th className="px-6 py-4 text-left">Fee</th>

                <th className="px-6 py-4 text-left">Request Date</th>

                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery._id} className="border-b">
                  <td className="px-6 py-4">{delivery.bookTitle}</td>

                  <td className="px-6 py-4">${delivery.deliveryFee}</td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
