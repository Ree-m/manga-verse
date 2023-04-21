import { Inter, Noticia_Text } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

export default function Home() {
  const API_URL = process.env.API_URL;
  return (
    <main>
      <Link href="/mangas">Go to all mangas</Link>
      <Link href={`/allManga/:page`}>
        <h1>go to mangas</h1>
      </Link>
      <p>{API_URL}</p>
    </main>
  );
}
