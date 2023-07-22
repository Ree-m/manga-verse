// // import jwt from "jsonwebtoken";
// // import cookieParser from "cookie-parser";
// import { setCookie } from "cookies-next";

// import User from "@/models/User";
// import connectMongo from "@/utils/connectMongo";
// import { NextRequest, NextResponse } from "next/server";

// // cookieParser();

// const privateKey = process.env.PRIVATE_KEY;



// export async function POST(request,response){
//     connectMongo()
//       const { name, email} = await request.json();

//     try {
//         const userExists=await User.findOne({$or:[{name,email}]})
//         if (userExists){
//           return NextResponse.json("User already exists")
//         }
//         const user = await User.create({
//           name,
//           email,
//         });
//         await user.save();
//         return NextResponse.json({ message: 'User profile saved successfully.'});
//       } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: 'Error saving user profile.'});
//       }
// }
