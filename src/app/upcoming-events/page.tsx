import EventCard from "@/components/upcoming-events/EventCard";
import { IEvents } from "../types/type";
import CategoryList from "@/components/upcoming-events/CategoryList";

const UpcomingEventsPage = async () => {
  const res = await fetch(`http://localhost:7000/upcoming-events`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch upcoming events");
  }

  const events: IEvents[] = await res.json();

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

        {/* past the props */}
        <div>
          <CategoryList events={events} />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsPage;
