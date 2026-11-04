"use client";

import { IEvents } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ManageEditButtonProps {
  event: IEvents;
}

const ManageEditButton = ({ event }: ManageEditButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // button click er por dialogue auto off hoye jabe
  const dateInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toLocaleDateString("en-CA");
    }
  }, []);

  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user);
  // console.log(user, 'and data is ', event);

  const handleEditEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const eventData = Object.fromEntries(formData.entries());

    // Future date validation
    const eventDate = new Date(eventData.eventDate as string);

    if (eventDate <= new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:7000/upcoming-events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        },
      );

      const afterSubmit = await res.json();
      // console.log(afterSubmit, "updated data is");

      if (!res.ok) {
        throw new Error(afterSubmit.message || "Failed to edit event!");
      }

      if (afterSubmit.modifiedCount === 0) {
        toast.info("No changes were made.");
      } else {
        toast.success("Event updated successfully!");
      }
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <Edit className="mr-1 size-4" />
              Edit
            </Button>
          }
        />

        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 bg-white p-0 shadow-2xl rounded-2xl">
          {/* Header */}
          <DialogHeader className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Edit className="size-5" />
              </div>

              <div className="space-y-1">
                <DialogTitle className="text-xl font-bold tracking-tight text-slate-900">
                  Edit Event
                </DialogTitle>

                <DialogDescription className="text-sm text-slate-500">
                  Update your event information and keep everything up to date.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form */}
          <form
            onSubmit={handleEditEvent}
            className="space-y-6 px-6 py-6 sm:px-8"
          >
            <FieldGroup>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Event Title */}
                <div className="sm:col-span-2 space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Event Title
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={event?.title}
                    placeholder="Winter Clothes Distribution"
                    required
                    className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all focus-visible:bg-white focus-visible:ring-red-500/20"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Location
                  </Label>

                  <Input
                    id="location"
                    name="location"
                    type="text"
                    defaultValue={event?.location}
                    placeholder="Mirpur, Dhaka"
                    required
                    className="h-11 rounded-lg border-slate-200 bg-slate-50/50 focus-visible:bg-white"
                  />
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor="eventType"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Event Type
                  </Label>

                  <Select
                    className="h-11 w-full rounded-lg border-slate-200 bg-slate-50/50 focus-visible:bg-white"
                    id="eventType"
                    name="eventType"
                    required
                    defaultValue={event?.eventType}
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

                {/* Thumbnail */}
                <div className="sm:col-span-2 space-y-2">
                  <Label
                    htmlFor="thumbnail"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Thumbnail Image URL
                  </Label>

                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    defaultValue={event?.thumbnail}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="h-11 rounded-lg border-slate-200 bg-slate-50/50 focus-visible:bg-white"
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="eventDate"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Event Date
                  </Label>

                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    defaultValue={event?.eventDate?.slice(0, 10)}
                    required
                    className="h-11 rounded-lg border-slate-200 bg-slate-50/50 focus-visible:bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-700"
                >
                  Event Description
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  defaultValue={event?.description}
                  placeholder="Describe your event, its purpose, and how people can participate..."
                  required
                  rows={5}
                  className="resize-none rounded-lg border-slate-200 bg-slate-50/50 leading-relaxed focus-visible:bg-white"
                />
              </div>
            </FieldGroup>

            {/* Footer */}
            <DialogFooter className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:px-8">
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="h-11 rounded-lg border-slate-200 px-6 font-medium hover:bg-white"
                  >
                    Cancel
                  </Button>
                }
              />

              <Button
                type="submit"
                className="h-11 rounded-lg bg-red-600 px-6 font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md"
              >
                <Edit className="mr-2 size-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEditButton;
