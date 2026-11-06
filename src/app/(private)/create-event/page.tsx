"use client";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  MapPin,
  Tag,
  ImagePlus,
  FileText,
  Sparkles,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
  "Other",
];


const getToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

const CreateEventForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const handleCreateEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!user?.email) {
      toast.error("Please login first.");
      return;
    }

    const formData = new FormData(form);
    const eventData = Object.fromEntries(formData.entries());

    console.log(eventData);

    if (eventData.eventDate < getToday()) {
      toast.error("Past dates are not allowed.");
      return;
    }

    const event = {
      ...eventData,
      creatorEmail: user.email,
      creatorName: user.name,
      creatorImage: user.image,
    };
    const token = await getTokenFromClient();

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      const result = await res.json();
      // console.log(result, "the create event data is...");

      if (!res.ok) {
        toast.error(result.message || "Failed to create event");
        return;
      }

      toast.success("Event created successfully!");
      router.push("/upcoming-events");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <Sparkles size={14} />
          Community & Social Impact
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Create an Event
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-gray-400 sm:text-base">
          Bring people together and make a positive impact. Fill in the details
          to organize your next community event.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleCreateEvent}
        className="overflow-hidden rounded-3xl border-gray-200 border-border dark:border-gray-700 bg-card shadow-xl shadow-black/20"
      >
        {/* Form Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 border-border dark:border-gray-700 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/20 to-teal-50 dark:to-teal-900/20 px-6 py-6 sm:px-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Plus size={25} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Event Information
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
              Provide accurate information about your event.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="space-y-9 p-6 sm:p-8">
          {/* Basic Information */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <FileText size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Basic Information
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Tell us about your event
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Title */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">
                  Event Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  minLength={5}
                  maxLength={100}
                  placeholder="e.g. Winter Clothes Distribution"
                  required
                  className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-input/50 dark:bg-gray-800/30 transition-all focus:bg-background focus:ring-4 focus:ring-emerald-500/10"
                />
                <p className="text-xs text-slate-400 dark:text-gray-500">
                  Choose a clear and meaningful event title.
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Event Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    minLength={3}
                    maxLength={150}
                    placeholder="Mirpur, Dhaka"
                    required
                    className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-input/50 dark:bg-gray-800/30 pl-10 focus:bg-background focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="eventType">
                  Event Category <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
                  <Select
                    id="eventType"
                    name="eventType"
                    required
                    defaultValue=""
                    className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-input/50 dark:bg-gray-800/30 pl-10 focus:bg-background focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Event Media */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <ImagePlus size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Event Cover Image
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Add an attractive image for your event
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">
                Image URL <span className="text-red-500">*</span>
              </Label>

              <div className="relative">
                <ImagePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  required
                  className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-input/50 dark:bg-gray-800/30 pl-10 focus:bg-background focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <p className="text-xs text-slate-400 dark:text-gray-500">
                Use a high-quality image that represents your event.
              </p>
            </div>
          </section>

          {/* Schedule */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <CalendarDays size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Event Schedule
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  When will your event take place?
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">
                Event Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                min={getToday()}
                required
                className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-input/50 dark:bg-gray-800/30 focus:bg-background focus:ring-4 focus:ring-emerald-500/10"
              />
              <p className="text-xs text-slate-400 dark:text-gray-500">
                Select a future date for your community event.
              </p>
            </div>
          </section>

          {/* Description */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <FileText size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Event Description
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Explain the purpose and activities of your event
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your event, its purpose, activities and how people can participate..."
                minLength={20}
                maxLength={1000}
                required
                rows={6}
                className="resize-y rounded-xl border-gray-200 dark:border-gray-700 bg-input/50 dark:bg-gray-800/30 leading-6 focus:bg-background focus:ring-4 focus:ring-emerald-500/10"
              />
              <p className="text-xs text-slate-400 dark:text-gray-500">
                Write at least 20 characters to describe your event.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Actions Button functionality*/}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 dark:border-gray-700 bg-muted/50 dark:bg-gray-800/30 px-6 py-6 sm:flex-row sm:justify-between sm:px-8">
          <Button
            type="reset"
            variant="outline"
            className="h-12 rounded-xl border-gray-200 dark:border-gray-700 bg-card dark:bg-gray-800 px-6 text-slate-600 dark:text-gray-300 transition-all hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 rounded-xl bg-emerald-600 px-8 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20 disabled:translate-y-0 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating Event...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Bottom Note */}
      <p className="mt-5 text-center text-xs leading-5 text-slate-400 dark:text-gray-500">
        <Sparkles className="mr-1 inline h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
        Every small action can make a big difference in your community.
      </p>
    </div>
  );
};

export default CreateEventForm;
