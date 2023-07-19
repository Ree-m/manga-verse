"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useUserContext } from "@/app/context/user";
import Comments from "@/app/components/Comments";
import Loading from "@/app/components/Loading";
import { useCommentContext } from "@/app/context/comment";
import { useBookmarkContext } from "@/app/context/bookmark";
import MangaCover from "@/app/components/MangaCover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ShowLess from "@/app/components/ShowLess";
import ColorBlock from "@/app/components/ColorBlock";
import Genres from "@/app/components/Genres";
import PopupComponent from "@/app/components/PopupComponent";
import styles from "app/styles/mangaPage.module.css";

// icons
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { AiOutlineDoubleRight } from "react-icons/ai";

// fucntions
import { fetchManga } from "@/app/functions/fetchManga";

const MangaPage = ({ params }) => {
  const [bookmark, setBookmark] = useBookmarkContext();
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
  const id = +params.id;

  useEffect(() => {
    async function fetchMangaData() {
      try {
        console.log("reem id", id + 1);
        const response = await fetchManga(id);
        console.log("reem resppnse", response);
        setManga(response?.data);
        setIsMangaLoading(false);
      } catch (error) {
        console.log(`Error fetching manga:`, error);
      }
    }

    fetchMangaData();
  }, [id]);

  useEffect(() => {
    async function fetchChapters() {
      console.log("reem", "hi", manga, isMangaLoading);
      console.log("scrape started", manga.title, manga.data,process.env.SCRAPER_API);
      const response = await fetch(`http://localhost:9000/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: manga.title,
        }),
      });
      console.log("scarpe manga page", response);

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
      `/api/bookmark/${userId}`,
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
      <PopupComponent content={"Bookmark already exists."}/>
      // alert("Bookmark already exists");
    } else if (response.ok) {
      setBookmark(bookmark);
      console.log("finish bookmark", bookmark);
      // alert("Bookmark added");
      <PopupComponent content={"Bookmark added."}/>

    } else {
      // alert("Adding to bookmark failed.Try again later.");
      <PopupComponent content={"Adding to bookmark failed.Try again later."}/>

    }
  }

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      const response = await fetch(`/api/comment/${id}`);
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
      `/api/comment/${mangaId}`,
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
    <div className={styles.wholePage}>
      <div className={styles.mangaPage}>
        <section className={styles.mangaPageContainer}>
          <section className={styles.firstSection}>
            <div className={styles.top}>
              <Link href={`/`}>Read Manga Online</Link>
              <span>
                <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
              </span>
              <Link href={`/mangas/${id}`}>{manga?.title}</Link>
            </div>
            <div className={styles.mangaInfo}>
              <MangaCover
                manga={manga}
                height={300}
                width={250}
                border={false}
              />

              <div>
                <div>
                  <h1>{manga?.title}</h1>
                  <h4>{process.env.SCRAPER_API}</h4>

                  <div className={styles.subInfo}>
                    <h4>Alternative:</h4>
                    {manga &&
                      manga.titles &&
                      manga.titles.map((title, index) => (
                        <div>
                          <p>
                            {title.title}
                            {index !== manga.titles.length - 1 && ","}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className={styles.subInfo}>
                    <h4>Author(s):</h4>
                    {manga &&
                      manga.authors &&
                      manga.authors.map((author, index) => (
                        <div key={author.mal_id}>
                          <p>
                            {author.name}
                            {index !== manga.authors.length - 1 && ","}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className={styles.subInfo}>
                    <h4>Genres:</h4>
                    {manga &&
                      manga.genres &&
                      manga.genres.map((genre, index) => (
                        <div key={genre.mal_id}>
                          <Link
                            href={`/genre/${genre.name}/1?genreId=${genre.mal_id}`}
                          >
                            {genre.name}
                            {index !== manga.genres.length - 1 && ","}
                          </Link>
                        </div>
                      ))}
                  </div>

                  <div className={styles.subInfo}>
                    <h4>Date published:</h4>
                    {manga && manga.published?.string}
                  </div>

                  <div className={styles.subInfo}>
                    <h4>Status:</h4>
                    <p>
                      {manga?.status === "Finished" ? "Completed" : "Ongoing"}
                    </p>
                  </div>
                  <div className={styles.bookmarkBtn}>
                    {userId ? (
                      <button
                        className={styles.letterBtn}
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
                        <MdOutlineBookmarkAdd className={styles.bookmarkIcon} />
                        <span>Bookmark</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push(`/auth/login`)}
                        className={styles.letterBtn}
                      >
                        <MdOutlineBookmarkAdd className={styles.bookmarkIcon} />
                        <span>Bookmark</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <h4>{manga?.title} Summary:</h4>
              <h4>{process.env.SCRAPER_API}</h4>

              <ShowLess manga={manga} />
            </div>
          </section>
          {!chapters || chapters == [] ? (
            <div>No chapters</div>
          ) : (
            <div className={styles.chaptersContainer}>
              <div className={styles.chapters}>
                <div className={styles.chaptersHeading}>
                  <p>Chapter name</p>
                </div>
                {chapters &&
                  chapters.map((chapter) => (
                    <div className={styles.chaptersList}>
                      <Link href={`/mangas/${id}/${chapter.split("/").pop()}`}>
                       <p>{chapter.split("/").pop()}</p> 
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <section className={styles.commentsSection}>
            <div className={styles.commentsTop}>
              <h2>Comments</h2>
            </div>

            <div className={styles.numberOfComments}>
              {/* <span>{`0 Comments`}</span> */}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment(
                  e,
                  userId,
                  username,
                  commentText,
                  0,
                  0,
                  manga?.mal_id
                );
              }}
            >
              <textarea
                type="text"
                value={commentText}
                placeholder="comment"
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className={styles.addBtn}>
                Comment
              </button>
            </form>

            <Comments
              comments={comments}
              setComments={setComments}
              mangaId={manga?.mal_id}
              userId={userId}
            />
          </section>
        </section>
      </div>
      <div className={styles.mangaPageSideBar}>
        <ColorBlock />
        <Genres sideBar={true} />
      </div>
    </div>
  );
};

export default MangaPage;
