import Link from "next/link";
import MangaCover from "./MangaCover";
import ReadMore from "./ReadMore";
import styles from "../styles/mangaDetails.module.css";
const MangaDetails = ({ mangas, setMangas }) => {
  return (
    <div>
      {mangas && 
        mangas.map((manga) => (
          <div className={styles.mangaDetails} key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              
              <MangaCover manga={manga} />
            </Link>
            <div>
              <Link href={`/mangas/${manga.mal_id}`}>
                <h1>{manga.title}</h1>
              </Link>

              {/* <p>{manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '')}</p> */}
              <ReadMore manga={manga} />
              <div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MangaDetails;
