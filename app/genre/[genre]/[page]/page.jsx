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
    <div>
      <TopHeading category={genre} page={page} />
      <MangaDetails mangas={mangas} setMangas={setMangas} />

      <ReactPaginate
        nextLabel="next >"
        onPageChange={(data) => {
          router.push(
            `/genre/${genre}/${data.selected + 1}?genreId=${genreId}`
          );
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
