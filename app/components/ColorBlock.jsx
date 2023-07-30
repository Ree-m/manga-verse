import Link from "next/link"
import styles from "../styles/colorBlock.module.css"
async function fetchManga(){
  const response = await fetch(`https://api.jikan.moe/v4/top/manga?type=manhwa&limit=10`);
  const manga = await response.json();
  return manga;

}
const ColorBlock = async () => {
  const data = await fetchManga()
  const manga=data.data

  return (
    <div className={styles.colorBlock}>
     <h2 className={styles.colorBlockTitle}>Most Popular Manhwa</h2>
     
              <div className={styles.colorBlockItems}>
                {manga && manga.map((manga,index)=>(
                  <Link href={`/manga/${manga.mal_id}`} key={manga.mal_id}>
                    <p>{index}</p>
                  </Link>
                ))}

              </div>
          
        
    </div>
  )
}

export default ColorBlock