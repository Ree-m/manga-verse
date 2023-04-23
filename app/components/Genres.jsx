"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

const Genres = () => {

const router = useRouter()
const pathname = usePathname();


useEffect(() => {
  const url = pathname
  console.log("url",url)

  // You can now use the current URL
}, [pathname]);

  return (
    <div>
      <h3>Genres</h3>
      <ul> 

        <Link href={`/allManga/1`}><li>All</li></Link>
        <Link href="/genre/:genre"><li>Adventure</li></Link>
        <Link href="/genre/:genre"><li>Drama</li></Link>
      </ul>
    </div>
  );
};

export default Genres;
