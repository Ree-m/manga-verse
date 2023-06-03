import Link from "next/link";
import styles from "../styles/recommendations.module.css";
async function fetchRecommendations(mangaId) {
  console.log("this is recomm mamngaId reem", mangaId);
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
    <div className={styles.colorBlock}>
      <h4 className={styles.colorBlockTitle}>Recommendations</h4>
      {recommendedMangas &&
        recommendedMangas?.data?.map((manga, index) => {

          const className = `no${index}`; // Define class name for dynamic styling

          if (index <= 9) {
            return (
              <div className={styles.colorBlockItems}>
                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/${manga.entry.mal_id}`}
                  key={manga.entry.mal_id}
                >
                    <p className={`${styles[className]}`}>{manga.entry.title}</p>
                </Link>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Recommendations;
