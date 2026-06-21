"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllTransactions } from "@/lib/actions/admin";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();

      setTransactions(data || []);
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>

        <p className="text-slate-500 mt-2">View all platform payments.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No Transactions Found</h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left">Transaction ID</th>

                <th className="px-6 py-4 text-left">User Email</th>

                <th className="px-6 py-4 text-left">Librarian Email</th>

                <th className="px-6 py-4 text-left">Amount</th>

                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="border-b">
                  <td className="px-6 py-4 font-mono text-sm">
                    {txn.transactionId}
                  </td>

                  <td className="px-6 py-4">{txn.userEmail}</td>

                  <td className="px-6 py-4">{txn.librarianEmail}</td>

                  <td className="px-6 py-4 font-semibold">${txn.amount}</td>

                  <td className="px-6 py-4">
                    {new Date(txn.createdAt).toLocaleDateString()}
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
