import connectMongo from "@/utils/connectMongo";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(request) {
  connectMongo();
  const { url } = request;
  const mangaId = url.split("/").pop();
  console.log("new comment route", mangaId);

  const comments = await Comment.find({ mangaId });
  console.log('logged comments',comments)
  return NextResponse.json(comments);
}
export async function POST(request) {
  connectMongo();
  const { userId,username, commentText, likes,dislikes, mangaId } = await request.json();
  console.log(
    "userId",
    userId,
    "username",
    username,
    
    "comment",
    commentText,
    "likes",
    likes,
    "dislikes",
    dislikes,
    "mangaId",
    mangaId,
    

  );

  try {
    
    const newComment = await Comment.create({
      userId,
      username,
      commentText,
      likes,
      dislikes,
      mangaId,
    });
    await newComment.save();
    return NextResponse.json(newComment);
  } catch (error) {
    console.log("post comment error", error);
    return NextResponse.json(error);
  }
}


