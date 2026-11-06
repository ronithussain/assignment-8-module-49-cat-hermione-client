import { IEvents } from "@/app/types/type";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import JoinEventButton from "@/components/upcoming-events/JoinEventButton";

interface IParamsProps {
  params: Promise<{ eventId: string }>;
}

const EventDetailPage = async ({ params }: IParamsProps) => {
  const { eventId } = await params;

  const res = await fetch(`http://localhost:7000/upcoming-events/${eventId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to load event details");
  }
  const event: IEvents = await res.json();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
        >
          ← Back to events
        </Link>

        <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-card p-0 shadow-sm overflow-hidden">
          {/* Thumbnail */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={event?.thumbnail}
              alt={event?.title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">
              {event.eventType}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">
                {event.title}
              </h1>
              <span className="text-sm font-medium text-muted-foreground">
                Community Event
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-emerald-600 dark:text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                </span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-emerald-600 dark:text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <span>
                  {" "}
                  {new Date(event.eventDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                Organizer
              </h2>
              <div className="flex items-center gap-3">
                <Image
                  width={50}
                  height={50}
                  src={event?.creatorImage}
                  alt={event?.creatorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {event.creatorName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.creatorEmail}
                  </p>
                </div>
              </div>
            </div>
            <JoinEventButton event={event} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetailPage;
