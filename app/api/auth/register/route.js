import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  connectMongo();
  const { name, email, password } = await request.json();
  console.log("name", name, "email", email, "password", password);

  try {
    const userExists=await User.findOne({$or:[{name,email}]})
    if (userExists){
      return NextResponse.json("User already exists")
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    await user.save();
    console.log("user added");
    return NextResponse.json(user);
  } catch (error) {
    console.log("post register error", error);
    return NextResponse.json(error);
  }
}
