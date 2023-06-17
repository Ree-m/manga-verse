
import Link from "next/link";
import Genres from "./components/Genres";
import CarouselComponent from "./components/CarouselComponent";
import HomePageMain from "./components/HomePageMain";
import Random from "./components/Random";

export default function Home() {
  
  const API_URL = process.env.API_URL;
  return (
    <main className="main">

      <HomePageMain/>
      


    </main>
  );
}
