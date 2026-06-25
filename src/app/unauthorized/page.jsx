"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 overflow-hidden">
      {/* Background Glow Matching PopularCategories */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-8
            shadow-xl
            dark:shadow-blue-900/10
          "
        >
          {/* Lock Icon Box matching Category Icon Styles */}
          <div
            className="
              w-16
              h-16
              mx-auto
              mb-6
              rounded-2xl
              bg-blue-100
              dark:bg-slate-800
              flex
              items-center
              justify-center
              text-blue-600
              dark:text-blue-400
            "
          >
            <FaLock className="text-2xl" />
          </div>

          {/* Upper Eyebrow Text */}
          <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider text-xs">
            401 Error
          </span>

          {/* Main Heading */}
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Access Denied
          </h2>

          {/* Description Paragraph */}
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You do not have the proper clearance or roles to access this area.
            Please try signing in with an authorized profile or verify with a
            administrator.
          </p>

          {/* Divider Decorative Border */}
          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          {/* Action Buttons with Framer Motion Tap/Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Go Back Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.back()}
              className="
                w-full
                sm:w-auto
                px-5
                py-2.5
                text-sm
                font-semibold
                rounded-xl
                border
                border-slate-200
                dark:border-slate-700
                text-slate-700
                dark:text-slate-300
                bg-white
                dark:bg-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-700/60
                transition-colors
                shadow-sm
              "
            >
              Go Back
            </motion.button>

            {/* Return Home Button */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/"
                className="
                  block
                  w-full
                  text-center
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  bg-blue-600
                  dark:bg-blue-500
                  hover:bg-blue-700
                  dark:hover:bg-blue-600
                  rounded-xl
                  transition-colors
                  shadow-md
                  shadow-blue-500/10
                "
              >
                Return Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
