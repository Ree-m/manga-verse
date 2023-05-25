import Link from "next/link"
const MangaDetails = ({mangas,setMangas}) => {
  return (
    <div>
      {mangas &&
        mangas.map((manga) => (
          <div key={manga.mal_id}>
            <Link href={`/mangas/${manga.mal_id}`}>
              <h1>{manga.title}</h1>
            </Link>
            <p>{manga.synopsis}</p>
          </div>
        ))}
    </div>
  )
}

export default MangaDetails
