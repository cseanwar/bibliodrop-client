"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/books";
import CardSkeleton from "@/components/CardSkeleton";
import { Pagination } from "@heroui/react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function BrowseBooksPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 8;

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [availability, setAvailability] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [page, search, category, sort, availability, minFee, maxFee]);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await getAllBooks({
        page,
        perPage,
        search,
        category,
        sort,
        availability,
        minFee,
        maxFee,
      });

      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("BOOK ERROR:", error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setAvailability("");
    setMinFee("");
    setMaxFee("");
    setPage(1);
  };

  const categories = [
    "Fiction",
    "Science Fiction",
    "Academic",
    "History",
    "Children",
    "Mystery",
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
      <div className="space-y-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Availability Filter */}
          <select
            value={availability}
            onChange={(e) => {
              setAvailability(e.target.value);
              setPage(1);
            }}
            className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Availability</option>
            <option value="Available">Available Only</option>
            <option value="Checked Out">Checked Out</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort Books</option>
            <option value="newest">Newest First</option>
            <option value="fee-asc">Fee Low → High</option>
            <option value="fee-desc">Fee High → Low</option>
          </select>
        </div>

        {/* Row 2: Fee Range & Reset */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Delivery Fee Range:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">$</span>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minFee}
              onChange={(e) => {
                setMinFee(e.target.value);
                setPage(1);
              }}
              className="w-24 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <span className="text-slate-400 text-sm">to</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">$</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxFee}
              onChange={(e) => {
                setMaxFee(e.target.value);
                setPage(1);
              }}
              className="w-24 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {(search || category || sort || availability || minFee || maxFee) && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
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
            Showing {books.length} books
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Pagination className="justify-center">
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => p - 1)}
                  >
                    <Pagination.PreviousIcon>
                      <FaArrowLeftLong />
                      {/* <Icon icon="gravity-ui:arrow-left" /> */}
                    </Pagination.PreviousIcon>
                    <span>Back</span>
                  </Pagination.Previous>
                </Pagination.Item>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === page}
                        onPress={() => setPage(p)}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}
                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => p + 1)}
                  >
                    <span>Forward</span>
                    <Pagination.NextIcon>
                      <FaArrowRightLong />
                      {/* <Icon icon="gravity-ui:arrow-right" /> */}
                    </Pagination.NextIcon>
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
