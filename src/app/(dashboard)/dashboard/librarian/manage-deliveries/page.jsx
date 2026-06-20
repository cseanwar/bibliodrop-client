"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  getLibrarianDeliveries,
  updateDeliveryStatus,
} from "@/lib/actions/deliveries";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ManageDeliveriesPage() {
  const { data: session } = useSession();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!session?.user?.email) return;

    try {
      const data = await getLibrarianDeliveries(session.user.email);

      setDeliveries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [session]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDeliveryStatus(id, status);

      toast.success("Status updated");

      loadData();
    } catch {
      toast.error("Failed to update");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading deliveries...</div>;
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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-950">
                <th className="p-4 text-left">Book</th>
                <th className="p-4 text-left">Borrower</th>
                <th className="p-4 text-left">Fee</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {deliveries.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.bookImage}
                        alt=""
                        width={60}
                        height={80}
                        className="rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">{item.bookTitle}</h3>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      <p className="font-medium">{item.borrowerName}</p>

                      <p className="text-sm text-slate-500">
                        {item.borrowerEmail}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">${item.deliveryFee}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className="border rounded-xl px-3 py-2"
                    >
                      <option>Requested</option>

                      <option>Approved</option>

                      <option>Picked Up</option>

                      <option>In Transit</option>

                      <option>Delivered</option>

                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {deliveries.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No delivery requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
