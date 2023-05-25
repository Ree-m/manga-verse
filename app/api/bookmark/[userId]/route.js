import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "@/models/Bookmark";

export async function POST(request) {
  connectMongo();
  const { nameOfBookmark,userId,mangaId,imageUrl,synopsis} = await request.json();
  console.log("nameOfBookmark",nameOfBookmark,"userId",userId,"mangaId",mangaId,"imageUrl",imageUrl,"synopsis",synopsis);

  try {
    const bookmarkExists=await Bookmark.findOne({nameOfBookmark})
    if(bookmarkExists){
      return NextResponse.json("Bookmark already exists")
    }
    const bookmark = await Bookmark.create({
      nameOfBookmark,
      userId,
      mangaId,
      imageUrl,
      synopsis
    });
    await bookmark.save();
    console.log("bookmark added");
    return NextResponse.json(bookmark);
  } catch (error) {
      console.log("post bookmark error", error);
      return NextResponse.json(error);
    
  }
}

export async function GET(request){
  connectMongo()
  const {url}= request
  const userId=url?.split("/").pop()

  const bookmark=await Bookmark.find({userId})
  return NextResponse.json(bookmark)
}

