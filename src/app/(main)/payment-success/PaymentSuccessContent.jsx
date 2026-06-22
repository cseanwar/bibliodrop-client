"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function PaymentSuccessContent() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const [processed, setProcessed] = useState(false);

  const bookId = searchParams.get("bookId");

  useEffect(() => {
    if (processed) return;

    if (!session?.user?.email || !bookId) return;

    updateDeliveryRequest();

    setProcessed(true);
  }, [bookId, session, processed]);

  const updateDeliveryRequest = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delivery-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId,
            userEmail: session.user.email,
            userName: session.user.name,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Delivery request created");
    } catch (error) {
      console.error(error);

      toast.error(error?.message || "Failed to create delivery request");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-4xl font-bold mb-4">Payment Successful</h1>

        <p className="text-slate-500 mb-5">
          Your delivery request has been submitted.
        </p>

        <Link
          href="/books"
          className="
            inline-flex
            items-center
            justify-center
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-4
            rounded-xl
            font-semibold
            shadow-lg
            shadow-blue-500/20
            transition
          "
        >
          <BiArrowBack />
          <span className="pl-2">Back For Browse More Books</span>
        </Link>
      </div>
    </div>
  );
}
