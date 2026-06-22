"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

import { getBookById, getRelatedBooks } from "@/lib/actions/books";
import {
  getReviewsByBook,
  canReviewBook,
  addReview,
} from "@/lib/actions/reviews";
import { createCheckoutSession } from "@/lib/actions/payment";

import CardSkeleton from "@/components/CardSkeleton";
import BookCard from "@/components/books/BookCard";

export default function BookDetailsPage() {
  const { id } = useParams();

  const { data: session } = useSession();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    if (id && session?.user?.email) {
      checkReviewPermission();
    }
  }, [id, session]);

  const checkReviewPermission = async () => {
    try {
      const result = await canReviewBook(id, session.user.email);

      setCanReview(result.canReview);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBook();
    loadReviews();
  }, [id]);

  const loadBook = async () => {
    try {
      const data = await getBookById(id);
      setBook(data);
      await loadRelatedBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await getReviewsByBook(id);

      setReviews(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRelatedBooks = async (currentBook) => {
    try {
      const data = await getRelatedBooks(currentBook.category, currentBook._id);

      setRelatedBooks(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto py-12">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login first");
      return;
    }

    try {
      await addReview({
        bookId: book._id,
        userEmail: session.user.email,
        userName: session.user.name,
        rating,
        comment,
      });

      toast.success("Review submitted");

      setComment("");

      loadReviews();
    } catch {
      toast.error("Failed to submit review");
    }
  };

  if (!book) {
    return (
      <div className="text-center py-20 text-slate-500">Book not found.</div>
    );
  }

  const isOwner = session?.user?.email === book.librarianEmail;
  const isCheckedOut = book.availability === "Checked Out";
  const disableRequest = isOwner || isCheckedOut;

  const handleRequestDelivery = async () => {
    if (!session) {
      toast.error("Please login first");
      return;
    }
    try {
      const result = await createCheckoutSession({
        bookId: book._id,
        title: book.title,
        deliveryFee: book.deliveryFee,
        userEmail: session.user.email,
      });

      window.location.href = result.url;
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Main Section */}

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Book Cover */}

        <div className="lg:col-span-4">
          <div className="top-24">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-3xl border bg-slate-100 shadow-xl">
              <Image
                src={book.image}
                alt={book.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Book Info */}

        <div className="lg:col-span-5">
          <div className="space-y-6">
            <div>
              <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                {book.category}
              </span>

              <h1 className="mt-4 text-4xl font-bold">{book.title}</h1>

              <p className="mt-2 text-xl text-slate-500">{book.author}</p>
            </div>

            {/* Rating */}

            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>

              <span className="font-semibold">4.8</span>

              <span className="text-slate-500">(24 Reviews)</span>
            </div>

            {/* Meta */}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">Delivery Fee</p>

                <p className="font-bold text-xl text-blue-600">
                  ${book.deliveryFee}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">Status</p>

                <div className="rounded-xl border p-4">
                  <p className="text-sm text-slate-500">Availability</p>

                  <p
                    className={`font-semibold ${
                      isCheckedOut ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isCheckedOut ? "Checked Out" : "Available"}
                  </p>
                </div>

                {/* <p
                  className={`font-semibold ${
                    isCheckedOut ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isCheckedOut ? "Checked Out" : "Available"}
                </p> */}
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">Added On</p>

                <p className="font-medium">
                  {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">Category</p>

                <p className="font-medium">{book.category}</p>
              </div>
            </div>

            {/* Description */}

            <div>
              <h2 className="text-2xl font-bold mb-3">Description</h2>

              <p className="leading-8 text-slate-600 dark:text-slate-300">
                {book.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Action Panel */}

        <div className="lg:col-span-3">
          <div className="top-24 rounded-3xl border p-6 shadow-sm mb-10">
            <div className="mb-6">
              <p className="text-sm text-slate-500">Delivery Fee</p>

              <p className="text-4xl font-bold text-blue-600">
                ${book.deliveryFee}
              </p>
            </div>

            {isOwner && (
              <p className="mb-3 text-sm text-amber-600">
                You cannot request your own book.
              </p>
            )}

            {isCheckedOut && (
              <p className="mb-3 text-sm text-red-600">
                This book is currently checked out.
              </p>
            )}

            <button
              disabled={disableRequest}
              onClick={handleRequestDelivery}
              className={`w-full py-3 cursor-pointer rounded-xl font-semibold transition
                ${
                  disableRequest
                    ? "bg-slate-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              Request Delivery
            </button>
          </div>
          {/* Librarian Card */}

          <div className="rounded-2xl border p-5 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold mb-2">Listed By</h3>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {book.librarianName?.charAt(0) || "L"}
              </div>

              <div>
                <p className="font-semibold">
                  {book.librarianName || "Librarian"}
                </p>

                <p className="text-sm text-slate-500">{book.librarianEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Reviews</h2>

          <div className="text-slate-500">
            ⭐ {averageRating} ({reviews.length} Reviews)
          </div>
        </div>

        {session && !canReview && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
            You can review this book only after receiving the delivery.
          </div>
        )}

        {canReview && (
          <form onSubmit={handleReviewSubmit} className="mb-10 space-y-4">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-xl p-3"
            >
              <option value={5}>⭐⭐⭐⭐⭐</option>

              <option value={4}>⭐⭐⭐⭐</option>

              <option value={3}>⭐⭐⭐</option>

              <option value={2}>⭐⭐</option>

              <option value={1}>⭐</option>
            </select>

            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-xl p-3"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Submit Review
            </button>
          </form>
        )}

        {reviews.length === 0 ? (
          <div className="border rounded-2xl p-8 text-slate-500">
            No reviews yet.
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border rounded-2xl p-5">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{review.userName}</h4>

                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Books */}
      <section className="mt-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Related Books</h2>

          <p className="text-slate-500 mt-2">More books in the same category</p>
        </div>

        {relatedBooks.length === 0 ? (
          <div className="border rounded-2xl p-8 text-center text-slate-500">
            No related books found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
