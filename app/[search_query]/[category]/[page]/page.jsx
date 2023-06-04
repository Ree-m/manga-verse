"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
const OrderBy = ({ params }) => {
  const category = params.category;
  const page = params.page;
  const searchQuery=params.search_query
  const [orderedManga, setOrderedManga] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("order by", page, category,searchQuery);
 
  useEffect(() => {
    async function fetchOrderedManga() {
      setLoading(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&min_score=1&page=${page}`
        
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
     
        <MangaDetails mangas={orderedManga} setMangas={setOrderedManga} />
    </div>
  );
};

export default OrderBy;
