"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BookCard from "@/components/BookCard";
// import LoadingSpinner from "@/components/LoadingSpinner";
import { getAllBooks } from "@/lib/actions/books";
import CardSkeleton from "@/components/CardSkeleton";

export default function BrowseBooksPage() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await getAllBooks(search, category, sort);

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
  }, [search, category, sort]);

  const categories = [
    "Fiction",
    "Science Fiction",
    "Academic",
    "History",
    "Children",
    "Science",
    "Biography",
    "Technology",
    "Business",
    "Romance",
    "Health",
    "Religion",
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Browse Books</h1>

        <p className="text-slate-500 mt-2">
          Explore available books from our librarians.
        </p>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900"
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900"
        >
          <option value="">Sort Books</option>

          <option value="newest">Newest First</option>

          <option value="fee-asc">Fee Low → High</option>

          <option value="fee-desc">Fee High → Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : books.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 border rounded-3xl">
          <h2 className="text-2xl font-bold mb-2">No Books Found</h2>

          <p className="text-slate-500">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          {/* Count */}
          <div className="mb-6 text-sm text-slate-500">
            {books.length} books found
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
