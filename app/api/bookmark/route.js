import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "@/models/Bookmark";

export async function POST(request) {
  connectMongo();
  const { nameOfBookmark,userId} = await request.json();
  console.log("nameOfBookmark",nameOfBookmark,"userId",userId);

  try {
    const bookmarkExists=await Bookmark.findOne({nameOfBookmark})
    if(bookmarkExists){
      return NextResponse.json("Bookmark already exists")
    }
    const bookmark = await Bookmark.create({
      nameOfBookmark,
      userId
    });
    await bookmark.save();
    console.log("bookmark added");
    return NextResponse.json(bookmark);
  } catch (error) {
      console.log("post bookmark error", error);
      return NextResponse.json(error);
    
  }
}
