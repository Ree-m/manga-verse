// import { IconOnClick } from "./IconOnClick"
// import styles from "../styles/comments.module.css"


// export const Comment = ({comments}) => {
//   return (
//     <div>

// {comments &&
//         comments.map((comment) => (
//           <div key={comment._id}>
//             <h4 className={styles.commentsUserName}>{comment.name}</h4>

//             <p className={styles.commentsText}>{comment.commentText}</p>

//             <IconOnClick comment={comment}/>
//             <i onClick={() => likeDislikeComment(comment._id, userId, "like")}>
//               <AiOutlineLike />
//               <span>{comment.likesArr.length}</span>

//             </i>

//             <i
//               onClick={() => likeDislikeComment(comment._id, userId, "dislike")}
//             >
//               <AiOutlineDislike />
//               <span>{comment.dislikesArr.length}</span>

//             </i>


//             {userId && userId === comment.userId ? (
//               <button onClick={() => deleteComment(comment._id, userId)}>
//                 Delete
//               </button>
//             ) : null}
//           </div>
//         ))}

//     </div>
//   )
// }
