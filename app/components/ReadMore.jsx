"use client";
import { useRouter } from "next/navigation";
import styles from "../styles/readMore.module.css";
const ReadMore = ({ manga, synopsis, bookmark, mangaId }) => {
  const text =
    manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, "") || synopsis;
  const router = useRouter();

  return (
    <div className={styles.readMore}>
      <p>{text === "undefined" ? "" : text}</p>
      <div className={styles.readMoreButtonContainer}>
        {bookmark ? (
          <button
            className={styles.readMoreButton}
            onClick={() => router.push(`/mangas/${mangaId}`)}
          >
            Read more
          </button>
        ) : (
          <button
            className={styles.readMoreButton}
            onClick={() => router.push(`/mangas/${manga.mal_id}`)}
          >
            Read more
          </button>
        )}
      </div>
    </div>
  );
};
export default ReadMore;
