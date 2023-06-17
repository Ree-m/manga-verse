"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import styles from "../styles/genres.module.css";

const Genres = ({ sideBar }) => {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchGenres() {
  //     setLoading(true);
  //     const response = await fetch(`https://api.jikan.moe/v4/genres/manga`);
  //     const data = await response.json();
  //     console.log("genres", data);
  //     setLoading(false);
  //     setGenres(data.data);
  //   }
  //   fetchGenres();
  // }, []);

  if (loading) {
    return <Loading />;
  }
  return ( 
    <div className={sideBar ? styles.sideBar : styles.genreBig}>
      <h2>Manga by Genres</h2>
      <div className={`${styles.grid} ${styles.gridBig}`}>
        
      <Link href={``}>
            <li>All</li>
          </Link>
          <Link href={`/order_by/start_date/1/sort/desc`}>
            <li>Newest</li>
          </Link>
          <Link href={`/order_by/popularity/1`}>
            <li>Popular</li>
          </Link> 
        
      </div>

      <div className={`${styles.grid} ${styles.gridBig}`}>
        
          <Link href={`/order_by/popularity/1`}>
            <li>All</li>
          </Link>
          <Link href={`/order_by/start_date/1/sort/desc`}>
            <li>Ongoing</li>
          </Link>

          <Link href={`/order_by/start_date/1/sort/desc`}>
            <li>Completed</li>
          </Link>
        
      </div>

      <div className={`${styles.grid} ${styles.gridBig}`}>
        <Link href={`/allManga/1`}>
          <li>All</li>
        </Link>
        <Link href={`/genre/Action/1?genreId=1`}>
          <li>Action</li>
        </Link>
        <Link href={`/genre/Adventure/1?genreId=2`}>
          <li>Adventure</li>
        </Link>
        <Link href={`/genre/Comedy/1?genreId=4`}>
          <li>Comedy</li>
        </Link>
        <Link href={`/genre//1?genreId=8`}>
          <li>Drama</li>
        </Link>
        <Link href={`/genre/Fantasy/1?genreId=10`}>
          <li>Fantasy</li>
        </Link>
        <Link href={`/genre/Horror/1?genreId=14`}>
          <li>Horror</li>
        </Link>
        <Link href={`/genre/Mystery/1?genreId=7`}>
          <li>Mystery</li>
        </Link>
        <Link href={`/genre/Romance/1?genreId=22`}>
          <li>Romance</li>
        </Link>

        <Link href={`/genre/Detective/1?genreId=39`}>
          <li>Detective</li>
        </Link>
        <Link href={`/genre/Gore/1?genreId=58`}>
          <li>Gore</li>
        </Link>
        <Link href={`/genre/Historical/1?genreId=13`}>
          <li>Historical</li>
        </Link>
        <Link href={`/genre/Isekai/1?genreId=62`}>
          <li>Isekai</li>
        </Link>
        <Link href={`/genre/Josei/1?genreId=42`}>
          <li>Josei</li>
        </Link>
        <Link href={`/genre/Martial Arts/1?genreId=17`}>
          <li>Martial Arts</li>
        </Link>
        {/* <Link href={`/`}>
          <li>Manhwa</li>
        </Link>
        <Link href={`/`}>
          <li>Manhua</li>
        </Link> */}
        <Link href={`/genre/Mecha/1?genreId=18`}>
          <li>Mecha</li>
        </Link>
        <Link href={`/genre/Medical/1?genreId=67`}>
          <li>Medical</li>
        </Link>
        <Link href={`/genre/Military/1?genreId=38`}>
          <li>Military</li>
        </Link>
        <Link href={`/genre/Music/1?genreId=19`}>
          <li>Music</li>
        </Link>
        <Link href={`/genre/Mythology/1?genreId=6`}>
          <li>Mythology</li>
        </Link>
        <Link href={`/genre/Psychological/1?genreId=40`}>
          <li>Psychology</li>
        </Link>
        <Link href={`/genre/Reincarnation/1?genreId=73`}>
          <li>Reincarnat...</li>
        </Link>
        <Link href={`/genre/School/1?genreId=23`}>
          <li>School life</li>
        </Link>
        <Link href={`/genre/Sci-Fi/1?genreId=24`}>
          <li>Sci-Fi</li>
        </Link>
        <Link href={`/genre/Seinen/1?genreId=41`}>
          <li>Seinen</li>
        </Link>
        <Link href={`/genre/Shoujo/1?genreId=25`}>
          <li>Shoujo</li>
        </Link>
        <Link href={`/genre/Shounen/1?genreId=27`}>
          <li>Shounen</li>
        </Link>
        <Link href={`/genre/Showbiz/1?genreId=76`}>
          <li>Showbiz</li>
        </Link>
        <Link href={`/genre/Slice of Life/1?genreId=36`}>
          <li>Slice of Life</li>
        </Link>
        <Link href={`/genre/Sports/1?genreId=30`}>
          <li>Sports</li>
        </Link>
        <Link href={`/genre/Supernatural/1?genreId=37`}>
          <li>Supernatural</li>
        </Link>
        <Link href={`/genre/Suspense/1?genreId=45`}>
          <li>Suspense</li>
        </Link>
        <Link href={`/genre/Villainess/1?genreId=81`}>
          <li>Villainess</li>
        </Link>
        


      </div>
    </div>
  );
};

export default Genres;
