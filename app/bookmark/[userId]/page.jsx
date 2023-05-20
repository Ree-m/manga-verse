"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/user";
import Loading from "@/app/components/Loading";
import { useBookmarkContext } from "@/app/context/bookmark";
import { useSession} from "next-auth/react";

const BookmarkPage = () => {
  const [bookmarkItems, setBookmarkItems] = useBookmarkContext();
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const { data} = useSession();
const userId=data?.user?.id
  console.log("bookmark page", userId);

  useEffect(() => {
    async function fetchBookmark() {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/bookmark/${userId}`
      );
      const data = await response.json();
      console.log("bookmark data", data);
      setBookmarkItems(data);
      setLoading(false);
    }
    fetchBookmark();
  }, []);

  async function deleteBookmark(userId, itemId) {
    const response = await fetch(
      `http://localhost:3000/api/bookmark/${userId}/${itemId}`,
      {
        method: "DELETE",
      }
    )

    
  }

  if (loading) {
    return <Loading />;
  }
  console.log("bookmark items", bookmarkItems);
  return (
    <div>
      {(bookmarkItems === []) | !bookmarkItems
        ? "Bookmarks is empty"
        : bookmarkItems &&
          bookmarkItems.map((item) => (
            <div key={item._id}>
              <p>{item.nameOfBookmark}</p>
              <button onClick={() => deleteBookmark(userId, item._id)}>
                delete
              </button>
            </div>
          ))}
    </div>
  );
};

export default BookmarkPage;
