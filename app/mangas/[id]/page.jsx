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
import { useSession } from "next-auth/react";
// import Recommandations from "@/app/components/Recommandations";
import ShowLess from "@/app/components/ShowLess";
import styles from "app/styles/mangaPage.module.css";

const MangaPage = ({ params: { id } }) => {
  const [bookmark, setBookmark] = useState("");
  const [manga, setManga] = useState({});
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useCommentContext();
  const [chapters, setChapters] = useState([]);
  const [isMangaLoading, setIsMangaLoading] = useState(true);
  const router = useRouter();
  const { data } = useSession();
  const userId = data?.user?.id;
  const username = data?.user?.name;

  console.log("manga page user info", data, userId);
  useEffect(() => {
    async function fetchManga() {
      console.log("this is id", id);

      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const manga = await response.json();
      setManga(manga.data);
      setIsMangaLoading(false);
      console.log("finished fetching");
      console.log("manga", manga);
    }
    fetchManga();
  }, [id]);

  useEffect(() => {
    async function fetchChapters() {
      console.log("reem", "hi", manga, isMangaLoading);
      console.log("scrape started", manga.data?.title, manga.title, manga.data);
      const response = await fetch(`http://localhost:9000/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: manga.title,
        }),
      });
      console.log("scarpe", response);

      const data = await response.json();
      setChapters(data);
      console.log("chapters", data);
    }
    if (!isMangaLoading) fetchChapters();
  }, [manga?.title, isMangaLoading]);

  // add manga to bookmark
  async function addToBookmark(
    nameOfBookmark,
    userId,
    mangaId,
    imageUrl,
    synopsis
  ) {
    console.log("start bookmark");
    const response = await fetch(
      `http://localhost:3000/api/bookmark/${userId}`,
      {
        method: "POST",

        body: JSON.stringify({
          nameOfBookmark,
          userId,
          mangaId,
          imageUrl,
          synopsis,
        }),
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

  async function addComment(
    e,
    userId,
    name,
    commentText,
    likes,
    dislikes,
    mangaId
  ) {
    e.preventDefault();
    console.log("start adding comment");
    const response = await fetch(
      `http://localhost:3000/api/comment/${mangaId}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          name,
          commentText,
          likes,
          dislikes,
          mangaId,
        }),
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
    <div className={styles.mangaPage}>
      <div className={styles.mangaInfo}>
        <MangaCover manga={manga} />
        <div>
          <div>
            <h1>{manga?.title}</h1>
            {/* <p>
              {manga?.synopsis?.replace(/\s*\[Written by MAL Rewrite\]$/, "")}
            </p> */}

            <div className={styles.subInfo}>
              <h4>Alternative:</h4>
              {manga &&
                manga.titles &&
                manga.titles.map((title) => (
                  <div>
                    <p>{title.title},</p>
                  </div>
                ))}
            </div>
            <div className={styles.subInfo}>
              <h4>Author(s):</h4>
              {manga &&
                manga.authors &&
                manga.authors.map((author) => (
                  <div key={author.mal_id}>
                    <p>{author.name},</p>
                  </div>
                ))}
            </div>
            <div className={styles.subInfo}>
              <h4>Genres:</h4>
              {manga &&
                manga.genres &&
                manga.genres.map((genre) => (
                  <div key={genre.mal_id}>
                    <p>{genre.name},</p>
                  </div>
                ))}
            </div>

            <div className={styles.subInfo}>
              <h4>Status:</h4>
              <p>{manga?.status}</p>
            </div>

            {userId ? (
              <button
                onClick={() =>
                  addToBookmark(
                    manga?.title,
                    userId,
                    manga?.mal_id,
                    manga?.images.jpg.image_url,
                    manga?.synopsis
                  )
                }
              >
                Bookmark
              </button>
            ) : (
              <Link href={`/auth/login`}>
                <button>Bookmark</button>
              </Link>
            )}
          </div>
        </div>
      </div>
 
      {/* <div className="mangaDescription">
        <p> {manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '')}</p>
      </div> */}
      <div className={styles.description}>
        <h4>Description</h4>
      <ShowLess   manga={manga}/>

      </div>
      <div className={styles.chapters}>
        {chapters &&
          chapters.map((chapter) => (
            <div>
              <Link href={`/mangas/${id}/${chapter.split("/").pop()}`}>
                {chapter.split("/").pop()}
              </Link>
            </div>
          ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(e, userId, username, commentText, 0, 0, manga?.mal_id);
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
      {/* <Recommandations manga={manga} /> */}

      <Comments
        comments={comments}
        setComments={setComments}
        mangaId={manga?.mal_id}
      />
    </div>
  );
};

export default MangaPage;
