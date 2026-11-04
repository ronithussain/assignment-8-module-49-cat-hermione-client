"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

import { IEvents } from "@/app/types/type";

import ManageDeleteButton from "./ManageDeleteButton";
import ManageEditButton from "./ManageEditButton";

interface ManageEventCardProps {
  event: IEvents;
}

const ManageEventCard = ({ event }: ManageEventCardProps) => {
  const isPast = new Date(event.eventDate) < new Date();

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title || "Event thumbnail"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <Badge className="absolute top-4 left-4 bg-emerald-600 text-white hover:bg-emerald-700">
          {event.eventType}
        </Badge>

        {isPast && (
          <Badge className="absolute top-4 left-20 bg-gray-600 text-white hover:bg-gray-700">
            Past
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className="space-y-3 p-5">
        <CardTitle className="line-clamp-1 text-xl font-bold text-gray-900">
          {event.title}
        </CardTitle>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-emerald-600" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0 text-emerald-600" />
          <span>
            {new Date(event.eventDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-5 pt-4">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-medium uppercase tracking-wider ${
              isPast
                ? "text-gray-500"
                : "rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600"
            }`}
          >
            {isPast ? "Completed" : "Upcoming"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ManageEditButton event={event} />
          <ManageDeleteButton event={event} />

          {/* View Button */}
          <Button
            size="sm"
            className="bg-emerald-600 px-3 hover:bg-emerald-700"
          >
            <Link
              href={`/upcoming-events/${event._id}`}
              className="flex items-center text-white/90"
            >
              View
              <ArrowUpRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ManageEventCard;
