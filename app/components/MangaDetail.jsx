
import Link from "next/link";
import MangaCover from "./MangaCover";
import ReadMore from "./ReadMore";
import {GiSandsOfTime} from "react-icons/gi"

import {BsFillPersonFill} from "react-icons/bs"
import styles from "../styles/mangaDetails.module.css";
import { fetchChapters } from "../functions/fetchChapters";
  
// async function fetchChaptersData(manga) {
    // try {
    //  console.log(`manga detail fetch chapters start`)
    //   const response = await fetchChapters(manga.title);
    //   const data =await response.json()
    //   console.log("manga detail fetchchapters resppnse", data);
    //   return data

  //   const response = await fetch(`${process.env.SCRAPER_API}/chapters`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: manga.title,
  //       }),
  //     });
    
  //     const chapters = await response.json();
  //     return chapters;

  //   } catch (error) {
  //     console.log(`Error fetching manga:`, error);
  //   }
  // }

const MangaDetail = async({manga}) => {
// const chapters=await fetchChaptersData(manga)
//     console.log("manga detail here",chapters)
// let last = chapters && chapters[0].split("chapter-").pop()
  
// console.log("last",last)
  return (
         <div className={styles.mangaDetails} key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <MangaCover manga={manga} height={176} width={116} border={true} />
            </Link>
            <div>
              <Link href={`/mangas/${manga.mal_id}`}>
                
                  <h2>{manga.title}</h2>
              </Link>
              <div className={styles.subDetails}>
                {/* <span>Chapter {last}</span> */}
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
  )
}

export default MangaDetail