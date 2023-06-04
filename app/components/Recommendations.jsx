import Link from "next/link";
import styles from "../styles/recommendations.module.css";

import {BsArrowRightCircle} from "react-icons/bs"
async function fetchManga() {
  const response = await fetch(
    `https://api.jikan.moe/v4/manga?order_by=popularity&min_score=1`
  );
  const data = await response.json();
  console.log("this is reem manga block data", data);
  return data;
}
const Recommendations = async () => {
  let manga = await fetchManga();

  return (
    <div className={styles.colorBlock}>
      <h2 className={styles.colorBlockTitle}>Most Popular Manga</h2>
      {manga &&
        manga?.data?.map((manga, index) => {

          const className = `no${index}`; // Define class name for dynamic styling

          if (index <= 9) {
            return (
              <div className={styles.colorBlockItems}>
                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/${manga.mal_id}`}
                  key={manga.mal_id}
                >
                    <p className={`${styles[className]}`}>{manga.title}</p>
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
