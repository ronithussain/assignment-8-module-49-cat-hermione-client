

import Banner from "@/components/home/Banner";
import Feature from "@/components/home/Feature";
import NewsLater from "@/components/home/NewsLater";
import Statistick from "@/components/home/Statistick";

export default function Home() {
  return (
    <div>
      <Banner />
      <Statistick />
      <Feature />
      <NewsLater />
    </div>
  );
}
