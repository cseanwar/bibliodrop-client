"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaUser,
  FaSignOutAlt,
  FaThLarge,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "./shared/ThemeToggle";
import { useTheme } from "next-themes";
import { authClient, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleLogout = async () => {
    await authClient.signOut();
    setDropdownOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinkClass = (isActive) =>
    `text-md font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-bold"
        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
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
      className="
  sticky top-0 z-50
  bg-white/90 dark:bg-slate-950/90
  backdrop-blur-md
  border-b
  border-slate-200 dark:border-slate-800
  shadow-sm py-2
  "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between">
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
                src={resolvedTheme === "dark" ? "/logo-light.png" : "/logo.png"}
                alt="BiblioDrop Logo"
                width={220}
                height={60}
                priority
                className="
h-12
sm:h-14
lg:h-16
w-auto
object-contain
"
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
          className="hidden lg:flex justify-center items-center gap-8"
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

          {session && session?.user && (
            <motion.div variants={navItemVariants}>
              <Link
                href={`/dashboard/${session?.user?.role}`}
                className={navLinkClass(pathname.startsWith("/dashboard"))}
              >
                Dashboard
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Right Side */}
        <div className="flex justify-center items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="
  lg:hidden
  p-2
  rounded-xl
  text-slate-700
  dark:text-slate-300
  hover:bg-slate-100
  dark:hover:bg-slate-800
  transition
  "
          >
            <FaBars size={20} />
          </button>
          <ThemeToggle />
          {!session ? (
            <>
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setIsLoggedIn(true)}
              >
                <Link 
                href="/login"
                className="
text-md
font-semibold
text-slate-700
dark:text-slate-300
hover:text-blue-600
dark:hover:text-blue-400
transition
cursor-pointer
"> Login
                </Link>
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
                  className="
bg-blue-600
hover:bg-blue-700
dark:bg-blue-500
dark:hover:bg-blue-600
text-white
text-sm
font-medium
px-5
py-2.5
rounded-xl
transition
shadow-sm
"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          ) : (
            <div className="relative flex items-center" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer"
              >
                <Image
                  src={session?.user?.image}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="
    rounded-full
    object-cover
    border-2
    border-slate-200
    dark:border-slate-700
    shadow-sm
  "
                />
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
        absolute
        right-0
        top-16
        w-72
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        rounded-2xl
        shadow-xl
        overflow-hidden
        z-50
      "
                  >
                    {/* User Info */}
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                      {/* <p className="text-xs uppercase tracking-wider font-semibold text-amber-500">
                        {session.user.role} Account
                      </p> */}

                      <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                        {session.user.name} <span className="uppercase text-xs text-amber-500">({session.user.role})</span>
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Dashboard */}
                    <Link
                      href={`/dashboard/${session?.user?.role}`}
                      onClick={() => setDropdownOpen(false)}
                      className="
          flex
          items-center
          gap-3
          px-6
          py-4
          text-sm
          font-medium
          text-slate-700
          dark:text-slate-300
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition
        "
                    >
                      <FaThLarge className="text-blue-500" />
                      My Dashboard
                    </Link>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="
          flex
          items-center
          gap-3
          px-6
          py-4
          text-sm
          font-medium
          text-slate-700
          dark:text-slate-300
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition
        "
                    >
                      <FaUser className="text-blue-500" />
                      Profile Settings
                    </Link>

                    <div className="border-t border-slate-200 dark:border-slate-800"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="
          w-full
          flex
          items-center
          gap-3
          px-6
          py-4
          text-sm
          font-medium
          text-red-500
          hover:bg-red-50
          dark:hover:bg-red-500/10
          transition
        "
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
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-100 lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="
                absolute
                top-0
                right-0
                bottom-0
                h-screen
                w-72
                bg-white
                dark:bg-slate-950
                border-l
                border-slate-200
                dark:border-slate-800
                shadow-2xl
                flex
                flex-col
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Menu
                </h3>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-600 dark:text-slate-300 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="flex flex-col p-5 gap-5 flex-1 overflow-y-auto">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkClass(pathname === "/")}
                >
                  Home
                </Link>

                <Link
                  href="/books"
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkClass(pathname.startsWith("/books"))}
                >
                  Browse Books
                </Link>

                {isLoggedIn && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={navLinkClass(pathname.startsWith("/dashboard"))}
                  >
                    Dashboard
                  </Link>
                )}

                {/* User Section pinned to bottom */}
                <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {mockUser.name}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    {mockUser.email}
                  </p>

                  <div className="flex flex-col gap-4">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="
                        flex
                        items-center
                        gap-3
                        text-slate-700
                        dark:text-slate-300
                        hover:text-blue-600
                        transition
                      "
                    >
                      <FaUser />
                      Profile Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
                        flex
                        items-center
                        gap-3
                        text-red-500
                        font-medium
                      "
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
