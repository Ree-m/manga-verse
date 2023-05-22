"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

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
    async function fetchChapters() {
      console.log("reem in chapter",manga,isMangaLoading)
      console.log("scrape started", manga.data?.title, manga.title, manga.data);
      const response = await fetch(`http://localhost:9000/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: manga.title,
        }),
      });
      console.log("scarpe", response);

      const data = await response.json();

      setChapters(data);

      console.log("mangaLink", response.data);
      console.log("chapters length", chapters.length);
    }
    if (!isMangaLoading) fetchChapters();
  }, [manga.title,isMangaLoading]);

  console.log("new page", params.chapter);
  useEffect(() => {
    async function fetchChapterImages() {
      console.log("reem in chapter images",manga,isMangaLoading)
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
    if(!isMangaLoading) fetchChapterImages();
  }, [manga,isMangaLoading]);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {chapterImages &&
        chapterImages.map((chapterImage) => (
          <Image
            src={chapterImage?.img}
            alt={"Image of manga"}
            width={500}
            height={500}
          />
        ))}

      <div>
        <button onClick={handlePreviousClick}>Previous chapter</button>
        <button onClick={handleNextClick}>Next chapter</button>
      </div>
    </div>
  );
};

export default Chapter;
