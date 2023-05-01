"use client";
// import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useCommentContext } from "../context/comment";
import { useUserContext } from "../context/user";
import { Suspense } from "react";
const Comments = ({ comments, setComments, mangaId }) => {
  const { user, setUser } = useUserContext();
  // const [comments, setComments] = useCommentContext();
  // const [loading, setLoading] = useState(false);
  // if (loading) {
  //   return <Loading />;
  // }
  async function deleteComment(commentId, userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/${mangaId}/${commentId}/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      console.log(userId), "userId in delete";
      if (!user) {
        alert("not logged in");
      } else {
        const newComments = await comments.filter(
          (comment) => comment._id !== commentId
        );
        setComments(newComments);

        console.log("after", newComments);
        const data = await response.json();
        console.log("deleted", data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.commentText}</p>
            <span>{comment.likes}</span>
            <span>MangaId:{comment.mangaId}</span>

            <br />
            <span>{comment.userId}</span>
            <button onClick={() => deleteComment(comment._id, user?.id)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Comments;
