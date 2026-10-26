"use client";

import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/books";
import CardSkeleton from "@/components/CardSkeleton";
import { Pagination } from "@heroui/react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FaSearch, FaTimes, FaFilter, FaBookOpen } from "react-icons/fa";

export default function BrowseBooksPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const perPage = 8;

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [availability, setAvailability] = useState("");

  const [minFee, setMinFee] = useState("");
  const [debouncedMinFee, setDebouncedMinFee] = useState("");

  const [maxFee, setMaxFee] = useState("");
  const [debouncedMaxFee, setDebouncedMaxFee] = useState("");

  // ── Debounce search and fee inputs ────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinFee(minFee);
    }, 350);
    return () => clearTimeout(timer);
  }, [minFee]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMaxFee(maxFee);
    }, 350);
    return () => clearTimeout(timer);
  }, [maxFee]);

  useEffect(() => {
    fetchBooks();
  }, [page, debouncedSearch, category, sort, availability, debouncedMinFee, debouncedMaxFee]);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await getAllBooks({
        page,
        perPage,
        search: debouncedSearch,
        category,
        sort,
        availability,
        minFee: debouncedMinFee,
        maxFee: debouncedMaxFee,
      });

      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
      setTotalBooksCount(data.totalBooks || (data.books ? data.books.length : 0));
    } catch (error) {
      console.error("BOOK ERROR:", error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("");
    setSort("");
    setAvailability("");
    setMinFee("");
    setDebouncedMinFee("");
    setMaxFee("");
    setDebouncedMaxFee("");
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

  const hasActiveFilters = Boolean(
    search || category || sort || availability || minFee || maxFee
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Browse Books
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
          Explore thousands of titles from registered librarians, delivered straight to your door.
        </p>
      </div>

      {/* Quick Category Pills */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => {
            setCategory("");
            setPage(1);
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            category === ""
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          All Genres
        </button>
        {categories.slice(0, 8).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat === category ? "" : cat);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              category === cat
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Filter Toolbar */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-10 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setDebouncedSearch("");
                  setPage(1);
                }}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
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
            className="border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
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
            className="border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          >
            <option value="">Sort: Featured</option>
            <option value="newest">Newest First</option>
            <option value="fee-asc">Delivery Fee: Low → High</option>
            <option value="fee-desc">Delivery Fee: High → Low</option>
          </select>
        </div>

        {/* Row 2: Fee Range & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Delivery Fee:
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
                className="w-20 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-slate-400 text-xs font-medium">to</span>
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
                className="w-20 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Result Count and Clear */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {loading ? "Searching catalog..." : `Found ${totalBooksCount || books.length} books`}
            </span>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold cursor-pointer transition underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 mr-1">
              <FaFilter className="text-[10px]" />
              Active:
            </span>

            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Keyword: &ldquo;{search}&rdquo;
                <button
                  onClick={() => {
                    setSearch("");
                    setDebouncedSearch("");
                    setPage(1);
                  }}
                  className="hover:opacity-75 cursor-pointer ml-0.5"
                >
                  <FaTimes className="text-[10px]" />
                </button>
              </span>
            )}

            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Category: {category}
                <button
                  onClick={() => {
                    setCategory("");
                    setPage(1);
                  }}
                  className="hover:opacity-75 cursor-pointer ml-0.5"
                >
                  <FaTimes className="text-[10px]" />
                </button>
              </span>
            )}

            {availability && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Status: {availability}
                <button
                  onClick={() => {
                    setAvailability("");
                    setPage(1);
                  }}
                  className="hover:opacity-75 cursor-pointer ml-0.5"
                >
                  <FaTimes className="text-[10px]" />
                </button>
              </span>
            )}

            {(minFee || maxFee) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Fee: ${minFee || 0} - ${maxFee || "∞"}
                <button
                  onClick={() => {
                    setMinFee("");
                    setDebouncedMinFee("");
                    setMaxFee("");
                    setDebouncedMaxFee("");
                    setPage(1);
                  }}
                  className="hover:opacity-75 cursor-pointer ml-0.5"
                >
                  <FaTimes className="text-[10px]" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Book Grid / Loading / Empty State */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: perPage }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : books.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl">
            <FaBookOpen />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Books Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
            We couldn&apos;t find any books matching your current search criteria. Try broadening your filters or resetting them to view all titles.
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center">
              <Pagination className="justify-center">
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <Pagination.PreviousIcon>
                        <FaArrowLeftLong />
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
                    )
                  )}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      <span>Forward</span>
                      <Pagination.NextIcon>
                        <FaArrowRightLong />
                      </Pagination.NextIcon>
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
