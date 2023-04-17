import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  connectMongo();
  const { username, email, password } = await request.json();
  console.log("username", username, "email", email, "password", password);

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    await user.save();
    console.log("user added");
    return NextResponse.json(user);
  } catch (error) {
    if (error.code === 11000) {
      //duplicate key error
      // if user already exists
      return NextResponse.json("User already exists");
    } else {
      console.log("post register error", error);
      return NextResponse.json(error);
    }
  }
}
