// import Link from "next/link";

// async function fetchMangas(page = 1) {
//   const response = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`);
//   const data = await response.json();
//   const mangas = data.data;

//   if (data.pagination.has_next_page) {
//     const nextMangas = await fetchMangas(page + 1);
//     return [...mangas, ...nextMangas];
//   }

//   return mangas;
// }
// const Mangas = async () => {
//   const mangas = await fetchMangas();
//   console.log("mangas length", mangas.length);
//   return (
//     <>
//       {mangas &&
//         mangas.map((manga) => (
//           <div key={manga.mal_id}>
//             <Link href={`/mangas/${manga.mal_id}`}>
//               <h1>{manga.title}</h1>
//             </Link>
//             <p>{manga.synopsis}</p>
//           </div>
//         ))}
//     </>
//   );
// };

// export default Mangas;
