"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useUserContext } from "@/app/context/user";
// import Image from "next/image";
import Comments from "@/app/components/Comments";
import Loading from "@/app/components/Loading";
import { useCommentContext } from "@/app/context/comment";

const MangaPage = ({ params: { id } }) => {
  // const manga = await fetchManga(id);
  const [bookmark, setBookmark] = useState("");
  const [manga, setManga] = useState([]);
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useCommentContext();
  const userId = user?.id;

  useEffect(() => {
    async function fetchManga() {
      setLoading(true);
      console.log("this is id", id);

      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const manga = await response.json();
      setManga(manga.data);
      setLoading(false);
      console.log("finished fetching");
      console.log("manga", manga);
    }
    fetchManga();
  }, [id]);

  // add manga to bookmark
  async function addToBookmark(nameOfBookmark, userId) {
    console.log("start bookmark");
    const response = await fetch(
      `http://localhost:3000/api/bookmark/${user.id}`,
      {
        method: "POST",

        body: JSON.stringify({ nameOfBookmark, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("bookmark repsonse", response);
    const bookmark = await response.json();
    if (response.ok && bookmark === "Bookmark already exists") {
      alert("Bookmark already exists");
    } else if (response.ok) {
      setBookmark(bookmark);
      console.log("finish bookmark", bookmark);
      alert("bookmark added");
    } else {
      alert("Adding tobookmark failed.Try again later.");
    }
  }

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/comment/${id}`);
      const data = await response.json();
      console.log("comments data", data);
      setComments(data);
      setLoading(false);
    }
    fetchComments();
  }, []);

  async function addComment(e, userId, commentText, likes, mangaId) {
    e.preventDefault();
    console.log("start adding comment");
    const response = await fetch(`http://localhost:3000/api/comment/${mangaId}`, {
      method: "POST",
      body: JSON.stringify({ userId, commentText, likes, mangaId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newComment = await response.json();
    const updatedComments = [...comments];
    updatedComments.push(newComment);
    setComments(updatedComments);
    setCommentText("");
    console.log("addComment has access", comments);
    console.log("comments adding data", newComment);
    console.log("finsih adding comment");
  }
  // console.log("manga page", ...manga?.images);
  // const image_url=manga?.images?.jpg?.images_url
  // console.log(image_url)

  if (loading) {
    return <Loading />;
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

      <button onClick={() => addToBookmark(manga.title, userId)}>
        Bookmark
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(e, user.id, commentText, 0, manga.mal_id);
        }}
      >
        <input
          type="text"
          value={commentText}
          placeholder="comment"
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
      <Comments comments={comments}
        setComments={setComments} mangaId={manga.mal_id}
      />
    </div>
  );
};

export default MangaPage;
