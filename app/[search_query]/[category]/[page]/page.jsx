"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import Paginate from "@/app/components/Paginate";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
// import styles from "app/styles/paginate.module.css";

// import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
const OrderBy = ({ params }) => {
  const category = params.category;
  const page = params.page;
  const searchQuery = params.search_query;
  const [orderedManga, setOrderedManga] = useState([]);
  const [pageCount,setPageCount]=useState(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("order by", page, category, searchQuery);

  useEffect(() => {
    async function fetchOrderedManga() {
      setLoading(true);
      const response = await fetch(
        // `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&min_score=1&limit=24&page=${page}`
        `https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24&page=${page}`
      );
      const data = await response.json();
      console.log("order", data);
      setOrderedManga(data.data);
      setPageCount(data.pagination.last_visible_page)
      setLoading(false);
    }
    fetchOrderedManga();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <MangaDetails mangas={orderedManga} setMangas={setOrderedManga} />

      {/* <ReactPaginate
        pageCount={20}
        pageRangeDisplayed={3}
        marginPagesDisplayed={10}
        // breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        onPageChange={(data) => {
          console.log(data.selected + 1, "data.selected");
          router.push(`/order_by/popularity/${data.selected + 1}`);
        }} // Handle page change event
        containerClassName={styles.pagination} // Set CSS class for container
        activeClassName={styles.active} // Set CSS class for active page
        // className={styles.paginate}
      /> */}

{/* <ReactPaginate
        nextLabel="next >"
        onPageChange={(data) => {
          console.log(data.selected + 1, "data.selected");
          router.push(`/order_by/popularity/${data.selected + 1}`);
        }} // Handle page change event
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={50}
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
      /> */}
<Paginate link={`/order_by/popularity`} pageCount={pageCount}/>

    </div>
  );
};

export default OrderBy;
