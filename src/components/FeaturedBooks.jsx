"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getFeaturedBooks } from "@/lib/actions/books";

import BookCard from "@/components/BookCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const data = await getFeaturedBooks();

      setBooks(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative pt-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-112.5 h-112.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2 uppercase">
            Latest Collection
          </p>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Books
          </h2>

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the newest books recently added to our library.
          </p>
        </motion.div>

        {/* Books Grid */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="text-center mt-5">
        <Link
          href="/books"
          className="
                                inline-flex
                                items-center
                                justify-center
                                bg-blue-600
                                hover:bg-blue-700
                                dark:bg-blue-500
                                dark:hover:bg-blue-600
                                text-white
                                text-sm
                                px-5
                                py-2.5
                                rounded-xl
                                font-semibold
                                shadow-lg
                                shadow-blue-500/20
                                transition
                              "
        >
          Browse All Books
        </Link>
      </motion.div>
    </section>
  );
}
