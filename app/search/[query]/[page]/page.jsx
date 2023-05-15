"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SearchResults = ({ params }) => {
  const query = params.query;
  const page = params.page;
  const [results, setResults] = useState([]);
  console.log("search params", page, query);

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?letter=${query}&page=${page}`
      );
      const data = await response.json();
      setResults(data.data);
      console.log("search results", data.data);
    }
    fetchSearchResults();
  }, [query]);
  return (
    <div>
      {results &&
        results.map((result) => (
          <div key={result.mal_id}>
            <Link href={`/mangas/${result.mal_id}`}>
              <h1>{result.title}</h1>
            </Link>
            <p>{result.synopsis}</p>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
