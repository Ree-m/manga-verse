"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import ReactPaginate from "react-paginate";
import MangaDetails from "@/app/components/MangaDetails";
import TopHeading from "@/app/components/TopHeading";
import Paginate from "@/app/components/Paginate";
import styles from "../../styles/mangaDetialsPages.module.css";

const Mangas = ({ params }) => {
  const router = useRouter();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const page = params.page;

  useEffect(() => {
    const fetchMangas = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?limit=24&page=${page}`
      );
      const data = await response.json();

      setMangas(data.data);
      setPageCount( data.pagination.last_visible_page)
      setLoading(false);
      return data;
    };

    fetchMangas();
  }, [page]);

  

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.mangaDetailsPage}>

          <TopHeading category={"All"} page={page} />

    <MangaDetails mangas={mangas} setMangas={setMangas}/>
     


      <Paginate link={`/allManga`} pageCount={pageCount} />

    </div>
  );
};

export default Mangas;
