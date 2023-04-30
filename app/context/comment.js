"use client";

import { useContext, useState,useEffect, createContext } from "react";

const CommentContext = createContext([]);


export const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  

  return (
    <CommentContext.Provider value={[ comments, setComments]}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => useContext(CommentContext);
