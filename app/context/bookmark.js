"use client";

import { useContext, useState, createContext,useEffect } from "react";

const BookmarkContext = createContext([]);

export const BookmarkContextProvider = ({ children }) => {
  const [bookmark, setBookmark] = useState([]);

  // useEffect(() => {
  //   async function fetchBookmarkData() {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/bookmark/${i need id here}");
  //       const data = await response.json();
  //       setBookmark(data);
  //     } catch (error) {
  //       console.log("Error fetching bookmark data:", error);
  //     }
  //   }

  //   fetchBookmarkData();
  // }, []);

  return (
    <BookmarkContext.Provider value={[ bookmark,setBookmark]}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);
