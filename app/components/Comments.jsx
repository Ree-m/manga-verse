"use client";
// import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useCommentContext } from "../context/comment";
import { useUserContext } from "../context/user";
import { Suspense } from "react";
const Comments = ({ comments, setComments, mangaId }) => {
  const { user, setUser } = useUserContext();

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

  async function likeDislikeComment(commentId, userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comment/${mangaId}/${commentId}/${userId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        // Get the updated comment and like/dislike counts from the response
        const { comment, likeCount, dislikeCount } = await response.json();
        console.log(
          "comment",
          comment,
          "likesCount",
          likeCount,
          "dislikeCount",
          dislikeCount
        );
        // Find the index of the updated comment in the comments array
        const commentIndex = comments.findIndex((c) => c._id === comment._id);
        console.log("commentIndex", commentIndex);
        if (commentIndex !== -1) {
          // Create a new copy of the comments array to update the specific comment
          const updatedComments = [...comments];

          // Update the comment with the new like and dislike counts
          updatedComments[commentIndex] = {
            ...comment,
            likesCount: likeCount,
            dislikesCount: dislikeCount,
          };

          // Update the state with the updated comments
          setComments(updatedComments);
        }
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
            <h4>{comment.username}</h4>

            <p>{comment.commentText}</p>
            <button onClick={() => likeDislikeComment(comment._id, user?._id)}>
              +
            </button>
            <span>{comment.likes}</span>
            <button onClick={() => likeDislikeComment(comment._id, user?._id)}>
              -
            </button>

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
