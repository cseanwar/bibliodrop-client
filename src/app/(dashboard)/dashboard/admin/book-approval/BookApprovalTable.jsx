"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getPendingBooks,
  approveBook,
  deleteBook,
} from "@/lib/actions/admin";
import Image from "next/image";

export default function BookApprovalTable() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const data = await getPendingBooks();

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
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveBook(id);

      toast.success("Book approved");

      fetchBooks();
    } catch (error) {
      console.error(error);

      toast.error("Approval failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);

      toast.success("Book deleted");

      fetchBooks();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading books...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Book Approval Queue</h1>

        <p className="text-slate-500 mt-2">
          Review and approve librarian submissions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800">
              <th className="text-left px-6 py-4">Book</th>
              <th className="text-left px-6 py-4">Librarian</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-center px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                {/* Book */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Image
                      width={20}
                      height={20}
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-20 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{book.title}</h3>

                      <p className="text-sm text-slate-500">{book.author}</p>
                    </div>
                  </div>
                </td>

                {/* Librarian */}
                <td className="px-6 py-4">
                  <p className="font-medium">{book.librarianName}</p>

                  <p className="text-sm text-slate-500">
                    {book.librarianEmail}
                  </p>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    {book.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleApprove(book._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
