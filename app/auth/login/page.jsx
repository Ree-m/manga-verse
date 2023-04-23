"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useUserContext } from "@/app/context/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setUser } = useUserContext();

  const API_URL = process.env.API_URL;

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name
        
      });

      console.log("after", data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        placeholder="username"
        onChange={(e) => setName(e.target.value)}
      />

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

      <div className="text-center">
              <p>
                Not a member? <Link href="/auth/register">Register</Link>
              </p>
              <p>Or sign up with</p>
              <button
                type="button"
                onClick={() => signIn("google")}
              >google
              </button>
            </div>

    </form>
  );
};

export default LoginPage;
