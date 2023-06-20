import Link from "next/link";
import MangaDetails from "@/app/components/MangaDetails";
import Paginate from "@/app/components/Paginate";



async function fetchSearchResults(query,page) {
  console.log("start results fetch",query,page+1)
  const response = await fetch(
    `https://api.jikan.moe/v4/manga?q=${query}&page=${page}&limit=24`
  );
  const data = await response.json();
  console.log("search results", data.data);
  return data
}

const SearchResults = async ({ params }) => {
  const query = params.query;
  const page = + params.page;
  console.log("search params", page + 1, query);
  const data =await fetchSearchResults(query,page)
  const results =data.data
  console.log("results here",results,data)
  const pageCount=data.pagination.last_visible_page

  return (
    <div>
      <MangaDetails mangas={results}  />
      <Paginate link={`/search/${query}`} pageCount={pageCount}/>

    </div>
  );
};

export default SearchResults;
