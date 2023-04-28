import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "@/models/Bookmark";

export async function DELETE(request) {
  try {
    connectMongo();
    const { url } = request;

    const itemId = url?.split("/").pop();
    console.log("itemId", itemId);

    const userId = url?.split("/")[5];
    console.log(" userId", userId);

     const bookmark = await Bookmark.deleteOne({ userId, _id:itemId });
     console.log("bookmark", bookmark);


     if (bookmark === null) {
      return NextResponse.json({ message: "Bookmark does not exist" });
    }
    

    return NextResponse.json({ message:"Bookmark deleted",bookmark});
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the bookmark" },
      { status: 500 }
    );
  }
}
