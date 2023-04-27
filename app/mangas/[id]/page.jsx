"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useUserContext } from "@/app/context/user";
// import Image from "next/image";
import Comments from "@/app/components/Comments";
import Loading from "@/app/components/Loading";

const MangaPage = ({ params: { id } }) => {
  // const manga = await fetchManga(id);
  const [bookmark, setBookmark] = useState("");
  const [manga, setManga] = useState([]);
  const { user, setUser } = useUserContext();
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    async function fetchManga() {
setLoading(true)
      console.log("this is id", id);

      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const manga = await response.json();
      setManga(manga.data);
      setLoading(false)
      console.log("finished fetching");
      console.log("manga", manga);
    }
    fetchManga();
  }, [id]);

  // add manga to bookmark
  async function addToBookmark(nameOfBookmark, userId,itemId) {
    console.log("start bookmark");
    const response = await fetch(
      `http://localhost:3000/api/bookmark/${user.id}`,
      {
        method: "POST",

        body: JSON.stringify({ nameOfBookmark, userId ,itemId}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const bookmark = await response.json();
    if (bookmark === "Bookmark already exists") {
      alert("Bookmark already exists");
    } else {
      setBookmark(bookmark);
      console.log("finish bookmark", bookmark);
      alert("bookmark added");
    }
  }
  console.log("manga page", user);
  const userId = user?.id;
  // console.log("manga page", ...manga?.images);
  // const image_url=manga?.images?.jpg?.images_url
  // console.log(image_url)

  if(loading){
    return <Loading/>
  }
  return (
    <div>
      <h1>{manga.title}</h1>
      <p>{manga.synopsis}</p>
      {/* <Image
        width={500}
        height={500}
        src={`https://cdn.myanimelist.net/images/manga/3/258224.jpg`}
        {...manga.title}
      /> */}

      {manga &&
        manga.genres &&
        manga.genres.map((genre) => (
          <div key={genre.mal_id}>
            <span>{genre.name}</span>
          </div>
        ))}

      <button onClick={() => addToBookmark(manga.title, userId,manga.mal_id)}>
        Bookmark
      </button>

     

    </div>
  );
};

export default MangaPage;
