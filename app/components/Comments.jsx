"use client";
// import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useCommentContext } from "../context/comment";
import { Suspense } from "react";
const Comments = ({comments,setComments,mangaId}) => {
  // const [comments, setComments] = useCommentContext();
  // const [loading, setLoading] = useState(false);
  // if (loading) {
  //   return <Loading />;
  // }
  async function deleteComment(commentId,userId){
    const response = await fetch(`http://localhost:3000/api/comment/${mangaId}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId,
        userId
      }),
    })
    const data =await response.json()
    console.log("deleted",data)

  }
  console.log("this is comment componenet",mangaId)  


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
            <button onClick={()=>deleteComment(comment._id,comment.userId)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Comments;
