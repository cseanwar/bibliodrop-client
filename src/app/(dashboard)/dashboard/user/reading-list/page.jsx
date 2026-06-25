"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getReadingList } from "@/lib/actions/deliveries";
import { getWishlist, removeFromWishlist } from "@/lib/actions/wishlists";
import LoadingSpinner from "@/components/LoadingSpinner";
import BookCard from "@/components/BookCard";

export default function ReadingListPage() {
  const { data: session } = useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState([]);

  const fetchReadingList = async () => {
    try {
      const data = await getReadingList(session?.user?.email);
      const wishlistData = await getWishlist(session?.user?.email);

      setBooks(data || []);
      setWishlist(wishlistData);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load reading list");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromWishlist(bookId, session.user.email);
      setWishlist((prev) => prev.filter((book) => book.bookId !== bookId));

      toast.success("Removed from wishlist");
    } catch (error) {
      console.error(error);

      toast.error("Failed to remove wishlist item");
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
    <div className="pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Reading List</h1>

        <p className="text-slate-500 mt-2">
          Books successfully delivered to you.
        </p>
      </div>

      {/* Empty State */}
      <div className="space-y-15">
        {/* Reading List */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Reading List</h2>

          {books.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border p-10 text-center">
              <h2 className="text-xl font-semibold">
                No books in your reading list.
              </h2>
              <p className="text-slate-500 mt-2">
                Delivered books will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </section>

        {/* Wishlist */}
        <section>
          <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

          {wishlist.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border p-10 text-center">
              <h2 className="text-xl font-semibold">
                No books in your wishing list
              </h2>

              <p className="text-slate-500 mt-2">
                The books you are wish to read will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlist.map((book) => (
                  <div key={book._id}>
                    <BookCard book={book} />

                    <button
                      onClick={() => handleRemove(book._id)}
                      className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg cursor-pointer"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
