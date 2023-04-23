"use client";

import Link from "next/link";
const Genres = () => {
  return (
    <div>
      <h3>Genres</h3>
      <ul> 
        <Link href={`/allManga`}><li>All</li></Link>
        <Link href="/genre/:genre"><li>Adventure</li></Link>
        <Link href="/genre/:genre"><li>Drama</li></Link>
      </ul>
    </div>
  );
};

export default Genres;
