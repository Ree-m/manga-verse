"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { usePathname, useSearchParams } from 'next/navigation';

const Genres = () => {
  const router = useRouter();
  const [genre, setGenre] = useState([]);
  
  return (
    <div>
      <h3>Genres</h3>
      <ul>
        <Link href={`/allManga/1`}>
          <li>All</li>
        </Link>
        <Link href={`/genre/Adventure`}>
          <li>Adventure</li>
        </Link>
        <Link href={`/genre/drama`}>
          <li>Drama</li>
        </Link>
        
      </ul>
    </div>
  );
};

export default Genres;
