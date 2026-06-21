"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import {
  getBooksByLibrarian,
  deleteBook,
  toggleBookStatus,
} from "@/lib/actions/books";

import EditModal from "@/components/EditModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ManageInventoryPage() {
  const { data: session } = useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteBookId, setDeleteBookId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toggleLoading, setToggleLoading] = useState(null);

  const fetchBooks = async () => {
    try {
      if (!session?.user?.email) return;

      setLoading(true);

      const data = await getBooksByLibrarian(session.user.email);

      console.log("BOOKS DATA:", data);

      setBooks(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [session]);

  const handleDelete = (id) => {
    setDeleteBookId(id);
    setShowDeleteModal(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const confirmDeleteBook = async () => {
    try {
      setDeleteLoading(true);
      await deleteBook(deleteBookId);

      toast.success("Book deleted successfully");

      fetchBooks();
      setShowDeleteModal(false);
      setDeleteBookId(null);
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      setToggleLoading(id);

      await toggleBookStatus(id);

      toast.success("Status updated");

      fetchBooks();
    } catch {
      toast.error("Cannot publish pending book");
    } finally {
      setToggleLoading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Inventory</h1>

        <p className="text-slate-500 dark:text-slate-400">
          Manage your listed books.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[3fr_1.3fr_1fr_1fr_1.8fr] gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 font-bold text-xl text-slate-700 dark:text-slate-300">
          <p>Book</p>
          <p>Status</p>
          <p>Category</p>
          <p>Fee</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Rows */}
        {books.map((book) => (
          <div
            key={book._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_1.3fr_1fr_1fr_1fr] gap-4 items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800"
          >
            {/* Book */}
            <div className="flex items-center gap-4">
              <Image
                width={20}
                height={20}
                src={book.image}
                alt={book.title}
                className="w-16 h-20 object-cover rounded-lg border"
              />

              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {book.title}
                </h3>

                <p className="text-slate-500">{book.author}</p>
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className={`
            px-3 py-1 rounded-full text-sm font-semibold
            ${
              book.status === "Pending Approval"
                ? "bg-yellow-100 text-yellow-700"
                : book.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
            }
          `}
              >
                {book.status}
              </span>
            </div>

            {/* Category */}
            <p className="font-medium text-slate-700 dark:text-slate-300">
              {book.category}
            </p>

            {/* Fee */}
            <p className="font-semibold text-slate-900 dark:text-white">
              ${book.deliveryFee}
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => handleEdit(book)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

              {book.status !== "Pending Approval" && (
                <button
                  type="button"
                  onClick={() => handleToggle(book._id)}
                  className={`px-4 py-2 rounded-xl text-white
        ${
          book.status === "Published"
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-green-500 hover:bg-green-600"
        }
      `}
                >
                  {book.status === "Published" ? "Unpublish" : "Publish"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteBook}
        loading={deleteLoading}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
      />
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
        refetch={fetchBooks}
      />
    </div>
  );
}
