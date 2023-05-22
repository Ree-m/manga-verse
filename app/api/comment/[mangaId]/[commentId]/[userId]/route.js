import connectMongo from "@/utils/connectMongo";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  connectMongo();
  const { url } = request;
  const userId = url.split("/").pop();
  const commentId = url.split("/").slice(-2, -1)[0];
  console.log("delete", userId, "this is commentId", commentId);

  try {
    const comment = await Comment.findById(commentId);
    console.log("comment found", comment);
    console.log(userId, comment.userId);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" });
    }

    if (comment.userId.toString() !== userId.toString()) {
      return NextResponse.json({ error: "Unauthorized to delete" });
    } else if (comment.userId.toString() === userId.toString()) {
      await Comment.findByIdAndDelete(commentId);
      return NextResponse.json("comment deleted");
    }
  } catch (error) {
    console.log("delete error", error);
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request) {
  connectMongo();
  const { url } = request;
  const userId = url.split("/").pop();
  const commentId = url.split("/").slice(-2, -1)[0];
  console.log("like/dislike", userId, "this is commentId", commentId);

  try {
    const comment = await Comment.findById(commentId).populate(
      "likes dislikes"
    );
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" });
    }

    const { action } = await request.json();

    
    // Check if the user has already liked or disliked the comment
    const userHasLiked = comment.likesArr.includes(userId);
    const userHasDisliked = comment.dislikesArr.includes(userId);

    // if (action === "like" && !userHasLiked) {
    //   comment.likesArr.push(userId); // Add user to likes array
    //   if (userHasDisliked) {
    //     comment.dislikesArr.pull(userId); // Remove user from dislikes array,as they already disliked
    //   }
    // } else if (action === "dislike" && !userHasDisliked) {
    //   comment.dislikesArr.push(userId); // Add user to dislikes array
    //   if (userHasLiked) {
    //     comment.likesArr.pull(userId); // Remove user from likes array
    //   }
    // }

    if (action === "like") {
      if (userHasLiked) {
        // User has already liked the comment, so remove their like
        comment.likesArr.pull(userId);
      } else {
        // User hasn't liked the comment, so add their like and remove dislike if present
        comment.likesArr.push(userId);
        if (userHasDisliked) {
          comment.dislikesArr.pull(userId);
        }
      }
    } else if (action === "dislike") {
      if (userHasDisliked) {
        // User has already disliked the comment, so remove their dislike
        comment.dislikesArr.pull(userId);
      } else {
        // User hasn't disliked the comment, so add their dislike and remove like if present
        comment.dislikesArr.push(userId);
        if (userHasLiked) {
          comment.likesArr.pull(userId);
        }
      }
    }
    
    const updatedComment = await comment.save(); // Save the updated comment

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.log("like/dislike error", error);
    return NextResponse.json({ message: error });
  }
}
