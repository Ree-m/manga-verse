import styles from "../styles/chapterImage.module.css";
const ChapterImage = ({ chapterImage }) => {
  // const containerStyle = {
  //     backgroundImage: `url(${chapterImage?.img})`,
  //   };
  return (
    <div className={styles.chapterImageContainer} >
      <img
        className={styles.chapterImage}
        src={chapterImage?.img}
        alt="Manga Image"
      />
    </div>
  );
};

export default ChapterImage;
