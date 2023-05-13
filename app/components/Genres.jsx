"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Genres = () => {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/genres/manga`);
      const data = await response.json();
      console.log("genres", data);
      setLoading(false);
      setGenres(data.data);
    }
    fetchGenres();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <ul>
       
        <Link href={`/order_by/popularity/1`}>
          <li>Popular</li>
        </Link>
        <Link href={`/order_by/start_date/1/sort/desc`}> 
          <li>Newest</li>
        </Link>
      </ul> 
      <h3>Genres</h3>
      <Link href={`/allManga/1`}>
        <li>All</li>
      </Link>

      {genres &&
        genres.map((genre) => (
          <ul key={genre.mal_id}>
            <Link href={`/genre/${genre.name}/1?genreId=${genre.mal_id}`}>
              <li>{genre.name} </li>
            </Link>
          </ul>
        ))}

      {/* <ul>
        <Link href={`/allManga/1`}>
          <li>All</li>
        </Link>
        <Link href={`/genre/Action/1`}>
          <li>Action</li>
        </Link>
        <Link href={`/genre/Adaptation/1`}>
          <li>Adaptation</li>
        </Link>
        <Link href={`/genre/Adventure/1`}>
          <li>Adventure</li>
        </Link>
        <Link href={`/genre/Comedy/1`}>
          <li>Comedy</li>
        </Link>
        
        <Link href={`/genre/Crime/1`}>
          <li>Crime</li>
        </Link>
        
        <Link href={`/genre/Drama/1`}>
          <li>Drama</li>
        </Link>
        <Link href={`/genre/Fantasy/1`}>
          <li>Fantasy</li>
        </Link>
        <Link href={`/genre/Historical/1`}>
          <li>Historical</li>
        </Link>
        <Link href={`/genre/Sci-Fi/1`}>
          <li>Sci-Fi</li>
        </Link>
        
      </ul> */}
    </div>
  );
};

export default Genres;
