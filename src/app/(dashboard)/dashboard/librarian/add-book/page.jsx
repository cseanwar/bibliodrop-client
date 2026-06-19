"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { addBook } from "@/lib/actions/books";
import { imageUploadInImgBB } from "@/utilities/imageUploadInImgBB";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddBookPage() {
  const router = useRouter();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      toast.loading("Uploading book image...", {
        id: "book-upload",
      });

      const imageFile = data.image[0];

      const imageUrl = await imageUploadInImgBB(imageFile);

      if (!imageUrl) {
        toast.error("Image upload failed", {
          id: "book-upload",
        });
        return;
      }

      const newBook = {
        title: data.title,
        author: data.author,
        description: data.description,
        category: data.category,
        deliveryFee: Number(data.deliveryFee),

        image: imageUrl,

        status: "Pending Approval",

        librarianName: session?.user?.name,
        librarianEmail: session?.user?.email,
        librarianId: session?.user?.id,
      };

      await addBook(newBook);

      toast.success("Book submitted for approval", {
        id: "book-upload",
      });

      reset();

      router.push("/dashboard/librarian");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add book", {
        id: "book-upload",
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add New Book
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Newly submitted books require admin approval before appearing
          publicly.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Book Title</label>

            <input
              {...register("title", {
                required: "Title is required",
              })}
              placeholder="Atomic Habits"
              className="w-full border rounded-xl px-4 py-3 bg-transparent"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block mb-2 font-medium">Author</label>

            <input
              {...register("author", {
                required: "Author is required",
              })}
              placeholder="James Clear"
              className="w-full border rounded-xl px-4 py-3 bg-transparent"
            />

            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full border rounded-xl px-4 py-3 bg-transparent"
            >
              <option value="">Select Category</option>

              <option value="Fiction">Fiction</option>
              <option value="Fiction">Science Fiction</option>
              <option value="Fiction">Academic</option>
              <option value="Fiction">History</option>
              <option value="Fiction">Biography</option>
              <option value="Fiction">Children</option>
              <option value="Fiction">Business</option>
              <option value="Fiction">Technology</option>
              <option value="Fiction">Mystery</option>
              <option value="Fiction">Romance</option>
              <option value="Fiction">Health</option>
              <option value="Fiction">Religion</option>
            </select>
          </div>

          {/* Delivery Fee */}
          <div>
            <label className="block mb-2 font-medium">Delivery Fee ($)</label>

            <input
              type="number"
              step="0.01"
              {...register("deliveryFee", {
                required: "Delivery fee required",
              })}
              placeholder="5"
              className="w-full border rounded-xl px-4 py-3 bg-transparent"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Book Cover</label>

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Book image required",
              })}
              className="w-full border rounded-xl px-4 py-3"
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={5}
              {...register("description", {
                required: "Description required",
              })}
              placeholder="Write book description..."
              className="w-full border rounded-xl px-4 py-3 bg-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit For Approval"}
          </button>
        </form>
      </div>
    </div>
  );
}
