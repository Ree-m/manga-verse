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
        <Link href={`/genre/Action/1`}>
          <li>Action</li>
        </Link>
        <Link href={`/genre/Adaptation/1`}>
          <li>Adaptation</li>
        </Link>
        <Link href={`/genre/Adventure/1`}>
          <li>Adventure</li>
        </Link>
        <Link href={`/genre/Comedy/1`}>
          <li>Comedy</li>
        </Link>
        
        <Link href={`/genre/Crime/1`}>
          <li>Crime</li>
        </Link>
        
        <Link href={`/genre/Drama/1`}>
          <li>Drama</li>
        </Link>
        <Link href={`/genre/Fantasy/1`}>
          <li>Fantasy</li>
        </Link>
        <Link href={`/genre/Historical/1`}>
          <li>Historical</li>
        </Link>
        <Link href={`/genre/Sci-Fi/1`}>
          <li>Sci-Fi</li>
        </Link>
        
      </ul>
    </div>
  );
};

export default Genres;
