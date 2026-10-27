"use client";

import { useEffect, useState, useMemo } from "react";
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
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import ActionIconButton from "@/components/shared/ActionIconButton";

export default function ManageInventoryPage() {
  const { data: session, isPending } = useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteBookId, setDeleteBookId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toggleLoading, setToggleLoading] = useState(null);

  // ── Filter state ─────────────────────────────────────────────
  const [filterAvailability, setFilterAvailability] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const fetchBooks = async () => {
    try {
      if (!session?.user?.email) return;

      setLoading(true);

      const data = await getBooksByLibrarian(session.user.email);

      setBooks(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchBooks();
    } else if (!isPending) {
      setLoading(false);
    }
  }, [session, isPending]);

  // ── Client-side filtering ────────────────────────────────────
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (filterAvailability && book.availability !== filterAvailability) {
        return false;
      }
      const fee = Number(book.deliveryFee);
      if (minFee !== "" && !isNaN(Number(minFee)) && fee < Number(minFee)) {
        return false;
      }
      if (maxFee !== "" && !isNaN(Number(maxFee)) && fee > Number(maxFee)) {
        return false;
      }
      return true;
    });
  }, [books, filterAvailability, minFee, maxFee]);

  const isFiltering = filterAvailability || minFee || maxFee;

  const handleResetFilters = () => {
    setFilterAvailability("");
    setMinFee("");
    setMaxFee("");
  };

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

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div className="mb-6 flex gap-10">
        {/* Row 1: Availability */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Availability</option>
            <option value="Available">Available</option>
            <option value="Checked Out">Checked Out</option>
          </select>
        </div>

        {/* Row 2: Fee Range */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Delivery Fee Range:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">$</span>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
              className="w-24 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <span className="text-slate-400 text-sm">to</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">$</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              className="w-24 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {isFiltering && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {isFiltering && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[3fr_1.3fr_1fr_1fr_2.1fr] gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 font-bold text-xl text-slate-700 dark:text-slate-300">
          <p>Book</p>
          <p>Status</p>
          <p>Category</p>
          <p>Fee</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Rows */}
        {filteredBooks.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No books match the current filters.
          </div>
        ) : (
          filteredBooks.map((book) => (
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
              ${book.status === "Pending Approval"
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
              <div className="flex justify-center items-center gap-2">
                <ActionIconButton
                  icon={FaEdit}
                  name="Edit"
                  onClick={() => handleEdit(book)}
                  variant="primary"
                />

                {book.status !== "Pending Approval" && (
                  <ActionIconButton
                    icon={book.status === "Published" ? FaEyeSlash : FaEye}
                    name={book.status === "Published" ? "Unpublish" : "Publish"}
                    onClick={() => handleToggle(book._id)}
                    variant={book.status === "Published" ? "warning" : "success"}
                  />
                )}

                <ActionIconButton
                  icon={FaTrash}
                  name="Delete"
                  onClick={() => handleDelete(book._id)}
                  variant="danger"
                />
              </div>
            </div>
          ))
        )}
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
