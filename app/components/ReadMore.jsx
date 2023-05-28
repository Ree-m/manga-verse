"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const ReadMore = ({manga}) => {
  const text = manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '')
  const router =useRouter()

  return (
    <div className="mangaDescription">
      <p>{ text?.substring(0, 400)+`...`}</p>
      <button onClick={()=>router.push(`/mangas/${manga.mal_id}`)}>
        Read more
      </button>
    </div>
  );
};
export default ReadMore
