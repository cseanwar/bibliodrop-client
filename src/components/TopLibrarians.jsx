"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const librarians = [
  {
    id: 1,
    name: "Sarah Johnson",
    library: "City Central Library",
    deliveries: 1240,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
  },
  {
    id: 2,
    name: "Michael Brown",
    library: "Knowledge Hub Library",
    deliveries: 1085,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    id: 3,
    name: "Emily Davis",
    library: "Readers Point Library",
    deliveries: 965,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

export default function TopLibrarians() {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-112.5 h-112.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
            Top Providers
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Meet Our Top Librarians
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Trusted by thousands of readers and recognized for outstanding
            delivery performance.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {librarians.map((librarian) => (
            <motion.div
              key={librarian.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                bg-white
                dark:bg-slate-900
                rounded-3xl
                border
                border-slate-200
                dark:border-slate-800
                shadow-lg
                hover:shadow-xl
                dark:hover:shadow-blue-900/20
                transition-all
                duration-300
                overflow-hidden
              "
            >
              <div className="p-8 text-center">
                {/* Avatar */}
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <Image
                    src={librarian.image}
                    alt={librarian.name}
                    fill
                    className="rounded-full object-cover border-4 border-blue-100 dark:border-slate-700"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {librarian.name}
                </h3>

                {/* Library */}
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {librarian.library}
                </p>

                {/* Stats */}
                <div className="mt-6 flex justify-center gap-8">
                  <div>
                    <h4 className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                      {librarian.deliveries}
                    </h4>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Deliveries
                    </p>
                  </div>

                  <div>
                    <h4 className="text-amber-500 font-bold text-xl">
                      ⭐ {librarian.rating}
                    </h4>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Rating
                    </p>
                  </div>
                </div>

                {/* Optional Badge */}
                <div className="mt-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm font-medium">
                    Verified Provider
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
