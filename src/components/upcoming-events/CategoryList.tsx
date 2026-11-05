"use client";
import { IEvents } from "@/app/types/type";
import { useState } from "react";
import EventCard from "./EventCard";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import EmptyState from "../shared/EmptyState";

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
                    ? "border-teal-600 dark:border-teal-500 bg-teal-600 text-white shadow-md shadow-teal-600/20"
                    : "border-border dark:border-gray-700 bg-card dark:bg-gray-800 text-foreground dark:text-gray-200 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex w-full items-center gap-3 lg:w-auto">
          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events title and location..."
              className="w-full rounded-full border border-input bg-background py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* Sort */}
          <div className="relative w-full lg:w-64">
            <SlidersHorizontal
              size={18}
              className="pointer-events-none absolute inset-y-0 left-4 my-auto text-emerald-600 dark:text-emerald-400"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-full border border-input bg-background py-3 pl-11 pr-10 text-sm text-foreground outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute inset-y-0 right-4 my-auto text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Events */}
      {sortedEvents.length === 0 ? (
        <EmptyState/>
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
