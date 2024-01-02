import styles from "../styles/topHeading.module.css"
import { AiOutlineDoubleRight } from "react-icons/ai";
import Link from "next/link";
function TopHeading({category,page}) {
  return (
    <div className={styles.top}>
    <Link href={`/`}>Read Manga Online</Link>
    <span>
      <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
    </span>
    <p>{category}</p>
    <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
    <p>{`Page ${page}`}</p>
  </div>
  )
}

export default TopHeading;