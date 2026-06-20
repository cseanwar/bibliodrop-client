"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import {
  getAllBooks,
  toggleBookStatusAdmin,
  deleteBookAdmin,
} from "@/lib/actions/admin";

export default function ManageBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();

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

  const handleToggle = async (id) => {
    try {
      await toggleBookStatusAdmin(id);

      toast.success("Book status updated");

      fetchBooks();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this book permanently?");

    if (!confirmDelete) return;

    try {
      await deleteBookAdmin(id);

      toast.success("Book deleted");

      fetchBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading books...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage All Books</h1>

        <p className="text-slate-500 mt-2">Platform-wide book management.</p>
      </div>

      {books.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold">No Books Found</h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left">Book</th>

                <th className="px-6 py-4 text-left">Librarian</th>

                <th className="px-6 py-4 text-left">Category</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={50}
                        height={70}
                        className="rounded"
                      />

                      <div>
                        <h3 className="font-semibold">{book.title}</h3>

                        <p className="text-sm text-slate-500">{book.author}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{book.librarianName}</td>

                  <td className="px-6 py-4">{book.category}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${
                          book.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : book.status === "Pending Approval"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-slate-100 text-slate-700"
                        }
                      `}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleToggle(book._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        {book.status === "Published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
