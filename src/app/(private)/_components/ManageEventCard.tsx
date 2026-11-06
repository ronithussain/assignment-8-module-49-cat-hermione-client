"use client";

import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import { IEvents } from "@/app/types/type";

import ManageDeleteButton from "./ManageDeleteButton";
import ManageEditButton from "./ManageEditButton";

interface ManageEventCardProps {
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

const ManageEventCard = ({ event }: ManageEventCardProps) => {
  const isPast = new Date(event.eventDate) < new Date();

  const eventDate = formatDateTime(event.eventDate);
  const createdDate = formatDateTime(event.createAt);

  return (
    <article className="group overflow-hidden rounded-2xl bg-card p-3 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden rounded-xl">
        <Image
          src={event.thumbnail}
          alt={event.title || "Event thumbnail"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-gray-800/90 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm backdrop-blur">
          {event.eventType}
        </span>

        {/* Past Badge */}
        {isPast && (
          <span className="absolute left-3 top-11 rounded-full bg-gray-800/90 dark:bg-gray-600/90 px-3 py-1 text-xs font-semibold text-white">
            Past Event
          </span>
        )}

        {/* Event Date */}
        <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center bg-red-600 px-3 py-2 text-white">
            <span className="text-lg font-bold">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                day: "2-digit",
                timeZone: "Asia/Dhaka",
              })}
            </span>

            <span className="text-xs uppercase">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                month: "short",
                timeZone: "Asia/Dhaka",
              })}
            </span>

            <span className="text-[10px]">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                year: "numeric",
                timeZone: "Asia/Dhaka",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 px-2 pb-2 pt-4">

        <h2 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          {event.title}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <MapPin className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* Event Date */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <CalendarDays className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

          <span>
            Event Date: {eventDate.date}
          </span>
        </div>

        {/* Event Creation Date */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <Clock className="size-4 shrink-0 text-blue-500 dark:text-blue-400" />

          <span>
            Created: {createdDate.date} at {createdDate.time}
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 min-h-10 text-sm leading-6 text-slate-500 dark:text-gray-400">
          {event.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 px-2 pt-4 pb-2">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isPast
              ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {isPast ? "Completed" : "Upcoming"}
        </span>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <ManageEditButton event={event} />

          <ManageDeleteButton event={event} />

          <Link
            href={`/upcoming-events/${event._id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-md"
          >
            View
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ManageEventCard;
