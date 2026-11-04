import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

import { IEvents } from "@/app/types/type";

interface EventCardProps {
  event: IEvents;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-2xl border-none border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute top-4 left-4 bg-emerald-600 text-white hover:bg-emerald-700">
          {event.eventType}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="space-y-3 p-5">
        <h2 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
          {event.title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-emerald-600" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0 text-emerald-600" />
          <span>
            {" "}
            {new Date(event.eventDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t border-gray-100 p-5 pt-4">
        <span className="text-sm font-medium text-muted-foreground">
          Community Event
        </span>

        <Link
          href={`/upcoming-events/${event._id}`}
          className="flex items-center text-white/90"
        >
          <Button className="bg-emerald-600 hover:bg-emerald-700 px-3 py-6">
            View Event
            <ArrowUpRight className="ml-1 size-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
