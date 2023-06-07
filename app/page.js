import { Inter, Noticia_Text } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Genres from "./components/Genres";
import CarouselComponent from "./components/Carousel";

export default function Home() {
  
  const API_URL = process.env.API_URL;
  return (
    <main>
      <CarouselComponent/>
      


    </main>
  );
}
