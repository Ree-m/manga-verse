import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "@/models/Bookmark";

export async function POST(request) {
  connectMongo();
  const { nameOfBookmark} = await request.json();
  console.log("nameOfBookmark",nameOfBookmark);

  try {
    const bookmark = await Bookmark.create({
      nameOfBookmark
    });
    await bookmark.save();
    console.log("bookmark added");
    return NextResponse.json(bookmark);
  } catch (error) {
      console.log("post bookmark error", error);
      return NextResponse.json(error);
    
  }
}
