import { IEvents } from "@/app/types/type";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventCard from "../upcoming-events/EventCard";

interface IPastEventProps {
  pastEvents: IEvents[];
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

const PastEvents = ({ pastEvents }: IPastEventProps) => {
  return (
    <div>
      <section className="bg-[#f8faf7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              Make an Impact
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Past Events
            </h2>

            <p className="mt-4 text-gray-500">
              Be part of something meaningful. Join local events and help make a
              positive difference in your community.
            </p>
          </div>

          {/* Event Cards */}
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {pastEvents.slice(0, 8).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <CalendarDays className="mx-auto mb-3 text-gray-400" size={36} />
              <h3 className="text-xl font-semibold text-gray-800">
                No Upcoming Events
              </h3>
              <p className="mt-2 text-gray-500">
                Past events will be displayed here soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PastEvents;
