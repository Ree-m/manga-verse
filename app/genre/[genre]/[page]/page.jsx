"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";

const GenrePage = ({ params }) => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const genre = params.genre;
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreId = searchParams.get("genreId");

  console.log("genre", genre, params.page);
  console.log("genreId", genreId);
  const page = params.page;
  useEffect(() => {
    async function filterByGenre() {
      setLoading(true);
      console.log("second genre", genre);

      const response = await fetch(
        `https://api.jikan.moe/v4/manga?genres=${genreId}?&page=${page}`
      );

      const filteredMangas = await response.json();
      console.log("filteredMangas", filteredMangas);

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
    <div>
      <MangaDetails mangas={mangas} setMangas={setMangas} />
     
      <ReactPaginate
        pageCount={pageCount && pageCount}
        pageRangeDisplayed={10} // Display a range of 5 pages
        marginPagesDisplayed={2} // Display 2 margin pages on each side
        onPageChange={(data) => {
          router.push(
            `/genre/${genre}/${data.selected + 1}?genreId=${genreId}`
          );
        }} // Handle page change event
        containerClassName={"pagination"} // Set CSS class for container
        activeClassName={"active"} // Set CSS class for active page
      />
    </div>
  );
};

export default GenrePage;
