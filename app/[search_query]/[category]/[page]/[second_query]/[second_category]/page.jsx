"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
const SecondOrderBy = ({ params }) => {
  const searchQuery = params.search_query;
  const searchQuery2 = params.second_query;
  const category = params.category;
  const category2 = params.second_category;
  const page = params.page;
  const [orderedManga, setOrderedManga] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("order", page, category, searchQuery, category2, searchQuery2);

  useEffect(() => {
    async function fetchOrderedManga() {
     try{
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&page=${page}&${searchQuery2}=${category2}`
        );
        const data = await response.json();
        console.log("order", data);
        setOrderedManga(data.data);
        setLoading(false);
     }catch(error){
        console.log(error)
     }
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

export default SecondOrderBy;
