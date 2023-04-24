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
        <Link href={`/genre/Action`}>
          <li>Action</li>
        </Link>
        <Link href={`/genre/Adaptation`}>
          <li>Adaptation</li>
        </Link>
        <Link href={`/genre/Adventure`}>
          <li>Adventure</li>
        </Link>
        <Link href={`/genre/Comedy`}>
          <li>Comedy</li>
        </Link>
        <Link href={`/genre/Cooking`}>
          <li>Cooking</li>
        </Link>
        <Link href={`/genre/Crime`}>
          <li>Crime</li>
        </Link>
        <Link href={`/genre/Crossdressing`}>
          <li>Crossdressing</li>
        </Link>
        <Link href={`/genre/Drama`}>
          <li>Drama</li>
        </Link>
        <Link href={`/genre/Fantasy`}>
          <li>Fantasy</li>
        </Link>
        <Link href={`/genre/Historical`}>
          <li>Historical</li>
        </Link>
        <Link href={`/genre/Sci-Fi`}>
          <li>Sci-Fi</li>
        </Link>
        
      </ul>
    </div>
  );
};

export default Genres;
