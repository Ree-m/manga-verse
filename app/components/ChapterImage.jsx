import { useRouter } from "next/navigation";
import { Suspense } from 'react'

import styles from "../styles/chapterImage.module.css";
const ChapterImage = ({ chapterImage, chapters }) => {
  const router = useRouter();

  return (
    <div>
     
      <div>
      <Suspense fallback={<p>Loading image</p>}>

        <img
          className={styles.chapterImage}
          src={chapterImage?.img}
          alt="Manga Image"
        />
              </Suspense>

      </div>
    </div>
  );
};

export default ChapterImage;
