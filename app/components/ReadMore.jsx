"use client";
import { useRouter } from "next/navigation";
import styles from "../styles/readMore.module.css";
const ReadMore = ({ manga }) => {
  const text = manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, "");
  const router = useRouter();

  return (
    <div className={styles.readMore}>
      <p>{text === "undefined" ? "" : text}</p>
      <div className={styles.readMoreButtonContainer}>
        <button
          className={styles.readMoreButton}
          onClick={() => router.push(`/mangas/${manga.mal_id}`)}
        >
          Read more
        </button>
      </div>
    </div>
  );
};
export default ReadMore;
