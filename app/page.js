import { Inter, Noticia_Text } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Genres from "./components/Genres";

export default function Home() {
  const API_URL = process.env.API_URL;
  return (
    <main>
      


      <Genres />
    </main>
  );
}
