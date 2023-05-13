"use client";
import { useState, useEffect } from "react";

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
      console.log("search results",data.data)
    }
    fetchSearchResults();
  }, [query]);
  return <div>
    {results&&results.map((result)=>(
        <div>{result.title}</div>
    ))}
  </div>;
};

export default SearchResults;
