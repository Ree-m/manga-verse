"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/searchBar.module.css"

// import { IoSearchCircle } from "react-icons/io";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${query}/1`)
    console.log(query);

    setQuery("");  
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search Manga"
          onChange={(e) => setQuery(e.target.value)}
        /> 

        {/* <i><IoSearchCircle/></i> */}

        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
};

export default SearchBar;
