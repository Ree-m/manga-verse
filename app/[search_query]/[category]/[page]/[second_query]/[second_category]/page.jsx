"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import Paginate from "@/app/components/Paginate";
import styles from "app/styles/mangaDetialsPages.module.css";
import TopHeading from "@/app/components/TopHeading";

const SecondOrderBy = ({ params }) => {
  const searchQuery = params.search_query;
  const searchQuery2 = params.second_query;
  const category = params.category;
  const category2 = params.second_category;
  const page = params.page;
  const [orderedManga, setOrderedManga] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(null);

  console.log("order", page, category, searchQuery, category2, searchQuery2);

  useEffect(() => {
    async function fetchOrderedManga() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&page=${page}&${searchQuery2}=${category2}&min_score=1&sfw&limit=24`
        );
        const data = await response.json();
        console.log("order", data);
        setOrderedManga(data.data);
        setPageCount(data.pagination.last_visible_page);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
      <MangaDetails mangas={orderedManga} />

      <Paginate
        link={`/${searchQuery}/${category}`}
        linkSecondHalf={`${searchQuery2}/${category2}`}
        pageCount={pageCount}
      />
               

    </div>
  );
};

export default SecondOrderBy;
