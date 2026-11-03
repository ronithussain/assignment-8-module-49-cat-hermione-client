import EventCard from "@/components/upcoming-events/EventCard";
import { IEvents } from "../types/type";


const UpcomingEventsPage = async () => {


    const res = await fetch(`http://localhost:7000/upcoming-events`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming events");
    }

    const data:IEvents[] = await res.json();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Upcoming Events
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore upcoming events and join the ones that interest you.
          </p>
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border-2 border-dashed border-border bg-white/50">
            <div className="mx-auto mb-3 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">No upcoming events</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for new events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((event) => (
              <EventCard key={(event._id)} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsPage;
