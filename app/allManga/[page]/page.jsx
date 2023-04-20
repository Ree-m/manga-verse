"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Mangas = () => {
  const router = useRouter();
  const [mangas, setMangas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMangas = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?page=${page}`
      );
      const data = await response.json();
      setMangas(data.data);
      setLoading(false);
    };
    fetchMangas();
  }, [page]);

  async function handleNextPage(e) {
    e.preventDefault();

    setPage(page + 1);
  }
  async function handleBackPage(e) {
    e.preventDefault();
    setPage(page - 1);
  }

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {mangas &&
        mangas.map((manga) => (
          <div key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <h1>{manga.title}</h1>
            </Link>
            <p>{manga.synopsis}</p>
          </div>
        ))}
      <button onClick={handleBackPage}>back page</button>

      <button onClick={handleNextPage}>next page</button>
    </>
  );
};

export default Mangas;
