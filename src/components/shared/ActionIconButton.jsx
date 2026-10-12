"use client";

export default function ActionIconButton({
  icon: Icon,
  name,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  size = 17,
}) {
  const variantStyles = {
    primary:
      "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white border border-blue-200/60 dark:border-blue-800/60",
    success:
      "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white border border-emerald-200/60 dark:border-emerald-800/60",
    warning:
      "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white dark:bg-amber-950/50 dark:text-amber-400 dark:hover:bg-amber-600 dark:hover:text-white border border-amber-200/60 dark:border-amber-800/60",
    danger:
      "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-950/50 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white border border-rose-200/60 dark:border-rose-800/60",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white border border-slate-200 dark:border-slate-700",
  };

  return (
    <div className="relative group inline-flex items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={name}
        title={name}
        className={`p-2.5 rounded-xl transition duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:shadow-md hover:scale-105 active:scale-95 ${
          variantStyles[variant] || variantStyles.primary
        } ${className}`}
      >
        <Icon size={size} />
      </button>

      {/* Floating Hover Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 whitespace-nowrap z-50">
        {name}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
      </span>
    </div>
  );
}
