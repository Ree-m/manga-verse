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
        `https://api.jikan.moe/v4/manga?limit=24&page=${page}`
      );
      const data = await response.json();

      setMangas(data.data);
      setLoading(false);
      return data;
    };

    fetchMangas();
  }, [page]);

  

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <MangaDetails mangas={mangas} setMangas={setMangas}/>
     

      <ReactPaginate
        pageCount={2545} // Replace 10 with the actual number of pages
        pageRangeDisplayed={3} // Display a range of 5 pages
        marginPagesDisplayed={0}
        // breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous "
        onPageChange={(data) => {
          router.push(`/allManga/${data.selected + 1}`);
        }} // Handle page change event
        containerClassName={"pagination"} // Set CSS class for container
        activeClassName={"active"} // Set CSS class for active page
      />
    </>
  );
};

export default Mangas;
