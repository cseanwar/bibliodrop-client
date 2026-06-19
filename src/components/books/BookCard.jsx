"use client";

import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
      <div className="relative h-64">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          {book.title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          by {book.author}
        </p>

        <p className="text-sm mt-3 text-slate-600 dark:text-slate-300 line-clamp-3">
          {book.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-blue-600">${book.deliveryFee}</span>

          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700">
            {book.status}
          </span>
        </div>

        <Link
          href={`/books/${book._id}`}
          className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
