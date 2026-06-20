"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  FaBook,
  FaUserEdit,
  FaMoneyBillWave,
  FaImage,
  FaLayerGroup,
} from "react-icons/fa";

import { addBook } from "@/lib/actions/books";
import { imageUploadInImgBB } from "@/utilities/imageUploadInImgBB";

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      toast.loading("Uploading cover image...", {
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
        category: data.category,
        description: data.description,
        deliveryFee: Number(data.deliveryFee),

        image: imageUrl,

        status: "Pending Approval",

        librarianId: session?.user?.id,
        librarianName: session?.user?.name,
        librarianEmail: session?.user?.email,

        createdAt: new Date(),
      };

      await addBook(newBook);

      toast.success("Book submitted for approval", {
        id: "book-upload",
      });

      reset();
      setPreview(null);

      router.push("/dashboard/librarian");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add book", {
        id: "book-upload",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add New Book
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Submit books to your inventory. New books require admin approval
          before becoming publicly visible.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Book Title
                </label>

                <div className="relative">
                  <FaBook className="absolute left-4 top-4 text-slate-400" />

                  <input
                    {...register("title", {
                      required: "Title is required",
                    })}
                    placeholder="Atomic Habits"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Author
                </label>

                <div className="relative">
                  <FaUserEdit className="absolute left-4 top-4 text-slate-400" />

                  <input
                    {...register("author", {
                      required: "Author is required",
                    })}
                    placeholder="James Clear"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category + Fee */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Category
                  </label>

                  <div className="relative">
                    <FaLayerGroup className="absolute left-4 top-4 text-slate-400" />

                    <select
                      {...register("category", {
                        required: true,
                      })}
                      className="w-full text-slate-400 h-12 pl-11 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Academic">Academic</option>
                      <option value="History">History</option>
                      <option value="Biography">Biography</option>
                      <option value="Children">Children</option>
                      <option value="Business">Business</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Romance">Romance</option>
                      <option value="Health">Health</option>
                      <option value="Religion">Religion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Delivery Fee
                  </label>

                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-4 top-4 text-slate-400" />

                    <input
                      type="number"
                      step="0.01"
                      {...register("deliveryFee", {
                        required: true,
                      })}
                      placeholder="49.99"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Description
                </label>

                <textarea
                  rows={8}
                  {...register("description", {
                    required: true,
                  })}
                  placeholder="Write a brief description of the book..."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-4 bg-transparent"
                />
              </div>
            </div>

            {/* Right */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Book Cover
              </label>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                ) : (
                  <div className="h-80 flex flex-col items-center justify-center text-slate-400">
                    <FaImage size={50} />
                    <p className="mt-3 text-sm">Upload Book Cover</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Book cover is required",
                  })}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="mt-4 w-full text-sm"
                />

                {errors.image && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-8 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              {isSubmitting ? "Submitting..." : "Submit For Approval"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
