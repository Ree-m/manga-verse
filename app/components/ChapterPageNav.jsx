"use client";
import DropDown from "./DropDown";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "../styles/chapterPage.module.css";

// icons
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";
const ChapterPageNav = ({ manga, chapters, chapter, id, reverse }) => {
  const router = useRouter();
  const chapterNumber = parseFloat(chapter.split("-").pop());

  async function handlePreviousClick(e) {
    e.preventDefault();

    const chapterIndex = chapters.findIndex((chapter) => {
      const chapterNum = parseFloat(chapter.split("-").pop());
      return chapterNum === chapterNumber;
    });
  

    if (chapterIndex !== -1 && chapterIndex > 0) {
      const previousChapterNum = parseFloat(
        chapters[chapterIndex + 1].split("-").pop()
      );
      router.push(`/mangas/${id}/chapter-${previousChapterNum}`);
    } else {
      console.log("Previous chapter does not exist.");
    }
  }

  async function handleNextClick(e) {
    e.preventDefault();
    const chapterIndex = chapters.findIndex((chapter) => {
      const chapterNum = parseFloat(chapter.split("-").pop());
      return chapterNum === chapterNumber;
    });
  
    if (chapterIndex !== -1 && chapterIndex <= chapters.length - 1) {
      const nextChapterNum = parseFloat(
        chapters[+chapterIndex - 1].split("-").pop()
      );
      router.push(`/mangas/${id}/chapter-${nextChapterNum}`);
    } else {
      console.log("Next chapter does not exist.");
    }
  }

  const hasNextChapter =
    chapters.findIndex((chapter) => {
      const chapterNum = parseFloat(chapter.split("-").pop());
      return chapterNum > chapterNumber ;
    }) !== -1;

  const hasPreviousChapter =
    chapters.findIndex((chapter) => {
      const chapterNum = parseFloat(chapter.split("-").pop());
      return chapterNum < chapterNumber ;
    }) !== -1;


  return (
    <div className={reverse ? styles.flexReverse : styles.flex}>
      <div className={styles.chapterPageNav1}>
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

      <div className={styles.chapterPageNav2}>
        <DropDown id={id} chapters={chapters} chapter={chapter} />
        {hasPreviousChapter && (
          <div className={styles.buttonContainer}>
            <i>
              <BsArrowLeftCircle />
            </i>
            <button onClick={handlePreviousClick}>Prev Chapter</button>
          </div>
        )}

        {hasNextChapter && (
          <div className={styles.buttonContainer}>
            <>
              <button onClick={handleNextClick}>Next Chapter</button>
              <i>
                <BsArrowRightCircle />
              </i>
            </>
           
          </div>
        )}
      </div>

      <div
        className={reverse ? styles.noChapterNavText : styles.chapterNavText}
      >
        <h2>
          <span>{manga.title}</span>
          <span>{chapter}</span>
        </h2>
        <p>
          If this particular chapter has not been loaded before and cached, the
          images will take a while to load.
        </p>
        {/* <select>
          <option value="">Image Sizes:</option>
          <option value="">Full-screen Size</option>
          <option value="">Half-screen Size</option>
        </select> */}
      </div>
    </div>
  );
};

export default ChapterPageNav;
