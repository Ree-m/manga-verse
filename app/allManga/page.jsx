import Link from "next/link";
import ReactPaginate from "react-paginate";

async function fetchMangasData(page) {
  const response = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`);
  const mangas = await response.json();
  return mangas.data;
}

async function fetchAll(){
  const response = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`);
  const allData = await response.json();
  console.log("pages", allData.pagination.last_visible_page);
  return allData
}

const Mangas = async ({page}) => {
  const mangas = await fetchMangasData(page);
  console.log("mangas length", mangas.length);

  const allData=await fetchAll()
  const pageCount=allData.pagination.last_visible_page
  
  async function handlePageClick(e) {
    e.preventDefault();
    console.log("page click")
    // here i want the page to increase or decrease one
  }

  return (
    <>
      {mangas &&
        mangas.map((manga) => (
          <div key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <h1>{manga.title}</h1>
            </Link>
            <p>{manga.synopsis}</p>
          </div>
        ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Mangas;
