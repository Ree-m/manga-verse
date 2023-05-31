import Link from "next/link";
async function fetchRecommendations(mangaId) {
  console.log("this is recomm mamngaId reem",mangaId)
  const response = await fetch(
    `https://api.jikan.moe/v4/manga/${mangaId}/recommendations`
  );
  const data = await response.json();
  console.log("this is reem  recomm data", data);
  return data;
} 
const Recommendations = async ({ manga }) => {
  
  let recommendedMangas = await fetchRecommendations(manga?.mal_id);

  return (

    <div>
<h4>Recommendations</h4>
       {recommendedMangas &&
        recommendedMangas?.data?.map((manga, index) => {
          if (index <= 9) {
            return (
              <Link href={`/mangas/${manga.entry.mal_id}`} key={manga.entry.mal_id}>
                <p>{manga.entry.title}</p>
              </Link>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Recommendations;
