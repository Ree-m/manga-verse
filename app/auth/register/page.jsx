"use client";
import { useState } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = process.env.API_URL;
console.log("api url",API_URL)

  async function onSubmit(e) {
    e.preventDefault();
    console.log("register");
    const response = await fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    console.log(responseData);
    console.log(response)

    if (responseData == "User already exists") {
      alert(`User already exists`);
    } else if (response.ok) {
      alert("Registeration successful.You can login now");
    } else {
      alert("Registeration failed.Try again later.");
    }
    setName("")
    setEmail("")
    setPassword("")
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        placeholder="name"
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

      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
