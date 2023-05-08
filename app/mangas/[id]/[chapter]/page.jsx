"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Chapter = ({ params }) => {
  const [chapterImages, setChapterImages] = useState([]);
  console.log("new page", params.chapter);
  useEffect(() => {
    async function fetchChapterImages() {
      console.log("new page");
      const response = await fetch(`http://localhost:8000/chapterImages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterUrl:
            `https://ww5.manganelo.tv/chapter/manga-hu985203/${params.chapter}`,
        }),
      });
      console.log("new page", response);

      const data = await response.json();
      setChapterImages(data);
      console.log("new page", data);
    }
    fetchChapterImages();
  }, []);

  return (
    <div>
      {chapterImages &&
        chapterImages.map((chapterImage) => (
          <Image src={chapterImage?.img} alt={'Image of manga'}width={500} height={500} />
        ))}
    </div>
  );
};

export default Chapter;
