import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Mangas from "./components/Mangas";

export default function Home() {
  return (
    <main>
      <h1>HomePage</h1>
      <Mangas />
    </main>
  );
}
