"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";

// import "app/styles/paginate.css"
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
        `https://api.jikan.moe/v4/manga?genres=${genreId}?&limit=24&page=${page}`
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
        nextLabel="next >"
        onPageChange={(data) => {
          console.log(data.selected + 1, "data.selected");
          router.push(`/genre/${genre}/${data.selected +1}?genreId=${genreId}`);
        }} // Handle page change event
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default GenrePage;
