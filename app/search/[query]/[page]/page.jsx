"use client" //react-paginate package doesnt work for server components

import Link from "next/link";
import MangaDetails from "@/app/components/MangaDetails";
import Paginate from "@/app/components/Paginate";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useState ,useEffect} from "react";
import Loading from "@/app/components/Loading";
import styles from "app/styles/mangaDetialsPages.module.css";
import styles2 from "app/styles/search.module.css";




const SearchResults = ({ params }) => {
  const query = params.query;
  const page = +params.page;

  const [results,setResults]=useState([])
  const [pageCount,setPageCount]=useState(null)
  const [loading,setLoading]=useState(true)

  async function fetchSearchResults(query, page) {
    console.log("start results fetch", query, page + 1);
    const response = await fetch(
      `https://api.jikan.moe/v4/manga?q=${query}&limit=24&page=${page}`
    );
    const data = await response.json();
    setResults(data.data)

    setPageCount( data.pagination.last_visible_page)
    setLoading(false)

    console.log("search results", data.data);
  }

  useEffect(()=>{
    fetchSearchResults(query,page)
  },[])

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.mangaDetailsPage}>
      <div className={styles2.top}>
        <Link href={`/`}>Read Manga Online</Link>
        <span>
          <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
        </span>
        <p>Search Results</p>
      </div>
      
      <MangaDetails mangas={results} />
      <Paginate link={`/search/${query}`} pageCount={pageCount} />
    </div>
  );
};

export default SearchResults;
