"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/user";
import { useBookmarkContext } from "../context/bookmark";
import SearchBar from "./SearchBar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LongButton } from "./LongButton";
import styles from "../styles/header.module.css";

import { BsBell } from "react-icons/bs";

const Header = () => {
  const { user, setUser } = useUserContext();
  const [bookmark, setBookmark] = useBookmarkContext();
  const { data, status } = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);
  const userId = data?.user?.id;
  const username = data?.user?.name;
  const router = useRouter();

  console.log("data,status", data, status);

  console.log("header bookmark reem", bookmark);
  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <h1>Manga App</h1>
        </Link>
      </div>
      <div>
        {data?.user ? (
          <div className={styles.headerText}>
            {/* <span>Hi,{username}</span>

            <span onClick={() => signOut()}>logout</span>
            <Link href={`/bookmark/${userId}`}>Bookmarks</Link>
            <SearchBar /> */}
            <div className={styles.nav1}>
              <SearchBar />
              <div>
                <i onClick={() => router.push(`/bookmark/${userId}`)}>
                  <BsBell className={styles.icon} />
                  {bookmark.length == 0 ? null : <span>{bookmark.length}</span>}
                </i>
                <button onClick={() => signOut()} className={styles.btn}>
                  Logout ({username})
                </button>
              </div>
            </div>

            <div className={styles.nav2}>
              <Link href={`/`}>Manga Online</Link>
              <Link href={`/order_by/popularity/1`}>Hot Manga</Link>
              <Link href={`/order_by/start_date/1/sort/desc`}>
                Newest Manga
              </Link>
            </div>

            <div className={styles.nav3}>
              <div className={styles.menuButtonContainer}>
                <button
                  onClick={() => setToggleMenu(!toggleMenu)}
                  className={styles.menuButton}
                >
                  Menu
                </button>
              </div>
              {toggleMenu ? (
                <div className={styles.menuItems}>
                  <Link href={`/`}>Manga Online</Link>
                  <Link href={`/order_by/popularity/1`}>Hot Manga</Link>
                  <Link href={`/order_by/start_date/1/sort/desc`}>
                    Newest Manga
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className={styles.headerText}>
            <div className={styles.nav1}>
              <SearchBar />
              <div>
                <button
                  onClick={() => router.push(`/auth/login`)}
                  className={styles.btn}
                >
                  Login
                </button>
                <button
                  onClick={() => router.push(`/auth/register`)}
                  className={styles.btn}
                >
                  Register
                </button>
              </div>
            </div>

            <div className={styles.nav2}>
              <Link href={`/`}>Manga Online</Link>
              <Link href={`/order_by/popularity/1`}>Hot Manga</Link>
              <Link href={`/order_by/start_date/1/sort/desc`}>
                Newest Manga
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
