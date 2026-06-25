import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }) {
  const isUnavailable = book.availability === "Checked Out";

  return (
    <Link href={`/books/${book._id}`} className="block h-full w-full">
      <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col">
        {/* ── Cover ──────────────────────────────────────────────────────────
            Blurred background fills dead space, sharp cover sits on top.
            Works for any aspect ratio — no cropping ever.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="relative h-64 w-full overflow-hidden shrink-0">
          {/* Blurred background — same image, scaled to fill, heavily blurred */}
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover scale-110 blur-3xl brightness-75"
            aria-hidden="true"
          />

          {/* Sharp cover on top — fully visible, no crop */}
          <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
            <div className="relative h-full w-auto aspect-2/3 drop-shadow-2xl group-hover:scale-105 transition-transform duration-300">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 40vw, 160px"
                className="object-contain rounded-sm"
                priority
              />
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold shadow-sm z-20
              ${isUnavailable ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
          >
            {isUnavailable ? "Checked Out" : "Available"}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col grow justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {book.category}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Delivery Fee
            </span>
            <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
              ${book.deliveryFee}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
