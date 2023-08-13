"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import { AiOutlineDoubleRight } from "react-icons/ai";
import TopHeading from "@/app/components/TopHeading";
import Paginate from "@/app/components/Paginate";
import styles from "app/styles/mangaDetialsPages.module.css";

import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

const GenrePage = ({ params }) => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const genre = params.genre;
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreId = searchParams.get("genreId");

  const page = params.page;
  useEffect(() => {
    async function filterByGenre() {
      setLoading(true);

      const response = await fetch(
        `https://api.jikan.moe/v4/manga?genres=${genreId}?&limit=24&page=${page}`
      );

      const filteredMangas = await response.json();

      setMangas(filteredMangas.data);
      setPageCount(filteredMangas.pagination.last_visible_page);
      setLoading(false);
    }
    filterByGenre();
  }, [genre, page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.mangaDetailsPage}>

      <TopHeading category={genre} page={page} />
      <MangaDetails mangas={mangas} setMangas={setMangas} />

      <div className="paginationContainer"> 
      <ReactPaginate
        activeClassName={"item active"}
        breakClassName={"item break-me"}
        breakLabel={"..."}

        onPageChange={(data)=>   router.push(`/genre/${genre}/${data.selected + 1}?genreId=${genreId}`  )    }
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

    

    </div>
  );
};

export default GenrePage;
