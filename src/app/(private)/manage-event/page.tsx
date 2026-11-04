import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

import ManageEventCard from "@/app/(private)/_components/ManageEventCard";
import { IEvents } from "@/app/types/type";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

const StatCard = ({ title, value, color }: StatCardProps) => (
  <div className={`rounded-xl border p-6 ${color} shadow-sm`}>
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

  const res = await fetch(`http://localhost:7000/manage-events/${user.email}`);

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
    <div className="min-h-screen bg-[#f8fafc]">
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
              color="border-blue-100 bg-blue-50"
            />

            <StatCard
              title="Upcoming"
              value={upcomingEvents}
              color="border-emerald-100 bg-emerald-50"
            />

            <StatCard
              title="Past"
              value={pastEvents}
              color="border-gray-100 bg-gray-50"
            />
          </div>
        </div>

        {/* Events */}
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white/50 py-24 text-center">
            <p className="text-sm font-medium text-foreground">
              No events created yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your first event and start managing it here.
            </p>

            <div className="mt-8">
              <Link href="/create-event">
                <Button>Create Your First Event</Button>
              </Link>
            </div>
          </div>
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
