import Image from "next/image";
import Link from "next/link";

import { CalendarDays, MapPin, ArrowUpRight, Clock } from "lucide-react";

import { IEvents } from "@/app/types/type";

interface EventCardProps {
  event: IEvents;
}

function formatDateTime(date: string) {
  const eventDate = new Date(date);

  return {
    date: eventDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }),

    time: eventDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Dhaka",
    }),
  };
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = formatDateTime(event.eventDate);
  const createdDate = formatDateTime(event.createAt);

  return (
    <article className="group overflow-hidden rounded-2xl bg-card p-3 shadow-sm border border-border dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden rounded-xl">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-gray-800/90 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm backdrop-blur">
          {event.eventType}
        </span>

        {/* Date Badge */}
        <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center bg-red-600 px-3 py-2 text-white">
            <span className="text-lg font-bold leading-none">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                day: "2-digit",
                timeZone: "Asia/Dhaka",
              })}
            </span>
            <span className="mt-1 text-xs uppercase">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                month: "short",
                timeZone: "Asia/Dhaka",
              })}
            </span>
          </div>

          <div className="flex flex-col justify-center bg-yellow-400 px-3 py-2 text-center text-gray-900 dark:text-white">
            {new Date(event.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              timeZone: "Asia/Dhaka",
            })}
            <span className="text-[10px] font-medium">EVENT TIME</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-2 pb-2 pt-4 space-y-2">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          {event.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <MapPin size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        {/* Event Date */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <CalendarDays className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

          <span>Event Date: {eventDate.date}</span>
        </div>

        {/* Event Creation Date */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <Clock className="size-4 shrink-0 text-blue-500 dark:text-blue-400" />

          <span>
            Created: {createdDate.date} at {createdDate.time}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border dark:border-gray-700 pt-4">
          <Link
            href={`/upcoming-events/${event._id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-gray-200 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            View with us
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

          <CalendarDays size={18} className="text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </article>
  );
}
