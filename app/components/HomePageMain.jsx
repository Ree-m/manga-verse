import Link from "next/link";
import MangaDetails from "./MangaDetails";
import ColorBlock from "./ColorBlock";
import Genres from "./Genres";
import { LongButton } from "./LongButton";
import styles from "../styles/homePageMain.module.css";
import { AiOutlineDoubleRight } from "react-icons/ai";

async function fetchTopManga() {
  const response = await fetch(
    `https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=24`
  );
  const data = await response.json();
  return data;
}

const HomePageMain = async () => {
  const data = await fetchTopManga();
  const topManga = data.data;
  return (

    <div className={styles.bgContainer}>

      <div className={styles.homePageMain}>
        <div>
          <div className={styles.top}>
            <Link href={`/`}>Read Manga Online</Link>
            <span>
              <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
            </span>
            <p>Most Popular</p>
          </div>
          <MangaDetails className={styles.mangaDetails} mangas={topManga} />
          <LongButton content={"<< More >>"} href={`/order_by/popularity/1`} />
        </div>

        <div className={styles.sideBar}>
          <ColorBlock />
          <Genres sideBar={true} />
        </div>
      </div>
    </div>
  );
};

export default HomePageMain;
