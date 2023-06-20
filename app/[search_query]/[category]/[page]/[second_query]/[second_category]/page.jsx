"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import MangaDetails from "@/app/components/MangaDetails";
import ReactPaginate from "react-paginate";
// import Paginate from "../../../../../components/Paginate";
const SecondOrderBy = ({ params }) => {
  const searchQuery = params.search_query;
  const searchQuery2 = params.second_query;
  const category = params.category;
  const category2 = params.second_category;
  const page = params.page;
  const [orderedManga, setOrderedManga] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount,setPageCount]=useState(null)


  console.log("order", page, category, searchQuery, category2, searchQuery2);

  useEffect(() => {
    async function fetchOrderedManga() {
     try{
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/manga?${searchQuery}=${category}&page=${page}&${searchQuery2}=${category2}&min_score=1&sfw&limit=24`
        );
        const data = await response.json();
        console.log("order", data);
        setOrderedManga(data.data);
        setPageCount(data.pagination.last_visible_page)
        setLoading(false);
     }catch(error){
        console.log(error)
     }
    }
    fetchOrderedManga();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
             <MangaDetails mangas={orderedManga} setMangas={setOrderedManga} />

             <Paginate link={`/${searchQuery}/${category}`} linkSecondHalf={`${searchQuery2}/${category2}`} pageCount={pageCount}/>

               
<ReactPaginate
        nextLabel="next >"
        onPageChange={(data) => {
          console.log(data.selected + 1, "data.selected");
          router.push(`${searchQuery}/${category}/${data.selected + 1}/${searchQuery2}/${category2}`);
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

export default SecondOrderBy;
