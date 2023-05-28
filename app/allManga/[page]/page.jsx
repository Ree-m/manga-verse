"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import ReactPaginate from "react-paginate";
import MangaDetails from "@/app/components/MangaDetails";

const Mangas = ({ params }) => {
  const router = useRouter();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const page = params.page;

  useEffect(() => {
    const fetchMangas = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?page=${page}`
      );
      const data = await response.json();

      setMangas(data.data);
      setLoading(false);
      return data;
    };

    fetchMangas();
  }, [page]);
  // console.log("page count",pageCount)

  async function handleNextPage(e) {
    e.preventDefault();
    router.push(`/allManga/${+page + 1}`);
  }
  async function handleBackPage(e) {
    e.preventDefault();
    router.push(`/allManga/${+page - 1}`);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <MangaDetails mangas={mangas} setMangas={setMangas}/>
     

      <ReactPaginate
        pageCount={2545} // Replace 10 with the actual number of pages
        pageRangeDisplayed={10} // Display a range of 5 pages
        marginPagesDisplayed={0}
        breakLabel="..."
        nextLabel=">"
        previousLabel="< "
        onPageChange={(data) => {
          console.log(data.selected+1, "data.selected");
          router.push(`/allManga/${data.selected + 1}`);
        }} // Handle page change event
        containerClassName={"pagination"} // Set CSS class for container
        activeClassName={"active"} // Set CSS class for active page
      />
    </>
  );
};

export default Mangas;
