"use client";
import { useEffect ,useState} from "react";
const Comments = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`http://localhost:3000/api/comment`);
      const data = await response.json();
      console.log("comments data", data);
      setComments(data);
    }
    fetchComments();
  },[]);
  return (
    <div>
      {
        comments && comments.map((comment)=>(
            <div key={comment._id}>
                <p>{comment.commentText}</p>
                <span>{comment.likes}</span>
                <br/>
                <span>{comment.userId}</span>
            </div>
        ))
      }
    </div>
  );
};

export default Comments;
