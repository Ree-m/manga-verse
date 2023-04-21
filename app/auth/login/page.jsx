"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import LoginButton from "@/app/components/LoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function onSubmit(e) {
  
    e.preventDefault();

    try {
      console.log("login page start login credientials")
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("user",data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>

      <p>
        Don't have an account?
        <button>
          <Link href="/auth/register">Create one</Link>
        </button>
      </p>
      <LoginButton />
    </form>
  );
};

export default LoginPage;
