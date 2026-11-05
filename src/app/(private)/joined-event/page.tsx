import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { IJoinedEvent } from "@/app/types/type";
import EventCard from "@/components/upcoming-events/EventCard";
import EmptyState from "@/components/shared/EmptyState";

const JoinedEventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return;
  }

  const res = await fetch(`http://localhost:7000/joined-events/${user.email}`, {
    //   next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch joined events");
  }

  const data: IJoinedEvent[] = await res.json();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Joined Events
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have joined{" "}
            <span className="font-medium text-foreground">{data.length}</span>{" "}
            event{data.length !== 1 ? "s" : ""}.
          </p>
        </div>

        {data.length === 0 ? (
          <EmptyState
            title="No Joined Events"
            description="You haven't joined any events yet. Explore upcoming events and make a difference!"
            message="Find an event to join"
            buttonText="Joined Event"
            buttonLink="/upcoming-events"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEventPage;
