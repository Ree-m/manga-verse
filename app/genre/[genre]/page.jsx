"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
const Genre = ({ params }) => {
  const [mangas, setMangas] = useState([]);
  const genre = params.genre;
  console.log("genre", genre);
  const page = 1;
  useEffect(() => {
    async function filterByGenre() {
      console.log("second genre", genre);

      const response = await fetch(
        `https://api.jikan.moe/v4/manga?page=${page}`
      );

      const data = await response.json();
      console.log(
        "data",
        data.data.filter((manga) =>
          manga.genres
            .map((selectedGenre) => selectedGenre.name)
            .includes(genre)
        )
      );
      const filteredMangas = data.data.filter((manga) => {
        return manga.genres
          .map((selectedGenre) => selectedGenre.name)
          .includes(genre);
      });
      console.log(filteredMangas);
      setMangas(filteredMangas);
    }
    filterByGenre();
  }, [genre, page]);

  return (
    <div>
      {mangas &&
        mangas.map((manga) => (
          <div key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <h1>{manga.title}</h1>
            </Link>
            <p>{manga.synopsis}</p>
          </div>
        ))}
    </div>
  );
};

export default Genre;
