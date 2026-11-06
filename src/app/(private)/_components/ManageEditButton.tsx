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
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ManageEditButtonProps {
  event: IEvents;
}

const ManageEditButton = ({ event }: ManageEditButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toLocaleDateString("en-CA");
    }
  }, []);

  const { data: session } = useSession();
  const user = session?.user;

  const handleEditEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const eventData = Object.fromEntries(formData.entries());

    const eventDate = new Date(eventData.eventDate as string);

    if (eventDate <= new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    const token = await getTokenFromClient();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        },
      );

      const afterSubmit = await res.json();

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

  const InputCssStyle =
    "h-11  rounded-lg border-input bg-background text-white dark:text-gray-400 focus-visible:ring-[#009966] border dark:border-gray-700 border-gray-600";

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              size="sm"
              variant="outline"
              className="border dark:border-gray-700 border-red-100 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200"
            >
              <Edit className="mr-1 size-4" />
              Edit
            </Button>
          }
        />

        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border dark:border-gray-700 border-gray-600 bg-card p-0 shadow-2xl rounded-2xl bg-gray-700 dark:bg-slate-900">
          {/* Header */}
          <DialogHeader className="border-b dark:border-gray-700 border-gray-600 bg-muted px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                <Edit className="size-5" />
              </div>

              <div className="space-y-1">
                <DialogTitle className="text-xl font-bold tracking-tight text-white dark:text-gray-400">
                  Edit Event
                </DialogTitle>

                <DialogDescription className="text-sm text-white dark:text-gray-400">
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
                    className="text-sm font-semibold text-white dark:text-gray-400"
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
                    className={InputCssStyle}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-white dark:text-gray-400"
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
                    className={InputCssStyle}
                  />
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor="eventType"
                    className="text-sm font-semibold text-white dark:text-gray-400"
                  >
                    Event Type
                  </Label>

                  <Select
                    className={InputCssStyle}
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
                    className="text-sm font-semibold text-white dark:text-gray-400"
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
                    className={InputCssStyle}
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="eventDate"
                    className="text-sm font-semibold text-white dark:text-gray-400"
                  >
                    Event Date
                  </Label>

                  <Input
                    ref={dateInputRef}
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    defaultValue={event?.eventDate?.slice(0, 10)}
                    required
                    className={InputCssStyle}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-white dark:text-gray-400"
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
                  className="resize-none rounded-lg border dark:border-gray-700 border-gray-600 bg-background text-white dark:text-gray-400 leading-relaxed"
                />
              </div>
            </FieldGroup>

            {/* Footer */}
            <DialogFooter className="flex flex-col-reverse gap-3 border-t dark:border-gray-700 border-gray-600 bg-muted px-6 py-4 sm:flex-row sm:px-8">
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="h-11 text-md rounded-lg text-red-100 border-none px-6 font-medium hover:bg-muted"
                  >
                    Cancel
                  </Button>
                }
              />

              <Button
                type="submit"
                disabled={loading}
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
