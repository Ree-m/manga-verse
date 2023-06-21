"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import Paginate from "@/app/components/Paginate";
import { useRouter } from "next/navigation";

import styles from "app/styles/mangaDetialsPages.module.css"

const OrderBy = ({ params }) => {
  const category = params.category;
  const page = params.page;
  const searchQuery = params.search_query;
  const [orderedManga, setOrderedManga] = useState([]);
  const [pageCount,setPageCount]=useState(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("order by", page, category, searchQuery);

  useEffect(() => { 
    async function fetchOrderedManga() {
      setLoading(true);
      const response = await fetch(
        // `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&min_score=1&limit=24&page=${page}`
        `https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24&page=${page}`
      );
      const data = await response.json();
      console.log("order", data);
      setOrderedManga(data.data);
      setPageCount(data.pagination.last_visible_page)
      setLoading(false);
    }
    fetchOrderedManga();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.mangaDetailsPage}>
      <MangaDetails mangas={orderedManga} setMangas={setOrderedManga} />

   <Paginate link={`/order_by/popularity`} pageCount={pageCount}/>

    </div>
  );
};

export default OrderBy;
