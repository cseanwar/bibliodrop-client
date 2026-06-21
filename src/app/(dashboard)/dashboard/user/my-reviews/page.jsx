"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import { getUserReviews, deleteReview } from "@/lib/actions/reviews";

import EditReviewModal from "@/components/EditReviewModal";

export default function MyReviewsPage() {
  const { data: session } = useSession();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedReview, setSelectedReview] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getUserReviews(session?.user?.email);

      setReviews(data || []);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchReviews();
    }
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm("Delete review?")) return;

    try {
      await deleteReview(id);

      toast.success("Review deleted");

      fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading reviews...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Reviews</h1>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center">
          No reviews found
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-slate-900 border rounded-2xl p-5"
            >
              <h3 className="font-bold text-lg">{review.bookTitle}</h3>

              <p className="text-yellow-500 mt-2">Rating: {review.rating}/5</p>

              <p className="mt-3">{review.comment}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setSelectedReview(review);

                    setIsModalOpen(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
        refetch={fetchReviews}
      />
    </div>
  );
}
