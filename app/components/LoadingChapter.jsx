import Link from "next/link";
import styles from "../styles/loadingChapter.module.css"
function LoadingChapter() {
  return (
    <div className={styles.loadingChapter}>
        <p>
        The bot is fetching your chapter ...<br/>
        In the mean time, read the latest chapter of One piece <Link target="_blank" href="https://manga-verse-beta.vercel.app/mangas/13/chapter-1084">here</Link>
        </p>

    </div>
  )
}

export default LoadingChapter