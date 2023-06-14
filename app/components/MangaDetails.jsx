import Link from "next/link";
import MangaCover from "./MangaCover";
import ReadMore from "./ReadMore";
import {GiSandsOfTime} from "react-icons/gi"

import {BsFillPersonFill} from "react-icons/bs"
import styles from "../styles/mangaDetails.module.css";
const MangaDetails = ({ mangas }) => {
  return (
    <div className={styles.grid} >
      {mangas &&
        mangas.map((manga) => (
          <div className={styles.mangaDetails} key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <MangaCover manga={manga} height={176} width={116} border={true} />
            </Link>
            <div>
              <Link href={`/mangas/${manga.mal_id}`}>
                <h2>{manga.title}</h2>
              </Link>
              <div className={styles.subDetails}>
                <span>Chapter 33</span>
              <div className={styles.subDetails2}>
              <div >
                  <GiSandsOfTime/>
                 <p> {manga?.status === "Finished" ? "Completed" : "Ongoing"}</p>

                </div>

                <div>
                  <BsFillPersonFill/>
                  <p>{manga?.authors[0].name}</p>
                </div>
              </div>
              </div>
                
              <ReadMore manga={manga} />
              <div></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MangaDetails;
