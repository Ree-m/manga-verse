import Test from "@/models/testModel";
import connectMongo from "@/utils/connectMongo";
import { NextResponse } from "next/server";

export async function GET(request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request) {
  await connectMongo();
  const body = await request.text();
  const { name, email } = JSON.parse(body);
  console.log("name", name, "email", email);

  const result = await Test.create({
    name,
    email,
  });

  return NextResponse.json(result);
}
