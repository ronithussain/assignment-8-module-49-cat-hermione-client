"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CalendarDays, MapPin, ArrowUpRight, User } from "lucide-react";

import { IJoinedEvent } from "@/app/types/type";

interface JoinedEventCardProps {
  event: IJoinedEvent;
}

const JoinedEventCard = ({ event }: JoinedEventCardProps) => {
  const joinedDate = new Date(event.joinedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <Badge className="absolute top-4 left-4 bg-emerald-600 text-white hover:bg-emerald-700">
          {event.eventType}
        </Badge>

        <span className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium shadow-sm">
          <User className="size-3.5 shrink-0" />
          Joined {joinedDate}
        </span>
      </div>

      {/* Content */}
      <CardContent className="space-y-3 p-5">
        <CardTitle className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
          {event.title}
        </CardTitle>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-emerald-600" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0 text-emerald-600" />
          <span>{event.eventDate}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-muted-foreground">Organizer</span>
          <span className="text-foreground font-medium line-clamp-1">{event.creatorName}</span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t border-gray-100 p-5 pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={event.creatorImage} alt={event.creatorName} />
            <AvatarFallback>{event.creatorName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Hosted by</p>
            <p className="text-sm font-medium text-foreground">{event.creatorName}</p>
          </div>
        </div>

        <Button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2">
          <Link className="flex items-center text-white/90" href={`/upcoming-events/${event._id}`}>
            View Event
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinedEventCard;
