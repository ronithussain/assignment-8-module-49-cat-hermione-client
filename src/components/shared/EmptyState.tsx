import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

const EmptyState = ({
  title = "No Upcoming Events",
  description = "There are no events scheduled right now. Stay connected and check back soon!",
  message = "New opportunities are coming soon",
  buttonText,
  buttonLink,
}: EmptyStateProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-800/30 bg-gradient-to-br from-emerald-50/80 dark:from-emerald-900/20 via-white dark:via-gray-900/50 to-teal-50/60 dark:to-teal-900/10 px-6 py-20 text-center shadow-sm">
      {/* Background Decoration */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-100/40 dark:bg-emerald-900/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-teal-100/40 dark:bg-teal-900/20 blur-3xl" />

      {/* Icon */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-100 dark:border-emerald-800 bg-white dark:bg-gray-800 shadow-lg shadow-emerald-100/60">
        <MapPin className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />

        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white">
          <CalendarDays className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Content */}
      <div className="relative space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h3>

        <p className="mx-auto max-w-sm text-sm leading-6 text-slate-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Bottom Message */}
      <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 dark:border-emerald-800 bg-white/80 dark:bg-gray-800/80 px-4 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        {message}
      </div>
      {buttonText && buttonLink && (
        <Link href={buttonLink} className="relative mt-5">
          <Button className="group rounded-full bg-emerald-600 px-6 text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
