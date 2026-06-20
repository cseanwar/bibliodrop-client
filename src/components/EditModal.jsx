"use client";

import { useForm } from "react-hook-form";
import { updateBook } from "@/lib/actions/books";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function EditModal({ isOpen, onClose, book, refetch }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        category: book.category,
        deliveryFee: book.deliveryFee,
        description: book.description,
      });
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    try {
      await updateBook(book._id, data);

      toast.success("Book updated");

      refetch();

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Book</h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              {...register("title")}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Author</label>

            <input
              {...register("author")}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>

            <input
              {...register("category")}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Delivery Fee</label>

            <input
              type="number"
              step="0.01"
              {...register("deliveryFee", {
                required: true,
              })}
              placeholder="49.99"
              className="w-full border rounded-xl px-4 py-3"
            />
            {/* <input
              type="number"
              {...register("deliveryFee")}
              className="w-full border rounded-xl px-4 py-3"
            /> */}
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={4}
              {...register("description")}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
