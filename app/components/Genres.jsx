"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Genres = () => {
  const router = useRouter();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch(`https://api.jikan.moe/v4/genres/manga`);
      const data = await response.json();
      console.log("genres", data);
      setGenres(data.data);
    }
    fetchGenres();
  }, []);

  return (
    <div>
      <h3>Genres</h3>
      {genres &&
        genres.map((genre) => (
          <div key={genre.mal_id}>
            <Link href={`/genre/${genre.name}/1?genreId=${genre.mal_id}`}> {genre.name} </Link>
          </div>
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
