import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { IEvents } from "@/app/types/type";

interface RecentUpcomingEventsProps {
  events: IEvents[];
}

function formatEventDate(date: string) {
  const eventDate = new Date(date);

  return {
    day: eventDate.toLocaleDateString("en-US", {
      day: "2-digit",
    }),
    month: eventDate.toLocaleDateString("en-US", {
      month: "short",
    }),
    time: eventDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export default function RecentUpcomingEvents({
  events,
}: RecentUpcomingEventsProps) {
  return (
    <section className="bg-[#f8faf7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            Make an Impact
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Upcoming Events
          </h2>

          <p className="mt-4 text-gray-500">
            Be part of something meaningful. Join local events and help
            make a positive difference in your community.
          </p>
        </div>

        {/* Event Cards */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event) => {
              const date = formatEventDate(event.eventDate);

              return (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
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
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
                      {event.eventType}
                    </span>

                    {/* Date Badge */}
                    <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-lg shadow-lg">
                      <div className="flex flex-col items-center justify-center bg-red-600 px-3 py-2 text-white">
                        <span className="text-lg font-bold leading-none">
                          {date.day}
                        </span>
                        <span className="mt-1 text-xs uppercase">
                          {date.month}
                        </span>
                      </div>

                      <div className="flex flex-col justify-center bg-yellow-400 px-3 py-2 text-center text-gray-900">
                        <span className="text-sm font-bold">
                          {date.time}
                        </span>
                        <span className="text-[10px] font-medium">
                          EVENT TIME
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-2 pb-2 pt-4">
                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
                      {event.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={15} className="shrink-0 text-emerald-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                      {event.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <Link
                        href={`/upcoming-events/${event._id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors hover:text-emerald-600"
                      >
                        Join with us
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>

                      <CalendarDays
                        size={18}
                        className="text-emerald-600"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <CalendarDays className="mx-auto mb-3 text-gray-400" size={36} />
            <h3 className="text-xl font-semibold text-gray-800">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-gray-500">
              New events will be displayed here soon.
            </p>
          </div>
        )}

        {/* View All */}
        {events.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
            >
              Explore All Events
              <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}