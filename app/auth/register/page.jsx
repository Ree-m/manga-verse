"use client";
import { useState } from "react";
import Link from "next/link";
import PopupComponent from "@/app/components/PopupComponent";
import styles from "app/styles/auth.module.css";




const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = process.env.API_URL;

  async function onSubmit(e) {
    e.preventDefault();
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
 

    if (responseData == "User already exists") {
      <PopupComponent content={"User already exists"}/>

      alert(`User already exists`);
    } else if (response.ok) {
      <PopupComponent content={"Registeration successful.You can login now"}/>
      alert("Registeration successful.You can login now");
    } else {
      alert("Registeration failed.Try again later.");
      <PopupComponent content={"Registeration failed.Try again later."}/>

    }
    setName("")
    setEmail("")
    setPassword("")
  }
  return (
    <div className={styles.auth}>
      <form onSubmit={onSubmit}>
        <div className={styles.flex}>
          <h2>Register</h2>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
        </div>
        

      </form>
    </div>
  );
};

export default RegisterPage;
