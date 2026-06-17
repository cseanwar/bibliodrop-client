"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaSignOutAlt, FaThLarge } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  const mockUser = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Reader",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  };

  const navLinkClass = (isActive) =>
    `text-md font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-600 font-bold"
        : "text-slate-700 hover:text-blue-600"
    }`;

  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 py-3"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="BiblioDrop Logo"
                width={220}
                height={60}
                priority
                className="h-14 w-auto object-contain"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="hidden md:flex justify-center items-center gap-8"
        >
          <motion.div variants={navItemVariants}>
            <Link href="/" className={navLinkClass(pathname === "/")}>
              Home
            </Link>
          </motion.div>

          <motion.div variants={navItemVariants}>
            <Link
              href="/books"
              className={navLinkClass(pathname.startsWith("/books"))}
            >
              Browse Books
            </Link>
          </motion.div>

          {isLoggedIn && (
            <motion.div variants={navItemVariants}>
              <Link
                href="/dashboard"
                className={navLinkClass(pathname.startsWith("/dashboard"))}
              >
                Dashboard
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Right Side */}
        <div className="flex justify-center items-center gap-3">
          {!isLoggedIn ? (
            <>
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setIsLoggedIn(true)}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition"
              >
                Login
              </motion.button>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          ) : (
            <div className="relative flex items-center" ref={dropdownRef}>
              <motion.button
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer"
              >
                <Image
                  src={mockUser.image}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover border-2 border-blue-500 shadow-md shadow-blue-500/10"
                />
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-amber-500">
                        {mockUser.role} Account
                      </p>

                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {mockUser.name}
                      </p>

                      <p className="text-xs text-slate-500 truncate mt-1">
                        {mockUser.email}
                      </p>
                    </div>

                    {/* Dashboard */}
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <FaThLarge className="text-blue-500" />
                      My Dashboard
                    </Link>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <FaUser className="text-blue-500" />
                      Profile Settings
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      <FaSignOutAlt />
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
