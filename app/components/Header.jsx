"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useUserContext } from "../context/user";
// import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { user, setUser } = useUserContext();
  // const { data } = useSession();
  // console.log("session",data)
  // console.log("user",data?.user)

  useEffect(() => {

    fetch(`http://localhost:3000/api/auth/profile`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user profile.");
        }
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUser, user]);

  console.log("header", user);

  async function logout(){
    const repsonse =fetch(`http://localhost:3000/api/auth/logout`,{
      method:"POST",
      credentials:"include"
    })
    setUser(null)
  }
  return (
    <nav>
      <div>
        <Link href="/">
          <h1>Manga App</h1>
        </Link>
      </div>
      {user && user.username ? (
        <>
          <span>Hi,{user.username}</span>
          <span onClick={logout}>logout</span>
          <Link href={`/bookmark/${user.id}`}>Bookmarks</Link>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/">Bookmarks</Link>
        </>
      )}
    </nav>
  );
};

export default Header;
