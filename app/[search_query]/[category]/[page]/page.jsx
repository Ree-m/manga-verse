"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
const OrderBy = ({ params }) => {
  const category = params.category;
  const page = params.page;
  const searchQuery=params.search_query
  const [orderedManga, setOrderedManga] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("order", page, category,searchQuery);

  useEffect(() => {
    async function fetchOrderedManga() {
      setLoading(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?${searchQuery}=${category}?&page=${page}`
        
      );
      const data = await response.json();
      console.log("order", data);
      setOrderedManga(data.data);
      setLoading(false);
    }
    fetchOrderedManga();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {orderedManga &&
        orderedManga.map((manga) => (
          <div key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <h1>{manga.title}</h1>
            </Link>
            <p>{manga.synopsis}</p>
          </div>
        ))}{" "}
    </div>
  );
};

export default OrderBy;
