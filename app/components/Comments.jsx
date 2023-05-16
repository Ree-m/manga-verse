"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useUserContext } from "../context/user";
import { Suspense } from "react";
const Comments = ({ comments, setComments, mangaId }) => {
  const { user, setUser } = useUserContext();
  // const [likes,setLikes]=useState(0)
  // const [dislikes,setDislikes]=useState(0)


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

  async function likeDislikeComment(commentId, userId,action) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/${mangaId}/${commentId}/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify({ action }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data =await response.json()
      console.log("like/dislike frontend",data)
      // Find the comment in the comments array and update its likes and dislikes counts
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likes: data.likes,
            dislikes: data.dislikes,
          };
        }
        return comment;
      });

      // Update the comments state with the updated comments array
      setComments(updatedComments);


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            <h4>{comment.username}</h4>

            <p>{comment.commentText}</p>
            <button onClick={() => likeDislikeComment(comment._id, user?.id,"like")}>
              like
            </button>
            <span>{comment.likes}</span>
            <button onClick={() => likeDislikeComment(comment._id, user?.id,"dislike")}>
              dislike
            </button>
            <span>{comment.dislikes}</span>

            {user && user.id === comment.userId ? (
              <button onClick={() => deleteComment(comment._id, user?.id)}>
                delete
              </button>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default Comments;
