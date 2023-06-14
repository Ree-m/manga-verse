import Link from "next/link";
import MangaCover from "./MangaCover";
import styles from "../styles/random.module.css"
async function fetchRandom() {
  const response = await fetch(`https://api.jikan.moe/v4/random/manga`,{ next: { revalidate: 60 } });
  const data = await response.json();
  console.log("random data", data);
  return data;
}

const Random = async () => {
  const data = await fetchRandom();
  const randomManga = data.data;
  return (
    <div className={styles.randomComponent}>
      {randomManga && (
        <div key={randomManga.mal_id} className={styles.flex}>
          <MangaCover
            manga={randomManga}
            height={176}
            width={116}
            border={true} 
          />
          <div className={styles.randomTextPart}>
            <div>
              <Link href={`/mangas/${randomManga.mal_id}`}>
                <h2>{randomManga.title}</h2>
              </Link>
            </div>

            <div className={styles.subInfo}>
              <h4>Genres:</h4>
              {randomManga &&
                randomManga.genres &&
                randomManga.genres.map((genre, index) => (
                  <div key={genre.mal_id}>
                    <Link
                      href={`/genre/${genre.name}/1?genreId=${genre.mal_id}`}
                    >
                      {genre.name}
                      {index !== randomManga.genres.length - 1 && ","}
                    </Link>
                  </div>
                ))}
            </div>
{/* 
            <div className={styles.subInfo}>
                    <h4>Status:</h4>
                    <p>
                      {randomManga?.status === "Finished" ? "Completed" : "Ongoing"}
                    </p>
                  </div> */}

            <div className={styles.description}>
              <p>
                {randomManga.synopsis?.replace(
                  /\[Written by MAL Rewrite\]/g,
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Random;
