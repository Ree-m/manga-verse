"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/user";

const BookmarkPage = () => {
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const { user, setUser } = useUserContext();
  console.log("bookmark page", user);
  useEffect(() => {
    async function fetchBookmark() {
      const response = await fetch(
        `http://localhost:3000/api/bookmark/${user.id}`
      );
      console.log("bookmark page", response);
      const data = await response.json();
      console.log("bookmark data", data);
      setBookmarkItems(data);
    }
    fetchBookmark();
  }, []);

  return (
    <div>
      {bookmarkItems &&
        bookmarkItems.map((item) => (
          <div key={item._id}>
            <p>{item.nameOfBookmark}</p>
          </div>
        ))}
    </div>
  );
};

export default BookmarkPage;
