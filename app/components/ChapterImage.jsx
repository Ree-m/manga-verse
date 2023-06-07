import { useRouter } from "next/navigation";
import styles from "../styles/chapterImage.module.css";
const ChapterImage = ({ chapterImage, chapters }) => {
  const router = useRouter();

  return (
    <div>
     
      <div className={styles.chapterImageContainerHalfSize}>
        <img
          className={styles.chapterImage}
          src={chapterImage?.img}
          alt="Manga Image"
        />
      </div>
    </div>
  );
};

export default ChapterImage;
