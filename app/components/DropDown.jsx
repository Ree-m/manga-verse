"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
const DropDown = ({ id, chapters, chapter }) => {
  const [selectedChapter, setSelectedChapter] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSelectedChapter(chapter);
  }, [chapter]);


  const handleChapterChange = (e) => {
    const selectedChapter = e.target.value;
    console.log("selected reem chap", selectedChapter);
    setSelectedChapter(selectedChapter);
    router.push(`/mangas/${id}/chapter-${selectedChapter.split("-").pop()}`);
  };

  return (
    <div>
      <select onChange={handleChapterChange} value={selectedChapter}>
        {chapters &&
          chapters.map((chapter) => (
            <option key={chapter}>
              {`chapter-${chapter.split("-").pop()}`}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropDown;
