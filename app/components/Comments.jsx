"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useCommentContext } from "../context/comment";
const Comments = ({comments,setComments}) => {
  // const [comments, setComments] = useCommentContext();
  // const [loading, setLoading] = useState(false);
console.log("this is comments component",comments)
  
  // if (loading) {
  //   return <Loading />;
  // }

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
            <button>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Comments;
