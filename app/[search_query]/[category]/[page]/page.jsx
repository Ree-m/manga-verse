"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import Paginate from "@/app/components/Paginate";
import { useRouter } from "next/navigation";
import { AiOutlineDoubleRight } from "react-icons/ai";
import TopHeading from "@/app/components/TopHeading";

import styles from "app/styles/mangaDetialsPages.module.css";
const OrderBy = ({ params }) => {
  const category = params.category;
  const page = params.page;
  const searchQuery = params.search_query;
  const [orderedManga, setOrderedManga] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  useEffect(() => {
    async function fetchOrderedManga() {
      if (searchQuery == "status") {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&limit=24&page=${page}`
        );
        const data = await response.json();
        setOrderedManga(data.data);
        setPageCount(data.pagination.last_visible_page);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await fetch(
          // `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&min_score=1&limit=24&page=${page}`
          `https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24&page=${page}`
        );
        const data = await response.json();
        setOrderedManga(data.data);
        setPageCount(data.pagination.last_visible_page);
        setLoading(false);
      }
    }
    fetchOrderedManga();
  }, []);
 
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.mangaDetailsPage}>
   <TopHeading category={category} page={page}/>
      <MangaDetails mangas={orderedManga}  />

      <Paginate link={`/order_by/popularity`} pageCount={pageCount} />
    </div>
  );
};

export default OrderBy;
