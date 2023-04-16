"use client";

import { useContext, useState, createContext } from "react";

const CountContext = createContext({});

export const CountContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return( 
  <CountContext.Provider value={{count,setCount}}>
    {children}
    </CountContext.Provider>
    );
};

export const useCountContext = () => useContext(CountContext);