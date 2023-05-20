import cookieParser from "cookie-parser";
import cookie from "cookie";
import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import { setCookie } from 'cookies-next';


export async function POST(request) {
  console.log("logging out");
  setCookie(request.res, 'token', "", {});
  return NextResponse.json("ok");
}
 