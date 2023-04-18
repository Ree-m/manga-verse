import Link from "next/link";
async function fetchMangas() {

  const response = await fetch(`https://api.jikan.moe/v4/manga`);
  const mangas = await response.json();
  return mangas.data;
}
const Mangas = async () => {
  const mangas = await fetchMangas();
  console.log(mangas);
  return (
    <>
      {mangas &&
        mangas.map((manga) => (
          <div key={manga.mal_id}>
            <p>{console.log("this is manga", manga)}</p>
            <Link href={`/mangas/${manga.mal_id}`}><h1>{manga.title}</h1></Link>
            <p>{manga.synopsis}</p>
          </div>
        ))}
    </>
  );
};

export default Mangas;
