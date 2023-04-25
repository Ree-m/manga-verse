"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";

const MangaPage = ({ params: { id } }) => {
  // const manga = await fetchManga(id);
  const [bookmark, setBookmark] = useState("");
  const [manga, setManga] = useState([]);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    async function fetchManga() {
      console.log("this is id", id);

      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const manga = await response.json();
      setManga(manga.data);
      console.log("finished fetching");
      console.log("manga", manga);
    }
    fetchManga();
  }, [id]);

  // add manga to bookmark
  async function addToBookmark(nameOfBookmark) {
    console.log("start bookmark");
    const response = await fetch(`http://localhost:3000/api/bookmark`, {
      method: "POST",

      body: JSON.stringify({ nameOfBookmark }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const bookmark = await response.json();
    if (bookmark === "Bookmark already exists") {
      alert("Bookmark already exists");
    } else {
      setBookmark(bookmark);
      console.log("finish bookmark", bookmark);
      alert("bookmark added");
    }
  }

  return (
    <div>
      <h1>{manga.title}</h1>
      <p>{manga.synopsis}</p>

      {manga &&
        manga.genres &&
        manga.genres.map((genre) => (
          <div key={genre.mal_id}>
            <span>{genre.name}</span>
          </div>
        ))}

      <button onClick={() => addToBookmark(manga.title)}>Bookmark</button>
    </div>
  );
};

export default MangaPage;
