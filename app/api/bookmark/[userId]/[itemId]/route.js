import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import Bookmark from "@/models/Bookmark";


export async function DELETE(request){
connectMongo()
const {url}= request

const userId=url?.split("/").pop()
console.log("delete bookmark userId",userId)
const bookmark=await Bookmark.findOneAndDelete({userId})

if(!bookmark){
  return NextResponse.json("Bookmark not found")
}
return NextResponse.json("Bookmark deleted")

}
