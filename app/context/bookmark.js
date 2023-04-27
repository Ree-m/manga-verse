"use client";

import { useContext, useState, createContext } from "react";

const BookmarkContext = createContext([]);

export const BookmarkContextProvider = ({ children }) => {
  const [bookmarkItems, setBookmarkItems] = useState([]);

  return (
    <BookmarkContext.Provider value={[ bookmarkItems, setBookmarkItems]}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);
