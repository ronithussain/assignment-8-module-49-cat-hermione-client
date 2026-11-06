"use client";
import { IEvents } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { HeartHandshake, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface JoinEventButtonProps {
  event: IEvents;
}

const JoinEventButton = ({ event }: JoinEventButtonProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user, 'user');

  const router = useRouter();

  const handleJoinedEvent = async () => {
    if (!session) {
      toast.error("Please login to join this event");
      return;
    }
    const token = await getTokenFromClient();

    try {
      const { _id, ...eventData } = event; //id mismatch so destructure kore _id bad deya holo
      const joinedUserData = {
        ...eventData,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        joinedDate: new Date(),
      };

      const res = await fetch("http://localhost:7000/joined-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(joinedUserData),
      });

      const afterSubmitJoinedData = await res.json();

      if (!res.ok) {
        toast.error(afterSubmitJoinedData.message || "Failed to join event");
        return;
      }

      console.log(afterSubmitJoinedData);

      toast.success("Joined event successfully!");
      router.push("/joined-event");
    } catch (error) {
      console.error(error);
      toast.error(`Something went wrong!`);
    }
  };

  return (
    <Button
      onClick={handleJoinedEvent}
      className="
        group relative w-full overflow-hidden
        rounded-xl bg-emerald-600
        px-6 py-6 text-base font-semibold text-white
        shadow-lg shadow-emerald-600/20
        transition-all duration-300
        hover:-translate-y-0.5
        hover:bg-emerald-700
        hover:shadow-xl hover:shadow-emerald-600/30
        active:translate-y-0
      "
    >
      <span className="flex items-center justify-center gap-2">
        <HeartHandshake className="size-5 transition-transform duration-300 group-hover:scale-110" />
        Join This Event
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Button>
  );
};

export default JoinEventButton;
