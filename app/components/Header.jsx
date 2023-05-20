"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useUserContext } from "../context/user";
import { useBookmarkContext } from "../context/bookmark";
import SearchBar from "./SearchBar";
import { useSession,signOut} from "next-auth/react";


const Header = () => {
  const { user, setUser } = useUserContext();
  const { bookmarkItems, setBookmarkItems } = useBookmarkContext();
  const { data, status } = useSession();
console.log("data,status",data ,status)


  
  console.log("bookmark context header", bookmarkItems);

  // useEffect(() => {
  //   console.log("fetch profile start");
  //   fetch(`http://localhost:3000/api/auth/profile`, {
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("fetch profile ,resposne ok");

  //         return response.json();
  //       } else {
  //         throw new Error("Failed to fetch user profile.");
  //       }
  //     })
  //     .then((user) => {
  //       console.log("fetch profile ,setting user");

  //       setUser(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [setUser, user]);

  // console.log("header", user);

  // async function logout() {
  //   fetch(`http://localhost:3000/api/auth/logout`, {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   setUser(null);
  // }
  
  return (
    <nav>
      <div>
        <Link href="/">
          <h1>Manga App</h1>
        </Link>
      </div>
      {data?.user? (
        <>

          <span>Hi,{data.user.name}</span>
          <span>{data.user.email}</span>

          <span onClick={()=>signOut()}>logout</span>
          <Link href={`/bookmark/${user.id}`}>Bookmarks</Link>
          <SearchBar/>
        </>
      ) : (
        <>

          <Link href="/auth/login">Login</Link>
          <Link href="/">Bookmarks</Link>
          <SearchBar/>

        </>
      )}
    </nav>
  );
};

export default Header;
