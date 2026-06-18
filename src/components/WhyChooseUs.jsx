"use client";

import { motion } from "framer-motion";
import {
  FaTruck,
  FaShieldAlt,
  FaBookOpen,
  FaStar,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    title: "Doorstep Delivery",
    description:
      "Get your favorite books delivered directly to your home without visiting the library.",
    icon: FaTruck,
  },
  {
    title: "Secure Payments",
    description:
      "Safe and reliable payment processing for delivery fees through Stripe integration.",
    icon: FaShieldAlt,
  },
  {
    title: "Huge Collection",
    description:
      "Explore thousands of books from local libraries and independent book providers.",
    icon: FaBookOpen,
  },
  {
    title: "Verified Reviews",
    description:
      "Read authentic reviews from readers who have successfully received books.",
    icon: FaStar,
  },
  {
    title: "Fast Processing",
    description:
      "Quick request approval and delivery tracking from dispatch to doorstep.",
    icon: FaClock,
  },
  {
    title: "Community Driven",
    description:
      "Connect readers, libraries, and book owners in one trusted ecosystem.",
    icon: FaUsers,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
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
            Why BiblioDrop
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Why Choose BiblioDrop?
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Making library access easier, faster, and more convenient for
            readers everywhere.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-800
                  rounded-3xl
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  dark:hover:shadow-blue-900/20
                  dark:hover:border-blue-500/50
                  transition-all
                  duration-300
                "
              >
                {/* Icon */}
                <div
                  className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-blue-100
                  dark:bg-slate-800
                  flex
                  items-center
                  justify-center
                  mb-5
                "
                >
                  <Icon className="text-2xl text-blue-600 dark:text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
