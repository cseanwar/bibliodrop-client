"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaRocket,
  FaGraduationCap,
  FaLandmark,
  FaUserEdit,
  FaChild,
  FaBriefcase,
  FaLaptopCode,
  FaSearch,
  FaHeart,
  FaHeartbeat,
  FaPlaceOfWorship,
} from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    books: "1,250 Books",
    icon: FaBookOpen,
    slug: "fiction",
  },
  {
    name: "Science Fiction",
    books: "840 Books",
    icon: FaRocket,
    slug: "science-fiction",
  },
  {
    name: "Academic",
    books: "2,100 Books",
    icon: FaGraduationCap,
    slug: "academic",
  },
  {
    name: "History",
    books: "720 Books",
    icon: FaLandmark,
    slug: "history",
  },
  {
    name: "Biography",
    books: "630 Books",
    icon: FaUserEdit,
    slug: "biography",
  },
  {
    name: "Children",
    books: "950 Books",
    icon: FaChild,
    slug: "children",
  },
  {
    name: "Business",
    books: "580 Books",
    icon: FaBriefcase,
    slug: "business",
  },
  {
    name: "Technology",
    books: "1,340 Books",
    icon: FaLaptopCode,
    slug: "technology",
  },
  {
    name: "Mystery",
    books: "790 Books",
    icon: FaSearch,
    slug: "mystery",
  },
  {
    name: "Romance",
    books: "910 Books",
    icon: FaHeart,
    slug: "romance",
  },
  {
    name: "Health",
    books: "460 Books",
    icon: FaHeartbeat,
    slug: "health",
  },
  {
    name: "Religion",
    books: "520 Books",
    icon: FaPlaceOfWorship,
    slug: "religion",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function PopularCategories() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
            Explore Categories
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Popular Book Categories
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover books from a wide variety of genres and subjects, carefully
            curated by libraries and book providers.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.slug}
                variants={cardVariants}
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
                <Link
                  href={`/books?category=${category.slug}`}
                  className="group block h-full"
                >
                  <div
                    className="
                    h-full
                    rounded-2xl
                    p-4
                    text-center
                    bg-white
                    dark:bg-slate-900
                    border
                    border-slate-200
                    dark:border-slate-800
                    hover:border-blue-300
                    dark:hover:border-blue-500
                    hover:shadow-xl
                    dark:hover:shadow-blue-900/20
                    transition-all
                    duration-300
                  "
                  >
                    {/* Icon */}
                    <div
                      className="
                      w-12
                      h-12
                      mx-auto
                      mb-3
                      rounded-xl
                      bg-blue-100
                      dark:bg-slate-800
                      flex
                      items-center
                      justify-center
                      group-hover:bg-blue-600
                      transition
                    "
                    >
                      <Icon
                        className="
                        text-xl
                        text-blue-600
                        dark:text-blue-400
                        group-hover:text-white
                        transition
                      "
                      />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {category.name}
                    </h3>

                    {/* Books Count */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {category.books}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
