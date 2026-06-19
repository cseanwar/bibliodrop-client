"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import {
  FaBars,
  FaTimes,
  FaBook,
  FaHistory,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaStar,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";

export default function DashboardSidebar() {
    const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const role = session?.user?.role;

  const librarianMenu = [
    {
      label: "Overview",
      icon: FaUsers,
      href: "/dashboard/librarian",
    },
    {
      label: "Add Book",
      icon: FaPlus,
      href: "/dashboard/librarian/add-book",
    },
    {
      label: "Manage Inventory",
      icon: FaBook,
      href: "/dashboard/librarian/manage-inventory",
    },
    {
      label: "Manage Deliveries",
      icon: FaCalendarAlt,
      href: "/dashboard/librarian/manage-deliveries",
    },
  ];

  const userMenu = [
    {
      label: "Overview",
      icon: FaUserCircle,
      href: "/dashboard/user",
    },
    {
      label: "Delivery History",
      icon: FaTicketAlt,
      href: "/dashboard/user/delivery-history",
    },
    {
      label: "Reading List",
      icon: FaBook,
      href: "/dashboard/user/my-reading-list",
    },
    {
      label: "My Reviews",
      icon: FaStar,
      href: "/dashboard/user/my-reviews",
    },
  ];

  const adminMenu = [
    {
      label: "Overview",
      icon: FaUserShield,
      href: "/dashboard/admin",
    },
    {
      label: "Book Approval",
      icon: FaBook,
      href: "/dashboard/admin/book-approval-queue",
    },
    {
      label: "Manage Users",
      icon: FaUsers,
      href: "/dashboard/admin/manage-users",
    },
    {
      label: "Manage Books",
      icon: FaBook,
      href: "/dashboard/admin/manage-all-books",
    },
    {
      label: "Transactions",
      icon: FaHistory,
      href: "/dashboard/admin/transactions",
    },
  ];

  const menuItems =
    role === "librarian"
      ? librarianMenu
      : role === "admin"
        ? adminMenu
        : userMenu;

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully");
        router.push("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="
        lg:hidden
        fixed
        top-4
        left-4
        z-50
        p-3
        rounded-xl
        bg-blue-600
        text-white
        shadow-lg
        "
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed
        top-0
        left-0
        h-screen
        w-72
        bg-white
        dark:bg-slate-900
        border-r
        border-slate-200
        dark:border-slate-800
        z-50
        transform
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 lg:hidden"
            >
              <FaTimes className="text-slate-500" />
            </button>

            <Image
              src="/logo.png"
              alt="BiblioDrop"
              width={180}
              height={50}
              className="dark:hidden"
            />

            <Image
              src="/logo-light.png"
              alt="BiblioDrop"
              width={180}
              height={50}
              className="hidden dark:block"
            />
          </div>

          {/* User Info */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Image
                src={
                  session?.user?.image ||
                  `https://ui-avatars.com/api/?name=${session?.user?.name}`
                }
                alt="avatar"
                width={48}
                height={48}
                className="rounded-full border-2 border-blue-500"
              />

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {session?.user?.name}
                </h3>

                <p className="text-sm text-blue-600 capitalize">{role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
            {menuItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    transition
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <Icon />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Link
              href="/"
              className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-600
              dark:text-slate-300
              hover:bg-slate-100
              dark:hover:bg-slate-800
              "
            >
              <FaHome />
              Home
            </Link>

            <button
              onClick={handleLogout}
              className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-red-500
              hover:bg-red-50
              dark:hover:bg-red-500/10
              transition
              cursor-pointer
              "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
