"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import mapping from "mapping.json"

const Chapter = ({ params }) => {
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const chapter = params.chapter;
  const id = params.id;

  console.log("new page", params.chapter);
  useEffect(() => {
    async function fetchChapterImages() {
      setLoading(true);
      console.log("new page");
      const response = await fetch(`http://localhost:9000/chapterImages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterUrl: `https://ww5.manganelo.tv/chapter/manga-${mapping[id]}/${chapter}`,
        }),
      });
      console.log("new page", response);

      const data = await response.json();
      setChapterImages(data);
      setLoading(false);
      console.log("new page", data);
    }
    fetchChapterImages();
  }, []);
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
