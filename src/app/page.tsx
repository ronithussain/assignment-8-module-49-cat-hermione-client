import Banner from "@/components/home/Banner";
import Feature from "@/components/home/Feature";
import NewsLater from "@/components/home/NewsLater";
import Statistick from "@/components/home/Statistick";

import { IEvents } from "@/app/types/type";
import RecentUpcomingEvents from "@/components/home/RecentUpcomingEvents";
import PastEvents from "@/components/home/PastEvents";

const getPastEventsFetch = async (): Promise<IEvents[]> => {
  const res = await fetch("http://localhost:7000/past-events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
async function getRecentEvents(): Promise<IEvents[]> {
  const res = await fetch("http://localhost:7000/recent-events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  const data = await res.json();

  // console.log(data, "upcoming 6 data");
  return data;
}

export default async function Home() {
  const recentEvents = await getRecentEvents();
  const pastEvents = await getPastEventsFetch();

  return (
    <div>
      <Banner />
      <Statistick />

      <RecentUpcomingEvents recentEvents={recentEvents} />

      <Feature />
      <PastEvents pastEvents={pastEvents} />
      <NewsLater />
    </div>
  );
}
