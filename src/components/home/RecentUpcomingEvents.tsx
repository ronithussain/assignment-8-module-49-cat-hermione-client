import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { IEvents } from "@/app/types/type";
import EventCard from "../upcoming-events/EventCard";
import AnimatedButton from "../shared/AmimatedButton";

interface RecentUpcomingEventsProps {
  recentEvents: IEvents[];
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

export default function RecentUpcomingEvents({
  recentEvents,
}: RecentUpcomingEventsProps) {
  return (
    <section className="bg-background dark:bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/20 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Make an Impact
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Recent Upcoming Events
          </h2>

          <p className="mt-4 text-slate-500 dark:text-gray-400">
            Be part of something meaningful. Join local events and help make a
            positive difference in your community.
          </p>
        </div>

        {/* Event Cards */}
        {recentEvents.length > 0 ? (
         <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {recentEvents.slice(0, 8).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border dark:border-gray-700 bg-card py-16 text-center">
            <CalendarDays className="mx-auto mb-3 text-muted-foreground" size={36} />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-slate-500 dark:text-gray-400">
              New events will be displayed here soon.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-10 text-center">
          <AnimatedButton
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
          >
            Explore All Events
            <ArrowUpRight size={18} />
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
