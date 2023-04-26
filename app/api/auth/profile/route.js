import jwt from "jsonwebtoken";
import { setCookie } from 'cookies-next';
import Cookies from 'js-cookie';


import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";


const privateKey = process.env.PRIVATE_KEY;

export async function GET(request) {
  connectMongo();
  const token = Cookies.get('token');

  console.log("Token:",token);

  jwt.verify(token, privateKey, {}, (error, user) => {
    if (error) {
      console.log(error);
      return NextResponse.json({ message: "Invalid token" });
    }
    return NextResponse.json(user);
  });
  
 
}








