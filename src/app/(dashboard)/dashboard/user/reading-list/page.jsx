"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";
import { getReadingList } from "@/lib/actions/deliveries";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ReadingListPage() {
  const { data: session } = useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReadingList = async () => {
    try {
      const data = await getReadingList(session?.user?.email);

      setBooks(data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load reading list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchReadingList();
    }
  }, [session]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Reading List</h1>

        <p className="text-slate-500 mt-2">
          Books successfully delivered to you.
        </p>
      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border p-10 text-center">
          <h2 className="text-xl font-semibold">
            No books in your reading list
          </h2>

          <p className="text-slate-500 mt-2">
            Delivered books will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="relative h-72">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>

                <p className="text-slate-500 mt-1">{book.author}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {book.category}
                  </span>

                  <span className="font-semibold">${book.deliveryFee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
