import connectMongo from "@/utils/connectMongo";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  connectMongo();
  const { url } = request;
  const userId = url.split("/").pop();
  const commentId = url.split("/").slice(-2, -1)[0];
  console.log("delete", request, userId, "this is commentId", commentId);

  try {
    const comment = await Comment.findById(commentId);
    console.log("comment found", comment);
    console.log(userId, comment.userId);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" });
    }

    if (comment.userId .toString() !== userId.toString()) {
      return NextResponse.json({ error: "Unauthorized to delete" });
    }

    await Comment.findByIdAndDelete(commentId);
    return NextResponse.json("comment deleted");
  } catch (error) {
    console.log("delete error",error);
    return NextResponse.json({message:error});
  }
}
