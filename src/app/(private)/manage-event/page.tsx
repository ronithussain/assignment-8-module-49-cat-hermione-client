import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

import ManageEventCard from "@/app/(private)/_components/ManageEventCard";
import { IEvents } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

const StatCard = ({ title, value, color }: StatCardProps) => (
  <div className={`rounded-xl border p-6 shadow-sm ${color}`}>
    <p className="text-sm font-medium text-muted-foreground">{title}</p>
    <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
  </div>
);

const ManageEventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Fix 1: Return valid JSX if user is not logged in
  if (!user?.email) {
    return;
  }
  const token = await getTokenFromServer()

  const res = await fetch(`http://localhost:7000/manage-events/${user.email}`,{
    headers:{
      authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch manage events");
  }

  // Fix 2: API returns an array, so use IEvents[]
  const data: IEvents[] = await res.json();

  const now = new Date();

  const totalEvents = data.length;

  const upcomingEvents = data.filter(
    (event) => new Date(event.eventDate) >= now,
  ).length;

  const pastEvents = totalEvents - upcomingEvents;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Manage Events
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage and track your created events.
              </p>
            </div>

            <Link href="/create-event">
              <Button>Create New Event</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard
              title="Total Events"
              value={totalEvents}
              color="border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/20"
            />

            <StatCard
              title="Upcoming"
              value={upcomingEvents}
              color="border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/20"
            />

            <StatCard
              title="Past"
              value={pastEvents}
              color="border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Events */}
        {data.length === 0 ? (
          <EmptyState
            title="No Events Created Yet"
            description="You haven't created any events. Start organizing a community event today!"
            message="Your first event is waiting"
            buttonText="Create Event"
            buttonLink="/create-event"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((event) => (
              <ManageEventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEventPage;
