"use client";

import { useContext, useState, createContext } from "react";

const PageContext = createContext({});

export const PageContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("page changed:", page);
  }, [page]);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
