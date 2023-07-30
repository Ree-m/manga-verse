// import Link from "next/link"
// import styles from "../styles/colorBlock.module.css"
// async function fetchManga(){
//   const response = await fetch(`https://api.jikan.moe/v4/top/manga?type=manhwa&limit=10`);
//   const manga = await response.json();
//   return manga;

// }
// const ColorBlock = async () => {
//   const data = await fetchManga()
//   const manga=data.data

//   return (
//     <div className={styles.colorBlock}>
//      <h2 className={styles.colorBlockTitle}>Top Manhwa</h2>

//               <div className={styles.colorBlockItems}>
//                 {manga && manga.map((manga,index)=>(
//                   <Link href={`/manga/${manga.mal_id}`} key={manga.mal_id} className={styles.colorBlockItem}>
//                     <p className={styles[`c${index}`]}>{manga.title}</p>
//                   </Link>
//                 ))}

//               </div>

//     </div>
//   )
// }

// export default ColorBlock

import Link from "next/link";
import styles from "../styles/colorBlock.module.css";

const ColorBlock = () => {
  

  return (
    <div className={styles.colorBlock}>
      <h2 className={styles.colorBlockTitle}>Top Manhwa</h2>

      <div className={styles.colorBlockItems}>
        <Link
          href={`/manga/121496`}
          key={121496}
          className={styles.colorBlockItem}
        >
          <p className={styles.c0}>Solo Leveling </p>
        </Link>
        <Link
          href={`/manga/125036`}
          key={125036}
          className={styles.colorBlockItem}
        >
          <p className={styles.c1}> The Horizon</p>
        </Link>

        <Link
          href={`/manga/103237`}
          key={103237}
          className={styles.colorBlockItem}
        >
          <p className={styles.c2}>Wind Breaker</p>
        </Link>

        <Link
          href={`/manga/111213`}
          key={111213}
          className={styles.colorBlockItem}
        >
          <p className={styles.c3}>Bastard</p>
        </Link>

        <Link
          href={`/manga/121269`}
          key={121269}
          className={styles.colorBlockItem}
        >
          <p className={styles.c4}>Who Made Me a Princess</p>
        </Link>

        <Link
          href={`/manga/141120`}
          key={141120}
          className={styles.colorBlockItem}
        >
          <p className={styles.c5}>The Boxer </p>
        </Link>

        <Link
          href={`/manga/132214`}
          key={132214}
          className={styles.colorBlockItem}
        >
          <p className={styles.c6}>Omniscient Reader</p>
        </Link>

        <Link
          href={`/manga/8586`}
          key={8586}
          className={styles.colorBlockItem}
        >
          <p className={styles.c7}>The Breaker</p>
        </Link>

        <Link
          href={`/manga/134744`}
          key={134744}
          className={styles.colorBlockItem}
        >
          <p className={styles.c8}>The Legend of the Northern Blade</p>
        </Link>

        <Link
          href={`/manga/122663`}
          key={122663}
          className={styles.colorBlockItem}
        >
          <p className={styles.c9}>Tower of God</p>
        </Link>

      </div>
    </div>
  );
};

export default ColorBlock;
