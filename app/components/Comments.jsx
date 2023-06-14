"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useUserContext } from "../context/user";
import { Suspense } from "react";
// import { useSession } from "next-auth/react";
import styles from "../styles/comments.module.css"

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const Comments = ({ comments, setComments, mangaId,userId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  // const { data } = useSession();
  // const userId = data?.user?.id;

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
      if (!userId) {
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

  async function likeDislikeComment(commentId, userId, action) {
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
      const data = await response.json();
      console.log(
        "like/dislike frontend",
        data,
        "likes",
        data.likesArr?.length,
        "dislikes",
        data.dislikesArr?.length
      );
      // Find the comment in the comments array and update its likes and dislikes counts
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likesArr: data.likesArr,
            dislikesArr: data.dislikesArr,
          };
        }
        return comment;
      });

      // Update the comments state with the updated comments array
      setComments(updatedComments);
      setLikes(data.likesArr?.length);
      setDislikes(data.dislikesArr?.length);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.comments}>
    
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            <h4 className={styles.commentsUserName}>{comment.name}</h4>

            <p className={styles.commentsText}>{comment.commentText}</p>

            <div className={styles.likeDelete}>
            <i onClick={() => likeDislikeComment(comment._id, userId, "like")}>
              <AiOutlineLike className={styles.icon} />
              <span>{comment.likesArr.length}</span>

            </i>

            <i
              onClick={() => likeDislikeComment(comment._id, userId, "dislike")}
            >
              <AiOutlineDislike  className={styles.icon}/>
              <span>{comment.dislikesArr.length}</span>

            </i>


            {userId && userId === comment.userId ? (
              <button onClick={() => deleteComment(comment._id, userId)}>
                Delete
              </button>
            ) : null}
            </div>
           
          </div>
        ))}
    </div>
  );
};

export default Comments;
