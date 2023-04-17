import connectMongo from "@/utils/connectMongo";
import Bookmark from "@/models/Bookmark";


async function fetchManga(id) {
  console.log("this is id", id);
  const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
  const manga = await response.json();
  return manga.data;
}
// add manga to bookmark
async function addToBookmark(){
 

}
const MangaPage = async ({ params: { id } }) => {
  const manga = await fetchManga(id);
  console.log("this is single manga", manga);

  return (
    <div>
      <h1>{manga.title}</h1>
      <p>{manga.synopsis}</p>
      <button onClick={addToBookmark}>Bookmark</button>
    </div>
  );
};

export default MangaPage;
