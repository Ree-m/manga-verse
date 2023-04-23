import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/utils/connectMongo";
import dotenv from "dotenv";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";

dotenv.config();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        connectMongo();
        console.log("starting credientials login");
        const { email, password, name} = credentials;
        console.log("credientials backend ", credentials);
        const user = await User.findOne({ email });
        console.log("crediential login", user.email, user.username);

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        // const isPasswordMatched = await bcrypt.compare(password, user.password);

        // if (!isPasswordMatched) {
        //   throw new Error("Invalid Email or Password");
        // }
        console.log("credientials login", user);
        return user;
      },
    }),
  ],
  secret: process.env.PRIVATE_KEY,
});

export { handler as GET, handler as POST };
