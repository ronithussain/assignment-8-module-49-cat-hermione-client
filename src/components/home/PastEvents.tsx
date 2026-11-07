import { IEvents } from "@/app/types/type";
import { CalendarDays, } from "lucide-react";

import EventCard from "../upcoming-events/EventCard";

interface IPastEventProps {
  pastEvents: IEvents[];
}



const PastEvents = ({ pastEvents }: IPastEventProps) => {
  return (
    <div>
      <section className="bg-background dark:bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className=" px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {/* Section Heading */}
          <div data-aos="fade-up"
          data-aos-duration="900"  className="mx-auto mb-12 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/20 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Make an Impact
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Our Past Events
            </h2>

            <p className="mt-4 text-slate-500 dark:text-gray-400">
              Be part of something meaningful. Join local events and help make a
              positive difference in your community.
            </p>
          </div>

          {/* Event Cards */}
          {pastEvents.length > 0 ? (
            <div data-aos="fade-right"
          data-aos-duration="900"  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pastEvents.slice(0, 8).map((event) => (
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
