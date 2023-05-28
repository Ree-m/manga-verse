"use client";
import { useState } from "react";
const ShowLess = ({ manga }) => {
  const [showMore, setShowMore] = useState(false);
  const text = manga?.synopsis;

  return (
    <div className="mangaDescription">
      {/* <p> {manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '')}</p> */}
      <p>{showMore ? text : text?.substring(0, 400)}</p>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ShowLess;
