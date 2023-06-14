// import { useSession } from "next-auth/react";

// export const IconOnClick = ({comment}) => {


//     async function deleteComment(commentId, userId) {
//         try {
//           const response = await fetch(
//             `http://localhost:3000/api/comment/${mangaId}/${commentId}/${userId}`,
//             {
//               method: "DELETE",
//               credentials: "include",
//             }
//           );
//           console.log(userId), "userId in delete";
//           if (!userId) {
//             alert("not logged in");
//           } else {
//             const newComments = await comments.filter(
//               (comment) => comment._id !== commentId
//             );
//             setComments(newComments);
    
//             console.log("after", newComments);
//             const data = await response.json();
//             console.log("deleted", data);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
    
//     async function likeDislikeComment(commentId, userId, action) {
//         try {
//           const response = await fetch(
//             `http://localhost:3000/api/comment/${mangaId}/${commentId}/${userId}`,
//             {
//               method: "PUT",
//               body: JSON.stringify({ action }),
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               credentials: "include",
//             }
//           );
//           const data = await response.json();
//           console.log(
//             "like/dislike frontend",
//             data,
//             "likes",
//             data.likesArr?.length,
//             "dislikes",
//             data.dislikesArr?.length
//           );
//           // Find the comment in the comments array and update its likes and dislikes counts
//           const updatedComments = comments.map((comment) => {
//             if (comment._id === commentId) {
//               return {
//                 ...comment,
//                 likesArr: data.likesArr,
//                 dislikesArr: data.dislikesArr,
//               };
//             }
//             return comment;
//           });
    
//           // Update the comments state with the updated comments array
//           setComments(updatedComments);
//           setLikes(data.likesArr?.length);
//           setDislikes(data.dislikesArr?.length);
//         } catch (error) {
//           console.log(error);
//         }
//       }
    


//   return (
//     <i onClick={() => likeDislikeComment(comment._id, userId, "like")}>
//     <AiOutlineLike />
//     <span>{comment.likesArr.length}</span>

//   </i>
//   )
// }
