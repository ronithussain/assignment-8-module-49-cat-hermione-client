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
              className="border-red-200 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="mr-1 size-4" />
              Delete
            </Button>
          }
        />

        {/* Delete confirmation dialog (UI only) */}
        <AlertDialogContent className="w-[calc(100%_-_2rem)] gap-0 overflow-hidden rounded-2xl bg-white p-0 text-slate-900 shadow-2xl ring-0 data-[size=default]:max-w-md data-[size=default]:sm:max-w-md">
          {/* Close button */}
          <AlertDialogCancel className="absolute right-3 top-3 h-8 w-8 gap-0 rounded-lg px-0 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
            <X className="size-4" />
            <span className="sr-only">Close dialog</span>
          </AlertDialogCancel>

          {/* Header */}
          <div className="flex items-start gap-4 pb-5 pl-6 pr-14 pt-6 sm:pl-7 sm:pr-16">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 ring-4 ring-red-100">
              <Trash2 className="size-5" />
            </div>

            <div className="space-y-1.5 pt-0.5">
              <AlertDialogTitle className="text-lg font-semibold tracking-tight text-slate-900">
                Delete this event?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-sm leading-relaxed text-slate-500">
                This will permanently remove
                <span className="font-semibold text-slate-800">
                  {event.title}
                </span>
                from your events. This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 px-6 pb-5 sm:px-7">
            {/* Warning callout */}
            <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
              <p className="text-xs leading-relaxed text-red-600/90">
                Everyone who joined will lose access to this event right away,
                and it will disappear from the upcoming events list.
              </p>
            </div>

            {/* Event summary */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200">
                <CalendarDays className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {event.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {event.eventDate} · {event.location}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
            <AlertDialogCancel className="h-10 p-3 flex-1 rounded-lg border-slate-200 bg-white px-5 font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex-none">
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
