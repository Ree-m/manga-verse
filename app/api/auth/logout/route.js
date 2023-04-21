import cookieParser from "cookie-parser";
import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

cookieParser();

export async function POST(request){
console.log("logging out")
return NextResponse.cookie("token","").josn("ok")
}
