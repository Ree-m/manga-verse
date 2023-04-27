"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/user";
import Loading from "@/app/components/Loading";

const BookmarkPage = () => {
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  console.log("bookmark page", user);
  useEffect(() => {
    async function fetchBookmark() {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/bookmark/${user.id}`
      );
      console.log("bookmark page", response);
      const data = await response.json();
      console.log("bookmark data", data);
      setBookmarkItems(data);
      setLoading(false);
    }
    fetchBookmark();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
