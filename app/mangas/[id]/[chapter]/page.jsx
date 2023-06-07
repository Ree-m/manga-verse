"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import ChapterImage from "@/app/components/ChapterImage";
import ChapterPageNav from "@/app/components/ChapterPageNav";
import styles from "app/styles/chapterPage.module.css";

// fucntions
import { fetchChapters } from "@/app/functions/fetchChapters";

const Chapter = ({ params }) => {
  const [manga, setManga] = useState([]);
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMangaLoading, setIsMangaLoading] = useState(true);

  const [chapters, setChapters] = useState([]);

  const router = useRouter();
  const chapter = params.chapter;
  const id = params.id;
  const chapterNumber = parseFloat(chapter.split("-").pop());

  useEffect(() => {
    async function fetchManga() {
      setLoading(true);
      console.log("this is id", id);

      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const manga = await response.json();
      setManga(manga.data);
      setIsMangaLoading(false);

      setLoading(false);

      console.log("finished fetching");
      console.log("manga", manga);
    }
    fetchManga();
  }, [id]);

  useEffect(() => {
    async function fetchChaptersData() {
      try{
        const response =await fetchChapters(manga?.title)
        setChapters(response)
      }catch(error){
        console.log("Error fetching chapters",error)
      }
    }
    if (!isMangaLoading) fetchChaptersData();
  }, [manga.title, isMangaLoading]);

  console.log("new page", params.chapter);
  useEffect(() => {
    async function fetchChapterImages() {
      console.log("reem in chapter images", manga, isMangaLoading);
      setLoading(true);
      console.log("new page");
      console.log(
        "scrape started chapter page",
        manga.data?.title,
        manga.title,
        manga.data
      );

      const response = await fetch(`http://localhost:9000/chapterImages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapter,
          title: manga.title,
        }),
      });
      console.log("new page", response);

      const data = await response.json();
      setChapterImages(data);
      setLoading(false);
      console.log("new page", data);
    }
    if (!isMangaLoading) fetchChapterImages();
  }, [manga, isMangaLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.chpaterPage}>
      <div className={styles.chapterPageContainer}>
        <ChapterPageNav
          manga={manga}
          chapter={chapter}
          chapters={chapters}
          id={id}
          reverse={false}
        />
        {chapterImages &&
          chapterImages.map((chapterImage) => (
            <ChapterImage chapterImage={chapterImage} chapters={chapters} />
          ))}

        <ChapterPageNav
          manga={manga}
          chapter={chapter}
          chapters={chapters}
          id={id}
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Chapter;
