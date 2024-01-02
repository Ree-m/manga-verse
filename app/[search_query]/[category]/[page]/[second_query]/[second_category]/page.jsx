"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import ReactPaginate from "react-paginate";
// import styles from "/styles/mangaDetialsPages.module.css";
import styles from "../../../../../styles/mangaDetialsPages.module.css";

import "../../../../../styles/paginate.css";
import TopHeading from "@/app/components/TopHeading";
import { useRouter } from "next/navigation";

import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";


const SecondOrderBy = ({ params }) => {
  const searchQuery = params.search_query;
  const searchQuery2 = params.second_query;
  const category = params.category;
  const category2 = params.second_category;
  const page = params.page;
  const [orderedManga, setOrderedManga] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const router = useRouter();


  useEffect(() => {
    async function fetchOrderedManga() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&page=${page}&${searchQuery2}=${category2}&min_score=1&sfw&limit=24`
        );
        const data = await response.json();
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
      <div className="paginationContainer"> 

      <ReactPaginate
        activeClassName={"item active"}
        breakClassName={"item break-me"}
        breakLabel={"..."}

        onPageChange={(data)=>    router.push(`/${searchQuery}/${category}/${data.selected +1}/${searchQuery2}/${category2}`)}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextClassName={"item next"}
        pageCount={pageCount}
        pageClassName={"item pagination-page"}
        pageRangeDisplayed={5}
        previousClassName={"item previous"}
        previousLabel={
          <AiOutlineArrowLeft style={{ fontSize: 18, width: 150 }} />
        }
        nextLabel={<AiOutlineArrowRight style={{ fontSize: 18, width: 150 }} />}
      />
      </div>

{/* 
      <Paginate
        link={`/${searchQuery}/${category}`}
        linkSecondHalf={`${searchQuery2}/${category2}`}
        pageCount={pageCount}
      />
                */}

    </div>
  );
};

export default SecondOrderBy;
