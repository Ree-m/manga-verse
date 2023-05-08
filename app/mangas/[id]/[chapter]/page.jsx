"use client";
import { useEffect, useState } from "react";

const Chapter = ({params}) => {
  const [chapterImages, setChapterImages] = useState([]);
console.log("new page",params.chapter)
  useEffect(() => {
    async function fetchChapterImages(chapterUrl) {
      console.log("new page");
      const response = await fetch(`http://localhost:8000/chapterImages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterUrl,
        }),
      });
      console.log("new page", response);

      const data = await response.json();
      setChapterImages(data);
      console.log("new page", data);
    }
    fetchChapterImages();
  }, []);

  return <div>hi</div>;
};

export default Chapter;
