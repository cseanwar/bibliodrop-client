"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaHeart, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

import {
  getBookById,
  getRelatedBooks,
  deleteBook,
  toggleBookStatus,
} from "@/lib/actions/books";
import {
  getReviewsByBook,
  canReviewBook,
  addReview,
} from "@/lib/actions/reviews";
import { createCheckoutSession } from "@/lib/actions/payment";

import CardSkeleton from "@/components/CardSkeleton";
import BookCard from "@/components/BookCard";
import EditModal from "@/components/EditModal";
import DeleteConfirmModal from "@/components/DeleteConfirmationModal";
import ActionIconButton from "@/components/shared/ActionIconButton";
import { addToWishlist } from "@/lib/actions/wishlists";
import { FaLock, FaTruck, FaShieldAlt, FaStar, FaTimes, FaCalendarAlt } from "react-icons/fa";

export default function BookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [relatedBooks, setRelatedBooks] = useState([]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="aspect-2/3 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-sm" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-sm" />
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-sm" />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="h-56 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          </div>
        </div>
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

  const handleWishlist = async () => {
    if (!session) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    try {
      await addToWishlist(book._id, session.user.email);

      toast.success("Added to wishlist");
    } catch (error) {
      toast.error(error.message || "Failed to add wishlist");
    }
  };

  if (!book) {
    return (
      <div className="text-center py-20 text-slate-500">Book not found.</div>
    );
  }

  const isOwner = session?.user?.email === book.librarianEmail;
  const isLibrarian = session?.user?.role === "librarian";
  const isCheckedOut = book.availability === "Checked Out";
  const disableRequest = isOwner || isLibrarian || isCheckedOut;

  const handleTogglePublish = async () => {
    try {
      setToggleLoading(true);
      await toggleBookStatus(book._id);
      toast.success("Book status updated");
      await loadBook();
    } catch {
      toast.error("Cannot publish pending book");
    } finally {
      setToggleLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteBook(book._id);
      toast.success("Book deleted successfully");
      router.push("/books");
    } catch {
      toast.error("Failed to delete book");
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleRequestDeliveryClick = () => {
    if (!session) {
      toast.error("Please login first to request delivery");
      router.push("/login");
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleProceedToStripe = async () => {
    try {
      setCheckoutLoading(true);
      const result = await createCheckoutSession({
        bookId: book._id,
        title: book.title,
        deliveryFee: book.deliveryFee,
        userEmail: session.user.email,
      });

      if (result?.url) {
        window.location.href = result.url;
      } else {
        toast.error("Failed to generate payment link");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment initialization failed");
    } finally {
      setCheckoutLoading(false);
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
              <span className="text-yellow-500 text-lg">
                {"⭐".repeat(Math.max(1, Math.min(5, Math.round(Number(averageRating) || 5))))}
              </span>

              <span className="font-semibold">{averageRating > 0 ? averageRating : "New"}</span>

              <span className="text-slate-500">
                ({reviews.length} {reviews.length === 1 ? "Review" : "Reviews"})
              </span>
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
                <p
                  className={`font-semibold ${isCheckedOut ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {isCheckedOut ? "Checked Out" : "Available"}
                </p>
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
          <div className="rounded-2xl border p-5 bg-slate-50 dark:bg-slate-900 mb-8">
            <div className="mb-6">
              <p className="text-sm text-slate-500">Delivery Fee</p>

              <p className="text-4xl font-bold text-blue-600">
                ${book.deliveryFee}
              </p>
            </div>

            {isOwner && (
              <p className="mb-3 text-sm text-amber-600">
                You are the owner of this book listing.
              </p>
            )}

            {!isOwner && isLibrarian && (
              <p className="mb-3 text-sm text-amber-600">
                Librarians cannot request books for delivery.
              </p>
            )}

            {isCheckedOut && (
              <p className="mb-3 text-sm text-red-600">
                This book is currently checked out.
              </p>
            )}

            <button
              disabled={disableRequest}
              onClick={handleRequestDeliveryClick}
              className={`w-full py-3.5 cursor-pointer rounded-2xl font-bold transition shadow-sm flex items-center justify-center gap-2
                ${disableRequest
                  ? "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              <FaTruck />
              Request Delivery
            </button>
          </div>

          {/* Librarian Owner Controls */}
          {isOwner && (
            <div className="rounded-2xl border p-5 bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 mb-8 space-y-3">
              <h3 className="font-bold text-amber-900 dark:text-amber-200">
                Librarian Controls
              </h3>
              <p className="text-xs text-slate-500">
                Manage your book listing directly:
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <ActionIconButton
                  icon={FaEdit}
                  name="Edit Details"
                  onClick={() => setIsEditOpen(true)}
                  variant="primary"
                  size={19}
                />

                <ActionIconButton
                  icon={book.status === "Published" ? FaEyeSlash : FaEye}
                  name={
                    book.status === "Published"
                      ? "Unpublish Book"
                      : "Publish Book"
                  }
                  onClick={handleTogglePublish}
                  disabled={toggleLoading}
                  variant={book.status === "Published" ? "warning" : "success"}
                  size={19}
                />

                <ActionIconButton
                  icon={FaTrash}
                  name="Delete Book"
                  onClick={() => setShowDeleteModal(true)}
                  variant="danger"
                  size={19}
                />
              </div>
            </div>
          )}

          {/* Librarian Card */}
          <div className="rounded-2xl border p-5 bg-slate-50 dark:bg-slate-900 mb-8">
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

          {/* User wishlist card */}
          {!isOwner && session?.user?.role !== "librarian" && (
            <button
              onClick={handleWishlist}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600 text-white cursor-pointer hover:bg-pink-700 transition font-medium"
            >
              <FaHeart />
              Add to Wishlist
            </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Read verified feedback from readers who have borrowed this book.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-blue-100 dark:border-slate-700">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {averageRating > 0 ? averageRating : "New"}
            </span>
            <div className="text-amber-400 flex items-center text-sm">
              {"★".repeat(Math.max(1, Math.min(5, Math.round(Number(averageRating) || 5))))}
            </div>
            <span className="text-xs text-slate-500">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {/* Rating Breakdown Bars */}
        {reviews.length > 0 && (
          <div className="grid sm:grid-cols-5 gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mb-8">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
              return (
                <div key={star} className="flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    {star} <FaStar className="text-amber-400 text-[10px]" />
                  </span>
                  <div className="w-32 sm:w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        )}

        {session && !canReview && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm flex items-center gap-3">
            <FaShieldAlt className="text-lg shrink-0 text-amber-600" />
            <span>
              Verified Reviews Only: You can share your review and rating once this book has been marked as <strong>Delivered</strong> to you.
            </span>
          </div>
        )}

        {canReview && (
          <form onSubmit={handleReviewSubmit} className="mb-10 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Leave a Verified Review</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full sm:w-60 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800 text-sm"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Great Read)</option>
                <option value={3}>⭐⭐⭐ (3 - Good)</option>
                <option value={2}>⭐⭐ (2 - Fair)</option>
                <option value={1}>⭐ (1 - Needs Improvement)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Review Comments
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you enjoy about the plot, characters, or writing style?"
                required
                className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-sm cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        )}

        {reviews.length === 0 ? (
          <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center bg-white dark:bg-slate-900 shadow-xs">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              No reviews yet for this title.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Be the first reader to request and review this book once delivered!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="border border-slate-200 dark:border-slate-800 rounded-3xl p-5 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {review.userName?.charAt(0) || "R"}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{review.userName || "Verified Reader"}</h4>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Verified Delivery</span>
                    </div>
                  </div>

                  <span className="text-amber-400 text-sm">
                    {"★".repeat(review.rating)}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{review.comment}</p>
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

      {/* Edit Modal for Librarian Owner */}
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        book={book}
        refetch={loadBook}
      />

      {/* Delete Confirmation Modal for Librarian Owner */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book Listing"
        message="Are you sure you want to delete this book listing? This action cannot be undone."
      />

      {/* Pre-Checkout Order Review Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <FaTruck />
              Confirm Delivery Request
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Review Order Details
            </h3>

            {/* Book Info Summary */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-6">
              <div className="relative w-16 h-22 rounded-lg overflow-hidden shrink-0 border bg-slate-200">
                <Image src={book.image} alt={book.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  by {book.author}
                </p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Deliver to:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{session?.user?.name || "Reader"}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Contact Email:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{session?.user?.email}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Estimated Arrival:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">2–4 business days</span>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="border-t border-b border-slate-200 dark:border-slate-800 py-3 mb-6 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Book Rental / Borrowing:</span>
                <span className="font-medium text-slate-900 dark:text-white">$0.00 (Free)</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Standard Delivery Fee:</span>
                <span className="font-medium text-slate-900 dark:text-white">${Number(book.deliveryFee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Payment:</span>
                <span className="text-blue-600 dark:text-blue-400">${Number(book.deliveryFee).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <FaLock className="text-emerald-500 text-xs shrink-0" />
              <span>Payments are processed securely through Stripe 256-bit SSL encryption.</span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={checkoutLoading}
                onClick={handleProceedToStripe}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition shadow-sm cursor-pointer"
              >
                <FaLock className="text-xs" />
                {checkoutLoading ? "Redirecting..." : "Proceed to Stripe Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
