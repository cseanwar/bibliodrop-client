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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Explore Categories
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Popular Book Categories
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
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
                  y: -10,
                  scale: 1.03,
                }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={`/books?category=${category.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition">
                      <Icon className="text-xl text-blue-600 group-hover:text-white transition" />
                    </div>

                    <h3 className="text-base font-semibold text-slate-900">
                      {category.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
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
