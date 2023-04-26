import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
import { setCookie } from 'cookies-next';

import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

// cookieParser();

const privateKey = process.env.PRIVATE_KEY;

export async function POST(request,response) {
  connectMongo();
  console.log("login backend start");
  const { username, email, password } = await request.json();
  const user = await User.findOne({ username, email });
  console.log("login backend found user", user, privateKey);
  if (!user) {
    return NextResponse.json("Invalid login credentials");
  }
  
  const token = await new Promise((resolve, reject) => {
    jwt.sign({ username, email, id: user._id }, privateKey, {}, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

  console.log("token", token);
  setCookie(request.res, 'token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 24 hours
  });

return NextResponse.json({
    id: user._id,
    username,
    email
})
}








