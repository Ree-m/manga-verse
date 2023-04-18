"use client";
import Link from "next/link";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    console.log("submit");
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
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
    </form>
  );
};

export default LoginPage;
