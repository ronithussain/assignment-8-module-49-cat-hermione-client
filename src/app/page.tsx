import Banner from "@/components/home/Banner";
import Statistick from "@/components/home/Statistick";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";
import Feature from "@/components/home/Feature";
import PastEvents from "@/components/home/PastEvents";
import NewsLater from "@/components/home/NewsLater";


import { IEvents } from "@/app/types/type";

const getPastEventsFetch = async (): Promise<IEvents[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/past-events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
async function getRecentEvents(): Promise<IEvents[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export default async function Home() {
  const recentEvents = await getRecentEvents();
  const pastEvents = await getPastEventsFetch();

  return (
    <div className="relative overflow-hidden">

      <Banner />
      <Statistick />

      <RecentUpcomingEvents recentEvents={recentEvents} />

      <Feature />
      <PastEvents pastEvents={pastEvents} />
      <NewsLater />
    </div>
  );
}
