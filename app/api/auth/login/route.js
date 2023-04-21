// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import User from "@/models/User";
// import connectMongo from "@/utils/connectMongo";
// import { NextRequest, NextResponse } from "next/server";

// cookieParser();

// const privateKey = process.env.PRIVATE_KEY;

// export async function POST(request) {
//   connectMongo();
//   const { email, password } = await request.json();
//   const user = await User.findOne({ email, password }).exec();
//   if (!user) {
//     return NextResponse.json("Invalid login credentials");
//   }
//   // logged in
//   jwt.sign({ email, id: user._id }, privateKey, {}, (err, token) => {
//     if (err) throw err;
//     console.log("token", token);

//     return NextResponse.cookie("token", token).json({
//       id: user._id,
//       email,
//     });
//   });
// }
