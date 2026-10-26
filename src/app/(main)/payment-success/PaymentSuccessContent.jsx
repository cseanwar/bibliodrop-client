"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import { createDeliveryRequest } from "@/lib/actions/deliveries";

export default function PaymentSuccessContent() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const [processed, setProcessed] = useState(false);

  const bookId = searchParams.get("bookId");

  const updateDeliveryRequest = async () => {
    try {
      await createDeliveryRequest({
        bookId,
        userEmail: session.user.email,
        userName: session.user.name,
      });

      toast.success("Delivery request created");
    } catch (error) {
      console.error(error);

      toast.error(error?.message || "Failed to create delivery request");
    }
  };

  useEffect(() => {
    if (processed) return;

    if (!session?.user?.email || !bookId) return;

    updateDeliveryRequest();

    setProcessed(true);
  }, [bookId, session, processed]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-4xl text-emerald-600 dark:text-emerald-400 shadow-sm animate-bounce">
          ✓
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Payment Confirmed!
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Thank you! Your delivery fee payment was successful and your book request has been placed in the dispatch queue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard/user/delivery-history"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm"
          >
            Track in Delivery History
          </Link>

          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition"
          >
            Browse More Books
          </Link>
        </div>
      </div>
    </div>
  );
}
