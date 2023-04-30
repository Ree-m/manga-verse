import connectMongo from "@/utils/connectMongo";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(request) {
  connectMongo();
  const { url } = request;
  const mangaId = url.split("/").pop();
  console.log("new comment route", request,mangaId);

  const comments = await Comment.find({mangaId});
  return NextResponse.json(comments);
}
export async function POST(request) {
  connectMongo();
  const { userId, commentText, likes, mangaId } = await request.json();
  console.log(
    "userId",
    userId,
    "comment",
    commentText,
    "likes",
    likes,
    "mangaId",
    mangaId
  );

  try {
    const newComment = await Comment.create({
      userId,
      commentText,
      likes,
      mangaId,
    });
    await newComment.save();
    return NextResponse.json(newComment);
  } catch (error) {
    console.log("post comment error", error);
    return NextResponse.json(error);
  }
}
