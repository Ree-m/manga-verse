"use client";
import Link from "next/link";
import { useUserContext } from "../context/user";
// import { useSession, signOut } from "next-auth/react";

const Header = () => {
  // const { data } = useSession();
  // console.log("session",data)
  // console.log("user",data?.user)
  return (
    <nav>
      <div>
        <Link href="/">
          <h1>Mang App</h1>
        </Link>
      </div>
      {data?.user ? (
        <>
          <span>Hi,{data.user.name}</span>
          <span onClick={() => signOut()}>logout</span>
          <Link href="/bookmark/:userId">Bookmarks</Link>
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
