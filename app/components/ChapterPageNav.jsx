"use client";
import DropDown from "./DropDown";
import Link from "next/link";
import styles from "../styles/chapterPage.module.css";

// icons
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";

const ChapterPageNav = ({ manga, chapters, chapter, id, reverse }) => {
  async function handlePreviousClick(e) {
    e.preventDefault();

    const chapterIndex = chapters.findIndex((chapter) => {
      const chapterNum = parseFloat(chapter.split("-").pop());
      return chapterNum === chapterNumber;
    });
    console.log(
      "chapterIndex",
      chapterIndex,
      "chapterNumber",
      chapterNumber,
      "chapters[chapterIndex]",
      chapters[chapterIndex],
      chapters[+chapterIndex + 1],
      "chapters.length",
      chapters.length,
      "chapters",
      chapters
    );

    if (chapterIndex !== -1 && chapterIndex > 0) {
      const previousChapterNum = parseFloat(
        chapters[chapterIndex + 1].split("-").pop()
      );
      router.push(`/mangas/${id}/chapter-${previousChapterNum}`);
    } else {
      console.log("Previous chapter does not exist.");
      // Handle the case when there is no next chapter
    }
  }

  async function handleNextClick(e) {
    e.preventDefault();
    const chapterIndex = chapters.findIndex((chapter) => {
      const chapterNum = parseFloat(chapter.split("-").pop());
      return chapterNum === chapterNumber;
    });
    console.log(
      "chapterIndex",
      chapterIndex,
      "chapterNumber",
      chapterNumber,
      "chapters[chapterIndex]",
      chapters[chapterIndex],
      chapters[+chapterIndex + 1],
      "chapters.length",
      chapters.length,
      "chapters",
      chapters
    );
    if (chapterIndex !== -1 && chapterIndex > 0) {
      const nextChapterNum = parseFloat(
        chapters[+chapterIndex - 1].split("-").pop()
      );
      router.push(`/mangas/${id}/chapter-${nextChapterNum}`);
    } else {
      console.log("Next chapter does not exist.");
      // Handle the case when there is no next chapter
    }
  }

  return (
    <div className={reverse ? styles.flexReverse : styles.flex}>
      <div className={styles.ChapterPageNav1}>
        <Link href={`/`}>Read Manga Online</Link>
        <i>
          <AiOutlineDoubleRight />
        </i>
        <Link href={`/mangas/${id}`}>{manga.title}</Link>
        <i>
          <AiOutlineDoubleRight />
        </i>
        <Link href={`/mangas/${id}/${chapter}`}>{chapter}</Link>
      </div>

      <div className={styles.ChapterPageNav2}>
        <DropDown id={id} chapters={chapters} chapter={chapter}/>
        <div className={styles.buttonContainer}>
          <i><BsArrowLeftCircle/></i>
          <button onClick={handlePreviousClick}>Prev Chapter</button>
        </div>

        <div className={styles.buttonContainer}>
        <button onClick={handlePreviousClick}>Next Chapter</button>
          <i><BsArrowRightCircle/></i>
        </div>

      </div>

      <div className={reverse ? styles.noChapterNavText: styles.chapterNavText}>
        <h2>
          <span>{manga.title}</span>
          <span>{chapter}</span>
        </h2>
        <p>If this particular chapter has not been loaded before and cached, the images will take a while to load.</p>

        <select>
          <option value="">Image Sizes:</option>
          <option value="">Full-screen Size</option>
          <option value="">Half-screen Size</option>
        </select>
      </div>
    </div>
  );
};

export default ChapterPageNav;
