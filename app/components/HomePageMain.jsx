import Link from "next/link";
import MangaDetails from "./MangaDetails";
import ColorBlock from "./ColorBlock";
import Genres from "./Genres";
import { LongButton } from "./LongButton";
import styles from "../styles/homePageMain.module.css";
// import { API_URL } from "../GlobalVariables";
async function fetchTopManga() {
  console.log("start home page fetching");
  const response = await fetch(
    `https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24`
  );
  const data = await response.json();
  console.log("homepagemain data", data);
  return data;
}

const HomePageMain = async () => {
  const data = await fetchTopManga();
  const topManga = data.data;
  return (
    <div className={styles.bgContainer}>
       <div className={styles.homePageMain}>
      <div>
        <MangaDetails mangas={topManga} />
        <LongButton content={"<< More >>"} href={`/`} />
        <p>AAAAAAAAAAAaa</p>
      </div>

      <div className={styles.sideBar}>
        <ColorBlock/>
        <Genres sideBar={true} />
      </div>
    </div> 
    </div>
   
  );
}; 

export default HomePageMain;
