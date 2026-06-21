"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { updateReview } from "@/lib/actions/reviews";

export default function EditReviewModal({ isOpen, onClose, review, refetch }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    values: {
      rating: review?.rating || 5,
      comment: review?.comment || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateReview(review._id, data);

      toast.success("Review updated");

      refetch();

      onClose();
    } catch {
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Review</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="number"
            min="1"
            max="5"
            {...register("rating")}
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            rows={5}
            {...register("comment")}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
