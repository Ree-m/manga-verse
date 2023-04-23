"use client";
import { useState, useEffect } from "react";

const BookmarkPage = () => {
  const API_URL = process.env.API_URL;
  const [bookmarkItems, setBookmarkItems] = useState([]);

  useEffect(() => {
    async function fetchBookmark() {
      const response = await fetch(`${API_URL}/api/bookmark`);
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
