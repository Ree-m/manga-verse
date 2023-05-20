import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/utils/connectMongo";
import dotenv from "dotenv";
import User from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";

dotenv.config();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        connectMongo();
        console.log("starting credientials login");
        const { email, password, name } = credentials;
        console.log("credientials backend ", credentials);
        const user = await User.findOne({ email, name, password });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        console.log("credientials login", user);
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session,token, user }) {
      console.log("session  first",session,"user",user,"token",token)
      session = {
        ...session,
        user: {
          id: token.sub,
          ...session.user,
        },
      };
      console.log("session", session);
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.PRIVATE_KEY,
});

export { handler as GET, handler as POST };
