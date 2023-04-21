import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

cookieParser();

const privateKey = process.env.PRIVATE_KEY;

export async function POST(request) {
  connectMongo();
  const { email, password } = await request.json();
  const user = await User.findOne({ email, password }).exec();
  console.log("logging in start");
  if (!user) {
    return NextResponse.json("Invalid login credentials");
  }
  // logged in
  jwt.sign({ email, id: user._id }, privateKey, {}, (err, token) => {
    if (err) throw err;
    console.log("token", token);

    return NextResponse.cookie("token", token).json({
      id: user._id,
      email,
    });
  });
}

export async function GET(request) {
  console.log("token profile", request.cokkies.token);

  jwt.verify(request.cookies.token, privateKey, {}, (error, user) => {
    if (error) {
      console.log("error while getting profile", error);
      return NextResponse.json({ message: "Invalid token" });
    }
    console.log("this is the user", user);
    return NextResponse.json(user);
  });
}
