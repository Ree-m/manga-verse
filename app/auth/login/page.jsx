"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useUserContext } from "@/app/context/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, setUser } = useUserContext();

  async function onSubmit(e) {
    e.preventDefault();

    // try {

    //   e.preventDefault();
    //   const response = await fetch(`http://localhost:3000/api/auth/login`, {
    //     method: "POST",
    //     body: JSON.stringify({ name, password, email }),
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //   });

    //   if (response.ok) {
    //     response.json().then((user) => {
    //       console.log("this is login page",user);
    //       setUser(user);
    //     });
    //   } else {
    //     alert("Wrong credentials");
    //   }

    // } catch (error) {
    //   console.log(error);
    // }

    try {
      console.log("login data", {
        email,
        password,
        name,
      });

      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name,
      });
      console.log("post login", data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleSignIn() {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("sign in with google", data);
      setUser(data); // Save the user object in the user context

      await signIn("google");
    } catch (error) {
      console.log(error);
    }
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
      <button>Login</button>

      <div className="text-center">
        <p>
          Not a member? <Link href="/auth/register">Register</Link>
        </p>
        <p>Or sign up with</p>
        <button type="button" onClick={handleGoogleSignIn}>
          google
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
