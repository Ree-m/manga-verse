// "use client"
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";


// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(query);

//     setQuery(""); //to empty the input after search
//   };

//   return (
//     <div >
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={query}
//           placeholder="Search"
//           onChange={(e) => setQuery(e.target.value)}
//         />

//         <button type="submit">Search</button>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;
