"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useCommentContext } from "../context/comment";
const Comments = () => {
  const [comments, setComments] = useCommentContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/comment`);
      const data = await response.json();
      console.log("comments data", data);
      setComments(data);
      setLoading(false);
    }
    fetchComments();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.commentText}</p>
            <span>{comment.likes}</span>
            <br />
            <span>{comment.userId}</span>
            <button onClick={() => deleteComment()}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Comments;
