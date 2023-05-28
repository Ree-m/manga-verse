"use client";
import { useState } from "react";
const ShowLess = ({ manga }) => {
  const [showMore, setShowMore] = useState(false);
  const text = manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '')

  return (
    <div className="mangaDescription">
      <p>{showMore ? text : text?.substring(0, 400)+`...`}</p>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ShowLess;
