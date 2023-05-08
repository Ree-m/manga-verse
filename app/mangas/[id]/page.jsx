"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useUserContext } from "@/app/context/user";
import Comments from "@/app/components/Comments";
import Loading from "@/app/components/Loading";
import { useCommentContext } from "@/app/context/comment";
import MangaCover from "@/app/components/MangaCover";
import Link from "next/link";
import { useRouter } from "next/navigation";


const MangaPage = ({ params: { id } }) => {
  // const manga = await fetchManga(id);
  const [bookmark, setBookmark] = useState("");
  const [manga, setManga] = useState([]);
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useCommentContext();
  const [chapters, setChapters] = useState([]);
  const [chapterImages, setChapterImages] = useState([]);
  const router = useRouter();
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

  useEffect(() => {
    async function fetchChapters() {
      console.log("scrape started");
      const response = await fetch(`http://localhost:8000/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://ww5.manganelo.tv/manga/manga-hu985203",
        }),
      });
      console.log("scarpe", response);

      const data = await response.json();
      setChapters(data);
      console.log("chapters", data);
    }
    fetchChapters();
  }, []);

  // async function fetchChapterImages(chapterUrl) {
  //   console.log("scrape started");
  //   const response = await fetch(`http://localhost:8000/chapterImages`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       chapterUrl,
  //     }),
  //   });
  //   console.log("this is frontend",chapterUrl)
  //   console.log("chapeter Images", response);

  //   const data = await response.json();
  //   setChapterImages(data);
  //   const chapter=chapterUrl.split("/").pop()
  //   router.push(
  //     `/mangas/${id}/${chapter}`,
  //   )
  //   console.log("chapters images", data);
  // }
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
    const response = await fetch(
      `http://localhost:3000/api/comment/${mangaId}`,
      {
        method: "POST",
        body: JSON.stringify({ userId, commentText, likes, mangaId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newComment = await response.json();
    const updatedComments = [...comments];
    updatedComments.push(newComment);
    setComments(updatedComments);
    setCommentText("");
    console.log("addComment has access", comments);
    console.log("comments adding data", newComment);
    console.log("finsih adding comment");
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>{manga.title}</h1>
      <p>{manga.synopsis}</p>

      <MangaCover manga={manga} />

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

      <div className="chapters">
        {chapters &&
          chapters.map((chapter) => (
            <div>
              <Link  href={`/mangas/${id}/${chapter.split("/").pop()}`}>
                {chapter.split("/").pop()}
              </Link>
            </div>
          ))}
      </div>
      <Comments
        comments={comments}
        setComments={setComments}
        mangaId={manga.mal_id}
      />
    </div>
  );
};

export default MangaPage;
