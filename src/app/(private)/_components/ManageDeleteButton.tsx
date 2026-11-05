import { IEvents } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trash2, TriangleAlert, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteEventButtonProps {
  event: IEvents;
}

const ManageDeleteButton = ({ event }: DeleteEventButtonProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:7000/upcoming-events/${event._id}`,
        {
          method: "DELETE",
        },
      );
      const afterDelete = await res.json();
      console.log(afterDelete, "the event is deleted!");

      if (!res.ok) {
        throw new Error(afterDelete.message || "Failed to delete event!");
      }

      if (afterDelete.deletedCount === 0) {
        toast.info("No delete were made!");
      } else {
        toast.success("The event is deleted successfully!");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <AlertDialog>
        {/* Trigger button */}
        <AlertDialogTrigger
          render={
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
            >
              <Trash2 className="mr-1 size-4" />
              Delete
            </Button>
          }
        />

        {/* Delete confirmation dialog (UI only) */}
        <AlertDialogContent className="w-[calc(100%_-_2rem)] gap-0 overflow-hidden rounded-2xl bg-card p-0 text-foreground shadow-2xl ring-0 data-[size=default]:max-w-md data-[size=default]:sm:max-w-md">
          {/* Close button */}
          <AlertDialogCancel className="absolute right-3 top-3 h-8 w-8 gap-0 rounded-lg px-0 text-muted-foreground transition-colors hover:bg-muted dark:hover:bg-gray-800 hover:text-foreground dark:hover:text-white">
            <X className="size-4" />
            <span className="sr-only">Close dialog</span>
          </AlertDialogCancel>

          {/* Header */}
          <div className="flex items-start gap-4 pb-5 pl-6 pr-14 pt-6 sm:pl-7 sm:pr-16">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 ring-4 ring-red-100">
              <Trash2 className="size-5" />
            </div>

            <div className="space-y-1.5 pt-0.5">
              <AlertDialogTitle className="text-lg font-semibold tracking-tight text-foreground">
                Delete this event?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-sm leading-relaxed text-muted-foreground">
                This will permanently remove
                <span className="font-semibold text-foreground">
                  {event.title}
                </span>
                from your events. This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 px-6 pb-5 sm:px-7">
            {/* Warning callout */}
            <div className="flex items-start gap-3 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 p-3.5">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-500 dark:text-red-400" />
              <p className="text-xs leading-relaxed text-red-600/90 dark:text-red-400">
                Everyone who joined will lose access to this event right away,
                and it will disappear from the upcoming events list.
              </p>
            </div>

            {/* Event summary */}
            <div className="flex items-center gap-3 rounded-xl border border-border dark:border-gray-700 bg-card p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border dark:ring-gray-700">
                <CalendarDays className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {event.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {event.eventDate} · {event.location}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-border dark:border-gray-700 bg-muted/50 dark:bg-gray-800/30 px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
            <AlertDialogCancel className="h-10 p-3 flex-1 rounded-lg border-border dark:border-gray-700 bg-card dark:bg-gray-800 px-5 font-medium text-foreground transition-colors hover:bg-muted dark:hover:bg-gray-700 hover:text-foreground dark:hover:text-white sm:flex-none">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="h-10 p-3 flex-1 rounded-lg bg-red-600 px-5 font-semibold text-white shadow-sm shadow-red-600/20 transition-colors hover:bg-red-700 sm:flex-none"
            >
              <Trash2 className="mr-1.5 size-4" />
              Delete Event
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* Delete Button */}
    </div>
  );
};

export default ManageDeleteButton;
