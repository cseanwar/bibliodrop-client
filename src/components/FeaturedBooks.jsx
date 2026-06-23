"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getFeaturedBooks } from "@/lib/actions/books";

import BookCard from "@/components/BookCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getFeaturedBooks();

      setBooks(data || []);
    } finally {
      setLoading(false);
    }
  };

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
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-semibold mb-2 uppercase">
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
              //   initial={{ opacity: 0, y: 40 }}
              //   whileInView={{ opacity: 1, y: 0 }}
              //   viewport={{ once: true }}
              //   transition={{
              //     duration: 0.4,
              //     delay: index * 0.1,
              //   }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-5"
      >
        <a
          href="/books"
          className="
      inline-flex
      items-center
      px-6
      py-3
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-semibold
      transition
    "
        >
          Browse All Books
        </a>
      </motion.div>
    </section>
  );
}
