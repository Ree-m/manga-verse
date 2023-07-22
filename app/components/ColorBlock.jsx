import Link from "next/link"
import styles from "../styles/colorBlock.module.css"
const ColorBlock = () => {
  return (
    <div className={styles.colorBlock}>
     <h2 className={styles.colorBlockTitle}>Most Popular Manga</h2>
     
              <div className={styles.colorBlockItems}>
                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/2`}
                  key={2}>
                    <p className={styles.one}>Berserk</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/1706`}
                  key={1706}>
                    <p className={styles.two}>JoJo's Bizarre Adventure Part 7: Steel Ball Run</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/656`}
                  key={656}>
                    <p className={styles.three}>Vagabond</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/13`}
                  key={13}>
                    <p className={styles.four}>One Piece</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/1`}
                  key={1}>
                    <p className={styles.five}>Monster</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/51`}
                  key={51}>
                    <p className={styles.six}>Slam Dunk</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/25`}
                  key={25}>
                    <p className={styles.seven}>Fullmetal Alchemist</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/642`}
                  key={642}>
                    <p className={styles.eight}>Vinland Saga</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/70345`}
                  key={70345}>
                    <p className={styles.nine}>Grand Blue</p>
                </Link>

                <Link
                className={styles.colorBlockItem}
                  href={`/mangas/4632`}
                  key={4632}>
                    <p className={styles.ten}>Oyasumi Punpun</p>
                </Link>
              </div>
          
        
    </div>
  )
}

export default ColorBlock