"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

const Chapter = ({ params }) => {
  const [manga, setManga] = useState([]);
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);

  const router = useRouter();
  const chapter = params.chapter;
  const id = params.id;

  useEffect(() => {
    async function fetchManga() {
      setLoading(true);
      console.log("this is id", id);

      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const manga = await response.json();
      setManga(manga.data);
      setLoading(false);
      console.log("finished fetching");
      console.log("manga", manga);
    }
    fetchManga();
  }, [id]);

  useEffect(() => {
    async function fetchChapters() {
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
    }
    fetchChapters();
  }, [manga.title]);

  console.log("new page", params.chapter);
  useEffect(() => {
    async function fetchChapterImages() {
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
    fetchChapterImages();
  }, [manga]);

  async function handlePreviousClick(e) {
    e.preventDefault();
    console.log("chapter previous", +chapter.split("-").pop() - +1);
    router.push(`/mangas/${id}/chapter-${+chapter.split("-").pop() - 1}`);
  }
  async function handleNextClick(e) {
    e.preventDefault();
    console.log("chapter next", +chapter.split("-").pop() + +1);
    router.push(`/mangas/${id}/chapter-${+chapter.split("-").pop() + 1}`);
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
