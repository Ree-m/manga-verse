"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/user";
const Header = () => {
  const { user, setUser } = useUserContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    console.log("starting to fetch profile");
    fetch(`http://localhost:3001/auth/login`, {
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
        setIsUserLoggedIn(true);
        setUser(user);
        console.log("Fetching profile worked");
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }, []);

  async function logout() {
    const response = await fetch(`http://localhost:3001/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setIsUserLoggedIn(false);
  }
  const username = user?.username; //if user is there,give me username

  if (!isUserLoggedIn) {
    return (
      <div>
        <Link href="/">
          <h1>Manga App</h1>
        </Link>
        <a onClick={logout}>Logout ({username})</a>
      </div>
    );
  }

  return (
    <div>
      <Link href="/">
        <h1>Manga App</h1>
      </Link>
      <Link href="/auth/login">Login</Link>
    </div>
  );
};

export default Header;
