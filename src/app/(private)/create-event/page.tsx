"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const CreateEventForm = () => {
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toLocaleDateString("en-CA");
    }
  }, []);

  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  const handleCreateEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const eventData = Object.fromEntries(formData.entries());

    const event = {
      ...eventData,
      creatorEmail: user?.email,
      creatorImage: user?.image,
      creatorName: user?.name,
    };

    // Future date validation
    const eventDate = new Date(eventData.eventDate as string);

    if (eventDate <= new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:7000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const afterSubmit = await res.json();

      if (!res.ok) {
        throw new Error(afterSubmit.message || "Failed to create event");
      }
    
        toast.success("Event created successfully!");
        router.push('/upcoming-events')
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          Create Event
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details below to create a new event.
        </p>
      </div>

      <form
        onSubmit={handleCreateEvent}
        className="rounded-xl border border-border bg-background p-8 sm:p-10 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Event Title - full width */}
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Winter Clothes Distribution"
              required
              className="bg-slate-50 border-border"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Mirpur, Dhaka"
              required
              className="bg-slate-50 border-border"
            />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select
              id="eventType"
              name="eventType"
              required
              defaultValue=""
              className="bg-slate-50 border-border"
            >
              <option value="" disabled>
                Select event type
              </option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
              <option value="Social Welfare">Social Welfare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          {/* Thumbnail Image URL - full width */}
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              type="url"
              placeholder="https://example.com/image.jpg"
              required
              className="bg-slate-50 border-border"
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date</Label>
            <Input
              ref={dateInputRef}
              id="eventDate"
              name="eventDate"
              type="date"
              required
              className="bg-slate-50 border-border"
            />
          </div>
        </div>

        {/* Description - full width */}
        <div className="mt-8 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your event..."
            required
            rows={5}
            className="bg-slate-50 border-border"
          />
        </div>

        {/* Submit actions */}
        <div className="mt-10 flex flex-col sm:flex-row sm:justify-end gap-3">
          <Button
            type="reset"
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white hover:bg-teal-700"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
