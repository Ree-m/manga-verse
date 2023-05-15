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
const {likes,dislikes}=await request.json()
  const { url } = request;
  const userId = url.split("/").pop();
  const commentId = url.split("/").slice(-2, -1)[0];
  console.log("like/dislike", userId, "this is commentId", commentId);

  try {
    const comment = await Comment.findByIdAndUpdate(commentId,{likes:likes,dislikes:dislikes});

    console.log("comment found", comment);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" });
    }
    return NextResponse.json({success:"true"})


  } catch (error) {
    console.log("like/dislike error", error);
    return NextResponse.json({ message: error });
  }
}
