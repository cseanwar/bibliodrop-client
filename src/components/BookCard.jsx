"use client";

import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }) {

  const isUnavailable = book.availability === "Checked Out";

  return (
    <Link href={`/books/${book._id}`} className="block h-full">
      <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col">
        <div className="relative h-76 w-full bg-slate-50 dark:bg-slate-950/40 flex items-center justify-center p-4 overflow-hidden">
          <div className="relative h-full aspect-2/3 rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
            <Image
              src={book.image}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 250px"
              className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-semibold
    ${isUnavailable ? "bg-red-600 text-white" : "bg-green-600 text-white"}
  `}
          >
            {isUnavailable ? "Checked Out" : "Available"}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col grow justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">
              {book.title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {book.category}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-500">Delivery Fee</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              ${book.deliveryFee}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
