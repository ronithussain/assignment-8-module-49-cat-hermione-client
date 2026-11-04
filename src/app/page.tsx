import Banner from "@/components/home/Banner";
import Feature from "@/components/home/Feature";
import NewsLater from "@/components/home/NewsLater";
import Statistick from "@/components/home/Statistick";

import { IEvents } from "@/app/types/type";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";

async function getRecentEvents(): Promise<IEvents[]> {
  try {
    const res = await fetch("http://localhost:7000/recent-events", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    const data = await res.json();

    console.log(data, "upcoming 6 data");

    // Backend যদি { success: true, events: [] } পাঠায়
    return Array.isArray(data) ? data : data.events ?? [];
  } catch (error) {
    console.error("Upcoming events fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const events = await getRecentEvents();

  return (
    <div>
      <Banner />
      <Statistick />

      <RecentUpcomingEvents events={events} />

      <Feature />
      <NewsLater />
    </div>
  );
}