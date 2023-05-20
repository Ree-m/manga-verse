// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
import { setCookie } from "cookies-next";

import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";

// cookieParser();

const privateKey = process.env.PRIVATE_KEY;

// export async function POST(request, response) {
//   connectMongo();
//   console.log("login backend start");
//   const { name, email, password } = await request.json();
//   const user = await User.findOne({ name, email });
//   console.log("login backend found user", user, privateKey);
//   if (!user) {
//     return NextResponse.json("Invalid login credentials");
//   }

//   const token = await new Promise((resolve, reject) => {
//     jwt.sign(
//       { name, email, id: user._id },
//       privateKey,
//       {},
//       (err, token) => {
//         if (err) reject(err);
//         resolve(token);
//       }
//     );
//   });

//   console.log("token", token);
//   setCookie(request.res, "token", token);

//   return NextResponse.json({
//     id: user._id,
//     name,
//     email,
//   });
// }

export async function POST(request,response){
    connectMongo()
      const { name, email} = await request.json();

    try {
        const userExists=await User.findOne({$or:[{name,email}]})
        if (userExists){
          return NextResponse.json("User already exists")
        }
        const user = await User.create({
          name,
          email,
        });
        await user.save();
        return NextResponse.json({ message: 'User profile saved successfully.',user });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error saving user profile.' ,error});
      }
}
