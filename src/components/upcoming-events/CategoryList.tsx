"use client";
import { IEvents } from "@/app/types/type";
import { useState } from "react";
import EventCard from "./EventCard";
import { CalendarDays, ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];
const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Event Date: Earliest First", value: "event-asc" },
  { label: "Event Date: Latest First", value: "event-desc" },
  { label: "Created: Newest First", value: "created-desc" },
  { label: "Created: Oldest First", value: "created-asc" },
];

const CategoryList = ({ events }: { events: IEvents[] }) => {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = events.filter((e) => {
    const matchType = selected === "All" || e.eventType === selected;

    const text = search.toLowerCase();
    const matchSearch =
      e.title.toLowerCase().includes(text) ||
      e.location.toLowerCase().includes(text);
    return matchType && matchSearch;
  });

  // sort implement:
  const sortedEvents = [...filtered].sort((a, b) => {
    if (sortBy === "event-asc") {
      return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
    } else if (sortBy === "event-desc") {
      return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
    } else if (sortBy === "created-desc") {
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
    } else if (sortBy === "created-asc") {
      return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
    } else {
      return 0;
    }
  });

  return (
    <div>
      {/* Category Filter + Search */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300
                ${
                  selected === cat
                    ? "border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-600/20"
                    : "border-gray-200 bg-white text-gray-600 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Static Search Input */}
        <div className="flex w-full items-center gap-3 lg:w-auto">
          <div className="relative w-full lg:w-72">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events title and location..."
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            />
          </div>

          <div className="relative w-full lg:w-64">
            {/* Sort Icon */}
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-teal-600">
              <SlidersHorizontal size={18} />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Events */}
      {sortedEvents.length === 0 ? (
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 px-6 py-20 text-center shadow-sm">
          {/* Background Decoration */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-teal-100/40 blur-3xl" />

          {/* Icon */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-100/60">
            <MapPin className="h-9 w-9 text-emerald-600" />

            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white">
              <CalendarDays className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Content */}
          <div className="relative space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              No Upcoming Events
            </h3>

            <p className="mx-auto max-w-sm text-sm leading-6 text-gray-500">
              There are no events scheduled right now. Stay connected and check
              back soon for exciting opportunities to make a difference!
            </p>
          </div>

          {/* Bottom Badge */}
          <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-xs font-medium text-emerald-700 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            New opportunities are coming soon
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
