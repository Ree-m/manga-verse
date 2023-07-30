// import Link from "next/link";
// import MangaDetails from "@/app/components/MangaDetails";
// import Paginate from "@/app/components/Paginate";
// import { AiOutlineDoubleRight } from "react-icons/ai";
// import styles from "app/styles/search.module.css"

// async function fetchSearchResults(query,page) {
//   console.log("start results fetch",query,page+1)
//   const response = await fetch(
//     `https://api.jikan.moe/v4/manga?q=${query}&limit=24&page=${page}`
//   );
//   const data = await response.json();
//   console.log("search results", data.data);
//   return data
// }

// const SearchResults = async ({ params }) => {
//   const query = params.query;
//   const page = + params.page;
//   console.log("search params", page + 1, query);
//   const data =await fetchSearchResults(query,page)
//   const results =data.data
//   console.log("results here",results,data)
//   const pageCount=data.pagination.last_visible_page

//   return (
//     <div>
{/* <div className={styles.top}>
  <Link href={`/`}>Read Manga Online</Link>
  <span>
    <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
  </span>
  <p>Search Results</p>
</div>; */}
//       <MangaDetails mangas={results}  />
//       <Paginate link={`/search/${query}`} pageCount={pageCount}/>

//     </div>
//   );
// };

// export default SearchResults;
