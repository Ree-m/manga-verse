"use client";
import { useSession } from "next-auth/react";

import { useContext, useState, createContext, useEffect } from "react";

const BookmarkContext = createContext([]);

export const BookmarkContextProvider = ({ children }) => {
  const [bookmark, setBookmark] = useState([]);
  const { data } = useSession();
  const userId = data?.user?.id;


  useEffect(() => {
    async function fetchBookmarkData() {
      try {
        const response = await fetch(`/api/bookmark/${userId}`);
        const data = await response.json();
        setBookmark(data);
      } catch (error) {
        console.log("Error fetching bookmark data:", error);
      }
    }

    fetchBookmarkData();
  }, [userId]);

  return (
    <BookmarkContext.Provider value={[bookmark, setBookmark]}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);
