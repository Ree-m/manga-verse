import connectMongo from "@/utils/connectMongo";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function POST(request) {
  connectMongo();
  const { userId, commentText, likes, commentIn } = await request.json();
  console.log(
    "userId",
    userId,
    "comment",
    commentText,
    "likes",
    likes
  );

  try {
    const newComment = await Comment.create({
      userId,
      commentText,
      likes,
    });
    await newComment.save();
    return NextResponse.json(newComment);
  } catch (error) {
    console.log("post comment error", error);
    return NextResponse.json(error);
  }
}
