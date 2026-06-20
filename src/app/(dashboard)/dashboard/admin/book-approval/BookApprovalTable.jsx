"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getPendingBooks, approveBook, deletePendingBook } from "@/lib/actions/admin";
import Image from "next/image";
import { Button } from "@heroui/react";

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

      toast.success("Book approved and published");

      fetchBooks();
    } catch (error) {
      console.error(error);

      toast.error("Approval failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePendingBook(id);

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

        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          {books.length} Pending {books.length === 1 ? "Book" : "Books"}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="text-6xl mb-4">📚</div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              No Books Pending Approval
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
              All submitted books have already been reviewed. New librarian
              submissions will appear here for approval.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-left">Book</th>
                <th className="px-6 py-4 text-left">Librarian</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="border-b border-slate-100 dark:border-slate-800"
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
                    <div className="flex justify-center gap-3">
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleApprove(book._id)}
                      >
                        Approve
                      </button>

                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <div className="overflow-x-auto">
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
               
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
