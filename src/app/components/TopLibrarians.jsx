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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold">TOP PROVIDERS</span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Meet Our Top Librarians
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
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
              className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <Image
                    src={librarian.image}
                    alt={librarian.name}
                    fill
                    className="rounded-full object-cover border-4 border-blue-100"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {librarian.name}
                </h3>

                <p className="text-slate-500 mt-1">{librarian.library}</p>

                <div className="mt-6 flex justify-center gap-8">
                  <div>
                    <h4 className="text-blue-600 font-bold text-xl">
                      {librarian.deliveries}
                    </h4>
                    <p className="text-sm text-slate-500">Deliveries</p>
                  </div>

                  <div>
                    <h4 className="text-amber-500 font-bold text-xl">
                      ⭐ {librarian.rating}
                    </h4>
                    <p className="text-sm text-slate-500">Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
